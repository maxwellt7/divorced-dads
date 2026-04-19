import { stripe } from '../config/stripe.js';
import { db } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../utils/errors.js';

export class StripeService {
  async getOrCreateCustomer(userId, email) {
    const [[existing]] = await db.execute(
      'SELECT stripe_customer_id FROM subscriptions WHERE user_id = ?',
      [userId]
    );

    if (existing?.stripe_customer_id) {
      return existing.stripe_customer_id;
    }

    const customer = await stripe.customers.create({ email, metadata: { userId } });

    await db.execute(
      `INSERT INTO subscriptions (id, user_id, stripe_customer_id, plan_type, status)
       VALUES (UUID(), ?, ?, 'monthly', 'inactive')
       ON DUPLICATE KEY UPDATE stripe_customer_id = VALUES(stripe_customer_id)`,
      [userId, customer.id]
    );

    return customer.id;
  }

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

  async createPortalSession({ userId, returnUrl }) {
    if (!stripe) throw new AppError('Stripe not configured', 503);

    const [[sub]] = await db.execute(
      'SELECT stripe_customer_id FROM subscriptions WHERE user_id = ?',
      [userId]
    );

    if (!sub?.stripe_customer_id) {
      throw new AppError('No billing account found', 404);
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: returnUrl,
    });

    return session;
  }

  async getSubscriptionStatus(userId) {
    const [[sub]] = await db.execute(
      'SELECT plan_type, status, current_period_end, cancel_at_period_end FROM subscriptions WHERE user_id = ?',
      [userId]
    );

    if (!sub) {
      return { plan: 'free', status: 'inactive', hasFullAccess: false };
    }

    const hasFullAccess =
      (sub.plan_type === 'monthly' && (sub.status === 'active' || sub.status === 'trialing')) ||
      sub.plan_type === 'lifetime';

    return {
      plan: sub.plan_type,
      status: sub.status,
      currentPeriodEnd: sub.current_period_end,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      hasFullAccess,
    };
  }

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

    if (session.mode === 'payment') {
      await db.execute(
        `INSERT INTO subscriptions (id, user_id, stripe_customer_id, plan_type, status)
         VALUES (UUID(), ?, ?, 'lifetime', 'active')
         ON DUPLICATE KEY UPDATE stripe_customer_id = VALUES(stripe_customer_id), plan_type = 'lifetime', status = 'active'`,
        [userId, session.customer]
      );
      logger.info(`Lifetime purchase completed for user ${userId}`);
    }
  }

  async _handleSubscriptionUpdated(subscription) {
    const userId = subscription.metadata?.userId;
    if (!userId) return;

    const status = this._mapStripeStatus(subscription.status);
    const planType = (status === 'active' || status === 'trialing') ? 'monthly' : 'monthly';

    await db.execute(
      `INSERT INTO subscriptions
         (id, user_id, stripe_customer_id, stripe_subscription_id, stripe_price_id,
          plan_type, status, current_period_start, current_period_end, cancel_at_period_end)
       VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         stripe_customer_id = VALUES(stripe_customer_id),
         stripe_subscription_id = VALUES(stripe_subscription_id),
         stripe_price_id = VALUES(stripe_price_id),
         plan_type = VALUES(plan_type),
         status = VALUES(status),
         current_period_start = VALUES(current_period_start),
         current_period_end = VALUES(current_period_end),
         cancel_at_period_end = VALUES(cancel_at_period_end)`,
      [
        userId,
        subscription.customer,
        subscription.id,
        subscription.items?.data?.[0]?.price?.id || null,
        planType,
        status,
        new Date(subscription.current_period_start * 1000),
        new Date(subscription.current_period_end * 1000),
        subscription.cancel_at_period_end ? 1 : 0,
      ]
    );

    logger.info(`Subscription updated for user ${userId}: ${status}`);
  }

  async _handleSubscriptionDeleted(subscription) {
    const userId = subscription.metadata?.userId;
    if (!userId) return;

    await db.execute(
      `UPDATE subscriptions SET plan_type = 'monthly', status = 'canceled', cancel_at_period_end = 0
       WHERE user_id = ?`,
      [userId]
    );

    logger.info(`Subscription canceled for user ${userId}`);
  }

  async _handlePaymentFailed(invoice) {
    const customerId = invoice.customer;
    if (!customerId) return;

    await db.execute(
      "UPDATE subscriptions SET status = 'past_due' WHERE stripe_customer_id = ?",
      [customerId]
    );

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
