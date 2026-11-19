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
    name: 'Alex Example',
    role: 'Director of Software Development',
    avatar: 'https://ui-avatars.com/api/?name=AE&background=3563E9&color=fff&bold=true',
  }
};

// Responsive behavior example
export const Responsive = {
  args: Default.args,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  }
};