import type { Meta, StoryObj } from '@storybook/react-vite';
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
    animated: { control: 'boolean', description: 'Play animations; reduced motion always turns them off' },
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
    name: 'Derek Mackley',
    logoSrc: '/turtle.png',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem 3rem', background: 'var(--color-background)', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-card)' }}>
        <Story />
      </div>
    ),
  ],
};

/** The turtle brand mark before the name, as the nav shows it. */
export const WithLogo: Story = {
  args: {
    name: 'Derek Mackley',
    logoSrc: '/turtle.png',
  },
};

export const LongName: Story = {
  args: {
    name: 'Dr. Alexandria Montgomery-Whitfield III',
  },
};

export const CustomStyle: Story = {
  args: {
    name: 'Custom Style',
    className: 'text-2xl',
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
        { name: 'dark', value: '#0a192f' },
      ],
    },
  },
};

export const WithInteractions: Story = {
  args: {
    name: 'Interactive component',
    className: 'interactive-test'
  },
  play: async () => {
    // Add interaction tests here using @storybook/test
  }
};
