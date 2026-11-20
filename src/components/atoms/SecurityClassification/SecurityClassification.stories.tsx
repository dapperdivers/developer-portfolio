import type { Meta, StoryObj } from '@storybook/react-vite';
import SecurityClassification from './SecurityClassification';

const meta = {
  title: 'Atoms/SecurityClassification',
  component: SecurityClassification,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A classification banner in the chip family. Cyan is the neutral default (declassified), green is secure, and red is kept for the alarming levels (breach, critical).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(560px, 90vw)', padding: '0 2rem' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    animated: { control: 'boolean', description: 'Play animations; reduced motion always turns them off' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'secure', 'breach', 'critical']
    },
    expanded: {
      control: 'boolean'
    },
    label: {
      control: 'text'
    }
  }
} satisfies Meta<typeof SecurityClassification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'DECLASSIFIED',
    variant: 'default',
    expanded: true
  }
};

export const Secure: Story = {
  args: {
    label: 'AUTHORIZED',
    variant: 'secure',
    expanded: true
  }
};

export const Breach: Story = {
  args: {
    label: 'COMPROMISED',
    variant: 'breach',
    expanded: true
  }
};

export const Critical: Story = {
  args: {
    label: 'CRITICAL ALERT',
    variant: 'critical',
    expanded: true
  }
};

export const CustomLabel: Story = {
  args: {
    label: 'INTERNAL USE ONLY',
    variant: 'default',
    expanded: true
  }
};

export const Collapsed: Story = {
  args: {
    label: 'DECLASSIFIED',
    variant: 'default',
    expanded: false
  }
};

export const Playground: Story = {
  args: {
    label: 'DECLASSIFIED',
    variant: 'default',
    expanded: true
  }
};