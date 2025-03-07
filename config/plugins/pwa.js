/**
 * Progressive Web App (PWA) configuration for the portfolio project
 * 
 * This file configures the PWA features for the application, including
 * service worker, offline support, and manifest generation.
 */

import { VitePWA } from 'vite-plugin-pwa';
import env from '../env.js';

// Get environment mode
const { isProd } = env;

/**
 * Creates the PWA plugin with configuration for the portfolio
 * @returns {Object} Configured PWA plugin
 */
export const createPwaPlugin = () => {
  return VitePWA({
    // Use autoUpdate to automatically apply updates when available
    registerType: 'autoUpdate',
    
    // Include static assets in the PWA
    includeAssets: ['favicon.png', 'robots.txt', 'site.webmanifest'],
    
    // Web app manifest configuration
    manifest: {
      name: 'Derek Mackley | Full Stack Developer',
      short_name: 'Derek Mackley',
      description: 'Portfolio of Derek Mackley, a Full Stack Developer and Security Expert',
      theme_color: '#3563E9',
      icons: [
        {
          src: '/favicon.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/favicon.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    
    // Workbox service worker configuration
    workbox: {
      // Cache strategies for different types of resources
      runtimeCaching: [
        // Google Fonts stylesheets
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        // Google Fonts webfonts
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        // CDN resources (jsDelivr)
        {
          urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'jsdelivr-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        // Images
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
            },
          },
        },
        // API requests (GitHub)
        {
          urlPattern: new RegExp('^https://api.github.com/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60, // 1 hour
            },
            networkTimeoutSeconds: 10,
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  });
};

/**
 * Get PWA plugins based on environment
 * @returns {Array} Array of configured plugins
 */
export const getPwaPlugins = () => {
  // Enable PWA features in all environments for consistent behavior
  return [createPwaPlugin()];
};

export default getPwaPlugins;
