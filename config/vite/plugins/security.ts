/**
 * Security plugins configuration for Vite
 */
import { Plugin } from 'vite';
import { SecurityHeaders } from '../types/security';

interface SecurityPluginOptions {
  isProd?: boolean;
}

/**
 * Create security headers plugin
 */
function createSecurityHeadersPlugin({ isProd = false }: SecurityPluginOptions = {}): Plugin {
  return {
    name: 'vite-plugin-security-headers',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Security headers
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        
        // CSP Headers - Stricter in production
        const cspDirectives = [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src 'self' data: https:",
          "font-src 'self' https://fonts.gstatic.com",
          "connect-src 'self'",
          isProd ? "upgrade-insecure-requests" : "",
        ].filter(Boolean).join('; ');
        
        res.setHeader('Content-Security-Policy', cspDirectives);
        
        next();
      });
    }
  };
}

/**
 * Create rate limiting plugin
 */
function createRateLimitPlugin({ isProd = false }: SecurityPluginOptions = {}): Plugin {
  const requestCounts = new Map<string, { count: number; timestamp: number }>();
  const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  const MAX_REQUESTS = isProd ? 100 : 1000;

  return {
    name: 'vite-plugin-rate-limit',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const ip = req.socket.remoteAddress || 'unknown';
        const now = Date.now();
        
        // Clean up old entries
        if (requestCounts.has(ip)) {
          const record = requestCounts.get(ip)!;
          if (now - record.timestamp > WINDOW_MS) {
            requestCounts.delete(ip);
          }
        }
        
        // Check rate limit
        const current = requestCounts.get(ip);
        if (current) {
          if (current.count >= MAX_REQUESTS) {
            res.statusCode = 429;
            res.end('Too Many Requests');
            return;
          }
          current.count++;
        } else {
          requestCounts.set(ip, { count: 1, timestamp: now });
        }
        
        next();
      });
    }
  };
}

/**
 * Get all security plugins
 */
export function getSecurityPlugins({ isProd = false }: SecurityPluginOptions = {}): Plugin[] {
  return [
    createSecurityHeadersPlugin({ isProd }),
    createRateLimitPlugin({ isProd }),
  ];
}

export default getSecurityPlugins;