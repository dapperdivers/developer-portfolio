/**
 * Code splitting configuration for the portfolio project
 * 
 * This file defines the strategy for breaking down the application into 
 * separate chunks for optimal loading and caching behavior.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import pathConfig from '../paths.js';

// Get directory paths
const { dirs } = pathConfig;

/**
 * Configure code splitting strategy for the application
 * 
 * The strategy focuses on:
 * 1. Separating third-party dependencies from application code
 * 2. Creating logical chunks based on usage patterns
 * 3. Ensuring good cache utilization
 * 
 * @returns {Object} Configuration for code splitting
 */
export const getCodeSplittingConfig = () => {
  return {
    // Define entry points
    input: {
      main: path.resolve(dirs.root, 'index.html')
    },
    
    // Handle warnings during bundling
    onwarn(warning, warn) {
      // Ignore eval warnings from third-party libraries
      if (warning.code === 'EVAL' && warning.id && 
          (warning.id.includes('lottie-web') || 
           warning.id.includes('@storybook/core') ||
           warning.id.includes('node_modules/storybook'))) {
        return;
      }
      warn(warning);
    },
    
    // Configure output paths and naming
    output: {
      // JavaScript chunk naming strategy with content hashing for cache busting
      chunkFileNames: 'assets/js/[name]-[hash].js',
      entryFileNames: 'assets/js/[name]-[hash].js',
      
      // Asset file naming by type
      assetFileNames: ({ name }) => {
        if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
          return 'assets/images/[name]-[hash][extname]';
        }
        if (/\.css$/.test(name ?? '')) {
          return 'assets/css/[name]-[hash][extname]';
        }
        if (/\.(woff|woff2|eot|ttf|otf)$/.test(name ?? '')) {
          return 'assets/fonts/[name]-[hash][extname]';
        }
        return 'assets/[name]-[hash][extname]';
      },
      
    // Define which modules go into which chunks with a simplified strategy
    manualChunks: (id) => {
      // Vendor chunks - dependencies
      if (id.includes('node_modules')) {
        // React core - most frequently used and changes less often
        if (id.includes('react') || id.includes('react-dom')) {
          return 'vendor-react';
        }
        
        // All other dependencies in a single vendor chunk
        return 'vendor';
      }
      
      // Application code in fewer, more logical chunks
      if (id.includes('/src/components/') || 
          id.includes('/src/context/') || 
          id.includes('/src/hooks/')) {
        return 'app-core';
      }
      
      // Utilities and other non-critical code
      if (id.includes('/src/utils/')) {
        return 'app-utils';
      }
      }
    }
  };
};

export default getCodeSplittingConfig;
