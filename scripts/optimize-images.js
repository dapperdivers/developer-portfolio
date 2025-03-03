#!/usr/bin/env node

/**
 * Image optimization script for the portfolio project
 * This script processes images in the src/assets/img directory and creates optimized versions
 * 
 * Features:
 * - Converts images to WebP format for better compression
 * - Generates responsive image sizes
 * - Optimizes existing JPG/PNG files
 * - Maintains image quality while reducing file size
 * 
 * Usage:
 * node scripts/optimize-images.js [--quality=80] [--formats=webp,jpg,avif]
 */

const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');
const chalk = require('chalk');

// Configuration
const config = {
  sourceDir: 'src/assets/img',
  outputDir: 'src/assets/img/optimized',
  quality: 80, // Default quality
  formats: ['webp', 'jpg'], // Default formats
  sizes: [320, 640, 960, 1280], // Responsive sizes
  skipExisting: true
};

// Process CLI arguments
process.argv.slice(2).forEach(arg => {
  if (arg.startsWith('--quality=')) {
    config.quality = parseInt(arg.split('=')[1], 10);
  } else if (arg.startsWith('--formats=')) {
    config.formats = arg.split('=')[1].split(',');
  } else if (arg === '--force') {
    config.skipExisting = false;
  }
});

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

// Find all images in the source directory
function findImages() {
  return new Promise((resolve, reject) => {
    glob(`${config.sourceDir}/**/*.{jpg,jpeg,png,gif}`, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

// Process a single image
async function processImage(imagePath) {
  const filename = path.basename(imagePath, path.extname(imagePath));
  const relativePath = path.relative(config.sourceDir, path.dirname(imagePath));
  const outputPath = path.join(config.outputDir, relativePath);
  
  await ensureDirectoryExists(outputPath);
  
  // Load the image
  const image = sharp(imagePath);
  const metadata = await image.metadata();
  
  console.log(chalk.blue(`Processing: ${imagePath}`));
  console.log(chalk.gray(`  Original size: ${metadata.width}x${metadata.height}`));
  
  // Create responsive sizes
  const sizePromises = [];
  
  for (const format of config.formats) {
    for (const width of config.sizes.filter(size => size <= metadata.width)) {
      const outputFilename = `${filename}-${width}.${format}`;
      const outputFilePath = path.join(outputPath, outputFilename);
      
      // Skip if file exists and skipExisting is true
      try {
        if (config.skipExisting) {
          await fs.access(outputFilePath);
          console.log(chalk.yellow(`  Skipping existing file: ${outputFilename}`));
          continue;
        }
      } catch (err) {
        // File doesn't exist, continue with processing
      }
      
      let resizedImage = image.clone().resize(width);
      
      if (format === 'webp') {
        resizedImage = resizedImage.webp({ quality: config.quality });
      } else if (format === 'jpg' || format === 'jpeg') {
        resizedImage = resizedImage.jpeg({ quality: config.quality, mozjpeg: true });
      } else if (format === 'avif') {
        resizedImage = resizedImage.avif({ quality: config.quality });
      } else if (format === 'png') {
        resizedImage = resizedImage.png({ quality: config.quality, compressionLevel: 9 });
      }
      
      const promise = resizedImage.toFile(outputFilePath)
        .then(info => {
          const compressionRatio = Math.round((1 - (info.size / metadata.size)) * 100);
          console.log(chalk.green(`  ✓ Created ${outputFilename} (${width}px, saved ${compressionRatio}%)`));
        })
        .catch(err => {
          console.error(chalk.red(`  ✗ Error creating ${outputFilename}: ${err.message}`));
        });
      
      sizePromises.push(promise);
    }
  }
  
  await Promise.all(sizePromises);
}

// Main function
async function main() {
  console.log(chalk.blue.bold('Portfolio Image Optimizer'));
  console.log(chalk.gray(`Quality: ${config.quality}, Formats: ${config.formats.join(', ')}`));
  
  try {
    const images = await findImages();
    console.log(chalk.blue(`Found ${images.length} images to process`));
    
    if (images.length === 0) {
      console.log(chalk.yellow('No images found in the source directory'));
      return;
    }
    
    await ensureDirectoryExists(config.outputDir);
    
    // Process images in sequence to avoid memory issues
    for (const image of images) {
      await processImage(image);
    }
    
    console.log(chalk.green.bold('✓ Image optimization complete!'));
    console.log(chalk.gray(`Optimized images are in ${config.outputDir}`));
    console.log(chalk.gray('Use these images with the imageOptimizer.js utility'));
  } catch (err) {
    console.error(chalk.red(`✗ Error: ${err.message}`));
    process.exit(1);
  }
}

// Run the script
main();
