#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import http from 'http';

// Get project root directory correctly in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyProduction() {
  console.log('===== COMPREHENSIVE PRODUCTION VERIFICATION =====');
  
  try {
    // 1. Clean existing build
    console.log('\n🧹 STEP 1: Cleaning previous build...');
    const buildDir = path.resolve(__dirname, 'build');
    
    if (fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true, force: true });
      console.log(`Build directory ${buildDir} cleaned`);
    } else {
      console.log('No existing build directory found');
    }
    
    // 2. Run production build
    console.log('\n🏗️ STEP 2: Running production build...');
    process.env.NODE_ENV = 'production';
    try {
      await runCommand('node_modules/.bin/vite', ['build']);
      console.log('Production build completed successfully');
    } catch (buildError) {
      console.error('Production build failed:', buildError);
      return; // Stop the verification process
    }
    
    // 3. Analyze build output
    console.log('\n🔍 STEP 3: Analyzing build output...');
    if (!fs.existsSync(buildDir)) {
      throw new Error('Build directory was not created');
    }
    
    console.log('Build directory structure:');
    analyzeDirectory(buildDir);
    
    // Calculate total build size
    const buildStats = calculateDirectorySize(buildDir);
    console.log(`\nTotal build size: ${formatSize(buildStats.totalSize)}`);
    console.log(`JavaScript size: ${formatSize(buildStats.jsSize)}`);
    console.log(`CSS size: ${formatSize(buildStats.cssSize)}`);
    console.log(`Asset size: ${formatSize(buildStats.assetSize)}`);
    console.log(`Number of files: ${buildStats.fileCount}`);
    
    // Check index.html
    console.log('\nAnalyzing index.html:');
    const indexPath = path.join(buildDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf8');
      
      // Check for basic HTML structure
      const hasDocType = indexContent.includes('<!DOCTYPE html>');
      const hasHead = indexContent.includes('<head>');
      const hasBody = indexContent.includes('<body>');
      
      console.log(`- Has DOCTYPE: ${hasDocType}`);
      console.log(`- Has head tag: ${hasHead}`);
      console.log(`- Has body tag: ${hasBody}`);
      
      // Check for scripts and styles
      const scriptCount = (indexContent.match(/<script/g) || []).length;
      const styleCount = (indexContent.match(/<link [^>]*stylesheet/g) || []).length;
      
      console.log(`- Script tags: ${scriptCount}`);
      console.log(`- Style tags: ${styleCount}`);
    } else {
      console.error('index.html file not found in build output');
    }
    
    // 4. Test serving the build
    console.log('\n🚀 STEP 4: Testing production server...');
    const previewProcess = spawn('node_modules/.bin/vite', ['preview', '--port', '5173', '--strictPort'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    let serverOutput = '';
    previewProcess.stdout.on('data', (data) => {
      serverOutput += data.toString();
    });
    
    previewProcess.stderr.on('data', (data) => {
      serverOutput += data.toString();
    });
    
    // Give the server time to start
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('Preview server started');
    if (serverOutput) {
      console.log('Server output:', serverOutput);
    }
    
    // 5. Test accessing the site - with increased verbosity and diagnostics
    console.log('\n🌐 STEP 5: Testing site access with detailed diagnostics...');
    
    // Try multiple attempts to connect to the server
    const maxRetries = 3;
    let connected = false;
    let mainResponse;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const baseUrl = 'http://localhost:5173';
        console.log(`[Attempt ${attempt}/${maxRetries}] Connecting to ${baseUrl}...`);
        
        // Test server connectivity first
        try {
          // Simple connection test
          await new Promise((resolve, reject) => {
            const req = http.get(baseUrl, res => {
              console.log(`Connection successful: Server responded with status ${res.statusCode}`);
              res.destroy(); // We don't need the full response yet
              resolve();
            });
            req.on('error', reject);
            req.setTimeout(3000, () => reject(new Error('Connection timeout')));
          });
          connected = true;
        } catch (connErr) {
          console.error(`Connection test failed: ${connErr.message}`);
          // If it's the last attempt, throw to exit the loop
          if (attempt === maxRetries) throw connErr;
          
          // Otherwise, wait a bit and try again
          console.log(`Waiting 3 seconds before retry...`);
          await new Promise(resolve => setTimeout(resolve, 3000));
          continue;
        }
        
        // If we get here, connection was successful
        console.log('Fetching main page...');
        mainResponse = await fetchUrl(baseUrl, true); // true for verbose
        
        if (mainResponse.statusCode === 200) {
          console.log('\n✅ Successfully accessed the site');
          console.log(`- Response size: ${mainResponse.body.length} bytes`);
          console.log(`- Content type: ${mainResponse.headers['content-type']}`);
          
          // Save response to a file for inspection
          const responsePath = path.join(__dirname, 'server-response.html');
          fs.writeFileSync(responsePath, mainResponse.body);
          console.log(`HTML response saved to ${responsePath} for inspection`);
          
          // Check if the HTML contains root element for React
          if (mainResponse.body.includes('<div id="root">')) {
            console.log('✅ HTML contains React root element');
          } else {
            console.warn('⚠️ HTML does not contain expected React root element');
          }
          
          // Log HTML structure summary
          console.log('\nHTML structure summary:');
          const headContent = mainResponse.body.match(/<head>([\s\S]*?)<\/head>/i);
          const bodyContent = mainResponse.body.match(/<body>([\s\S]*?)<\/body>/i);
          
          if (headContent) {
            const metaTags = (headContent[1].match(/<meta[^>]*>/g) || []).length;
            const linkTags = (headContent[1].match(/<link[^>]*>/g) || []).length;
            const scriptTags = (headContent[1].match(/<script[^>]*>/g) || []).length;
            console.log(`- <head> contains: ${metaTags} meta tags, ${linkTags} link tags, ${scriptTags} script tags`);
          }
          
          if (bodyContent) {
            const mainContentLength = bodyContent[1].length;
            const scriptTagsInBody = (bodyContent[1].match(/<script[^>]*>/g) || []).length;
            console.log(`- <body> content length: ${mainContentLength} bytes, ${scriptTagsInBody} script tags`);
          }
          
          // Check for React runtime errors in HTML
          if (mainResponse.body.includes('You need to enable JavaScript to run this app')) {
            console.log('⚠️ Page contains "You need to enable JavaScript" message');
          }
          
          if (mainResponse.body.includes('Error:') || mainResponse.body.includes('Exception')) {
            console.warn('⚠️ Page may contain error messages');
          }
          
          // Extract and check all resources
          console.log('\nChecking resources:');
          
          // More robust regex to capture all scripts
          const scripts = [
            ...mainResponse.body.matchAll(/<script[^>]*src="([^"]+)"[^>]*>/g),
            ...mainResponse.body.matchAll(/<script[^>]*src='([^']+)'[^>]*>/g)
          ].map(match => match[1]);
          
          // More robust regex to capture all stylesheets
          const styles = [
            ...mainResponse.body.matchAll(/<link[^>]*href="([^"]+\.css[^"]*)"[^>]*>/g),
            ...mainResponse.body.matchAll(/<link[^>]*href='([^']+\.css[^']*)'[^>]*>/g)
          ].map(match => match[1]);
          
          // Extract image resources
          const images = [
            ...mainResponse.body.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/g),
            ...mainResponse.body.matchAll(/<img[^>]*src='([^']+)'[^>]*>/g)
          ].map(match => match[1]);
          
          console.log(`- Found ${scripts.length} scripts`);
          console.log(`- Found ${styles.length} stylesheets`);
          console.log(`- Found ${images.length} images`);
          
          if (scripts.length === 0) {
            console.warn('⚠️ No script tags found with src attribute - this may indicate a problem');
          }
          
          if (styles.length === 0) {
            console.warn('⚠️ No stylesheet links found - this may indicate a problem');
          }
          
          // List all scripts and styles for inspection
          console.log('\nDetailed resource list:');
          console.log('Scripts:');
          scripts.forEach((src, i) => console.log(`  ${i+1}. ${src}`));
          
          console.log('Stylesheets:');
          styles.forEach((href, i) => console.log(`  ${i+1}. ${href}`));
          
          // Test loading all scripts
          console.log('\nTesting all script resources:');
          for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i];
            const scriptUrl = new URL(script.startsWith('http') ? script : script.startsWith('/') ? `${baseUrl}${script}` : `${baseUrl}/${script}`);
            
            try {
              console.log(`Testing script [${i+1}/${scripts.length}]: ${script}`);
              const scriptResponse = await fetchUrl(scriptUrl.toString());
              
              if (scriptResponse.statusCode === 200) {
                console.log(`✅ Successfully loaded script: ${script}`);
                console.log(`  - Size: ${formatSize(scriptResponse.body.length)}`);
                console.log(`  - Type: ${scriptResponse.headers['content-type'] || 'unknown'}`);
              } else {
                console.error(`❌ Failed to load script: ${script}, status: ${scriptResponse.statusCode}`);
              }
            } catch (e) {
              console.error(`Error loading script ${script}: ${e.message}`);
            }
          }
          
          // Test loading all stylesheets
          console.log('\nTesting all stylesheet resources:');
          for (let i = 0; i < styles.length; i++) {
            const style = styles[i];
            const styleUrl = new URL(style.startsWith('http') ? style : style.startsWith('/') ? `${baseUrl}${style}` : `${baseUrl}/${style}`);
            
            try {
              console.log(`Testing stylesheet [${i+1}/${styles.length}]: ${style}`);
              const styleResponse = await fetchUrl(styleUrl.toString());
              
              if (styleResponse.statusCode === 200) {
                console.log(`✅ Successfully loaded stylesheet: ${style}`);
                console.log(`  - Size: ${formatSize(styleResponse.body.length)}`);
                console.log(`  - Type: ${styleResponse.headers['content-type'] || 'unknown'}`);
              } else {
                console.error(`❌ Failed to load stylesheet: ${style}, status: ${styleResponse.statusCode}`);
              }
            } catch (e) {
              console.error(`Error loading stylesheet ${style}: ${e.message}`);
            }
          }
          
          // Break out of retry loop since we succeeded
          break;
        } else {
          console.error(`❌ Failed to access the site: ${mainResponse.statusCode}`);
          console.error(`Response headers:`, mainResponse.headers);
          
          if (mainResponse.body) {
            console.error(`First 500 chars of response:`, mainResponse.body.substring(0, 500));
          }
          
          if (attempt === maxRetries) break;
          
          console.log(`Waiting 3 seconds before retry...`);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      } catch (error) {
        console.error(`Error on attempt ${attempt}:`, error.message);
        
        if (attempt === maxRetries) {
          console.error('All connection attempts failed.');
        } else {
          console.log(`Waiting 3 seconds before retry...`);
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
    }
    
    // Shutdown the server
    previewProcess.kill();
    
    console.log('\n✅ Production verification completed');
  } catch (error) {
    console.error('❌ Production verification failed:');
    console.error(error);
  }
}

function analyzeDirectory(dir, indent = '') {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      console.log(`${indent}📁 ${file}/`);
      analyzeDirectory(fullPath, indent + '  ');
    } else {
      const size = formatSize(stats.size);
      console.log(`${indent}📄 ${file} (${size})`);
    }
  });
}

function calculateDirectorySize(dir) {
  let totalSize = 0;
  let jsSize = 0;
  let cssSize = 0;
  let assetSize = 0;
  let fileCount = 0;
  
  function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        processDirectory(fullPath);
      } else {
        fileCount++;
        totalSize += stats.size;
        
        if (file.endsWith('.js')) {
          jsSize += stats.size;
        } else if (file.endsWith('.css')) {
          cssSize += stats.size;
        } else if (!['.html', '.json', '.txt', '.md'].some(ext => file.endsWith(ext))) {
          assetSize += stats.size;
        }
      }
    }
  }
  
  processDirectory(dir);
  
  return {
    totalSize,
    jsSize,
    cssSize,
    assetSize,
    fileCount
  };
}

function formatSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}

async function runCommand(cmd, args) {
  return new Promise((resolve, reject) => {
    console.log(`Running command: ${cmd} ${args.join(' ')}`);
    
    const child = spawn(cmd, args, { stdio: 'inherit' });
    
    child.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    child.on('error', reject);
  });
}

// Helper function to fetch a URL and return response with optional verbose logging
function fetchUrl(url, verbose = false) {
  return new Promise((resolve, reject) => {
    if (verbose) console.log(`Fetching URL: ${url}`);
    const startTime = Date.now();
    
    const req = http.get(url, (res) => {
      if (verbose) console.log(`Response status: ${res.statusCode} ${res.statusMessage}`);
      if (verbose) console.log(`Response headers:`, res.headers);
      
      let body = '';
      let downloadedBytes = 0;
      
      res.on('data', (chunk) => {
        body += chunk;
        downloadedBytes += chunk.length;
        if (verbose && downloadedBytes % 50000 === 0) {
          console.log(`Downloaded ${formatSize(downloadedBytes)} so far...`);
        }
      });
      
      res.on('end', () => {
        const totalTime = Date.now() - startTime;
        if (verbose) console.log(`Download completed: ${formatSize(body.length)} in ${totalTime}ms`);
        
        resolve({
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          headers: res.headers,
          body,
          timing: {
            total: totalTime
          }
        });
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error(`Request timeout after 10000ms: ${url}`));
    });
    
    req.on('error', (err) => {
      if (verbose) console.error(`Error fetching ${url}:`, err.message);
      reject(err);
    });
  });
}

// Run the verification
verifyProduction().catch(console.error);
