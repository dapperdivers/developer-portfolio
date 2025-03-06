#!/usr/bin/env node

/**
 * Fix Storybook Design Tokens Script
 * 
 * This script ensures that CSS design tokens are properly imported in Storybook
 * It specifically adds the correct CSS imports to the preview file
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Path to the preview file
const previewPath = path.join(rootDir, '.storybook', 'preview.jsx');

// Read the current preview file
console.log(`Reading Storybook preview file from: ${previewPath}`);
let previewContent = fs.readFileSync(previewPath, 'utf8');

// Check if we need to add design token CSS imports
if (!previewContent.includes('design-system/tokens')) {
  console.log('Adding design token CSS imports to preview file...');
  
  // Find the import section (look for the last import statement)
  const lastImportIndex = previewContent.lastIndexOf('import');
  const importEndIndex = previewContent.indexOf('\n', lastImportIndex);
  
  if (lastImportIndex !== -1) {
    // Add our CSS imports after the existing imports
    const tokenImports = `
// Import design system tokens CSS
import '../src/assets/css/design-system/tokens/colors.css';
import '../src/assets/css/design-system/tokens/typography.css';
import '../src/assets/css/design-system/tokens/spacing.css';
import '../src/assets/css/design-system/tokens/borders.css';
import '../src/assets/css/design-system/tokens/shadows.css';
import '../src/assets/css/design-system/tokens/transitions.css';
import '../src/assets/css/design-system/tokens/breakpoints.css';
import '../src/assets/css/design-system/tokens/z-index.css';`;

    // Insert after the last import
    previewContent = previewContent.slice(0, importEndIndex + 1) + 
                    tokenImports +
                    previewContent.slice(importEndIndex + 1);
                    
    // Write back to the file
    fs.writeFileSync(previewPath, previewContent, 'utf8');
    console.log('✅ Successfully updated Storybook preview with design token imports');
  } else {
    console.log('⚠️ Could not find import section in preview file');
  }
} else {
  console.log('Design token CSS imports already present, no changes needed');
}
