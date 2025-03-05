/**
 * Script to update Storybook stories organization
 * Cleans up the stories folder to align with our atomic design pattern
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main function
async function main() {
  try {
    console.log('🔍 Updating Storybook stories organization...');
    const srcDir = path.resolve(process.cwd(), 'src');
    const storiesDir = path.join(srcDir, 'stories');
    
    // 1. Create a 'legacy' folder for old stories we'll keep for reference
    const legacyDir = path.join(storiesDir, 'legacy');
    try {
      await fs.mkdir(legacyDir, { recursive: true });
      console.log('✅ Created legacy directory for old stories');
    } catch (error) {
      console.log('⚠️ Legacy directory already exists or could not be created');
    }
    
    // 2. Move top-level stories files to legacy folder
    const topLevelFiles = [
      'Button.jsx', 
      'Button.stories.js', 
      'Header.jsx', 
      'Header.stories.js', 
      'Page.jsx', 
      'Page.stories.js',
      'button.css',
      'header.css',
      'page.css'
    ];
    
    for (const file of topLevelFiles) {
      try {
        const sourcePath = path.join(storiesDir, file);
        const destPath = path.join(legacyDir, file);
        
        // Check if file exists before trying to move it
        try {
          await fs.access(sourcePath);
          await fs.copyFile(sourcePath, destPath);
          await fs.unlink(sourcePath);
          console.log(`✅ Moved ${file} to legacy folder`);
        } catch (err) {
          if (err.code === 'ENOENT') {
            console.log(`⚠️ File ${file} not found, skipping`);
          } else {
            throw err;
          }
        }
      } catch (error) {
        console.error(`Error moving file ${file}:`, error);
      }
    }
    
    // 3. Update story imports to use the new path aliases
    // List of directories containing stories
    const storyDirs = ['atoms', 'molecules', 'organisms', 'templates', 'utils'];
    
    for (const dir of storyDirs) {
      const dirPath = path.join(storiesDir, dir);
      
      try {
        const files = await fs.readdir(dirPath);
        
        for (const file of files) {
          if (file.endsWith('.jsx') || file.endsWith('.js')) {
            const filePath = path.join(dirPath, file);
            let content = await fs.readFile(filePath, 'utf8');
            let modified = false;
            
            // Replace relative imports with path aliases
            const replacements = [
              { from: '../../components/atoms', to: '@atoms' },
              { from: '../../components/molecules', to: '@molecules' },
              { from: '../../components/organisms', to: '@organisms' },
              { from: '../../components/layout', to: '@layout' },
              { from: '../../components/ui', to: '@atoms' },
              { from: '../../utils', to: '@utils' },
              { from: '../../hooks', to: '@hooks' },
              { from: '../../context', to: '@context' },
              { from: '../../assets', to: '@assets' },
              { from: '../utils', to: '@utils' },
              { from: '../assets', to: '@assets' },
              { from: '../../portfolio', to: '@/portfolio' },
            ];
            
            for (const { from, to } of replacements) {
              // Regex to match imports starting with the 'from' path
              const regex = new RegExp(`import\\s+(?:.+?)\\s+from\\s+['"]${from}([^'"]*)['"](;?)`, 'g');
              
              content = content.replace(regex, (match, path, semicolon) => {
                modified = true;
                return `import${match.split('import')[1].replace(from + path, to + path)}`;
              });
            }
            
            if (modified) {
              await fs.writeFile(filePath, content, 'utf8');
              console.log(`✅ Updated imports in ${path.join(dir, file)}`);
            }
          }
        }
      } catch (error) {
        console.error(`Error processing directory ${dir}:`, error);
      }
    }
    
    // 4. Create a README.md in the stories folder that explains the organization
    const readmeContent = `# Storybook Stories

This directory contains Storybook stories organized according to the Atomic Design methodology.

## Directory Structure

- \`atoms/\` - Stories for basic UI components (Button, Card, Input)
- \`molecules/\` - Stories for composite components made of atoms (Cards, Form groups)
- \`organisms/\` - Stories for full sections of the page
- \`templates/\` - Stories for layout components and page templates
- \`design-system/\` - Stories for design tokens and visual design elements
- \`utils/\` - Helper utilities for Storybook
- \`assets/\` - Static assets used in Storybook
- \`legacy/\` - Legacy stories for reference

## Best Practices

1. Keep story files aligned with component structure
2. Use path aliases in imports (e.g., \`@atoms/Button\` instead of relative paths)
3. Provide documentation and examples for each component
4. Include interactive controls and variations where appropriate
5. Make sure stories are accessible and work with keyboard navigation

## Example Story

\`\`\`jsx
// Button.stories.jsx
import React from 'react';
import Button from '@atoms/Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};
\`\`\`
`;

    try {
      const readmePath = path.join(storiesDir, 'README.md');
      await fs.writeFile(readmePath, readmeContent, 'utf8');
      console.log('✅ Created README.md in stories folder');
    } catch (error) {
      console.error('Error creating README.md:', error);
    }
    
    console.log('✅ Done! Stories organization updated.');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
main();