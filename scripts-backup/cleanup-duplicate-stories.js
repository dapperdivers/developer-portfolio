#!/usr/bin/env node

/**
 * This script removes duplicate story files from the src/stories directory
 * that have already been moved to component-specific directories.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Component directories to check against
const componentTypes = ['atoms', 'molecules', 'organisms', 'layout'];
const storyDirs = ['atoms', 'molecules', 'organisms', 'templates'];

// Files to preserve (keep these in src/stories)
const preserveFiles = [
  'Introduction.stories.jsx',
  'Introduction.stories.mdx',
  'Configure.mdx',
  'README.md'
];

// Get all story files in component directories
function getComponentStoryFiles() {
  const storyFiles = new Set();
  
  // Walk through component directories
  for (const type of componentTypes) {
    const componentDir = path.join(projectRoot, 'src', 'components', type);
    
    if (!fs.existsSync(componentDir)) {
      continue;
    }
    
    const components = fs.readdirSync(componentDir);
    
    for (const component of components) {
      const componentPath = path.join(componentDir, component);
      if (fs.statSync(componentPath).isDirectory()) {
        const files = fs.readdirSync(componentPath);
        
        for (const file of files) {
          if (file.endsWith('.stories.jsx') || file.endsWith('.stories.mdx')) {
            storyFiles.add(path.basename(file));
          }
        }
      }
    }
  }
  
  return storyFiles;
}

// Delete duplicate stories in src/stories directory
function deleteDuplicateStories(componentStoryFiles) {
  const storiesDir = path.join(projectRoot, 'src', 'stories');
  let deletedCount = 0;
  
  if (!fs.existsSync(storiesDir)) {
    console.log('No stories directory found. Nothing to clean up.');
    return 0;
  }
  
  // Check top-level stories
  const topLevelFiles = fs.readdirSync(storiesDir);
  
  for (const file of topLevelFiles) {
    const filePath = path.join(storiesDir, file);
    
    if (
      fs.statSync(filePath).isFile() && 
      (file.endsWith('.stories.jsx') || file.endsWith('.stories.mdx')) && 
      !preserveFiles.includes(file) &&
      componentStoryFiles.has(file)
    ) {
      fs.unlinkSync(filePath);
      console.log(`Deleted duplicate story: ${filePath}`);
      deletedCount++;
    }
  }
  
  // Check story subdirectories
  for (const dir of storyDirs) {
    const storyTypeDir = path.join(storiesDir, dir);
    
    if (!fs.existsSync(storyTypeDir) || !fs.statSync(storyTypeDir).isDirectory()) {
      continue;
    }
    
    const storyFiles = fs.readdirSync(storyTypeDir);
    
    for (const file of storyFiles) {
      const filePath = path.join(storyTypeDir, file);
      
      if (
        fs.statSync(filePath).isFile() && 
        (file.endsWith('.stories.jsx') || file.endsWith('.stories.mdx')) && 
        componentStoryFiles.has(file)
      ) {
        fs.unlinkSync(filePath);
        console.log(`Deleted duplicate story: ${filePath}`);
        deletedCount++;
      }
    }
  }
  
  return deletedCount;
}

// Update the stories README
function updateStoriesReadme() {
  const readmePath = path.join(projectRoot, 'src', 'stories', 'README.md');
  
  if (!fs.existsSync(readmePath)) {
    console.log('No stories README.md found. Skipping update.');
    return;
  }
  
  let content = fs.readFileSync(readmePath, 'utf8');
  
  // Update content
  const updatedContent = content.replace(
    /## Directory Structure[\s\S]*?## Best Practices/m,
    `## Directory Structure

**Important**: Stories have been moved to live alongside their components!

- **Old Structure** (deprecated):
  - \`atoms/\` - Stories for basic UI components 
  - \`molecules/\` - Stories for composite components
  - \`organisms/\` - Stories for full sections
  - \`templates/\` - Stories for layout components

- **New Structure**:
  Stories are now co-located with their components:
  \`\`\`
  src/components/[type]/[ComponentName]/
  ├── [ComponentName].jsx
  ├── [ComponentName].css
  ├── [ComponentName].stories.jsx  // Stories are here now!
  ├── [ComponentName].test.jsx
  └── index.js
  \`\`\`

- \`design-system/\` - Stories for design tokens and visual design elements
- \`utils/\` - Helper utilities for Storybook
- \`assets/\` - Static assets used in Storybook

## Best Practices`
  );
  
  fs.writeFileSync(readmePath, updatedContent);
  console.log('Updated stories README.md');
}

// Main execution
console.log('Starting cleanup of duplicate stories...');
const componentStoryFiles = getComponentStoryFiles();
console.log(`Found ${componentStoryFiles.size} story files in component directories.`);

const deletedCount = deleteDuplicateStories(componentStoryFiles);
console.log(`Deleted ${deletedCount} duplicate story files.`);

updateStoriesReadme();
console.log('Cleanup complete!');
