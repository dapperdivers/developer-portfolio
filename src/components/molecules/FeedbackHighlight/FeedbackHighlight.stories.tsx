import type { Meta, StoryObj } from '@storybook/react-vite';
import FeedbackHighlight from './FeedbackHighlight';

const meta = {
  title: 'Molecules/FeedbackHighlight',
  component: FeedbackHighlight,
  tags: ['autodocs'],
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
      description: 'Whether to play the entrance and hover animations',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Pull quote that highlights the key line of a testimonial. Renders nothing without text.',
      },
    },
  },
} satisfies Meta<typeof FeedbackHighlight>;
export default meta;

type Story = StoryObj<typeof meta>;

// Short pull quote
export const Default: Story = {
  args: {
    text: 'Finds the root cause, fixes it, and leaves the runbook better than he found it.',
  }
};

// Longer text wraps inside the container
export const LongHighlight: Story = {
  args: {
    text: 'During the incident he rebuilt the detection pipeline overnight, closed the gap that let the alert slip through, and walked the whole team through the change the next morning.',
  }
};

// Same quote at a 320px viewport
export const Responsive: Story = {
  args: Default.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
