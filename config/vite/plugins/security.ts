import { Plugin } from 'vite';
import type { SecurityPluginOptions } from '../types/security';
/**
 * Default CSP directives based on environment
 */
const getDefaultCspDirectives = (isProd: boolean) => ({
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
    'https://code.iconify.design',
    'https://api.iconify.design',
    ...(isProd ? [] : ["'unsafe-eval'"]) // Allow eval in development for source maps
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com'
  ],
  'img-src': [
    "'self'",
    'data:',
    'blob:',
    'https:',
    'https://avatars.githubusercontent.com',
    'https://*.githubusercontent.com',
    'https://*.basemaps.cartocdn.com',
    'https://*.tile.openstreetmap.org'
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com',
    'data:'
  ],
  'connect-src': [
    "'self'",
    'https://api.github.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://api.iconify.design',
    'https://code.iconify.design',
    'https://cdn.jsdelivr.net',
    'https://*.tile.openstreetmap.org',
    'https://*.basemaps.cartocdn.com',
    'https://nominatim.openstreetmap.org',
    ...(isProd ? [] : ['ws:', 'wss:']) // Allow WebSocket in development for HMR
  ],
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'manifest-src': ["'self'"],
  'worker-src': ["'self'", 'blob:'],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'media-src': ["'self'"],
  'prefetch-src': ["'self'"],
  'child-src': ["'self'", 'blob:'],
  'sandbox': [
    'allow-forms',
    'allow-scripts',
    'allow-same-origin',
    'allow-popups',
    'allow-popups-to-escape-sandbox',
    'allow-downloads'
  ],
  ...(isProd ? { 'upgrade-insecure-requests': [""] } : {})
});

/**
 * Create security headers plugin
 */
function createSecurityHeadersPlugin({ isProd = false }: SecurityPluginOptions = {}): Plugin {
  return {
    name: 'vite-plugin-security-headers',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Basic security headers
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('X-DNS-Prefetch-Control', 'off');
        res.setHeader('X-Download-Options', 'noopen');
        res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        
        // Permissions policy (formerly Feature-Policy)
        res.setHeader('Permissions-Policy', [
          'accelerometer=()',
          'ambient-light-sensor=()',
          'autoplay=()',
          'battery=()',
          'camera=()',
          'cross-origin-isolated=()',
          'display-capture=()',
          'document-domain=()',
          'encrypted-media=()',
          'execution-while-not-rendered=()',
          'execution-while-out-of-viewport=()',
          'fullscreen=(self)',
          'geolocation=()',
          'gyroscope=()',
          'keyboard-map=()',
          'magnetometer=()',
          'microphone=()',
          'midi=()',
          'navigation-override=()',
          'payment=()',
          'picture-in-picture=()',
          'publickey-credentials-get=()',
          'screen-wake-lock=()',
          'sync-xhr=()',
          'usb=()',
          'web-share=()',
          'xr-spatial-tracking=()',
          'clipboard-read=()',
          'clipboard-write=(self)',
          'interest-cohort=()'
        ].join(', '));

        // Cross-Origin headers
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
        
        // Clear site data header for better privacy
        if (isProd) {
          res.setHeader('Clear-Site-Data', '"cache","cookies","storage"');
        }
        
        // Content Security Policy
        const directives = getDefaultCspDirectives(isProd);
        const cspHeader = Object.entries(directives)
          .map(([key, values]) => 
            Array.isArray(values) ? `${key} ${values.join(' ')}` : `${key} ${values}`
          )
          .join('; ');
        
        res.setHeader('Content-Security-Policy', cspHeader);
        
        next();
      });
    },
    transformIndexHtml(html) {
      // Add meta tags for security in the HTML
      return html.replace(
        '</head>',
        `  <meta http-equiv="X-Content-Type-Options" content="nosniff" />
  <meta http-equiv="X-Frame-Options" content="DENY" />
  <meta http-equiv="X-XSS-Protection" content="1; mode=block" />
  <meta http-equiv="X-DNS-Prefetch-Control" content="off" />
  <meta http-equiv="X-Download-Options" content="noopen" />
  <meta http-equiv="X-Permitted-Cross-Domain-Policies" content="none" />
  <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
  <meta http-equiv="Permissions-Policy" content="accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), usb=(), xr-spatial-tracking=(), interest-cohort=()" />
  <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin" />
  <meta http-equiv="Cross-Origin-Resource-Policy" content="same-origin" />
  <meta http-equiv="Cross-Origin-Embedder-Policy" content="require-corp" />
</head>`
      );
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
            res.setHeader('Retry-After', Math.ceil((WINDOW_MS - (now - current.timestamp)) / 1000));
            res.end('Too Many Requests');
            return;
          }
          current.count++;
        } else {
          requestCounts.set(ip, { count: 1, timestamp: now });
        }
        
        // Add rate limit headers
        res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
        res.setHeader('X-RateLimit-Remaining', 
          current ? MAX_REQUESTS - current.count : MAX_REQUESTS - 1);
        
        next();
      });
    }
  };
}

/**
 * Create CORS plugin
 */
function createCorsPlugin({ isProd = false }: SecurityPluginOptions = {}): Plugin {
  return {
    name: 'vite-plugin-cors',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // In production, only allow specific origins
        const allowedOrigins = isProd 
          ? (process.env.VITE_ALLOWED_ORIGINS || '').split(',')
          : ['*'];
        
        const origin = req.headers.origin;
        if (origin) {
          if (isProd) {
            if (allowedOrigins.includes(origin)) {
              res.setHeader('Access-Control-Allow-Origin', origin);
            }
          } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
          }
        }
        
        // Allow credentials in production only for specific origins
        if (isProd && origin && allowedOrigins.includes(origin)) {
          res.setHeader('Access-Control-Allow-Credentials', 'true');
        }
        
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 
          'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        
        // Handle preflight requests
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }
        
        next();
      });
    }
  };
}

/**
 * Get all security plugins
 */
export function getSecurityPlugins(options: SecurityPluginOptions = {}): Plugin[] {
  return [
    createSecurityHeadersPlugin(options),
    createRateLimitPlugin(options),
    createCorsPlugin(options)
  ];
}

export default getSecurityPlugins;