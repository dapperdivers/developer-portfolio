/**
 * Optimized Bundle Splitting Strategy
 * 
 * This file offers a more balanced approach to code splitting that:
 * 1. Preserves React functionality in critical components
 * 2. Maintains reasonable bundle sizes
 * 3. Prevents tree-shaking from breaking React API usage
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
 * Pattern matchers for React API usage
 */
const REACT_API_PATTERNS = [
  'React.createContext',
  'React.memo',
  'React.forwardRef',
  'React.Component',
  'React.PureComponent',
  'React.lazy',
  'React.Suspense',
  'extends React.',
  'extends Component',
  'createContext(',
  'useContext(',
  // Additional patterns for React API usage
];

/**
 * Critical file patterns that should always be bundled with React
 */
const CRITICAL_FILE_PATTERNS = [
  'Provider.jsx',
  'Provider.tsx',
  'Context.jsx',
  'Context.tsx',
  '/context/',
  '/providers/'
];

/**
 * Check if a file uses React APIs that need preservation
 * @param {string} filePath - Path to the file
 * @returns {boolean} True if the file uses React APIs that need preservation
 */
function usesReactApis(filePath) {
  try {
    if (!filePath.endsWith('.jsx') && !filePath.endsWith('.tsx')) {
      return false;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for critical file patterns first (faster check)
    if (CRITICAL_FILE_PATTERNS.some(pattern => filePath.includes(pattern))) {
      return true;
    }
    
    // Check for React API usage patterns
    return REACT_API_PATTERNS.some(pattern => content.includes(pattern));
  } catch (e) {
    console.error(`Failed to analyze file ${filePath}:`, e.message);
    // Be conservative - bundle with React if we can't analyze
    return true;
  }
}

/**
 * Configure code splitting strategy
 * @returns {Object} Manual chunks configuration for Rollup
 */
export function createChunkStrategy() {
  const analyzedFiles = new Map();
  
  return {
    manualChunks: (id) => {
      // Vendor chunks - dependencies
      if (id.includes('node_modules')) {
        // React core - always include all React functionality
        if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
          return 'vendor-react';
        }
        
        // Animation libraries that use React features internally
        if (id.includes('framer-motion') || id.includes('lottie-') || id.includes('motion-')) {
          // Only critical animation features need to be with React
          if (id.includes('context') || id.includes('provider') || id.includes('animation')) {
            return 'vendor-react';
          }
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
        
        // All other dependencies in a vendor chunk
        return 'vendor-other';
      }
      
      // Context files are always bundled with React
      if (id.includes('/src/context/')) {
        return 'vendor-react';
      }
      
      // Application components - analyze for React API usage
      if (id.includes('/src/components/')) {
        // Cache analysis results
        if (!analyzedFiles.has(id)) {
          analyzedFiles.set(id, usesReactApis(id));
        }
        
        // If component uses React APIs, bundle with React
        if (analyzedFiles.get(id)) {
          return 'vendor-react';
        }
        
        // Otherwise, use regular component chunking
        if (id.includes('/atoms/')) return 'app-atoms';
        if (id.includes('/molecules/')) return 'app-molecules';
        if (id.includes('/organisms/')) return 'app-organisms';
        if (id.includes('/layout/')) return 'app-layout';
        return 'app-components';
      }
      
      // Hooks layer - analyze carefully
      if (id.includes('/src/hooks/')) {
        // Cache analysis results
        if (!analyzedFiles.has(id)) {
          analyzedFiles.set(id, usesReactApis(id));
        }
        
        // If hook uses React APIs, bundle with React
        if (analyzedFiles.get(id)) {
          return 'vendor-react';
        }
        
        return 'app-hooks';
      }
      
      // Utilities and other non-critical code
      if (id.includes('/src/utils/')) {
        // Check for React utility functions
        if (id.includes('context') || id.includes('react')) {
          if (!analyzedFiles.has(id)) {
            analyzedFiles.set(id, usesReactApis(id));
          }
          
          if (analyzedFiles.get(id)) {
            return 'vendor-react';
          }
        }
        
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
