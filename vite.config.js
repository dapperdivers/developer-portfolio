import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react({
      // Enable React Fast Refresh
      fastRefresh: true,
      // Better compile-time JSX optimizations
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    // Add PWA support
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'robots.txt', 'site.webmanifest'],
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
      workbox: {
        runtimeCaching: [
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
    }),
  ],
  server: {
    port: 3000,
    open: true,
    // For better security and cross-origin handling
    cors: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms'),
      '@layout': path.resolve(__dirname, 'src/components/layout'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@context': path.resolve(__dirname, 'src/context'),
    }
  },
  css: {
    // Enable CSS modules
    modules: {
      localsConvention: 'camelCase',
    },
    // Enable source maps for development
    devSourcemap: true,
    // We'll handle postcss separately since we're using ESM
  },
  build: {
    outDir: 'build',
    sourcemap: process.env.NODE_ENV !== 'production',
    chunkSizeWarningLimit: 1600,
    // Improve asset compression
    assetsInlineLimit: 4096, // 4kb
    cssCodeSplit: true,
    minify: 'terser',
    // Disable warning for eval() in lottie-web
    esbuildOptions: {
      legalComments: 'none',
      target: ['es2020'],
      supported: { 'top-level-await': true },
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      onwarn(warning, warn) {
        // Ignore eval warnings from lottie-web
        if (warning.code === 'EVAL' && warning.id && warning.id.includes('lottie-web')) {
          return;
        }
        warn(warning);
      },
      output: {
        // Better chunk naming strategy
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
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
        },
        // Improved code splitting strategy
        manualChunks: (id) => {
          // Vendor bundle - dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('lottie')) {
              return 'vendor-lottie';
            }
            // We've removed the vendor-icons chunk as it was generating an empty chunk
            // Include @iconify in vendor-other instead of a separate chunk
            return 'vendor-other';
          }
          // Component bundles - app code
          if (id.includes('/src/components/')) {
            return 'components';
          }
          if (id.includes('/src/containers/')) {
            return 'containers';
          }
          if (id.includes('/src/utils/')) {
            return 'utils';
          }
        }
      }
    },
    terserOptions: {
      parse: {
        bare_returns: false
      },
      compress: {
        passes: 2,
        warnings: false,
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: process.env.NODE_ENV === 'production',
        pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log', 'console.debug', 'console.info'] : []
      },
      mangle: true,
      module: false,
      format: {
        comments: false
      }
    }
  },
  // Enable detailed stats
  stats: 'detailed',
  // Define environment variables
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version),
    'import.meta.env.APP_NAME': JSON.stringify(process.env.npm_package_name)
  }
});
