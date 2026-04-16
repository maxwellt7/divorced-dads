import Stripe from 'stripe';
import { logger } from '../utils/logger.js';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  logger.warn('STRIPE_SECRET_KEY not set — Stripe routes will be unavailable');
}

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: '2024-11-20.acacia' })
  : null;

export default stripe;
