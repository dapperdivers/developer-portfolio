#!/usr/bin/env node

/**
 * Repository Cleanup Script
 * 
 * This script removes files that are no longer needed in the developer portfolio project.
 * It's organized into categories to make it clear what types of files are being removed.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file and directory paths (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to remove, organized by category
const filesToRemove = {
  // HTML test files
  testHtmlFiles: [
    'simple-test.html',
    'context-test.html',
    'test.html'
  ],
  
  // Testing scripts
  testScripts: [
    'test-production-build.js',
    'test-production-server.js',
    'serve-test.js',
    'verify-production.js'
  ],
  
  // Analysis and debug files
  analysisFiles: [
    'analyze-react-deps.cjs',
    'debug-vite.js',
    'dependency-report.html',
    'dependency-report.json',
    'react-usage-analyzer.cjs',
    'check-imports.js',
    'fix-react-context.js'
  ],
  
  // ESLint related files (already migrated according to memory bank)
  eslintFiles: [
    'eslint-plugin-react-context-safety.js',
    'eslint.config.react-context-safety.js'
  ],
  
  // Backup directory
  backupDirs: [
    'backup_setup'
  ]
};

// Root directory of the project
const rootDir = path.resolve(__dirname, '..');

// Function to delete a file
function deleteFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        console.log(`Removing directory: ${filePath}`);
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        console.log(`Removing file: ${filePath}`);
        fs.unlinkSync(filePath);
      }
      return true;
    }
    return false;
  } catch (err) {
    console.error(`Error removing ${filePath}:`, err.message);
    return false;
  }
}

// Main cleanup function
function cleanup() {
  let totalRemoved = 0;
  let totalFailed = 0;
  
  // Process each category
  for (const [category, files] of Object.entries(filesToRemove)) {
    console.log(`\n=== Processing ${category} ===`);
    
    for (const file of files) {
      const filePath = path.join(rootDir, file);
      const success = deleteFile(filePath);
      
      if (success) {
        totalRemoved++;
      } else {
        totalFailed++;
        console.log(`  × Could not find ${file}`);
      }
    }
  }
  
  // Print summary
  console.log('\n=== Cleanup Summary ===');
  console.log(`Total files/directories removed: ${totalRemoved}`);
  console.log(`Files/directories not found: ${totalFailed}`);
  console.log('\nRepository cleanup completed.');
}

// Run the cleanup
cleanup();
