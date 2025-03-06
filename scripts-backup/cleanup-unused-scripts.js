#!/usr/bin/env node

/**
 * This script removes unused script files from the scripts directory
 * that are no longer referenced in package.json.
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

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Get all script files in the scripts directory
const scriptsDir = path.join(projectRoot, 'scripts');
const scriptFiles = fs.readdirSync(scriptsDir)
  .filter(file => file.endsWith('.js'))
  .map(file => path.basename(file, '.js'));

// Find unused script files
const unusedScriptFiles = scriptFiles.filter(script => {
  // Ignore this script and package cleanup scripts
  if (
    script === 'cleanup-unused-scripts' || 
    script === 'cleanup-package-scripts'
  ) {
    return false;
  }
  
  // Skip restructure-related scripts that we want to keep
  const keepScripts = [
    'reorganize-component-structure',
    'cleanup-duplicate-stories',
    'cleanup-test-directories',
    'update-component-generator'
  ];
  if (keepScripts.includes(script)) {
    return false;
  }
  
  // Check if any script in package.json uses this file
  return !Object.values(packageJson.scripts).some(cmd => 
    cmd.includes(`scripts/${script}.js`) || cmd.includes(`scripts\\${script}.js`)
  );
});

// Analyze files
function analyzeFiles() {
  console.log('Unused Script File Analysis\n');
  
  if (unusedScriptFiles.length === 0) {
    console.log('No unused script files found.');
    return;
  }
  
  console.log(`Found ${unusedScriptFiles.length} unused script files that are not referenced in package.json:`);
  
  unusedScriptFiles.forEach(script => {
    const filePath = path.join(scriptsDir, `${script}.js`);
    const stats = fs.statSync(filePath);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    console.log(`- scripts/${script}.js (${fileSizeKB} KB)`);
  });
  
  console.log('\nTo remove these files, run with --clean flag');
}

// Remove unused script files
function cleanupFiles() {
  console.log('Removing unused script files...\n');
  
  if (unusedScriptFiles.length === 0) {
    console.log('No unused script files to remove.');
    return;
  }
  
  // Create a backup directory
  const backupDir = path.join(projectRoot, 'scripts-backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }
  
  // Move files to backup directory
  let removedCount = 0;
  let totalSize = 0;
  
  for (const script of unusedScriptFiles) {
    const filePath = path.join(scriptsDir, `${script}.js`);
    const backupPath = path.join(backupDir, `${script}.js`);
    
    try {
      // Get file size for reporting
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      
      // Copy to backup
      fs.copyFileSync(filePath, backupPath);
      
      // Delete original
      fs.unlinkSync(filePath);
      
      console.log(`Removed: scripts/${script}.js`);
      removedCount++;
    } catch (error) {
      console.error(`Error removing ${script}.js: ${error.message}`);
    }
  }
  
  console.log(`\nRemoved ${removedCount} unused script files (${(totalSize / 1024).toFixed(2)} KB total)`);
  console.log(`Backup copies saved to: ${backupDir}`);
}

// Main execution
const args = process.argv.slice(2);
if (args.includes('--clean')) {
  cleanupFiles();
} else {
  analyzeFiles();
}
