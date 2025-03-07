#!/usr/bin/env node

// Simple script to identify components using React APIs
const fs = require('fs');
const path = require('path');

// Project directories to scan
const DIRS = [
  path.join(__dirname, 'src', 'components'),
  path.join(__dirname, 'src', 'context'),
  path.join(__dirname, 'src', 'hooks')
];

// Critical React APIs to identify
const CRITICAL_APIS = [
  'createContext',
  'React.createContext',
  'memo(',
  'React.memo',
  'Component',
  'React.Component',
  'extends Component',
  'extends React.Component'
];

// Storage for results
const results = {
  criticalFiles: [],
  destructuredImports: [],
  totalFiles: 0
};

// Check for destructured React imports
function hasDestructuredReactImport(content) {
  return content.includes('import {') && content.includes('} from \'react\'');
}

// Find all JS files recursively
function findAllFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      results = results.concat(findAllFiles(fullPath));
    } else if (entry.isFile() && 
              (entry.name.endsWith('.js') || 
               entry.name.endsWith('.jsx') || 
               entry.name.endsWith('.ts') || 
               entry.name.endsWith('.tsx'))) {
      results.push(fullPath);
    }
  }
  
  return results;
}

// Analyze a file for React API usage
function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(__dirname, filePath);
    results.totalFiles++;
    
    // Check for critical API usage
    const usedApis = CRITICAL_APIS.filter(api => content.includes(api));
    
    if (usedApis.length > 0) {
      results.criticalFiles.push({
        path: relativePath,
        apis: usedApis
      });
    }
    
    // Check for destructured imports
    if (hasDestructuredReactImport(content)) {
      results.destructuredImports.push(relativePath);
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}: ${error.message}`);
  }
}

// Main execution
console.log('Scanning project for React API usage...');

// Get all files
const allFiles = DIRS.reduce((acc, dir) => {
  return acc.concat(findAllFiles(dir));
}, []);

// Analyze each file
allFiles.forEach(analyzeFile);

// Print results
console.log('\n===== REACT API USAGE REPORT =====\n');
console.log(`Total files scanned: ${results.totalFiles}`);
console.log(`Files using critical React APIs: ${results.criticalFiles.length}`);
console.log(`Files with destructured React imports: ${results.destructuredImports.length}`);

console.log('\n--- HIGH PRIORITY FILES ---');
results.criticalFiles.forEach(file => {
  console.log(`\n${file.path}:`);
  console.log(`  APIs: ${file.apis.join(', ')}`);
  if (results.destructuredImports.includes(file.path)) {
    console.log('  ⚠️ Uses destructured import');
  }
});

console.log('\n--- FILES WITH DESTRUCTURED IMPORTS ---');
results.destructuredImports.forEach(file => {
  console.log(file);
});

console.log('\n===== MIGRATION PRIORITIES =====');
console.log('1. Fix context providers first');
console.log('2. Update class components second');
console.log('3. Address memoized components last');
console.log('\nRecommend updating files WITH BOTH critical APIs and destructured imports first');
