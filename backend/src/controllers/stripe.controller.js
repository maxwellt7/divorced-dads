import { stripeService } from '../services/stripe.service.js';
import { asyncHandler } from '../middleware/error.middleware.js';
import { logger } from '../utils/logger.js';

export class StripeController {
  createCheckoutSession = asyncHandler(async (req, res) => {
    const { priceId } = req.body;
    const userId = req.userId;
    const userEmail = req.userEmail;

    if (!priceId) {
      return res.status(400).json({ success: false, error: 'priceId is required' });
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    const session = await stripeService.createCheckoutSession({
      userId,
      email: userEmail,
      priceId,
      successUrl: `${frontendUrl}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${frontendUrl}/subscribe/cancel`,
    });

    res.json({ success: true, data: { url: session.url, sessionId: session.id } });
  });

  createPortalSession = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    const session = await stripeService.createPortalSession({
      userId,
      returnUrl: `${frontendUrl}/dashboard/settings`,
    });

    res.json({ success: true, data: { url: session.url } });
  });

  getSubscriptionStatus = asyncHandler(async (req, res) => {
    const status = await stripeService.getSubscriptionStatus(req.userId);
    res.json({ success: true, data: status });
  });

  webhook = asyncHandler(async (req, res) => {
    const signature = req.headers['stripe-signature'];
    if (!signature) {
      return res.status(400).json({ error: 'Missing stripe-signature header' });
    }

    await stripeService.handleWebhookEvent(req.body, signature);
    res.json({ received: true });
  });
}

export const stripeController = new StripeController();
export default stripeController;
