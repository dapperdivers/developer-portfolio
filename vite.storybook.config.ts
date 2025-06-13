/**
 * Storybook-specific Vite configuration
 * 
 * This config excludes PWA plugins to prevent build issues with large assets
 * that exceed Workbox size limits.
 */

import { defineConfig } from 'vite';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

// Import configuration components (excluding PWA)
import paths from './config/vite/base/paths';
import envConfig from './config/vite/base/env';
import getCorePlugins from './config/vite/plugins/core';
import getCodeSplittingConfig from './config/vite/optimization/splitting';

// Initialize environment variables
const { initEnv, isDev } = envConfig;
const env = initEnv();

/**
 * Storybook-specific Vite configuration without PWA
 */
export default defineConfig(({ command, mode }) => {
  const rollupOptions = getCodeSplittingConfig();
  
  // Get core plugins but exclude PWA
  const allPlugins = [
    nodePolyfills(),
    ...getCorePlugins({ isProd: false }), // Always use dev mode for Storybook
  ].filter(Boolean);
  
  return {
    base: '/',
    
    // Environment configuration
    ...envConfig.getEnvConfig(),
    
    // Plugin configuration (no PWA)
    plugins: allPlugins,
    
    // Path resolving (aliases)
    resolve: {
      alias: paths.createAliases(),
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    
    // CSS configuration
    css: {
      modules: {
        localsConvention: 'camelCase',
      },
      devSourcemap: true,
    },
    
    // Build configuration optimized for Storybook
    build: {
      outDir: 'storybook-static',
      sourcemap: true,
      // Higher chunk size limit for Storybook's large bundles
      chunkSizeWarningLimit: 3000,
      // Apply Rollup options
      ...rollupOptions,
      // Disable minification for faster Storybook builds
      minify: false,
    },
    
    // Dependency optimization
    optimizeDeps: {
      include: [
        'react', 
        'react-dom',
        'framer-motion',
        'lottie-react',
        '@iconify/react',
        'prop-types',
        'react-is',
        'axios',
        'classnames'
      ],
      force: process.env.FORCE_OPTIMIZE === 'true'
    }
  };
});