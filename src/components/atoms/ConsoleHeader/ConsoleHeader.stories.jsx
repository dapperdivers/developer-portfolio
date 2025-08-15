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
    },
    interactive: {
      control: 'boolean',
      description: 'Enable interactive input mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for interactive input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      }
    },
    showHint: {
      control: 'boolean',
      description: 'Show interactive hint on hover',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      }
    },
    hintText: {
      control: 'text',
      description: 'Custom hint text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Type a command..."' },
      }
    },
    onCommand: {
      action: 'command-executed',
      description: 'Callback function when command is executed',
      table: {
        type: { summary: 'function' },
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

// Interactive Console - New Enhanced Features
export const InteractiveBasic = {
  args: {
    prompt: 'user@portfolio:~$',
    interactive: true,
    placeholder: 'Try typing: help, ls, or pwd',
    variant: 'security',
    showHint: true,
    hintText: 'Type a command and press Enter'
  },
  render: (args) => (
    <ConsoleContainer>
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          Interactive Console - Hover and Click to Interact
        </h4>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
          This console features enhanced hover effects, interactive hints, and responsive cursor animations.
        </p>
      </div>
      <ConsoleHeader {...args} />
    </ConsoleContainer>
  )
};

// Interactive States Showcase
export const InteractiveStates = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
          Security Variant - Enhanced Glow Effects
        </h4>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="security@terminal:~$"
            interactive={true}
            placeholder="Enter security command..."
            variant="security"
            showHint={true}
            hintText="Security console ready"
            onCommand={(cmd) => console.log('Security command:', cmd)}
          />
        </ConsoleContainer>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
          Terminal Variant - Classic Terminal Feel
        </h4>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="dev@localhost:~$"
            interactive={true}
            placeholder="npm, git, docker commands..."
            variant="terminal"
            showHint={true}
            hintText="Ready for your command"
            onCommand={(cmd) => console.log('Terminal command:', cmd)}
          />
        </ConsoleContainer>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
          Custom Hint Text Example
        </h4>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="admin@server:~#"
            interactive={true}
            placeholder="systemctl, service, ps..."
            variant="security"
            showHint={true}
            hintText="Admin commands only"
            onCommand={(cmd) => console.log('Admin command:', cmd)}
          />
        </ConsoleContainer>
      </div>
    </div>
  )
};

// Hover and Focus Demonstration
export const HoverFocusDemo = {
  render: () => (
    <ConsoleContainer>
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
          Enhanced Interaction Feedback
        </h4>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
          <strong>Try these interactions:</strong>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            <li>Hover over the console to see the breathing effect and hint</li>
            <li>Click anywhere on the console to focus the input</li>
            <li>Start typing to see enhanced cursor animations</li>
            <li>Watch the glow effects when focused vs unfocused</li>
          </ul>
        </div>
      </div>
      
      <ConsoleHeader 
        prompt="demo@interactive:~$"
        interactive={true}
        placeholder="Experience the enhanced interactivity..."
        variant="security"
        showHint={true}
        hintText="Click me and start typing!"
        onCommand={(cmd) => {
          console.log('Demo command executed:', cmd);
          alert(`Command executed: ${cmd}`);
        }}
      />
    </ConsoleContainer>
  )
};

// Accessibility and Reduced Motion
export const AccessibilityEnhanced = {
  render: () => (
    <ConsoleContainer>
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
          Accessibility Features
        </h4>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
          <p><strong>Enhanced Accessibility:</strong></p>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            <li>Focus outlines for keyboard navigation</li>
            <li>Screen reader optimized ARIA labels</li>
            <li>Respects prefers-reduced-motion settings</li>
            <li>Enhanced focus states for better visibility</li>
            <li>Semantic HTML structure</li>
          </ul>
        </div>
      </div>
      
      <ConsoleHeader 
        prompt="accessible@terminal:~$"
        interactive={true}
        placeholder="Fully accessible console input"
        variant="security"
        showHint={true}
        hintText="Accessible by design"
        ariaDescription="Enhanced accessible terminal console with interactive input and visual feedback"
        id="accessible-console"
        onCommand={(cmd) => console.log('Accessible command:', cmd)}
      />
    </ConsoleContainer>
  )
};
