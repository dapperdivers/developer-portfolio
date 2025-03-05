#!/usr/bin/env node

/**
 * Simple Component Migration Script for Bootstrap to Tailwind
 * 
 * This script handles the targeted migration of a single component.
 * It's designed to be simple and reliable, avoiding complex regex patterns.
 */

import fs from 'fs';
import path from 'path';

// Component to process
const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide a file path as the first argument');
  process.exit(1);
}

// Whether to apply changes or just show them
const dryRun = process.argv.includes('--dry-run');

console.log(`Processing ${filePath} (${dryRun ? 'dry run' : 'apply changes'})`);

// Backup the file before modifying
function backupFile(file) {
  const backupPath = `${file}.backup`;
  if (!dryRun) {
    fs.copyFileSync(file, backupPath);
    console.log(`Created backup at ${backupPath}`);
  }
  return backupPath;
}

// Read the file
let content;
try {
  content = fs.readFileSync(filePath, 'utf8');
} catch (error) {
  console.error(`Error reading file: ${error.message}`);
  process.exit(1);
}

// Store original content to detect changes
const originalContent = content;

// 1. Replace reactstrap imports
const reactstrapComponentsRegex = /import\s*{([^}]*)}\s*from\s*['"]reactstrap['"];?/g;
const reactstrapMatches = [...content.matchAll(reactstrapComponentsRegex)];

if (reactstrapMatches.length > 0) {
  console.log('Found reactstrap imports:');
  
  for (const match of reactstrapMatches) {
    const importStatement = match[0];
    const components = match[1].split(',').map(c => c.trim());
    
    console.log(`  ${components.join(', ')}`);
    
    // Remove the import statement
    content = content.replace(importStatement, '');
  }
}

// 2. Replace reactstrap components
const componentMappings = {
  Container: '<div className="container mx-auto px-4">',
  Row: '<div className="flex flex-wrap -mx-4">',
  Col: '<div className="w-full px-4 md:w-1/2">', // Default Col is md="6"
  Button: '<button className="px-4 py-2 bg-primary text-white rounded">',
  Card: '<div className="bg-white rounded-lg shadow-md overflow-hidden">',
  CardBody: '<div className="p-4">',
  CardHeader: '<div className="px-4 py-3 border-b">',
  CardFooter: '<div className="px-4 py-3 border-t">'
};

// Container component
content = content.replace(/<Container([^>]*)>([\s\S]*?)<\/Container>/g, (match, props, children) => {
  // Extract className if present
  const classNameMatch = props.match(/className=["']([^"']*)["']/);
  const className = classNameMatch ? classNameMatch[1] : '';
  
  console.log('  Replacing Container component');
  return `<div className="container mx-auto px-4 ${className}">${children}</div>`;
});

// Row component
content = content.replace(/<Row([^>]*)>([\s\S]*?)<\/Row>/g, (match, props, children) => {
  // Extract className if present
  const classNameMatch = props.match(/className=["']([^"']*)["']/);
  const className = classNameMatch ? classNameMatch[1] : '';
  
  console.log('  Replacing Row component');
  return `<div className="flex flex-wrap -mx-4 ${className}">${children}</div>`;
});

// Col component
content = content.replace(/<Col([^>]*)>([\s\S]*?)<\/Col>/g, (match, props, children) => {
  // Extract className if present
  const classNameMatch = props.match(/className=["']([^"']*)["']/);
  const className = classNameMatch ? classNameMatch[1] : '';
  
  // Handle responsive breakpoints
  let widthClasses = 'w-full px-4 ';
  
  // Handle col-{size} props
  const lgMatch = props.match(/lg=["'](\d+)["']/);
  if (lgMatch) {
    const cols = parseInt(lgMatch[1]);
    const width = cols === 12 ? 'full' : `${cols}/12`;
    widthClasses += `lg:w-${width} `;
  }
  
  const mdMatch = props.match(/md=["'](\d+)["']/);
  if (mdMatch) {
    const cols = parseInt(mdMatch[1]);
    const width = cols === 12 ? 'full' : `${cols}/12`;
    widthClasses += `md:w-${width} `;
  }
  
  const smMatch = props.match(/sm=["'](\d+)["']/);
  if (smMatch) {
    const cols = parseInt(smMatch[1]);
    const width = cols === 12 ? 'full' : `${cols}/12`;
    widthClasses += `sm:w-${width} `;
  }
  
  console.log('  Replacing Col component');
  return `<div className="${widthClasses}${className}">${children}</div>`;
});

// Bootstrap class mappings
const bootstrapClassMappings = {
  // Layout
  'container': 'container mx-auto px-4',
  'row': 'flex flex-wrap -mx-4',
  'd-flex': 'flex',
  'justify-content-center': 'justify-center',
  'justify-content-between': 'justify-between',
  'align-items-center': 'items-center',
  'flex-column': 'flex-col',
  'position-relative': 'relative',
  'position-absolute': 'absolute',
  'position-fixed': 'fixed',
  
  // Spacing
  'mt-0': 'mt-0',
  'mb-4': 'mb-4',
  'p-4': 'p-4',
  'py-lg-md': 'py-12',
  'px-0': 'px-0',
  'py-0': 'py-0',
  'pb-250': 'pb-64',
  'py-1': 'py-1',
  'py-2': 'py-2',
  'py-3': 'py-3',
  'py-4': 'py-4',
  'py-5': 'py-5',
  'px-1': 'px-1',
  'px-2': 'px-2',
  'px-3': 'px-3',
  'px-4': 'px-4',
  'px-5': 'px-5',
  'pt-1': 'pt-1',
  'pt-2': 'pt-2',
  'pt-3': 'pt-3',
  'pt-4': 'pt-4',
  'pt-5': 'pt-5',
  'pb-1': 'pb-1',
  'pb-2': 'pb-2',
  'pb-3': 'pb-3',
  'pb-4': 'pb-4',
  'pb-5': 'pb-5',
  
  // Text
  'text-center': 'text-center',
  'text-left': 'text-left',
  'text-right': 'text-right',
  'text-white': 'text-white',
  'text-dark': 'text-gray-900',
  'text-muted': 'text-gray-600',
  'font-weight-bold': 'font-bold',
  'font-weight-normal': 'font-normal',
  'display-1': 'text-7xl font-bold',
  'display-2': 'text-6xl font-bold',
  'display-3': 'text-5xl font-bold',
  'display-4': 'text-4xl font-bold',
  'lead': 'text-xl',
  
  // Components
  'btn': 'px-4 py-2 rounded inline-flex items-center justify-center',
  'btn-primary': 'bg-primary text-white',
  'btn-secondary': 'bg-gray-500 text-white',
  'btn-light': 'bg-white text-gray-800',
  'btn-dark': 'bg-gray-900 text-white',
  'btn-sm': 'px-2 py-1 text-sm',
  'btn-lg': 'px-5 py-3 text-lg',
  'card': 'bg-white rounded-lg shadow-md overflow-hidden',
  'section': 'py-12',
  
  // Backgrounds & Colors
  'bg-primary': 'bg-primary',
  'bg-secondary': 'bg-gray-500',
  'bg-dark': 'bg-gray-900',
  'bg-light': 'bg-gray-100',
  'bg-white': 'bg-white',
  'bg-gradient-info': 'bg-gradient-to-r from-blue-400 to-blue-600',
  'fill-white': 'fill-white'
};

// Write changes if content was modified
if (content !== originalContent) {
  console.log('Changes detected');
  
  if (!dryRun) {
    backupFile(filePath);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${filePath}`);
  } else {
    console.log(`Would update ${filePath} (dry run)`);
    
    // Show a diff of changes
    console.log('\nChanges:');
    const diff = content.split('\n')
      .filter((line, i) => line !== originalContent.split('\n')[i])
      .slice(0, 10); // Show first 10 different lines
    
    if (diff.length > 0) {
      console.log(diff.join('\n'));
      if (diff.length === 10) {
        console.log('... (more changes not shown)');
      }
    }
  }
} else {
  console.log('No changes needed');
}

console.log('\nMigration completed!');
