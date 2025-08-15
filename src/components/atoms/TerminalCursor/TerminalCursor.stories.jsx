import TerminalCursor from './TerminalCursor';

export default {
  title: 'atoms/TerminalCursor',
  component: TerminalCursor,
  parameters: { 
    layout: 'centered',
    docs: {
      description: {
        component: 'A blinking terminal cursor component with enhanced focus states and cybersecurity theming. Features optimized animations that respect user motion preferences.'
      }
    }
  },
  argTypes: {
    show: {
      control: { type: 'boolean' },
      description: 'Whether to display the cursor'
    },
    focused: {
      control: { type: 'boolean' },
      description: 'Whether the cursor is in focused state'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'security', 'terminal'],
      description: 'Visual variant of the cursor'
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
    <span>user@terminal:~$</span>
    <span>command</span>
    <TerminalCursor {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  show: true,
  focused: false,
  variant: 'default'
};

export const Focused = Template.bind({});
Focused.args = {
  show: true,
  focused: true,
  variant: 'default'
};

export const Security = Template.bind({});
Security.args = {
  show: true,
  focused: false,
  variant: 'security'
};

export const SecurityFocused = Template.bind({});
SecurityFocused.args = {
  show: true,
  focused: true,
  variant: 'security'
};

export const Terminal = Template.bind({});
Terminal.args = {
  show: true,
  focused: false,
  variant: 'terminal'
};

export const Hidden = Template.bind({});
Hidden.args = {
  show: false,
  focused: false,
  variant: 'default'
};

export const Playground = Template.bind({});
Playground.args = {
  show: true,
  focused: false,
  variant: 'default'
};