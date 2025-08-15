import React from 'react';
import ExperienceCard from './ExperienceCard';
import { within, userEvent, expect } from 'storybook/test';
// Context providers are now handled globally in preview.tsx

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
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A refactored ExperienceCard component built with atomic design principles. Now composed of six atomic components:

**Atomic Components Used:**
- \`ExperienceHeader\` - Company logo, role, company name, and date
- \`ExperienceToggle\` - Expand/collapse button with glow effects  
- \`ExperienceContent\` - Description and bullet points section
- \`SecurityClassification\` - Security banner with animated bars
- \`TerminalFooter\` - Terminal-style footer with prompt and cursor
- \`CyberpunkEffects\` - Visual effects (glow, corners, scan lines, data stream)

**Benefits of Atomic Decomposition:**
- ✅ **Isolated Styling**: Each component has its own CSS scope
- ✅ **Single Responsibility**: Each atom handles one specific concern
- ✅ **No Style Conflicts**: Eliminated overlapping selectors
- ✅ **Easier Maintenance**: Debug and update individual parts
- ✅ **Better Reusability**: Atoms can be used in other components
- ✅ **Improved Performance**: Optimized animations per component
        `,
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
      options: ['default', 'security', 'terminal', 'cyberpunk'],
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
      <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

// Template for creating stories
const Template = (args) => <ExperienceCard {...args} />;

// Default story - showcasing atomic architecture
export const Default = Template.bind({});
Default.args = {
  data: securityExperienceData,
  index: 0,
  variant: 'cyberpunk',
  shadow: true,
  isExpanded: false,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default ExperienceCard built with atomic components. Clean separation of concerns with isolated styling.',
    },
  },
};

// Atomic Architecture Demo
export const AtomicArchitectureDemo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
    <div style={{ background: 'rgba(100, 255, 218, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(100, 255, 218, 0.3)' }}>
      <h3 style={{ color: '#64ffda', marginBottom: '1rem', marginTop: 0 }}>🏗️ Atomic Architecture</h3>
      <p style={{ color: 'rgba(241, 245, 249, 0.8)', margin: 0, fontSize: '0.9rem' }}>
        This ExperienceCard is now composed of 6 isolated atomic components, eliminating the previous styling conflicts and improving maintainability.
      </p>
    </div>
    <ExperienceCard
      data={securityExperienceData}
      index={0}
      variant="cyberpunk"
      shadow={true}
      isExpanded={true}
    />
  </div>
);
AtomicArchitectureDemo.parameters = {
  docs: {
    description: {
      story: 'Demonstration of the new atomic architecture with expanded state showing all atomic components.',
    },
  },
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
      story: 'Security variant with green cybersecurity theming applied across all atomic components.',
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
      story: 'Terminal variant with standard cyan cyberpunk theming.',
    },
  },
};

// Cyberpunk variant story
export const CyberpunkVariant = Template.bind({});
CyberpunkVariant.args = {
  data: securityExperienceData,
  index: 0,
  variant: 'cyberpunk',
  shadow: true,
  isExpanded: true,
};
CyberpunkVariant.parameters = {
  docs: {
    description: {
      story: 'Cyberpunk variant with enhanced visual effects and grid patterns.',
    },
  },
};

// Expanded state
export const ExpandedState = Template.bind({});
ExpandedState.args = {
  data: securityExperienceData,
  index: 0,
  variant: 'cyberpunk',
  shadow: true,
  isExpanded: true,
};
ExpandedState.parameters = {
  docs: {
    description: {
      story: 'ExperienceCard in expanded state showing all atomic components working together.',
    },
  },
};

// Collapsed state
export const CollapsedState = Template.bind({});
CollapsedState.args = {
  data: securityExperienceData,
  index: 0,
  variant: 'cyberpunk',
  shadow: true,
  isExpanded: false,
};
CollapsedState.parameters = {
  docs: {
    description: {
      story: 'ExperienceCard in collapsed state showing only the header atomic components.',
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
  variant: 'cyberpunk',
  shadow: true,
  isExpanded: false,
};
NoLogo.parameters = {
  docs: {
    description: {
      story: 'ExperienceCard without a company logo, showing graceful degradation in ExperienceHeader atom.',
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
  variant: 'cyberpunk',
  shadow: true,
  isExpanded: true,
};
NoBullets.parameters = {
  docs: {
    description: {
      story: 'ExperienceCard with only description text, showing ExperienceContent atom handling missing bullets.',
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
  isExpanded: true,
};
ShortContent.parameters = {
  docs: {
    description: {
      story: 'ExperienceCard with minimal content showing how atomic components handle shorter data.',
    },
  },
};

// Multiple cards with staggered animation
export const MultipleCards = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
    <div style={{ background: 'rgba(100, 255, 218, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(100, 255, 218, 0.3)' }}>
      <h3 style={{ color: '#64ffda', marginBottom: '0.5rem', marginTop: 0 }}>🎭 Multiple Cards Demo</h3>
      <p style={{ color: 'rgba(241, 245, 249, 0.8)', margin: 0, fontSize: '0.9rem' }}>
        Each card is composed of the same atomic components but with isolated styling. No conflicts between cards.
      </p>
    </div>
    <ExperienceCard
      data={securityExperienceData}
      index={0}
      variant="security"
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
      variant="cyberpunk"
      shadow={true}
      isExpanded={false}
    />
  </div>
);
MultipleCards.parameters = {
  docs: {
    description: {
      story: 'Multiple ExperienceCards demonstrating no style conflicts between instances thanks to atomic isolation.',
    },
  },
};

// Interactive test story with play function
export const InteractiveTest = Template.bind({});
InteractiveTest.args = {
  data: securityExperienceData,
  index: 0,
  variant: 'cyberpunk',
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
      story: 'Interactive test demonstrating the expand/collapse functionality with atomic components.',
    },
  },
};

// Playground story
export const Playground = Template.bind({});
Playground.args = {
  data: securityExperienceData,
  index: 0,
  variant: 'cyberpunk',
  shadow: true,
  isExpanded: false,
};
Playground.parameters = {
  docs: {
    description: {
      story: 'Playground for experimenting with different props and seeing how atomic components respond.',
    },
  },
};

/**
 * ## Atomic Architecture Benefits
 * 
 * The ExperienceCard has been successfully decomposed into atomic components:
 * 
 * ### 🧩 Atomic Components
 * - **ExperienceHeader**: Logo, role, company, date (isolated header logic)
 * - **ExperienceToggle**: Expand/collapse button (isolated toggle logic)
 * - **ExperienceContent**: Description and bullets (isolated content logic)
 * - **SecurityClassification**: Security banner (isolated banner logic)
 * - **TerminalFooter**: Terminal prompt (isolated footer logic)
 * - **CyberpunkEffects**: Visual effects (isolated effects logic)
 * 
 * ### ✅ Problems Solved
 * - **Style Conflicts**: Each atom has isolated CSS scope
 * - **Maintenance Issues**: Easy to debug and update individual parts
 * - **Responsibility Overload**: Single responsibility per atom
 * - **Animation Complexity**: Optimized animations per component
 * - **Reusability**: Atoms can be used in other molecules/organisms
 * 
 * ### 📈 Performance Improvements
 * - Reduced CSS bundle size through elimination of duplicate styles
 * - Better animation performance with isolated motion components
 * - Improved tree-shaking of unused atomic components
 * - Optimized rendering with contained layout styles
 * 
 * ### 🛠️ Developer Experience
 * - Clear separation of concerns
 * - Easier testing of individual atoms
 * - Better TypeScript support with focused PropTypes
 * - Simplified debugging with isolated components
 * 
 * ## Usage
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
 *   variant="cyberpunk"
 *   shadow={true}
 *   isExpanded={false}
 *   index={0}
 * />
 * ```
 */