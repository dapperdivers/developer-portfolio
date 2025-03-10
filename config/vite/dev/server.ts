/**
 * Development server configuration
 * 
 * This file configures the Vite development server settings,
 * including port, CORS, HMR, and other dev-specific options.
 */

import env from '../base/env';

interface DevServerOptions {
  port?: number;
  hmr?: boolean;
  open?: boolean;
}

/**
 * Create development server configuration
 * @param {Object} options - Configuration options
 * @param {number} options.port - Port to run the dev server on
 * @param {boolean} options.hmr - Whether to enable hot module replacement
 * @param {boolean} options.open - Whether to open browser on startup
 * @returns {Object} Development server configuration for Vite
 */
export function createDevServerConfig({
  port = parseInt(process.env.VITE_DEV_SERVER_PORT || '3000', 10),
  hmr = true,
  open = true
}: DevServerOptions = {}) {
  return {
    server: {
      port,
      // Only open browser automatically if requested
      open,
      
      // Hot Module Replacement configuration
      hmr: {
        overlay: true,
        protocol: 'ws',
        host: 'localhost',
        port: port
      },
      
      // CORS configuration for development
      cors: true,
      
      // Watch configuration
      watch: {
        usePolling: false,
        // Exclude large directories and files to improve performance
        excluded: [
          '**/node_modules/**',
          '**/dist/**',
          '**/build/**',
          '**/.git/**',
          '**/coverage/**'
        ],
      },
      
      // Proxy configuration for API requests during development
      proxy: {
        // Example: Proxy API requests to a backend server
        // '/api': {
        //   target: 'http://localhost:8080',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, '')
        // }
      },
    },
    
    // Preview server configuration (for production builds)
    preview: {
      port: 4173,
      open: true,
      cors: true
    }
  };
}

/**
 * Get all development configuration
 * @returns {Object} Development configuration for Vite
 */
export function getDevConfig() {
  return createDevServerConfig();
}

export default getDevConfig;