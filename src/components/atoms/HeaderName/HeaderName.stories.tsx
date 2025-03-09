import type { Meta, StoryObj } from '@storybook/react';
import HeaderName from './HeaderName';

const meta = {
  title: 'Atoms/HeaderName',
  component: HeaderName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A stylized header name component with cyberpunk-inspired hover animations. Features include a blinking cursor, scanline effect, and animated underline.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'The name to be displayed',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' }
      }
    }
  }
} satisfies Meta<typeof HeaderName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const LongName: Story = {
  args: {
    name: 'Dr. Jonathan Doe-Smith III',
  },
};

export const CustomStyle: Story = {
  args: {
    name: 'Custom Style',
    className: 'text-2xl text-purple-400',
  },
};

export const WithBackground: Story = {
  args: {
    name: 'Hover Me',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
  },
};

export const WithInteractions: Story = {
  args: {
    name: 'Interactive component',
    className: 'interactive-test'
  },
  play: async ({ canvasElement }) => {
    // Add interaction tests here using @storybook/test
  }
};
