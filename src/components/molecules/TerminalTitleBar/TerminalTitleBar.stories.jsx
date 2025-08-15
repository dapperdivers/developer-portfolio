import TerminalTitleBar from './TerminalTitleBar';

export default {
  title: 'molecules/TerminalTitleBar',
  component: TerminalTitleBar,
  parameters: { 
    layout: 'centered',
    docs: {
      description: {
        component: 'A terminal window title bar molecule that combines TerminalControls with a title display. Features cybersecurity-themed variants and optional interactivity.'
      }
    }
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Custom title text (defaults based on variant)'
    },
    variant: {
      control: { type: 'select' },
      options: ['kitty', 'security', 'hacker'],
      description: 'Visual variant of the title bar'
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Whether the controls are interactive'
    },
    onCloseClick: {
      action: 'close-clicked',
      description: 'Callback for close button click'
    },
    onMinimizeClick: {
      action: 'minimize-clicked',
      description: 'Callback for minimize button click'
    },
    onMaximizeClick: {
      action: 'maximize-clicked',
      description: 'Callback for maximize button click'
    }
  }
};

const Template = (args) => (
  <div style={{
    width: '600px',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    overflow: 'hidden',
    background: 'var(--color-background)'
  }}>
    <TerminalTitleBar {...args} />
    <div style={{
      padding: '1rem',
      background: 'var(--color-navy)',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-family-jetbrains)',
      fontSize: '0.875rem'
    }}>
      Terminal content would go here...
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  variant: 'kitty',
  interactive: false
};

export const Security = Template.bind({});
Security.args = {
  variant: 'security',
  interactive: false
};

export const Hacker = Template.bind({});
Hacker.args = {
  variant: 'hacker',
  interactive: false
};

export const Interactive = Template.bind({});
Interactive.args = {
  variant: 'security',
  interactive: true
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  title: 'Custom Terminal',
  variant: 'kitty',
  interactive: true
};

export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Kitty Terminal</h4>
      <div style={{
        width: '600px',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <TerminalTitleBar variant="kitty" />
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Security Terminal</h4>
      <div style={{
        width: '600px',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <TerminalTitleBar variant="security" />
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Hacker Terminal</h4>
      <div style={{
        width: '600px',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <TerminalTitleBar variant="hacker" />
      </div>
    </div>
  </div>
);

export const Playground = Template.bind({});
Playground.args = {
  variant: 'security',
  interactive: true
};