/**
 * Core plugins configuration for the portfolio project
 * 
 * This file configures the essential plugins required for the basic functionality
 * of the React application using Vite. It includes React-specific plugins.
 */

import react from '@vitejs/plugin-react';
import env from '../base/env';

// Get environment info
const { isProd, getNodeEnv } = env;
const mode = getNodeEnv();

interface ReactPluginOptions {
  isProd?: boolean;
}

/**
 * Configure the core React plugin
 * @param {Object} options - Configuration options
 * @param {boolean} options.isProd - Whether we're in production mode
 * @returns {Object} Configured React plugin instance
 */
export function createReactPlugin({ isProd = false }: ReactPluginOptions = {}) {
  // @vitejs/plugin-react 6 transforms JSX with Oxc (automatic runtime, fast
  // refresh on by default) and no longer accepts inline Babel options.
  return react();
}

/**
 * Get all core plugins for the application
 * @param {Object} options - Configuration options
 * @param {boolean} options.isProd - Whether we're in production mode
 * @returns {Array} Array of configured plugins
 */
export function getCorePlugins({ isProd = false }: ReactPluginOptions = {}) {
  return [
    createReactPlugin({ isProd }),
  ];
}

export default getCorePlugins;