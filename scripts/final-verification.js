#!/usr/bin/env node

/**
 * Final Verification Script
 * 
 * This script performs various checks to ensure the portfolio meets all the requirements
 * in the implementation checklist. It verifies:
 * - Design token usage
 * - Key props in mapped elements
 * - ARIA attributes on interactive elements
 * - PropTypes validation on components
 * - Memoization of expensive components
 * - Unused CSS classes
 * 
 * Usage:
 * node scripts/final-verification.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  srcDir: path.join(__dirname, '..', 'src'),
  componentsDir: path.join(__dirname, '..', 'src', 'components'),
  cssDir: path.join(__dirname, '..', 'src', 'assets', 'css'),
  designTokensFile: path.join(__dirname, '..', 'src', 'assets', 'css', 'design-tokens.css')
};

// Result counters
const results = {
  designTokensUsage: { total: 0, withTokens: 0 },
  keyProps: { total: 0, withKeys: 0 },
  ariaAttributes: { total: 0, withAria: 0 },
  propTypesValidation: { total: 0, withPropTypes: 0 },
  memoizedComponents: { total: 0, memoized: 0 }
};

// ANSI color codes for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Print a section header
 */
function printHeader(title) {
  console.log('\n' + colors.cyan + '='.repeat(80) + colors.reset);
  console.log(colors.cyan + ' ' + title + colors.reset);
  console.log(colors.cyan + '='.repeat(80) + colors.reset);
}

/**
 * Print a test result
 */
function printResult(name, passed, total, message = '') {
  const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;
  const status = percentage >= 90 ? '✅ PASS' : percentage >= 70 ? '⚠️ WARNING' : '❌ FAIL';
  const color = percentage >= 90 ? colors.green : percentage >= 70 ? colors.yellow : colors.red;
  
  console.log(
    `${color}${status}${colors.reset} ${name}: ${passed}/${total} (${percentage}%) ${message}`
  );
}

/**
 * Get all files with specific extensions recursively
 */
function getAllFiles(dirPath, extensions, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, extensions, arrayOfFiles);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
}

/**
 * Extract design tokens from CSS variables
 */
function extractDesignTokens() {
  try {
    const content = fs.readFileSync(config.designTokensFile, 'utf8');
    const tokenRegex = /--([a-zA-Z0-9-]+)\s*:/g;
    const tokens = [];
    let match;
    
    while ((match = tokenRegex.exec(content)) !== null) {
      tokens.push(match[1]);
    }
    
    return tokens;
  } catch (error) {
    console.error(`Error reading design tokens: ${error.message}`);
    return [];
  }
}

/**
 * Check CSS files for design token usage
 */
function checkDesignTokensUsage() {
  printHeader('Checking Design Tokens Usage');
  
  const tokens = extractDesignTokens();
  const cssFiles = getAllFiles(config.cssDir, ['.css']);
  
  if (tokens.length === 0) {
    console.log(`${colors.red}No design tokens found in ${config.designTokensFile}${colors.reset}`);
    return;
  }
  
  console.log(`Found ${tokens.length} design tokens`);
  
  cssFiles.forEach(filePath => {
    if (filePath === config.designTokensFile) return; // Skip the design tokens file itself
    
    const content = fs.readFileSync(filePath, 'utf8');
    results.designTokensUsage.total++;
    
    let hasToken = false;
    for (const token of tokens) {
      if (content.includes(`var(--${token})`)) {
        hasToken = true;
        break;
      }
    }
    
    if (hasToken) {
      results.designTokensUsage.withTokens++;
    } else {
      console.log(`${colors.yellow}File without design tokens: ${path.relative(config.srcDir, filePath)}${colors.reset}`);
    }
  });
  
  printResult(
    'CSS files using design tokens',
    results.designTokensUsage.withTokens,
    results.designTokensUsage.total
  );
}

/**
 * Check JSX files for key props in mapped elements
 */
function checkKeyProps() {
  printHeader('Checking Key Props in Mapped Elements');
  
  const jsxFiles = getAllFiles(config.srcDir, ['.jsx', '.js']);
  const mapRegex = /\.map\(\s*\([^)]*\)\s*=>\s*\(/g;
  const keyRegex = /key\s*=\s*\{/;
  
  jsxFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const mapMatches = content.match(mapRegex);
    
    if (mapMatches) {
      results.keyProps.total += mapMatches.length;
      
      // Check each map for key props
      let contentCopy = content;
      let mapMatch;
      let mapCount = 0;
      
      while ((mapMatch = mapRegex.exec(content)) !== null) {
        mapCount++;
        
        // Find the closing parenthesis for this map's JSX
        let startIndex = mapMatch.index + mapMatch[0].length;
        let openParens = 1;
        let closeIndex = startIndex;
        
        for (let i = startIndex; i < content.length; i++) {
          if (content[i] === '(') openParens++;
          if (content[i] === ')') openParens--;
          if (openParens === 0) {
            closeIndex = i;
            break;
          }
        }
        
        const jsxContent = content.substring(startIndex, closeIndex);
        if (keyRegex.test(jsxContent)) {
          results.keyProps.withKeys++;
        } else {
          const relativePath = path.relative(config.srcDir, filePath);
          console.log(`${colors.yellow}Map without key prop at ${relativePath}${colors.reset}`);
        }
      }
    }
  });
  
  printResult(
    'Mapped elements with key props', 
    results.keyProps.withKeys, 
    results.keyProps.total
  );
}

/**
 * Check JSX files for ARIA attributes on interactive elements
 */
function checkAriaAttributes() {
  printHeader('Checking ARIA Attributes on Interactive Elements');
  
  const jsxFiles = getAllFiles(config.componentsDir, ['.jsx', '.js']);
  const interactiveElementsRegex = /<(button|a|input|select|textarea)([^>]*?)>/g;
  const ariaRegex = /(aria-|role=)/;
  
  jsxFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.matchAll(interactiveElementsRegex);
    
    for (const match of matches) {
      results.ariaAttributes.total++;
      const elementAttrs = match[2];
      
      if (ariaRegex.test(elementAttrs)) {
        results.ariaAttributes.withAria++;
      } else {
        const relativePath = path.relative(config.srcDir, filePath);
        console.log(`${colors.yellow}Interactive element without ARIA in ${relativePath}${colors.reset}`);
      }
    }
  });
  
  printResult(
    'Interactive elements with ARIA attributes',
    results.ariaAttributes.withAria, 
    results.ariaAttributes.total
  );
}

/**
 * Check JSX files for PropTypes validation
 */
function checkPropTypesValidation() {
  printHeader('Checking PropTypes Validation');
  
  const jsxFiles = getAllFiles(config.componentsDir, ['.jsx', '.js']);
  const componentRegex = /\s*(function|const)\s+([A-Z][A-Za-z0-9]+)\s*=?\s*\(?/g;
  const propTypesRegex = /([A-Z][A-Za-z0-9]+)\.propTypes\s*=/;
  
  jsxFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const componentMatches = content.matchAll(componentRegex);
    
    for (const match of componentMatches) {
      const componentName = match[2];
      
      // Skip if the name looks like a hook (useXXX)
      if (componentName.startsWith('use')) continue;
      
      results.propTypesValidation.total++;
      
      // Check if propTypes is defined for this component
      const propTypesMatch = new RegExp(`${componentName}\\.propTypes\\s*=`).test(content);
      if (propTypesMatch) {
        results.propTypesValidation.withPropTypes++;
      } else {
        const relativePath = path.relative(config.srcDir, filePath);
        console.log(`${colors.yellow}Component without PropTypes: ${componentName} in ${relativePath}${colors.reset}`);
      }
    }
  });
  
  printResult(
    'Components with PropTypes validation',
    results.propTypesValidation.withPropTypes,
    results.propTypesValidation.total
  );
}

/**
 * Check JSX files for memoized components
 */
function checkMemoization() {
  printHeader('Checking Component Memoization');
  
  const jsxFiles = getAllFiles(config.componentsDir, ['.jsx', '.js']);
  const componentRegex = /\s*(function|const)\s+([A-Z][A-Za-z0-9]+)\s*=?\s*\(?/g;
  const memoRegex = /export default (React\.memo|memo)\(/;
  
  jsxFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const componentMatches = content.matchAll(componentRegex);
    
    for (const match of componentMatches) {
      const componentName = match[2];
      
      // Skip if the name looks like a hook (useXXX) or is a UI component
      if (componentName.startsWith('use')) continue;
      if (filePath.includes('/ui/') && ['Button', 'Card', 'Section'].includes(componentName)) {
        continue; // Base UI components might not need memoization
      }
      
      results.memoizedComponents.total++;
      
      // Check if component is memoized
      if (memoRegex.test(content)) {
        results.memoizedComponents.memoized++;
      } else {
        const relativePath = path.relative(config.srcDir, filePath);
        console.log(`${colors.yellow}Component not memoized: ${componentName} in ${relativePath}${colors.reset}`);
      }
    }
  });
  
  printResult(
    'Memoized components',
    results.memoizedComponents.memoized,
    results.memoizedComponents.total
  );
}

/**
 * Check for unused CSS classes
 */
function checkUnusedCSS() {
  printHeader('Checking for Unused CSS');
  
  try {
    // This is a simplistic check and may have false positives
    const cssFiles = getAllFiles(config.cssDir, ['.css']);
    const jsxFiles = getAllFiles(config.srcDir, ['.jsx', '.js', '.html']);
    
    let allCssContent = '';
    cssFiles.forEach(file => {
      allCssContent += fs.readFileSync(file, 'utf8');
    });
    
    // Extract class selectors
    const classRegex = /\.([a-zA-Z0-9_-]+)(?:\s|\.|,|:|\{)/g;
    const classes = new Set();
    let match;
    
    while ((match = classRegex.exec(allCssContent)) !== null) {
      classes.add(match[1]);
    }
    
    // Check which classes are used in JSX
    let allJsxContent = '';
    jsxFiles.forEach(file => {
      allJsxContent += fs.readFileSync(file, 'utf8');
    });
    
    let unusedCount = 0;
    classes.forEach(className => {
      // Skip utility class naming patterns
      if (/^(mt|mb|mr|ml|pt|pb|pr|pl|m|p|text|bg|border|d|flex|grid|position)-/.test(className)) {
        return;
      }
      
      // Check if class is used in JSX
      const regex = new RegExp(`(className|class)=(["\']|{\`)[^}]*?\\b${className}\\b`, 'i');
      if (!regex.test(allJsxContent)) {
        unusedCount++;
        console.log(`${colors.yellow}Possibly unused CSS class: ${className}${colors.reset}`);
      }
    });
    
    console.log(`\nFound ${unusedCount} potentially unused CSS classes out of ${classes.size} total classes`);
    
  } catch (error) {
    console.error(`Error checking unused CSS: ${error.message}`);
  }
}

/**
 * Run all checks
 */
function runAllChecks() {
  console.log(colors.magenta + '\n🔍 PORTFOLIO FINAL VERIFICATION 🔍\n' + colors.reset);
  
  checkDesignTokensUsage();
  checkKeyProps();
  checkAriaAttributes();
  checkPropTypesValidation();
  checkMemoization();
  checkUnusedCSS();
  
  // Print summary
  printHeader('Summary');
  printResult('CSS files using design tokens', results.designTokensUsage.withTokens, results.designTokensUsage.total);
  printResult('Mapped elements with key props', results.keyProps.withKeys, results.keyProps.total);
  printResult('Interactive elements with ARIA', results.ariaAttributes.withAria, results.ariaAttributes.total);
  printResult('Components with PropTypes', results.propTypesValidation.withPropTypes, results.propTypesValidation.total);
  printResult('Memoized components', results.memoizedComponents.memoized, results.memoizedComponents.total);
  
  console.log('\n' + colors.magenta + '📋 NEXT STEPS 📋' + colors.reset);
  console.log(`
1. ${colors.cyan}Run a Lighthouse audit:${colors.reset}
   npm run build && npx serve -s build
   Then open Chrome DevTools > Lighthouse > Generate report

2. ${colors.cyan}Test with screen readers:${colors.reset}
   - macOS: Use VoiceOver (Command + F5)
   - Windows: Use NVDA or Narrator
   - Browser: Use ChromeVox extension

3. ${colors.cyan}Test responsiveness in different browsers:${colors.reset}
   - Chrome, Firefox, Safari, Edge
   - Test mobile viewports using the browser's device emulation

4. ${colors.cyan}Check for performance issues:${colors.reset}
   - Use React DevTools Profiler
   - Look for unnecessary re-renders
   - Check render times of components
  `);
}

// Run all checks
runAllChecks();
