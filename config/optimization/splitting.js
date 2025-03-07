/**
 * Bundle splitting and optimization strategies
 * 
 * This file defines the code splitting strategy for the application,
 * optimizing chunk sizes and bundle organization.
 */

import { resolve } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Get project root directory correctly in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

/**
 * Define entry points for the build
 * @param {Object} options - Configuration options
 * @param {string} options.rootDir - Root directory of the project
 * @returns {Object} Entry points for Rollup
 */
export function createEntryPoints({ rootDir = projectRoot } = {}) {
  console.log('Creating entry points with rootDir:', rootDir);
  return {
    input: {
      main: resolve(rootDir, 'index.html'),
    }
  };
}

/**
 * Configure code splitting strategy
 * @returns {Object} Manual chunks configuration for Rollup
 */
export function createChunkStrategy() {
  return {
    manualChunks: (id) => {
      // Vendor chunks - dependencies
      if (id.includes('node_modules')) {
        // React and related core packages - explicitly include react-is
        if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler') || id.includes('react-is') || id.includes('prop-types')) {
          return 'vendor-react';
        }
        
        // Animation libraries
        if (id.includes('framer-motion') || id.includes('lottie')) {
          return 'vendor-animation';
        }
        
        // UI component libraries
        if (id.includes('iconify') || id.includes('react-icons')) {
          return 'vendor-ui';
        }
        
        // Data fetching and utilities
        if (id.includes('axios') || id.includes('classnames')) {
          return 'vendor-utils';
        }
        
        // All other dependencies in a single vendor chunk
        return 'vendor-other';
      }
      
      // Application code - separate by feature area
      
      // Context provider files - separate from utilities to allow better tree-shaking
      if (id.includes('/src/context/')) {
        return 'feature-context';
      }
      
      // Component files - split by component type
      if (id.includes('/src/components/')) {
        if (id.includes('/atoms/')) {
          return 'components-atoms';
        } else if (id.includes('/molecules/')) {
          return 'components-molecules';
        } else if (id.includes('/organisms/')) {
          return 'components-organisms';
        } else if (id.includes('/layout/')) {
          return 'components-layout';
        }
        return 'components-other';
      }
      
      // Hooks layer
      if (id.includes('/src/hooks/')) {
        return 'feature-hooks';
      }
      
      // Utilities - Split context utilities from other utils to allow tree-shaking
      if (id.includes('/src/utils/')) {
        if (id.includes('context')) {
          return 'feature-context-utils';
        }
        return 'feature-utils';
      }
    }
  };
}

/**
 * Get output naming configuration
 * @returns {Object} Output naming configuration
 */
export function createOutputNaming() {
  return {
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
    }
  };
}

/**
 * Get complete code splitting configuration
 * @param {Object} options - Configuration options
 * @param {string} options.rootDir - Root directory of the project
 * @returns {Object} Rollup options with code splitting configuration
 */
export function getCodeSplittingConfig({ rootDir = projectRoot } = {}) {
  return {
    rollupOptions: {
      ...createEntryPoints({ rootDir }),
      output: {
        ...createOutputNaming(),
        ...createChunkStrategy()
      }
    }
  };
}

export default getCodeSplittingConfig;
