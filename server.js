import express from 'express';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { existsSync } from 'fs';
// Import fetch for the geocoding proxy
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load configuration
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const ALLOWED_DOMAINS = (process.env.ALLOWED_DOMAINS || 'http://localhost:3001,http://localhost:3000').split(',');

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
        'https://code.iconify.design'
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
  if (ALLOWED_DOMAINS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
  }
  next();
});

// Rate limiting - more restrictive for portfolio site
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
  skipSuccessfulRequests: false, // Count successful requests against the rate limit
  trustProxy: true // Trust the X-Forwarded-For header
});
app.use(limiter);

// Serve static files with enhanced security headers
app.use(express.static(path.join(__dirname, 'build'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('X-Frame-Options', 'DENY');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('Cache-Control', 'public, max-age=31536000');
  }
}));

// Debug middleware for /storybook requests
app.use('/storybook', (req, res, next) => {
  console.log('🎯 EXPRESS: Storybook middleware hit for:', req.path, req.url);
  next();
});

// Serve Storybook static files at /storybook path
app.use('/storybook', express.static(path.join(__dirname, 'storybook-static'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  index: 'index.html', // Enable serving index.html for directory requests
  setHeaders: (res, filePath) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('X-Frame-Options', 'SAMEORIGIN'); // Allow Storybook to be embedded in iframes
    res.set('X-XSS-Protection', '1; mode=block');
    
    // Set proper MIME types for Storybook assets
    if (filePath.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.json')) {
      res.set('Content-Type', 'application/json');
    }
    
    res.set('Cache-Control', 'public, max-age=31536000');
  }
}));

// Serve Jekyll docs static files at /docs path
app.use('/docs', express.static(path.join(__dirname, 'docs-static'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  index: 'index.html', // Enable serving index.html for directory requests
  setHeaders: (res, filePath) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('X-Frame-Options', 'SAMEORIGIN'); // Allow docs to be embedded in iframes
    res.set('X-XSS-Protection', '1; mode=block');
    
    // Set proper MIME types for Jekyll assets
    if (filePath.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.json')) {
      res.set('Content-Type', 'application/json');
    } else if (filePath.endsWith('.xml')) {
      res.set('Content-Type', 'application/xml');
    }
    
    res.set('Cache-Control', 'public, max-age=31536000');
  }
}));

// Health check endpoints

// Basic health check (existing for compatibility)
app.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Comprehensive health check with asset verification
app.get('/health/comprehensive', async (req, res) => {
  const healthReport = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      server: { status: 'OK', message: 'Server is running' },
      assets: { status: 'OK', details: {} },
      build: { status: 'OK', details: {} },
      static_routes: { status: 'OK', details: {} }
    },
    metadata: {
      node_version: process.version,
      environment: process.env.NODE_ENV || 'development',
      port: PORT
    }
  };

  let overallStatus = 200;

  try {
    // Check critical build files
    const criticalPaths = [
      path.join(__dirname, 'build', 'index.html'),
      path.join(__dirname, 'build', 'manifest.json'),
      path.join(__dirname, 'storybook-static', 'index.html'),
      path.join(__dirname, 'docs-static', 'index.html')
    ];

    const assetChecks = [];
    
    for (const filePath of criticalPaths) {
      const fileName = path.basename(filePath);
      const dirName = path.basename(path.dirname(filePath));
      const key = `${dirName}/${fileName}`;
      
      try {
        const exists = existsSync(filePath);
        if (exists) {
          const stats = await fs.stat(filePath);
          assetChecks.push({
            path: key,
            status: 'OK',
            size: stats.size,
            modified: stats.mtime
          });
        } else {
          assetChecks.push({
            path: key,
            status: 'MISSING',
            error: 'File does not exist'
          });
          healthReport.checks.assets.status = 'WARNING';
          if (overallStatus === 200) overallStatus = 503;
        }
      } catch (error) {
        assetChecks.push({
          path: key,
          status: 'ERROR',
          error: error.message
        });
        healthReport.checks.assets.status = 'ERROR';
        overallStatus = 503;
      }
    }

    healthReport.checks.assets.details.critical_files = assetChecks;

    // Check main JavaScript and CSS bundles
    const buildAssetsDir = path.join(__dirname, 'build', 'assets');
    const bundleChecks = { js: [], css: [] };

    try {
      const jsDir = path.join(buildAssetsDir, 'js');
      const cssDir = path.join(buildAssetsDir, 'css');

      if (existsSync(jsDir)) {
        const jsFiles = await fs.readdir(jsDir);
        const mainJs = jsFiles.find(f => f.startsWith('main-') && f.endsWith('.js'));
        const vendorReact = jsFiles.find(f => f.startsWith('vendor-react-') && f.endsWith('.js'));
        
        for (const file of [mainJs, vendorReact].filter(Boolean)) {
          const stats = await fs.stat(path.join(jsDir, file));
          bundleChecks.js.push({
            file,
            status: 'OK',
            size: stats.size
          });
        }
      }

      if (existsSync(cssDir)) {
        const cssFiles = await fs.readdir(cssDir);
        const mainCss = cssFiles.find(f => f.startsWith('main-') && f.endsWith('.css'));
        
        if (mainCss) {
          const stats = await fs.stat(path.join(cssDir, mainCss));
          bundleChecks.css.push({
            file: mainCss,
            status: 'OK',
            size: stats.size
          });
        }
      }

      healthReport.checks.build.details.bundles = bundleChecks;
    } catch (error) {
      healthReport.checks.build.status = 'ERROR';
      healthReport.checks.build.details.error = error.message;
      overallStatus = 503;
    }

    // Check static route availability
    const routes = [
      { path: '/storybook', dir: 'storybook-static' },
      { path: '/docs', dir: 'docs-static' }
    ];

    const routeChecks = [];
    for (const route of routes) {
      const dirPath = path.join(__dirname, route.dir);
      const indexPath = path.join(dirPath, 'index.html');
      
      routeChecks.push({
        route: route.path,
        status: existsSync(indexPath) ? 'OK' : 'MISSING',
        directory_exists: existsSync(dirPath),
        index_exists: existsSync(indexPath)
      });
    }

    healthReport.checks.static_routes.details.routes = routeChecks;

  } catch (error) {
    healthReport.status = 'ERROR';
    healthReport.error = error.message;
    overallStatus = 503;
  }

  // Set overall status based on checks
  if (healthReport.checks.assets.status === 'ERROR' || 
      healthReport.checks.build.status === 'ERROR' ||
      healthReport.checks.static_routes.status === 'ERROR') {
    healthReport.status = 'ERROR';
    overallStatus = 503;
  } else if (healthReport.checks.assets.status === 'WARNING') {
    healthReport.status = 'WARNING';
    overallStatus = 200; // Warning is still OK for service
  }

  res.status(overallStatus).json(healthReport);
});

// Asset-specific health check
app.get('/health/assets', async (req, res) => {
  const assetReport = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    assets: {
      javascript: [],
      css: [],
      images: [],
      fonts: []
    }
  };

  try {
    const assetsDir = path.join(__dirname, 'build', 'assets');
    
    // Check JavaScript files
    const jsDir = path.join(assetsDir, 'js');
    if (existsSync(jsDir)) {
      const jsFiles = await fs.readdir(jsDir);
      for (const file of jsFiles) {
        const stats = await fs.stat(path.join(jsDir, file));
        assetReport.assets.javascript.push({
          file,
          size: stats.size,
          modified: stats.mtime
        });
      }
    }

    // Check CSS files
    const cssDir = path.join(assetsDir, 'css');
    if (existsSync(cssDir)) {
      const cssFiles = await fs.readdir(cssDir);
      for (const file of cssFiles) {
        const stats = await fs.stat(path.join(cssDir, file));
        assetReport.assets.css.push({
          file,
          size: stats.size,
          modified: stats.mtime
        });
      }
    }

    // Check for critical images
    const imagesDir = path.join(assetsDir, 'images');
    if (existsSync(imagesDir)) {
      const imageFiles = await fs.readdir(imagesDir, { recursive: true });
      const criticalImages = imageFiles.filter(f => 
        typeof f === 'string' && (f.includes('logo') || f.includes('icon'))
      );
      
      for (const file of criticalImages.slice(0, 10)) { // Limit to first 10
        try {
          const fullPath = path.join(imagesDir, file);
          const stats = await fs.stat(fullPath);
          assetReport.assets.images.push({
            file,
            size: stats.size,
            modified: stats.mtime
          });
        } catch (err) {
          // Skip files that can't be read
        }
      }
    }

    // Check fonts
    const fontsDir = path.join(__dirname, 'build', 'fonts');
    if (existsSync(fontsDir)) {
      const fontFiles = await fs.readdir(fontsDir, { recursive: true });
      for (const file of fontFiles.filter(f => typeof f === 'string').slice(0, 5)) {
        try {
          const fullPath = path.join(fontsDir, file);
          const stats = await fs.stat(fullPath);
          assetReport.assets.fonts.push({
            file,
            size: stats.size,
            modified: stats.mtime
          });
        } catch (err) {
          // Skip files that can't be read
        }
      }
    }

    assetReport.summary = {
      javascript_count: assetReport.assets.javascript.length,
      css_count: assetReport.assets.css.length,
      images_count: assetReport.assets.images.length,
      fonts_count: assetReport.assets.fonts.length,
      total_js_size: assetReport.assets.javascript.reduce((sum, f) => sum + f.size, 0),
      total_css_size: assetReport.assets.css.reduce((sum, f) => sum + f.size, 0)
    };

  } catch (error) {
    assetReport.status = 'ERROR';
    assetReport.error = error.message;
    return res.status(503).json(assetReport);
  }

  res.status(200).json(assetReport);
});

// Ready check - minimal endpoint for load balancers
app.get('/ready', (req, res) => {
  // Simple check that the server can respond and critical files exist
  const indexExists = existsSync(path.join(__dirname, 'build', 'index.html'));
  
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

// Live check - minimal endpoint for basic liveness
app.get('/live', (req, res) => {
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Serve resume file
app.get('/resume/:filename', (req, res) => {
  const filename = req.params.filename;
  
  // Validate filename - only allow alphanumeric chars, underscore, hyphen, and .pdf extension
  if (!filename.match(/^[a-zA-Z0-9_-]+\.pdf$/)) {
    console.error('Invalid resume filename requested:', filename);
    return res.status(400).send('Invalid filename');
  }
  
  // Create a safe path with validated filename
  const filePath = path.join(__dirname, 'build', 'files', filename);
  
  // Additional path safety check - ensure we're still in the files directory
  const filesDir = path.join(__dirname, 'build', 'files');
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

// Serve contact VCF file
app.get('/contact/:filename', (req, res) => {
  const filename = req.params.filename;
  
  // Validate filename - only allow alphanumeric chars, underscore, hyphen, and .vcf extension
  if (!filename.match(/^[a-zA-Z0-9_-]+\.vcf$/)) {
    console.error('Invalid contact filename requested:', filename);
    return res.status(400).send('Invalid filename');
  }
  
  // Create a safe path with validated filename
  const filePath = path.join(__dirname, 'build', 'files', filename);
  
  // Additional path safety check - ensure we're still in the files directory
  const filesDir = path.join(__dirname, 'build', 'files');
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

// Geocoding proxy endpoint
app.get('/api/geocode', async (req, res) => {
  try {
    const locationQuery = req.query.q;
    
    if (!locationQuery) {
      return res.status(400).json({ error: 'Missing location query parameter' });
    }
    
    // Forward request to Nominatim with proper headers
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

// Note: Storybook is now served entirely by the static middleware above
// This provides better performance and simpler configuration

// Note: Jekyll docs are now served entirely by the static middleware above
// This provides better performance and simpler configuration

// Explicit fallback for docs routes that don't match static files
app.get('/docs/*', (req, res) => {
  console.log('🎯 EXPRESS: Docs fallback route hit for path:', req.path);
  const indexPath = path.join(__dirname, 'docs-static', 'index.html');
  console.log('🎯 EXPRESS: Serving docs index.html from:', indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error sending docs index.html:', err);
      res.status(500).send('Error loading docs');
    }
  });
});

// Explicit fallback for storybook routes that don't match static files  
app.get('/storybook/*', (req, res) => {
  console.log('🎯 EXPRESS: Storybook fallback route hit for path:', req.path);
  const indexPath = path.join(__dirname, 'storybook-static', 'index.html');
  console.log('🎯 EXPRESS: Serving storybook index.html from:', indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error sending storybook index.html:', err);
      res.status(500).send('Error loading storybook');
    }
  });
});

// Serve React app (catch-all for main portfolio)
app.get('*', (req, res) => {
  console.log('🎯 EXPRESS: Catch-all route hit for path:', req.path);
  const indexPath = path.join(__dirname, 'build', 'index.html');
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
  // Don't expose error details in production
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
