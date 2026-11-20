import React from 'react';
import FeedbackHighlight from './FeedbackHighlight';

export default {
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
};

// Short pull quote
export const Default = {
  args: {
    text: 'Finds the root cause, fixes it, and leaves the runbook better than he found it.',
  }
};

// Longer text wraps inside the container
export const LongHighlight = {
  args: {
    text: 'During the incident he rebuilt the detection pipeline overnight, closed the gap that let the alert slip through, and walked the whole team through the change the next morning.',
  }
};

// Same quote at a 320px viewport
export const Responsive = {
  args: Default.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
