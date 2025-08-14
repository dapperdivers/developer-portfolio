import React from 'react';
import ExperienceCard from './ExperienceCard';
import { within, userEvent, expect } from '@storybook/test';

// Enhanced sample data with better cybersecurity context
const securityExperienceData = {
  company: 'CyberSec Solutions',
  role: 'Senior Security Engineer',
  date: 'January 2022 – Present',
  desc: 'Leading cybersecurity initiatives and implementing enterprise-grade security solutions for cloud infrastructure.',
  companylogo: 'https://ui-avatars.com/api/?name=CS&background=64ffda&color=0a192f&bold=true',
  descBullets: [
    'Implemented zero-trust security architecture reducing breach risk by 75%',
    'Developed automated threat detection system using AI/ML algorithms',
    'Led security audits and penetration testing for 50+ applications',
    'Mentored junior security analysts in incident response procedures'
  ],
  url: 'https://cybersec-solutions.com'
};

const regularExperienceData = {
  company: 'Tech Innovations',
  role: 'Full Stack Developer',
  date: 'June 2019 – December 2021',
  desc: 'Developed and maintained web applications with modern JavaScript frameworks.',
  companylogo: 'https://ui-avatars.com/api/?name=TI&background=2D8A5F&color=fff',
  descBullets: [
    'Built responsive web applications using React and Node.js',
    'Implemented RESTful APIs and GraphQL endpoints',
    'Optimized application performance and user experience',
    'Collaborated with design team on UI/UX improvements'
  ],
  url: 'https://tech-innovations.com'
};

const shortExperienceData = {
  company: 'StartupCorp',
  role: 'Junior Developer',
  date: 'March 2018 – May 2019',
  desc: 'Entry-level position focused on learning and contributing to various projects.',
  companylogo: 'https://ui-avatars.com/api/?name=SC&background=A85C32&color=fff',
  descBullets: [
    'Contributed to frontend development using React',
    'Participated in code reviews and team meetings'
  ]
};

export default {
  title: 'Molecules/ExperienceCard',
  component: ExperienceCard,
  parameters: {
    docs: {
      description: {
        component: 'A card component displaying work experience details with cybersecurity theming. Supports expansion/collapse functionality and multiple visual variants.',
      },
    },
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a192f' },
        { name: 'navy', value: '#162b3d' },
      ],
    },
  },
  argTypes: {
    data: {
      control: 'object',
      description: 'Experience data object containing role, company, date, description, and other details',
    },
    index: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
      description: 'Index for staggered animation timing',
    },
    variant: {
      control: 'select',
      options: ['default', 'security', 'terminal'],
      description: 'Visual style variant for theming',
    },
    shadow: {
      control: 'boolean',
      description: 'Whether to apply shadow effects to the card',
    },
    isExpanded: {
      control: 'boolean',
      description: 'Whether the card details are expanded by default',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

// Template for creating stories
const Template = (args) => <ExperienceCard {...args} />;

// Default story with security theme
export const Default = Template.bind({});
Default.args = {
  data: securityExperienceData,
  index: 0,
  variant: 'terminal',
  shadow: true,
  isExpanded: false,
};

// Security variant story
export const SecurityVariant = Template.bind({});
SecurityVariant.args = {
  data: securityExperienceData,
  index: 0,
  variant: 'security',
  shadow: true,
  isExpanded: true,
};
SecurityVariant.parameters = {
  docs: {
    description: {
      story: 'ExperienceCard with security variant styling, featuring cybersecurity-themed colors and effects.',
    },
  },
};

// Terminal variant story
export const TerminalVariant = Template.bind({});
TerminalVariant.args = {
  data: regularExperienceData,
  index: 0,
  variant: 'terminal',
  shadow: true,
  isExpanded: false,
};
TerminalVariant.parameters = {
  docs: {
    description: {
      story: 'ExperienceCard with terminal variant styling for a more technical, command-line aesthetic.',
    },
  },
};

// Default variant (no specific theme)
export const DefaultVariant = Template.bind({});
DefaultVariant.args = {
  data: regularExperienceData,
  index: 0,
  variant: 'default',
  shadow: false,
  isExpanded: false,
};

// Expanded state
export const ExpandedState = Template.bind({});
ExpandedState.args = {
  data: securityExperienceData,
  index: 0,
  variant: 'security',
  shadow: true,
  isExpanded: true,
};
ExpandedState.parameters = {
  docs: {
    description: {
      story: 'ExperienceCard in expanded state showing all details and bullet points.',
    },
  },
};

// Short content example
export const ShortContent = Template.bind({});
ShortContent.args = {
  data: shortExperienceData,
  index: 0,
  variant: 'terminal',
  shadow: true,
  isExpanded: false,
};
ShortContent.parameters = {
  docs: {
    description: {
      story: 'ExperienceCard with minimal content to show how it handles shorter descriptions.',
    },
  },
};

// Without company logo
export const NoLogo = Template.bind({});
NoLogo.args = {
  data: {
    ...securityExperienceData,
    companylogo: undefined,
  },
  index: 0,
  variant: 'security',
  shadow: true,
  isExpanded: false,
};
NoLogo.parameters = {
  docs: {
    description: {
      story: 'ExperienceCard without a company logo, showing graceful degradation.',
    },
  },
};

// Without bullets
export const NoBullets = Template.bind({});
NoBullets.args = {
  data: {
    ...securityExperienceData,
    descBullets: undefined,
  },
  index: 0,
  variant: 'security',
  shadow: true,
  isExpanded: true,
};
NoBullets.parameters = {
  docs: {
    description: {
      story: 'ExperienceCard with only description text and no bullet points.',
    },
  },
};

// Multiple cards with staggered animation
export const MultipleCards = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
    <ExperienceCard
      data={securityExperienceData}
      index={0}
      variant="terminal"
      shadow={true}
      isExpanded={false}
    />
    <ExperienceCard
      data={regularExperienceData}
      index={1}
      variant="terminal"
      shadow={true}
      isExpanded={false}
    />
    <ExperienceCard
      data={shortExperienceData}
      index={2}
      variant="terminal"
      shadow={true}
      isExpanded={false}
    />
  </div>
);
MultipleCards.parameters = {
  docs: {
    description: {
      story: 'Multiple ExperienceCards showing staggered animation timing.',
    },
  },
};

// Interactive test story with play function
export const InteractiveTest = Template.bind({});
InteractiveTest.args = {
  data: securityExperienceData,
  index: 0,
  variant: 'security',
  shadow: true,
  isExpanded: false,
};
InteractiveTest.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  
  // Check that the card renders
  const card = canvas.getByTestId('experience-card');
  expect(card).toBeInTheDocument();
  
  // Check that essential content is visible
  expect(canvas.getByText('CyberSec Solutions')).toBeInTheDocument();
  expect(canvas.getByText('Senior Security Engineer')).toBeInTheDocument();
  expect(canvas.getByText('January 2022 – Present')).toBeInTheDocument();
  
  // Test expansion by clicking on the card
  await userEvent.click(card);
  
  // Wait a moment for animation
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Check that bullet points are now visible
  expect(canvas.getByText(/zero-trust security architecture/)).toBeInTheDocument();
};
InteractiveTest.parameters = {
  docs: {
    description: {
      story: 'Interactive test story that demonstrates the expand/collapse functionality.',
    },
  },
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import ExperienceCard from '@molecules/ExperienceCard';
 * 
 * const experienceData = {
 *   company: 'Tech Company',
 *   role: 'Software Engineer', 
 *   date: '2020-2023',
 *   desc: 'Description of role and responsibilities',
 *   descBullets: ['Achievement 1', 'Achievement 2'],
 *   companylogo: '/path/to/logo.png',
 *   url: 'https://company.com'
 * };
 * 
 * <ExperienceCard 
 *   data={experienceData}
 *   variant="security"
 *   shadow={true}
 *   isExpanded={false}
 *   index={0}
 * />
 * ```
 * 
 * ## Props
 * - `data` (required): Object containing experience information
 * - `variant`: Visual style variant ('default', 'security', 'terminal')
 * - `shadow`: Boolean to show/hide card shadow
 * - `isExpanded`: Boolean to control expansion state
 * - `onToggle`: Function called when expand/collapse is triggered
 * - `index`: Number for animation staggering
 * 
 * ## Accessibility
 * - Proper ARIA labels for interactive elements
 * - Keyboard navigation support
 * - Screen reader compatible
 * - Respects reduced motion preferences
 */