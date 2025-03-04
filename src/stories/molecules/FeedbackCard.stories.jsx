import React from 'react';
import FeedbackCard from '../../components/FeedbackCard';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// Sample feedback data for stories
const mockFeedbackData = {
  default: {
    name: "John Doe",
    feedback: "Working with this developer was a fantastic experience. Their attention to detail and technical expertise was impressive.",
    designation: "Project Manager",
    rating: 5
  },
  withImage: {
    name: "Jane Smith",
    feedback: "The developer delivered a high-quality application within the deadline. Very professional and responsive throughout the project.",
    designation: "CTO",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  longContent: {
    name: "Robert Johnson",
    feedback: "I've worked with many developers over the years, but this experience was truly exceptional. The attention to detail, clear communication, and problem-solving skills demonstrated throughout our project were outstanding. Not only was the work completed on time, but the quality exceeded our expectations. I especially appreciated how proactive the developer was in suggesting improvements and identifying potential issues before they became problems. I would absolutely recommend this developer to anyone looking for high-quality work and will definitely be hiring them for future projects.",
    designation: "Senior Product Manager",
    rating: 5
  },
  lowRating: {
    name: "Michael Brown",
    feedback: "The work was completed on time, but there were some issues with the implementation that required additional revisions.",
    designation: "Product Owner",
    rating: 3
  }
};

export default {
  title: 'Molecules/FeedbackCard',
  component: FeedbackCard,
  tags: ['autodocs'],
  argTypes: {
    data: { 
      control: 'object',
      description: 'Feedback data object containing name, feedback text, optional avatar, designation and rating'
    },
    index: {
      control: 'number',
      description: 'Index number for staggered animations',
      defaultValue: 0
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Feedback card component for displaying testimonials with ratings and author information.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', reviewOnFail: true },
          { id: 'nested-interactive', reviewOnFail: true },
          { id: 'label-content-name-mismatch', reviewOnFail: true }
        ],
      },
    },
    layout: 'padded'
  },
};


// Wrap the card in a container with a fixed width to mimic the grid layout in the real application
const Template = (args) => (
  <div style={{ width: '350px', margin: '0 auto' }}>
    <FeedbackCard {...args} />
  </div>
);

// Basic story with default feedback
export const Default = Template.bind({});
Default.args = {
  data: mockFeedbackData.default,
  index: 0
};
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', () => {
    // Verify the feedback text is displayed
    expect(canvas.getByText(mockFeedbackData.default.feedback)).toBeInTheDocument();
    
    // Verify the name is displayed
    expect(canvas.getByText(mockFeedbackData.default.name)).toBeInTheDocument();
    
    // Verify the role/designation is displayed
    expect(canvas.getByText(mockFeedbackData.default.designation)).toBeInTheDocument();
    
    // Verify 5 stars are displayed (filled or unfilled)
    const stars = canvas.getAllByText('', { selector: '.star' });
    expect(stars.length).toBe(5);
  });
  
  await step('Keyboard navigation test', async () => {
    // Tab to the quote content
    await userEvent.tab();
    const quoteContent = canvas.getByText(mockFeedbackData.default.feedback);
    expect(quoteContent).toHaveFocus();
    
    // Tab to the author name
    await userEvent.tab();
    const authorName = canvas.getByText(mockFeedbackData.default.name);
    expect(authorName).toHaveFocus();
    
    // Tab to the author role
    await userEvent.tab();
    const authorRole = canvas.getByText(mockFeedbackData.default.designation);
    expect(authorRole).toHaveFocus();
  });
};

// Story with custom avatar image
export const WithAvatar = Template.bind({});
WithAvatar.args = {
  data: mockFeedbackData.withImage,
  index: 1
};
WithAvatar.parameters = {
  docs: {
    description: {
      story: 'Displays a feedback card with a custom avatar image.'
    }
  }
};

// Story with very long feedback content
export const LongContent = Template.bind({});
LongContent.args = {
  data: mockFeedbackData.longContent,
  index: 2
};
LongContent.parameters = {
  docs: {
    description: {
      story: 'Shows how the component handles lengthy feedback content with automatic scrolling.'
    }
  }
};

// Story with a low rating
export const PartialRating = Template.bind({});
PartialRating.args = {
  data: mockFeedbackData.lowRating,
  index: 3
};
PartialRating.parameters = {
  docs: {
    description: {
      story: 'Displays a feedback card with a partial rating (3 out of 5 stars).'
    }
  }
};
PartialRating.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Rating verification', () => {
    // Get all star elements
    const stars = canvas.getAllByText('', { selector: '.star' });
    expect(stars.length).toBe(5);
    
    // Check that exactly 3 stars are colored (the filled ones)
    const coloredStars = stars.filter(star => 
      window.getComputedStyle(star).color !== 'rgb(224, 224, 224)' // #e0e0e0
    );
    expect(coloredStars.length).toBe(3);
  });
};

// Story showcasing animation capabilities
export const AnimatedEntry = Template.bind({});
AnimatedEntry.args = {
  data: mockFeedbackData.default,
  index: 0
};
AnimatedEntry.parameters = {
  docs: {
    description: {
      story: 'Demonstrates the animated entry of the feedback card when it comes into view.'
    }
  },
  chromatic: { disable: true } // Disable Chromatic snapshots for this animation story
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import FeedbackCard from '../components/FeedbackCard';
 * 
 * function TestimonialSection() {
 *   const feedbacks = [
 *     {
 *       name: "John Doe",
 *       feedback: "Great work, very professional!",
 *       designation: "CTO, Tech Company",
 *       rating: 5
 *     },
 *     // More feedback items...
 *   ];
 *   
 *   return (
 *     <div className="testimonials-grid">
 *       {feedbacks.map((feedback, index) => (
 *         <FeedbackCard 
 *           key={index} 
 *           data={feedback} 
 *           index={index} 
 *         />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 * 
 * ## Properties
 * 
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | data | Object | required | Feedback data object |
 * | data.name | string | required | Name of the person giving feedback |
 * | data.feedback | string | required | The feedback text content |
 * | data.avatar | string | null | URL to avatar image |
 * | data.designation | string | "Client" | Job title or role |
 * | data.rating | number | 5 | Rating from 1-5 stars |
 * | index | number | 0 | Index for staggered animation timing |
 * 
 * ## Accessibility Features
 * 
 * - Rating stars have appropriate aria-label
 * - Quote icons are properly hidden from screen readers
 * - Interactive elements are keyboard navigable
 * - Semantic HTML structure
 * - High color contrast
 * 
 * ## Implementation Notes
 * 
 * - Uses intersection observer for entry animations
 * - Automatically handles missing avatar with a placeholder
 * - Scrollable container for long content
 * - Responsive design for different screen sizes
 */

// Mobile view for responsive testing
export const MobileView = Template.bind({});
MobileView.args = {
  data: mockFeedbackData.default,
  index: 0
};
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
  docs: {
    description: {
      story: 'Shows how the feedback card responds to smaller screen sizes.'
    }
  }
};