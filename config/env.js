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
const rootDir = path.resolve(__dirname, '..');

// Environment constants
export const ENV = {
  DEV: 'development',
  TEST: 'test',
  PROD: 'production'
};

// Determine current environment
export const getNodeEnv = () => process.env.NODE_ENV || ENV.PROD;
export const isProd = () => getNodeEnv() === ENV.PROD;
export const isDev = () => getNodeEnv() === ENV.DEV;
export const isTest = () => getNodeEnv() === ENV.TEST;

/**
 * Load environment variables from .env files
 * Priority (highest to lowest):
 * 1. .env.${NODE_ENV}.local (Not committed)
 * 2. .env.${NODE_ENV}
 * 3. .env.local (Not committed)
 * 4. .env
 */
export const loadEnv = () => {
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
    // Additional env vars for bundle analysis could be set here
  }
  
  // Return all loaded environment variables
  return process.env;
};

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
};

/**
 * Validate that all required environment variables are present
 * @param {Object} env - Environment variables object 
 * @returns {Object} Validation result
 */
export const validateEnv = (env = process.env) => {
  const currentEnv = getNodeEnv();
  const allRequired = [...requiredVars.all, ...requiredVars[currentEnv]];
  
  const missing = allRequired.filter(key => !env[key]);
  
  return {
    valid: missing.length === 0,
    missing,
    currentEnv
  };
};

/**
 * Get sanitized environment variables for client-side use
 * Only variables that are explicitly allowed to be exposed to the client
 * @returns {Object} Client-safe environment variables
 */
export const getClientEnv = () => {
  // Regular expression to match VITE_ prefix
  const VITE_APP = /^VITE_/i;
  
  const raw = { ...process.env };
  const exposed = {};
  
  // Allow only variables that start with VITE_
  Object.keys(raw).forEach(key => {
    if (VITE_APP.test(key)) {
      exposed[key] = raw[key];
    }
  });
  
  // Add other safe variables here
  exposed.NODE_ENV = getNodeEnv();
  exposed.APP_VERSION = raw.npm_package_version;
  exposed.APP_NAME = raw.npm_package_name;
  
  return {
    // For direct use in JS
    raw: exposed,
    // Stringified for injection into HTML/JS
    stringified: Object.keys(exposed).reduce((env, key) => {
      env[`import.meta.env.${key}`] = JSON.stringify(exposed[key]);
      return env;
    }, {})
  };
};

// Initialize environment
export const initEnv = () => {
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
};

export default {
  ENV,
  getNodeEnv,
  isProd,
  isDev,
  isTest,
  loadEnv,
  validateEnv,
  getClientEnv,
  initEnv
};
