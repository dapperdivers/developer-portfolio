import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import TerminalTitleBar from './TerminalTitleBar';

const meta = {
  title: 'Molecules/TerminalTitleBar',
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
    animated: { control: 'boolean', description: 'Play animations; reduced motion always turns them off' },
    title: {
      control: { type: 'text' },
      description: 'Custom title text (defaults based on variant)'
    },
    variant: {
      control: { type: 'select' },
      options: ['kitty', 'terminal', 'security', 'hacker'],
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
  },
  render: (args) => (
    <div style={{
      width: 'min(100%, 600px)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      background: 'var(--surface-card)'
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
  ),
} satisfies Meta<typeof TerminalTitleBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'kitty',
    interactive: false
  },
};

export const Security: Story = {
  args: {
    variant: 'security',
    interactive: false
  },
};

export const Hacker: Story = {
  args: {
    variant: 'hacker',
    interactive: false
  },
};

export const Interactive: Story = {
  args: {
    variant: 'security',
    interactive: true
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Custom Terminal',
    variant: 'kitty',
    interactive: true
  },
};

export const AllVariants: StoryFn<typeof TerminalTitleBar> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Kitty Terminal</h4>
      <div style={{
        width: 'min(100%, 600px)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden'
      }}>
        <TerminalTitleBar variant="kitty" />
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Security Terminal</h4>
      <div style={{
        width: 'min(100%, 600px)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden'
      }}>
        <TerminalTitleBar variant="security" />
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>Hacker Terminal</h4>
      <div style={{
        width: 'min(100%, 600px)',
        border: '1px solid var(--surface-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden'
      }}>
        <TerminalTitleBar variant="hacker" />
      </div>
    </div>
  </div>
);

export const Playground: Story = {
  args: {
    variant: 'security',
    interactive: true
  },
};