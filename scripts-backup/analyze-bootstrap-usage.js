#!/usr/bin/env node

/**
 * Bootstrap Analysis Script for Tailwind Migration
 * 
 * This script analyzes the codebase to identify Bootstrap usage patterns 
 * and generates a report to prioritize migration efforts.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as globModule from 'glob';
const { glob } = globModule;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Track Bootstrap usage
const bootstrapUsage = {
  components: {}, // reactstrap components used
  classes: {},    // Bootstrap classes used 
  cssRules: {}    // CSS using Bootstrap patterns
};

// Analyze JSX files for Bootstrap usage
function analyzeJsxFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const result = { reactstrap: [], bootstrapClasses: [] };
  
  // Check for reactstrap imports
  const reactstrapImport = /import\s*{([^}]*)}\s*from\s*['"]reactstrap['"]/g;
  const matches = [...content.matchAll(reactstrapImport)];
  
  if (matches.length > 0) {
    const components = matches.map(match => 
      match[1].split(',').map(comp => comp.trim())
    ).flat();
    
    result.reactstrap = components;
    
    // Add to global tracking
    components.forEach(comp => {
      if (!bootstrapUsage.components[comp]) {
        bootstrapUsage.components[comp] = [];
      }
      bootstrapUsage.components[comp].push(fileName);
    });
  }
  
  // Look for common Bootstrap classes
  const commonBootstrapClasses = [
    'container', 'row', 'col', 'd-flex', 'justify-content-', 
    'align-items-', 'text-center', 'btn', 'card', 'navbar',
    'section', 'mt-', 'mb-', 'mx-', 'my-', 'p-', 'bg-'
  ];
  
  commonBootstrapClasses.forEach(className => {
    const regex = new RegExp(`(className|class)=["'\`][^"'\`]*${className}[^"'\`]*["'\`]`, 'g');
    const found = content.match(regex);
    
    if (found && found.length > 0) {
      result.bootstrapClasses.push({
        class: className,
        count: found.length
      });
      
      // Add to global tracking
      if (!bootstrapUsage.classes[className]) {
        bootstrapUsage.classes[className] = [];
      }
      bootstrapUsage.classes[className].push(fileName);
    }
  });
  
  return result;
}

// Analyze CSS files for Bootstrap-like patterns
function analyzeCssFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  const patterns = [];
  
  // Common Bootstrap CSS patterns
  const bootstrapPatterns = [
    { name: 'flexbox', pattern: /display:\s*flex/g },
    { name: 'grid', pattern: /display:\s*grid/g },
    { name: 'media-queries', pattern: /@media\s*\(\s*[^)]*\)/g },
    { name: 'bootstrap-spacing', pattern: /(margin|padding)(-(top|right|bottom|left))?:\s*[0-9]+(\.[0-9]+)?(rem|em|px)/g },
    { name: 'design-tokens', pattern: /var\(--[a-zA-Z0-9_-]+\)/g },
    { name: 'bootstrap-colors', pattern: /(background-color|color|border-color):\s*var\(--color-[a-zA-Z0-9_-]+\)/g },
    { name: 'custom-bootstrap', pattern: /\.(btn|card|container|row|col|section|navbar)/g }
  ];
  
  bootstrapPatterns.forEach(({ name, pattern }) => {
    const found = content.match(pattern);
    
    if (found && found.length > 0) {
      patterns.push({
        pattern: name,
        count: found.length,
        examples: found.slice(0, 3) // Show first 3 examples
      });
      
      // Add to global tracking
      if (!bootstrapUsage.cssRules[name]) {
        bootstrapUsage.cssRules[name] = [];
      }
      bootstrapUsage.cssRules[name].push(fileName);
    }
  });
  
  return patterns;
}

// Generate Bootstrap to Tailwind mapping guide
function generateMappingGuide() {
  return {
    components: {
      Container: '<div className="container mx-auto px-4">',
      Row: '<div className="flex flex-wrap -mx-4">',
      Col: '<div className="w-full px-4 md:w-1/2"> (for Col md="6")',
      Button: '<button className="px-4 py-2 bg-primary text-white rounded">',
      Card: '<div className="bg-white rounded-lg shadow-md overflow-hidden">',
      CardBody: '<div className="p-4">',
      CardHeader: '<div className="px-4 py-3 border-b">',
      CardFooter: '<div className="px-4 py-3 border-t">',
      Navbar: '<nav className="bg-white shadow">',
      NavbarBrand: '<div className="font-semibold text-xl">',
    },
    classes: {
      // Layout
      'container': 'container mx-auto px-4',
      'row': 'flex flex-wrap -mx-4',
      'col': 'flex-1 px-4',
      'col-md-6': 'w-full px-4 md:w-1/2',
      'col-lg-4': 'w-full px-4 lg:w-1/3',
      
      // Display & Flex
      'd-flex': 'flex',
      'd-none': 'hidden',
      'd-block': 'block',
      'justify-content-center': 'justify-center',
      'justify-content-between': 'justify-between',
      'align-items-center': 'items-center',
      'flex-column': 'flex-col',
      
      // Spacing
      'mt-0': 'mt-0',
      'mt-1': 'mt-1',
      'mt-2': 'mt-2',
      'mt-3': 'mt-3',
      'mt-4': 'mt-4',
      'mt-5': 'mt-5',
      
      // Text
      'text-center': 'text-center',
      'text-left': 'text-left',
      'text-right': 'text-right',
      
      // Colors
      'text-white': 'text-white',
      'bg-primary': 'bg-primary',
      'bg-secondary': 'bg-secondary',
      
      // Components
      'btn': 'px-4 py-2 inline-flex justify-center items-center rounded',
      'btn-primary': 'bg-primary text-white',
      'btn-secondary': 'bg-secondary text-white',
      'card': 'bg-white rounded-lg shadow-md overflow-hidden',
      'section': 'py-12',
    }
  };
}

// Main function to analyze the project
async function main() {
  // Get all relevant files
  const jsxFiles = glob.sync('src/**/*.jsx');
  const cssFiles = glob.sync('src/**/*.css');
  
  console.log(`Analyzing ${jsxFiles.length} JSX files and ${cssFiles.length} CSS files...`);
  
  // Analyze JSX files
  const jsxResults = {};
  jsxFiles.forEach(file => {
    const result = analyzeJsxFile(file);
    if (result.reactstrap.length > 0 || result.bootstrapClasses.length > 0) {
      jsxResults[file] = result;
    }
  });
  
  // Analyze CSS files
  const cssResults = {};
  cssFiles.forEach(file => {
    const result = analyzeCssFile(file);
    if (result.length > 0) {
      cssResults[file] = result;
    }
  });
  
  // Generate mapping guide
  const mappingGuide = generateMappingGuide();
  
  // Generate report
  const report = {
    summary: {
      reactstrapComponents: Object.keys(bootstrapUsage.components).length,
      bootstrapClasses: Object.keys(bootstrapUsage.classes).length,
      cssPatterns: Object.keys(bootstrapUsage.cssRules).length
    },
    detail: {
      components: bootstrapUsage.components,
      classes: bootstrapUsage.classes,
      cssRules: bootstrapUsage.cssRules
    },
    jsxFiles: jsxResults,
    cssFiles: cssResults,
    migrationPriority: {
      components: Object.entries(bootstrapUsage.components)
        .sort((a, b) => b[1].length - a[1].length)
        .map(([comp, files]) => ({ component: comp, usageCount: files.length })),
      classes: Object.entries(bootstrapUsage.classes)
        .sort((a, b) => b[1].length - a[1].length)
        .map(([cls, files]) => ({ class: cls, usageCount: files.length }))
    },
    mappingGuide
  };
  
  // Write the report to a file
  fs.writeFileSync(
    'bootstrap-analysis.json',
    JSON.stringify(report, null, 2)
  );
  
  // Create a markdown migration guide
  const mdGuide = `# Bootstrap to Tailwind Migration Guide

## Reactstrap Component Replacements

${Object.entries(mappingGuide.components)
  .map(([component, replacement]) => `### ${component}\n\`\`\`jsx\n${replacement}\n\`\`\``)
  .join('\n\n')}

## Bootstrap Class Mappings

| Bootstrap Class | Tailwind Equivalent |
|----------------|---------------------|
${Object.entries(mappingGuide.classes)
  .map(([bsClass, twClass]) => `| \`${bsClass}\` | \`${twClass}\` |`)
  .join('\n')}

## Migration Steps

1. Replace reactstrap component imports with native HTML elements
2. Replace Bootstrap classes with their Tailwind equivalents
3. Use Tailwind's \`@apply\` directive in CSS files to maintain consistent styling
4. Test thoroughly after each component migration
`;

  fs.writeFileSync('tailwind-migration-guide.md', mdGuide);
  
  // Print summary to console
  console.log('\n=== BOOTSTRAP USAGE ANALYSIS ===\n');
  console.log(`Found ${report.summary.reactstrapComponents} reactstrap components`);
  console.log(`Found ${report.summary.bootstrapClasses} Bootstrap classes`);
  console.log(`Found ${report.summary.cssPatterns} Bootstrap CSS patterns\n`);
  
  console.log('Top reactstrap components to replace:');
  report.migrationPriority.components.slice(0, 5).forEach(item => {
    console.log(`- ${item.component}: ${item.usageCount} instances`);
  });
  
  console.log('\nTop Bootstrap classes to replace:');
  report.migrationPriority.classes.slice(0, 5).forEach(item => {
    console.log(`- ${item.class}: ${item.usageCount} instances`);
  });
  
  console.log('\nFull analysis saved to bootstrap-analysis.json');
  console.log('Migration guide saved to tailwind-migration-guide.md');
  console.log('\nUse this report to prioritize components for migration.');
}

main().catch(console.error);
