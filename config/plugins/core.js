/**
 * Core plugins configuration for the portfolio project
 * 
 * This file configures the essential plugins required for the basic functionality
 * of the React application using Vite. It includes React-specific plugins and
 * other fundamental build features.
 */

import react from '@vitejs/plugin-react';
import env from '../env.js';

// Get environment mode
const { isProd, getNodeEnv } = env;
const mode = getNodeEnv();

/**
 * Configure the core React plugin
 * @returns {Object} Configured React plugin instance
 */
export const createReactPlugin = () => {
  return react({
    // Enable React Fast Refresh
    fastRefresh: true,
    
    // Use JSX runtime to avoid issues with react-is
    jsxRuntime: 'automatic',
    
    // Babel configuration
    babel: {
      plugins: [
        // Remove prop-types in production for smaller bundle size
        isProd() ? 
          ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }] : 
          null,
      ].filter(Boolean)
    }
  });
};

/**
 * Get all core plugins for the application
 * @returns {Array} Array of configured plugins
 */
export const getCorePlugins = () => {
  return [
    createReactPlugin(),
  ];
};

export default getCorePlugins;
