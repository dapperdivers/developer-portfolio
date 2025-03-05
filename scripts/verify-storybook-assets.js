#!/usr/bin/env node

/**
 * Storybook Asset Verification Script
 * 
 * This script scans the codebase for any references to old asset paths
 * that might need updating after the asset reorganization.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Patterns to search for
const OLD_PATTERNS = [
  { pattern: /['"]\.\.\/\.\.\/assets\/lottie\//g, replacement: '../../assets/animations/lottie/' },
  { pattern: /['"]\.\.\/\.\.\/assets\/img\//g, replacement: '../../assets/images/' },
  { pattern: /['"]\.\.\/img\//g, replacement: '../assets/images/' },
  { pattern: /['"]\.\.\/\.\.\/components\/.*?\.css['"]/g, replacement: (match) => {
    // Extract component name from the path
    const componentName = match.match(/components\/(.*)\.css/)[1];
    return `'../../assets/css/components/ui/${componentName}.css'`;
  }},
  { pattern: /import\s+['"]\.\.\/css\//g, replacement: "import '../assets/css/" },
];

async function main() {
  try {
    // Find story and component files
    const storyFiles = await glob('src/stories/**/*.{jsx,js}', { cwd: rootDir });
    const componentFiles = await glob('src/components/**/*.{jsx,js}', { cwd: rootDir });
    const containerFiles = await glob('src/containers/**/*.{jsx,js}', { cwd: rootDir });
    
    const allFiles = [...storyFiles, ...componentFiles, ...containerFiles];
    
    console.log(`Scanning ${allFiles.length} files for old asset paths...`);
    
    let issueCount = 0;
    let fixedCount = 0;
    
    // Process each file
    for (const relativeFilePath of allFiles) {
      const filePath = path.join(rootDir, relativeFilePath);
      let content = fs.readFileSync(filePath, 'utf8');
      let hasIssues = false;
      let originalContent = content;
      
      // Check for old patterns
      for (const { pattern, replacement } of OLD_PATTERNS) {
        if (pattern.test(content)) {
          hasIssues = true;
          content = content.replace(pattern, replacement);
        }
        // Reset the RegExp object's lastIndex
        pattern.lastIndex = 0;
      }
      
      if (hasIssues) {
        issueCount++;
        console.log(`⚠️ Found outdated asset paths in: ${relativeFilePath}`);
        
        // Ask if we should fix the file
        if (process.argv.includes('--fix')) {
          fs.writeFileSync(filePath, content, 'utf8');
          fixedCount++;
          console.log(`  ✅ Fixed asset paths in ${relativeFilePath}`);
        } else {
          console.log(`  Run with --fix to automatically update this file`);
        }
      }
    }
    
    // Summary
    console.log(`\nSummary:`);
    console.log(`- Scanned ${allFiles.length} files`);
    console.log(`- Found ${issueCount} files with outdated asset paths`);
    
    if (process.argv.includes('--fix')) {
      console.log(`- Fixed ${fixedCount} files`);
    } else if (issueCount > 0) {
      console.log(`\nRun this script with --fix to automatically update all files.`);
    }
    
    if (issueCount === 0) {
      console.log(`\n✅ All files are using the correct asset paths!`);
    }
    
  } catch (error) {
    console.error('Error during verification:', error);
    process.exit(1);
  }
}

// Run the script
main();
