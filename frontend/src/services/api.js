const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  auth: {
    register(userData) {
      return api.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },

    login(credentials) {
      return api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    },

    googleLogin(token) {
      return api.request('/oauth/google', {
        method: 'POST',
        body: JSON.stringify({ token }),
      });
    },

    logout() {
      return api.request('/auth/logout', {
        method: 'POST',
      });
    },

    getCurrentUser() {
      return api.request('/auth/me', {
        method: 'GET',
      });
    },
  },

  production: {
    create(productionData) {
      return api.request('/production', {
        method: 'POST',
        body: JSON.stringify(productionData),
      });
    },

    getAll() {
      return api.request('/production', {
        method: 'GET',
      });
    },

    getById(id) {
      return api.request(`/production/${id}`, {
        method: 'GET',
      });
    },

    update(id, productionData) {
      return api.request(`/production/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productionData),
      });
    },

    delete(id) {
      return api.request(`/production/${id}`, {
        method: 'DELETE',
      });
    },
  },

  payment: {
    create(paymentData) {
      return api.request('/payment', {
        method: 'POST',
        body: JSON.stringify(paymentData),
      });
    },

    getAll() {
      return api.request('/payment', {
        method: 'GET',
      });
    },

    getStats() {
      return api.request('/payment/stats/overview', {
        method: 'GET',
      });
    },
  },

  report: {
    getWeekly() {
      return api.request('/report/weekly', {
        method: 'GET',
      });
    },

    getMonthly() {
      return api.request('/report/monthly', {
        method: 'GET',
      });
    },
  },

  ai: {
    analyzePriceRange(analysisData) {
      return api.request('/ai/price-analysis', {
        method: 'POST',
        body: JSON.stringify(analysisData),
      });
    },

    detectDefects(defectData) {
      return api.request('/ai/defect-detection', {
        method: 'POST',
        body: JSON.stringify(defectData),
      });
    },

    getQualityAdvice(question) {
      return api.request('/ai/quality-advice', {
        method: 'POST',
        body: JSON.stringify({ question }),
      });
    },
  },
};

export default api;
