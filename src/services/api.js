import axios from 'axios';

// Base configuration
const API_BASE_URL = 'https://priceofjuice.com/admin';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  /**
   * Authenticate admin user and get JWT token
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.ADM_LOGIN - Admin username
   * @param {string} credentials.ADM_PSSWRD - Admin password
   * @returns {Promise<Object>} Response with access_token and user data
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },
};

// Products API
export const productsAPI = {
  /**
   * Get all products (Public endpoint)
   * @returns {Promise<Array>} Array of products
   */
  getAll: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  },

  /**
   * Get product by ID (Public endpoint)
   * @param {string} id - Product ID
   * @returns {Promise<Object>} Product data
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
  },

  /**
   * Create a new product (Protected endpoint)
   * @param {Object} productData - Product data
   * @param {Array} productData.insides - Array of product items
   * @param {number} productData.row - Row number
   * @returns {Promise<Object>} Created product
   */
  create: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create product');
    }
  },

  /**
   * Update product insides by row (Protected endpoint)
   * @param {Object} updateData - Update data
   * @param {number} updateData.row - Row number
   * @param {Array} updateData.data - Array of product items to update/create
   * @returns {Promise<Object>} Updated product
   */
  updateInsides: async (updateData) => {
    try {
      const response = await api.patch('/products/insides', updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update product');
    }
  },

  /**
   * Delete product by ID (Protected endpoint)
   * @param {string} id - Product ID
   * @returns {Promise<Object>} Deletion result
   */
  delete: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
  },
};

// Text API
export const textAPI = {
  /**
   * Get text content (Public endpoint)
   * @returns {Promise<Object>} Text data
   */
  get: async () => {
    try {
      const response = await api.get('/text');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch text content');
    }
  },

  /**
   * Update text content (Protected endpoint)
   * @param {Object} textData - Text data to update
   * @param {string} textData.text - New text content
   * @returns {Promise<Object>} Updated text
   */
  update: async (textData) => {
    try {
      const response = await api.patch('/text', textData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update text content');
    }
  },

  /**
   * Test text collection (Public endpoint)
   * @returns {Promise<Object>} Test result
   */
  test: async () => {
    try {
      const response = await api.get('/text/test');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to test text collection');
    }
  },
};

// Utility functions
export const apiUtils = {
  /**
   * Set JWT token for future requests
   * @param {string} token - JWT token
   */
  setAuthToken: (token) => {
    if (token) {
      localStorage.setItem('adminToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('adminToken');
      delete api.defaults.headers.common['Authorization'];
    }
  },

  /**
   * Clear JWT token
   */
  clearAuthToken: () => {
    localStorage.removeItem('adminToken');
    delete api.defaults.headers.common['Authorization'];
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('adminToken');
  },

  /**
   * Get stored JWT token
   * @returns {string|null} JWT token
   */
  getAuthToken: () => {
    return localStorage.getItem('adminToken');
  },
};

// Export default API instance
export default api;
