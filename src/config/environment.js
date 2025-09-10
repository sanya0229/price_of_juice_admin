/**
 * Environment configuration for Price of Juice Admin System
 * Based on the API documentation requirements
 */

// Environment detection
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

// Base configuration
const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/admin',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,
    retryAttempts: parseInt(process.env.REACT_APP_API_RETRY_ATTEMPTS) || 3,
    retryDelay: parseInt(process.env.REACT_APP_API_RETRY_DELAY) || 1000,
  },

  // JWT Configuration
  jwt: {
    storageKey: process.env.REACT_APP_JWT_STORAGE_KEY || 'adminToken',
    headerPrefix: process.env.REACT_APP_JWT_HEADER_PREFIX || 'Bearer ',
    expiryHours: parseInt(process.env.REACT_APP_JWT_EXPIRY_HOURS) || 24,
    refreshThreshold: parseInt(process.env.REACT_APP_JWT_REFRESH_THRESHOLD) || 1, // hours before expiry
  },

  // Database Configuration
  database: {
    mongodbURI: process.env.REACT_APP_MONGODB_URI || 'mongodb://localhost:27017/priceofjuice',
    collections: {
      products: process.env.REACT_APP_PRODUCTS_COLLECTION || 'products',
      text: process.env.REACT_APP_TEXT_COLLECTION || 'text',
    },
  },

  // Admin Credentials (for development/testing only)
  admin: {
    login: process.env.REACT_APP_ADM_LOGIN || 'admin',
    password: process.env.REACT_APP_ADM_PSSWRD || 'Biocore123&',
  },

  // Security Configuration
  security: {
    corsOrigins: process.env.REACT_APP_CORS_ORIGINS ? 
      process.env.REACT_APP_CORS_ORIGINS.split(',') : 
      ['http://localhost:3000', 'http://localhost:3001'],
    allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },

  // Logging Configuration
  logging: {
    level: process.env.REACT_APP_LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
    enableConsole: process.env.REACT_APP_ENABLE_CONSOLE_LOG !== 'false',
    enableFile: process.env.REACT_APP_ENABLE_FILE_LOG === 'true',
    logFile: process.env.REACT_APP_LOG_FILE || 'admin-system.log',
    maxFileSize: parseInt(process.env.REACT_APP_MAX_LOG_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
    maxFiles: parseInt(process.env.REACT_APP_MAX_LOG_FILES) || 5,
  },

  // Feature Flags
  features: {
    enableProductManagement: process.env.REACT_APP_ENABLE_PRODUCT_MANAGEMENT !== 'false',
    enableTextManagement: process.env.REACT_APP_ENABLE_TEXT_MANAGEMENT !== 'false',
    enableUserManagement: process.env.REACT_APP_ENABLE_USER_MANAGEMENT === 'true',
    enableAuditLog: process.env.REACT_APP_ENABLE_AUDIT_LOG === 'true',
    enableRealTimeUpdates: process.env.REACT_APP_ENABLE_REALTIME_UPDATES === 'true',
  },

  // UI Configuration
  ui: {
    theme: process.env.REACT_APP_UI_THEME || 'light',
    language: process.env.REACT_APP_UI_LANGUAGE || 'en',
    timezone: process.env.REACT_APP_UI_TIMEZONE || 'UTC',
    dateFormat: process.env.REACT_APP_UI_DATE_FORMAT || 'YYYY-MM-DD',
    timeFormat: process.env.REACT_APP_UI_TIME_FORMAT || 'HH:mm:ss',
    pagination: {
      defaultPageSize: parseInt(process.env.REACT_APP_DEFAULT_PAGE_SIZE) || 10,
      maxPageSize: parseInt(process.env.REACT_APP_MAX_PAGE_SIZE) || 100,
    },
  },

  // Validation Rules
  validation: {
    product: {
      row: {
        min: parseInt(process.env.REACT_APP_PRODUCT_ROW_MIN) || 1,
        max: parseInt(process.env.REACT_APP_PRODUCT_ROW_MAX) || 1000,
      },
      price: {
        min: parseFloat(process.env.REACT_APP_PRODUCT_PRICE_MIN) || 0,
        max: parseFloat(process.env.REACT_APP_PRODUCT_PRICE_MAX) || 999999.99,
      },
      string: {
        minLength: parseInt(process.env.REACT_APP_PRODUCT_STRING_MIN_LENGTH) || 1,
        maxLength: parseInt(process.env.REACT_APP_PRODUCT_STRING_MAX_LENGTH) || 500,
      },
    },
    text: {
      minLength: parseInt(process.env.REACT_APP_TEXT_MIN_LENGTH) || 0,
      maxLength: parseInt(process.env.REACT_APP_TEXT_MAX_LENGTH) || 10000,
    },
    credentials: {
      minLength: parseInt(process.env.REACT_APP_CREDENTIALS_MIN_LENGTH) || 1,
      maxLength: parseInt(process.env.REACT_APP_CREDENTIALS_MAX_LENGTH) || 100,
    },
  },

  // Error Handling
  errorHandling: {
    showDetailedErrors: isDevelopment,
    logErrors: true,
    retryOnError: true,
    maxRetries: parseInt(process.env.REACT_APP_MAX_ERROR_RETRIES) || 3,
    errorNotificationTimeout: parseInt(process.env.REACT_APP_ERROR_NOTIFICATION_TIMEOUT) || 5000,
  },

  // Performance Configuration
  performance: {
    enableCaching: process.env.REACT_APP_ENABLE_CACHING !== 'false',
    cacheTTL: parseInt(process.env.REACT_APP_CACHE_TTL) || 5 * 60 * 1000, // 5 minutes
    enableLazyLoading: process.env.REACT_APP_ENABLE_LAZY_LOADING !== 'false',
    enableVirtualScrolling: process.env.REACT_APP_ENABLE_VIRTUAL_SCROLLING === 'true',
    debounceDelay: parseInt(process.env.REACT_APP_DEBOUNCE_DELAY) || 300,
  },
};

// Environment-specific overrides
if (isDevelopment) {
  config.api.baseURL = 'http://localhost:3000/admin';
  config.logging.level = 'debug';
  config.errorHandling.showDetailedErrors = true;
  config.features.enableAuditLog = true;
}

if (isProduction) {
  config.api.baseURL = process.env.REACT_APP_API_BASE_URL;
  config.logging.level = 'warn';
  config.errorHandling.showDetailedErrors = false;
  config.features.enableAuditLog = false;
}

if (isTest) {
  config.api.baseURL = 'http://localhost:3000/admin';
  config.logging.level = 'error';
  config.errorHandling.showDetailedErrors = false;
}

// Validation function
export const validateConfig = () => {
  const errors = [];

  // Check required environment variables
  if (!config.api.baseURL) {
    errors.push('API base URL is required');
  }

  if (!config.admin.login || !config.admin.password) {
    errors.push('Admin credentials are required');
  }

  if (config.jwt.expiryHours < 1) {
    errors.push('JWT expiry hours must be at least 1');
  }

  if (config.validation.product.row.min < 1) {
    errors.push('Product row minimum must be at least 1');
  }

  if (config.validation.product.price.min < 0) {
    errors.push('Product price minimum cannot be negative');
  }

  return {
    isValid: errors.length === 0,
    errors,
    config
  };
};

// Get configuration value with fallback
export const getConfig = (key, fallback = null) => {
  const keys = key.split('.');
  let value = config;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return fallback;
    }
  }

  return value;
};

// Check if feature is enabled
export const isFeatureEnabled = (featureName) => {
  return config.features[featureName] === true;
};

// Get API endpoint
export const getApiEndpoint = (endpoint) => {
  return `${config.api.baseURL}${endpoint}`;
};

// Get JWT token from storage
export const getJWTToken = () => {
  return localStorage.getItem(config.jwt.storageKey);
};

// Set JWT token in storage
export const setJWTToken = (token) => {
  if (token) {
    localStorage.setItem(config.jwt.storageKey, token);
  } else {
    localStorage.removeItem(config.jwt.storageKey);
  }
};

// Check if JWT token is expired
export const isJWTExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    
    return currentTime >= expiryTime;
  } catch (error) {
    console.error('Error parsing JWT token:', error);
    return true;
  }
};

// Get JWT expiry time
export const getJWTExpiryTime = (token) => {
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return new Date(payload.exp * 1000);
  } catch (error) {
    console.error('Error parsing JWT token:', error);
    return null;
  }
};

// Check if JWT token needs refresh
export const shouldRefreshJWT = (token) => {
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000;
    const currentTime = Date.now();
    const refreshThreshold = config.jwt.refreshThreshold * 60 * 60 * 1000; // Convert hours to milliseconds
    
    return (expiryTime - currentTime) <= refreshThreshold;
  } catch (error) {
    console.error('Error parsing JWT token:', error);
    return false;
  }
};

// Export configuration
export default config;
