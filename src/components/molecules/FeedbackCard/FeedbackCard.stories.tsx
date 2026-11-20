import type { Meta, StoryObj } from '@storybook/react-vite';
import { placeholderImage } from '@stories-utils/placeholderImage';
import FeedbackCard from './FeedbackCard';
import { feedbacks } from '@/portfolio';
import type { Feedback } from '@/types/portfolio';
import { within, userEvent, expect } from 'storybook/test';

// Sample feedback data for stories. The default is the real testimonial from the site.
const mockFeedbackData = {
  default: { ...feedbacks[0], designation: feedbacks[0].designation ?? 'Client' },
  withImage: {
    name: "Maya Okafor",
    feedback: "Derek reviewed our release pipeline, found two ways a bad build could reach production and closed both within the week. He explained each fix to the team in plain terms and left a runbook behind.",
    highlight: "Closed both within the week and left a runbook behind.",
    designation: "VP of Engineering, Northwind Freight",
    rating: 5,
    avatar: placeholderImage(96, 96, { label: 'MO' })
  },
  noHighlight: {
    name: "Tomas Alvarez",
    feedback: "Calm in an incident and clear afterwards. Our on-call team now follows the checklists he wrote.",
    designation: "Site Reliability Lead, Example University",
    rating: 5
  },
  longContent: {
    name: "Priya Raman",
    feedback: "Derek led the security review for our platform rebuild and it changed how the whole team works. He started by threat modelling each service with the engineers who owned it, then turned the findings into pipeline checks instead of a report nobody would read. When a dependency vulnerability landed in the middle of launch week he had a patched build, a rollout plan and a clear summary for leadership within a few hours. He is patient with questions, direct about risk, and he documents everything so the knowledge stays with the team after the project ends. I would gladly work with him again and recommend him without hesitation.",
    designation: "Director of Platform Engineering, Northwind Freight",
    rating: 5
  },
  lowRating: {
    name: "Sam Whitfield",
    feedback: "The work was completed on time, but a few details needed another round of revisions.",
    designation: "Product Owner, Example University",
    rating: 3
  }
} satisfies Record<string, Feedback>;

const meta = {
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
    },
    animated: {
      control: 'boolean',
      description: 'Whether the card animates in and reacts to hover'
    }
  },
  // Constrain the width to mimic the grid column the card sits in on the site
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '350px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
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
} satisfies Meta<typeof FeedbackCard>;
export default meta;

type Story = StoryObj<typeof meta>;

// Basic story with default feedback
export const Default: Story = {
  args: {
  data: mockFeedbackData.default,
  index: 0
},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  
    await step('Initial render check', async () => {
      // Verify the feedback text is displayed
      await expect(canvas.getByText(mockFeedbackData.default.feedback)).toBeInTheDocument();
    
      // Verify the name is displayed
      await expect(canvas.getByText(mockFeedbackData.default.name)).toBeInTheDocument();
    
      // Verify the role/designation is displayed
      await expect(canvas.getByText(mockFeedbackData.default.designation)).toBeInTheDocument();
    
      // Verify 5 stars are displayed (filled or unfilled)
      const stars = canvas.getAllByText('', { selector: '.star' });
      await expect(stars.length).toBe(5);
    });
  
    await step('Keyboard navigation test', async () => {
      // Tab to the quote content
      await userEvent.tab();
      const quoteContent = canvas.getByText(mockFeedbackData.default.feedback);
      await expect(quoteContent).toHaveFocus();
    
      // Tab to the author name
      await userEvent.tab();
      const authorName = canvas.getByText(mockFeedbackData.default.name);
      await expect(authorName).toHaveFocus();
    
      // Tab to the author role
      await userEvent.tab();
      const authorRole = canvas.getByText(mockFeedbackData.default.designation);
      await expect(authorRole).toHaveFocus();
    });
  },
};

// Story with a photo, a custom pull quote and no real name from the site
export const WithAvatar: Story = {
  args: {
  data: mockFeedbackData.withImage,
  index: 1
},
  parameters: {
    docs: {
      description: {
        story: 'A card with a photo and a pull quote. Without a photo the author gets an initials badge, as in the default story.'
      }
    }
  },
};

// Quote with no pull quote: the card finds one or shows none
export const WithoutHighlight: Story = {
  args: {
    data: mockFeedbackData.noHighlight,
    index: 1
  },
};

// Story with very long feedback content
export const LongContent: Story = {
  args: {
  data: mockFeedbackData.longContent,
  index: 2
},
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component handles lengthy feedback content with automatic scrolling.'
      }
    }
  },
};

// Story with a low rating
export const PartialRating: Story = {
  args: {
  data: mockFeedbackData.lowRating,
  index: 3
},
  parameters: {
    docs: {
      description: {
        story: 'Displays a feedback card with a partial rating (3 out of 5 stars).'
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  
    await step('Rating verification', async () => {
      // Get all star elements
      const stars = canvas.getAllByText('', { selector: '.star' });
      await expect(stars.length).toBe(5);
    
      // Check that exactly 3 stars are colored (the filled ones)
      const coloredStars = stars.filter(star => 
        window.getComputedStyle(star).color === 'rgb(100, 255, 218)' // filled: #64ffda
      );
      await expect(coloredStars.length).toBe(3);
    });
  },
};

// Story with animations switched off
export const WithoutAnimation: Story = {
  args: {
  data: mockFeedbackData.default,
  index: 0,
  animated: false
},
  parameters: {
    docs: {
      description: {
        story: 'With `animated` set to false the card renders in place with no entry animation and no hover lift. The other stories animate in on mount.'
      }
    }
  },
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import FeedbackCard from './FeedbackCard';
import { feedbacks } from '@/portfolio';
 * 
 * function TestimonialSection() {
 *   const feedbacks = [
 *     {
 *       name: "Maya Okafor",
 *       feedback: "Great work, very professional!",
 *       designation: "VP of Engineering, Northwind Freight",
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
 * | data.avatar | string | undefined | URL to avatar image; initials badge when missing |
 * | data.designation | string | "Client" | Job title or role |
 * | data.rating | number | 5 | Rating from 1-5 stars |
 * | index | number | 0 | Index for staggered animation timing |
 * | animated | boolean | true | Whether the card animates in and reacts to hover |
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
 * - Draws an initials badge when there is no avatar
 * - Scrollable container for long content
 * - Responsive design for different screen sizes
 */

// Mobile view for responsive testing
export const MobileView: Story = {
  args: {
  data: mockFeedbackData.default,
  index: 0
},
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the feedback card responds to smaller screen sizes.'
      }
    }
  },
};
