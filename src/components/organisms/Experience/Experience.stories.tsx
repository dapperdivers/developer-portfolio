import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import Experience from './Experience';
import { within, userEvent, expect } from 'storybook/test';
import PortfolioContext from '@context/PortfolioContext';
import type { Experience as ExperienceEntry, PortfolioData } from '@/types/portfolio';
import { AnimationProvider } from '@context/AnimationContext';
import { siteData } from '../storyFixtures';

// Enhanced mock experience data with cybersecurity theme
const mockExperienceData: ExperienceEntry[] = [
  {
    role: "Principal Security Engineer",
    company: "CyberGuard Systems",
    companylogo: "https://ui-avatars.com/api/?name=CG&background=64ffda&color=0a192f&bold=true",
    date: "January 2022 – Present",
    desc: "Leading cybersecurity initiatives and implementing enterprise-grade security solutions for cloud infrastructure and applications.",
    descBullets: [
      "Architected zero-trust security framework reducing breach risk by 85%",
      "Implemented automated threat detection using AI/ML algorithms",
      "Led security audits and penetration testing for 100+ applications",
      "Mentored security team and established incident response protocols"
    ],
    url: "https://cyberguard.com"
  },
  {
    role: "Senior Security Developer",
    company: "SecureCode Solutions",
    companylogo: "https://ui-avatars.com/api/?name=SC&background=ff4d4d&color=fff&bold=true",
    date: "June 2019 – December 2021",
    desc: "Developed secure applications and implemented security-first development practices across multiple projects.",
    descBullets: [
      "Built secure authentication system with multi-factor verification",
      "Implemented comprehensive security testing using OWASP guidelines", 
      "Conducted code security reviews and vulnerability assessments",
      "Collaborated with security team on secure coding standards"
    ],
    url: "https://securecode.com"
  },
  {
    role: "Junior Security Analyst",
    company: "InfoSec Dynamics",
    companylogo: "https://ui-avatars.com/api/?name=ID&background=A85C32&color=fff&bold=true",
    date: "March 2017 – May 2019",
    desc: "Entry-level security position focused on monitoring, incident response, and learning security fundamentals.",
    descBullets: [
      "Monitored security alerts and performed initial threat analysis",
      "Assisted in incident response and forensic investigations",
      "Created security documentation and standard operating procedures",
      "Participated in vulnerability assessment and remediation efforts"
    ],
    url: "https://infosec-dynamics.com"
  }
];

// Different variations of experience data for different stories
const singleExperience = [mockExperienceData[0]];
const emptyExperience: ExperienceEntry[] = [];

// The real site data with the experience section replaced
const createMockPortfolioData = (experienceData: ExperienceEntry[]): PortfolioData => ({
  ...siteData,
  experience: experienceData,
});

// Context decorator factory to provide different mock data for each story
const createPortfolioDecorator = (experienceData: ExperienceEntry[]): Decorator => (Story) => (
  <AnimationProvider>
    <PortfolioContext.Provider value={createMockPortfolioData(experienceData)}>
      <Story />
    </PortfolioContext.Provider>
  </AnimationProvider>
);


const meta = {
  title: 'Organisms/Experience',
  component: Experience,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Experience section component displaying work history. Reads the work history from PortfolioContext and passes it to the props-only Timeline, with a console for filtering with the timeline hidden extras wired in.',
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
      default: 'cyberpunk',
      values: [
        { name: 'cyberpunk', value: '#0a0e1a' },
        { name: 'dark', value: '#0a192f' },
        { name: 'navy', value: '#162b3d' },
      ],
    }
  },
} satisfies Meta<typeof Experience>;

export default meta;
type Story = StoryObj<typeof meta>;


// Template for the component with context wrapper
const Template = () => (
  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
    <Experience />
  </div>
);

// Default story with multiple experience items
export const Default: Story = {
  render: () => <Template />,
  decorators: [createPortfolioDecorator(siteData.experience)],
  play: async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', () => {
    // Check section title
    expect(canvas.getByText('Experience')).toBeInTheDocument();
    
    // The most recent role is shown
    expect(canvas.getAllByText(siteData.experience[0].role).length).toBeGreaterThan(0);
    
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
  })
  }
};

// Story with a single experience item (fictional sample)
export const SingleExperience: Story = {
  render: () => <Template />,
  decorators: [createPortfolioDecorator(singleExperience)],
  parameters: {
  docs: {
    description: {
      story: 'Shows how the experience section appears with just a single experience item.'
    }
  }
  }
};

// Empty state story
export const NoExperience: Story = {
  render: () => <Template />,
  decorators: [createPortfolioDecorator(emptyExperience)],
  parameters: {
  docs: {
    description: {
      story: 'Displays the section when no experience data is available. This tests the edge case where the user has not entered any work experience yet.'
    }
  }
  }
};

// Responsive view
export const ResponsiveView: Story = {
  render: () => <Template />,
  decorators: [createPortfolioDecorator(siteData.experience)],
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: {
  docs: {
    description: {
      story: 'Shows how the experience section responds to smaller viewport sizes.'
    }
  }
  }
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import Experience from '@/stories/containers/Experience';
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