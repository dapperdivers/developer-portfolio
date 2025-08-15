import React from 'react';
import ConsoleHeader from './ConsoleHeader';

const meta = {
  title: 'organisms/ConsoleHeader',
  component: ConsoleHeader,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Terminal-style header organism built with atomic design principles',
    docs: {
      description: {
        component: 'The ConsoleHeader organism creates a complete terminal interface using TerminalTitleBar and TerminalCommandLine molecules. It features realistic terminal aesthetics, interactive command input, and cybersecurity-themed variants. Now properly structured according to atomic design principles for better maintainability and reusability.'
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
    title: {
      control: 'text',
      description: 'Custom title for the terminal window',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined (auto-generated from variant)' },
      }
    },
    interactiveControls: {
      control: 'boolean',
      description: 'Whether terminal controls are interactive',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    },
    onCommand: {
      action: 'command-executed',
      description: 'Callback function when command is executed',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: 'undefined' },
      }
    },
    onCloseClick: {
      action: 'close-clicked',
      description: 'Callback for close button click',
    },
    onMinimizeClick: {
      action: 'minimize-clicked',
      description: 'Callback for minimize button click',
    },
    onMaximizeClick: {
      action: 'maximize-clicked',
      description: 'Callback for maximize button click',
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

// Interactive Console - Enhanced with new atomic structure
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
          Interactive Console Organism - Built with Atomic Design
        </h4>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
          This organism combines TerminalTitleBar and TerminalCommandLine molecules for a complete terminal experience.
        </p>
      </div>
      <ConsoleHeader {...args} />
    </ConsoleContainer>
  )
};

// Interactive with Controls
export const InteractiveWithControls = {
  args: {
    prompt: 'admin@server:~#',
    interactive: true,
    interactiveControls: true,
    placeholder: 'Enter admin commands...',
    variant: 'security',
    showHint: true,
    hintText: 'Full interactive terminal',
    title: 'Admin Terminal'
  },
  render: (args) => (
    <ConsoleContainer>
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
          Fully Interactive Terminal
        </h4>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
          Interactive terminal with clickable controls and custom title.
        </p>
      </div>
      <ConsoleHeader {...args} />
    </ConsoleContainer>
  )
};

// Component Architecture Demo
export const AtomicDesignStructure = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>
          Atomic Design Structure
        </h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
          The ConsoleHeader organism is now properly structured using atomic design principles:
        </p>
        
        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ padding: '1rem', background: 'var(--color-navy)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ color: 'var(--color-cyan)', marginBottom: '0.5rem' }}>🔬 ATOMS</h4>
            <ul style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', paddingLeft: '1rem' }}>
              <li>TerminalControls - Window control buttons</li>
              <li>TerminalCursor - Blinking cursor element</li>
              <li>TerminalPrompt - Command prompt text</li>
            </ul>
          </div>
          
          <div style={{ padding: '1rem', background: 'var(--color-navy)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ color: 'var(--color-cyan)', marginBottom: '0.5rem' }}>🧬 MOLECULES</h4>
            <ul style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', paddingLeft: '1rem' }}>
              <li>TerminalTitleBar - Controls + Title</li>
              <li>TerminalCommandLine - Prompt + Command/Input + Cursor</li>
            </ul>
          </div>
          
          <div style={{ padding: '1rem', background: 'var(--color-navy)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ color: 'var(--color-cyan)', marginBottom: '0.5rem' }}>🏗️ ORGANISM</h4>
            <ul style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', paddingLeft: '1rem' }}>
              <li>ConsoleHeader - Complete terminal interface</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
          Example: Security Terminal Organism
        </h4>
        <ConsoleContainer>
          <ConsoleHeader 
            prompt="security@demo:~$"
            interactive={true}
            interactiveControls={true}
            placeholder="Demonstrating atomic design structure..."
            variant="security"
            title="Security Console"
            showHint={true}
            hintText="Built with atomic design!"
          />
        </ConsoleContainer>
      </div>
    </div>
  )
};

// Playground
export const Playground = {
  args: {
    prompt: 'user@portfolio:~$',
    command: 'ls -la',
    interactive: false,
    interactiveControls: false,
    showCursor: true,
    variant: 'terminal',
    shadow: true,
    showHint: true,
    hintText: 'Type a command...',
    title: '',
    placeholder: ''
  },
  render: (args) => (
    <ConsoleContainer>
      <ConsoleHeader {...args} />
    </ConsoleContainer>
  )
};