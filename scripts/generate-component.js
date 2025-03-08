#!/usr/bin/env node

/**
 * Component Generator Script
 * This script creates new React components with proper structure and styling
 * following the portfolio's design system and component patterns.
 * 
 * Features:
 * - Creates component JSX files with proper imports and documentation
 * - Generates matching CSS files with design token usage
 * - Sets up proper PropTypes validation
 * - Creates different component types (UI, Layout, Container)
 * - Adds Story file for Storybook documentation
 * 
 * Usage:
 * node scripts/generate-component.js --name=Button --type=ui --dir=src/components/ui
 */

const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');

// Configuration
const config = {
  defaultType: 'ui', // ui, layout, container
  defaultDir: 'src/components',
  designTokensPath: 'src/assets/css/design-system/tokens',
  types: ['ui', 'layout', 'container'],
  createCss: true,
  createStory: true,
  createTest: true,
  useTypeScript: true,
  importStyles: true,
  memoize: true,
  addPropTypes: true,
  addJsDoc: true
};

// Process CLI arguments
const args = parseArgs(process.argv.slice(2));
const componentName = args.name || null;
const componentType = args.type || config.defaultType;
const componentDir = args.dir || `${config.defaultDir}/${componentType}`;
const createFiles = args.files || 'all'; // all, jsx, css, story, test

if (!componentName) {
  console.error(chalk.red('Error: Component name is required.'));
  console.log(chalk.yellow('Usage: node scripts/generate-component.js --name=MyComponent --type=ui'));
  process.exit(1);
}

if (!config.types.includes(componentType)) {
  console.error(chalk.red(`Error: Invalid component type "${componentType}".`));
  console.log(chalk.yellow(`Valid types: ${config.types.join(', ')}`));
  process.exit(1);
}

// Parse CLI arguments into an object
function parseArgs(args) {
  const result = {};
  args.forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.replace('--', '').split('=');
      result[key] = value || true;
    }
  });
  return result;
}

// Create a directory if it doesn't exist
async function ensureDirectoryExists(directory) {
  try {
    await fs.mkdir(directory, { recursive: true });
    return true;
  } catch (err) {
    if (err.code !== 'EEXIST') {
      console.error(chalk.red(`Error creating directory ${directory}: ${err.message}`));
      return false;
    }
    return true;
  }
}

// Generate the JSX component file
async function generateComponentFile(componentPath, componentName, componentType) {
  const extension = config.useTypeScript ? 'tsx' : 'jsx';
  const filename = `${componentName}.${extension}`;
  const filepath = path.join(componentPath, filename);
  
  // CSS import path calculation
  const cssImportPath = config.importStyles
    ? `import '../assets/css/components/${componentType}/${componentName.toLowerCase()}.css';`
    : '';
  
  // Template based on component type
  let template = '';
  
  // UI Component Template
  if (componentType === 'ui') {
    template = `import React${config.memoize ? ', { memo }' : ''} from 'react';
${config.addPropTypes ? "import PropTypes from 'prop-types';" : ""}
${cssImportPath}

${config.addJsDoc ? `/**
 * ${componentName} component
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} ${componentName} component
 */` : ""}
const ${componentName} = (props) => {
  const { children, className = '', ...rest } = props;
  
  return (
    <div 
      className={\`${componentName.toLowerCase()} \${className}\`} 
      {...rest}
    >
      {children}
    </div>
  );
};

${config.addPropTypes ? `${componentName}.propTypes = {
  /** Component content */
  children: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string
};` : ""}

${config.memoize ? `// Apply memoization for performance optimization
export default memo(${componentName});` : `export default ${componentName};`}
`;
  }
  
  // Layout Component Template
  else if (componentType === 'layout') {
    template = `import React${config.memoize ? ', { memo }' : ''} from 'react';
${config.addPropTypes ? "import PropTypes from 'prop-types';" : ""}
${cssImportPath}

${config.addJsDoc ? `/**
 * ${componentName} layout component
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} ${componentName} component
 */` : ""}
const ${componentName} = (props) => {
  const { children, className = '', ...rest } = props;
  
  return (
    <div 
      className={\`${componentName.toLowerCase()} \${className}\`} 
      {...rest}
    >
      {children}
    </div>
  );
};

${config.addPropTypes ? `${componentName}.propTypes = {
  /** Layout content */
  children: PropTypes.node.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string
};` : ""}

${config.memoize ? `// Apply memoization for performance optimization
export default memo(${componentName});` : `export default ${componentName};`}
`;
  }
  
  // Container Component Template
  else if (componentType === 'container') {
    template = `import React${config.memoize ? ', { memo }' : ''} from 'react';
${config.addPropTypes ? "import PropTypes from 'prop-types';" : ""}
${cssImportPath}

${config.addJsDoc ? `/**
 * ${componentName} container component
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} ${componentName} component
 */` : ""}
const ${componentName} = (props) => {
  const { title, children, className = '', ...rest } = props;
  
  return (
    <section 
      className={\`${componentName.toLowerCase()}-container \${className}\`} 
      {...rest}
    >
      {title && <h2 className="section-title">{title}</h2>}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

${config.addPropTypes ? `${componentName}.propTypes = {
  /** Section title */
  title: PropTypes.string,
  /** Section content */
  children: PropTypes.node.isRequired,
  /** Additional CSS class names */
  className: PropTypes.string
};` : ""}

${config.memoize ? `// Apply memoization for performance optimization
export default memo(${componentName});` : `export default ${componentName};`}
`;
  }
  
  try {
    await fs.writeFile(filepath, template);
    console.log(chalk.green(`✓ Created component file: ${filename}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating component file: ${err.message}`));
    return false;
  }
}

// Generate the CSS file
async function generateCssFile(componentName, componentType) {
  const cssDir = `src/assets/css/components/${componentType}`;
  const cssFilename = `${componentName.toLowerCase()}.css`;
  const cssFilepath = path.join(cssDir, cssFilename);
  
  // Ensure CSS directory exists
  const dirCreated = await ensureDirectoryExists(cssDir);
  if (!dirCreated) return false;
  
  // CSS template with design tokens
  const cssTemplate = `/**
 * ${componentName} Component Styles
 * 
 * Styling for the ${componentName} component with design token usage
 * and responsive design considerations.
 */

.${componentName.toLowerCase()} {
  /* Base styles */
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-4);
  border-radius: var(--border-radius-md);
  background-color: var(--color-background);
  color: var(--color-text-primary);
}

/* Interactive states */
.${componentName.toLowerCase()}:hover {
  /* Add hover styles if interactive */
}

.${componentName.toLowerCase()}:focus {
  /* Add focus styles if interactive */
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

/* Accessibility concerns */
.${componentName.toLowerCase()} .visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Responsive styles */
@media (max-width: var(--breakpoint-md)) {
  .${componentName.toLowerCase()} {
    padding: var(--spacing-3);
  }
}
`;
  
  try {
    await fs.writeFile(cssFilepath, cssTemplate);
    console.log(chalk.green(`✓ Created CSS file: ${cssFilename}`));
    
    // Update the components/index.css to import the new CSS file
    const indexCssPath = 'src/assets/css/components/index.css';
    
    try {
      let indexCssContent = await fs.readFile(indexCssPath, 'utf8');
      const importStatement = `@import './${componentType}/${componentName.toLowerCase()}.css';`;
      
      // Check if import already exists
      if (!indexCssContent.includes(importStatement)) {
        const sectionComment = componentType === 'ui' 
          ? '/* UI Components */'
          : '/* Layout Components */';
        
        // Find the section and add import
        if (indexCssContent.includes(sectionComment)) {
          const sectionIndex = indexCssContent.indexOf(sectionComment);
          const nextLineIndex = indexCssContent.indexOf('\n', sectionIndex);
          
          indexCssContent = 
            indexCssContent.slice(0, nextLineIndex + 1) +
            importStatement + '\n' +
            indexCssContent.slice(nextLineIndex + 1);
          
          await fs.writeFile(indexCssPath, indexCssContent);
          console.log(chalk.green(`✓ Updated ${indexCssPath} with import for ${cssFilename}`));
        } else {
          console.log(chalk.yellow(`⚠ Could not find section "${sectionComment}" in ${indexCssPath}. Please add import manually.`));
        }
      }
    } catch (err) {
      console.log(chalk.yellow(`⚠ Could not update ${indexCssPath}: ${err.message}`));
    }
    
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating CSS file: ${err.message}`));
    return false;
  }
}

// Generate the Storybook story file
async function generateStoryFile(componentPath, componentName, componentType) {
  const filename = `${componentName}.stories.jsx`;
  const filepath = path.join(componentPath, filename);
  
  const storyCategory = componentType === 'ui' ? 'atoms' 
    : componentType === 'layout' ? 'molecules' 
    : 'organisms';
  
  // Story template
  const storyTemplate = `import React from 'react';
import ${componentName} from './${componentName}';

export default {
  title: '${storyCategory}/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${componentName} component description.'
      }
    }
  },
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' }
  }
};

const Template = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '${componentName} content'
};

export const Customized = Template.bind({});
Customized.args = {
  className: 'custom-class',
  children: 'Customized ${componentName}'
};
`;
  
  try {
    await fs.writeFile(filepath, storyTemplate);
    console.log(chalk.green(`✓ Created story file: ${filename}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating story file: ${err.message}`));
    return false;
  }
}

// Generate the test file
async function generateTestFile(componentPath, componentName) {
  const filename = `${componentName}.test.jsx`;
  const filepath = path.join(componentPath, filename);
  
  // Test template
  const testTemplate = `import React from 'react';
import { render, screen } from '@testing-library/react';
import ${componentName} from './${componentName}';

describe('${componentName} component', () => {
  test('renders correctly', () => {
    render(<${componentName}>Test content</${componentName}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  test('applies custom className', () => {
    render(<${componentName} className="custom-class">Test</${componentName}>);
    const element = screen.getByText('Test');
    expect(element.parentElement).toHaveClass('custom-class');
  });
});
`;
  
  try {
    await fs.writeFile(filepath, testTemplate);
    console.log(chalk.green(`✓ Created test file: ${filename}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating test file: ${err.message}`));
    return false;
  }
}

// Main function
async function main() {
  console.log(chalk.blue.bold('Component Generator'));
  console.log(chalk.gray(`Creating ${componentType} component: ${componentName}`));
  
  // 1. Create component directory
  const componentPath = path.join(process.cwd(), componentDir);
  const dirCreated = await ensureDirectoryExists(componentPath);
  if (!dirCreated) return;
  
  // 2. Create component files
  let success = true;
  
  if (createFiles === 'all' || createFiles === 'jsx') {
    success = await generateComponentFile(componentPath, componentName, componentType);
    if (!success) return;
  }
  
  if (config.createCss && (createFiles === 'all' || createFiles === 'css')) {
    success = await generateCssFile(componentName, componentType);
    if (!success) console.log(chalk.yellow('⚠ CSS file creation failed, but continuing...'));
  }
  
  if (config.createStory && (createFiles === 'all' || createFiles === 'story')) {
    success = await generateStoryFile(componentPath, componentName, componentType);
    if (!success) console.log(chalk.yellow('⚠ Story file creation failed, but continuing...'));
  }
  
  if (config.createTest && (createFiles === 'all' || createFiles === 'test')) {
    success = await generateTestFile(componentPath, componentName);
    if (!success) console.log(chalk.yellow('⚠ Test file creation failed, but continuing...'));
  }
  
  console.log(chalk.green.bold(`✓ Component ${componentName} created successfully!`));
  console.log(chalk.gray(`Location: ${componentPath}`));
}

// Run the script
main().catch(err => {
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(1);
});
