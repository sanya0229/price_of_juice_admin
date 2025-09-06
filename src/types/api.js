/**
 * API Types based on Price of Juice Admin System documentation
 */

// Base API Response types
export const API_RESPONSE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
};

// Authentication types
export const AUTH_ENDPOINTS = {
  LOGIN: '/admin/login',
};

export const AUTH_METHODS = {
  POST: 'POST',
};

// Product types
export const PRODUCT_ENDPOINTS = {
  GET_ALL: '/admin/products',
  GET_BY_ID: '/admin/products/:id',
  CREATE: '/admin/products',
  UPDATE_INSIDES: '/admin/products/insides',
  DELETE: '/admin/products/:id',
};

export const PRODUCT_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

// Text types
export const TEXT_ENDPOINTS = {
  GET: '/admin/text',
  UPDATE: '/admin/text',
  TEST: '/admin/text/test',
};

export const TEXT_METHODS = {
  GET: 'GET',
  PATCH: 'PATCH',
};

// Data Models
export const PRODUCT_INSIDE_STRUCTURE = {
  product: 'string',           // Product name
  activeSubstance: 'string',   // Active substance
  dosage: 'string',           // Dosage information
  availability: 'boolean',     // Product availability
  price: 'number',            // Product price
  id: 'number',               // Unique identifier
};

export const PRODUCT_STRUCTURE = {
  insides: 'Array<PRODUCT_INSIDE>', // Array of product items
  row: 'number',                     // Row number
};

export const TEXT_STRUCTURE = {
  text: 'string', // Text content
};

// Error Response types
export const ERROR_TYPES = {
  UNAUTHORIZED: 'Unauthorized',
  BAD_REQUEST: 'Bad Request',
  NOT_FOUND: 'Not Found',
};

export const ERROR_STATUS_CODES = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'http://priceofjuice.com/api',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <jwt-token>',
  },
};

// JWT Configuration
export const JWT_CONFIG = {
  HEADER_PREFIX: 'Bearer ',
  STORAGE_KEY: 'adminToken',
  EXPIRY_HOURS: 24,
};

// Database Configuration
export const DB_CONFIG = {
  MONGODB_URI: 'mongodb://localhost:27017/priceofjuice',
  COLLECTIONS: {
    PRODUCTS: 'products',
    TEXT: 'text',
  },
};

// Environment Variables
export const ENV_VARS = {
  MONGODB_URI: 'MONGODB_URI',
  JWT_SECRET: 'JWT_SECRET',
  ADM_LOGIN: 'ADM_LOGIN',
  ADM_PSSWRD: 'ADM_PSSWRD',
};

// Default Values
export const DEFAULT_VALUES = {
  ADMIN_LOGIN: 'admin',
  ADMIN_PASSWORD: 'admin',
  MOCK_TEXT: 'Mock text',
  PRODUCT_ROWS: [1, 2, 3],
  PRODUCT_INSIDES_COUNT: 3,
};

// Validation Rules
export const VALIDATION_RULES = {
  PRODUCT: {
    ROW_MIN: 1,
    ROW_MAX: 1000,
    PRICE_MIN: 0,
    PRICE_MAX: 999999.99,
    STRING_MIN_LENGTH: 1,
    STRING_MAX_LENGTH: 500,
  },
  TEXT: {
    MIN_LENGTH: 0,
    MAX_LENGTH: 10000,
  },
};

// Logging Categories
export const LOGGING_CATEGORIES = {
  DATABASE_INIT: 'Database Initialization',
  PRODUCT_UPDATES: 'Product Updates',
  AUTH_ATTEMPTS: 'Authentication Attempts',
  ERROR_HANDLING: 'Error Handling',
};

// Security Features
export const SECURITY_FEATURES = {
  JWT_EXPIRY_HOURS: 24,
  ADMIN_CREDENTIALS_ENV: true,
  PROTECTED_ENDPOINTS: [
    'POST /admin/products',
    'PATCH /admin/products/insides',
    'DELETE /admin/products/:id',
    'PATCH /admin/text',
  ],
  PUBLIC_ENDPOINTS: [
    'GET /admin/products',
    'GET /admin/products/:id',
    'GET /admin/text',
    'GET /admin/text/test',
  ],
};

// Export all constants
export default {
  API_RESPONSE_STATUS,
  AUTH_ENDPOINTS,
  AUTH_METHODS,
  PRODUCT_ENDPOINTS,
  PRODUCT_METHODS,
  TEXT_ENDPOINTS,
  TEXT_METHODS,
  PRODUCT_INSIDE_STRUCTURE,
  PRODUCT_STRUCTURE,
  TEXT_STRUCTURE,
  ERROR_TYPES,
  ERROR_STATUS_CODES,
  HTTP_STATUS,
  API_CONFIG,
  JWT_CONFIG,
  DB_CONFIG,
  ENV_VARS,
  DEFAULT_VALUES,
  VALIDATION_RULES,
  LOGGING_CATEGORIES,
  SECURITY_FEATURES,
};
