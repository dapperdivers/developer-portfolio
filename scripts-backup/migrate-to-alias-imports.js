#!/usr/bin/env node

/**
 * This script finds all .js and .jsx files in the src directory
 * and replaces relative imports with @ alias imports based on the
 * path mappings in tsconfig.json and vite.config.js.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Path mappings from tsconfig.json
const pathMappings = [
  { alias: '@/', path: 'src/' },
  { alias: '@components/', path: 'src/components/' },
  { alias: '@atoms/', path: 'src/components/atoms/' },
  { alias: '@molecules/', path: 'src/components/molecules/' },
  { alias: '@organisms/', path: 'src/components/organisms/' },
  { alias: '@layout/', path: 'src/components/layout/' },
  { alias: '@assets/', path: 'src/assets/' },
  { alias: '@utils/', path: 'src/utils/' },
  { alias: '@hooks/', path: 'src/hooks/' },
  { alias: '@context/', path: 'src/context/' },
  { alias: '@stories-utils/', path: 'src/stories/utils/' },
];

// Sort by path length in descending order to ensure more specific paths are processed first
pathMappings.sort((a, b) => b.path.length - a.path.length);

// Function to process a file and convert relative imports to alias imports
function processFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const fileDir = path.dirname(filePath);
  
  // Regular expression to find import statements with relative paths
  const importRegex = /import\s+(?:(?:[\w*{}$\s,]+)\s+from\s+)?['"]([./]+[^'"]+)['"]/g;
  
  let newContent = fileContent;
  let matches = [];
  let match;
  
  // Find all relative imports
  while ((match = importRegex.exec(fileContent)) !== null) {
    matches.push({
      statement: match[0],
      relativePath: match[1]
    });
  }
  
  // Process each import statement
  for (const { statement, relativePath } of matches) {
    // Skip if it's already using @ notation
    if (relativePath.startsWith('@')) {
      continue;
    }
    
    // Resolve the absolute path from the relative import
    const absolutePath = path.resolve(fileDir, relativePath).replace(/\\/g, '/');
    const projectRootPath = projectRoot.replace(/\\/g, '/');
    
    // Make the path relative to the project root
    let normalizedPath = absolutePath;
    if (normalizedPath.startsWith(projectRootPath)) {
      normalizedPath = normalizedPath.substring(projectRootPath.length + 1);
    }
    
    // Find the matching alias
    let aliasImport = null;
    for (const { alias, path: mappingPath } of pathMappings) {
      if (normalizedPath.startsWith(mappingPath)) {
        const importPath = normalizedPath.replace(mappingPath, alias);
        aliasImport = statement.replace(relativePath, importPath);
        break;
      }
    }
    
    // Replace the import if an alias was found
    if (aliasImport) {
      newContent = newContent.replace(statement, aliasImport);
    }
  }
  
  // Only write to the file if changes were made
  if (newContent !== fileContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated: ${filePath}`);
    return true;
  }
  
  return false;
}

// Find all .js and .jsx files in the src directory
const files = execSync('find src -type f -name "*.js" -o -name "*.jsx"')
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

console.log(`Found ${files.length} files to process...`);

let changedFiles = 0;
for (const file of files) {
  try {
    const changed = processFile(file);
    if (changed) {
      changedFiles++;
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
}

console.log(`Processed ${files.length} files, updated ${changedFiles} files.`);
