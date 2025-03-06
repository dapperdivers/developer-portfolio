#!/usr/bin/env node

/**
 * This script identifies and optionally cleans up __tests__ directories
 * after component restructuring.
 * 
 * It checks if test files have been successfully moved to component-specific
 * directories and lists which __tests__ directories can be safely removed.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Component type mapping
const componentTypes = ['atoms', 'molecules', 'organisms', 'layout'];

function getComponentTestFiles() {
  const componentTests = {};
  
  // Walk through component directories
  for (const type of componentTypes) {
    const componentsDir = path.join(projectRoot, 'src', 'components', type);
    
    if (!fs.existsSync(componentsDir)) {
      continue;
    }
    
    const components = fs.readdirSync(componentsDir);
    
    for (const component of components) {
      const componentDir = path.join(componentsDir, component);
      if (fs.statSync(componentDir).isDirectory()) {
        const files = fs.readdirSync(componentDir);
        
        for (const file of files) {
          if (file.endsWith('.test.jsx') || file.endsWith('.test.js')) {
            const testName = path.basename(file);
            if (!componentTests[testName]) {
              componentTests[testName] = [];
            }
            componentTests[testName].push({
              type,
              component,
              path: path.join(componentDir, file)
            });
          }
        }
      }
    }
  }
  
  return componentTests;
}

function findTestsInOldDirectories() {
  const oldTests = {};
  
  for (const type of componentTypes) {
    const testDir = path.join(projectRoot, 'src', 'components', type, '__tests__');
    
    if (!fs.existsSync(testDir)) {
      continue;
    }
    
    const files = fs.readdirSync(testDir);
    
    for (const file of files) {
      if (file.endsWith('.test.jsx') || file.endsWith('.test.js')) {
        const testName = file;
        if (!oldTests[testName]) {
          oldTests[testName] = [];
        }
        oldTests[testName].push({
          type,
          path: path.join(testDir, file)
        });
      }
    }
  }
  
  return oldTests;
}

function findSpecialDirectoryTests() {
  const specialTests = {
    hooks: [],
    utils: [],
    src: []
  };
  
  // Check hooks/__tests__
  const hooksTestDir = path.join(projectRoot, 'src', 'hooks', '__tests__');
  if (fs.existsSync(hooksTestDir)) {
    try {
      fs.readdirSync(hooksTestDir).forEach(file => {
        if (file.endsWith('.test.jsx') || file.endsWith('.test.js')) {
          specialTests.hooks.push(path.join(hooksTestDir, file));
        }
      });
    } catch (error) {
      console.log(`Error reading hooks/__tests__: ${error.message}`);
    }
  }
  
  // Check utils/__tests__
  const utilsTestDir = path.join(projectRoot, 'src', 'utils', '__tests__');
  if (fs.existsSync(utilsTestDir)) {
    try {
      fs.readdirSync(utilsTestDir).forEach(file => {
        if (file.endsWith('.test.jsx') || file.endsWith('.test.js')) {
          specialTests.utils.push(path.join(utilsTestDir, file));
        }
      });
    } catch (error) {
      console.log(`Error reading utils/__tests__: ${error.message}`);
    }
  }
  
  // Check src/__tests__
  const srcTestDir = path.join(projectRoot, 'src', '__tests__');
  if (fs.existsSync(srcTestDir)) {
    try {
      fs.readdirSync(srcTestDir).forEach(file => {
        if (file.endsWith('.test.jsx') || file.endsWith('.test.js')) {
          specialTests.src.push(path.join(srcTestDir, file));
        }
      });
    } catch (error) {
      console.log(`Error reading src/__tests__: ${error.message}`);
    }
  }
  
  return specialTests;
}

function analyzeTests() {
  const componentTests = getComponentTestFiles();
  const oldTests = findTestsInOldDirectories();
  const specialDirTests = findSpecialDirectoryTests();
  
  console.log('=== Test File Analysis ===\n');
  
  // Find tests that have been successfully moved
  const movedTests = new Set();
  const unmatchedTests = [];
  
  for (const [testName, locations] of Object.entries(oldTests)) {
    // Look for matching component test
    const baseName = testName.replace('.enhanced', '');
    
    if (componentTests[testName] || componentTests[baseName]) {
      movedTests.add(testName);
    } else {
      locations.forEach(location => {
        unmatchedTests.push(location.path);
      });
    }
  }
  
  // Report on component test directories
  console.log(`Found ${Object.keys(componentTests).length} test files in component directories.`);
  console.log(`Found ${Object.keys(oldTests).length} test files in __tests__ directories.`);
  console.log(`${movedTests.size} tests have been successfully moved to component directories.\n`);
  
  if (unmatchedTests.length > 0) {
    console.log('Tests in __tests__ directories that need to be moved:');
    unmatchedTests.forEach(test => {
      console.log(`  - ${test}`);
    });
    console.log('');
  }
  
  // Report on special directories
  console.log('Special test directories:');
  console.log(`- src/__tests__: ${specialDirTests.src.length} tests`);
  console.log(`- hooks/__tests__: ${specialDirTests.hooks.length} tests`);
  console.log(`- utils/__tests__: ${specialDirTests.utils.length} tests\n`);
  
  // Directories that can be safely removed
  const safeToRemove = [];
  for (const type of componentTypes) {
    const testDir = path.join('src/components', type, '__tests__');
    const testDirPath = path.join(projectRoot, testDir);
    
    if (fs.existsSync(testDirPath)) {
      const files = fs.readdirSync(testDirPath);
      const remainingTests = files.filter(
        file => file.endsWith('.test.jsx') || file.endsWith('.test.js')
      );
      
      if (remainingTests.length === 0 || remainingTests.every(test => movedTests.has(test))) {
        safeToRemove.push(testDir);
      }
    }
  }
  
  if (specialDirTests.utils.length === 0) {
    safeToRemove.push('src/utils/__tests__');
  }
  
  if (safeToRemove.length > 0) {
    console.log('Directories that can be safely removed:');
    safeToRemove.forEach(dir => {
      console.log(`  - ${dir}`);
    });
    console.log('');
  }
  
  console.log('=== Recommendations ===\n');
  
  if (unmatchedTests.length > 0) {
    console.log('Some tests in __tests__ directories have not been moved to their component directories.');
    console.log('Consider moving these tests before removing the __tests__ directories.\n');
  } else {
    console.log('All component tests have been successfully moved to their component directories.');
    console.log('You can safely remove the component __tests__ directories.\n');
  }
  
  if (specialDirTests.src.length > 0) {
    console.log('Keep src/__tests__ for general application tests not tied to specific components.\n');
  }
  
  if (specialDirTests.hooks.length > 0) {
    console.log('Keep hooks/__tests__ for hook-specific tests.\n');
  }
  
  if (specialDirTests.utils.length > 0) {
    console.log('Keep utils/__tests__ for utility function tests.\n');
  } else {
    console.log('utils/__tests__ is empty and can be removed.\n');
  }
  
  return {
    safeToRemove,
    unmatchedTests,
    specialDirTests
  };
}

function removeDirectories(directories) {
  directories.forEach(dir => {
    const fullPath = path.join(projectRoot, dir);
    if (fs.existsSync(fullPath)) {
      try {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`Removed: ${dir}`);
      } catch (error) {
        console.error(`Error removing ${dir}: ${error.message}`);
      }
    }
  });
}

// Main execution
console.log('Starting test directory analysis...');
const { safeToRemove, unmatchedTests } = analyzeTests();

const args = process.argv.slice(2);
if (args.includes('--clean') && safeToRemove.length > 0 && unmatchedTests.length === 0) {
  console.log('\nRemoving safe directories...');
  removeDirectories(safeToRemove);
  console.log('\nCleanup complete!');
} else if (args.includes('--clean') && unmatchedTests.length > 0) {
  console.log('\nNot removing directories because some tests have not been moved yet.');
  console.log('Run without --clean flag to see which tests need to be moved.');
} else if (args.includes('--clean')) {
  console.log('\nNo directories to clean up.');
} else {
  console.log('\nRun with --clean flag to remove directories that can be safely removed.');
}
