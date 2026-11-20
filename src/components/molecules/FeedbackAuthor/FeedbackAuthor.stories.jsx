import React from 'react';
import FeedbackAuthor from './FeedbackAuthor';
import { placeholderImage } from '@stories-utils/placeholderImage';


export default {
  title: 'Molecules/FeedbackAuthor',
  component: FeedbackAuthor,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Avatar, name and role of a testimonial author.',
      },
    },
  },
};


// Default story
export const Default = {
  args: {
    name: 'Alex Example',
    role: 'Director of Software Development',
    avatar: placeholderImage(80, 80, { label: 'AE' }),
  }
};

// Same content at a 320px viewport
export const Responsive = {
  args: Default.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};