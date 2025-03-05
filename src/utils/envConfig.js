/**
 * Environment configuration utility for the Developer Portfolio project
 * Provides a centralized way to access environment variables with proper validation
 */

/**
 * Environment configuration with defaults
 * Maps environment variables to sanitized config values
 * 
 * @typedef {Object} EnvConfig
 * @property {string} nodeEnv - Environment (development, production, test)
 * @property {number} port - Server port for production
 * @property {number} devServerPort - Development server port
 * @property {string[]} allowedDomains - Domains allowed for CORS
 * @property {string|null} githubToken - GitHub API token (optional)
 * @property {boolean} enablePerformanceMonitoring - Whether to enable performance monitoring
 * @property {boolean} enableAnimations - Whether to enable animations by default
 * @property {boolean} isDevelopment - Whether the environment is development
 * @property {boolean} isProduction - Whether the environment is production
 * @property {boolean} isTest - Whether the environment is test
 */

// Default configuration values
const defaultConfig = {
  nodeEnv: 'development',
  port: 3001,
  devServerPort: 3000,
  allowedDomains: ['http://localhost:3001', 'http://localhost:3000'],
  githubToken: null,
  enablePerformanceMonitoring: true,
  enableAnimations: true,
};

/**
 * Parse a comma-separated string to an array
 * @param {string} str - String to parse
 * @returns {string[]} - Array of strings
 */
const parseStringArray = (str) => (str ? str.split(',').map(item => item.trim()) : []);

/**
 * Parse a boolean string to a boolean
 * @param {string} str - String to parse (e.g. 'true', 'false')
 * @param {boolean} defaultValue - Default value if the string is not provided
 * @returns {boolean} - Parsed boolean
 */
const parseBoolean = (str, defaultValue) => {
  if (str === undefined || str === null) return defaultValue;
  return str === 'true' || str === '1' || str === 'yes';
};

/**
 * Parse an integer string to a number
 * @param {string} str - String to parse (e.g. '3000')
 * @param {number} defaultValue - Default value if the string is not provided or invalid
 * @returns {number} - Parsed number
 */
const parseInteger = (str, defaultValue) => {
  if (str === undefined || str === null) return defaultValue;
  const parsed = parseInt(str, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Get environment variable with validation and default value
 * This provides consistent access to environment variables
 * 
 * @param {Object} env - Environment object (e.g., import.meta.env, process.env)
 * @returns {EnvConfig} - Configuration object with validated values
 */
export const getConfig = (env = {}) => {
  // Use import.meta.env in browser (Vite), process.env in Node.js or tests
  const environment = typeof import.meta !== 'undefined' ? import.meta.env : env;
  
  // Build the config with defaults and environment variables
  const config = {
    nodeEnv: environment.NODE_ENV || defaultConfig.nodeEnv,
    port: parseInteger(environment.PORT, defaultConfig.port),
    devServerPort: parseInteger(environment.VITE_DEV_SERVER_PORT, defaultConfig.devServerPort),
    allowedDomains: parseStringArray(environment.ALLOWED_DOMAINS) || defaultConfig.allowedDomains,
    githubToken: environment.GITHUB_TOKEN || null,
    enablePerformanceMonitoring: parseBoolean(
      environment.VITE_ENABLE_PERFORMANCE_MONITORING, 
      defaultConfig.enablePerformanceMonitoring
    ),
    enableAnimations: parseBoolean(
      environment.VITE_ENABLE_ANIMATIONS, 
      defaultConfig.enableAnimations
    ),
  };
  
  // Add convenience properties
  config.isDevelopment = config.nodeEnv === 'development';
  config.isProduction = config.nodeEnv === 'production';
  config.isTest = config.nodeEnv === 'test';
  
  return config;
};

/**
 * Environment configuration - singleton instance
 * @type {EnvConfig}
 */
export const envConfig = getConfig();

// Default export for convenience
export default envConfig;