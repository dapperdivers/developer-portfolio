import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

/**
 * # Developer Portfolio Storybook Introduction
 * 
 * This Storybook serves as a component library and development environment for the
 * Developer Portfolio project. It provides an organized showcase of all UI components
 * and patterns used throughout the application.
 * 
 * ## Storybook Organization in This Project
 * 
 * Our stories follow a standardized structure based on Atomic Design principles:
 * - **Atoms**: Basic UI elements like buttons, inputs, and cards
 * - **Molecules**: Combinations of atoms forming more complex components
 * - **Organisms**: Complex components composed of molecules and atoms
 * - **Layout**: Components that define page layouts and structure
 * 
 * ## How Stories Are Organized
 * 
 * Stories are co-located with their components following our project structure:
 * ```
 * src/components/[type]/[ComponentName]/
 * ├── [ComponentName].jsx       # Component implementation
 * ├── [ComponentName].css       # Component styles
 * ├── [ComponentName].stories.jsx # Storybook stories
 * ├── [ComponentName].test.jsx  # Component tests
 * └── index.js                  # Re-exports the component
 * ```
 * 
 * ## Creating New Stories
 * 
 * We have a dedicated script for generating stories:
 * ```
 * yarn generate-story --component=ComponentName --type=atom [options]
 * ```
 * 
 * Options include:
 * - `--interactions`: Add interaction tests
 * - `--context`: Add context support (portfolio, theme)
 * - `--detailed`: Add detailed documentation
 * - `--tsx`: Generate TypeScript story
 * 
 * ## Using Atom Components for Theming
 * 
 * The Developer Portfolio includes several specialized components 
 * that can be combined to create immersive, tech-themed backgrounds and UI elements:
 * - **MatrixBackground**: Creates a Matrix-style falling code animation
 * - **BinaryStream**: Displays flowing binary data for a cyber aesthetic
 * - **CodeSnippet**: Shows formatted code blocks with syntax highlighting
 * - **TerminalControls**: Terminal-style UI controls for a command-line feel
 * - **ConsoleHeader**: Header styled like a terminal/console window
 * 
 * These components can be layered to create dynamic, interactive backgrounds
 * that enhance the tech/hacker aesthetic of the portfolio.
 */

interface IntroductionProps {}

const Introduction: React.FC<IntroductionProps> = () => (
  <div style={{ 
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333'
  }}>
    <h1 style={{ color: '#0062cc', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
      Developer Portfolio Storybook Guide
    </h1>
    
    <p>
      Welcome to the Storybook for the Developer Portfolio project.
      This guide explains how we use Storybook to develop, document, and test our components.
    </p>
    
    <h2 style={{ marginTop: '24px', color: '#0062cc' }}>Storybook Structure</h2>
    <p>
      Our stories are organized following the Atomic Design methodology:
    </p>
    <ul style={{ lineHeight: '1.6' }}>
      <li><strong>Atoms</strong> - Basic UI elements like buttons, inputs, icons</li>
      <li><strong>Molecules</strong> - Components combining multiple atoms</li>
      <li><strong>Organisms</strong> - Complex UI sections combining molecules and atoms</li>
      <li><strong>Layout</strong> - Page layouts, grids, and container components</li>
    </ul>
    
    <h2 style={{ marginTop: '24px', color: '#0062cc' }}>Story Authoring Conventions</h2>
    <p>
      Each story should follow these conventions:
    </p>
    <ul style={{ lineHeight: '1.6' }}>
      <li>Use the autodocs tag for automatic documentation generation</li>
      <li>Include multiple story variants showing different component states</li>
      <li>Provide JSDoc comments for props and component descriptions</li>
      <li>Include controls for interactive testing</li>
      <li>Add interaction tests for critical user flows</li>
    </ul>
    
    <div style={{ 
      background: '#f5f5f5', 
      padding: '15px', 
      borderRadius: '5px',
      marginTop: '20px',
      borderLeft: '4px solid #0062cc'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Story File Template</h3>
      <pre style={{ overflow: 'auto', background: '#f8f8f8', padding: '10px', margin: '0', fontSize: '14px' }}>
{`import React from 'react';
import ComponentName from './ComponentName';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Category/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // Define control types for props
  },
  parameters: {
    // Additional configuration
  }
};

export const Default = {
  args: {
    // Default props
  }
};

export const Variant = {
  args: {
    // Variant props
  }
};

// Interaction tests
export const WithInteractions = {
  play: async ({ canvasElement }) => {
    // Test interactions
  }
};`}
      </pre>
    </div>
    
    <h2 style={{ marginTop: '24px', color: '#0062cc' }}>Creating Tech-Themed Backgrounds</h2>
    <p>
      The portfolio comes with several atom components specifically designed for creating engaging, 
      tech-themed backgrounds and UI elements:
    </p>
    <ul style={{ lineHeight: '1.6' }}>
      <li><strong>MatrixBackground</strong> - Creates a Matrix-style raining code effect</li>
      <li><strong>BinaryStream</strong> - Displays animated binary data streams</li>
      <li><strong>CodeSnippet</strong> - Shows code with syntax highlighting</li>
      <li><strong>TerminalControls</strong> - Terminal-style UI controls</li>
      <li><strong>ConsoleHeader</strong> - Headers styled like a terminal window</li>
    </ul>
    
    <div style={{ 
      background: '#f0f8ff', 
      padding: '15px', 
      borderRadius: '5px',
      marginTop: '20px',
      borderLeft: '4px solid #0062cc'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Background Component Example</h3>
      <p style={{ margin: '0 0 10px 0' }}>Here's how you might combine these components:</p>
      <pre style={{ overflow: 'auto', background: '#f8f8f8', padding: '10px', margin: '0', fontSize: '14px' }}>
{`import React from 'react';
import MatrixBackground from '@components/decorations/MatrixBackground';
import ConsoleHeader from '@atoms/ConsoleHeader';
import CodeSnippet from '@atoms/CodeSnippet';

const HackerThemedSection = ({ children }) => (
  <div className="hacker-section">
    <MatrixBackground opacity={0.15} speed={1.5} />
    <div className="content-container">
      <ConsoleHeader title="Portfolio::MainSection" />
      <div className="content">
        {children}
      </div>
      <CodeSnippet language="javascript" code="console.log('Portfolio loaded successfully');" />
    </div>
  </div>
);`}
      </pre>
    </div>
    
    <h2 style={{ marginTop: '24px', color: '#0062cc' }}>Generating Stories</h2>
    <div style={{ 
      background: '#e6f3ff', 
      padding: '15px', 
      borderRadius: '5px',
      marginTop: '20px',
      borderLeft: '4px solid #0062cc'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Story Generation Command</h3>
      <p style={{ margin: '0 0 10px 0' }}>We have a dedicated script to generate new stories:</p>
      <pre style={{ overflow: 'auto', background: '#f8f8f8', padding: '10px', margin: '0', fontSize: '14px' }}>
{`yarn generate-story --component=Button --type=atom --interactions --detailed`}
      </pre>
    </div>
    
    <h2 style={{ marginTop: '24px', color: '#0062cc' }}>Storybook Development Commands</h2>
    <ul style={{ lineHeight: '1.6' }}>
      <li><code>yarn storybook</code> - Start Storybook development server (port 7000)</li>
      <li><code>yarn build-storybook</code> - Build a static version for sharing</li>
    </ul>
  </div>
);

const meta: Meta<typeof Introduction> = {
  title: 'Introduction',
  component: Introduction,
  parameters: {
    options: {
      showPanel: false,
    },
  }
};

export default meta;
type Story = StoryObj<typeof Introduction>;

export const Main: Story = {
  render: () => <Introduction />
}; 