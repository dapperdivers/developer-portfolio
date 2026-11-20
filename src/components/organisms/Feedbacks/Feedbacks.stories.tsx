import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import Feedbacks from './Feedbacks';
import { within, expect } from 'storybook/test';
import PortfolioContext from '@context/PortfolioContext';
import { mockPortfolioData } from '@data/mockPortfolioData';
import type { Feedback, PortfolioData } from '@/types/portfolio';
import { withViewport } from '@stories-utils';
import { placeholderImage } from '@stories-utils/placeholderImage';

// Helper function to create context with specific feedback data
const createContextWithFeedbacks = (feedbackData: Feedback[]): Decorator => {
  // The src/data mock predates the current data shape, hence the cast below
  const customContext = { ...mockPortfolioData, feedbacks: feedbackData };
  return (Story) => (
    <PortfolioContext.Provider value={customContext as unknown as PortfolioData}>
      <Story />
    </PortfolioContext.Provider>
  );
};

const meta = {
  title: 'Organisms/Feedbacks',
  component: Feedbacks,
  tags: ['autodocs'],
  // This component has no direct props, as it gets data from context
  parameters: {
    docs: {
      description: {
        component: 'Feedbacks section that displays testimonials and recommendations. Renders a grid of FeedbackCard components within a Section layout, using data from PortfolioContext.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'heading-order', enabled: true }
        ],
      },
    },
  },
} satisfies Meta<typeof Feedbacks>;

export default meta;
type Story = StoryObj<typeof meta>;



// Define some sample feedback data for our stories
const sampleFeedbacks: Feedback[] = [
  {
    name: "John Smith",
    feedback: "Derek is an exceptional developer who consistently delivers high-quality code and innovative solutions.",
    designation: "CTO at TechCorp",
    rating: 5
  },
  {
    name: "Emily Johnson",
    feedback: "Working with Derek was a pleasure. He understood our requirements perfectly and delivered beyond expectations.",
    designation: "Product Manager",
    rating: 5,
    avatar: placeholderImage(150, 150)
  },
  {
    name: "Michael Williams",
    feedback: "Derek's attention to detail and commitment to quality made our project a great success.",
    designation: "Engineering Lead",
    rating: 4
  }
];

// Story with multiple feedback items
export const WithMultipleFeedbacks: Story = {
  decorators: [createContextWithFeedbacks(sampleFeedbacks)],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  
    await step('Check section title', async () => {
      await expect(canvas.getByText('Personal Feedback')).toBeInTheDocument();
    });
  
    await step('Check feedback cards are rendered', async () => {
      // Check for feedback content
      await expect(canvas.getByText('John Smith')).toBeInTheDocument();
      await expect(canvas.getByText('Emily Johnson')).toBeInTheDocument();
      await expect(canvas.getByText('Michael Williams')).toBeInTheDocument();
    
      // Check that ratings are displayed
      const stars = canvas.getAllByLabelText(/out of 5 stars/i);
      await expect(stars.length).toBe(3);
    });
  },
};

/**
 * Shows how the component handles having only a single feedback item.
 * The grid layout should adjust accordingly.
 */
export const WithSingleFeedback: Story = {
  decorators: [
    createContextWithFeedbacks([sampleFeedbacks[0]])
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  
    await step('Check single feedback item', async () => {
      await expect(canvas.getByText('John Smith')).toBeInTheDocument();
      // Should not find other feedback items
      await expect(canvas.queryByText('Emily Johnson')).not.toBeInTheDocument();
    });
  },
};

/**
 * Empty state shows what happens when there are no feedbacks available.
 * The component should simply not render anything per the implementation.
 */
export const EmptyState: Story = {
  decorators: [createContextWithFeedbacks([])],
  parameters: {
    docs: {
      description: {
        story: 'When no feedback items are available, the component returns null and nothing is rendered.'
      }
    }
  },
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import Feedbacks from '@/stories/containers/Feedbacks';
 * import PortfolioContext from '@context/PortfolioContext';
 * 
 * function App() {
 *   const portfolioData = {
 *     feedbacks: [
 *       {
 *         name: "John Smith",
 *         feedback: "Great developer!",
 *         designation: "CTO",
 *         rating: 5
 *       }
 *     ]
 *   };
 *   
 *   return (
 *     <PortfolioContext.Provider value={portfolioData}>
 *       <Feedbacks />
 *     </PortfolioContext.Provider>
 *   );
 * }
 * ```
 * 
 * ## Context Requirements
 * 
 * | Context Path | Type | Description |
 * |------|------|-------------|
 * | feedbacks | array | Array of feedback objects with name, feedback, designation (optional), rating (optional), and avatar (optional) |
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Uses semantic heading hierarchy for section title
 * - Provides proper ARIA attributes for star ratings
 * - Ensures keyboard navigability through feedback items
 * - Has appropriate color contrast for readability
 * 
 * ## Responsiveness
 * 
 * The feedback grid automatically adjusts to different screen sizes:
 * - Desktop: Multiple columns of feedback cards
 * - Mobile: Single column of stacked cards
 */

// Mobile view
export const Mobile: Story = {
  decorators: [
    createContextWithFeedbacks(sampleFeedbacks),
    withViewport('mobile')
  ],
  parameters: {
    docs: {
      description: {
        story: 'Feedbacks section in mobile view, with feedback cards stacked vertically.'
      }
    }
  },
};

// Story with long feedback content
export const LongContent: Story = {
  decorators: [
    createContextWithFeedbacks([{
      name: "Priya Raman",
      feedback: "Derek led the security review for our platform rebuild and it changed how the whole team works. He started by threat modelling each service with the engineers who owned it, then turned the findings into pipeline checks instead of a report nobody would read. When a dependency vulnerability landed in the middle of the launch week he had a patched build, a rollout plan and a clear summary for leadership within a few hours. He is patient with questions, direct about risk, and he documents everything so the knowledge stays with the team after the project ends.",
      designation: "Director of Platform Engineering",
      rating: 4
    }, ...sampleFeedbacks])
  ],
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component handles very long feedback text.'
      }
    }
  },
};