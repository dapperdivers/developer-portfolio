import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import config parts directly to avoid potential issues in config/index.js
import * as envModule from './config/env.js';
import * as pathsModule from './config/paths.js';
import { getCorePlugins } from './config/plugins/core.js';
import { getPwaPlugins } from './config/plugins/pwa.js';
import { getCodeSplittingConfig } from './config/optimization/splitting.js';
import { getDevConfig } from './config/dev/server.js';

async function startServer() {
  try {
    console.log('Step 1: Loading environment variables');
    // Initialize environment variables
    const env = envModule.initEnv();
    console.log('Environment initialized successfully');
    
    // Check environment functions
    const isProd = envModule.isProd();
    const isDev = envModule.isDev();
    console.log(`Running in ${isProd ? 'production' : 'development'} mode`);
    
    console.log('Step 2: Setting up rollup options');
    // Get code splitting config with explicit rootDir
    const rollupOptions = getCodeSplittingConfig({ rootDir: __dirname });
    console.log('Code splitting config created successfully');
    
    console.log('Step 3: Loading plugins');
    // Get plugins
    const corePlugins = getCorePlugins({ isProd });
    const pwaPlugins = getPwaPlugins({ isProd, analyze: false });
    
    // Filter out any null/undefined plugins
    const allPlugins = [...corePlugins, ...pwaPlugins].filter(Boolean);
    console.log(`Loaded ${allPlugins.length} plugins`);
    
    console.log('Step 4: Setting up dev server config');
    // Get dev server config
    const devConfig = getDevConfig();
    console.log('Dev server config created successfully');
    
    console.log('Step 5: Setting up path aliases');
    // Get path aliases
    const aliases = pathsModule.createAliases();
    console.log('Path aliases created successfully');
    
    console.log('Step 6: Creating final Vite config');
    // Create the final config
    const finalConfig = {
      // Base URL for assets
      base: '/',
      
      // Environment configuration
      ...envModule.getEnvConfig(),
      
      // Plugin configuration
      plugins: allPlugins,
      
      // Path resolving (aliases)
      resolve: {
        alias: aliases,
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      },
      
      // CSS configuration
      css: {
        // Enable CSS modules
        modules: {
          localsConvention: 'camelCase',
        },
        // Enable source maps for development
        devSourcemap: isDev,
      },
      
      // Build configuration
      build: {
        // Output directory
        outDir: 'build',
        
        // Source maps in development
        sourcemap: isDev,
        
        // Apply Rollup options from splitting.js
        ...rollupOptions,
        
        // Minification settings
        minify: isProd ? 'terser' : false,
      },
      
      // Development server configuration
      ...devConfig,
      
      // Test configuration
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
      }
    };
    
    console.log('Step 7: Creating and starting server');
    // Create and start the server
    const server = await createServer({
      ...finalConfig,
      clearScreen: false, // Don't clear console to preserve debug output
      logLevel: 'info',
    });
    
    console.log('Server created, starting it...');
    await server.listen();
    
    console.log(`Development server running at http://localhost:${server.config.server.port}`);
    
    // Handle server close
    ['SIGINT', 'SIGTERM'].forEach(signal => {
      process.on(signal, () => {
        server.close().then(() => {
          console.log('Server closed');
          process.exit();
        });
      });
    });
  } catch (error) {
    console.error('Error starting server:');
    console.error(error);
  }
}

startServer();
