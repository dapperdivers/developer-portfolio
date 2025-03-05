#!/usr/bin/env node

/**
 * SVG optimization script for the portfolio project
 * This script processes SVG files in the src/assets/images directory and creates optimized versions
 * 
 * Features:
 * - Removes unnecessary attributes and metadata
 * - Minifies SVG files for better performance
 * - Generates metadata files with optimization information
 * - Maintains SVG functionality while reducing file size
 * 
 * Usage:
 * node scripts/optimize-svgs.js [--precision=2] [--multipass]
 */

import { promises as fs } from 'fs';
import path from 'path';
import * as globModule from 'glob';
import chalk from 'chalk';
import { optimize } from 'svgo';
import { fileURLToPath } from 'url';

// Use the glob function from the module
const glob = globModule.glob;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  sourceDir: 'src/assets/images',
  outputDir: 'src/assets/images',
  precision: 2, // Default floating point precision
  multipass: true, // Multiple optimization passes
  skipExisting: true,
  generateMetadata: true
};

// Process CLI arguments
process.argv.slice(2).forEach(arg => {
  if (arg.startsWith('--precision=')) {
    config.precision = parseInt(arg.split('=')[1], 10);
  } else if (arg === '--multipass') {
    config.multipass = true;
  } else if (arg === '--force') {
    config.skipExisting = false;
  }
});

// SVGO configuration
const svgoConfig = {
  multipass: config.multipass,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // customize default plugin options
          cleanupNumericValues: {
            floatPrecision: config.precision
          },
          // disable plugins
          removeViewBox: false
        }
      }
    },
    'removeXMLNS', // removes the XML namespace
    'removeDimensions', // removes width/height and adds viewBox if it's missing
    'removeOffCanvasPaths', // removes paths outside of the viewBox
    'sortAttrs', // sorts attribute names within elements
    'removeScriptElement', // removes <script> elements
    'removeStyleElement', // removes <style> elements
  ]
};

// Create output directory if it doesn't exist
async function ensureDirectoryExists(directory) {
  try {
    await fs.mkdir(directory, { recursive: true });
    console.log(chalk.green(`✓ Created directory: ${directory}`));
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
}

// Find all SVG files in the source directory
function findSvgs() {
  return new Promise((resolve, reject) => {
    glob(`${config.sourceDir}/**/*.svg`, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

// Generate metadata file for an SVG
async function generateMetadata(svgPath, originalSize, optimizedSize) {
  const metadataPath = `${svgPath}.meta.json`;
  
  const metadata = {
    originalSize,
    optimizedSize,
    optimized: true,
    compressionRatio: Math.round((1 - (optimizedSize / originalSize)) * 100),
    precision: config.precision,
    multipass: config.multipass,
    timestamp: new Date().toISOString()
  };
  
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(chalk.green(`  ✓ Created metadata file: ${path.basename(metadataPath)}`));
}

// Process a single SVG file
async function processSvg(svgPath) {
  const filename = path.basename(svgPath);
  const relativePath = path.relative(config.sourceDir, path.dirname(svgPath));
  const outputPath = path.join(config.outputDir, relativePath);
  const outputFilePath = path.join(outputPath, filename);
  
  // Skip processing if the output path is the same as the input path
  const isSamePath = svgPath === outputFilePath;
  if (isSamePath && !config.skipExisting) {
    console.log(chalk.yellow(`  Skipping ${filename} (same input/output path)`));
    return;
  }
  
  // Skip if file exists and skipExisting is true
  try {
    if (config.skipExisting && !isSamePath) {
      await fs.access(outputFilePath);
      console.log(chalk.yellow(`  Skipping existing file: ${filename}`));
      return;
    }
  } catch (err) {
    // File doesn't exist, continue with processing
  }
  
  try {
    // Ensure output directory exists
    await ensureDirectoryExists(outputPath);
    
    // Read the SVG file
    const svgContent = await fs.readFile(svgPath, 'utf8');
    const originalSize = Buffer.byteLength(svgContent, 'utf8');
    
    console.log(chalk.blue(`Processing: ${svgPath}`));
    console.log(chalk.gray(`  Original size: ${originalSize} bytes`));
    
    // Optimize SVG
    const result = optimize(svgContent, svgoConfig);
    
    // If output path is different from input, write to new file
    if (!isSamePath) {
      await fs.writeFile(outputFilePath, result.data);
    } else {
      // Otherwise, overwrite the original file
      await fs.writeFile(svgPath, result.data);
    }
    
    const optimizedSize = Buffer.byteLength(result.data, 'utf8');
    const compressionRatio = Math.round((1 - (optimizedSize / originalSize)) * 100);
    
    console.log(chalk.green(`  ✓ Optimized ${filename} (saved ${compressionRatio}%)`));
    
    if (config.generateMetadata) {
      await generateMetadata(outputFilePath, originalSize, optimizedSize);
    }
  } catch (err) {
    console.error(chalk.red(`  ✗ Error processing ${filename}: ${err.message}`));
  }
}

// Main function
async function main() {
  console.log(chalk.blue.bold('Portfolio SVG Optimizer'));
  console.log(chalk.gray(`Precision: ${config.precision}, Multipass: ${config.multipass}`));
  
  try {
    const svgs = await findSvgs();
    console.log(chalk.blue(`Found ${svgs.length} SVG files to process`));
    
    if (svgs.length === 0) {
      console.log(chalk.yellow('No SVG files found in the source directory'));
      return;
    }
    
    // Process SVGs in sequence
    for (const svg of svgs) {
      await processSvg(svg);
    }
    
    console.log(chalk.green.bold('✓ SVG optimization complete!'));
  } catch (err) {
    console.error(chalk.red(`✗ Error: ${err.message}`));
    process.exit(1);
  }
}

// Run the script
main();
