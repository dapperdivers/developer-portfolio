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

// Initialize environment variables
const { initEnv, getClientEnv, isProd, isDev, getNodeEnv } = envConfig;
const env = initEnv();

/**
 * Creates the complete Vite configuration by composing all the modular pieces
 */
export default defineConfig(({ command, mode }) => {
  // Determine mode (development, production, test)
  const currentMode = getNodeEnv();
  const isAnalyze = process.env.ANALYZE === 'true';
  
  console.log(`Building for ${currentMode} mode (${command})...`);
  
  // Merge Rollup options from the code splitting configuration
  const rollupOptions = getCodeSplittingConfig();
  
  // Get all plugins
  const allPlugins = [
    // Core essential plugins
    ...getCorePlugins({ isProd: isProd() }),
    
    // Progressive Web App features and analysis tools
    ...getPwaPlugins({ isProd: isProd(), analyze: isAnalyze }),
  ].filter(Boolean); // Remove any false/undefined entries
  
  // Development server configuration
  const devConfig = getDevConfig();
  
  return {
    // Base URL for assets
    base: '/',
    
    // Environment configuration
    ...envConfig.getEnvConfig(),
    
    // Plugin configuration
    plugins: allPlugins,
    
    // Path resolving (aliases)
    resolve: {
      alias: paths.createAliases(),
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
      
      // Source maps in development or analysis mode
      sourcemap: !isProd() || isAnalyze,
      
      // Increase warning limit for chunks
      chunkSizeWarningLimit: 1600,
      
      // Apply Rollup options from splitting.js
      ...rollupOptions,
      
      // Minification settings
      minify: isProd() ? 'terser' : false,
      
      // Terser configuration for minification
      terserOptions: isProd() ? {
        compress: {
          passes: 2,
          drop_console: true,
          drop_debugger: true
        },
        format: {
          comments: false
        }
      } : undefined
    },
    
    // Development server configuration (from dev/server.js)
    ...devConfig,
    
    // Dependency optimization
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
      // Force re-optimization when needed
      force: process.env.FORCE_OPTIMIZE === 'true'
    },
    
    // Test configuration
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupVitest.js'],
      include: [
        'src/__tests__/**/*.test.js?(x)',
        'src/components/**/__tests__/*.test.jsx',
        'src/components/**/*.test.jsx',
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
    }
  };
});
