import TerminalCommandLine from './TerminalCommandLine';

export default {
  title: 'molecules/TerminalCommandLine',
  component: TerminalCommandLine,
  parameters: { 
    layout: 'centered',
    docs: {
      description: {
        component: 'A terminal command line molecule that combines TerminalPrompt, command text/input, and TerminalCursor. Features both display and interactive modes with cybersecurity theming.'
      }
    }
  },
  argTypes: {
    prompt: {
      control: { type: 'text' },
      description: 'Command prompt text'
    },
    command: {
      control: { type: 'text' },
      description: 'Command text (for display mode)'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for input mode'
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Whether to show interactive input'
    },
    showCursor: {
      control: { type: 'boolean' },
      description: 'Whether to show the blinking cursor'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'security', 'terminal'],
      description: 'Visual variant of the command line'
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Whether command is being processed'
    },
    onCommand: {
      action: 'command-executed',
      description: 'Callback when command is executed'
    }
  }
};

const Template = (args) => (
  <div style={{
    width: '700px',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    overflow: 'hidden',
    background: 'var(--color-background)'
  }}>
    <TerminalCommandLine {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  prompt: 'user@portfolio:~$',
  command: 'ls -la',
  interactive: false,
  showCursor: true,
  variant: 'default'
};

export const Interactive = Template.bind({});
Interactive.args = {
  prompt: 'user@portfolio:~$',
  placeholder: 'Type a command...',
  interactive: true,
  showCursor: true,
  variant: 'default'
};

export const Security = Template.bind({});
Security.args = {
  prompt: 'security@system:~$',
  command: 'nmap -sS target.com',
  interactive: false,
  showCursor: true,
  variant: 'security'
};

export const SecurityInteractive = Template.bind({});
SecurityInteractive.args = {
  prompt: 'security@system:~$',
  placeholder: 'Enter security command...',
  interactive: true,
  showCursor: true,
  variant: 'security'
};

export const Terminal = Template.bind({});
Terminal.args = {
  prompt: 'dev@localhost:~$',
  command: 'npm run build',
  interactive: false,
  showCursor: true,
  variant: 'terminal'
};

export const TerminalInteractive = Template.bind({});
TerminalInteractive.args = {
  prompt: 'dev@localhost:~$',
  placeholder: 'npm, git, docker commands...',
  interactive: true,
  showCursor: true,
  variant: 'terminal'
};

export const Loading = Template.bind({});
Loading.args = {
  prompt: 'user@portfolio:~$',
  command: 'processing...',
  interactive: false,
  showCursor: true,
  variant: 'security',
  isLoading: true
};

export const NoCursor = Template.bind({});
NoCursor.args = {
  prompt: 'user@portfolio:~$',
  command: 'echo "Hello World"',
  interactive: false,
  showCursor: false,
  variant: 'default'
};

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Default Variant</h4>
      <div style={{
        width: '700px',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <TerminalCommandLine 
          prompt="user@portfolio:~$"
          command="ls -la"
          variant="default"
        />
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Security Variant</h4>
      <div style={{
        width: '700px',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <TerminalCommandLine 
          prompt="security@system:~$"
          command="scan --security-level high"
          variant="security"
        />
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Terminal Variant</h4>
      <div style={{
        width: '700px',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <TerminalCommandLine 
          prompt="dev@localhost:~$"
          command="npm run dev"
          variant="terminal"
        />
      </div>
    </div>
  </div>
);

export const InteractiveDemo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
        Interactive Security Terminal
      </h4>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
        Click on the terminal and try typing commands. Press Enter to execute.
      </p>
      <div style={{
        width: '700px',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <TerminalCommandLine 
          prompt="security@demo:~$"
          placeholder="Try: help, ls, pwd, nmap..."
          interactive={true}
          variant="security"
          onCommand={(cmd) => {
            console.log('Command executed:', cmd);
            alert(`Command executed: ${cmd}`);
          }}
        />
      </div>
    </div>
  </div>
);

export const Playground = Template.bind({});
Playground.args = {
  prompt: 'user@portfolio:~$',
  command: 'ls -la',
  interactive: false,
  showCursor: true,
  variant: 'default',
  isLoading: false
};