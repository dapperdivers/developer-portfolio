#!/usr/bin/env node

/**
 * This script finalizes the package.json cleanup by removing scripts
 * that were only needed for reorganization and aren't necessary for
 * ongoing development or CI/CD.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Path to package.json
const packageJsonPath = path.join(projectRoot, 'package.json');

// Script categories
const scriptCategories = {
  // Essential scripts for development/CI (keep these)
  essential: [
    // Development and production
    'dev', 'build', 'build:analyze', 'serve', 'preview',
    
    // Code quality
    'lint', 'typecheck', 'verify', 'format',
    
    // Dependency management
    'clean', 'reinstall',
    
    // Asset optimization
    'optimize:images', 'optimize:svgs', 'optimize:all', 'optimize',
    'generate:metadata',
    
    // Testing
    'test', 'test:watch', 'test:coverage',
    
    // Storybook
    'storybook', 'build-storybook',
    
    // Component generation (ongoing usage)
    'generate-component', 'generate-story'
  ],
  
  // One-time reorganization scripts (can be removed)
  reorganization: [
    'reorganize-components',
    'cleanup-stories',
    'analyze-tests',
    'cleanup-tests',
    'update-component-generator',
    'analyze-scripts', 
    'cleanup-scripts',
    'analyze-unused-scripts',
    'cleanup-unused-scripts'
  ]
};

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentScripts = Object.keys(packageJson.scripts);

// Analyze scripts
function analyzeScripts() {
  console.log('Analyzing scripts for final cleanup...\n');
  
  const essential = currentScripts.filter(script => 
    scriptCategories.essential.includes(script)
  );
  
  const reorganization = currentScripts.filter(script => 
    scriptCategories.reorganization.includes(script)
  );
  
  const other = currentScripts.filter(script => 
    !scriptCategories.essential.includes(script) && 
    !scriptCategories.reorganization.includes(script)
  );
  
  console.log(`Essential scripts (${essential.length}):`);
  essential.forEach(script => {
    console.log(`  ${script}`);
  });
  
  console.log(`\nReorganization scripts (${reorganization.length}):`);
  reorganization.forEach(script => {
    console.log(`  ${script}`);
  });
  
  if (other.length > 0) {
    console.log(`\nOther scripts (${other.length}):`);
    other.forEach(script => {
      console.log(`  ${script}`);
    });
  }
  
  console.log('\nRecommendation:');
  console.log(`Remove ${reorganization.length} reorganization scripts that aren't needed for ongoing development or CI/CD.`);
  console.log('To remove these scripts, run with --clean flag.');
  
  return { reorganization };
}

// Clean up package.json
function cleanupPackage() {
  const { reorganization } = analyzeScripts();
  
  if (reorganization.length === 0) {
    console.log('No scripts to remove.');
    return;
  }
  
  console.log('\nRemoving reorganization scripts...');
  
  // Create a cleaned version of the scripts object
  const cleanedScripts = {};
  
  for (const [script, command] of Object.entries(packageJson.scripts)) {
    if (!reorganization.includes(script)) {
      cleanedScripts[script] = command;
    }
  }
  
  // Updated package.json content
  const cleanedPackageJson = {
    ...packageJson,
    scripts: cleanedScripts
  };
  
  try {
    // Create a backup of the original file
    const backupPath = packageJsonPath + '.bak';
    fs.writeFileSync(backupPath, JSON.stringify(packageJson, null, 2));
    console.log(`Backup created at: ${backupPath}`);
    
    // Write the cleaned package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(cleanedPackageJson, null, 2));
    console.log('Updated package.json with reorganization scripts removed');
    
    // Get script count difference
    const originalCount = Object.keys(packageJson.scripts).length;
    const cleanedCount = Object.keys(cleanedScripts).length;
    const removedCount = originalCount - cleanedCount;
    
    console.log(`Successfully removed ${removedCount} scripts (${originalCount} → ${cleanedCount})`);
  } catch (error) {
    console.error('Error updating package.json:', error);
  }
}

// Main execution
const args = process.argv.slice(2);
if (args.includes('--clean')) {
  cleanupPackage();
} else {
  analyzeScripts();
}
