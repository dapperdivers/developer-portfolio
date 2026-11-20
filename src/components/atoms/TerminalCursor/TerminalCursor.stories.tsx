import type { Meta, StoryObj } from '@storybook/react-vite';
import TerminalCursor from './TerminalCursor';
import type { TerminalCursorProps } from './TerminalCursor';

const meta = {
  title: 'Atoms/TerminalCursor',
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
    animated: { control: 'boolean', description: 'Play animations; reduced motion always turns them off' },
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
} satisfies Meta<typeof TerminalCursor>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: TerminalCursorProps) => (
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

export const Default: Story = {
  render: Template,
  args: {
    show: true,
    focused: false,
    variant: 'default'
  },
};

export const Focused: Story = {
  render: Template,
  args: {
    show: true,
    focused: true,
    variant: 'default'
  },
};

export const Security: Story = {
  render: Template,
  args: {
    show: true,
    focused: false,
    variant: 'security'
  },
};

export const SecurityFocused: Story = {
  render: Template,
  args: {
    show: true,
    focused: true,
    variant: 'security'
  },
};

export const Terminal: Story = {
  render: Template,
  args: {
    show: true,
    focused: false,
    variant: 'terminal'
  },
};

export const Hidden: Story = {
  render: Template,
  args: {
    show: false,
    focused: false,
    variant: 'default'
  },
};
