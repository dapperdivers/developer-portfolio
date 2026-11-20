import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import Education from './Education';
import { expect, within } from 'storybook/test';
import PortfolioContext from '@context/PortfolioContext';
import type { Education as EducationEntry, PortfolioData } from '@/types/portfolio';
import { AnimationContext } from '@context/AnimationContext';
import { mockAnimationData } from '@stories-utils';
import { siteData } from '../storyFixtures';

// Fictional sample data for the stories that vary the content
const mockEducationData: EducationEntry[] = [
  {
    schoolName: "Example University",
    degree: "Master of Science",
    major: "Cybersecurity",
    minor: "Computer Networks",
    duration: "May 2022",
    certifications: [
      {
        name: "Example Security Practitioner",
        issuer: "Example Certification Board",
        date: "Mar 2022",
        credentialId: "EX-104233"
      },
      {
        name: "Example Ethical Hacking Associate",
        issuer: "Example Security Council",
        date: "Nov 2021"
      }
    ]
  },
  {
    schoolName: "Example Institute of Technology",
    degree: "Bachelor of Science",
    major: "Computer Science",
    minor: "Mathematics",
    duration: "May 2020",
    certifications: [
      {
        name: "Example Systems Foundations",
        issuer: "Example Certification Board",
        date: "Jun 2020",
        credentialId: "EX-208841"
      }
    ]
  }
];

const meta = {
  title: 'Organisms/Education',
  component: Education,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'The Education section: a grid of EducationCards (school, degree, major, minor and a ruled certification list) with an empty state.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'heading-order', enabled: true },
          { id: 'landmark-unique', enabled: true },
          { id: 'color-contrast', enabled: true }
        ],
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', background: 'var(--color-navy)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Education>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create a context with specific education data
const createContextWithEducation = (educationData: EducationEntry[]): Decorator => {
  const customContext: PortfolioData = { ...siteData, educationInfo: educationData };
  return (Story) => (
    <PortfolioContext.Provider value={customContext}>
      <Story />
    </PortfolioContext.Provider>
  );
};


/**
 * Default story showcasing the cybersecurity-themed education section
 * with multiple education items and certifications
 */
export const CybersecurityTheme: Story = {
  decorators: [createContextWithEducation(siteData.educationInfo)],
  parameters: {
    docs: {
      description: {
        story: 'The real education section from the site data.',
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  
    await step('Check section title and cybersecurity theme', () => {
      expect(canvas.getByText('Education & Certifications')).toBeInTheDocument();
    });
  
    await step('No fake verification badge or testimonial block', () => {
      expect(canvas.queryByText('CREDENTIALS VERIFIED')).not.toBeInTheDocument();
      expect(canvas.queryByText(/Professional Recommendation/)).not.toBeInTheDocument();
    });
  
    await step('Check education cards', () => {
      expect(canvas.getByText(siteData.educationInfo[0].schoolName)).toBeInTheDocument();
    });
  
  },
};

/**
 * Story demonstrating the education section with a single education item
 */
export const SingleEducation: Story = {
  decorators: [
    createContextWithEducation([mockEducationData[0]])
  ],
  parameters: {
    docs: {
      description: {
        story: 'How the layout adapts when there is only one education item.',
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  
    await step('Check single education item', () => {
      expect(canvas.getByText('Example University')).toBeInTheDocument();
      expect(canvas.queryByText('Example Institute of Technology')).not.toBeInTheDocument();
    });
  
    await step('Check certifications are displayed', () => {
      expect(canvas.getByText('Example Security Practitioner')).toBeInTheDocument();
      expect(canvas.getByText('Example Ethical Hacking Associate')).toBeInTheDocument();
    });
  },
};

/**
 * Story showing the empty state with terminal-style error display
 */
export const EmptyStateTerminal: Story = {
  decorators: [createContextWithEducation([])],
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the empty state shown when no education data is available.',
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  
    await step('Check empty state terminal', () => {
      // The section title should still be visible
      expect(canvas.getByText('Education & Certifications')).toBeInTheDocument();
    
      // The empty state explains that there is nothing to show yet
      expect(canvas.getByText('No Education Data Available')).toBeInTheDocument();
      expect(canvas.getByText(/will be displayed here when available/)).toBeInTheDocument();
    });
  },
};

/**
 * Story showcasing education without certifications
 */
export const WithoutCertifications: Story = {
  decorators: [
    createContextWithEducation([
      {
        schoolName: "Example Community College",
        degree: "Bachelor of Arts",
        major: "Liberal Arts",
        duration: "May 2019"
        // No certifications
      }
    ])
  ],
  parameters: {
    docs: {
      description: {
        story: 'Shows how the education cards adapt when there are no professional certifications, focusing purely on academic credentials.',
      }
    }
  },
};

/**
 * Story demonstrating multiple education items for testing layout
 */
export const MultipleEducationItems: Story = {
  decorators: [
    createContextWithEducation([
      ...mockEducationData,
      {
        schoolName: "Example Security Academy",
        degree: "Certificate",
        major: "Penetration Testing",
        duration: "Sep 2023",
        certifications: [
          {
            name: "Example Penetration Tester",
            issuer: "Example Security Council",
            date: "Sep 2023",
            credentialId: "EX-543210"
          }
        ]
      }
    ])
  ],
  parameters: {
    docs: {
      description: {
        story: 'Tests the grid layout with multiple education items to ensure proper spacing and responsive behavior.',
      }
    }
  },
};

/**
 * Reduced motion: animations switched off in AnimationContext
 */
export const ReducedMotion: Story = {
  decorators: [
    createContextWithEducation(mockEducationData),
    (Story) => (
      <AnimationContext.Provider
        value={{ ...mockAnimationData, animationEnabled: false, prefersReducedMotion: true }}
      >
        <Story />
      </AnimationContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Animations disabled through AnimationContext, as happens when the visitor prefers reduced motion. The cards render in place with no entrance slide or stagger.',
      }
    }
  },
};
