import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import Education from './Education';
import { expect, within } from 'storybook/test';
import PortfolioContext from '@context/PortfolioContext';
import type { PortfolioTestValue } from '@context/PortfolioContext';
import type { Education as EducationEntry, PortfolioData } from '@/types/portfolio';
import { AnimationContext } from '@context/AnimationContext';
import { mockAnimationData } from '@stories-utils';

// Mock portfolio data for stories
const mockEducationData: EducationEntry[] = [
  {
    schoolName: "CyberSec University",
    degree: "Master of Science",
    major: "Cybersecurity",
    minor: "Computer Networks",
    duration: "2020 - 2022",
    certifications: [
      {
        name: "CISSP",
        issuer: "ISC2",
        date: "2022",
        credentialId: "CSP-12345"
      },
      {
        name: "CEH",
        issuer: "EC-Council",
        date: "2021",
        credentialId: "CEH-67890"
      }
    ]
  },
  {
    schoolName: "Tech Institute",
    degree: "Bachelor of Science",
    major: "Computer Science",
    minor: "Mathematics",
    duration: "2016 - 2020",
    certifications: [
      {
        name: "CompTIA Security+",
        issuer: "CompTIA",
        date: "2020",
        credentialId: "COMP-11111"
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
        component: 'Cybersecurity-themed Education section that displays educational background and professional credentials. Degrees with a crisp certification list.',
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
  const customContext: PortfolioTestValue = { 
    educationInfo: educationData,
    // Add other required context properties with defaults
    experience: [],
    projects: [],
    contact: {}
  };
  return (Story) => (
    // Partial data on purpose
    <PortfolioContext.Provider value={customContext as PortfolioData}>
      <Story />
    </PortfolioContext.Provider>
  );
};


/**
 * Default story showcasing the cybersecurity-themed education section
 * with multiple education items and certifications
 */
export const CybersecurityTheme: Story = {
  decorators: [createContextWithEducation(mockEducationData)],
  parameters: {
    docs: {
      description: {
        story: 'The main cybersecurity-themed education section with terminal aesthetics, and a ruled certification list.',
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
      expect(canvas.getByText('CyberSec University')).toBeInTheDocument();
      expect(canvas.getByText('Tech Institute')).toBeInTheDocument();
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
        story: 'Shows how the cybersecurity-themed layout adapts when there\'s only one education item. The grid layout adjusts appropriately while maintaining the professional cyber aesthetic.',
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  
    await step('Check single education item', () => {
      expect(canvas.getByText('CyberSec University')).toBeInTheDocument();
      expect(canvas.queryByText('Tech Institute')).not.toBeInTheDocument();
    });
  
    await step('Check certifications are displayed', () => {
      expect(canvas.getByText('CISSP')).toBeInTheDocument();
      expect(canvas.getByText('CEH')).toBeInTheDocument();
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
        schoolName: "Basic University",
        degree: "Bachelor of Arts",
        major: "Liberal Arts",
        duration: "2015 - 2019"
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
        schoolName: "Advanced Cyber Academy",
        degree: "Certificate",
        major: "Penetration Testing",
        duration: "2023",
        certifications: [
          {
            name: "OSCP",
            issuer: "Offensive Security",
            date: "2023",
            credentialId: "OS-54321"
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
