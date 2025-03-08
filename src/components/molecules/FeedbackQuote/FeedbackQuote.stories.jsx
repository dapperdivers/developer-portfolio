import React from 'react';
import FeedbackQuote from './FeedbackQuote';

export default {
  title: 'Molecules/FeedbackQuote',
  component: FeedbackQuote,
  parameters: {
    docs: {
      description: {
        component: 'A component for displaying testimonial quotes with decorative quotation marks.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The quote text to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
};

/**
 * Default story showing a short quote
 */
export const Default = {
  args: {
    text: 'This is a fantastic portfolio website!',
  },
};

/**
 * Story showing a longer quote
 */
export const LongQuote = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
};

/**
 * Story showing a quote with custom styling
 */
export const CustomStyling = {
  args: {
    text: 'A beautifully styled quote!',
    className: 'bg-gray-100 p-6 rounded-lg shadow-md',
  },
};

/**
 * Story showing a quote in dark mode
 */
export const DarkMode = {
  args: {
    text: 'A quote that looks great in dark mode.',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

/**
 * Story showing a quote with special characters
 */
export const SpecialCharacters = {
  args: {
    text: '¡This quote includes special characters! @#$%^&*()_+ áéíóú',
  },
};

/**
 * Story showing a quote with HTML entities
 */
export const WithHtmlEntities = {
  args: {
    text: 'This quote has HTML entities: &amp; &lt; &gt; &quot;',
  },
};

/**
 * Story showing a quote with multiple paragraphs
 */
export const MultiParagraph = {
  args: {
    text: 'First paragraph of the quote.\n\nSecond paragraph of the quote.\n\nThird paragraph with more content.',
  },
};

/**
 * Story showing a quote in mobile viewport
 */
export const MobileView = {
  args: {
    text: 'A quote that adapts well to mobile screens.',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}; 