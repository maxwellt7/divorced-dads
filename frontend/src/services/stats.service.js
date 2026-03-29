import api from './api';

export const statsService = {
  async getStats() {
    const response = await api.get('/api/stats');
    return response.stats;
  },

  async getStreaks() {
    const response = await api.get('/api/stats/streaks');
    return response;
  },

  async getHistory(days = 30) {
    const response = await api.get('/api/stats/history', { params: { days } });
    return response.history;
  },

  async getJourneyStats() {
    const response = await api.get('/api/stats/journeys');
    return response;
  },

  async getTimeDistribution(days = 30) {
    const response = await api.get('/api/stats/time-distribution', { params: { days } });
    return response.distribution;
  },
};

export default statsService;
