import TerminalPrompt from './TerminalPrompt';

export default {
  title: 'atoms/TerminalPrompt',
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
};

const Template = (args) => (
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

export const Default = Template.bind({});
Default.args = {
  text: 'user@portfolio:~$',
  variant: 'default',
  mobile: false
};

export const Security = Template.bind({});
Security.args = {
  text: 'security@system:~$',
  variant: 'security',
  mobile: false
};

export const Terminal = Template.bind({});
Terminal.args = {
  text: 'dev@localhost:~$',
  variant: 'terminal',
  mobile: false
};

export const Mobile = Template.bind({});
Mobile.args = {
  text: 'user@portfolio:~$',
  variant: 'default',
  mobile: true
};

export const SecurityMobile = Template.bind({});
SecurityMobile.args = {
  text: 'security@system:~$',
  variant: 'security',
  mobile: true
};

export const CustomPrompts = () => (
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

export const Playground = Template.bind({});
Playground.args = {
  text: 'user@portfolio:~$',
  variant: 'default',
  mobile: false
};