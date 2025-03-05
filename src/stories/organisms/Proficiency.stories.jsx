import React from 'react';
import Proficiency from '../../containers/Proficiency';
import { within, expect } from '@storybook/test';
import PortfolioContext from '@context/PortfolioContext';
import { mockPortfolioData } from '@utils/mockData';
import { withPortfolioContext, withViewport } from '@utils/decorators';
import build from '@assets/animations/build';

// Helper function to create context with custom skill bars
const createContextWithSkillBars = (skillBars) => {
  const customContext = { ...mockPortfolioData, SkillBars: skillBars };
  return (Story) => (
    <PortfolioContext.Provider value={customContext}>
      <Story />
    </PortfolioContext.Provider>
  );
};

export default {
  title: 'Organisms/Proficiency',
  component: Proficiency,
  tags: ['autodocs'],
  decorators: [withPortfolioContext],
  parameters: {
    docs: {
      description: {
        component: 'Proficiency section that displays skill levels using animated progress bars and a complementary animation.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'aria-progressbar', enabled: true }
        ],
      },
    },
  },
};


// Basic template
const Template = () => <Proficiency />;

// Sample skill bars data for stories
const sampleSkillBars = [
  {
    Stack: "Software Architecture",
    progressPercentage: "75"
  },
  {
    Stack: "API layer and below",
    progressPercentage: "90"
  },
  {
    Stack: "Frontend/Design",
    progressPercentage: "50"
  }
];

// Default story with standard skill bars
export const Default = Template.bind({});
Default.decorators = [createContextWithSkillBars(sampleSkillBars)];
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Verify section heading', async () => {
    await expect(canvas.getByText('Proficiency')).toBeInTheDocument();
  });
  
  await step('Verify skill bars', async () => {
    // Check that all skill names are displayed
    await expect(canvas.getByText('Software Architecture')).toBeInTheDocument();
    await expect(canvas.getByText('API layer and below')).toBeInTheDocument();
    await expect(canvas.getByText('Frontend/Design')).toBeInTheDocument();
    
    // Check that percentages are displayed
    await expect(canvas.getByText('75%')).toBeInTheDocument();
    await expect(canvas.getByText('90%')).toBeInTheDocument();
    await expect(canvas.getByText('50%')).toBeInTheDocument();
    
    // Check that progress bars have ARIA attributes
    const progressBars = canvas.getAllByRole('progressbar');
    await expect(progressBars.length).toBe(3);
  });
};

/**
 * Shows how the component behaves with many skill bars
 */
export const ManySkills = Template.bind({});
ManySkills.decorators = [
  createContextWithSkillBars([
    ...sampleSkillBars,
    {
      Stack: "DevOps",
      progressPercentage: "80"
    },
    {
      Stack: "Testing",
      progressPercentage: "70"
    },
    {
      Stack: "Mobile Development",
      progressPercentage: "60"
    },
    {
      Stack: "UX/UI Design",
      progressPercentage: "45"
    },
    {
      Stack: "Database Management",
      progressPercentage: "85"
    }
  ])
];
ManySkills.parameters = {
  docs: {
    description: {
      story: 'Shows how the component handles displaying many skill bars.'
    }
  }
};

/**
 * Shows how the component behaves with extreme percentage values
 */
export const ExtremeValues = Template.bind({});
ExtremeValues.decorators = [
  createContextWithSkillBars([
    {
      Stack: "Perfect Skill",
      progressPercentage: "100"
    },
    {
      Stack: "Zero Knowledge",
      progressPercentage: "0"
    },
    {
      Stack: "Just Starting",
      progressPercentage: "5"
    },
    {
      Stack: "Almost Perfect",
      progressPercentage: "99"
    }
  ])
];
ExtremeValues.parameters = {
  docs: {
    description: {
      story: 'Shows how the component handles extreme progress values (0%, 5%, 99%, 100%).'
    }
  }
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import Proficiency from '../containers/Proficiency';
 * 
 * // Component uses data from portfolio.js:
 * // export const SkillBars = [
 * //   {
 * //     Stack: "Software Architecture",
 * //     progressPercentage: "75"
 * //   },
 * //   {
 * //     Stack: "API layer and below",
 * //     progressPercentage: "90"
 * //   }
 * // ];
 * 
 * function App() {
 *   return <Proficiency />;
 * }
 * ```
 * 
 * ## Data Requirements
 * 
 * The component depends on the following data in the portfolio.js file:
 * 
 * | Data Object | Field | Type | Description |
 * |------|------|------|-------------|
 * | SkillBars | Stack | string | Name of the skill or technology stack |
 * | SkillBars | progressPercentage | string | Percentage value (0-100) as a string |
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Uses semantic HTML for structure
 * - Includes proper ARIA attributes for progress bars
 * - Ensures all text elements have sufficient color contrast
 * - Makes skill percentages clearly visible
 * - Uses animation that doesn't interfere with readability
 * 
 * ## Animation
 * 
 * The component features two types of animations:
 * 1. Progress bar animations that fill from 0% to the specified percentage when scrolled into view
 * 2. Fade-in animations for each skill bar with a staggered delay
 */

// Mobile view
export const Mobile = Template.bind({});
Mobile.decorators = [
  createContextWithSkillBars(sampleSkillBars),
  withViewport('mobile')
];
Mobile.parameters = {
  docs: {
    description: {
      story: 'Mobile view of the proficiency section, showing responsive layout.'
    }
  }
};

// Tablet view
export const Tablet = Template.bind({});
Tablet.decorators = [
  createContextWithSkillBars(sampleSkillBars),
  withViewport('tablet')
];
Tablet.parameters = {
  docs: {
    description: {
      story: 'Tablet view of the proficiency section.'
    }
  }
};