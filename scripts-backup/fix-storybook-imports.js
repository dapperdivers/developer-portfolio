#!/usr/bin/env node

/**
 * Fix Storybook Imports Script
 * 
 * This script updates all story files to use the correct imports for Storybook 8.
 * It replaces:
 * - @storybook/testing-library with @storybook/test
 * - @storybook/jest expect imports with the version from @storybook/test
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

console.log(`Found ${storyFiles.length} story files to check...`);

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
  
  // Only write to the file if changes were made
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`✅ Updated: ${relativeFilePath}`);
  }
}

console.log(`\nDone! Updated ${updatedCount} of ${storyFiles.length} files.`);