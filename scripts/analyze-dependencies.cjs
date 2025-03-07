#!/usr/bin/env node
/**
 * Component Dependency Analyzer
 * 
 * This script analyzes component dependencies and React API usage
 * to help optimize bundling strategies and understand the component graph.
 */

const fs = require('fs');
const path = require('path');

// Get project root directory correctly
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Directories to analyze
const componentsDir = path.join(rootDir, 'src', 'components');
const hooksDir = path.join(rootDir, 'src', 'hooks');
const contextDir = path.join(rootDir, 'src', 'context');
const utilsDir = path.join(rootDir, 'src', 'utils');

// Critical React APIs to detect
const REACT_APIS = [
  'React.createContext',
  'createContext(',
  'React.memo',
  'memo(',
  'React.Component',
  'extends Component',
  'extends React.Component',
  'React.PureComponent',
  'extends PureComponent',
  'React.forwardRef',
  'forwardRef(',
  'useContext(',
  'React.useContext',
  'React.lazy',
  'lazy(',
  'React.Suspense',
];

// Import pattern detection
const IMPORT_PATTERNS = {
  // Regular imports: import x from 'y'
  defaultImport: /import\s+([^{}\s,]+)\s+from\s+['"]([^'"]+)['"]/g,
  
  // Destructured imports: import { x } from 'y'
  destructuredImport: /import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/g,
  
  // Dynamic imports: const x = await import('y')
  dynamicImport: /import\(\s*['"]([^'"]+)['"]\s*\)/g,
  
  // Import all: import * as x from 'y'
  namespaceImport: /import\s+\*\s+as\s+([^{}\s,]+)\s+from\s+['"]([^'"]+)['"]/g,
};

// Results storage
const componentDependencies = new Map();
const hookDependencies = new Map();
const reactApiUsage = new Map();
const importPatterns = new Map();
const projectDependencies = new Map();

/**
 * Parse imports from a file
 * @param {string} content - File content
 * @param {string} filePath - Path to the file
 * @returns {string[]} Array of imports
 */
function parseImports(content, filePath) {
  const imports = [];
  const importsByType = {
    default: [],
    destructured: [],
    namespace: [],
    dynamic: []
  };
  
  // Helper to get all matches with a regex that has global flag
  function getAllMatches(regex, str) {
    const matches = [];
    let match;
    while ((match = regex.exec(str)) !== null) {
      matches.push(match);
    }
    // Reset lastIndex for next use of the regex
    regex.lastIndex = 0;
    return matches;
  }
  
  // Find default imports
  getAllMatches(IMPORT_PATTERNS.defaultImport, content).forEach(match => {
    const importName = match[1];
    const importPath = match[2];
    imports.push(importPath);
    importsByType.default.push({ name: importName, from: importPath });
  });
  
  // Find destructured imports
  getAllMatches(IMPORT_PATTERNS.destructuredImport, content).forEach(match => {
    const importNames = match[1];
    const importPath = match[2];
    imports.push(importPath);
    
    // Split multiple imports in destructuring
    const names = importNames.split(',').map(name => name.trim());
    names.forEach(name => {
      importsByType.destructured.push({ name, from: importPath });
    });
  });
  
  // Find namespace imports
  getAllMatches(IMPORT_PATTERNS.namespaceImport, content).forEach(match => {
    const importName = match[1];
    const importPath = match[2];
    imports.push(importPath);
    importsByType.namespace.push({ name: importName, from: importPath });
  });
  
  // Find dynamic imports
  getAllMatches(IMPORT_PATTERNS.dynamicImport, content).forEach(match => {
    const importPath = match[1];
    imports.push(importPath);
    importsByType.dynamic.push({ from: importPath });
  });
  
  // Store import patterns
  importPatterns.set(filePath, importsByType);
  
  return [...new Set(imports)]; // Deduplicate imports
}

/**
 * Check for React API usage in a file
 * @param {string} content - File content
 * @param {string} filePath - Path to the file
 * @returns {string[]} Array of used React APIs
 */
function detectReactApis(content, filePath) {
  const apis = [];
  
  REACT_APIS.forEach(api => {
    if (content.includes(api)) {
      apis.push(api);
    }
  });
  
  if (apis.length > 0) {
    reactApiUsage.set(filePath, apis);
  }
  
  return apis;
}

/**
 * Resolve path to module
 * @param {string} importPath - Import path
 * @param {string} currentDir - Current directory
 * @returns {string|null} Resolved path or null
 */
function resolveModule(importPath, currentDir) {
  // Handle relative paths
  if (importPath.startsWith('.')) {
    const absolutePath = path.resolve(currentDir, importPath);
    
    // Try common extensions
    const extensions = ['.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.jsx', '/index.ts', '/index.tsx'];
    for (const ext of extensions) {
      const pathWithExt = absolutePath + ext;
      if (fs.existsSync(pathWithExt)) {
        return pathWithExt;
      }
    }
  }
  
  // Handle aliases
  if (importPath.startsWith('@')) {
    // Common aliases in the project
    const aliasMap = {
      '@': path.join(rootDir, 'src'),
      '@components': path.join(rootDir, 'src', 'components'),
      '@atoms': path.join(rootDir, 'src', 'components', 'atoms'),
      '@molecules': path.join(rootDir, 'src', 'components', 'molecules'),
      '@organisms': path.join(rootDir, 'src', 'components', 'organisms'),
      '@layout': path.join(rootDir, 'src', 'components', 'layout'),
      '@utils': path.join(rootDir, 'src', 'utils'),
      '@hooks': path.join(rootDir, 'src', 'hooks'),
      '@context': path.join(rootDir, 'src', 'context'),
      '@assets': path.join(rootDir, 'src', 'assets'),
    };
    
    // Find matching alias
    for (const [alias, aliasPath] of Object.entries(aliasMap)) {
      if (importPath.startsWith(alias)) {
        const relativePath = importPath.slice(alias.length);
        const absolutePath = path.join(aliasPath, relativePath);
        
        // Try common extensions
        const extensions = ['.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.jsx', '/index.ts', '/index.tsx', ''];
        for (const ext of extensions) {
          const pathWithExt = absolutePath + ext;
          if (fs.existsSync(pathWithExt)) {
            return pathWithExt;
          }
        }
      }
    }
  }
  
  // External dependency
  if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
    return importPath;
  }
  
  return null;
}

/**
 * Get all files in directory recursively
 * @param {string} dir - Directory to scan
 * @param {string[]} extensions - File extensions to include
 * @returns {string[]} Array of file paths
 */
function getAllFiles(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  const files = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      files.push(...getAllFiles(entryPath, extensions));
    } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
      files.push(entryPath);
    }
  }
  
  return files;
}

/**
 * Add component or hook to dependency map
 * @param {Map} map - Dependency map
 * @param {string} filePath - File path
 * @param {string[]} dependencies - Dependencies
 * @param {string[]} apis - React APIs used
 */
function addToDependencyMap(map, filePath, dependencies, apis) {
  const fileName = path.basename(filePath);
  const relativePath = path.relative(rootDir, filePath);
  
  map.set(relativePath, {
    file: fileName,
    path: relativePath,
    dependencies,
    usesReactApis: apis.length > 0,
    reactApis: apis,
  });
}

/**
 * Analyze a single file
 * @param {string} filePath - Path to the file
 */
function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const currentDir = path.dirname(filePath);
    
    // Parse imports
    const imports = parseImports(content, filePath);
    
    // Detect React API usage
    const apis = detectReactApis(content, filePath);
    
    // Resolve dependencies
    const dependencies = imports
      .map(importPath => resolveModule(importPath, currentDir))
      .filter(resolvedPath => resolvedPath !== null);
    
    // Add to project dependencies
    const relativePath = path.relative(rootDir, filePath);
    projectDependencies.set(relativePath, dependencies);
    
    // Add to appropriate dependency map
    if (filePath.includes('/components/')) {
      addToDependencyMap(componentDependencies, filePath, dependencies, apis);
    } else if (filePath.includes('/hooks/')) {
      addToDependencyMap(hookDependencies, filePath, dependencies, apis);
    }
  } catch (error) {
    console.error(`Error analyzing file ${filePath}:`, error);
  }
}

/**
 * Generate HTML report
 */
function generateReport() {
  const reportPath = path.join(rootDir, 'dependency-report.html');
  
  // Count React API usage by component
  const componentApiCount = [...componentDependencies.values()].reduce((acc, comp) => {
    if (comp.usesReactApis) acc++;
    return acc;
  }, 0);
  
  // Count React API usage by hook
  const hookApiCount = [...hookDependencies.values()].reduce((acc, hook) => {
    if (hook.usesReactApis) acc++;
    return acc;
  }, 0);
  
  // Calculate destructured import percentage
  let totalImports = 0;
  let destructuredReactImports = 0;
  
  importPatterns.forEach(patterns => {
    patterns.destructured.forEach(imp => {
      if (imp.from === 'react') {
        destructuredReactImports++;
        totalImports++;
      }
    });
    
    patterns.default.forEach(imp => {
      if (imp.from === 'react') {
        totalImports++;
      }
    });
  });
  
  const destructuredPercentage = totalImports > 0
    ? Math.round((destructuredReactImports / totalImports) * 100)
    : 0;
  
  // HTML report
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Component Dependency Analysis</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #333; }
    h1, h2, h3 { margin-top: 2rem; }
    .container { max-width: 1200px; margin: 0 auto; }
    .summary { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 2rem; }
    .summary-box { background-color: #f5f5f5; border-radius: 6px; padding: 15px; flex: 1; min-width: 200px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    .summary-box h3 { margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #ddd; }
    th { background-color: #f5f5f5; }
    tr:hover { background-color: #f9f9f9; }
    .risk { color: #e53935; }
    .safe { color: #43a047; }
    .warning { color: #fb8c00; }
    .risk-high { background-color: #ffebee; }
    .risk-medium { background-color: #fff8e1; }
    .dependencies { font-family: monospace; font-size: 0.9em; }
    .react-apis { font-family: monospace; color: #d32f2f; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Component Dependency Analysis Report</h1>
    
    <div class="summary">
      <div class="summary-box">
        <h3>Components</h3>
        <p>Total: <strong>${componentDependencies.size}</strong></p>
        <p>Using React APIs: <strong>${componentApiCount}</strong> (${Math.round(componentApiCount / componentDependencies.size * 100)}%)</p>
      </div>
      
      <div class="summary-box">
        <h3>Hooks</h3>
        <p>Total: <strong>${hookDependencies.size}</strong></p>
        <p>Using React APIs: <strong>${hookApiCount}</strong> (${Math.round(hookApiCount / hookDependencies.size * 100)}%)</p>
      </div>
      
      <div class="summary-box">
        <h3>Import Analysis</h3>
        <p>Destructured React imports: <strong>${destructuredPercentage}%</strong></p>
        <p>Total imports analyzed: <strong>${importPatterns.size}</strong></p>
      </div>
    </div>
    
    <h2>Components Using React APIs</h2>
    <table>
      <tr>
        <th>Component</th>
        <th>React APIs Used</th>
        <th>Dependencies</th>
      </tr>
      ${[...componentDependencies.values()]
        .filter(comp => comp.usesReactApis)
        .sort((a, b) => b.reactApis.length - a.reactApis.length)
        .map(comp => `
          <tr class="${comp.reactApis.length > 2 ? 'risk-high' : comp.reactApis.length > 0 ? 'risk-medium' : ''}">
            <td>${comp.path}</td>
            <td class="react-apis">${comp.reactApis.join(', ')}</td>
            <td class="dependencies">${comp.dependencies.map(d => typeof d === 'string' && !d.includes('node_modules') ? path.relative(rootDir, d) : d).join('<br>')}</td>
          </tr>
        `).join('')}
    </table>
    
    <h2>Hooks Using React APIs</h2>
    <table>
      <tr>
        <th>Hook</th>
        <th>React APIs Used</th>
        <th>Dependencies</th>
      </tr>
      ${[...hookDependencies.values()]
        .filter(hook => hook.usesReactApis)
        .sort((a, b) => b.reactApis.length - a.reactApis.length)
        .map(hook => `
          <tr class="${hook.reactApis.length > 2 ? 'risk-high' : hook.reactApis.length > 0 ? 'risk-medium' : ''}">
            <td>${hook.path}</td>
            <td class="react-apis">${hook.reactApis.join(', ')}</td>
            <td class="dependencies">${hook.dependencies.map(d => typeof d === 'string' && !d.includes('node_modules') ? path.relative(rootDir, d) : d).join('<br>')}</td>
          </tr>
        `).join('')}
    </table>
    
    <h2>Destructured React Imports</h2>
    <table>
      <tr>
        <th>File</th>
        <th>Destructured Imports</th>
      </tr>
      ${[...importPatterns.entries()]
        .filter(([_, patterns]) => patterns.destructured.some(i => i.from === 'react'))
        .map(([file, patterns]) => `
          <tr>
            <td>${path.relative(rootDir, file)}</td>
            <td class="react-apis">${patterns.destructured.filter(i => i.from === 'react').map(i => i.name).join(', ')}</td>
          </tr>
        `).join('')}
    </table>
    
    <h2>Dependency Chain Analysis</h2>
    <p>Components that might be affected by tree-shaking issues due to indirect dependencies on React APIs</p>
    <table>
      <tr>
        <th>Component</th>
        <th>Dependency Chain</th>
      </tr>
      <!-- Dependency chains would go here - this requires more complex analysis -->
    </table>
    
    <h2>Recommendations</h2>
    <ul>
      <li>Convert destructured React imports to namespace imports (e.g., <code>import React from 'react'</code> instead of <code>import { useState } from 'react'</code>)</li>
      <li>Use the <code>contextUtils.ts</code> helpers for creating and consuming contexts</li>
      <li>Consider bundling components with high React API usage with the React vendor chunk</li>
      <li>Review component dependencies to minimize unnecessary imports</li>
    </ul>
  </div>
</body>
</html>`;
  
  fs.writeFileSync(reportPath, html);
  console.log(`Report generated at ${reportPath}`);
  
  // Also generate a JSON version for programmatic use
  const jsonData = {
    summary: {
      components: {
        total: componentDependencies.size,
        usingReactApis: componentApiCount,
        percentage: Math.round(componentApiCount / componentDependencies.size * 100)
      },
      hooks: {
        total: hookDependencies.size,
        usingReactApis: hookApiCount,
        percentage: Math.round(hookApiCount / hookDependencies.size * 100)
      },
      imports: {
        destructuredReactPercentage: destructuredPercentage
      }
    },
    components: Object.fromEntries(componentDependencies),
    hooks: Object.fromEntries(hookDependencies),
    reactApiUsage: Object.fromEntries(reactApiUsage),
    importPatterns: Object.fromEntries([...importPatterns.entries()].map(([k, v]) => [k, {
      default: v.default,
      destructured: v.destructured,
      namespace: v.namespace,
      dynamic: v.dynamic
    }]))
  };
  
  fs.writeFileSync(path.join(rootDir, 'dependency-report.json'), JSON.stringify(jsonData, null, 2));
  console.log(`JSON data saved to dependency-report.json`);
}

/**
 * Main function to run the analysis
 */
function main() {
  console.log('📊 Analyzing component dependencies...');
  
  // Get all files
  const components = getAllFiles(componentsDir);
  const hooks = getAllFiles(hooksDir);
  const contexts = getAllFiles(contextDir);
  const utils = getAllFiles(utilsDir);
  
  console.log(`Found ${components.length} components, ${hooks.length} hooks, ${contexts.length} contexts, and ${utils.length} utils`);
  
  // Analyze files
  [...components, ...hooks, ...contexts, ...utils].forEach(analyzeFile);
  
  // Generate report
  generateReport();
  
  console.log('✅ Analysis complete!');
}

// Run the analysis
try {
  main();
} catch (error) {
  console.error('Error running component analysis:', error);
  process.exit(1);
}
