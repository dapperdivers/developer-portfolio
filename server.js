import express from 'express';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
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
      imgSrc: ["'self'", 'data:', 'https://*.basemaps.cartocdn.com', 'https://*.tile.openstreetmap.org', 'https://avatars.githubusercontent.com', 'https://*.githubusercontent.com', 'blob:'],
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
  max: 5000, // limit each IP to 50 requests per windowMs
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

// Health check endpoint with basic system info
app.get('/healthz', (req, res) => {
  res.status(200).json({
    status: 'OK',
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
  const filePath = path.join(__dirname, 'files', filename);
  
  // Additional path safety check - ensure we're still in the files directory
  const filesDir = path.join(__dirname, 'files');
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
  const filePath = path.join(__dirname, 'files', filename);
  
  // Additional path safety check - ensure we're still in the files directory
  const filesDir = path.join(__dirname, 'files');
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

// Serve React app
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  console.log('Serving index.html from:', indexPath);
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
