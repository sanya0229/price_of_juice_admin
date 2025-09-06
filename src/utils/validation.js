/**
 * Validation utilities for Price of Juice Admin System API
 * Based on the API documentation requirements
 */

import { VALIDATION_RULES } from '../types/api';

// ============================================================================
// PRODUCT VALIDATION
// ============================================================================

/**
 * Validate product inside item structure
 * @param {Object} item - Product inside item
 * @returns {Object} Validation result
 */
export const validateProductInside = (item) => {
  const errors = [];

  // Check required fields
  if (!item.product || typeof item.product !== 'string') {
    errors.push('Product name is required and must be a string');
  }

  if (!item.activeSubstance || typeof item.activeSubstance !== 'string') {
    errors.push('Active substance is required and must be a string');
  }

  if (!item.dosage || typeof item.dosage !== 'string') {
    errors.push('Dosage is required and must be a string');
  }

  if (typeof item.availability !== 'boolean') {
    errors.push('Availability must be a boolean value');
  }

  if (typeof item.price !== 'number' || isNaN(item.price)) {
    errors.push('Price must be a valid number');
  }

  if (typeof item.id !== 'number' || !Number.isInteger(item.id) || item.id < 1) {
    errors.push('ID must be a positive integer');
  }

  // Check string length constraints
  if (item.product && (item.product.length < VALIDATION_RULES.PRODUCT.STRING_MIN_LENGTH || 
                       item.product.length > VALIDATION_RULES.PRODUCT.STRING_MAX_LENGTH)) {
    errors.push(`Product name must be between ${VALIDATION_RULES.PRODUCT.STRING_MIN_LENGTH} and ${VALIDATION_RULES.PRODUCT.STRING_MAX_LENGTH} characters`);
  }

  if (item.activeSubstance && (item.activeSubstance.length < VALIDATION_RULES.PRODUCT.STRING_MIN_LENGTH || 
                               item.activeSubstance.length > VALIDATION_RULES.PRODUCT.STRING_MAX_LENGTH)) {
    errors.push(`Active substance must be between ${VALIDATION_RULES.PRODUCT.STRING_MIN_LENGTH} and ${VALIDATION_RULES.PRODUCT.STRING_MAX_LENGTH} characters`);
  }

  if (item.dosage && (item.dosage.length < VALIDATION_RULES.PRODUCT.STRING_MIN_LENGTH || 
                      item.dosage.length > VALIDATION_RULES.PRODUCT.STRING_MAX_LENGTH)) {
    errors.push(`Dosage must be between ${VALIDATION_RULES.PRODUCT.STRING_MIN_LENGTH} and ${VALIDATION_RULES.PRODUCT.STRING_MAX_LENGTH} characters`);
  }

  // Check price constraints
  if (item.price !== undefined && (item.price < VALIDATION_RULES.PRODUCT.PRICE_MIN || 
                                   item.price > VALIDATION_RULES.PRODUCT.PRICE_MAX)) {
    errors.push(`Price must be between ${VALIDATION_RULES.PRODUCT.PRICE_MIN} and ${VALIDATION_RULES.PRODUCT.PRICE_MAX}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    item
  };
};

/**
 * Validate product structure
 * @param {Object} product - Product data
 * @returns {Object} Validation result
 */
export const validateProduct = (product) => {
  const errors = [];

  // Check required fields
  if (!product.row || typeof product.row !== 'number' || !Number.isInteger(product.row)) {
    errors.push('Row number is required and must be an integer');
  }

  if (!Array.isArray(product.insides) || product.insides.length === 0) {
    errors.push('Product must have at least one inside item');
  }

  // Check row constraints
  if (product.row !== undefined && (product.row < VALIDATION_RULES.PRODUCT.ROW_MIN || 
                                   product.row > VALIDATION_RULES.PRODUCT.ROW_MAX)) {
    errors.push(`Row number must be between ${VALIDATION_RULES.PRODUCT.ROW_MIN} and ${VALIDATION_RULES.PRODUCT.ROW_MAX}`);
  }

  // Validate each inside item
  const insideValidationResults = product.insides.map(validateProductInside);
  const insideErrors = insideValidationResults
    .filter(result => !result.isValid)
    .flatMap(result => result.errors);

  errors.push(...insideErrors);

  // Check for duplicate IDs
  const ids = product.insides.map(item => item.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    errors.push('Product inside items must have unique IDs');
  }

  return {
    isValid: errors.length === 0,
    errors,
    product
  };
};

/**
 * Validate product update data
 * @param {Object} updateData - Product update data
 * @returns {Object} Validation result
 */
export const validateProductUpdate = (updateData) => {
  const errors = [];

  // Check required fields
  if (!updateData.row || typeof updateData.row !== 'number' || !Number.isInteger(updateData.row)) {
    errors.push('Row number is required and must be an integer');
  }

  if (!Array.isArray(updateData.data) || updateData.data.length === 0) {
    errors.push('Update data must contain at least one item');
  }

  // Check row constraints
  if (updateData.row !== undefined && (updateData.row < VALIDATION_RULES.PRODUCT.ROW_MIN || 
                                       updateData.row > VALIDATION_RULES.PRODUCT.ROW_MAX)) {
    errors.push(`Row number must be between ${VALIDATION_RULES.PRODUCT.ROW_MIN} and ${VALIDATION_RULES.PRODUCT.ROW_MAX}`);
  }

  // Validate each data item
  const dataValidationResults = updateData.data.map(validateProductInside);
  const dataErrors = dataValidationResults
    .filter(result => !result.isValid)
    .flatMap(result => result.errors);

  errors.push(...dataErrors);

  // Check for duplicate IDs
  const ids = updateData.data.map(item => item.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    errors.push('Update data items must have unique IDs');
  }

  return {
    isValid: errors.length === 0,
    errors,
    updateData
  };
};

// ============================================================================
// TEXT VALIDATION
// ============================================================================

/**
 * Validate text content
 * @param {string} text - Text content to validate
 * @returns {Object} Validation result
 */
export const validateText = (text) => {
  const errors = [];

  // Check if text is provided
  if (text === undefined || text === null) {
    errors.push('Text content is required');
  }

  // Check if text is a string
  if (typeof text !== 'string') {
    errors.push('Text content must be a string');
  }

  // Check length constraints
  if (text && text.length > VALIDATION_RULES.TEXT.MAX_LENGTH) {
    errors.push(`Text content must not exceed ${VALIDATION_RULES.TEXT.MAX_LENGTH} characters`);
  }

  // Check for minimum length if required
  if (text && text.length < VALIDATION_RULES.TEXT.MIN_LENGTH) {
    errors.push(`Text content must be at least ${VALIDATION_RULES.TEXT.MIN_LENGTH} characters long`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    text
  };
};

// ============================================================================
// AUTHENTICATION VALIDATION
// ============================================================================

/**
 * Validate login credentials
 * @param {Object} credentials - Login credentials
 * @returns {Object} Validation result
 */
export const validateCredentials = (credentials) => {
  const errors = [];

  // Check if credentials object is provided
  if (!credentials || typeof credentials !== 'object') {
    errors.push('Credentials object is required');
    return { isValid: false, errors, credentials };
  }

  // Check required fields
  if (!credentials.ADM_LOGIN || typeof credentials.ADM_LOGIN !== 'string') {
    errors.push('Username (ADM_LOGIN) is required and must be a string');
  }

  if (!credentials.ADM_PSSWRD || typeof credentials.ADM_PSSWRD !== 'string') {
    errors.push('Password (ADM_PSSWRD) is required and must be a string');
  }

  // Check string length constraints
  if (credentials.ADM_LOGIN && (credentials.ADM_LOGIN.length < 1 || 
                                credentials.ADM_LOGIN.length > 100)) {
    errors.push('Username must be between 1 and 100 characters');
  }

  if (credentials.ADM_PSSWRD && (credentials.ADM_PSSWRD.length < 1 || 
                                 credentials.ADM_PSSWRD.length > 100)) {
    errors.push('Password must be between 1 and 100 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
    credentials
  };
};

// ============================================================================
// GENERAL VALIDATION UTILITIES
// ============================================================================

/**
 * Validate MongoDB ObjectId format
 * @param {string} id - ID to validate
 * @returns {boolean} Is valid ObjectId
 */
export const isValidObjectId = (id) => {
  if (!id || typeof id !== 'string') return false;
  return /^[0-9a-fA-F]{24}$/.test(id);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid URL
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Sanitize HTML content (basic)
 * @param {string} html - HTML content to sanitize
 * @returns {string} Sanitized HTML
 */
export const sanitizeHtml = (html) => {
  if (!html || typeof html !== 'string') return html;
  
  // Basic HTML sanitization - allow common safe tags
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote'];
  const allowedAttributes = ['href', 'target', 'rel'];
  
  // This is a basic implementation - in production, use a proper HTML sanitizer library
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '');
};

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Create validation error message
 * @param {string} field - Field name
 * @param {string} message - Error message
 * @returns {string} Formatted error message
 */
export const createValidationError = (field, message) => {
  return `${field}: ${message}`;
};

/**
 * Format validation errors for display
 * @param {Array} errors - Array of error messages
 * @returns {string} Formatted error string
 */
export const formatValidationErrors = (errors) => {
  if (!Array.isArray(errors) || errors.length === 0) return '';
  return errors.join('; ');
};

/**
 * Check if value is empty
 * @param {*} value - Value to check
 * @returns {boolean} Is empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

// Export all validation functions
export default {
  // Product validation
  validateProductInside,
  validateProduct,
  validateProductUpdate,
  
  // Text validation
  validateText,
  
  // Authentication validation
  validateCredentials,
  
  // General validation
  isValidObjectId,
  isValidEmail,
  isValidUrl,
  sanitizeHtml,
  
  // Helpers
  createValidationError,
  formatValidationErrors,
  isEmpty,
};
