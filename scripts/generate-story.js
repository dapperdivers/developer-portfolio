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
 * --type: The atomic design type (atom, molecule, organism, layout) (required)
 * --path: Custom component path (optional, defaults to standard locations)
 * --interactions: Include interaction tests (optional, flag)
 * --context: Add context support (optional, values: portfolio, theme)
 * --detailed: Add detailed documentation templates (optional, flag)
 * --tsx: Generate TypeScript story (optional, flag)
 * --subdir: For components in nested directories (e.g., TimelineCore/Node)
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
const validTypes = ['atom', 'molecule', 'organism', 'layout'];
if (!validTypes.includes(args.type)) {
  console.error(`Error: --type must be one of: ${validTypes.join(', ')}`);
  process.exit(1);
}

// Determine paths
const componentName = args.component;
const atomicType = args.type;
const pluralType = atomicType === 'atom' ? 'atoms' : 
                   atomicType === 'molecule' ? 'molecules' : 
                   atomicType === 'organism' ? 'organisms' : 'layout';

// Handle components with subdirectories (e.g., TimelineCore/Node/TimelineNode)
let baseComponentName = componentName;
let componentDir = '';

if (componentName.includes('/')) {
  const parts = componentName.split('/');
  baseComponentName = parts[parts.length - 1];
  componentDir = parts.slice(0, -1).join('/');
}

// Determine if we're working with a TypeScript component
const fileExtension = args.tsx ? 'tsx' : 'jsx';

// Determine the source component path
let componentPath;
if (args.path) {
  componentPath = args.path;
} else {
  // Updated paths based on project structure
  componentPath = componentDir 
    ? `src/components/${pluralType}/${componentDir}/${baseComponentName}.${fileExtension}`
    : `src/components/${pluralType}/${baseComponentName}/${baseComponentName}.${fileExtension}`;
}

// Determine the story file path
const storyPath = componentDir
  ? `src/components/${pluralType}/${componentDir}/${baseComponentName}.stories.${fileExtension}`
  : `src/components/${pluralType}/${baseComponentName}/${baseComponentName}.stories.${fileExtension}`;

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
const importStatement = `import ${baseComponentName} from './${baseComponentName}';`;

// Generate imports based on options
let imports = `import React from 'react';\n${importStatement}\n`;

// Add interaction testing imports if needed
if (args.interactions) {
  imports += `import { within, userEvent, expect } from '@storybook/test';\n`;
}

// Add context imports if needed
if (args.context) {
  if (args.context === 'portfolio') {
    imports += `\n// Mock data for PortfolioContext\nconst mockPortfolioData = {\n  // Add mock data properties as needed\n};\n`;
    imports += `\n// Context decorator for providing portfolio data\nconst withPortfolioContext = (Story) => (\n  <PortfolioContext.Provider value={mockPortfolioData}>\n    <Story />\n  </PortfolioContext.Provider>\n);\n`;
    imports += `import { PortfolioContext } from '../../../context/PortfolioContext';\n`;
  } else if (args.context === 'theme') {
    imports += `\n// Mock data for ThemeContext\nconst mockThemeData = {\n  // Add mock theme properties\n};\n`;
    imports += `\n// Context decorator for providing theme\nconst withThemeContext = (Story) => (\n  <ThemeContext.Provider value={mockThemeData}>\n    <Story />\n  </ThemeContext.Provider>\n);\n`;
    imports += `import { ThemeContext } from '../../../context/ThemeContext';\n`;
  }
}

// Determine title path
let titlePath = baseComponentName;
if (componentDir) {
  titlePath = `${componentDir}/${baseComponentName}`;
}

// Generate story configuration
let storyConfig = `export default {
  title: '${pluralType.charAt(0).toUpperCase() + pluralType.slice(1)}/${titlePath}',
  component: ${baseComponentName},
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
        component: 'Description of the ${baseComponentName} component',
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
// Default story
export const Default = {
  args: {
    // Add default props here
  }
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
export const Variant = {
  args: {
    // Add variant-specific props
  }
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
 * import { ${baseComponentName} } from 'components/${pluralType}/${componentDir ? componentDir + '/' : ''}${baseComponentName}';
 * 
 * function MyComponent() {
 *   return <${baseComponentName} />;
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
export const EdgeCase = {
  args: {
    // Edge case props
  }
};`;
}

// Add responsive testing examples if it's a UI component
if (atomicType === 'atom' || atomicType === 'molecule') {
  stories += `

// Responsive behavior example
export const Responsive = {
  args: {
    // Props for demonstrating responsive behavior
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};`;
}

// Combine all content
const finalStoryContent = imports + '\n\n' + storyConfig + '\n\n' + stories;

// Create the stories directory if it doesn't exist
const storyDir = path.dirname(storyPath);
if (!fs.existsSync(storyDir)) {
  fs.mkdirSync(storyDir, { recursive: true });
}

// Write the story file
fs.writeFileSync(storyPath, finalStoryContent);

console.log(`✅ Successfully generated story at ${storyPath}`);
console.log(`Options applied: ${Object.keys(args).filter(key => key !== 'component' && key !== 'type' && key !== 'path').join(', ') || 'none'}`);
console.log('You can now customize the story file with appropriate props and examples.');
