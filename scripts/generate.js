#!/usr/bin/env node

/**
 * Component and Story Generator
 *
 * Scaffolds React components and Storybook stories in TypeScript, following
 * atomic design and the project rule that a building block must render with
 * no provider around it.
 *
 * What it writes, in src/components/<layer>/<Name>/:
 * - <Name>.tsx          component, exporting `interface <Name>Props`
 * - <Name>.css          styles built on the design tokens
 * - <Name>.stories.tsx  Storybook story (`satisfies Meta<typeof <Name>>`)
 * - <Name>.test.tsx     Vitest test (globals are typed, nothing to import)
 * - index.ts            default export plus `export type { <Name>Props }`
 *
 * Atoms and molecules never read app context: they take an optional
 * `animated` prop and use `useMotionEnabled` and the shared variants from
 * `@utils/motion`. Organisms and layout components may read
 * `@context/AnimationContext` / `@context/PortfolioContext` and pass data and
 * `animated={animationEnabled}` down as props.
 *
 * Usage:
 * yarn generate:component --name=Button --type=atom
 *
 * Subcommand usage:
 * yarn generate:component component --name=Button --type=atom
 * yarn generate:component story --component=Button --type=atom --interactions
 *
 * Options:
 * --name: The name of the component (required)
 * --type: Atomic design type (atom, molecule, organism, layout) (default: atom)
 * --dir: Custom parent directory (optional, defaults to src/components/[atoms|molecules|organisms|layout]); the component goes in [dir]/[ComponentName]
 * --files: Which files to generate (all, tsx, css, story, test, index) (default: all)
 * --help: Print usage
 *
 * Story subcommand options (for a component that already exists):
 * --component: The name of the component (required)
 * --type: Atomic design type (required)
 * --interactions: Include an interaction test (optional, flag)
 * --context: Wrap one story in a provider (optional, value: portfolio)
 * --detailed: Add a documentation template (optional, flag)
 * --path: Parent directory holding the component folder (optional, defaults to src/components/[layer])
 *
 * Existing files are overwritten without asking.
 */

import { promises as fs } from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// Get the current file's directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  // Component generation config
  defaultComponentType: 'atom', // atom, molecule, organism, layout
  defaultComponentDir: 'src/components',
  componentTypes: ['atom', 'molecule', 'organism', 'layout'],
  designTokensPath: 'src/assets/css/design-system/tokens',
  createCss: true,
  createStory: true,
  createTest: true,
  createIndex: true,  // Generate index.ts file for clean imports
  importStyles: true,
  memoize: true,
  addJsDoc: true,
  
  // Folder mapping for atomic types
  atomicTypesToFolders: {
    atom: 'atoms',
    molecule: 'molecules',
    organism: 'organisms',
    layout: 'layout'
  },

  // Storybook title prefix for each atomic type
  atomicTypesToStoryLayers: {
    atom: 'Atoms',
    molecule: 'Molecules',
    organism: 'Organisms',
    layout: 'Layout'
  }
};

// Parse CLI arguments into an object
function parseArgs(args) {
  const result = {};
  args.forEach(arg => {
    if (arg.startsWith('--')) {
      const parts = arg.slice(2).split('=');
      // Handle flags (arguments without values)
      if (parts.length === 1) {
        result[parts[0]] = true;
      } else {
        const [key, value] = parts;
        result[key] = value;
      }
    }
  });
  return result;
}

// ---------------------------
// Component Generation Logic
// ---------------------------

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

// Generate the component file
async function generateComponentFile(componentPath, componentName, componentType) {
  const filename = `${componentName}.tsx`;
  const filepath = path.join(componentPath, filename);
  const className = componentName.toLowerCase();

  // CSS import path calculation
  const cssImportPath = config.importStyles
    ? `import './${componentName}.css';`
    : '';

  const jsDoc = (description) => config.addJsDoc ? `/**
 * ${description}
 *
 * @component
 * @param {${componentName}Props} props - Component props
 * @returns {React.ReactElement} ${componentName} component
 */
` : '';

  const exportLine = config.memoize
    ? `// Apply memoization for performance optimization
export default memo(${componentName});`
    : `export default ${componentName};`;

  // Template based on component type
  let template = '';

  // Atom Component Template
  if (componentType === 'atom') {
    template = `${config.memoize ? "import { memo } from 'react';\n" : ''}import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { fadeInVariants, useMotionEnabled } from '@utils/motion';
${cssImportPath}

export interface ${componentName}Props extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Component content */
  children?: ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Whether the component animates in (default true) */
  animated?: boolean;
}

${jsDoc(`${componentName} atom.
 *
 * A building block: it takes everything through props and renders with no
 * provider around it. Motion comes from \`@utils/motion\`, never from context.`)}const ${componentName} = ({ children, className = '', animated = true, ...rest }: ${componentName}Props) => {
  // Animate only if the prop is on and the visitor has not asked for reduced motion
  const shouldAnimate = useMotionEnabled(animated);

  return (
    <motion.div
      className={['${className}', className].filter(Boolean).join(' ')}
      variants={fadeInVariants}
      initial={shouldAnimate ? 'hidden' : false}
      animate="visible"
      {...rest}
    >
      {children}
    </motion.div>
  );
};

${exportLine}
`;
  }

  // Molecule Component Template
  else if (componentType === 'molecule') {
    template = `import { Children${config.memoize ? ', memo' : ''} } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps, Variants } from 'framer-motion';
import { STAGGER_DELAY, slideUpVariants, useMotionEnabled } from '@utils/motion';
${cssImportPath}

export interface ${componentName}Props extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Component content: each child animates in after the one before it */
  children?: ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Whether the component animates in (default true) */
  animated?: boolean;
}

// Reveals the children one after another
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: STAGGER_DELAY }
  }
};

${jsDoc(`${componentName} molecule.
 *
 * A building block: it takes its data through props and renders with no
 * provider around it. Pass \`animated\` on to any atoms it is built from.`)}const ${componentName} = ({ children, className = '', animated = true, ...rest }: ${componentName}Props) => {
  // Animate only if the prop is on and the visitor has not asked for reduced motion
  const shouldAnimate = useMotionEnabled(animated);

  return (
    <motion.div
      className={['${className}', className].filter(Boolean).join(' ')}
      variants={containerVariants}
      initial={shouldAnimate ? 'hidden' : false}
      animate="visible"
      {...rest}
    >
      {Children.map(children, (child) => (
        <motion.div className="${className}__item" variants={slideUpVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

${exportLine}
`;
  }

  // Organism Component Template
  else if (componentType === 'organism') {
    template = `${config.memoize ? "import { memo } from 'react';\n" : ''}import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import Card from '@atoms/Card';
import { useAnimation } from '@context/AnimationContext';
import { fadeInVariants, slideUpVariants } from '@utils/motion';
${cssImportPath}

export interface ${componentName}Props extends Omit<HTMLMotionProps<'section'>, 'children' | 'title'> {
  /** Optional title for the organism */
  title?: string;
  /** Component content */
  children?: ReactNode;
  /** Additional CSS class names */
  className?: string;
}

${jsDoc(`${componentName} organism.
 *
 * Organisms are where app context is read. Read portfolio data here too
 * (\`usePortfolio\` from \`@context/PortfolioContext\`) and hand it to the
 * atoms and molecules below as props, together with \`animated\`.`)}const ${componentName} = ({ title, children, className = '', ...rest }: ${componentName}Props) => {
  // Already accounts for the visitor's reduced-motion preference
  const { animationEnabled } = useAnimation();

  return (
    <motion.section
      className={['${className}', className].filter(Boolean).join(' ')}
      variants={fadeInVariants}
      initial={animationEnabled ? 'hidden' : false}
      animate="visible"
      {...rest}
    >
      {title && (
        <motion.h2 className="${className}__title" variants={slideUpVariants}>
          {title}
        </motion.h2>
      )}
      {/* Building blocks do not read context: pass the setting down */}
      <Card className="${className}__content" animated={animationEnabled}>
        {children}
      </Card>
    </motion.section>
  );
};

${exportLine}
`;
  }

  // Layout Component Template
  else if (componentType === 'layout') {
    template = `${config.memoize ? "import { memo } from 'react';\n" : ''}import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import { fadeInVariants } from '@utils/motion';
${cssImportPath}

export interface ${componentName}Props extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Component content */
  children?: ReactNode;
  /** Additional CSS class names */
  className?: string;
}

${jsDoc(`${componentName} layout component.
 *
 * Layout components may read app context. Any atom or molecule rendered
 * here gets the setting as a prop: \`<Button animated={animationEnabled} />\`.`)}const ${componentName} = ({ children, className = '', ...rest }: ${componentName}Props) => {
  // Already accounts for the visitor's reduced-motion preference
  const { animationEnabled } = useAnimation();

  return (
    <motion.div
      className={['${className}', className].filter(Boolean).join(' ')}
      variants={fadeInVariants}
      initial={animationEnabled ? 'hidden' : false}
      animate="visible"
      {...rest}
    >
      {children}
    </motion.div>
  );
};

${exportLine}
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
async function generateCssFile(componentName, componentType, componentPath) {
  const cssFilename = `${componentName}.css`;
  const cssFilepath = path.join(componentPath, cssFilename);
  
  // CSS template built on the design tokens in config.designTokensPath
  const className = componentName.toLowerCase();
  const typeStyles = {
    atom: `  display: inline-flex;
  align-items: center;
  padding: var(--spacing-2) var(--spacing-4);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);`,
    molecule: `  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  color: var(--color-text);
  border-radius: var(--border-radius-lg);`,
    organism: `  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding: var(--spacing-8) var(--spacing-4);
  color: var(--color-text);`,
    layout: `  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--spacing-4);
  color: var(--color-text);
  background-color: var(--color-background);`
  };
  const typeExtras = {
    atom: '',
    molecule: `
.${className}__item {
  min-width: 0;
}
`,
    organism: `
.${className}__title {
  margin: 0;
  color: var(--color-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
}
`,
    layout: ''
  };

  const cssTemplate = `/**
 * ${componentName} Component Styles
 *
 * Use the design tokens from ${config.designTokensPath}/*.css
 * (colors, spacing, borders, typography, shadows) rather than raw values.
 *
 * Entry animations are handled by framer-motion in the component, so do not
 * add CSS keyframes for them here.
 */

.${className} {
${typeStyles[componentType] || typeStyles.atom}
}
${typeExtras[componentType] || ''}
@media (max-width: 768px) {
  .${className} {
    /* Mobile-specific styles */
    padding: var(--spacing-2);
  }
}
`;

  try {
    await fs.writeFile(cssFilepath, cssTemplate);
    console.log(chalk.green(`✓ Created CSS file: ${cssFilename}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating CSS file: ${err.message}`));
    return false;
  }
}

// Generate the story file for a component
async function generateComponentStoryFile(componentPath, componentName, componentType) {
  const storyFilename = `${componentName}.stories.tsx`;
  const storyFilepath = path.join(componentPath, storyFilename);
  const storyLayer = config.atomicTypesToStoryLayers[componentType];
  const isBuildingBlock = componentType === 'atom' || componentType === 'molecule';

  // Build the story content
  let content = `import type { Meta, StoryObj } from '@storybook/react-vite';
${isBuildingBlock ? "import { expect, within } from 'storybook/test';\n" : ''}import ${componentName} from './${componentName}';

const meta = {
  title: '${storyLayer}/${componentName}',
  component: ${componentName},
  tags: ['autodocs'],
  parameters: {
    layout: '${componentType === 'layout' ? 'fullscreen' : 'centered'}',
    docs: {
      description: {
        component: '${componentName} ${componentType}: describe what it is for here.'
      }
    }
  },
  argTypes: {
    className: { control: 'text' }${isBuildingBlock ? `,
    animated: { control: 'boolean', description: 'Whether the component animates in' }` : ''}
  },
  args: {
    children: 'Content goes here'${isBuildingBlock ? `,
    animated: true` : ''}
  }
} satisfies Meta<typeof ${componentName}>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomStyle: Story = {
  args: {
    children: 'Styled component',
    className: 'custom-style'
  }
};
`;

  // Building blocks own their animation switch and get an interaction test
  if (isBuildingBlock) {
    content += `
/** Rendered with animation off, as a visitor who prefers reduced motion sees it. */
export const Static: Story = {
  args: {
    animated: false
  }
};

/** Interaction test: extend this with clicks, typing and assertions. */
export const WithInteractions: Story = {
  args: {
    children: 'Interactive component'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Interactive component')).toBeInTheDocument();
  }
};
`;
  }

  // Organisms take a title
  if (componentType === 'organism') {
    content += `
export const WithTitle: Story = {
  args: {
    title: '${componentName}'
  }
};
`;
  }

  // Add responsive examples for layout components
  if (componentType === 'layout') {
    content += `
/** How the component behaves at a phone width. */
export const Mobile: Story = {
  args: {
    children: (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <div style={{ padding: 'var(--spacing-4)', borderBottom: '1px solid var(--color-border)' }}>
          Header content
        </div>
        <div style={{ padding: 'var(--spacing-4)' }}>
          Main content
        </div>
      </div>
    )
  },
  globals: { viewport: { value: 'mobile1', isRotated: false } }
};
`;
  }

  try {
    await fs.writeFile(storyFilepath, content);
    console.log(chalk.green(`✓ Created story file: ${storyFilename}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating story file: ${err.message}`));
    return false;
  }
}

// Generate the test file
async function generateTestFile(componentPath, componentName, componentType) {
  const testFilename = `${componentName}.test.tsx`;
  const testFilepath = path.join(componentPath, testFilename);
  const className = componentName.toLowerCase();
  const isBuildingBlock = componentType === 'atom' || componentType === 'molecule';

  // Building blocks render bare; organisms and layout get the real provider
  const testTemplate = isBuildingBlock ? `import { render, screen } from '@testing-library/react';
import ${componentName} from './${componentName}';

// Rendered with no provider on purpose: the block takes everything as props.
describe('${componentName} Component', () => {
  it('renders its children', () => {
    render(<${componentName}>Test content</${componentName}>);

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies a custom class name', () => {
    const { container } = render(<${componentName} className="custom-class">Test</${componentName}>);

    expect(container.firstChild).toHaveClass('${className}');
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('passes other props to the root element', () => {
    render(<${componentName} data-testid="root">Test</${componentName}>);

    expect(screen.getByTestId('root')).toHaveClass('${className}');
  });

  it('starts hidden when animated', () => {
    const { container } = render(<${componentName}>Test</${componentName}>);

    expect(container.firstChild).toHaveStyle({ opacity: '0' });
  });

  it('renders in its final state when animated is false', () => {
    const { container } = render(<${componentName} animated={false}>Test</${componentName}>);

    expect(container.firstChild).not.toHaveStyle({ opacity: '0' });
  });
});
` : `import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { AnimationProvider } from '@context/AnimationContext';
import ${componentName} from './${componentName}';

// ${capitalizeFirstLetter(componentType)} components read app context, so they render inside the real provider
const renderWithProviders = (ui: ReactElement) => render(<AnimationProvider>{ui}</AnimationProvider>);

describe('${componentName} Component', () => {
  it('renders its children', () => {
    renderWithProviders(<${componentName}>Test content</${componentName}>);

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies a custom class name', () => {
    const { container } = renderWithProviders(<${componentName} className="custom-class">Test</${componentName}>);

    const element = container.querySelector('.${className}');
    expect(element).toHaveClass('custom-class');
  });
${componentType === 'organism' ? `
  it('renders the title when given one', () => {
    renderWithProviders(<${componentName} title="Section title">Test</${componentName}>);

    expect(screen.getByRole('heading', { name: 'Section title' })).toBeInTheDocument();
  });
` : ''}
  it('passes other props to the root element', () => {
    renderWithProviders(<${componentName} data-testid="root">Test</${componentName}>);

    expect(screen.getByTestId('root')).toHaveClass('${className}');
  });
});
`;

  try {
    await fs.writeFile(testFilepath, testTemplate);
    console.log(chalk.green(`✓ Created test file: ${testFilename}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating test file: ${err.message}`));
    return false;
  }
}

// Generate an index.ts file for the component
async function generateIndexFile(componentPath, componentName) {
  const indexFilename = 'index.ts';
  const indexFilepath = path.join(componentPath, indexFilename);

  // Create a simple index file that exports the component and its props type
  const indexContent = `export { default } from './${componentName}';
export type { ${componentName}Props } from './${componentName}';
`;

  try {
    await fs.writeFile(indexFilepath, indexContent);
    console.log(chalk.green(`✓ Created index file: ${indexFilename}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error creating index file: ${err.message}`));
    return false;
  }
}

// ---------------------------
// Standalone Story Generation Logic
// ---------------------------

// Generate a standalone story file for an existing component
async function generateStandaloneStoryFile(args) {
  const componentName = args.component;
  const atomicType = args.type;
  const hasInteractions = !!args.interactions;
  const context = args.context;
  const detailed = !!args.detailed;

  // Validate component type
  if (!config.componentTypes.includes(atomicType)) {
    console.error(chalk.red(`Error: Invalid component type "${atomicType}".`));
    console.log(chalk.yellow(`Valid types: ${config.componentTypes.join(', ')}`));
    return false;
  }

  if (context && context !== 'portfolio') {
    console.error(chalk.red(`Error: Unknown context "${context}".`));
    console.log(chalk.yellow('Valid contexts: portfolio'));
    return false;
  }

  // Determine paths
  const pluralType = config.atomicTypesToFolders[atomicType] || atomicType;
  const storyLayer = config.atomicTypesToStoryLayers[atomicType];
  const baseComponentName = componentName;

  // Use the provided path or construct from atomic type with component subdirectory
  const componentBasePath = args.path ||
    path.join(process.cwd(), 'src/components', pluralType);
  const componentPath = path.join(componentBasePath, baseComponentName);

  // Check if component exists
  const tsxPath = path.join(componentPath, `${baseComponentName}.tsx`);
  if (!(await fileExists(tsxPath))) {
    console.error(chalk.red(`Error: Component ${baseComponentName} not found at ${tsxPath}`));
    return false;
  }

  // Also check for CSS file, and if not found, generate it
  const cssPath = path.join(componentPath, `${baseComponentName}.css`);
  if (!(await fileExists(cssPath)) && config.createCss) {
    console.log(chalk.yellow(`CSS file not found for ${baseComponentName}, generating one...`));
    await generateCssFile(baseComponentName, atomicType, componentPath);
  }

  // Also check for index file, and if not found, generate it
  const indexTsPath = path.join(componentPath, 'index.ts');
  if (!(await fileExists(indexTsPath)) && config.createIndex) {
    console.log(chalk.yellow(`Index file not found for ${baseComponentName}, generating one...`));
    await generateIndexFile(componentPath, baseComponentName);
  }

  // The story goes next to the component so its relative import resolves
  const storyBaseName = `${baseComponentName}.stories.tsx`;
  const storyPath = path.join(componentPath, storyBaseName);

  // Create imports section
  let imports = `import type { Meta, StoryObj } from '@storybook/react-vite';`;

  // Add interaction test imports if needed
  if (hasInteractions) {
    imports += `
import { expect, userEvent, within } from 'storybook/test';`;
  }

  // Add context imports if needed
  if (context === 'portfolio') {
    imports += `
import { PortfolioProvider } from '@context/PortfolioContext';`;
  }

  imports += `
import ${baseComponentName} from './${baseComponentName}';`;

  // Create story configuration
  const storyConfig = `const meta = {
  title: '${storyLayer}/${baseComponentName}',
  component: ${baseComponentName},
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${baseComponentName} component description goes here'
      }
    }
  },
  argTypes: {
    // Define your argTypes here
  },
  args: {
    // Props every story shares. Required props must be given here.
  }
} satisfies Meta<typeof ${baseComponentName}>;
export default meta;

type Story = StoryObj<typeof meta>;`;

  // Create story examples
  let stories = `export const Default: Story = {};

export const Variant: Story = {
  args: {
    // Variant props
  }
};`;

  // Add interaction tests if requested
  if (hasInteractions) {
    stories += `

export const WithInteractions: Story = {
  args: {
    // Add props for interaction test
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Replace with a real interaction, for example:
    //   await userEvent.click(canvas.getByRole('button'));
    //   await expect(args.onClick).toHaveBeenCalledTimes(1);
    await userEvent.tab();
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
  }
};`;
  }

  // Add context decorator if requested
  if (context === 'portfolio') {
    stories += `

// With Portfolio Context
export const WithPortfolioContext: Story = {
  args: {
    // Props for context example
  },
  decorators: [
    (Story) => (
      <PortfolioProvider>
        <Story />
      </PortfolioProvider>
    ),
  ],
};`;
  }

  // Add detailed documentation sections if requested
  if (detailed) {
    stories += `

/**
 * ## Component Usage
 *
 * \`\`\`tsx
 * import ${baseComponentName} from '@${pluralType}/${baseComponentName}';
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
export const EdgeCase: Story = {
  args: {
    // Edge case props
  }
};`;
  }

  // Add responsive testing examples if it's a UI component
  if (atomicType === 'atom' || atomicType === 'molecule') {
    stories += `

// Responsive behavior example
export const Responsive: Story = {
  args: {
    // Props for demonstrating responsive behavior
  },
  globals: { viewport: { value: 'mobile1', isRotated: false } }
};`;
  }

  // Combine all content
  const finalStoryContent = imports + '\n\n' + storyConfig + '\n\n' + stories + '\n';

  // Write the story file
  try {
    await fs.writeFile(storyPath, finalStoryContent);
    console.log(chalk.green(`✅ Successfully generated story at ${storyPath}`));
    console.log(chalk.gray(`Options applied: ${Object.keys(args).filter(key => key !== 'component' && key !== 'type' && key !== 'path').join(', ') || 'none'}`));
    return true;
  } catch (err) {
    console.error(chalk.red(`Error writing story file: ${err.message}`));
    return false;
  }
}

// ---------------------------
// Helper Functions
// ---------------------------

// Check if a file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Print usage
function printUsage() {
  console.log(`Component and Story Generator

Usage:
  yarn generate:component --name=<Name> [--type=atom|molecule|organism|layout] [--dir=<parent dir>] [--files=all|tsx|css|story|test|index]
  yarn generate:component component --name=<Name> [same options]
  yarn generate:component story --component=<Name> --type=<type> [--interactions] [--context=portfolio] [--detailed] [--path=<parent dir>]

Components are written in TypeScript to src/components/<layer>/<Name>/.
Atoms and molecules are generated provider-free (an \`animated\` prop and @utils/motion);
organisms and layout components read the animation context and pass it down.
Existing files are overwritten without asking.`);
}

// ---------------------------
// Main Functions
// ---------------------------

// Generate a component with all associated files
async function generateComponent(args) {
  const componentName = args.name;
  const componentType = args.type || config.defaultComponentType;
  const folderName = config.atomicTypesToFolders[componentType] || componentType;
  
  // Use the provided directory or construct the default path with a subdirectory for the component
  const baseDir = args.dir || `${config.defaultComponentDir}/${folderName}`;
  const componentDir = `${baseDir}/${componentName}`;
  
  const createFiles = args.files || 'all'; // all, tsx, css, story, test, index
  
  console.log(chalk.blue.bold('Component Generator'));
  console.log(chalk.gray(`Creating ${componentType} component: ${componentName}`));
  
  // Validate component type
  if (!config.componentTypes.includes(componentType)) {
    console.error(chalk.red(`Error: Invalid component type "${componentType}".`));
    console.log(chalk.yellow(`Valid types: ${config.componentTypes.join(', ')}`));
    return false;
  }
  
  // 1. Create component directory
  const componentPath = path.join(process.cwd(), componentDir);
  const dirCreated = await ensureDirectoryExists(componentPath);
  if (!dirCreated) return false;
  
  // 2. Create component files
  let success = true;
  
  if (createFiles === 'all' || createFiles === 'tsx') {
    success = await generateComponentFile(componentPath, componentName, componentType);
    if (!success) return false;
  }
  
  if (config.createCss && (createFiles === 'all' || createFiles === 'css')) {
    success = await generateCssFile(componentName, componentType, componentPath);
    if (!success) console.log(chalk.yellow('⚠ CSS file creation failed, but continuing...'));
  }
  
  if (config.createStory && (createFiles === 'all' || createFiles === 'story')) {
    success = await generateComponentStoryFile(componentPath, componentName, componentType);
    if (!success) console.log(chalk.yellow('⚠ Story file creation failed, but continuing...'));
  }
  
  if (config.createTest && (createFiles === 'all' || createFiles === 'test')) {
    success = await generateTestFile(componentPath, componentName, componentType);
    if (!success) console.log(chalk.yellow('⚠ Test file creation failed, but continuing...'));
  }
  
  if (config.createIndex && (createFiles === 'all' || createFiles === 'index')) {
    success = await generateIndexFile(componentPath, componentName);
    if (!success) console.log(chalk.yellow('⚠ Index file creation failed, but continuing...'));
  }
  
  console.log(chalk.green.bold(`✓ Component ${componentName} created successfully!`));
  console.log(chalk.gray(`Location: ${componentPath}`));
  
  return true;
}

// Main function
async function main() {
  const cmdArgs = process.argv.slice(2);
  const args = parseArgs(cmdArgs);

  if (args.help) {
    printUsage();
    return true;
  }
  
  // Check for command (first arg that doesn't start with --)
  const command = cmdArgs.find(arg => !arg.startsWith('--'));
  const isSimpleMode = !command || (command.startsWith('--'));
  
  if (isSimpleMode) {
    // Simple mode - just generate everything with one command
    if (!args.name && !args.component) {
      console.error(chalk.red('Error: Component name is required.'));
      console.log(chalk.yellow('Usage: yarn generate:component --name=MyComponent --type=atom'));
      process.exit(1);
    }

    // Use either name or component parameter
    const componentName = args.name || args.component;
    const componentType = args.type || config.defaultComponentType;
    
    // Make sure both args are available for component generation
    args.name = componentName;
    args.type = componentType;
    
    // Generate component first
    if (!(await generateComponent(args))) process.exit(1);
    
    console.log(chalk.blue('\nComponent generation complete!\n'));
    
    return true;
  }
  
  // Legacy mode with subcommands
  if (command === 'component') {
    if (!args.name) {
      console.error(chalk.red('Error: Component name is required.'));
      console.log(chalk.yellow('Usage: yarn generate:component component --name=MyComponent --type=atom'));
      process.exit(1);
    }
    
    if (!(await generateComponent(args))) process.exit(1);
  } 
  else if (command === 'story') {
    if (!args.component) {
      console.error(chalk.red('Error: Component name is required.'));
      console.log(chalk.yellow('Usage: yarn generate:component story --component=MyComponent --type=atom'));
      process.exit(1);
    }
    
    if (!args.type) {
      console.error(chalk.red('Error: Component type is required.'));
      console.log(chalk.yellow('Usage: yarn generate:component story --component=MyComponent --type=atom'));
      process.exit(1);
    }
    
    if (!(await generateStandaloneStoryFile(args))) process.exit(1);
  }
  else {
    console.error(chalk.red(`Error: Unknown command "${command}"`));
    console.log(chalk.yellow('Usage: yarn generate:component --name=MyComponent --type=atom'));
    console.log(chalk.yellow('Or use subcommands: yarn generate:component component|story [options] (--help for all options)'));
    process.exit(1);
  }
}

// Run the script
main().catch(err => {
  console.error(chalk.red(`Error: ${err.message}`));
  process.exit(1);
});
