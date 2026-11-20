import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite';
import TerminalPrompt from './TerminalPrompt';
import type { TerminalPromptProps } from './TerminalPrompt';

const meta = {
  title: 'Atoms/TerminalPrompt',
  component: TerminalPrompt,
  parameters: { 
    layout: 'centered',
    docs: {
      description: {
        component: 'A terminal command prompt component with cybersecurity theming and mobile optimization. Displays user@host:path$ style prompts with variant-specific styling.'
      }
    }
  },
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'Prompt text to display'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'security', 'terminal'],
      description: 'Visual variant of the prompt'
    },
    mobile: {
      control: { type: 'boolean' },
      description: 'Whether to use mobile-optimized version'
    }
  }
} satisfies Meta<typeof TerminalPrompt>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: TerminalPromptProps) => (
  <div style={{
    padding: '2rem',
    background: 'var(--color-navy)',
    borderRadius: '8px',
    fontFamily: 'var(--font-family-jetbrains)',
    color: 'var(--color-text)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }}>
    <TerminalPrompt {...args} />
    <span style={{ color: 'var(--color-text-secondary)' }}>ls -la</span>
  </div>
);

export const Default: Story = {
  render: Template,
  args: {
    text: 'user@portfolio:~$',
    variant: 'default',
    mobile: false
  },
};

export const Security: Story = {
  render: Template,
  args: {
    text: 'security@system:~$',
    variant: 'security',
    mobile: false
  },
};

export const Terminal: Story = {
  render: Template,
  args: {
    text: 'dev@localhost:~$',
    variant: 'terminal',
    mobile: false
  },
};

export const Mobile: Story = {
  render: Template,
  args: {
    text: 'user@portfolio:~$',
    variant: 'default',
    mobile: true
  },
};

export const SecurityMobile: Story = {
  render: Template,
  args: {
    text: 'security@system:~$',
    variant: 'security',
    mobile: true
  },
};

export const CustomPrompts: StoryFn = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem',
    background: 'var(--color-navy)',
    borderRadius: '8px',
    fontFamily: 'var(--font-family-jetbrains)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <TerminalPrompt text="root@server:~#" variant="security" />
      <span style={{ color: 'var(--color-text)' }}>systemctl status nginx</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <TerminalPrompt text="admin@database:~$" variant="terminal" />
      <span style={{ color: 'var(--color-text)' }}>mysql -u admin -p</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <TerminalPrompt text="hacker@target:~#" variant="security" />
      <span style={{ color: 'var(--color-text)' }}>nmap -sS target.com</span>
    </div>
  </div>
);
