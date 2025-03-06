/**
 * Script to update Storybook story imports to use path aliases
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Storybook story directories
const storyDirectories = [
  'atoms',
  'molecules',
  'organisms',
  'templates',
  'utils'
];

// Map of component types to their path aliases
const componentTypeToAlias = {
  'atoms': '@atoms',
  'molecules': '@molecules',
  'organisms': '@organisms',
  'layout': '@layout',
  'utils': '@utils'
};

// Process a story file to update its imports
async function processStoryFile(filePath, componentType) {
  try {
    // Read the file content
    const content = await fs.readFile(filePath, 'utf8');
    
    // Build patterns to match component imports
    const relativeImportPatterns = [
      `from '../../components/${componentType}`,
      `from '../components/${componentType}`,
      `from '../../components/${componentType.replace(/s$/, '')}`
    ];
    
    // For non-typed directories
    if (componentType === 'layout') {
      relativeImportPatterns.push(`from '../../components/layout`);
      relativeImportPatterns.push(`from '../components/layout`);
    }
    
    // Replace the old import patterns with new path aliases
    let newContent = content;
    let changed = false;
    
    for (const pattern of relativeImportPatterns) {
      if (newContent.includes(pattern)) {
        // Extract the component name from the import
        const regex = new RegExp(`import\\s+([A-Za-z0-9_{}]+)\\s+${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^'"]*)['"]`, 'g');
        
        newContent = newContent.replace(regex, (match, importName, componentPath) => {
          changed = true;
          const alias = componentTypeToAlias[componentType];
          return `import ${importName} from '${alias}${componentPath}'`;
        });
      }
    }
    
    // Update documentation examples
    const docImportPatterns = [
      `import .* from '.+/components/${componentType}`,
      `import .* from '.+/components/${componentType.replace(/s$/, '')}`
    ];
    
    for (const pattern of docImportPatterns) {
      const regex = new RegExp(pattern, 'g');
      
      if (regex.test(newContent)) {
        // Extract the component name
        const componentMatch = newContent.match(new RegExp(`${pattern}/([A-Za-z0-9_]+)'`));
        
        if (componentMatch && componentMatch[1]) {
          const componentName = componentMatch[1];
          const alias = componentTypeToAlias[componentType];
          
          const oldImportRegex = new RegExp(`import ${componentName} from '.+/components/([^/]+/)?${componentName}'`, 'g');
          newContent = newContent.replace(oldImportRegex, `import ${componentName} from '${alias}/${componentName}'`);
          changed = true;
        }
      }
    }
    
    // Save the file if changed
    if (changed) {
      await fs.writeFile(filePath, newContent, 'utf8');
      console.log(`✅ Updated imports in ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Main function
async function main() {
  try {
    console.log('🔍 Updating Storybook story imports...');
    
    // Root directory of the stories
    const storiesDir = path.resolve(process.cwd(), 'src/stories');
    
    // Process each story directory
    let totalUpdated = 0;
    
    for (const dirName of storyDirectories) {
      const dirPath = path.join(storiesDir, dirName);
      
      try {
        // Get all files in the directory
        const files = await fs.readdir(dirPath);
        
        // Process each file
        for (const file of files) {
          if (file.endsWith('.jsx') || file.endsWith('.js')) {
            const filePath = path.join(dirPath, file);
            const updated = await processStoryFile(filePath, dirName);
            
            if (updated) {
              totalUpdated++;
            }
          }
        }
      } catch (error) {
        console.error(`Error processing directory ${dirName}:`, error);
      }
    }
    
    console.log(`✅ Done! Updated imports in ${totalUpdated} story files.`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the script
main();