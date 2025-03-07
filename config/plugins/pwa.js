/**
 * Progressive Web App plugins configuration
 * 
 * This file configures the PWA plugin to enable offline functionality,
 * app installation, and other PWA features.
 */

import { VitePWA } from 'vite-plugin-pwa';
import env from '../env.js';

/**
 * Configure PWA plugin for offline support
 * @param {Object} options - Configuration options
 * @param {boolean} options.isProd - Whether we're in production mode
 * @returns {Object} Configured PWA plugin or null if disabled
 */
export function createPwaPlugin({ isProd = false } = {}) {
  // Only enable PWA in production by default
  if (!isProd && !process.env.ENABLE_PWA_DEV) {
    return null;
  }
  
  return VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.png', 'robots.txt', 'site.webmanifest'],
    manifest: {
      name: 'Developer Portfolio',
      short_name: 'Portfolio',
      description: 'Professional developer portfolio',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'favicon.png',
          sizes: '192x192',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      // Cache strategies
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
            },
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
            },
          },
        },
        {
          urlPattern: /^https:\/\/api\.github\.com\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 // 1 hour
            },
          },
        }
      ],
    }
  });
}

/**
 * Create the bundle analyzer plugin when analysis is enabled
 * @param {Object} options - Configuration options
 * @param {boolean} options.analyze - Whether to enable bundle analysis
 * @returns {Object|null} Visualizer plugin or null if disabled
 */
export function createAnalyzerPlugin({ analyze = false } = {}) {
  if (!analyze) {
    return null;
  }
  
  try {
    const visualizer = require('rollup-plugin-visualizer').visualizer;
    return visualizer({
      open: true,
      filename: 'build/stats.html',
      gzipSize: true,
      brotliSize: true,
    });
  } catch (e) {
    console.warn('Bundle analyzer not available. Install with: yarn add rollup-plugin-visualizer -D');
    return null;
  }
}

/**
 * Get all PWA and analysis related plugins
 * @param {Object} options - Configuration options
 * @param {boolean} options.isProd - Whether we're in production mode
 * @param {boolean} options.analyze - Whether to enable bundle analysis
 * @returns {Array} Array of configured plugins
 */
export function getPwaPlugins({ isProd = false, analyze = false } = {}) {
  return [
    createPwaPlugin({ isProd }),
    createAnalyzerPlugin({ analyze })
  ].filter(Boolean); // Remove null entries
}

export default getPwaPlugins;
