import { createBaseServer, startServer } from '../server.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Production-specific configuration
const prodConfig = {
  port: process.env.PORT || 8080,
  allowedDomains: (process.env.ALLOWED_DOMAINS || 'http://localhost:8080').split(','),
  buildPath: path.join(__dirname, '../../../build'),
  storybookPath: path.join(__dirname, '../../../storybook-static'),
  docsPath: path.join(__dirname, '../../../docs-static'),
  rateLimitMax: 100, // Stricter in production
  rateLimitWindow: 15 * 60 * 1000,
  cacheMaxAge: '1y' // Aggressive caching in production
};

// Create the production server
const app = createBaseServer(prodConfig);

// Production-specific comprehensive health check
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
      environment: process.env.NODE_ENV || 'production',
      port: prodConfig.port
    }
  };

  let overallStatus = 200;

  try {
    // Check critical build files
    const criticalPaths = [
      path.join(prodConfig.buildPath, 'index.html'),
      path.join(prodConfig.buildPath, 'manifest.json'),
      path.join(prodConfig.storybookPath, 'index.html'),
      path.join(prodConfig.docsPath, 'index.html')
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
    const buildAssetsDir = path.join(prodConfig.buildPath, 'assets');
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
        const styleFile = cssFiles.find(f => f.startsWith('style-') && f.endsWith('.css'));
        
        if (styleFile) {
          const stats = await fs.stat(path.join(cssDir, styleFile));
          bundleChecks.css.push({
            file: styleFile,
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
      { path: '/storybook', dir: prodConfig.storybookPath },
      { path: '/docs', dir: prodConfig.docsPath }
    ];

    const routeChecks = [];
    for (const route of routes) {
      const indexPath = path.join(route.dir, 'index.html');
      
      routeChecks.push({
        route: route.path,
        status: existsSync(indexPath) ? 'OK' : 'MISSING',
        directory_exists: existsSync(route.dir),
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
    const assetsDir = path.join(prodConfig.buildPath, 'assets');
    
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

// Start the production server
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer(app, prodConfig.port);
}