import api from './api.js';

export const stripeService = {
  async getSubscriptionStatus() {
    const { data } = await api.get('/api/stripe/subscription-status');
    return data.data;
  },

  async createCheckoutSession(priceId) {
    const { data } = await api.post('/api/stripe/create-checkout-session', { priceId });
    return data.data;
  },

  async createPortalSession() {
    const { data } = await api.post('/api/stripe/create-portal-session');
    return data.data;
  },
};

export default stripeService;
