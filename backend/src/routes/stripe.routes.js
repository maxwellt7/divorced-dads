import express from 'express';
import { stripeController } from '../controllers/stripe.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Webhook: raw body required for signature verification (registered before global json middleware)
router.post('/webhook', express.raw({ type: 'application/json' }), stripeController.webhook);

// All other Stripe routes need json body parsing (applied locally since this router
// is mounted before the global express.json() middleware)
const jsonMiddleware = express.json();

router.post('/create-checkout-session', jsonMiddleware, authenticate, stripeController.createCheckoutSession);
router.post('/create-portal-session', jsonMiddleware, authenticate, stripeController.createPortalSession);
router.get('/subscription-status', authenticate, stripeController.getSubscriptionStatus);

export default router;
