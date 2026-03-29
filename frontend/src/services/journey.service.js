import api from './api';

export const journeyService = {
  async createJourney(data) {
    const response = await api.post('/api/journeys', data);
    return response.journey;
  },

  async listJourneys(params = {}) {
    const response = await api.get('/api/journeys', { params });
    return response.journeys;
  },

  async getJourney(id) {
    const response = await api.get(`/api/journeys/${id}`);
    return response.journey;
  },

  async getJourneyDay(journeyId, dayNumber) {
    const response = await api.get(`/api/journeys/${journeyId}/days/${dayNumber}`);
    return response.day;
  },

  async markDayComplete(journeyId, dayNumber) {
    const response = await api.post(`/api/journeys/${journeyId}/days/${dayNumber}/complete`);
    return response.day;
  },

  async deleteJourney(id) {
    await api.delete(`/api/journeys/${id}`);
  },
};

export default journeyService;
