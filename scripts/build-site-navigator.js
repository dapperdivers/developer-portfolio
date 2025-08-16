/**
 * Build script for the Site Navigator Web Component
 * 
 * This script creates a standalone JavaScript file that can be included
 * in any of the three sites (main, storybook, docs) to provide cross-site navigation.
 * Supports environment variable injection for dynamic URL configuration.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCE_FILE = path.join(ROOT_DIR, 'src/components/shared/SiteNavigator.js');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'site-navigator.js');

/**
 * Generate environment configuration injection code
 */
function generateEnvInjection() {
  const config = {
    sites: {
      main: {
        name: 'Portfolio',
        icon: '🏠',
        url: process.env.VITE_SITE_MAIN_URL || null,
        description: 'Main Portfolio Site',
        shortName: 'HOME'
      },
      storybook: {
        name: 'Components',
        icon: '📚',
        url: process.env.VITE_SITE_STORYBOOK_URL || null,
        description: 'Component Library',
        shortName: 'COMP'
      },
      docs: {
        name: 'Documentation',
        icon: '📋',
        url: process.env.VITE_SITE_DOCS_URL || null,
        description: 'Technical Documentation',
        shortName: 'DOCS'
      }
    },
    enabled: process.env.VITE_SITE_NAVIGATOR_ENABLED !== 'false'
  };

  // Filter out null URLs to use defaults
  Object.keys(config.sites).forEach(key => {
    if (!config.sites[key].url) {
      delete config.sites[key].url;
    }
  });

  return `
  // Environment Configuration Injection
  if (typeof window !== 'undefined') {
    window.__SITE_NAVIGATOR_CONFIG__ = ${JSON.stringify(config, null, 2)};
  }
`;
}

/**
 * Build the standalone site navigator component
 */
async function buildSiteNavigator() {
  try {
    console.log('🚀 Building Site Navigator component...');
    
    // Log environment variables being used
    const envVars = [
      'VITE_SITE_MAIN_URL',
      'VITE_SITE_STORYBOOK_URL', 
      'VITE_SITE_DOCS_URL',
      'VITE_SITE_NAVIGATOR_ENABLED'
    ];
    
    console.log('📊 Environment variables:');
    envVars.forEach(varName => {
      const value = process.env[varName];
      console.log(`   ${varName}: ${value || '(using default)'}`);
    });
    
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // Read the source file
    const sourceContent = fs.readFileSync(SOURCE_FILE, 'utf8');
    
    // Generate environment injection code
    const envInjection = generateEnvInjection();
    
    // Create the standalone version with IIFE wrapper for better compatibility
    const standaloneContent = `
/**
 * Site Navigator Web Component - Standalone Version
 * Generated on: ${new Date().toISOString()}
 * 
 * Cross-site navigation component for Derek Mackley's Portfolio
 * Works across Main Site, Storybook, and Documentation sites
 * 
 * Environment Configuration:
 * - VITE_SITE_MAIN_URL: ${process.env.VITE_SITE_MAIN_URL || '(default)'}
 * - VITE_SITE_STORYBOOK_URL: ${process.env.VITE_SITE_STORYBOOK_URL || '(default)'}
 * - VITE_SITE_DOCS_URL: ${process.env.VITE_SITE_DOCS_URL || '(default)'}
 * - VITE_SITE_NAVIGATOR_ENABLED: ${process.env.VITE_SITE_NAVIGATOR_ENABLED || 'true'}
 */

(function() {
  'use strict';
  
  ${envInjection}
  
  ${sourceContent}
  
  // Auto-initialize with configuration detection
  if (typeof window !== 'undefined') {
    console.log('🎯 Site Navigator loaded and ready');
    
    // Log configuration being used
    if (window.__SITE_NAVIGATOR_CONFIG__) {
      console.log('📊 Site Navigator Configuration:', window.__SITE_NAVIGATOR_CONFIG__);
    }
  }
})();
`;
    
    // Write the standalone file
    fs.writeFileSync(OUTPUT_FILE, standaloneContent);
    
    // Also copy to static build directories for distribution
    const additionalPaths = [
      path.join(ROOT_DIR, 'build/site-navigator.js'),
      path.join(ROOT_DIR, 'storybook-static/site-navigator.js'),
      path.join(ROOT_DIR, 'docs/_site/assets/js/site-navigator.js')
    ];
    
    additionalPaths.forEach(targetPath => {
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      try {
        fs.writeFileSync(targetPath, standaloneContent);
        console.log(`✅ Created: ${path.relative(ROOT_DIR, targetPath)}`);
      } catch (error) {
        console.log(`⚠️  Could not create: ${path.relative(ROOT_DIR, targetPath)} (${error.message})`);
      }
    });
    
    // Generate integration instructions
    const integrationInstructions = generateIntegrationInstructions();
    const instructionsFile = path.join(OUTPUT_DIR, 'site-navigator-integration.md');
    fs.writeFileSync(instructionsFile, integrationInstructions);
    
    console.log('✨ Site Navigator build complete!');
    console.log(`📦 Main file: ${path.relative(ROOT_DIR, OUTPUT_FILE)}`);
    console.log(`📋 Instructions: ${path.relative(ROOT_DIR, instructionsFile)}`);
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

/**
 * Generate integration instructions for each site
 */
function generateIntegrationInstructions() {
  return `# Site Navigator Integration Guide

## Overview
The Site Navigator is a cross-platform web component that provides navigation between:
- Main Portfolio Site
- Storybook Component Library  
- Technical Documentation

## Integration Instructions

### 1. Main React App
Add to your main HTML template or App component:

\`\`\`html
<!-- In public/index.html or via React -->
<script src="/site-navigator.js"></script>
<site-navigator></site-navigator>
\`\`\`

### 2. Storybook
Add to \`.storybook/preview.tsx\`:

\`\`\`typescript
// Add the script import
import '../public/site-navigator.js';

// In preview decorators or parameters
export const decorators = [
  (Story) => {
    useEffect(() => {
      if (!document.querySelector('site-navigator')) {
        const navigator = document.createElement('site-navigator');
        document.body.appendChild(navigator);
      }
    }, []);
    
    return <Story />;
  },
];
\`\`\`

### 3. Jekyll Documentation Site
Add to \`_layouts/default.html\`:

\`\`\`html
<!-- In the <head> section -->
<script src="{{ '/assets/js/site-navigator.js' | relative_url }}" defer></script>

<!-- The component will auto-initialize -->
\`\`\`

## Configuration

### URL Configuration
The component auto-detects the environment and configures URLs accordingly:

- **Development**: Uses localhost with different ports
- **Production**: Adjust the \`getSiteConfiguration()\` method for your deployment URLs

### Customization
You can customize the component by:

1. Modifying the CSS custom properties in the shadow DOM
2. Updating the site configuration in \`getSiteConfiguration()\`
3. Adjusting the detection logic in \`detectCurrentSite()\`

## Deployment Notes

### Production URLs
Update the production URLs in the component based on your deployment:

\`\`\`javascript
// Example production configuration
main: { url: 'https://derekmackley.com' },
storybook: { url: 'https://storybook.derekmackley.com' },
docs: { url: 'https://docs.derekmackley.com' }
\`\`\`

### Build Integration
Add the build script to your CI/CD pipeline:

\`\`\`bash
npm run build:site-navigator
\`\`\`

## Browser Support
- Modern browsers with Web Components support
- Fallback handling for older browsers
- Progressive enhancement approach

## Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatible

Generated on: ${new Date().toISOString()}
`;
}

// Run the build if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildSiteNavigator();
}

export default buildSiteNavigator;