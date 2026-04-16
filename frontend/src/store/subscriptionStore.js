import { create } from 'zustand';
import { stripeService } from '../services/stripe.service.js';

export const useSubscriptionStore = create((set, get) => ({
  subscription: null,
  isLoading: false,

  fetch: async () => {
    set({ isLoading: true });
    try {
      const data = await stripeService.getSubscriptionStatus();
      set({ subscription: data, isLoading: false });
      return data;
    } catch {
      set({ subscription: { plan: 'free', status: 'inactive', hasFullAccess: false }, isLoading: false });
    }
  },

  checkout: async (priceId) => {
    const { url } = await stripeService.createCheckoutSession(priceId);
    window.location.href = url;
  },

  openPortal: async () => {
    const { url } = await stripeService.createPortalSession();
    window.location.href = url;
  },

  hasFullAccess: () => {
    return get().subscription?.hasFullAccess === true;
  },
}));

export default useSubscriptionStore;
