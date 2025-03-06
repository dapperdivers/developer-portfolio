#!/usr/bin/env node

/**
 * This script updates the component generator to work with the new component structure
 * where all related files (JS, CSS, stories, tests) are co-located in component directories.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Path to the component generator script
const generatorPath = path.join(projectRoot, 'scripts', 'generate-component.js');

// Read the original content
const originalContent = fs.readFileSync(generatorPath, 'utf8');

// Function to convert to ESM
function convertToESM(content) {
  return content
    .replace('const fs = require(\'fs\').promises;', 'import fs from \'fs/promises\';')
    .replace('const path = require(\'path\');', 'import path from \'path\';')
    .replace('const chalk = require(\'chalk\');', 'import chalk from \'chalk\';');
}

// Updated component generator structure
const updatedContent = `#!/usr/bin/env node

/**
 * Component Generator Script
 * This script creates new React components with proper structure and styling
 * following the portfolio's design system and component patterns.
 * 
 * Features:
 * - Creates component JSX files with proper imports and documentation
 * - Generates matching CSS files with design token usage
 * - Sets up proper PropTypes validation
 * - Creates different component types (atoms, molecules, organisms, layout)
 * - Adds Story file for Storybook documentation
 * - Creates component-specific directory with all related files
 * 
 * Usage:
 * node scripts/generate-component.js --name=Button --type=atoms
 */

import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

// Configuration
const config = {
  baseDir: 'src/components',
  types: ['atoms', 'molecules', 'organisms', 'layout'],
  createCss: true,
  createStory: true,
  createTest: true,
  createIndex: true,
  memoize: true,
  addPropTypes: true,
  addJsDoc: true
};

// Process CLI arguments
const args = parseArgs(process.argv.slice(2));
const componentName = args.name || null;
const componentType = args.type || 'atoms';

if (!componentName) {
  console.error(chalk.red('Error: Component name is required.'));
  console.log(chalk.yellow('Usage: node scripts/generate-component.js --name=MyComponent --type=atoms'));
  process.exit(1);
}

if (!config.types.includes(componentType)) {
  console.error(chalk.red(\`Error: Invalid component type "\${componentType}".\`));
  console.log(chalk.yellow(\`Valid types: \${config.types.join(', ')}\`));
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
      console.error(chalk.red(\`Error creating directory \${directory}: \${err.message}\`));
      return false;
    }
    return true;
  }
}

// Generate the component directory structure
async function generateComponentDirectory(componentType, componentName) {
  const componentDir = path.join(config.baseDir, componentType, componentName);
  const fullPath = path.join(process.cwd(), componentDir);
  
  // Create the component directory
  const dirCreated = await ensureDirectoryExists(fullPath);
  if (!dirCreated) return false;
  
  // Create assets directory
  const assetsDirCreated = await ensureDirectoryExists(path.join(fullPath, 'assets'));
  if (!assetsDirCreated) {
    console.log(chalk.yellow(\`⚠ Could not create assets directory for \${componentName}, but continuing...\`));
  }
  
  console.log(chalk.green(\`✓ Created component directory: \${componentName}\`));
  return fullPath;
}

// Generate the JSX component file
async function generateComponentFile(componentPath, componentName) {
  const filename = \`\${componentName}.jsx\`;
  const filepath = path.join(componentPath, filename);
  
  // CSS import
  const cssImport = config.createCss ? \`import './\${componentName}.css';\` : '';
  
  // Component template
  const template = \`import React\${config.memoize ? ', { memo }' : ''} from 'react';
\${config.addPropTypes ? "import PropTypes from 'prop-types';" : ""}
\${cssImport}

\${config.addJsDoc ? \`/**
 * \${componentName} component
 * 
 * @component
 * @param {Object} props - Component props
 * @returns {React.ReactElement} \${componentName} component
 */\` : ""}
const \${componentName} = (props) => {
  const { children, className = '', ...rest } = props;
  
  return (
    <div 
      className={\\\`\${componentName.toLowerCase()} \\\${className}\\\`} 
      {...rest}
    >
      {children}
    </div>
  );
};

\${config.addPropTypes ? \`\${componentName}.propTypes = {
  /** Component content */
  children: PropTypes.node,
  /** Additional CSS class names */
  className: PropTypes.string
};\` : ""}

\${config.memoize ? \`// Apply memoization for performance optimization
export default memo(\${componentName});\` : \`export default \${componentName};\`}
\`;
  
  try {
    await fs.writeFile(filepath, template);
    console.log(chalk.green(\`✓ Created component file: \${filename}\`));
    return true;
  } catch (err) {
    console.error(chalk.red(\`Error creating component file: \${err.message}\`));
    return false;
  }
}

// Generate the CSS file
async function generateCssFile(componentPath, componentName) {
  const filename = \`\${componentName}.css\`;
  const filepath = path.join(componentPath, filename);
  
  // CSS template with design tokens
  const cssTemplate = \`/**
 * \${componentName} Component Styles
 * 
 * Styling for the \${componentName} component with design token usage
 * and responsive design considerations.
 */

.\${componentName.toLowerCase()} {
  /* Base styles */
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-4);
  border-radius: var(--border-radius-md);
  background-color: var(--color-background);
  color: var(--color-text-primary);
}

/* Interactive states */
.\${componentName.toLowerCase()}:hover {
  /* Add hover styles if interactive */
}

.\${componentName.toLowerCase()}:focus {
  /* Add focus styles if interactive */
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

/* Accessibility concerns */
.\${componentName.toLowerCase()} .visually-hidden {
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
  .\${componentName.toLowerCase()} {
    padding: var(--spacing-3);
  }
}
\`;
  
  try {
    await fs.writeFile(filepath, cssTemplate);
    console.log(chalk.green(\`✓ Created CSS file: \${filename}\`));
    return true;
  } catch (err) {
    console.error(chalk.red(\`Error creating CSS file: \${err.message}\`));
    return false;
  }
}

// Generate the Storybook story file
async function generateStoryFile(componentPath, componentName, componentType) {
  const filename = \`\${componentName}.stories.jsx\`;
  const filepath = path.join(componentPath, filename);
  
  // Determine story category based on component type
  let storyCategory = componentType;
  if (componentType === 'layout') {
    storyCategory = 'templates';
  }
  
  // Story template
  const storyTemplate = \`import React from 'react';
import \${componentName} from './\${componentName}';

export default {
  title: '\${storyCategory}/\${componentName}',
  component: \${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '\${componentName} component description.'
      }
    }
  },
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' }
  }
};

const Template = (args) => <\${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '\${componentName} content'
};

export const Customized = Template.bind({});
Customized.args = {
  className: 'custom-class',
  children: 'Customized \${componentName}'
};
\`;
  
  try {
    await fs.writeFile(filepath, storyTemplate);
    console.log(chalk.green(\`✓ Created story file: \${filename}\`));
    return true;
  } catch (err) {
    console.error(chalk.red(\`Error creating story file: \${err.message}\`));
    return false;
  }
}

// Generate the test file
async function generateTestFile(componentPath, componentName) {
  const filename = \`\${componentName}.test.jsx\`;
  const filepath = path.join(componentPath, filename);
  
  // Test template
  const testTemplate = \`import React from 'react';
import { render, screen } from '@testing-library/react';
import \${componentName} from './\${componentName}';

describe('\${componentName} component', () => {
  test('renders correctly', () => {
    render(<\${componentName}>Test content</\${componentName}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
  
  test('applies custom className', () => {
    render(<\${componentName} className="custom-class">Test</\${componentName}>);
    const element = screen.getByText('Test');
    expect(element.parentElement).toHaveClass('custom-class');
  });
});
\`;
  
  try {
    await fs.writeFile(filepath, testTemplate);
    console.log(chalk.green(\`✓ Created test file: \${filename}\`));
    return true;
  } catch (err) {
    console.error(chalk.red(\`Error creating test file: \${err.message}\`));
    return false;
  }
}

// Generate the index.js file for re-exporting
async function generateIndexFile(componentPath, componentName) {
  const filename = 'index.js';
  const filepath = path.join(componentPath, filename);
  
  // Index template
  const indexTemplate = \`import \${componentName} from './\${componentName}';
export default \${componentName};
\`;
  
  try {
    await fs.writeFile(filepath, indexTemplate);
    console.log(chalk.green(\`✓ Created index file: \${filename}\`));
    return true;
  } catch (err) {
    console.error(chalk.red(\`Error creating index file: \${err.message}\`));
    return false;
  }
}

// Main function
async function main() {
  console.log(chalk.blue.bold('Component Generator'));
  console.log(chalk.gray(\`Creating \${componentType} component: \${componentName}\`));
  
  // 1. Create component directory structure
  const componentPath = await generateComponentDirectory(componentType, componentName);
  if (!componentPath) return;
  
  // 2. Create component files
  let success = true;
  
  // Component JSX file
  success = await generateComponentFile(componentPath, componentName);
  if (!success) return;
  
  // CSS file
  if (config.createCss) {
    success = await generateCssFile(componentPath, componentName);
    if (!success) console.log(chalk.yellow('⚠ CSS file creation failed, but continuing...'));
  }
  
  // Story file
  if (config.createStory) {
    success = await generateStoryFile(componentPath, componentName, componentType);
    if (!success) console.log(chalk.yellow('⚠ Story file creation failed, but continuing...'));
  }
  
  // Test file
  if (config.createTest) {
    success = await generateTestFile(componentPath, componentName);
    if (!success) console.log(chalk.yellow('⚠ Test file creation failed, but continuing...'));
  }
  
  // Index file
  if (config.createIndex) {
    success = await generateIndexFile(componentPath, componentName);
    if (!success) console.log(chalk.yellow('⚠ Index file creation failed, but continuing...'));
  }
  
  console.log(chalk.green.bold(\`✓ Component \${componentName} created successfully!\`));
  console.log(chalk.gray(\`Location: \${componentPath}\`));
}

// Run the script
main().catch(err => {
  console.error(chalk.red(\`Error: \${err.message}\`));
  process.exit(1);
});
`;

// Save the updated content
try {
  // Create a backup of the original file
  const backupPath = generatorPath + '.bak';
  fs.writeFileSync(backupPath, originalContent);
  console.log(`Backup of original file created at: ${backupPath}`);
  
  // Write the updated content
  fs.writeFileSync(generatorPath, updatedContent);
  console.log('Component generator updated successfully to use the new component structure!');
} catch (error) {
  console.error('Error updating component generator:', error);
}
