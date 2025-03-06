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
  CardFooter: '<div className="px-4 py-3 border-t">',
  Badge: '<span className="badge badge-primary">',
  Navbar: '<nav className="navbar-main">',
  NavbarBrand: '<div className="navbar-brand">',
  NavbarToggler: '<button className="navbar-toggler">',
  NavbarText: '<span>',
  Nav: '<div className="nav">',
  NavItem: '<div className="nav-item">',
  NavLink: '<a className="nav-link">'
};

// Container component
content = content.replace(/<Container([^>]*)>([\s\S]*?)<\/Container>/g, (match, props, children) => {
  // Extract className if present
  const classNameMatch = props.match(/className=["']([^"']*)["']/);
  const className = classNameMatch ? classNameMatch[1] : '';
  
  console.log('  Replacing Container component');
  return `<div className="container mx-auto px-4${className ? ' ' + className : ''}">${children}</div>`;
});

// Navbar component
content = content.replace(/<Navbar([^>]*)>([\s\S]*?)<\/Navbar>/g, (match, props, children) => {
  // Extract props
  const classNameMatch = props.match(/className=["']([^"']*)["']/);
  const className = classNameMatch ? classNameMatch[1] : '';
  
  const expandMatch = props.match(/expand=["']([^"']*)["']/);
  const expand = expandMatch ? expandMatch[1] : '';
  
  const roleMatch = props.match(/role=["']([^"']*)["']/);
  const role = roleMatch ? `role="${roleMatch[1]}"` : '';
  
  // Build Tailwind classes
  let expandClass = '';
  if (expand === 'sm') expandClass = 'sm:flex';
  else if (expand === 'md') expandClass = 'md:flex';
  else if (expand === 'lg') expandClass = 'lg:flex';
  else if (expand === 'xl') expandClass = 'xl:flex';
  
  // Collect other props
  const otherProps = props
    .replace(/\sclassName=["'][^"']*["']/, '')
    .replace(/\sexpand=["'][^"']*["']/, '')
    .replace(/\srole=["'][^"']*["']/, '');
  
  console.log('  Replacing Navbar component');
  return `<nav className="navbar-main ${className} ${expandClass}"${role}${otherProps}>${children}</nav>`;
});

// NavbarBrand component
content = content.replace(/<NavbarBrand([^>]*)>([\s\S]*?)<\/NavbarBrand>/g, (match, props, children) => {
  // Extract className if present
  const classNameMatch = props.match(/className=["']([^"']*)["']/);
  const className = classNameMatch ? classNameMatch[1] : '';
  
  // Collect other props
  const otherProps = props
    .replace(/\sclassName=["'][^"']*["']/, '');
  
  console.log('  Replacing NavbarBrand component');
  return `<div className="navbar-brand${className ? ' ' + className : ''}"${otherProps}>${children}</div>`;
});

// Row component
content = content.replace(/<Row([^>]*)>([\s\S]*?)<\/Row>/g, (match, props, children) => {
  // Extract className if present
  const classNameMatch = props.match(/className=["']([^"']*)["']/);
  const className = classNameMatch ? classNameMatch[1] : '';
  
  console.log('  Replacing Row component');
  return `<div className="flex flex-wrap -mx-4${className ? ' ' + className : ''}">${children}</div>`;
});

// Col component
content = content.replace(/<Col([^>]*)>([\s\S]*?)<\/Col>/g, (match, props, children) => {
  // Extract className if present
  const classNameMatch = props.match(/className=["']([^"']*)["']/);
  const className = classNameMatch ? classNameMatch[1] : '';
  
  // Handle responsive breakpoints
  let widthClasses = 'w-full px-4';
  
  // Handle col-{size} props
  const lgMatch = props.match(/lg=["'](\d+)["']/);
  if (lgMatch) {
    const cols = parseInt(lgMatch[1]);
    const width = cols === 12 ? 'full' : `${cols}/12`;
    widthClasses += ` lg:w-${width}`;
  }
  
  const mdMatch = props.match(/md=["'](\d+)["']/);
  if (mdMatch) {
    const cols = parseInt(mdMatch[1]);
    const width = cols === 12 ? 'full' : `${cols}/12`;
    widthClasses += ` md:w-${width}`;
  }
  
  const smMatch = props.match(/sm=["'](\d+)["']/);
  if (smMatch) {
    const cols = parseInt(smMatch[1]);
    const width = cols === 12 ? 'full' : `${cols}/12`;
    widthClasses += ` sm:w-${width}`;
  }
  
  console.log('  Replacing Col component');
  return `<div className="${widthClasses}${className ? ' ' + className : ''}">${children}</div>`;
});

// Badge component
content = content.replace(/<Badge([^>]*)>([\s\S]*?)<\/Badge>/g, (match, props, children) => {
  // Extract className and color props if present
  const classNameMatch = props.match(/className=["']([^"']*)["']/);
  const className = classNameMatch ? classNameMatch[1] : '';
  
  const colorMatch = props.match(/color=["']([^"']*)["']/);
  const color = colorMatch ? colorMatch[1] : 'primary'; // default to primary
  
  const badgeClass = `badge badge-${color}${className ? ' ' + className : ''}`;
  
  // Copy other props
  const otherProps = props
    .replace(/\scolor=["'][^"']*["']/, '') // Remove color prop
    .replace(/\sclassName=["'][^"']*["']/, ''); // Remove className prop
  
  console.log('  Replacing Badge component');
  return `<span className="${badgeClass}"${otherProps}>${children}</span>`;
});

// 3. Replace common Bootstrap classes with Tailwind equivalents
function replaceBootstrapClasses() {
  // First, handle the "main" class name replacements 
  // but skip component subclass names and classes that are part of other words
  
  // Special components and subcomponents that need careful handling (to avoid replacing partial matches)
  const componentSubclasses = [
    'card-header', 'card-body', 'card-footer', 'card-title', 'card-subtitle',
    'social-links', 'social-link-button', 'social-icon',
    'badge-primary', 'badge-secondary', 'badge-success', 'badge-danger', 'badge-warning', 'badge-info',
    'loading-container', 'loading-spinner', 'visually-hidden',
    'header-global', 'header-hidden', 'navbar-main', 'navbar-brand', 'navbar-toggler', 'navbar-collapse',
    'nav-link', 'nav-item', 'nav-link-icon',
    'experience-card', 'experience-card-header', 'company-logo-container', 'company-logo',
    'company-name', 'job-title', 'date-range', 'description',
    'feedback-card', 'rating', 'star', 'quote-container', 'quote-icon', 'quote-icon-left',
    'quote-icon-right', 'quote-content', 'author-container', 'author-image', 'author-info',
    'author-name', 'author-role',
    'project-card', 'project-image-container', 'project-image', 'project-image-overlay',
    'project-title', 'project-description', 'tech-stack', 'tech-tag', 'project-links',
    'project-button', 'github-button', 'demo-button',
    'skip-to-content',
    'project-card-skeleton', 'experience-card-skeleton', 'skill-card-skeleton',
    'skeleton-image', 'skeleton-content', 'skeleton-title', 'skeleton-description',
    'skeleton-tags', 'skeleton-actions', 'skeleton-shimmer', 'skeleton-header',
    'skeleton-image-circle', 'skeleton-subtitle', 'skeleton-icon', 'skeleton-name',
    'skeleton-gradient', 'skeleton-wrapper', 'skeleton-staggered',
    'hero-section', 'shape', 'shape-style-1', 'separator', 'separator-bottom',
    'separator-skew', 'resume-download-btn', 'hero-action-container', 'lottie-container',
    'bg-gradient-info', 'display-3', 'lead', 'btn-icon-left', 'fill-white',
    'proficiency-section', 'progress-info', 'progress-label', 'progress-percentage',
    'progress', 'progress-bar', 'progress-bar-primary', 'progress-bar-accent',
    'progress-bar-info', 'proficiency-animation', 'h1', 'tailwind-progress',
    'tailwind-progress-bar', 'tailwind-progress-info', 'tailwind-progress-primary',
    'tailwind-progress-success', 'tailwind-progress-warning', 'tailwind-progress-danger',
    'experience-section', 'experience-grid', 'experience-timeline', 'timeline-entry',
    'timeline-date', 'experience-grid-loading', 'experience-empty-state', 'view-controls',
    'view-toggle', 'view-icon', 'timeline-animate-in', 'visible', 'layout-timeline',
    'layout-grid', 'projects-section', 'projects-grid', 'projects-grid-loading',
    'projects-empty-state', 'contact-section', 'contact-card', 'contact-card-inner',
    'profile-image-container', 'profile-image', 'profile-title', 'profile-subtitle',
    'profile-bio', 'location-badge', 'location-icon', 'location-text',
    'contact-social-links', 'github-fallback', 'fallback-image', 'fallback-title',
    'fallback-message', 'refresh-button', 'bg-gradient-accent',
    'feedbacks-section', 'feedbacks-title-container', 'feedbacks-icon',
    'feedbacks-title', 'feedbacks-grid', 'carousel-container', 'carousel-controls',
    'carousel-control', 'carousel-indicators', 'carousel-indicator', 'active'
  ];
  
  // Classes that commonly appear as part of other words or custom classes
  const dangerousClassNames = [
    'card', 'row', 'badge', 'container', 'section'
  ];
  
  for (const [bsClass, twClass] of Object.entries(bootstrapClassMappings)) {
    // Skip component subclasses
    if (componentSubclasses.includes(bsClass)) continue;
    
    // For dangerous class names, be extra cautious and only match when surrounded by spaces or at start/end
    if (dangerousClassNames.includes(bsClass)) {
      const safeRegex = new RegExp(`(className=["'])([^"']*)\\s${bsClass}\\s([^"']*)["']`, 'g');
      content = content.replace(safeRegex, (match, prefix, before, after) => {
        console.log(`  Safely replacing class "${bsClass}" with "${twClass}"`);
        return `${prefix}${before} ${twClass} ${after}"`;
      });
      
      // Match at start of className
      const startRegex = new RegExp(`(className=["'])\\s*${bsClass}\\s([^"']*)["']`, 'g');
      content = content.replace(startRegex, (match, prefix, after) => {
        console.log(`  Safely replacing class "${bsClass}" at start with "${twClass}"`);
        return `${prefix}${twClass} ${after}"`;
      });
      
      // Match at end of className
      const endRegex = new RegExp(`(className=["'][^"']*)\\s${bsClass}\\s*["']`, 'g');
      content = content.replace(endRegex, (match, prefix) => {
        console.log(`  Safely replacing class "${bsClass}" at end with "${twClass}"`);
        return `${prefix} ${twClass}"`;
      });
      
      // Match as only class
      const onlyRegex = new RegExp(`(className=["'])\\s*${bsClass}\\s*["']`, 'g');
      content = content.replace(onlyRegex, (match, prefix) => {
        console.log(`  Replacing class "${bsClass}" as only class with "${twClass}"`);
        return `${prefix}${twClass}"`;
      });
    } else {
      // For safe class names, use simpler regex
      const regex = new RegExp(`(className=["'])([^"']*)(\\b${bsClass}\\b)([^"']*)["']`, 'g');
      content = content.replace(regex, (match, prefix, before, target, after) => {
        console.log(`  Replacing class "${bsClass}" with "${twClass}"`);
        return `${prefix}${before}${twClass}${after}"`;
      });
    }
  }
  
  // Handle responsive utility classes (e.g., mb-lg-0, text-md-center)
  const responsiveUtilityRegex = /(className=["'][^"']*)(mb|mt|mx|my|p|px|py|pt|pb|text|d)-(xs|sm|md|lg|xl)-([a-z0-9-]+)([^"']*)["']/g;
  content = content.replace(responsiveUtilityRegex, (match, prefix, utility, breakpoint, value, suffix) => {
    const tailwindBreakpoint = breakpointMap[breakpoint] || breakpoint;
    const tailwindUtility = utilityMap[utility] || utility;
    const tailwindValue = valueMap[utility][value] || value;
    
    const originalClass = `${utility}-${breakpoint}-${value}`;
    const tailwindClass = `${tailwindBreakpoint}:${tailwindUtility}-${tailwindValue}`;
    
    console.log(`  Converting responsive utility: ${originalClass} → ${tailwindClass}`);
    return `${prefix}${tailwindClass}${suffix}"`;
  });
}

// Mapping Bootstrap breakpoints to Tailwind breakpoints
const breakpointMap = {
  xs: '',      // No prefix for default styles in Tailwind
  sm: 'sm',    // sm: 576px in Bootstrap, 640px in Tailwind
  md: 'md',    // md: 768px in Bootstrap, 768px in Tailwind
  lg: 'lg',    // lg: 992px in Bootstrap, 1024px in Tailwind
  xl: 'xl',    // xl: 1200px in Bootstrap, 1280px in Tailwind
};

// Mapping Bootstrap utility prefixes to Tailwind utility prefixes
const utilityMap = {
  m: 'm',      // margin
  mt: 'mt',    // margin-top
  mb: 'mb',    // margin-bottom
  ml: 'ml',    // margin-left
  mr: 'mr',    // margin-right
  mx: 'mx',    // margin-x
  my: 'my',    // margin-y
  p: 'p',      // padding
  pt: 'pt',    // padding-top
  pb: 'pb',    // padding-bottom
  pl: 'pl',    // padding-left
  pr: 'pr',    // padding-right
  px: 'px',    // padding-x
  py: 'py',    // padding-y
  text: 'text', // text alignment
  d: '',       // display
};

// Mapping Bootstrap values to Tailwind values
const valueMap = {
  // Margin/padding values
  m: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', auto: 'auto' },
  mt: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', auto: 'auto' },
  mb: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', auto: 'auto' },
  ml: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', auto: 'auto' },
  mr: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', auto: 'auto' },
  mx: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', auto: 'auto' },
  my: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', auto: 'auto' },
  p: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' },
  pt: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' },
  pb: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' },
  pl: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' },
  pr: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' },
  px: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' },
  py: { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' },
  
  // Text alignment
  text: {
    center: 'center',
    left: 'left',
    right: 'right',
    justify: 'justify',
  },
  
  // Display
  d: {
    none: 'hidden',
    inline: 'inline',
    block: 'block',
    flex: 'flex',
    'inline-block': 'inline-block',
    grid: 'grid',
  },
};

// 4. Check for component specific CSS imports and handle them
function handleComponentSpecificImports() {
  // Common component CSS imports to handle
  const cssImportPatterns = [
    { 
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/ui\/social-links\.css['"];?/g,
      component: 'SocialLinks',
      message: 'Removing SocialLinks CSS import (classes are now in Tailwind)'
    },
    { 
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/ui\/card\.css['"];?/g,
      component: 'Card',
      message: 'Removing Card CSS import (classes are now in Tailwind)'
    },
    { 
      pattern: /import\s+['"]\.\/Card\.css['"];?/g,
      component: 'Card',
      message: 'Removing Card CSS import (classes are now in Tailwind)'
    },
    { 
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/ui\/display-lottie\.css['"];?/g,
      component: 'DisplayLottie',
      message: 'Removing DisplayLottie CSS import (classes are now in Tailwind)'
    },
    { 
      pattern: /import\s+['"]\.\/DisplayLottie\.css['"];?/g,
      component: 'DisplayLottie',
      message: 'Removing DisplayLottie CSS import (classes are now in Tailwind)'
    },
    { 
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/ui\/education-card\.css['"];?/g,
      component: 'EducationCard',
      message: 'Removing EducationCard CSS import (classes are now in Tailwind)'
    },
    { 
      pattern: /import\s+['"]\.\/EducationCard\.css['"];?/g,
      component: 'EducationCard',
      message: 'Removing EducationCard CSS import (classes are now in Tailwind)'
    },
    { 
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/ui\/experience-card\.css['"];?/g,
      component: 'ExperienceCard',
      message: 'Removing ExperienceCard CSS import (classes are now in Tailwind)'
    },
    { 
      pattern: /import\s+['"]\.\/ExperienceCard\.css['"];?/g,
      component: 'ExperienceCard',
      message: 'Removing ExperienceCard CSS import (classes are now in Tailwind)'
    },
    { 
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/ui\/feedback-card\.css['"];?/g,
      component: 'FeedbackCard',
      message: 'Removing FeedbackCard CSS import (classes are now in Tailwind)'
    },
    { 
      pattern: /import\s+['"]\.\/FeedbackCard\.css['"];?/g,
      component: 'FeedbackCard',
      message: 'Removing FeedbackCard CSS import (classes are now in Tailwind)'
    },
    { 
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/ui\/loading\.css['"];?/g,
      component: 'Loading',
      message: 'Removing Loading CSS import (classes are now in Tailwind)'
    },
    { 
      pattern: /import\s+['"]\.\/Loading\.css['"];?/g,
      component: 'Loading',
      message: 'Removing Loading CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/ui\/loading\.css['"];?/g,
      component: 'Loading',
      message: 'Removing Loading CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/layout\/navigation\.css['"];?/g,
      component: 'Navigation',
      message: 'Removing Navigation CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/ui\/experience-card\.css['"];?/g,
      component: 'ExperienceCard',
      message: 'Removing ExperienceCard CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/ui\/feedback-card\.css['"];?/g,
      component: 'FeedbackCard',
      message: 'Removing FeedbackCard CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\/ProjectsCard\.css['"];?/g,
      component: 'ProjectsCard',
      message: 'Removing ProjectsCard CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/ui\/projects-card\.css['"];?/g,
      component: 'ProjectsCard',
      message: 'Removing ProjectsCard CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\/SkipToContent\.css['"];?/g,
      component: 'SkipToContent',
      message: 'Removing SkipToContent CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/components\/ui\/skip-to-content\.css['"];?/g,
      component: 'SkipToContent',
      message: 'Removing SkipToContent CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/skeleton-loading\.css['"];?/g,
      component: 'SkeletonCard',
      message: 'Removing skeleton loading CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/hero-section\.css['"];?/g,
      component: 'Greetings',
      message: 'Removing hero section CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/proficiency-section\.css['"];?/g,
      component: 'Proficiency',
      message: 'Removing proficiency section CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/experience-section\.css['"];?/g,
      component: 'Experience',
      message: 'Removing experience section CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/projects-section\.css['"];?/g,
      component: 'Projects',
      message: 'Removing projects section CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/contact-section\.css['"];?/g,
      component: 'GithubProfileCard',
      message: 'Removing contact section CSS import (classes are now in Tailwind)'
    },
    {
      pattern: /import\s+['"]\.\.\/assets\/css\/feedbacks-section\.css['"];?/g,
      component: 'Feedbacks',
      message: 'Removing feedbacks section CSS import (classes are now in Tailwind)'
    }
  ];
  
  for (const { pattern, component, message } of cssImportPatterns) {
    const hasImport = pattern.test(content);
    
    if (hasImport) {
      console.log(`  ${message}`);
      content = content.replace(pattern, '');
    }
  }
}

// Bootstrap class mappings
const bootstrapClassMappings = {
  // Layout - Set to empty to avoid duplicate classes since it's handled in component replacement
  'container': '',
  'row': '',
  'badge': 'badge',
  'badge-primary': 'badge-primary',
  'badge-secondary': 'badge-secondary',
  'badge-success': 'badge-success',
  'badge-danger': 'badge-danger',
  'badge-warning': 'badge-warning',
  'badge-info': 'badge-info',
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
  
  // Custom components class mappings
  // Social Links Component
  'social-links': 'flex items-center flex-wrap gap-3',
  'social-link-button': 'flex items-center justify-center w-11 h-11 rounded-full bg-white/95 text-primary border-none transition-all duration-200 ease-in-out no-underline shadow-sm hover:bg-white hover:text-primary-dark hover:translate-y-[-3px] hover:shadow-md focus:outline-none focus:shadow focus:ring-2 focus:ring-primary/50',
  'social-icon': 'w-6 h-6',
  
  // Card Component
  'card': 'relative flex flex-col min-w-0 break-words bg-background rounded-lg overflow-hidden transition-all duration-200',
  'card-bordered': 'border border-solid border-border',
  'card-shadow': 'shadow',
  'card-hoverable': 'hover:transform hover:-translate-y-[5px] hover:shadow-lg',
  'card-header': 'p-card mb-0 bg-background border-b border-solid border-border',
  'card-body': 'flex-auto p-card',
  'card-footer': 'p-card bg-background border-t border-solid border-border',
  'card-title': 'mt-0 mb-2 text-lg font-bold text-text leading-tight',
  'card-subtitle': '-mt-1 mb-2 text-base text-text-muted',
  
  // DisplayLottie Component
  'lottie-container': 'relative w-full h-full min-h-80 overflow-hidden',
  'animation-controls': 'absolute bottom-2 right-2 flex items-center bg-black/60 p-1 px-2 rounded opacity-0 transition-opacity duration-200 z-10',
  'controls-visible': '',
  'animation-control-button': 'bg-primary text-white border-none rounded-full w-10 h-10 mr-2 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-primary-dark focus:outline focus:outline-2 focus:outline-white focus:outline-offset-2',
  'animation-status': 'text-sm text-white ml-1',
  'sr-only': 'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
  
  // Backgrounds & Colors
  'bg-primary': 'bg-primary',
  'bg-secondary': 'bg-gray-500',
  'bg-dark': 'bg-gray-900',
  'bg-light': 'bg-gray-100',
  'bg-white': 'bg-white',
  'bg-gradient-info': 'bg-gradient-to-r from-blue-400 to-blue-600',
  'fill-white': 'fill-white'
};

// Process class name replacements
replaceBootstrapClasses();

// Handle component-specific CSS imports
handleComponentSpecificImports();

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
