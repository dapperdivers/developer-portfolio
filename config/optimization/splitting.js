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
      test: resolve(rootDir, 'test.html')
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
        // React core - always include all React functionality
        if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
          return 'vendor-react';
        }
        
        // Animation libraries need direct React access - put them in the React vendor chunk
        if (id.includes('framer-motion') || id.includes('lottie') || id.includes('motion-')) {
          return 'vendor-react'; // Bundle ALL animation with React to prevent context issues
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
      
      // Context is critically important and should be bundled with core React
      // to prevent tree-shaking from breaking context functionality
      if (id.includes('/src/context/')) {
        // Both the PortfolioContext and AnimationContext should be bundled with React core
        return 'vendor-react';
      }
      
      // Animation-related code should also preserve React context functionality
      if (id.includes('framer-motion') || id.includes('lottie')) {
        if (id.includes('context') || id.includes('provider')) {
          // Bundle any animation context/provider with React core
          return 'vendor-react';
        }
      }
      
      // Bundle ALL application components with React vendor bundle for maximum compatibility 
      // This is less optimal for performance but prevents all possible initialization issues
      if (id.includes('/src/components/')) {
        return 'vendor-react';
      }
      
      // Hooks layer
      if (id.includes('/src/hooks/')) {
        // Also bundle hooks with React to prevent initialization issues
        return 'vendor-react';
      }
      
      // Utilities and other non-critical code
      if (id.includes('/src/utils/')) {
        return 'app-utils';
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
