import { createBaseServer, startServer } from '../server.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Development-specific configuration
const devConfig = {
  port: process.env.PORT || 3001,
  allowedDomains: [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://localhost:5173',  // Vite dev server
    'http://localhost:6006',  // Storybook
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:6006'
  ],
  buildPath: path.join(__dirname, '../../../build'),
  storybookPath: path.join(__dirname, '../../../storybook-static'),
  docsPath: path.join(__dirname, '../../../docs-static'),
  rateLimitMax: 1000, // More lenient in development
  rateLimitWindow: 15 * 60 * 1000,
  cacheMaxAge: '0' // Disable caching in development
};

// Create and start the development server
const app = createBaseServer(devConfig);

// Development-specific middleware can be added here
if (process.env.NODE_ENV !== 'production') {
  // Add development logging
  app.use((req, res, next) => {
    console.log(`[DEV] ${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
  });
}

// Start the server
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer(app, devConfig.port);
}