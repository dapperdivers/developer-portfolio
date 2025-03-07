/**
 * Main configuration composer for the portfolio project
 * 
 * This file orchestrates all the configuration pieces to create the final
 * Vite configuration. It imports and composes the modular config components
 * based on the current environment.
 */

import { defineConfig } from 'vite';

// Import configuration components
import paths from './paths.js';
import envConfig from './env.js';
import getCorePlugins from './plugins/core.js';
import getPwaPlugins from './plugins/pwa.js';
import getCodeSplittingConfig from './optimization/splitting.js';
import getDevConfig from './dev/server.js';

// Import conditional plugins (only used in analyze mode)
// NOTE: You need to install this package first: yarn add rollup-plugin-visualizer -D
let visualizer;
try {
  const visualizerModule = await import('rollup-plugin-visualizer');
  visualizer = visualizerModule.visualizer;
} catch (e) {
  // Plugin not installed, which is fine for normal builds
  if (process.env.ANALYZE === 'true') {
    console.warn('WARNING: rollup-plugin-visualizer is not installed. Run yarn add rollup-plugin-visualizer -D to enable bundle analysis.');
  }
}

// Initialize environment variables
const { initEnv, getClientEnv, isProd, isDev, getNodeEnv } = envConfig;
const env = initEnv();

/**
 * Creates the complete Vite configuration by composing all the modular pieces
 */
export default defineConfig(({ command, mode }) => {
  // Determine mode (development, production, test)
  const currentMode = getNodeEnv();
  console.log(`Building for ${currentMode} mode...`);
  
  // Merge Rollup options from the code splitting configuration
  const rollupOptions = getCodeSplittingConfig();
  
  // Get all plugins
  const allPlugins = [
    // Core essential plugins first
    ...getCorePlugins(),
    
    // Progressive Web App features
    ...getPwaPlugins(),
    
    // Only add visualizer in analyze mode
    process.env.ANALYZE === 'true' && visualizer && visualizer({
      open: true,
      filename: 'build/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean); // Remove any false/undefined entries
  
  // Merge with development config
  const devConfig = getDevConfig();
  
  return {
    // Base URL for assets (could be configured for CDN deployment)
    base: '/',
    
    // Plugin configuration
    plugins: allPlugins,
    
    // Path resolving (aliases)
    resolve: {
      alias: paths.pathAliases,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    
    // CSS configuration
    css: {
      // Enable CSS modules
      modules: {
        localsConvention: 'camelCase',
      },
      // Enable source maps for development
      devSourcemap: isDev(),
    },
    
    // Build configuration
    build: {
      // Output directory
      outDir: 'build',
      
      // Source maps in development only
      sourcemap: !isProd(),
      
      // Increase warning limit for chunks
      chunkSizeWarningLimit: 1600,
      
      // Inline small assets
      assetsInlineLimit: 4096, // 4kb
      
      // Split CSS into separate files
      cssCodeSplit: true,
      
      // Use terser for minification
      minify: 'terser',
      
      // Cache configuration for faster rebuilds
      cacheDir: '.vite-cache',
      
      // Generate manifest for better caching
      manifest: true,
      
      // Configure esbuild
      esbuildOptions: {
        legalComments: 'none',
        target: ['es2020'],
        supported: { 'top-level-await': true },
        // Define global replacements for environment variables
        define: {
          'globalThis.process.env.NODE_ENV': JSON.stringify(currentMode)
        },
        // Suppress specific warnings
        logOverride: {
          'unsupported-js-syntax': 'silent',
          'eval-in-js': 'silent'
        }
      },
      
      // Apply Rollup options from splitting.js
      rollupOptions,
      
      // Terser configuration for minification
      terserOptions: {
        parse: {
          bare_returns: false
        },
        compress: {
          passes: 2,
          warnings: false,
          drop_console: isProd(),
          drop_debugger: isProd(),
          pure_funcs: isProd() ? ['console.log', 'console.debug', 'console.info'] : []
        },
        // Add safeguards for handling undefined properties
        safari10: true,
        mangle: true,
        module: false,
        format: {
          comments: false
        }
      }
    },
    
    // Development server configuration (from dev/server.js)
    ...devConfig,
    
    // Define environment variables for client-side code
    define: {
      ...env.stringified,
      // Ensure React is not tree-shaken in production
      'process.env.NODE_ENV': JSON.stringify(currentMode)
    },
    
  // Pre-bundle dependencies for faster development
  optimizeDeps: {
    include: [
      'react', 
      'react-dom',
      'framer-motion',
      'lottie-react',
      '@iconify/react',
      'prop-types',
      'axios',
      'classnames'
    ],
    // Exclude large dependencies that are rarely updated during development
    exclude: [],
    // Enable dependency discovery in all packages
    entries: [
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    // Force re-optimization on specific conditions
    force: process.env.FORCE_OPTIMIZE === 'true'
  },
    
    // Test configuration
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupVitest.js'],
      include: [
        'src/__tests__/basic*.test.js?(x)',
        'src/components/**/__tests__/*.test.jsx',
        'src/components/**/*.test.jsx',
        'src/containers/**/__tests__/*.test.jsx',
        'src/hooks/**/__tests__/*.test.js?(x)',
        'src/utils/**/__tests__/*.test.js?(x)'
      ],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        reportsDirectory: './coverage'
      },
      mockReset: false,
      clearMocks: true,
      testTimeout: 10000,
      alias: paths.getTestAliases()
    },
    
    // Enable detailed stats
    stats: 'detailed',
  };
});
