import type { Meta, StoryObj } from '@storybook/react-vite';
import FeedbackHighlight from './FeedbackHighlight';

const meta = {
  title: 'Molecules/FeedbackHighlight',
  component: FeedbackHighlight,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '480px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    text: {
      control: 'text',
      description: 'The highlighted text',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    animated: {
      control: 'boolean',
      description: 'Whether to play the entrance animation',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Pull quote that highlights the key line of a testimonial, on the inset surface with a cyan rule. Renders nothing without text.',
      },
    },
  },
} satisfies Meta<typeof FeedbackHighlight>;
export default meta;

type Story = StoryObj<typeof meta>;

// The pull quote from the real testimonial
export const Default: Story = {
  args: {
    text: 'He has my highest recommendation.',
  }
};

// Longer text wraps inside the container
export const LongHighlight: Story = {
  args: {
    text: 'During the incident he rebuilt the detection pipeline overnight, closed the gap that let the alert slip through, and walked the whole team through the change the next morning.',
  }
};

// With the entrance animation off
export const WithoutAnimation: Story = {
  args: {
    text: 'He has my highest recommendation.',
    animated: false,
  }
};

// Same quote at a 320px viewport
export const Responsive: Story = {
  args: Default.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
