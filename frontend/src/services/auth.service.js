import api from './api';

export const authService = {
  async register(data) {
    const response = await api.post('/api/auth/register', data);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  },

  async login(credentials) {
    const response = await api.post('/api/auth/login', credentials);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  },

  async logout() {
    await api.post('/api/auth/logout');
    localStorage.removeItem('token');
  },

  async getMe() {
    const response = await api.get('/api/auth/me');
    return response.user;
  },

  async changePassword(data) {
    const response = await api.post('/api/auth/change-password', data);
    return response;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};

export default authService;
