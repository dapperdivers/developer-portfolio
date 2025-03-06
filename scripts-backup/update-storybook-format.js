#!/usr/bin/env node

/**
 * Update Storybook Format Script
 * 
 * This script updates all story files to use the Storybook 8 format.
 * It converts:
 * - Template.bind({}) to object format ({ args: {...} })
 * - Updates imports for testing
 * - Fix parameters declaration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import glob from 'glob';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Find all story files in the project
const storyFiles = glob.sync('src/stories/**/*.stories.{js,jsx,ts,tsx}', { cwd: rootDir });

console.log(`Found ${storyFiles.length} story files to update...`);

// Process each file
let updatedCount = 0;
for (const relativeFilePath of storyFiles) {
  const filePath = path.join(rootDir, relativeFilePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace imports
  content = content.replace(
    /import\s+{(.*?)}\s+from\s+['"]@storybook\/testing-library['"];?/g, 
    'import { $1 } from \'@storybook/test\';'
  );
  
  // Replace jest imports
  content = content.replace(
    /import\s+{(.*?)}\s+from\s+['"]@storybook\/jest['"];?/g, 
    'import { $1 } from \'@storybook/test\';'
  );
  
  // Remove duplicate imports (if both testing-library and jest were imported)
  content = content.replace(
    /import\s+{(.*?)}\s+from\s+['"]@storybook\/test['"];?\s+import\s+{(.*?)}\s+from\s+['"]@storybook\/test['"];?/g,
    (match, imports1, imports2) => {
      const combinedImports = [...new Set([...imports1.split(','), ...imports2.split(',')])]
        .map(imp => imp.trim())
        .filter(imp => imp.length > 0)
        .join(', ');
      return `import { ${combinedImports} } from '@storybook/test';`;
    }
  );

  // Convert Template.bind({}) to Object format
  content = content.replace(
    /const\s+(\w+)\s+=\s+Template\.bind\({}\);([\s\S]*?)\1\.args\s+=\s+({[\s\S]*?});/g,
    'export const $1 = {\n  args: $3\n};'
  );

  // Format play functions correctly
  content = content.replace(
    /^(export const \w+) = {([\s\S]*?)};([\s\S]*?)^\1\.play/gm,
    '$1 = {$2,\n  play'
  );
  
  // Move parameters into the story object
  content = content.replace(
    /^(export const \w+) = {([\s\S]*?)};([\s\S]*?)^\1\.parameters\s+=\s+({[\s\S]*?});/gm,
    '$1 = {$2,\n  parameters: $4\n};'
  );
  
  // Only write to the file if changes were made
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`✅ Updated: ${relativeFilePath}`);
  }
}

console.log(`\nDone! Updated ${updatedCount} of ${storyFiles.length} files.`);