/**
 * Vite Development Configuration
 * 
 * This provides Vite-specific development server configuration
 * separate from our Express server setup.
 */

import { ServerOptions } from 'vite';

interface DevConfigOptions {
  port?: number;
  host?: string | boolean;
  open?: boolean;
}

/**
 * Get Vite development server configuration
 */
export function getViteDevConfig({
  port = 5173,
  host = true,
  open = false
}: DevConfigOptions = {}): { server: ServerOptions; preview: ServerOptions } {
  return {
    // Vite development server configuration
    server: {
      port,
      host,
      open,
      cors: true,
      strictPort: false,
      
      // Watch configuration
      watch: {
        usePolling: false,
        ignored: [
          '**/node_modules/**',
          '**/dist/**',
          '**/build/**',
          '**/.git/**',
          '**/coverage/**'
        ]
      }
    },
    
    // Preview server configuration (for production builds)
    preview: {
      port: parseInt(process.env.PREVIEW_PORT || '4173', 10),
      host: process.env.PREVIEW_HOST || '0.0.0.0',
      open: false,
      cors: true,
      strictPort: process.env.STRICT_PORT === 'true'
    }
  };
}

export default getViteDevConfig;