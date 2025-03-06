import React from 'react';
import Feedbacks from '@organisms/Feedbacks';
import { within, expect } from '@storybook/test';
import PortfolioContext from '@context/PortfolioContext';
import { mockPortfolioData } from '@stories-utils/mockData';
import { withPortfolioContext, withViewport } from '@stories-utils/decorators';

// Helper function to create context with specific feedback data
const createContextWithFeedbacks = (feedbackData) => {
  const customContext = { ...mockPortfolioData, feedbacks: feedbackData };
  return (Story) => (
    <PortfolioContext.Provider value={customContext}>
      <Story />
    </PortfolioContext.Provider>
  );
};

export default {
  title: 'Organisms/Feedbacks',
  component: Feedbacks,
  tags: ['autodocs'],
  decorators: [withPortfolioContext],
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
};


// Basic template
const Template = () => <Feedbacks />;

// Define some sample feedback data for our stories
const sampleFeedbacks = [
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
    avatar: "https://via.placeholder.com/150"
  },
  {
    name: "Michael Williams",
    feedback: "Derek's attention to detail and commitment to quality made our project a great success.",
    designation: "Engineering Lead",
    rating: 4
  }
];

// Story with multiple feedback items
export const WithMultipleFeedbacks = Template.bind({});
WithMultipleFeedbacks.decorators = [createContextWithFeedbacks(sampleFeedbacks)];
WithMultipleFeedbacks.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Check section title', async () => {
    await expect(canvas.getByText('Personal Recommendations')).toBeInTheDocument();
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
};

/**
 * Shows how the component handles having only a single feedback item.
 * The grid layout should adjust accordingly.
 */
export const WithSingleFeedback = Template.bind({});
WithSingleFeedback.decorators = [
  createContextWithFeedbacks([sampleFeedbacks[0]])
];
WithSingleFeedback.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Check single feedback item', async () => {
    await expect(canvas.getByText('John Smith')).toBeInTheDocument();
    // Should not find other feedback items
    await expect(canvas.queryByText('Emily Johnson')).not.toBeInTheDocument();
  });
};

/**
 * Empty state shows what happens when there are no feedbacks available.
 * The component should simply not render anything per the implementation.
 */
export const EmptyState = Template.bind({});
EmptyState.decorators = [createContextWithFeedbacks([])];
EmptyState.parameters = {
  docs: {
    description: {
      story: 'When no feedback items are available, the component returns null and nothing is rendered.'
    }
  }
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import Feedbacks from '../containers/Feedbacks';
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
export const Mobile = Template.bind({});
Mobile.decorators = [
  createContextWithFeedbacks(sampleFeedbacks),
  withViewport('mobile')
];
Mobile.parameters = {
  docs: {
    description: {
      story: 'Feedbacks section in mobile view, with feedback cards stacked vertically.'
    }
  }
};

// Story with long feedback content
export const LongContent = Template.bind({});
LongContent.decorators = [
  createContextWithFeedbacks([{
    name: "Long Feedback",
    feedback: "This is an example of a very long feedback that tests how the component handles extensive text content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
    designation: "Verbose Client",
    rating: 4
  }, ...sampleFeedbacks])
];
LongContent.parameters = {
  docs: {
    description: {
      story: 'Shows how the component handles very long feedback text.'
    }
  }
};