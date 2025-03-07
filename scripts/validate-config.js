#!/usr/bin/env node
/**
 * Configuration Validation Script
 * 
 * This script validates the modular build configuration by:
 * 1. Checking that all required environment variables are present
 * 2. Verifying module exports and imports between config files
 * 3. Analyzing path aliases to ensure consistency
 * 
 * Usage: 
 *   node scripts/validate-config.js
 *   npm run config:validate
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// Get proper __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const configDir = path.resolve(rootDir, 'config');

// Import configuration components
import env from '../config/env.js';
import paths from '../config/paths.js';
import corePlugins from '../config/plugins/core.js';
import pwaPlugins from '../config/plugins/pwa.js';
import codeSplitting from '../config/optimization/splitting.js';
import devConfig from '../config/dev/server.js';

// Test imports of the main config
let mainConfigValid = true;
try {
  const mainConfig = await import('../config/index.js');
  console.log(chalk.green('✓ Main configuration imports successfully'));
} catch (error) {
  console.error(chalk.red('✗ Main configuration import failed:'), error);
  mainConfigValid = false;
}

// Check environment variables
const envValidation = env.validateEnv();
if (envValidation.valid) {
  console.log(chalk.green('✓ Environment variables validation passed'));
} else {
  console.error(chalk.yellow('⚠ Missing environment variables:'), envValidation.missing);
  console.log(chalk.gray('   (Not necessarily an error in development mode)'));
}

// Validate path aliases
const aliasesValid = validateAliases(paths.pathAliases);

// Validate plugin exports
const pluginsValid = testPluginExports();

// Check if config files exist
const configFilesValid = validateConfigFiles();

// Overall validation status
const overallValid = mainConfigValid && aliasesValid && pluginsValid && configFilesValid;

// Print summary
console.log('\n=========================================');
console.log(chalk.cyan('Configuration Validation Summary:'));
console.log(`Main Configuration: ${mainConfigValid ? chalk.green('✓ Valid') : chalk.red('✗ Invalid')}`);
console.log(`Environment Variables: ${envValidation.valid ? chalk.green('✓ Valid') : chalk.yellow('⚠ Warning')}`);
console.log(`Path Aliases: ${aliasesValid ? chalk.green('✓ Valid') : chalk.red('✗ Invalid')}`);
console.log(`Plugin Exports: ${pluginsValid ? chalk.green('✓ Valid') : chalk.red('✗ Invalid')}`);
console.log(`Config Files: ${configFilesValid ? chalk.green('✓ Valid') : chalk.red('✗ Invalid')}`);
console.log('=========================================\n');

if (overallValid) {
  console.log(chalk.green('All configuration checks passed!'));
} else {
  console.log(chalk.red('Some configuration checks failed. Please fix the issues above.'));
  process.exit(1);
}

/**
 * Verify that all path aliases point to existing directories
 * @param {Object} aliases - Path aliases object
 * @returns {boolean} Validation result
 */
function validateAliases(aliases) {
  let allValid = true;
  
  console.log('\nValidating path aliases...');
  
  Object.entries(aliases).forEach(([alias, aliasPath]) => {
    if (!fs.existsSync(aliasPath)) {
      console.error(chalk.red(`✗ Path alias '${alias}' points to non-existent path: ${aliasPath}`));
      allValid = false;
    } else {
      console.log(chalk.green(`✓ Path alias '${alias}' is valid`));
    }
  });
  
  return allValid;
}

/**
 * Test if plugin exports are valid functions
 * @returns {boolean} Validation result
 */
function testPluginExports() {
  let allValid = true;
  
  console.log('\nValidating plugin exports...');
  
  // Test core plugins
  if (typeof corePlugins !== 'function') {
    console.error(chalk.red('✗ Core plugins export is not a function'));
    allValid = false;
  } else {
    const plugins = corePlugins();
    if (!Array.isArray(plugins)) {
      console.error(chalk.red('✗ Core plugins function does not return an array'));
      allValid = false;
    } else {
      console.log(chalk.green('✓ Core plugins export is valid'));
    }
  }
  
  // Test PWA plugins
  if (typeof pwaPlugins !== 'function') {
    console.error(chalk.red('✗ PWA plugins export is not a function'));
    allValid = false;
  } else {
    const plugins = pwaPlugins();
    if (!Array.isArray(plugins)) {
      console.error(chalk.red('✗ PWA plugins function does not return an array'));
      allValid = false;
    } else {
      console.log(chalk.green('✓ PWA plugins export is valid'));
    }
  }
  
  return allValid;
}

/**
 * Check if all required config files exist
 * @returns {boolean} Validation result
 */
function validateConfigFiles() {
  let allValid = true;
  
  console.log('\nValidating config file structure...');
  
  const requiredFiles = [
    'index.js',
    'paths.js',
    'env.js',
    'plugins/core.js',
    'plugins/pwa.js',
    'optimization/splitting.js',
    'dev/server.js'
  ];
  
  requiredFiles.forEach(file => {
    const filePath = path.join(configDir, file);
    if (!fs.existsSync(filePath)) {
      console.error(chalk.red(`✗ Required config file not found: ${file}`));
      allValid = false;
    } else {
      console.log(chalk.green(`✓ Config file exists: ${file}`));
    }
  });
  
  return allValid;
}
