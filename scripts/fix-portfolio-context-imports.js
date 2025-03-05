#!/usr/bin/env node

/**
 * Fix PortfolioContext Imports Script
 * 
 * This script updates all PortfolioContext imports to use default import
 * rather than named import to match how it's exported.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import glob from 'glob';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Find all story files with PortfolioContext imports
const storyFiles = glob.sync('src/stories/**/*.{js,jsx,ts,tsx}', { cwd: rootDir });

console.log(`Found ${storyFiles.length} story files to check...`);

// Process each file
let updatedCount = 0;
for (const relativeFilePath of storyFiles) {
  const filePath = path.join(rootDir, relativeFilePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace named PortfolioContext import with default import
  content = content.replace(
    /import\s+{\s*(.*?)PortfolioContext(.*?)}\s+from\s+['"](.+?)\/PortfolioContext['"];?/g, 
    'import PortfolioContext from \'$3/PortfolioContext\';'
  );
  
  // Only write to the file if changes were made
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`✅ Updated PortfolioContext import in: ${relativeFilePath}`);
  }
}

console.log(`\nDone! Updated ${updatedCount} of ${storyFiles.length} files.`);