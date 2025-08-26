import express from 'express';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load configuration
dotenv.config();

export function createBaseServer(config = {}) {
  const app = express();
  
  const {
    port = process.env.PORT || 3001,
    allowedDomains = (process.env.ALLOWED_DOMAINS || 'http://localhost:3001,http://localhost:3000').split(','),
    buildPath = path.join(__dirname, '../../build'),
    storybookPath = path.join(__dirname, '../../storybook-static'),
    docsPath = path.join(__dirname, '../../docs-static'),
    rateLimitMax = 100,
    rateLimitWindow = 15 * 60 * 1000, // 15 minutes
    cacheMaxAge = '1y',
    ...customConfig
  } = config;

  // Trust first proxy for secure headers
  app.set('trust proxy', 1);

  // Security middleware
  app.use(helmet());

  // Configure CSP
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'", 
          "'unsafe-inline'",
          "'unsafe-eval'",
          'https://fonts.googleapis.com', 
          'https://code.iconify.design',
          'https://api.simplesvg.com'
        ],
        styleSrc: [
          "'self'", 
          "'unsafe-inline'", 
          'https://fonts.googleapis.com'
        ],
        imgSrc: ["'self'", 'data:', 'https://*.basemaps.cartocdn.com', 'https://*.tile.openstreetmap.org', 'https://avatars.githubusercontent.com', 'https://*.githubusercontent.com', 'https://ui-avatars.com', 'blob:'],
        connectSrc: [
          "'self'", 
          'https://api.github.com', 
          'https://fonts.googleapis.com',
          'https://fonts.gstatic.com',
          'https://api.iconify.design',
          'https://api.simplesvg.com',
          'https://cdn.jsdelivr.net',
          'https://*.tile.openstreetmap.org',
          'https://*.basemaps.cartocdn.com',
          'https://nominatim.openstreetmap.org'
        ],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        objectSrc: ["'self'"],  // Allow PDFs
        formAction: ["'self'"],
        manifestSrc: ["'self'"],
      },
    })
  );

  // Add body parser with limits
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Additional security headers
  app.use(helmet.dnsPrefetchControl());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());

  // CORS configuration
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedDomains.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Max-Age', '86400'); // 24 hours
    }
    next();
  });

  // Rate limiting
  const limiter = rateLimit({
    windowMs: rateLimitWindow,
    max: rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
    skipSuccessfulRequests: false,
    trustProxy: true
  });
  app.use(limiter);

  // Common static file headers
  const getStaticHeaders = (secure = false) => ({
    maxAge: cacheMaxAge,
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      res.set('X-Content-Type-Options', 'nosniff');
      res.set('X-Frame-Options', secure ? 'SAMEORIGIN' : 'DENY');
      res.set('X-XSS-Protection', '1; mode=block');
      
      // Set proper MIME types
      if (filePath.endsWith('.css')) {
        res.set('Content-Type', 'text/css');
      } else if (filePath.endsWith('.js')) {
        res.set('Content-Type', 'application/javascript');
      } else if (filePath.endsWith('.json')) {
        res.set('Content-Type', 'application/json');
      } else if (filePath.endsWith('.xml')) {
        res.set('Content-Type', 'application/xml');
      }
      
      res.set('Cache-Control', `public, max-age=${cacheMaxAge === '1y' ? '31536000' : cacheMaxAge}`);
    }
  });

  // Serve main static files
  app.use(express.static(buildPath, {
    ...getStaticHeaders(),
    setHeaders: (res) => {
      res.set('X-Content-Type-Options', 'nosniff');
      res.set('X-Frame-Options', 'DENY');
      res.set('X-XSS-Protection', '1; mode=block');
      res.set('Cache-Control', `public, max-age=${cacheMaxAge === '1y' ? '31536000' : cacheMaxAge}`);
    }
  }));

  // Path-based routing for docs and storybook
  // Serve documentation at /docs route
  app.use('/docs', express.static(docsPath, {
    ...getStaticHeaders(),
    index: 'index.html',
    setHeaders: (res, filePath) => {
      res.set('X-Content-Type-Options', 'nosniff');
      res.set('X-Frame-Options', 'SAMEORIGIN'); // Allow docs to be embedded
      res.set('X-XSS-Protection', '1; mode=block');
      res.set('Cache-Control', `public, max-age=${cacheMaxAge === '1y' ? '31536000' : cacheMaxAge}`);
    }
  }));

  // Serve Storybook at /storybook route
  app.use('/storybook', express.static(storybookPath, {
    ...getStaticHeaders(),
    index: 'index.html',
    setHeaders: (res, filePath) => {
      res.set('X-Content-Type-Options', 'nosniff');
      res.set('X-Frame-Options', 'SAMEORIGIN'); // Allow storybook to be embedded
      res.set('X-XSS-Protection', '1; mode=block');
      res.set('Cache-Control', `public, max-age=${cacheMaxAge === '1y' ? '31536000' : cacheMaxAge}`);
    }
  }));

  // Handle /docs/* and /storybook/* fallback routes (for SPA routing within each app)
  app.get('/docs/*', (req, res) => {
    console.log('🎯 EXPRESS: Docs fallback route hit for path:', req.path);
    const docsIndexPath = path.join(docsPath, 'index.html');
    
    if (existsSync(docsIndexPath)) {
      console.log('🎯 EXPRESS: Serving docs index.html from:', docsIndexPath);
      res.sendFile(docsIndexPath, (err) => {
        if (err) {
          console.error('Error sending docs index.html:', err);
          res.status(500).send('Error loading docs');
        }
      });
    } else {
      console.error('📂 EXPRESS: Docs index.html not found at:', docsIndexPath);
      res.status(404).send('Documentation not available');
    }
  });

  app.get('/storybook/*', (req, res) => {
    console.log('🎯 EXPRESS: Storybook fallback route hit for path:', req.path);
    const storybookIndexPath = path.join(storybookPath, 'index.html');
    
    if (existsSync(storybookIndexPath)) {
      console.log('🎯 EXPRESS: Serving storybook index.html from:', storybookIndexPath);
      res.sendFile(storybookIndexPath, (err) => {
        if (err) {
          console.error('Error sending storybook index.html:', err);
          res.status(500).send('Error loading storybook');
        }
      });
    } else {
      console.error('📂 EXPRESS: Storybook index.html not found at:', storybookIndexPath);
      res.status(404).send('Storybook not available');
    }
  });

  // Health check endpoints
  app.get('/healthz', (req, res) => {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  app.get('/ready', (req, res) => {
    const indexExists = existsSync(path.join(buildPath, 'index.html'));
    
    if (indexExists) {
      res.status(200).json({
        status: 'ready',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(503).json({
        status: 'not_ready',
        reason: 'Critical files missing',
        timestamp: new Date().toISOString()
      });
    }
  });

  app.get('/live', (req, res) => {
    res.status(200).json({
      status: 'alive',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // File serving endpoints
  app.get('/resume/:filename', (req, res) => {
    const filename = req.params.filename;
    
    if (!filename.match(/^[a-zA-Z0-9_-]+\.pdf$/)) {
      console.error('Invalid resume filename requested:', filename);
      return res.status(400).send('Invalid filename');
    }
    
    const filePath = path.join(buildPath, 'files', filename);
    const filesDir = path.join(buildPath, 'files');
    
    if (!filePath.startsWith(filesDir)) {
      console.error('Path traversal attempt detected:', filePath);
      return res.status(403).send('Forbidden');
    }
    
    console.log('Serving resume from:', filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=' + filename);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(404).send('File not found');
      }
    });
  });

  app.get('/contact/:filename', (req, res) => {
    const filename = req.params.filename;
    
    if (!filename.match(/^[a-zA-Z0-9_-]+\.vcf$/)) {
      console.error('Invalid contact filename requested:', filename);
      return res.status(400).send('Invalid filename');
    }
    
    const filePath = path.join(buildPath, 'files', filename);
    const filesDir = path.join(buildPath, 'files');
    
    if (!filePath.startsWith(filesDir)) {
      console.error('Path traversal attempt detected:', filePath);
      return res.status(403).send('Forbidden');
    }
    
    console.log('Serving contact from:', filePath);
    res.setHeader('Content-Type', 'text/vcard');
    res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(404).send('File not found');
      }
    });
  });

  // API endpoints
  app.get('/api/geocode', async (req, res) => {
    try {
      const locationQuery = req.query.q;
      
      if (!locationQuery) {
        return res.status(400).json({ error: 'Missing location query parameter' });
      }
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}&limit=1`,
        {
          headers: {
            'User-Agent': 'PortfolioWebsite/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding API returned status ${response.status}`);
      }
      
      const data = await response.json();
      return res.json(data);
    } catch (error) {
      console.error('Geocoding proxy error:', error);
      return res.status(500).json({ error: 'Failed to geocode location' });
    }
  });

  // Note: No fallback routes needed - each service runs on its own port

  // Catch-all for React app
  app.get('*', (req, res) => {
    console.log('🎯 EXPRESS: Catch-all route hit for path:', req.path);
    const indexPath = path.join(buildPath, 'index.html');
    console.log('🎯 EXPRESS: Serving index.html from:', indexPath);
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error sending index.html:', err);
        res.status(500).send('Error loading index.html');
      }
    });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
    });
  });

  return app;
}

export function startServer(app, port, callback) {
  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    if (callback) callback();
  });
}