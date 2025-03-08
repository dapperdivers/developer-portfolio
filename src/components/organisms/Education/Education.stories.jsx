import React from 'react';
import Education from './Education';
import { expect, within } from '@storybook/test';
import { mockPortfolioData, withPortfolioContext, withViewport } from '@stories-utils';
import PortfolioContext from '@context/PortfolioContext';

export default {
  title: 'Organisms/Education',
  component: Education,
  tags: ['autodocs'],
  decorators: [withPortfolioContext],
  // No direct props since data comes from context
  parameters: {
    docs: {
      description: {
        component: 'Education section that displays educational background and qualifications. Gets data from PortfolioContext and renders a grid of EducationCard components within a Section layout.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'heading-order', enabled: true },
          { id: 'landmark-unique', enabled: true }
        ],
      },
    },
  },
};


// Helper function to create a context with specific education data
const createContextWithEducation = (educationData) => {
  const customContext = { ...mockPortfolioData, educationInfo: educationData };
  return (Story) => (
    <PortfolioContext.Provider value={customContext}>
      <Story />
    </PortfolioContext.Provider>
  );
};

// Basic template
const Template = () => <Education />;

// Default story with multiple education items
export const WithMultipleItems = Template.bind({});
WithMultipleItems.decorators = [createContextWithEducation(mockPortfolioData.educationInfo)];
WithMultipleItems.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Check section title', () => {
    expect(canvas.getByText('Education')).toBeInTheDocument();
  });
  
  await step('Check education cards', () => {
    // Should have all education items from mockData
    expect(canvas.getAllByText(/University of|Coding Academy|Online University/i).length).toBeGreaterThan(0);
  });
};

/**
 * This story demonstrates how the Education component appears when there's only
 * a single education item. The grid layout should adapt appropriately.
 */
export const WithSingleItem = Template.bind({});
WithSingleItem.decorators = [
  createContextWithEducation([mockPortfolioData.educationInfo[0]])
];
WithSingleItem.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Check single education item', () => {
    expect(canvas.getByText('University of Technology')).toBeInTheDocument();
    expect(canvas.queryByText('Coding Academy')).not.toBeInTheDocument();
  });
};

/**
 * This story demonstrates how the Education component handles an empty state
 * when no education data is available.
 */
export const EmptyState = Template.bind({});
EmptyState.decorators = [createContextWithEducation([])];
EmptyState.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Check empty state', () => {
    // The section title should still be visible
    expect(canvas.getByText('Education')).toBeInTheDocument();
    
    // But no education cards should be rendered
    expect(canvas.queryByText('University of Technology')).not.toBeInTheDocument();
  });
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import Education from 'containers/Education';
 * import PortfolioContext from 'context/PortfolioContext';
 * 
 * function App() {
 *   const portfolioData = {
 *     educationInfo: [
 *       {
 *         schoolName: "University Name",
 *         subHeader: "Degree",
 *         duration: "2015 - 2019",
 *         desc: "Description",
 *         descBullets: ["Achievement 1", "Achievement 2"]
 *       }
 *     ]
 *   };
 *   
 *   return (
 *     <PortfolioContext.Provider value={portfolioData}>
 *       <Education />
 *     </PortfolioContext.Provider>
 *   );
 * }
 * ```
 * 
 * ## Context Requirements
 * 
 * This component requires the following data in PortfolioContext:
 * 
 * | Context Path | Type | Description |
 * |------|------|-------------|
 * | educationInfo | array | Array of education items with schoolName, subHeader, duration, desc, and descBullets |
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Uses semantic heading hierarchy
 * - Provides visible section title
 * - Uses appropriate landmark regions
 * - Ensures proper keyboard navigation through education items
 */

// Mobile view to demonstrate responsive behavior
export const Mobile = Template.bind({});
Mobile.decorators = [
  createContextWithEducation(mockPortfolioData.educationInfo),
  withViewport('mobile')
];
Mobile.parameters = {
  docs: {
    description: {
      story: 'The Education section in mobile view, showing how the layout adapts to smaller screens.'
    }
  }
};

// Tablet view
export const Tablet = Template.bind({});
Tablet.decorators = [
  createContextWithEducation(mockPortfolioData.educationInfo),
  withViewport('tablet')
];
Tablet.parameters = {
  docs: {
    description: {
      story: 'The Education section in tablet view, showing the responsive grid layout.'
    }
  }
};