#!/usr/bin/env node
import { preview } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

// Get project root directory correctly in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testProductionServer() {
  console.log('===== TESTING PRODUCTION SERVER =====');
  
  try {
    // Start preview server
    console.log('Starting preview server...');
    const server = await preview({
      preview: {
        port: 5173,
        open: false
      }
    });
    
    const baseUrl = `http://localhost:${server.config.preview.port}`;
    console.log(`Server running at ${baseUrl}`);
    
    // Test fetching the main HTML
    console.log('Testing main page load...');
    const mainPageResponse = await fetchUrl(baseUrl);
    
    if (mainPageResponse.statusCode === 200) {
      console.log('Main page loaded successfully!');
      console.log(`Content length: ${mainPageResponse.body.length} bytes`);
      
      // Check for key elements in the HTML response
      if (mainPageResponse.body.includes('<script') && 
          mainPageResponse.body.includes('<link')) {
        console.log('HTML contains expected script and link tags');
      } else {
        console.warn('HTML may be missing critical resource tags');
      }
    } else {
      console.error(`Failed to load main page: ${mainPageResponse.statusCode}`);
    }
    
    // Get asset URLs from HTML (simple extraction)
    const scriptMatches = [...mainPageResponse.body.matchAll(/<script src="([^"]+)"/g)];
    const cssMatches = [...mainPageResponse.body.matchAll(/<link [^>]*href="([^"]+\.css[^"]*)"[^>]*>/g)];
    
    const jsUrls = scriptMatches.map(match => match[1]).filter(url => url.startsWith('/assets/'));
    const cssUrls = cssMatches.map(match => match[1]).filter(url => url.startsWith('/assets/'));
    
    console.log(`Found ${jsUrls.length} JavaScript files and ${cssUrls.length} CSS files`);
    
    // Test loading JS assets
    if (jsUrls.length > 0) {
      console.log('Testing JavaScript asset load...');
      const jsUrl = baseUrl + jsUrls[0];
      const jsResponse = await fetchUrl(jsUrl);
      
      if (jsResponse.statusCode === 200) {
        console.log(`Successfully loaded JavaScript asset: ${jsUrls[0]}`);
        console.log(`JS content length: ${jsResponse.body.length} bytes`);
      } else {
        console.error(`Failed to load JavaScript asset: ${jsResponse.statusCode}`);
      }
    }
    
    // Test loading CSS assets
    if (cssUrls.length > 0) {
      console.log('Testing CSS asset load...');
      const cssUrl = baseUrl + cssUrls[0];
      const cssResponse = await fetchUrl(cssUrl);
      
      if (cssResponse.statusCode === 200) {
        console.log(`Successfully loaded CSS asset: ${cssUrls[0]}`);
        console.log(`CSS content length: ${cssResponse.body.length} bytes`);
      } else {
        console.error(`Failed to load CSS asset: ${cssResponse.statusCode}`);
      }
    }
    
    console.log('Production server tests completed');
    
    // Close the server
    await server.close();
    console.log('Server closed');
  } catch (error) {
    console.error('Production server test failed:');
    console.error(error);
    
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }
}

// Helper function to fetch a URL and return response
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      
      res.on('data', (chunk) => {
        body += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

testProductionServer();
