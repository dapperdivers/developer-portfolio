import React from 'react';
import Experience from '@organisms/Experience';
import { within, userEvent, expect } from '@storybook/test';
import PortfolioContext from '@context/PortfolioContext';

// Mock experience data for the stories
const mockExperienceData = [
  {
    role: "Principal Software Engineer",
    company: "TechInnovate",
    companylogo: "https://ui-avatars.com/api/?name=TI&background=0D8ABC&color=fff",
    date: "January 2022 – Present",
    desc: "Leading the frontend development team and implementing enterprise-scale React applications with modern architecture patterns.",
    descBullets: [
      "Designed and implemented a component library used across 5 product teams",
      "Reduced application load time by 40% through code splitting and optimization",
      "Mentored junior developers and established best practices",
      "Led migration from class components to functional components with hooks"
    ]
  },
  {
    role: "Senior Frontend Developer",
    company: "DataSolutions Inc.",
    companylogo: "https://ui-avatars.com/api/?name=DS&background=2D8A5F&color=fff",
    date: "June 2019 – December 2021",
    desc: "Developed and maintained multiple React applications with complex state management and API integrations.",
    descBullets: [
      "Built a dashboard analytics platform with real-time data visualization",
      "Implemented comprehensive testing strategies using Jest and React Testing Library",
      "Optimized existing applications for better performance and accessibility",
      "Collaborated with design team to implement consistent UI/UX patterns"
    ]
  },
  {
    role: "Frontend Developer",
    company: "WebCreative",
    companylogo: "https://ui-avatars.com/api/?name=WC&background=A85C32&color=fff",
    date: "March 2017 – May 2019",
    desc: "Created responsive web applications and collaborated with cross-functional teams to deliver high-quality projects.",
    descBullets: [
      "Developed responsive websites using modern CSS frameworks",
      "Integrated RESTful APIs with frontend applications",
      "Implemented authentication and authorization systems",
      "Created reusable components to improve development efficiency"
    ]
  }
];

// Different variations of experience data for different stories
const singleExperience = [mockExperienceData[0]];
const emptyExperience = [];

// Mock portfolio data with different experience variations
const createMockPortfolioData = (experienceData) => ({
  experience: experienceData,
  // Other portfolio data that might be needed
  greetings: {},
  openSource: {},
  contact: {},
  socialLinks: {},
  skillsSection: {},
  skillBars: [],
  educationInfo: [],
  projects: [],
  feedbacks: []
});

// Context decorator factory to provide different mock data for each story
const createPortfolioDecorator = (experienceData) => (Story) => (
  <PortfolioContext.Provider value={createMockPortfolioData(experienceData)}>
    <Story />
  </PortfolioContext.Provider>
);


export default {
  title: 'Organisms/Experience',
  component: Experience,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Experience section component displaying work history. Renders a grid of ExperienceCard components with work history data retrieved from the PortfolioContext.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'aria-valid-attr', reviewOnFail: true },
          { id: 'region', reviewOnFail: true },
          { id: 'aria-roles', reviewOnFail: true }
        ],
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    }
  },
};


// Template for the component with context wrapper
const Template = ({ experienceData = mockExperienceData }) => (
  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
    {createPortfolioDecorator(experienceData)(Experience)}
  </div>
);

// Default story with multiple experience items
export const Default = () => <Template />;
Default.decorators = [createPortfolioDecorator(mockExperienceData)];
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', () => {
    // Check section title
    expect(canvas.getByText('Experience')).toBeInTheDocument();
    
    // Check for multiple experience cards
    mockExperienceData.forEach(exp => {
      expect(canvas.getByText(exp.company)).toBeInTheDocument();
      expect(canvas.getByText(exp.role)).toBeInTheDocument();
    });
    
    // Check for proper ARIA attributes
    const section = canvas.getByLabelText('Work experience history');
    expect(section).toBeInTheDocument();
  });
  
  await step('Keyboard navigation test', async () => {
    // Focus first interactive element and navigate
    await userEvent.tab();
    
    // Navigate through tabable elements
    for (let i = 0; i < 6; i++) {
      await userEvent.tab();
    }
  });
};

// Story with a single experience item
export const SingleExperience = () => <Template experienceData={singleExperience} />;
SingleExperience.decorators = [createPortfolioDecorator(singleExperience)];
SingleExperience.parameters = {
  docs: {
    description: {
      story: 'Shows how the experience section appears with just a single experience item.'
    }
  }
};

// Empty state story
export const NoExperience = () => <Template experienceData={emptyExperience} />;
NoExperience.decorators = [createPortfolioDecorator(emptyExperience)];
NoExperience.parameters = {
  docs: {
    description: {
      story: 'Displays the section when no experience data is available. This tests the edge case where the user has not entered any work experience yet.'
    }
  }
};

// Responsive view
export const ResponsiveView = () => <Template />;
ResponsiveView.decorators = [createPortfolioDecorator(mockExperienceData)];
ResponsiveView.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  },
  docs: {
    description: {
      story: 'Shows how the experience section responds to smaller viewport sizes.'
    }
  }
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import Experience from '../containers/Experience';
 * import { PortfolioProvider } from '@context/PortfolioContext';
 * 
 * function App() {
 *   return (
 *     <PortfolioProvider>
 *       <main>
 *         <Experience />
 *       </main>
 *     </PortfolioProvider>
 *   );
 * }
 * ```
 * 
 * ## Context Dependencies
 * 
 * This component relies on the PortfolioContext and specifically uses:
 * - `experience` array from the context through useExperience() hook
 * 
 * ## Experience Data Structure
 * 
 * ```javascript
 * const experienceData = [
 *   {
 *     role: "Senior Developer",
 *     company: "Company Name",
 *     companylogo: "/path/to/logo.png",
 *     date: "Jan 2020 - Present",
 *     desc: "Description of role and responsibilities",
 *     descBullets: [
 *       "Accomplishment 1",
 *       "Accomplishment 2"
 *     ]
 *   }
 * ]
 * ```
 * 
 * ## Accessibility Features
 * 
 * - Section is properly labeled with aria-label
 * - Experience grid has appropriate ARIA attributes
 * - Interactive elements are keyboard navigable
 * - Proper heading hierarchy
 * - Animation is subtle and respects reduced motion preferences
 * 
 * ## Implementation Notes
 * 
 * - Uses the Section component for consistent layout
 * - Implements a responsive grid layout that adjusts to screen size
 * - Automatically handles empty state with graceful degradation
 * - Uses memo to prevent unnecessary rerenders
 */