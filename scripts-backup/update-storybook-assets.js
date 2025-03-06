#!/usr/bin/env node

/**
 * Update Storybook Asset Imports Script
 * 
 * This script updates all story files to use the new asset structure.
 * It converts:
 * - '../../assets/lottie/*' to '../../assets/animations/*'
 * - '../../components/*.css' to '../../assets/css/components/ui/*.css'
 * - Updates asset paths in documentation code examples
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Main async function to run the script
async function main() {
  try {
    // Find all story files in the project (glob is async in newer versions)
    const storyFiles = await glob('src/stories/**/*.stories.{js,jsx,ts,tsx}', { cwd: rootDir });

    console.log(`Found ${storyFiles.length} story files to check for asset imports...`);

    // Process each file
    let updatedCount = 0;
    for (const relativeFilePath of storyFiles) {
      const filePath = path.join(rootDir, relativeFilePath);
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      // Replace lottie imports to use animations directory
      content = content.replace(
        /import\s+([\w]+)\s+from\s+['"]\.\.\/\.\.\/assets\/lottie\/([^'"]+)['"]/g, 
        'import $1 from \'../../assets/animations/$2\''
      );
      
      // Replace component CSS imports to use new structured CSS paths
      content = content.replace(
        /import\s+['"]\.\.\/\.\.\/components\/(\w+)\.css['"]/g, 
        'import \'../../assets/css/components/ui/$1.css\''
      );
      
      // Update example paths in documentation code blocks
      content = content.replace(
        /(['"`])\.\.\/assets\/lottie\/([^'"`]+)(['"`])/g,
        '$1../assets/animations/$2$3'
      );

      // Update other asset paths in code
      content = content.replace(
        /(['"`])\.\.\/img\/([^'"`]+)(['"`])/g,
        '$1../assets/images/$2$3'
      );
      
      content = content.replace(
        /(['"`])\.\.\/assets\/img\/([^'"`]+)(['"`])/g,
        '$1../assets/images/$2$3'
      );
      
      // Only write to the file if changes were made
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`✅ Updated: ${relativeFilePath}`);
      }
    }

    console.log(`\nDone! Updated ${updatedCount} of ${storyFiles.length} files.`);
  } catch (error) {
    console.error('Error updating Storybook asset paths:', error);
    process.exit(1);
  }
}

// Run the main function
main();
