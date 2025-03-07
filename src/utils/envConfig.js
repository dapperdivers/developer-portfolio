/**
 * Type-safe environment variable access with validation
 * 
 * This module provides a consistent way to access environment variables
 * with proper validation, default values, and TypeScript type safety.
 * 
 * @module envConfig
 */

/**
 * Parse a string value to a boolean
 * @param {string} value - String to parse ('true', 'false', etc.)
 * @param {boolean} defaultValue - Default value if the string is not provided
 * @returns {boolean} - Parsed boolean
 */
const toBool = (value, defaultValue = false) => {
  if (value === undefined || value === null) return defaultValue;
  return value === 'true' || value === '1' || value === 'yes';
};

/**
 * Parse a string value to an integer
 * @param {string} value - String to parse ('42', etc.)
 * @param {number} defaultValue - Default value if parsing fails
 * @returns {number} - Parsed number
 */
const toInt = (value, defaultValue = 0) => {
  if (value === undefined || value === null) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Parse a comma-separated string to an array of strings
 * @param {string} value - String to parse ('item1,item2,item3')
 * @param {string[]} defaultValue - Default value if parsing fails
 * @returns {string[]} - Array of trimmed strings
 */
const toArray = (value, defaultValue = []) => {
  if (!value) return defaultValue;
  return value.split(',').map(item => item.trim());
};

/**
 * Type-safe environment configuration
 */
export const env = {
  // App information
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'Developer Portfolio',
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
    port: toInt(import.meta.env.PORT, 3001),
    devServerPort: toInt(import.meta.env.VITE_DEV_SERVER_PORT, 3000),
    allowedDomains: toArray(import.meta.env.ALLOWED_DOMAINS, ['http://localhost:3001', 'http://localhost:3000']),
  },
  
  // Feature flags as booleans
  features: {
    enablePwa: toBool(import.meta.env.VITE_ENABLE_PWA, true),
    darkMode: toBool(import.meta.env.VITE_FEATURE_DARK_MODE, false),
    animations: toBool(import.meta.env.VITE_FEATURE_ANIMATIONS, true),
    performanceMonitoring: toBool(import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING, true),
  },
  
  // API integrations
  github: {
    token: import.meta.env.VITE_GITHUB_TOKEN || '',
    hasToken: !!import.meta.env.VITE_GITHUB_TOKEN,
  },
  
  // Analytics
  analytics: {
    gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID || '',
    enabled: !!import.meta.env.VITE_GA_TRACKING_ID,
  },
  
  // Environment info
  isProduction: import.meta.env.MODE === 'production',
  isDevelopment: import.meta.env.MODE === 'development',
  isTest: import.meta.env.MODE === 'test',
  mode: import.meta.env.MODE || 'development',
};

/**
 * Validates that required environment variables are present
 * @returns {Object} Validation result with any missing variables
 */
export const validateEnv = () => {
  const requiredVars = [
    // Add any required variables here
  ];
  
  const missing = requiredVars.filter(varName => {
    const path = varName.split('.');
    let current = env;
    
    for (const part of path) {
      if (current[part] === undefined || current[part] === null || current[part] === '') {
        return true;
      }
      current = current[part];
    }
    
    return false;
  });
  
  return {
    valid: missing.length === 0,
    missing,
  };
};

// Default export for convenience
export default env;
