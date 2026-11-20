import type { Meta, StoryObj } from '@storybook/react-vite';
import TerminalFooter from './TerminalFooter';

const meta = {
  title: 'Atoms/TerminalFooter',
  component: TerminalFooter,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a192f' },
        { name: 'navy', value: '#162b3d' },
      ],
    },
  },
  argTypes: {
    animated: { control: 'boolean', description: 'Play animations; reduced motion always turns them off' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical']
    },
    expanded: {
      control: 'boolean'
    },
    prompt: {
      control: 'text'
    }
  }
} satisfies Meta<typeof TerminalFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prompt: 'user@portfolio:~$',
    variant: 'default',
    expanded: true
  }
};

export const Secure: Story = {
  args: {
    prompt: 'admin@secure:~$',
    variant: 'secure',
    expanded: true
  }
};

export const Breach: Story = {
  args: {
    prompt: 'root@compromised:~#',
    variant: 'breach',
    expanded: true
  }
};

export const Critical: Story = {
  args: {
    prompt: 'system@critical:~!',
    variant: 'critical',
    expanded: true
  }
};

export const CustomPrompt: Story = {
  args: {
    prompt: 'hacker@terminal:~$',
    variant: 'default',
    expanded: true
  }
};

export const Collapsed: Story = {
  args: {
    prompt: 'user@portfolio:~$',
    variant: 'default',
    expanded: false
  }
};
