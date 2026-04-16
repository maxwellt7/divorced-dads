import { stripe } from '../config/stripe.js';
import { supabase } from '../config/supabase.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../utils/errors.js';

export class StripeService {
  /**
   * Get or create a Stripe customer for a user.
   */
  async getOrCreateCustomer(userId, email) {
    // Check if subscription row already exists
    const { data: existing } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single();

    if (existing?.stripe_customer_id) {
      return existing.stripe_customer_id;
    }

    // Create new Stripe customer
    const customer = await stripe.customers.create({
      email,
      metadata: { userId },
    });

    // Upsert subscription row with customer id (free plan until checkout completes)
    await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        stripe_customer_id: customer.id,
        plan: 'free',
        status: 'inactive',
      }, { onConflict: 'user_id' });

    return customer.id;
  }

  /**
   * Create a Stripe Checkout session for a subscription or one-time payment.
   */
  async createCheckoutSession({ userId, email, priceId, successUrl, cancelUrl }) {
    if (!stripe) throw new AppError('Stripe not configured', 503);

    const customerId = await this.getOrCreateCustomer(userId, email);

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: priceId === process.env.STRIPE_PRICE_ID_LIFETIME ? 'payment' : 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { userId },
      subscription_data: priceId !== process.env.STRIPE_PRICE_ID_LIFETIME
        ? { metadata: { userId } }
        : undefined,
      allow_promotion_codes: true,
    });

    return session;
  }

  /**
   * Create a Stripe Customer Portal session.
   */
  async createPortalSession({ userId, returnUrl }) {
    if (!stripe) throw new AppError('Stripe not configured', 503);

    const { data: sub } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single();

    if (!sub?.stripe_customer_id) {
      throw new AppError('No billing account found', 404);
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: returnUrl,
    });

    return session;
  }

  /**
   * Get a user's current subscription status.
   */
  async getSubscriptionStatus(userId) {
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('plan, status, current_period_end, cancel_at_period_end')
      .eq('user_id', userId)
      .single();

    if (!sub) {
      return { plan: 'free', status: 'inactive', hasFullAccess: false };
    }

    const hasFullAccess =
      (sub.plan === 'monthly' && sub.status === 'active') ||
      (sub.plan === 'monthly' && sub.status === 'trialing') ||
      sub.plan === 'lifetime';

    return {
      plan: sub.plan,
      status: sub.status,
      currentPeriodEnd: sub.current_period_end,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      hasFullAccess,
    };
  }

  /**
   * Handle incoming Stripe webhook events.
   */
  async handleWebhookEvent(rawBody, signature) {
    if (!stripe) throw new AppError('Stripe not configured', 503);

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) throw new AppError('Webhook secret not configured', 503);

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      logger.error('Stripe webhook signature verification failed:', err.message);
      throw new AppError(`Webhook signature invalid: ${err.message}`, 400);
    }

    logger.info(`Stripe webhook received: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed':
        await this._handleCheckoutCompleted(event.data.object);
        break;

      case 'customer.subscription.updated':
      case 'customer.subscription.created':
        await this._handleSubscriptionUpdated(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await this._handleSubscriptionDeleted(event.data.object);
        break;

      case 'invoice.payment_failed':
        await this._handlePaymentFailed(event.data.object);
        break;

      default:
        logger.info(`Unhandled Stripe event type: ${event.type}`);
    }

    return event;
  }

  async _handleCheckoutCompleted(session) {
    const userId = session.metadata?.userId;
    if (!userId) return;

    // For one-time lifetime purchases
    if (session.mode === 'payment') {
      await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          stripe_customer_id: session.customer,
          plan: 'lifetime',
          status: 'active',
        }, { onConflict: 'user_id' });

      logger.info(`Lifetime purchase completed for user ${userId}`);
    }
    // Subscription checkout — full update comes via subscription.updated event
  }

  async _handleSubscriptionUpdated(subscription) {
    const userId = subscription.metadata?.userId;
    if (!userId) return;

    const status = this._mapStripeStatus(subscription.status);
    const plan = status === 'active' || status === 'trialing' ? 'monthly' : 'free';

    await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        stripe_customer_id: subscription.customer,
        stripe_subscription_id: subscription.id,
        stripe_price_id: subscription.items?.data?.[0]?.price?.id,
        plan,
        status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
      }, { onConflict: 'user_id' });

    logger.info(`Subscription updated for user ${userId}: ${status}`);
  }

  async _handleSubscriptionDeleted(subscription) {
    const userId = subscription.metadata?.userId;
    if (!userId) return;

    await supabase
      .from('subscriptions')
      .update({ plan: 'free', status: 'canceled', cancel_at_period_end: false })
      .eq('user_id', userId);

    logger.info(`Subscription canceled for user ${userId}`);
  }

  async _handlePaymentFailed(invoice) {
    const customerId = invoice.customer;
    if (!customerId) return;

    await supabase
      .from('subscriptions')
      .update({ status: 'past_due' })
      .eq('stripe_customer_id', customerId);

    logger.warn(`Payment failed for customer ${customerId}`);
  }

  _mapStripeStatus(stripeStatus) {
    const map = {
      active: 'active',
      trialing: 'trialing',
      past_due: 'past_due',
      canceled: 'canceled',
      unpaid: 'past_due',
      incomplete: 'inactive',
      incomplete_expired: 'inactive',
      paused: 'inactive',
    };
    return map[stripeStatus] || 'inactive';
  }
}

export const stripeService = new StripeService();
export default stripeService;
