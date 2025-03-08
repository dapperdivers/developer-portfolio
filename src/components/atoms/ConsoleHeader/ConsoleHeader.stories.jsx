import React from 'react';
import ConsoleHeader from './ConsoleHeader';

const meta = {
  title: 'Atoms/ConsoleHeader',
  component: ConsoleHeader,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Terminal-style header with interactive command prompt',
    docs: {
      description: {
        component: 'The ConsoleHeader component creates a realistic terminal interface with customizable prompts, commands, and visual styles. It features macOS-style window controls, blinking cursor animations, and security-themed variants. The component is responsive, accessible, and respects reduced motion preferences. Perfect for terminal-based interfaces, code examples, and cybersecurity-themed displays.'
      }
    }
  },
  argTypes: {
    prompt: {
      control: 'text',
      description: 'Command prompt text displayed before the command',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"user@portfolio:~$"' },
      }
    },
    command: {
      control: 'text',
      description: 'Command text to display after the prompt',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      }
    },
    showCursor: {
      control: 'boolean',
      description: 'Whether to show the animated blinking cursor',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      }
    },
    variant: {
      control: 'select',
      options: ['terminal', 'security', 'hacker'],
      description: 'Visual style variant of the console',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"terminal"' },
      }
    },
    shadow: {
      control: 'boolean',
      description: 'Whether to show a drop shadow effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      }
    },
    id: {
      control: 'text',
      description: 'Unique ID for ARIA relationships',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      }
    },
    ariaDescription: {
      control: 'text',
      description: 'Custom description for screen readers',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      }
    }
  }
};

export default meta;

// Container component for consistent display
const ConsoleContainer = ({ children, background = 'var(--color-background)' }) => (
  <div style={{
    padding: '2rem',
    background,
    borderRadius: '8px',
    margin: '1rem 0',
    maxWidth: '800px'
  }}>
    {children}
  </div>
);

// Default console header
export const Default = {
  args: {
    prompt: 'user@portfolio:~$',
    command: 'ls -la',
    showCursor: true
  },
  render: (args) => (
    <ConsoleContainer>
      <ConsoleHeader {...args} />
    </ConsoleContainer>
  )
};

// Visual Variants
export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Terminal Style</h4>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="user@terminal:~$" 
            command="vim config.js"
            variant="terminal"
          />
        </ConsoleContainer>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Security Style</h4>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="security@system:~$" 
            command="scan --security-level high"
            variant="security"
          />
        </ConsoleContainer>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Hacker Style</h4>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="h4ck3r@system:~#" 
            command="crack --target system"
            variant="hacker"
          />
        </ConsoleContainer>
      </div>
    </div>
  )
};

// Command Examples
export const CommandExamples = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Package Management</h4>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="dev@project:~$" 
            command="npm install @types/react --save-dev"
          />
        </ConsoleContainer>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Git Operations</h4>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="git@repo:~$" 
            command="git checkout -b feature/new-console"
            variant="security"
          />
        </ConsoleContainer>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Docker Commands</h4>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="docker@container:~$" 
            command="docker-compose up -d --build --force-recreate"
            variant="terminal"
          />
        </ConsoleContainer>
      </div>
    </div>
  )
};

// Cursor States
export const CursorStates = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>With Cursor</h4>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="user@system:~$" 
            command="echo 'Hello World'"
            showCursor={true}
          />
        </ConsoleContainer>
      </div>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Without Cursor</h4>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="user@system:~$" 
            command="echo 'Hello World'"
            showCursor={false}
          />
        </ConsoleContainer>
      </div>
    </div>
  )
};

// Responsive Example
export const Responsive = {
  render: () => (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Desktop View</h3>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="user@desktop:~$" 
            command="npm run build"
            variant="security"
          />
        </ConsoleContainer>
      </div>
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Mobile View</h3>
        <ConsoleContainer>
          <div style={{ maxWidth: '320px' }}>
            <ConsoleHeader 
              prompt="user:~$" 
              command="npm run build"
              variant="security"
            />
          </div>
        </ConsoleContainer>
      </div>
    </div>
  )
};

// Accessibility Example
export const Accessibility = {
  render: () => (
    <ConsoleContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>With Custom ARIA Description</h4>
          <ConsoleHeader 
            prompt="security@system:~$" 
            command="analyze --threats"
            variant="security"
            ariaDescription="Security console showing threat analysis command"
            id="security-console"
          />
        </div>
      </div>
    </ConsoleContainer>
  )
};

// Custom Styling
export const CustomStyling = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ConsoleContainer background="var(--color-background-alt)">
        <ConsoleHeader 
          prompt="custom@theme:~$" 
          command="style --theme dark"
          className="custom-console-dark"
          variant="security"
        />
      </ConsoleContainer>
      <ConsoleContainer background="var(--color-background-light)">
        <ConsoleHeader 
          prompt="custom@theme:~$" 
          command="style --theme light"
          className="custom-console-light"
          variant="terminal"
        />
      </ConsoleContainer>
    </div>
  )
};
