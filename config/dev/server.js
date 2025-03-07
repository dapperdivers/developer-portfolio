/**
 * Development server configuration for the portfolio project
 * 
 * This file configures the Vite development server with settings for
 * port, security headers, CORS, and proxy rules.
 */

import env from '../env.js';

// Get environment info
const { isDev } = env;

/**
 * Configure development server settings
 * @returns {Object} Server configuration
 */
export const getServerConfig = () => {
  return {
    // Server port - make this customizable through env vars
    port: process.env.DEV_PORT || 3000,
    
    // Automatically open browser on server start
    open: true,
    
    // CORS configuration for better security and cross-origin handling
    cors: true,
    
    // Security headers
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      // In dev mode, allow all origins for easier local testing
      'Access-Control-Allow-Origin': '*'
    },
    
    // Proxy configuration for external services
    proxy: {
      // Proxy OSM tile requests
      '/osm-tiles': {
        target: 'https://tile.openstreetmap.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/osm-tiles/, '')
      },
      
      // Proxy Nominatim API requests for geocoding
      '/nominatim': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nominatim/, '')
      },
      
      // Example of API proxy (uncomment and modify as needed)
      /*
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
      */
    },
    
    // Enable HTTPS (uncomment if needed)
    /*
    https: {
      key: fs.readFileSync('path/to/key.pem'),
      cert: fs.readFileSync('path/to/cert.pem')
    },
    */
    
    // Watch configuration - for customizing file watching behavior
    watch: {
      // Exclude these files from watch to improve performance
      excluded: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
    },
    
    // HMR configuration could go here, but we'll keep the defaults
    hmr: true,
  };
};

/**
 * Get complete development mode configuration
 * @returns {Object} Development configuration
 */
export const getDevConfig = () => {
  // Only return server config when in development mode
  return isDev() ? {
    server: getServerConfig()
  } : {};
};

export default getDevConfig;
