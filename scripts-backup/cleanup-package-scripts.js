#!/usr/bin/env node

/**
 * This script analyzes package.json scripts and provides recommendations
 * for scripts that can be safely removed after refactoring efforts are complete.
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
const categories = {
  // Core scripts that should be kept
  core: [
    'dev', 'build', 'build:analyze', 'serve', 'preview', 
    'lint', 'typecheck', 'verify', 'format', 'clean', 'reinstall'
  ],
  
  // Testing scripts to keep
  testing: [
    'test', 'test:watch', 'test:coverage'
  ],
  
  // Storybook essential scripts to keep
  storybook: [
    'storybook', 'build-storybook'
  ],
  
  // Asset management scripts to keep
  assets: [
    'optimize', 'optimize:images', 'optimize:svgs', 'optimize:all',
    'generate:metadata'
  ],
  
  // Component generation scripts to keep
  generation: [
    'generate-component', 'generate-story'
  ],
  
  // Scripts that were part of the component reorganization
  restructuring: [
    'reorganize-components', 'cleanup-stories', 'analyze-tests', 
    'cleanup-tests', 'update-component-generator'
  ],
  
  // Likely one-time scripts from previous refactors that can be removed
  deprecated: [
    'fix-double-export', 'fix-portfolio-context-imports', 
    'fix-storybook-design-tokens', 'fix-storybook-imports',
    'update-storybook-assets', 'update-storybook-format', 
    'verify-storybook-assets', 'analyze-bootstrap-usage',
    'migrate-component', 'migrate-to-alias-imports', 'final-verification'
  ]
};

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentScripts = Object.keys(packageJson.scripts);

// Analyze scripts
function analyzeScripts() {
  console.log('Package.json Script Analysis\n');
  
  // Count scripts by category
  const categoryCounts = {};
  const uncategorized = [];
  
  currentScripts.forEach(script => {
    let found = false;
    
    for (const [category, scripts] of Object.entries(categories)) {
      if (scripts.includes(script)) {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        found = true;
        break;
      }
    }
    
    if (!found) {
      uncategorized.push(script);
    }
  });
  
  // Display script counts by category
  console.log('Current script counts by category:');
  for (const category in categoryCounts) {
    console.log(`- ${category}: ${categoryCounts[category]} scripts`);
  }
  
  if (uncategorized.length > 0) {
    console.log(`- uncategorized: ${uncategorized.length} scripts`);
  }
  
  console.log('\nDeprecated Scripts (Recommended for Removal):');
  categories.deprecated.forEach(script => {
    if (currentScripts.includes(script)) {
      const command = packageJson.scripts[script];
      console.log(`- ${script}: ${command}`);
    }
  });
  
  // Scripts not in package.json but files exist
  const scriptFiles = fs.readdirSync(path.join(projectRoot, 'scripts'))
    .filter(file => file.endsWith('.js'))
    .map(file => path.basename(file, '.js'));
  
  const unusedScriptFiles = scriptFiles.filter(script => {
    // Check if any script in package.json uses this file
    return !Object.values(packageJson.scripts).some(cmd => 
      cmd.includes(`scripts/${script}.js`) || cmd.includes(`scripts\\${script}.js`)
    );
  });
  
  if (unusedScriptFiles.length > 0) {
    console.log('\nUnused Script Files (not referenced in package.json):');
    unusedScriptFiles.forEach(script => {
      console.log(`- scripts/${script}.js`);
    });
  }
  
  // Generate a cleanup command
  const scriptsToRemove = categories.deprecated.filter(script => 
    currentScripts.includes(script)
  );
  
  if (scriptsToRemove.length > 0) {
    console.log('\nCleanup recommendation:');
    
    // Create a cleaned version of the scripts object
    const cleanedScripts = {};
    
    for (const [script, command] of Object.entries(packageJson.scripts)) {
      if (!scriptsToRemove.includes(script)) {
        cleanedScripts[script] = command;
      }
    }
    
    // Updated package.json content
    const cleanedPackageJson = {
      ...packageJson,
      scripts: cleanedScripts
    };
    
    // Get script count difference
    const originalCount = Object.keys(packageJson.scripts).length;
    const cleanedCount = Object.keys(cleanedScripts).length;
    const removedCount = originalCount - cleanedCount;
    
    console.log(`Remove ${removedCount} deprecated scripts (${originalCount} → ${cleanedCount})`);
    console.log('\nTo automatically clean up package.json, run with --clean flag');
  } else {
    console.log('\nNo scripts need removal.');
  }
  
  return { scriptsToRemove };
}

function cleanupScripts() {
  const { scriptsToRemove } = analyzeScripts();
  
  if (scriptsToRemove.length === 0) {
    console.log('No scripts to remove.');
    return;
  }
  
  console.log('\nRemoving deprecated scripts...');
  
  // Create a cleaned version of the scripts object
  const cleanedScripts = {};
  
  for (const [script, command] of Object.entries(packageJson.scripts)) {
    if (!scriptsToRemove.includes(script)) {
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
    console.log('Updated package.json with deprecated scripts removed');
    
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
  cleanupScripts();
} else {
  analyzeScripts();
  console.log('\nThis was a dry run. Run with --clean flag to actually remove scripts.');
}
