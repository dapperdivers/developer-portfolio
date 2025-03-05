/**
 * Script to convert relative imports to path aliases
 * 
 * This script will:
 * 1. Find all JS/JSX files in the src directory
 * 2. Look for relative imports
 * 3. Replace them with the appropriate path aliases
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Config for path aliases and replacement patterns
const pathAliases = {
  // Components
  '../atoms/': '@atoms/',
  '../molecules/': '@molecules/',
  '../organisms/': '@organisms/',
  '../layout/': '@layout/',
  './atoms/': '@atoms/',
  './molecules/': '@molecules/',
  './organisms/': '@organisms/',
  './layout/': '@layout/',
  
  // Components with ui path - CRITICAL for cards and other ui components
  './ui/': '@atoms/',
  '../components/ui/': '@atoms/',
  
  // Direct component references from other folders
  '../components/atoms/': '@atoms/',
  '../components/molecules/': '@molecules/',
  '../components/organisms/': '@organisms/',
  '../components/layout/': '@layout/',
  
  // References to top-level folders
  '../utils/': '@utils/',
  '../hooks/': '@hooks/',
  '../context/': '@context/',
  '../assets/': '@assets/',
  '../portfolio': '@/portfolio',
  '../../portfolio': '@/portfolio',
  './portfolio': '@/portfolio',
  
  // Deep references
  '../../hooks/': '@hooks/',
  '../../utils/': '@utils/',
  '../../context/': '@context/',
  '../../assets/': '@assets/',
  
  // Non-relative paths that may still need fixing
  'src/hooks/': '@hooks/',
  'src/utils/': '@utils/',
  'src/context/': '@context/',
  'src/assets/': '@assets/',
  'src/components/atoms/': '@atoms/',
  'src/components/molecules/': '@molecules/',
  'src/components/organisms/': '@organisms/',
  'src/components/layout/': '@layout/',
};

// File extensions to process
const fileExtensions = ['.js', '.jsx', '.ts', '.tsx'];

// Find all files recursively in a directory
async function findFiles(dir, fileList = []) {
  try {
    const files = await fs.readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const fileStat = await fs.stat(filePath);
      
      if (fileStat.isDirectory()) {
        // Skip node_modules and build directories
        if (file !== 'node_modules' && file !== 'build' && file !== 'dist') {
          fileList = await findFiles(filePath, fileList);
        }
      } else {
        const ext = path.extname(file);
        if (fileExtensions.includes(ext)) {
          fileList.push(filePath);
        }
      }
    }
    
    return fileList;
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return fileList;
  }
}

// Process a single file
async function processFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    let newContent = content;
    let changed = false;
    
    // Check all import statements
    const importRegex = /import\s+(?:.+?)\s+from\s+['"](.+?)['"];?/g;
    const matches = content.matchAll(importRegex);
    
    for (const match of Array.from(matches)) {
      const importPath = match[1];
      
      // Check if we need to replace this path
      for (const [pattern, replacement] of Object.entries(pathAliases)) {
        if (importPath.startsWith(pattern)) {
          const newImportPath = importPath.replace(pattern, replacement);
          const oldImport = `from '${importPath}'`;
          const newImport = `from '${newImportPath}'`;
          
          newContent = newContent.replace(oldImport, newImport);
          changed = true;
          
          console.log(`[${path.basename(filePath)}] Replaced: ${importPath} → ${newImportPath}`);
        }
      }
    }
    
    // Save the file if changes were made
    if (changed) {
      await fs.writeFile(filePath, newContent, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}

// Main function
async function main() {
  try {
    console.log('🔍 Finding files...');
    const srcDir = path.resolve(process.cwd(), 'src');
    const files = await findFiles(srcDir);
    
    console.log(`🔍 Found ${files.length} files to process.`);
    
    // Process all files
    let changedCount = 0;
    for (const file of files) {
      const changed = await processFile(file);
      if (changed) {
        changedCount++;
      }
    }
    
    console.log(`✅ Done! Updated imports in ${changedCount} files.`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
main();