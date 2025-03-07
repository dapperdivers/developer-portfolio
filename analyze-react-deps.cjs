// Simple React Dependency Analyzer
const fs = require('fs');
const path = require('path');

// Project root
const ROOT_DIR = __dirname;

// Critical React APIs to detect
const REACT_APIS = [
  { name: 'React.createContext', risk: 'high' },
  { name: 'createContext(', risk: 'high' },
  { name: 'React.memo', risk: 'high' },
  { name: 'memo(', risk: 'high' },
  { name: 'React.Component', risk: 'high' },
  { name: 'extends Component', risk: 'high' },
  { name: 'extends React.Component', risk: 'high' },
  { name: 'React.PureComponent', risk: 'high' },
  { name: 'extends PureComponent', risk: 'high' },
  { name: 'React.forwardRef', risk: 'high' },
  { name: 'forwardRef(', risk: 'high' },
  { name: 'useContext(', risk: 'medium' },
  { name: 'React.useContext', risk: 'medium' },
  { name: 'React.lazy', risk: 'medium' },
  { name: 'lazy(', risk: 'medium' },
  { name: 'React.Suspense', risk: 'medium' },
  { name: 'useState', risk: 'low' },
  { name: 'useEffect', risk: 'low' },
  { name: 'useRef', risk: 'low' },
  { name: 'useCallback', risk: 'low' },
  { name: 'useMemo', risk: 'low' },
];

// Directories to scan
const DIRS_TO_SCAN = [
  path.join(ROOT_DIR, 'src', 'components'),
  path.join(ROOT_DIR, 'src', 'hooks'),
  path.join(ROOT_DIR, 'src', 'context'),
  path.join(ROOT_DIR, 'src', 'utils'),
];

// Destructured import pattern detection
const DESTRUCTURED_IMPORT_PATTERN = /import\s+{([^}]+)}\s+from\s+['"]react['"]/g;

// Results
const results = {
  files: [],
  high: 0,
  medium: 0,
  low: 0,
  totalFiles: 0,
  destructuredImports: 0,
  namespaceImports: 0,
};

/**
 * Get all JS/TS files in directory recursively
 */
function getAllFiles(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  if (!fs.existsSync(dir)) return [];
  
  const files = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        files.push(...getAllFiles(fullPath, extensions));
      } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

/**
 * Analyze a file for React API usage
 */
function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(ROOT_DIR, filePath);
    
    // Detect API usage
    const usedApis = REACT_APIS.filter(api => content.includes(api.name));
    
    // Check for destructured React imports
    const hasDestructuredImports = content.match(DESTRUCTURED_IMPORT_PATTERN);
    
    // Check for namespace React imports
    const hasNamespaceImports = content.includes('import React from');
    
    if (hasDestructuredImports) results.destructuredImports++;
    if (hasNamespaceImports) results.namespaceImports++;
    
    // Calculate risk level
    let riskLevel = 'none';
    if (usedApis.some(api => api.risk === 'high')) {
      riskLevel = 'high';
      results.high++;
    } else if (usedApis.some(api => api.risk === 'medium')) {
      riskLevel = 'medium';
      results.medium++;
    } else if (usedApis.some(api => api.risk === 'low')) {
      riskLevel = 'low';
      results.low++;
    }
    
    results.totalFiles++;
    
    // Only record files with React API usage
    if (usedApis.length > 0) {
      results.files.push({
        path: relativePath,
        apis: usedApis.map(api => api.name),
        risk: riskLevel,
        destructuredImport: hasDestructuredImports !== null,
        namespaceImport: hasNamespaceImports,
      });
    }
  } catch (error) {
    console.error(`Error analyzing file ${filePath}:`, error.message);
  }
}

/**
 * Generate a simple report
 */
function generateReport() {
  // Sort files by risk level and then by number of APIs used
  const sortedFiles = [...results.files]
    .sort((a, b) => {
      const riskOrder = { high: 0, medium: 1, low: 2, none: 3 };
      if (riskOrder[a.risk] !== riskOrder[b.risk]) {
        return riskOrder[a.risk] - riskOrder[b.risk];
      }
      return b.apis.length - a.apis.length;
    });
  
  console.log('\n===== REACT DEPENDENCY ANALYSIS REPORT =====\n');
  
  console.log('SUMMARY');
  console.log('-------');
  console.log(`Total files analyzed: ${results.totalFiles}`);
  console.log(`High risk files: ${results.high}`);
  console.log(`Medium risk files: ${results.medium}`);
  console.log(`Low risk files: ${results.low}`);
  console.log(`Files using destructured React imports: ${results.destructuredImports}`);
  console.log(`Files using namespace React imports: ${results.namespaceImports}`);
  console.log('');
  
  console.log('HIGH RISK FILES');
  console.log('--------------');
  sortedFiles
    .filter(file => file.risk === 'high')
    .forEach(file => {
      console.log(`- ${file.path}`);
      console.log(`  APIs: ${file.apis.join(', ')}`);
      if (file.destructuredImport) console.log('  ⚠️ Uses destructured import');
    });
  console.log('');
  
  console.log('MEDIUM RISK FILES');
  console.log('----------------');
  sortedFiles
    .filter(file => file.risk === 'medium')
    .forEach(file => {
      console.log(`- ${file.path}`);
      console.log(`  APIs: ${file.apis.join(', ')}`);
      if (file.destructuredImport) console.log('  ⚠️ Uses destructured import');
    });
  console.log('');
  
  console.log('RECOMMENDATIONS');
  console.log('--------------');
  console.log('1. Convert ALL destructured React imports to namespace imports');
  console.log('   Bad:  import { useState, createContext } from "react"');
  console.log('   Good: import React from "react"');
  console.log('');
  console.log('2. Use src/utils/contextUtils.ts for all context creation');
  console.log('');
  console.log('3. Bundle high-risk components with React vendor bundle');
  console.log('   High-risk components: ' + sortedFiles.filter(f => f.risk === 'high').length);
  console.log('');
  console.log('==============================================');
}

/**
 * Main function
 */
function main() {
  console.log('Scanning project files for React dependencies...');
  
  // Get all files to analyze
  const allFiles = DIRS_TO_SCAN.flatMap(dir => getAllFiles(dir));
  
  // Analyze each file
  allFiles.forEach(analyzeFile);
  
  // Generate report
  generateReport();
}

// Run the analysis
try {
  main();
} catch (error) {
  console.error('Error running analysis:', error);
}
