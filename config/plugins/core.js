/**
 * Core plugins configuration for the portfolio project
 * 
 * This file configures the essential plugins required for the basic functionality
 * of the React application using Vite. It includes React-specific plugins.
 */

import react from '@vitejs/plugin-react';
import env from '../env.js';

// Get environment info
const { isProd, getNodeEnv } = env;
const mode = getNodeEnv();

/**
 * Configure the core React plugin
 * @param {Object} options - Configuration options
 * @param {boolean} options.isProd - Whether we're in production mode
 * @returns {Object} Configured React plugin instance
 */
export function createReactPlugin({ isProd = false } = {}) {
  return react({
    // Enable React fast refresh for better development experience
    fastRefresh: true,
    
    // Use automatic JSX runtime to avoid issues with react-is
    jsxRuntime: 'automatic',
    
    // Babel configuration
    babel: {
      plugins: [
        // Remove prop-types in production for smaller bundle size
        // Setting to false to prevent removal for easier debugging
        isProd ? 
          ['babel-plugin-transform-react-remove-prop-types', { removeImport: false }] : 
          null,
      ].filter(Boolean)
    }
  });
}

/**
 * Get all core plugins for the application
 * @param {Object} options - Configuration options
 * @param {boolean} options.isProd - Whether we're in production mode
 * @returns {Array} Array of configured plugins
 */
export function getCorePlugins({ isProd = false } = {}) {
  return [
    createReactPlugin({ isProd }),
  ];
}

export default getCorePlugins;
