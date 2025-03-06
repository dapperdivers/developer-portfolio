#!/usr/bin/env node

/**
 * This script reorganizes the component structure to keep all related files
 * (component, stories, CSS, tests) in a single directory.
 * 
 * For example, a Button component will be restructured as:
 * 
 * src/components/atoms/Button/
 * ├── Button.jsx
 * ├── Button.css
 * ├── Button.stories.jsx
 * ├── Button.test.jsx
 * ├── index.js
 * └── assets/ (if any)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Component type mapping
const componentTypes = ['atoms', 'molecules', 'organisms', 'layout'];
const componentFolders = {
  'atoms': 'src/components/atoms',
  'molecules': 'src/components/molecules',
  'organisms': 'src/components/organisms',
  'layout': 'src/components/layout'
};

// Get all component files
function getComponentFiles() {
  const components = {};
  
  // Process each component type
  for (const type of componentTypes) {
    const folder = componentFolders[type];
    
    // Skip if folder doesn't exist
    if (!fs.existsSync(folder)) {
      continue;
    }
    
    // Get all component files
    const files = fs.readdirSync(folder)
      .filter(file => file.endsWith('.jsx') && !file.endsWith('.test.jsx'));
    
    for (const file of files) {
      if (file === '__tests__' || file.startsWith('.')) continue;
      
      const componentName = path.basename(file, '.jsx');
      const componentPath = path.join(folder, file);
      
      if (!components[componentName]) {
        components[componentName] = {
          type,
          files: {}
        };
      }
      
      components[componentName].files.component = componentPath;
    }
  }
  
  return components;
}

// Find related files for each component
function findRelatedFiles(components) {
  // Find story files
  const storyFiles = execSync('find src/stories -type f -name "*.stories.jsx"')
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean);
  
  for (const storyPath of storyFiles) {
    const fileName = path.basename(storyPath);
    const componentName = fileName.replace('.stories.jsx', '');
    
    if (components[componentName]) {
      components[componentName].files.story = storyPath;
    }
  }
  
  // Find test files
  for (const type of componentTypes) {
    const testFolder = path.join(componentFolders[type], '__tests__');
    
    if (fs.existsSync(testFolder)) {
      const testFiles = fs.readdirSync(testFolder)
        .filter(file => file.endsWith('.test.jsx'));
        
      for (const testFile of testFiles) {
        const componentName = testFile.replace('.test.jsx', '');
        
        if (components[componentName]) {
          components[componentName].files.test = path.join(testFolder, testFile);
        }
      }
    }
  }
  
  // Find CSS files
  const cssFiles = execSync('find src/assets/css -type f -name "*.css"')
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean);
  
  for (const cssPath of cssFiles) {
    const fileName = path.basename(cssPath);
    const componentName = fileName.replace('.css', '');
    
    // Check for exact match and kebab-case variants
    for (const [name, component] of Object.entries(components)) {
      if (
        componentName === name.toLowerCase() || 
        componentName === name || 
        componentName === toKebabCase(name)
      ) {
        component.files.css = cssPath;
      }
    }
  }
  
  return components;
}

// Helper function to convert to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

// Create component directory structure
function createComponentDirectories(components) {
  for (const [name, component] of Object.entries(components)) {
    const type = component.type;
    const newDir = path.join(componentFolders[type], name);
    
    // Create component directory if it doesn't exist
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true });
      console.log(`Created directory: ${newDir}`);
    }
    
    // Create assets directory if needed
    const assetsDir = path.join(newDir, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
  }
}

// Move files to the new structure
function moveFiles(components) {
  for (const [name, component] of Object.entries(components)) {
    const type = component.type;
    const newDir = path.join(componentFolders[type], name);
    
    // Move component file
    if (component.files.component) {
      const destPath = path.join(newDir, `${name}.jsx`);
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(component.files.component, destPath);
        console.log(`Moved component: ${component.files.component} -> ${destPath}`);
      }
    }
    
    // Move story file
    if (component.files.story) {
      const destPath = path.join(newDir, `${name}.stories.jsx`);
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(component.files.story, destPath);
        console.log(`Moved story: ${component.files.story} -> ${destPath}`);
      }
    }
    
    // Move test file
    if (component.files.test) {
      const destPath = path.join(newDir, `${name}.test.jsx`);
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(component.files.test, destPath);
        console.log(`Moved test: ${component.files.test} -> ${destPath}`);
      }
    }
    
    // Move CSS file
    if (component.files.css) {
      const destPath = path.join(newDir, `${name}.css`);
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(component.files.css, destPath);
        console.log(`Moved CSS: ${component.files.css} -> ${destPath}`);
      }
    }
    
    // Create index.js file
    const indexPath = path.join(newDir, 'index.js');
    if (!fs.existsSync(indexPath)) {
      const indexContent = `import ${name} from './${name}';\nexport default ${name};`;
      fs.writeFileSync(indexPath, indexContent);
      console.log(`Created index.js: ${indexPath}`);
    }
  }
}

// Update imports in the new component files
function updateComponentImports(components) {
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
    { alias: '@stories-utils/', path: 'src/stories/utils/' }
  ];
  
  for (const [name, component] of Object.entries(components)) {
    const type = component.type;
    const componentDir = path.join(componentFolders[type], name);
    
    // Process .jsx file
    const jsxFile = path.join(componentDir, `${name}.jsx`);
    if (fs.existsSync(jsxFile)) {
      // Read file content
      let content = fs.readFileSync(jsxFile, 'utf8');
      
      // Update CSS import if needed
      if (component.files.css) {
        const cssImport = `import './${name}.css';`;
        // Only add CSS import if not already present
        if (!content.includes(cssImport)) {
          // Add CSS import after the last import statement
          const lastImportIndex = content.lastIndexOf('import');
          const lastImportEnd = content.indexOf('\n', lastImportIndex);
          
          if (lastImportIndex !== -1 && lastImportEnd !== -1) {
            content = content.slice(0, lastImportEnd + 1) + 
                     cssImport + '\n' + 
                     content.slice(lastImportEnd + 1);
          } else {
            content = cssImport + '\n' + content;
          }
        }
      }
      
      // Update component imports for other components
      for (const otherComponent in components) {
        if (otherComponent !== name) {
          const otherType = components[otherComponent].type;
          const importRegex = new RegExp(`import.*from\\s+['"]@${otherType}/\\s*${otherComponent}['"]`, 'g');
          
          if (importRegex.test(content)) {
            // Replace import with new path
            content = content.replace(
              importRegex, 
              `import ${otherComponent} from '@${otherType}/${otherComponent}'`
            );
          }
        }
      }
      
      // Write updated content
      fs.writeFileSync(jsxFile, content);
    }
    
    // Process stories file
    const storiesFile = path.join(componentDir, `${name}.stories.jsx`);
    if (fs.existsSync(storiesFile)) {
      // Read file content
      let content = fs.readFileSync(storiesFile, 'utf8');
      
      // Update component import
      const componentImportRegex = new RegExp(`import.*from\\s+['"]@${component.type}/\\s*${name}['"]`, 'g');
      if (componentImportRegex.test(content)) {
        content = content.replace(
          componentImportRegex,
          `import ${name} from './${name}'`
        );
      }
      
      // Write updated content
      fs.writeFileSync(storiesFile, content);
    }
  }
}

// Update vite.config.js with the new path aliases
function updateViteConfig(components) {
  const viteConfigPath = path.join(projectRoot, 'vite.config.js');
  
  if (fs.existsSync(viteConfigPath)) {
    const content = fs.readFileSync(viteConfigPath, 'utf8');
    let updatedContent = content;
    
    // Add new path aliases for component directories
    for (const type of componentTypes) {
      for (const component of Object.keys(components)) {
        if (components[component].type === type) {
          const aliasPattern = `'@${type}/${component}': path.resolve(__dirname, 'src/components/${type}/${component}')`;
          
          // Only add if not already present
          if (!updatedContent.includes(aliasPattern)) {
            // Find where to insert the new alias
            const resolveAliasMarker = "resolve: {";
            const aliasMarker = "alias: {";
            let insertPosition;
            
            if (updatedContent.includes(aliasMarker)) {
              insertPosition = updatedContent.indexOf(aliasMarker) + aliasMarker.length;
              updatedContent = updatedContent.slice(0, insertPosition) + 
                              `\n        ${aliasPattern},` + 
                              updatedContent.slice(insertPosition);
            } else if (updatedContent.includes(resolveAliasMarker)) {
              insertPosition = updatedContent.indexOf(resolveAliasMarker) + resolveAliasMarker.length;
              updatedContent = updatedContent.slice(0, insertPosition) + 
                              `\n      alias: {\n        ${aliasPattern},\n      },` + 
                              updatedContent.slice(insertPosition);
            }
          }
        }
      }
    }
    
    if (updatedContent !== content) {
      fs.writeFileSync(viteConfigPath, updatedContent);
      console.log('Updated vite.config.js with new path aliases');
    }
  }
}

// Update tsconfig.json with the new path aliases
function updateTsConfig(components) {
  const tsConfigPath = path.join(projectRoot, 'tsconfig.json');
  
  if (fs.existsSync(tsConfigPath)) {
    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
    let updated = false;
    
    // Add new path aliases for component directories
    for (const type of componentTypes) {
      for (const component of Object.keys(components)) {
        if (components[component].type === type) {
          const alias = `@${type}/${component}/*`;
          const aliasPath = [`src/components/${type}/${component}/*`];
          
          // Only add if not already present
          if (!tsConfig.compilerOptions.paths[alias]) {
            tsConfig.compilerOptions.paths[alias] = aliasPath;
            updated = true;
          }
        }
      }
    }
    
    if (updated) {
      fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
      console.log('Updated tsconfig.json with new path aliases');
    }
  }
}

// Create a migration guide
function createMigrationGuide(components) {
  const guidePath = path.join(projectRoot, 'docs', 'component-structure-migration.md');
  let guideContent = `# Component Structure Migration Guide\n\n`;
  
  guideContent += `## Overview\n\n`;
  guideContent += `This document provides information about the component structure reorganization.\n\n`;
  guideContent += `The project has been restructured to co-locate related component files (component implementation, stories, CSS, tests) in a single directory.\n\n`;
  
  guideContent += `## New Structure\n\n`;
  guideContent += `Each component now has its own directory with the following structure:\n\n`;
  guideContent += "```\n";
  guideContent += `src/components/[type]/[ComponentName]/
├── [ComponentName].jsx       # Component implementation
├── [ComponentName].css       # Component styles
├── [ComponentName].stories.jsx # Storybook stories
├── [ComponentName].test.jsx  # Component tests
├── index.js                  # Re-exports the component
└── assets/                   # Component-specific assets
`;
  guideContent += "```\n\n";
  
  guideContent += `## Migrated Components\n\n`;
  
  for (const type of componentTypes) {
    const typeComponents = Object.entries(components)
      .filter(([_, comp]) => comp.type === type)
      .map(([name, _]) => name);
    
    if (typeComponents.length > 0) {
      guideContent += `### ${type.charAt(0).toUpperCase() + type.slice(1)}\n\n`;
      
      for (const component of typeComponents) {
        guideContent += `- \`${component}\`\n`;
        guideContent += `  - Previous locations:\n`;
        if (components[component].files.component) {
          guideContent += `    - Component: \`${components[component].files.component}\`\n`;
        }
        if (components[component].files.story) {
          guideContent += `    - Story: \`${components[component].files.story}\`\n`;
        }
        if (components[component].files.test) {
          guideContent += `    - Test: \`${components[component].files.test}\`\n`;
        }
        if (components[component].files.css) {
          guideContent += `    - CSS: \`${components[component].files.css}\`\n`;
        }
        guideContent += `  - New location: \`src/components/${type}/${component}/\`\n\n`;
      }
    }
  }
  
  guideContent += `## Import Update Guide\n\n`;
  guideContent += `The old import paths will continue to work through alias mappings, but to maximize the benefits of the new structure, update your imports to use the new paths.\n\n`;
  
  guideContent += `### Before\n\n`;
  guideContent += "```jsx\n";
  guideContent += `import Button from '@atoms/Button';
import MyComponent from '@components/MyComponent';
`;
  guideContent += "```\n\n";
  
  guideContent += `### After\n\n`;
  guideContent += "```jsx\n";
  guideContent += `import Button from '@atoms/Button';  // Still works, uses index.js re-export
// or for more explicit imports:
import Button from '@atoms/Button/Button';
`;
  guideContent += "```\n\n";
  
  guideContent += `## Benefits\n\n`;
  guideContent += `- **Easier maintenance**: All related files are in one place\n`;
  guideContent += `- **Improved developer experience**: Less context switching between different directories\n`;
  guideContent += `- **Better encapsulation**: Component-specific assets and styles stay with the component\n`;
  guideContent += `- **Simplified refactoring**: Moving or reusing components becomes simpler\n`;
  
  // Create docs directory if needed
  const docsDir = path.join(projectRoot, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  fs.writeFileSync(guidePath, guideContent);
  console.log(`Created migration guide: ${guidePath}`);
}

// Main execution
console.log('Starting component structure reorganization...');

// Get component files
const components = getComponentFiles();
console.log(`Found ${Object.keys(components).length} components`);

// Find related files
findRelatedFiles(components);

// Create component directories
createComponentDirectories(components);

// Move files to new structure
moveFiles(components);

// Update imports in new component files
updateComponentImports(components);

// Update configuration files
updateViteConfig(components);
updateTsConfig(components);

// Create migration guide
createMigrationGuide(components);

console.log('Component structure reorganization complete!');
