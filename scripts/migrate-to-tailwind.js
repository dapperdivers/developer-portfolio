#!/usr/bin/env node

/**
 * Bootstrap to Tailwind Migration Script
 * 
 * This script uses the bootstrap-analysis.json to automate the migration
 * from Bootstrap/reactstrap to Tailwind CSS.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DRY_RUN = process.argv.includes('--dry-run');
const SPECIFIC_COMPONENT = process.argv.find(arg => arg.startsWith('--component='))?.split('=')[1];
const SPECIFIC_FILE = process.argv.find(arg => arg.startsWith('--file='))?.split('=')[1];

// Track modified files for changelog
const modifiedFiles = [];
const backupFiles = [];

// Load the analysis JSON
let analysis;
try {
  analysis = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'bootstrap-analysis.json'), 'utf8'));
} catch (error) {
  console.error('Error loading bootstrap-analysis.json:', error.message);
  console.error('Please run scripts/analyze-bootstrap-usage.js first');
  process.exit(1);
}

// Extract mapping guide
const { components, classes } = analysis.mappingGuide;

// Backup a file before modifying it
function backupFile(filePath) {
  const backupPath = `${filePath}.bootstrap-backup`;
  if (!DRY_RUN) {
    fs.copyFileSync(filePath, backupPath);
    backupFiles.push({ original: filePath, backup: backupPath });
  }
  return backupPath;
}

// Process a JSX file to replace reactstrap components and Bootstrap classes
function processJsxFile(filePath) {
  console.log(`Processing ${filePath}`);
  
  // Skip if not the specified file (when using --file flag)
  if (SPECIFIC_FILE && !filePath.includes(SPECIFIC_FILE)) {
    console.log(`Skipping ${filePath} (not matching --file=${SPECIFIC_FILE})`);
    return;
  }
  
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Get file analysis
    const fileAnalysis = analysis.jsxFiles[filePath];
    if (!fileAnalysis) {
      console.warn(`No analysis found for ${filePath}`);
      return;
    }
    
    // Process reactstrap components
    if (fileAnalysis.reactstrap && fileAnalysis.reactstrap.length > 0) {
      // Filter by specific component if specified
      const componentsToProcess = SPECIFIC_COMPONENT 
        ? fileAnalysis.reactstrap.filter(comp => comp === SPECIFIC_COMPONENT)
        : fileAnalysis.reactstrap;
      
      if (componentsToProcess.length > 0) {
        // First remove the reactstrap import
        const importRegex = /import\s*{([^}]*)}\s*from\s*['"]reactstrap['"];?/g;
        let importMatches = [...content.matchAll(importRegex)];
        
        if (importMatches.length > 0) {
          // Remove only the specified components from import
          for (const match of importMatches) {
            const importStatement = match[0];
            const importedComponents = match[1].split(',').map(c => c.trim());
            
            // Filter out components we want to remove
            const remainingComponents = importedComponents.filter(comp => 
              !componentsToProcess.includes(comp)
            );
            
            if (remainingComponents.length === 0) {
              // Remove the entire import statement
              content = content.replace(importStatement, '');
            } else {
              // Replace with import statement containing only remaining components
              const newImport = `import { ${remainingComponents.join(', ')} } from "reactstrap";`;
              content = content.replace(importStatement, newImport);
            }
          }
        }
        
        // Then replace each component with its Tailwind equivalent
        for (const component of componentsToProcess) {
          if (components[component]) {
            console.log(`  Replacing ${component} component with Tailwind equivalent`);
            
            // For Container component
            if (component === 'Container') {
              const regex = /<Container([^>]*)>([\s\S]*?)<\/Container>/g;
              content = content.replace(regex, (match, props, children) => {
                const classMatch = props.match(/className=["']([^"']*)["']/);
                const className = classMatch ? classMatch[1] : '';
                return `<div className="container mx-auto px-4 ${className}">${children}</div>`;
              });
            }
            
            // For Row component
            else if (component === 'Row') {
              const regex = /<Row([^>]*)>([\s\S]*?)<\/Row>/g;
              content = content.replace(regex, (match, props, children) => {
                const classMatch = props.match(/className=["']([^"']*)["']/);
                const className = classMatch ? classMatch[1] : '';
                return `<div className="flex flex-wrap -mx-4 ${className}">${children}</div>`;
              });
            }
            
            // For Col component
            else if (component === 'Col') {
              const regex = /<Col([^>]*)>([\s\S]*?)<\/Col>/g;
              content = content.replace(regex, (match, props, children) => {
                const classMatch = props.match(/className=["']([^"']*)["']/);
                const className = classMatch ? classMatch[1] : '';
                
                // Handle responsive breakpoints
                let widthClasses = 'w-full px-4 ';
                
                // Handle col-{size} props like lg="6"
                const lgMatch = props.match(/lg=["'](\d+)["']/);
                const mdMatch = props.match(/md=["'](\d+)["']/);
                const smMatch = props.match(/sm=["'](\d+)["']/);
                const xlMatch = props.match(/xl=["'](\d+)["']/);
                
                if (lgMatch) {
                  const cols = parseInt(lgMatch[1]);
                  const width = cols === 12 ? 'full' : `${cols}/12`;
                  widthClasses += `lg:w-${width} `;
                }
                
                if (mdMatch) {
                  const cols = parseInt(mdMatch[1]);
                  const width = cols === 12 ? 'full' : `${cols}/12`;
                  widthClasses += `md:w-${width} `;
                }
                
                if (smMatch) {
                  const cols = parseInt(smMatch[1]);
                  const width = cols === 12 ? 'full' : `${cols}/12`;
                  widthClasses += `sm:w-${width} `;
                }
                
                if (xlMatch) {
                  const cols = parseInt(xlMatch[1]);
                  const width = cols === 12 ? 'full' : `${cols}/12`;
                  widthClasses += `xl:w-${width} `;
                }
                
                return `<div className="${widthClasses}${className}">${children}</div>`;
              });
            }
            
            // For other components, apply a simple replacement
            // This is a simplistic approach and may need manual refinement
            else {
              const regex = new RegExp(`<${component}([^>]*)>([\\s\\S]*?)<\\/${component}>`, 'g');
              const replacement = components[component].split('>')[0] + '$1>$2</div>';
              content = content.replace(regex, replacement);
            }
          }
        }
      }
    }
    
    // Process Bootstrap classes
    if (fileAnalysis.bootstrapClasses && fileAnalysis.bootstrapClasses.length > 0) {
      for (const bsClass of fileAnalysis.bootstrapClasses) {
        const className = bsClass.class;
        if (classes[className]) {
          console.log(`  Replacing Bootstrap class "${className}" with Tailwind equivalent`);
          
          // Replace className="..." patterns
          const regex = new RegExp(`(className=["'](?:[^"']*\\s)?)${className}((?:\\s[^"']*)?)["']`, 'g');
          content = content.replace(regex, (match, prefix, suffix) => {
            return `${prefix}${classes[className]}${suffix}"`;
          });
          
          // Replace className={`...`} patterns with Tailwind
          const templatePattern = `(className={\`(?:[^\`]*\\s)?)${className}((?:\\s[^\`]*)?)\\`}`;
          const templateRegex = new RegExp(templatePattern, 'g');
          content = content.replace(templateRegex, (match, prefix, suffix) => {
            return `${prefix}${classes[className]}${suffix}\`}`;
          });
        }
      }
    }
    
    // Write changes if content was modified
    if (content !== originalContent) {
      console.log(`  Changes detected in ${filePath}`);
      modifiedFiles.push(filePath);
      
      if (!DRY_RUN) {
        backupFile(filePath);
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ Updated ${filePath}`);
      } else {
        console.log(`  🔍 Would update ${filePath} (dry run)`);
      }
    } else {
      console.log(`  No changes needed for ${filePath}`);
    }
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error.message);
  }
}

// Process CSS files
function processCssFile(filePath) {
  console.log(`Processing CSS file ${filePath}`);
  
  // Skip if not the specified file (when using --file flag)
  if (SPECIFIC_FILE && !filePath.includes(SPECIFIC_FILE)) {
    console.log(`Skipping ${filePath} (not matching --file=${SPECIFIC_FILE})`);
    return;
  }
  
  // Skip vendor files
  if (filePath.includes('argon-design-system') || 
      filePath.includes('vendor') ||
      filePath.includes('nucleo')) {
    console.log(`  Skipping vendor file ${filePath}`);
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Apply common CSS transformations
    
    // 1. Layout transformations
    content = content.replace(
      /display:\s*flex;\s*align-items:\s*center;\s*justify-content:\s*center;/g,
      '@apply flex items-center justify-center;'
    );
    
    // 2. Spacing transformations
    content = content.replace(
      /margin-bottom:\s*1rem;/g,
      '@apply mb-4;'
    );
    
    content = content.replace(
      /margin-top:\s*1rem;/g,
      '@apply mt-4;'
    );
    
    content = content.replace(
      /padding:\s*1rem;/g,
      '@apply p-4;'
    );
    
    // 3. Color transformations using CSS variables
    content = content.replace(
      /background-color:\s*var\(--color-primary\);/g,
      '@apply bg-primary;'
    );
    
    content = content.replace(
      /color:\s*var\(--color-white\);/g,
      '@apply text-white;'
    );
    
    // Write changes if content was modified
    if (content !== originalContent) {
      console.log(`  Changes detected in ${filePath}`);
      modifiedFiles.push(filePath);
      
      if (!DRY_RUN) {
        backupFile(filePath);
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ Updated ${filePath}`);
      } else {
        console.log(`  🔍 Would update ${filePath} (dry run)`);
      }
    } else {
      console.log(`  No changes needed for ${filePath}`);
    }
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error.message);
  }
}

// Create rollback script
function createRollbackScript() {
  const rollbackScript = `#!/usr/bin/env node
const fs = require('fs');

// List of files to restore
const backupFiles = ${JSON.stringify(backupFiles, null, 2)};

// Restore each file from backup
backupFiles.forEach(({ original, backup }) => {
  console.log(\`Restoring \${original} from \${backup}\`);
  try {
    fs.copyFileSync(backup, original);
    console.log(\`  ✅ Restored \${original}\`);
  } catch (error) {
    console.error(\`  ❌ Error restoring \${original}:\`, error.message);
  }
});

console.log('Rollback completed!');
`;

  fs.writeFileSync('rollback-tailwind-migration.js', rollbackScript);
  console.log('Created rollback script: rollback-tailwind-migration.js');
}

// Generate a migration changelog
function generateChangelog() {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const changelog = `# Tailwind Migration Changelog

Generated: ${new Date().toLocaleString()}

## Modified Files

${modifiedFiles.map(file => `- ${file}`).join('\n')}

## Backup Files

${backupFiles.map(({ original, backup }) => `- ${original} → ${backup}`).join('\n')}

## Migration Details

- Components migrated: ${SPECIFIC_COMPONENT || 'all'}
- Dry run: ${DRY_RUN ? 'yes' : 'no'}
- Specific file: ${SPECIFIC_FILE || 'none'}

To rollback these changes, run:
\`\`\`
node rollback-tailwind-migration.js
\`\`\`
`;

  fs.writeFileSync(`tailwind-migration-${timestamp}.md`, changelog);
  console.log(`Created migration changelog: tailwind-migration-${timestamp}.md`);
}

// Main function
async function main() {
  console.log('Bootstrap to Tailwind Migration');
  console.log('==============================');
  console.log(`Mode: ${DRY_RUN ? 'Dry Run' : 'Apply Changes'}`);
  if (SPECIFIC_COMPONENT) {
    console.log(`Component filter: ${SPECIFIC_COMPONENT}`);
  }
  if (SPECIFIC_FILE) {
    console.log(`File filter: ${SPECIFIC_FILE}`);
  }
  console.log('');
  
  // Process JSX files
  console.log('Processing JSX files...');
  const jsxFiles = Object.keys(analysis.jsxFiles || {});
  for (const filePath of jsxFiles) {
    processJsxFile(filePath);
  }
  
  // Process CSS files
  console.log('\nProcessing CSS files...');
  const cssFiles = Object.keys(analysis.cssFiles || {});
  for (const filePath of cssFiles) {
    processCssFile(filePath);
  }
  
  // Create rollback script if files were modified
  if (!DRY_RUN && backupFiles.length > 0) {
    createRollbackScript();
  }
  
  // Generate changelog
  if (modifiedFiles.length > 0) {
    generateChangelog();
  }
  
  // Summary
  console.log('\nMigration Summary:');
  console.log(`- Files analyzed: ${jsxFiles.length + cssFiles.length}`);
  console.log(`- Files that would be modified: ${modifiedFiles.length}`);
  if (!DRY_RUN) {
    console.log(`- Backup files created: ${backupFiles.length}`);
  }
  
  console.log('\nNext steps:');
  if (DRY_RUN) {
    console.log('- Review the proposed changes');
    console.log('- Run without --dry-run to apply changes');
  } else {
    console.log('- Test the application to verify changes');
    console.log('- Run the script again for other components if needed');
  }
  
  console.log('\nMigration completed!');
}

main().catch(console.error);
