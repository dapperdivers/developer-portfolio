#!/usr/bin/env node
/**
 * Asset Metadata Generator
 * 
 * This script generates metadata JSON files for assets in the specified directories.
 * It helps maintain information about logos, icons, and other assets.
 * 
 * Usage: node generate-asset-metadata.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Modules doesn't have __dirname, so we create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ASSET_DIRS = [
  {
    path: 'src/assets/images/logos/company',
    type: 'company-logo',
    generator: generateCompanyLogoMetadata
  },
  {
    path: 'src/assets/images/icons/social',
    type: 'social-icon',
    generator: generateSocialIconMetadata
  },
  {
    path: 'src/assets/lotte/lottie/development',
    type: 'lottie-animation',
    generator: generateLottieMetadata
  }
];

/**
 * Generate template metadata for company logos
 */
function generateCompanyLogoMetadata(filename, filePath) {
  const companyName = filename
    .replace('logo-', '')
    .replace(/\.(svg|png|jpg|webp)$/, '')
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  return {
    name: companyName,
    file: filename,
    type: 'company-logo',
    format: path.extname(filename).substring(1),
    dimensions: '[To be filled]',
    source: '[Add source URL]',
    usage: 'Used in experience section to represent employer/client',
    lastUpdated: new Date().toISOString().split('T')[0]
  };
}

/**
 * Generate template metadata for social icons
 */
function generateSocialIconMetadata(filename, filePath) {
  const iconName = filename
    .replace('icon-', '')
    .replace(/\.(svg|png|jpg|webp)$/, '')
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  return {
    name: iconName,
    file: filename,
    type: 'social-icon',
    format: path.extname(filename).substring(1),
    dimensions: '[To be filled]',
    source: '[Add source URL]',
    usage: 'Used in social links section',
    lastUpdated: new Date().toISOString().split('T')[0]
  };
}

/**
 * Generate template metadata for Lottie animations
 */
function generateLottieMetadata(filename, filePath) {
  const animationName = filename
    .replace(/\.(json)$/, '')
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  return {
    name: animationName,
    file: filename,
    type: 'lottie-animation',
    format: 'json',
    category: filename.split('-')[0] || 'general',
    loop: true,
    autoplay: true,
    duration: '[To be filled]',
    source: '[Add source URL]',
    usage: 'Used in portfolio sections for visual enhancement',
    lastUpdated: new Date().toISOString().split('T')[0]
  };
}

/**
 * Process all files in a directory and generate metadata
 */
function processDirectory(config) {
  const { path: dirPath, type, generator } = config;
  
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory not found: ${dirPath}`);
    return;
  }

  console.log(`\nProcessing ${type} assets in ${dirPath}...`);
  
  const files = fs.readdirSync(dirPath);
  let count = 0;
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    
    // Skip directories and metadata files
    const stats = fs.statSync(filePath);
    if (stats.isDirectory() || file.endsWith('.meta.json')) {
      return;
    }
    
    // Skip files that aren't relevant for the asset type
    if (type === 'company-logo' || type === 'social-icon') {
      if (!/\.(svg|png|jpg|webp)$/i.test(file)) return;
    } else if (type === 'lottie-animation') {
      if (!/\.json$/i.test(file)) return;
    }
    
    const metadataPath = `${filePath}.meta.json`;
    
    // Don't overwrite existing metadata unless forced
    if (fs.existsSync(metadataPath)) {
      console.log(`  - Metadata already exists: ${file}`);
      return;
    }
    
    const metadata = generator(file, filePath);
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    console.log(`  + Generated metadata: ${file}`);
    count++;
  });
  
  console.log(`Processed ${count} ${type} assets`);
}

/**
 * Main execution function
 */
function main() {
  console.log('Asset Metadata Generator');
  console.log('=======================');
  
  ASSET_DIRS.forEach(config => {
    processDirectory(config);
  });
  
  console.log('\nMetadata generation complete');
}

// Execute the script
main();
