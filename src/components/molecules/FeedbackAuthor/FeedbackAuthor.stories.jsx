import React from 'react';
import FeedbackAuthor from './FeedbackAuthor';


export default {
  title: 'Molecules/FeedbackAuthor',
  component: FeedbackAuthor,
  tags: ['autodocs'],
  argTypes: {
    // Add component props here
    // Example:
    // variant: {
    //   control: 'select',
    //   options: ['primary', 'secondary'],
    //   description: 'The button variant',
    // },
  },
  parameters: {
    docs: {
      description: {
        component: 'Description of the FeedbackAuthor component',
      },
    },
    a11y: {
      config: {
        rules: [
          // Component-specific accessibility rules
        ],
      },
    },
  },
};


// Default story
export const Default = {
  args: {
    // Add default props here
  }
};

// Responsive behavior example
export const Responsive = {
  args: {
    // Props for demonstrating responsive behavior
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};