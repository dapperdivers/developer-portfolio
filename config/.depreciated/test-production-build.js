#!/usr/bin/env node
import { build } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get project root directory correctly in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testProductionBuild() {
  console.log('===== TESTING PRODUCTION BUILD =====');
  
  try {
    // Set environment to production
    process.env.NODE_ENV = 'production';
    
    // Import config modules
    console.log('Loading configuration modules...');
    const configModule = await import('../../vite.config.js');
    const config = configModule.default;
    
    console.log('Starting production build with config:', Object.keys(config));
    
    // Start the build
    console.log('Building for production...');
    await build({
      ...config,
      logLevel: 'info',
      mode: 'production',
      clearScreen: false // Don't clear console to preserve debug output
    });
    
    console.log('Build completed. Verifying output...');
    
    // Verify build output exists
    const buildDir = path.resolve(__dirname, 'build');
    if (!fs.existsSync(buildDir)) {
      throw new Error(`Build directory not found at ${buildDir}`);
    }
    
    const files = fs.readdirSync(buildDir);
    console.log('Build output files:', files);
    
    // Check for key files that should exist
    const requiredFiles = ['index.html', 'assets'];
    const missingFiles = requiredFiles.filter(file => !files.includes(file));
    
    if (missingFiles.length > 0) {
      console.error('Missing required files:', missingFiles);
    } else {
      console.log('All required files are present.');
    }
    
    // Verify asset structure
    const assetsDir = path.resolve(buildDir, 'assets');
    if (fs.existsSync(assetsDir)) {
      const assetDirs = fs.readdirSync(assetsDir);
      console.log('Asset directories:', assetDirs);
      
      // Check JS assets
      const jsDir = path.resolve(assetsDir, 'js');
      if (fs.existsSync(jsDir)) {
        const jsFiles = fs.readdirSync(jsDir);
        console.log('JavaScript files:', jsFiles);
        console.log(`Found ${jsFiles.length} JavaScript bundle files`);
        
        // Check vendor chunks
        const vendorChunks = jsFiles.filter(file => file.includes('vendor'));
        console.log(`Found ${vendorChunks.length} vendor chunks:`, vendorChunks);
      }
      
      // Check CSS assets
      const cssDir = path.resolve(assetsDir, 'css');
      if (fs.existsSync(cssDir)) {
        const cssFiles = fs.readdirSync(cssDir);
        console.log('CSS files:', cssFiles);
      }
      
      // Check image assets
      const imgDir = path.resolve(assetsDir, 'images');
      if (fs.existsSync(imgDir)) {
        const imgFiles = fs.readdirSync(imgDir);
        console.log(`Found ${imgFiles.length} image files`);
      }
    }
    
    console.log('Production build test completed successfully!');
  } catch (error) {
    console.error('Production build test failed:');
    console.error(error);
    
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }
}

testProductionBuild();
