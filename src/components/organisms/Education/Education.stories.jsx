import React from 'react';
import Education from './Education';
import { expect, within } from '@storybook/test';
import PortfolioContext from '@context/PortfolioContext';

// Mock portfolio data for stories
const mockEducationData = [
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

export default {
  title: 'Organisms/Education',
  component: Education,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Cybersecurity-themed Education section that displays educational background and professional credentials. Features terminal aesthetics, animated cyber grid backgrounds, and security status indicators.',
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
};

// Helper function to create a context with specific education data
const createContextWithEducation = (educationData) => {
  const customContext = { 
    educationInfo: educationData,
    // Add other required context properties with defaults
    personalInfo: {},
    experience: [],
    projects: [],
    skills: {},
    contact: {}
  };
  return (Story) => (
    <PortfolioContext.Provider value={customContext}>
      <Story />
    </PortfolioContext.Provider>
  );
};

// Basic template
const Template = () => <Education />;

/**
 * Default story showcasing the cybersecurity-themed education section
 * with multiple education items and certifications
 */
export const CybersecurityTheme = Template.bind({});
CybersecurityTheme.decorators = [createContextWithEducation(mockEducationData)];
CybersecurityTheme.parameters = {
  docs: {
    description: {
      story: 'The main cybersecurity-themed education section with terminal aesthetics, animated cyber grid background, security status indicator, and terminal output simulation.',
    }
  }
};
CybersecurityTheme.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Check section title and cybersecurity theme', () => {
    expect(canvas.getByText('Education & Certifications')).toBeInTheDocument();
    expect(canvas.getByText(/Academic foundation and professional credentials/)).toBeInTheDocument();
  });
  
  await step('Check security status indicator', () => {
    expect(canvas.getByText('CREDENTIALS VERIFIED')).toBeInTheDocument();
  });
  
  await step('Check education cards', () => {
    expect(canvas.getByText('CyberSec University')).toBeInTheDocument();
    expect(canvas.getByText('Tech Institute')).toBeInTheDocument();
  });
  
  await step('Check terminal output simulation', () => {
    expect(canvas.getByText('validate_credentials --all')).toBeInTheDocument();
    expect(canvas.getByText('Academic credentials: VALID')).toBeInTheDocument();
    expect(canvas.getByText('Security clearance: VERIFIED')).toBeInTheDocument();
  });
};

/**
 * Story demonstrating the education section with a single education item
 */
export const SingleEducation = Template.bind({});
SingleEducation.decorators = [
  createContextWithEducation([mockEducationData[0]])
];
SingleEducation.parameters = {
  docs: {
    description: {
      story: 'Shows how the cybersecurity-themed layout adapts when there\'s only one education item. The grid layout adjusts appropriately while maintaining the professional cyber aesthetic.',
    }
  }
};
SingleEducation.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Check single education item', () => {
    expect(canvas.getByText('CyberSec University')).toBeInTheDocument();
    expect(canvas.queryByText('Tech Institute')).not.toBeInTheDocument();
  });
  
  await step('Check certifications are displayed', () => {
    expect(canvas.getByText('CISSP')).toBeInTheDocument();
    expect(canvas.getByText('CEH')).toBeInTheDocument();
  });
};

/**
 * Story showing the empty state with terminal-style error display
 */
export const EmptyStateTerminal = Template.bind({});
EmptyStateTerminal.decorators = [createContextWithEducation([])];
EmptyStateTerminal.parameters = {
  docs: {
    description: {
      story: 'Demonstrates the cybersecurity-themed empty state when no education data is available. Features a terminal window with realistic command-line interface showing an error state.',
    }
  }
};
EmptyStateTerminal.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Check empty state terminal', () => {
    // The section title should still be visible
    expect(canvas.getByText('Education & Certifications')).toBeInTheDocument();
    
    // Check for terminal window elements
    expect(canvas.getByText('education_data.log')).toBeInTheDocument();
    expect(canvas.getByText('ls -la education/')).toBeInTheDocument();
    expect(canvas.getByText('No education data found')).toBeInTheDocument();
  });
  
  await step('Check terminal controls', () => {
    // Check for terminal window controls (dots)
    const terminalWindow = canvas.getByText('education_data.log').closest('.terminal-window');
    expect(terminalWindow).toBeInTheDocument();
  });
};

/**
 * Story showcasing education without certifications
 */
export const WithoutCertifications = Template.bind({});
WithoutCertifications.decorators = [
  createContextWithEducation([
    {
      schoolName: "Basic University",
      degree: "Bachelor of Arts",
      major: "Liberal Arts",
      duration: "2015 - 2019"
      // No certifications
    }
  ])
];
WithoutCertifications.parameters = {
  docs: {
    description: {
      story: 'Shows how the education cards adapt when there are no professional certifications, focusing purely on academic credentials.',
    }
  }
};

/**
 * Story demonstrating multiple education items for testing layout
 */
export const MultipleEducationItems = Template.bind({});
MultipleEducationItems.decorators = [
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
];
MultipleEducationItems.parameters = {
  docs: {
    description: {
      story: 'Tests the grid layout with multiple education items to ensure proper spacing and responsive behavior.',
    }
  }
};

/**
 * Performance testing story with reduced animations
 */
export const ReducedMotion = Template.bind({});
ReducedMotion.decorators = [createContextWithEducation(mockEducationData)];
ReducedMotion.parameters = {
  docs: {
    description: {
      story: 'Tests the component with reduced motion preferences, ensuring accessibility compliance.',
    }
  },
  css: `
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `
};

/**
 * Dark theme variant (already the default, but explicitly documented)
 */
export const DarkCyberTheme = Template.bind({});
DarkCyberTheme.decorators = [createContextWithEducation(mockEducationData)];
DarkCyberTheme.parameters = {
  docs: {
    description: {
      story: 'The primary dark cybersecurity theme with navy blue backgrounds, cyan accents, and terminal aesthetics.',
    }
  },
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#0a192f' }
    ]
  }
};