import api from './api';

export const profileService = {
  async getProfile() {
    const response = await api.get('/api/profile');
    return response.profile;
  },

  async updateProfile(data) {
    const response = await api.put('/api/profile', data);
    return response.profile;
  },

  async completeOnboarding(data) {
    const response = await api.post('/api/profile/onboarding', data);
    return response.profile;
  },

  async getOnboarding() {
    const response = await api.get('/api/profile/onboarding');
    return response;
  },
};

export default profileService;
