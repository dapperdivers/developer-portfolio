/**
 * Environment configuration handler for the portfolio project
 * 
 * This module consolidates all environment variables and provides a 
 * unified interface for accessing them across different environments
 * (development, test, production).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../..');

// Environment constants
export const ENV = {
  DEV: 'development',
  TEST: 'test',
  PROD: 'production'
} as const;

/**
 * Get current Node environment mode
 * @returns {string} Environment mode (development, production, test)
 */
export function getNodeEnv() {
  return process.env.NODE_ENV || ENV.DEV;
}

/**
 * Check if running in production mode
 * @returns {boolean} True if in production mode
 */
export function isProd() {
  return getNodeEnv() === ENV.PROD;
}

/**
 * Check if running in development mode
 * @returns {boolean} True if in development mode
 */
export function isDev() {
  return getNodeEnv() === ENV.DEV;
}

/**
 * Check if running in test mode
 * @returns {boolean} True if in test mode
 */
export function isTest() {
  return getNodeEnv() === ENV.TEST;
}

/**
 * Load environment variables from .env files
 * Priority (highest to lowest):
 * 1. .env.${NODE_ENV}.local (Not committed)
 * 2. .env.${NODE_ENV}
 * 3. .env.local (Not committed)
 * 4. .env
 */
export function loadEnv() {
  const NODE_ENV = getNodeEnv();
  
  // Determine which files to load (in reverse order of priority)
  const dotenvFiles = [
    `.env`,
    `.env.local`,
    `.env.${NODE_ENV}`,
    `.env.${NODE_ENV}.local`,
  ];

  // Load each file if it exists
  dotenvFiles.forEach(dotenvFile => {
    const dotenvPath = path.resolve(rootDir, dotenvFile);
    
    if (fs.existsSync(dotenvPath)) {
      const result = dotenv.config({ path: dotenvPath });
      
      if (result.error) {
        throw result.error;
      }
    }
  });

  // Load optimization specific env vars
  if (process.env.ANALYZE === 'true') {
    console.log('Bundle analysis enabled');
  }
  
  return process.env;
}

/**
 * Define required environment variables
 * Each environment's required variables can be defined here
 */
export const requiredVars = {
  // Variables required in all environments
  all: [],
  
  // Variables required only in production
  [ENV.PROD]: [],
  
  // Variables required only in development
  [ENV.DEV]: [],
  
  // Variables required only in test
  [ENV.TEST]: []
} as const;

/**
 * Validate that all required environment variables are present
 * @param {Object} env - Environment variables object 
 * @returns {Object} Validation result
 */
export function validateEnv(env = process.env) {
  const currentEnv = getNodeEnv();
  const allRequired = [...requiredVars.all, ...requiredVars[currentEnv]];
  
  const missing = allRequired.filter(key => !env[key]);
  
  return {
    valid: missing.length === 0,
    missing,
    currentEnv
  };
}

/**
 * Get sanitized environment variables for client-side use
 * Only variables that are explicitly allowed to be exposed to the client
 * @returns {Object} Client-safe environment variables
 */
export function getClientEnv() {
  // Environment variables that should be exposed to the client
  const ALLOWED_VARS = [
    'NODE_ENV',
    'VITE_API_URL',
    'VITE_GA_ID',
    'VITE_PUBLIC_URL',
    'VITE_PRESERVE_REACT',
    'VITE_DEV_SERVER_PORT',
  ];
  
  // Also include any variables that start with VITE_
  const VITE_APP = /^VITE_/i;
  
  const raw = { ...process.env };
  const exposed: Record<string, string> = {};
  
  // Process all variables
  Object.keys(raw).forEach(key => {
    if (ALLOWED_VARS.includes(key) || VITE_APP.test(key)) {
      exposed[key] = raw[key]!;
    }
  });
  
  // Add other safe variables
  exposed.NODE_ENV = getNodeEnv();
  exposed.APP_VERSION = raw.npm_package_version!;
  exposed.APP_NAME = raw.npm_package_name!;
  
  // Create stringified versions for both import.meta.env and process.env access patterns
  const stringified: Record<string, string> = {};
  Object.keys(exposed).forEach(key => {
    stringified[`import.meta.env.${key}`] = JSON.stringify(exposed[key]);
    stringified[`process.env.${key}`] = JSON.stringify(exposed[key]);
  });
  
  return {
    raw: exposed,
    stringified
  };
}

/**
 * Get environment configuration for Vite
 * @returns {Object} Environment configuration
 */
export function getEnvConfig() {
  const mode = getNodeEnv();
  const env = getClientEnv();
  
  return {
    mode,
    env: env.raw,
    define: {
      ...env.stringified,
      // Standard environment definition
      'process.env.NODE_ENV': JSON.stringify(mode)
    },
    // Common optimizations for all environments
    optimizeDeps: {
      // Always include these core dependencies to ensure they're properly processed
      include: ['react', 'react-dom', 'framer-motion', 'scheduler']
    }
  };
}

/**
 * Initialize environment variables and validate them
 * @returns {Object} Client environment object
 */
export function initEnv() {
  // Load environment variables
  loadEnv();
  
  // Validate required vars
  const validation = validateEnv();
  
  if (!validation.valid) {
    console.error(`Environment validation failed for ${validation.currentEnv}`);
    console.error(`Missing required variables: ${validation.missing.join(', ')}`);
    
    if (isProd()) {
      throw new Error('Missing required environment variables in production');
    }
  }
  
  return getClientEnv();
}

export default {
  ENV,
  getNodeEnv,
  isProd,
  isDev,
  isTest,
  loadEnv,
  validateEnv,
  getClientEnv,
  getEnvConfig,
  initEnv
};