#!/usr/bin/env node

/**
 * Enhanced Storybook Story Generator
 * 
 * This script generates a comprehensive Storybook story file with interaction tests, 
 * context support, and detailed documentation.
 * 
 * Usage:
 * node scripts/generate-story.js --component=Button --type=atom --interactions --context=portfolio --detailed
 * 
 * Options:
 * --component: The name of the component (required)
 * --type: The atomic design type (atom, molecule, organism, template) (required)
 * --path: Custom component path (optional, defaults to standard locations)
 * --interactions: Include interaction tests (optional, flag)
 * --context: Add context support (optional, values: portfolio, theme)
 * --detailed: Add detailed documentation templates (optional, flag)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Process command line arguments
const args = process.argv.slice(2).reduce((acc, arg) => {
  if (arg.startsWith('--')) {
    const parts = arg.slice(2).split('=');
    // Handle flags (arguments without values)
    if (parts.length === 1) {
      acc[parts[0]] = true;
    } else {
      const [key, value] = parts;
      acc[key] = value;
    }
  }
  return acc;
}, {});

// Validate required arguments
if (!args.component) {
  console.error('Error: --component argument is required');
  process.exit(1);
}

if (!args.type) {
  console.error('Error: --type argument is required');
  process.exit(1);
}

// Validate type
const validTypes = ['atom', 'molecule', 'organism', 'template'];
if (!validTypes.includes(args.type)) {
  console.error(`Error: --type must be one of: ${validTypes.join(', ')}`);
  process.exit(1);
}

// Determine paths
const componentName = args.component;
const atomicType = args.type;
const pluralType = atomicType === 'atom' ? 'atoms' : 
                   atomicType === 'molecule' ? 'molecules' : 
                   atomicType === 'organism' ? 'organisms' : 'templates';

// Determine the source component path
let componentPath;
if (args.path) {
  componentPath = args.path;
} else {
  // Default paths based on atomic type
  switch(atomicType) {
    case 'atom':
      componentPath = `src/components/ui/${componentName}.jsx`;
      break;
    case 'molecule':
      componentPath = `src/components/${componentName}.jsx`;
      break;
    case 'organism':
      componentPath = `src/containers/${componentName}.jsx`;
      break;
    case 'template':
      componentPath = `src/components/layout/${componentName}.jsx`;
      break;
  }
}

// Determine the story file path
const storyPath = `src/stories/${pluralType}/${componentName}.stories.jsx`;

// Check if component exists
if (!fs.existsSync(componentPath)) {
  console.warn(`Warning: Component file not found at ${componentPath}`);
  console.log('You may need to specify a custom path with --path');
}

// Check if story already exists
if (fs.existsSync(storyPath)) {
  console.error(`Error: Story file already exists at ${storyPath}`);
  process.exit(1);
}

// Calculate relative import path
const relativePath = path.relative(path.dirname(storyPath), path.dirname(componentPath))
  .replace(/\\/g, '/') || '.';

// Generate imports based on options
let imports = `import React from 'react';\nimport ${componentName} from '${relativePath === '.' ? '.' : relativePath}/${componentName}';\n`;

// Add interaction testing imports if needed
if (args.interactions) {
  imports += `import { within, userEvent } from '@storybook/testing-library';\nimport { expect } from '@storybook/jest';\n`;
}

// Add context imports if needed
if (args.context) {
  if (args.context === 'portfolio') {
    imports += `\n// Mock data for PortfolioContext\nconst mockPortfolioData = {\n  // Add mock data properties as needed\n};\n`;
    imports += `\n// Context decorator for providing portfolio data\nconst withPortfolioContext = (Story) => (\n  <PortfolioContext.Provider value={mockPortfolioData}>\n    <Story />\n  </PortfolioContext.Provider>\n);\n`;
    imports += `import { PortfolioContext } from '../../context/PortfolioContext';\n`;
  } else if (args.context === 'theme') {
    imports += `\n// Mock data for ThemeContext\nconst mockThemeData = {\n  // Add mock theme properties\n};\n`;
    imports += `\n// Context decorator for providing theme\nconst withThemeContext = (Story) => (\n  <ThemeContext.Provider value={mockThemeData}>\n    <Story />\n  </ThemeContext.Provider>\n);\n`;
    imports += `import { ThemeContext } from '../../context/ThemeContext';\n`;
  }
}

// Generate story configuration
let storyConfig = `export default {
  title: '${pluralType.charAt(0).toUpperCase() + pluralType.slice(1)}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],`;

// Add decorators for context if needed
if (args.context) {
  if (args.context === 'portfolio') {
    storyConfig += `
  decorators: [withPortfolioContext],`;
  } else if (args.context === 'theme') {
    storyConfig += `
  decorators: [withThemeContext],`;
  }
}

// Add argTypes
storyConfig += `
  argTypes: {
    // Add component props here
    // Example:
    // variant: {
    //   control: 'select',
    //   options: ['primary', 'secondary'],
    //   description: 'The button variant',
    // },
  },
  parameters: {
    docs: {
      description: {
        component: 'Description of the ${componentName} component',
      },
    },`;

// Add a11y parameters
storyConfig += `
    a11y: {
      config: {
        rules: [
          // Component-specific accessibility rules
        ],
      },
    },`;

// Close parameters and storyConfig
storyConfig += `
  },
};`;

// Generate template and stories
let stories = `
// Template for the component
const Template = (args) => <${componentName} {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  // Add default props here
};`;

// Add interaction tests if needed
if (args.interactions) {
  stories += `
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', () => {
    // Add assertions about initial component state
    // Example: expect(canvas.getByRole('button')).toBeInTheDocument();
  });
  
  await step('Interaction test', async () => {
    // Add interaction tests here
    // Example: await userEvent.click(canvas.getByRole('button'));
  });
  
  await step('Post-interaction check', () => {
    // Add assertions about component state after interaction
  });
};`;
}

// Add variant stories based on component type
if (atomicType === 'atom') {
  stories += `

// Variant example
export const Variant = Template.bind({});
Variant.args = {
  // Add variant-specific props
};`;

  if (args.interactions) {
    stories += `
Variant.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  // Add variant-specific interaction tests
};`;
  }
}

// Add detailed documentation sections if requested
if (args.detailed) {
  stories += `

/**
 * ## Component Usage
 * 
 * \`\`\`jsx
 * import { ${componentName} } from '${atomicType === 'atom' ? 'components/ui' : atomicType === 'template' ? 'components/layout' : 'components'}';
 * 
 * function MyComponent() {
 *   return <${componentName} />;
 * }
 * \`\`\`
 * 
 * ## Properties
 * 
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | prop1 | string | undefined | Description of prop1 |
 * | prop2 | number | 0 | Description of prop2 |
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Uses semantic HTML
 * - Provides appropriate ARIA attributes
 * - Supports keyboard navigation
 * 
 * ## Edge Cases
 * 
 * The following stories demonstrate edge cases and special scenarios.
 */
export const EdgeCase = Template.bind({});
EdgeCase.args = {
  // Edge case props
};`;
}

// Add responsive testing examples if it's a UI component
if (atomicType === 'atom' || atomicType === 'molecule') {
  stories += `

// Responsive behavior example
export const Responsive = Template.bind({});
Responsive.args = {
  // Props for demonstrating responsive behavior
};
Responsive.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};`;
}

// Combine all content
const finalStoryContent = imports + '\n\n' + storyConfig + '\n\n' + stories;

// Create the stories directory if it doesn't exist
const storiesDir = path.dirname(storyPath);
if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir, { recursive: true });
}

// Write the story file
fs.writeFileSync(storyPath, finalStoryContent);

console.log(`✅ Successfully generated story at ${storyPath}`);
console.log(`Options applied: ${Object.keys(args).filter(key => key !== 'component' && key !== 'type' && key !== 'path').join(', ') || 'none'}`);
console.log('You can now customize the story file with appropriate props and examples.');
