#!/usr/bin/env node

/**
 * Fix Double Export Script
 * 
 * This script fixes files with "export export" issues.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import glob from 'glob';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Find all story files in the project
const storyFiles = glob.sync('src/stories/**/*.stories.{js,jsx,ts,tsx}', { cwd: rootDir });

console.log(`Found ${storyFiles.length} story files to check...`);

// Process each file
let updatedCount = 0;
for (const relativeFilePath of storyFiles) {
  const filePath = path.join(rootDir, relativeFilePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Fix double exports
  content = content.replace(/export\s+export\s+/g, 'export ');
  
  // Only write to the file if changes were made
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`✅ Fixed double exports in: ${relativeFilePath}`);
  }
}

console.log(`\nDone! Updated ${updatedCount} of ${storyFiles.length} files.`);