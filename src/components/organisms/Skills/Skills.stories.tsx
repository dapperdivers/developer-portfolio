import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Skills from './Skills';
import { within, userEvent, expect } from 'storybook/test';
import PortfolioContext from '@context/PortfolioContext';
import { AnimationContext } from '@context/AnimationContext';
import { mockAnimationData } from '@stories-utils';
import { mockPortfolioData } from '@stories-utils/mocks/data';
import type { PortfolioData } from '@/types/portfolio';

const meta = {
  title: 'Organisms/Skills',
  component: Skills,
  tags: ['autodocs'],
  // Skills takes no props
  render: () => (
    <div style={{ margin: '2rem' }}>
      <Skills />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        component: 'Skills component that displays a grid of skills icons and descriptions. Showcases the developer\'s technical skills with interactive icons and descriptions arranged in a responsive grid layout.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-allowed-attr',
            enabled: true
          }
        ],
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Skills>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with full context
export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  
    await step('Initial render check', async () => {
      // Check section title is rendered
      await expect(canvas.getByRole('heading', { level: 2 })).toBeInTheDocument();
    
      // Check if skills are rendered
      const skillElements = canvas.getAllByRole('img', { hidden: true });
      await expect(skillElements.length).toBeGreaterThan(0);
    });
  
    await step('Skill hover interaction', async () => {
      // Find a skill element and hover on it
      const skillElements = canvas.getAllByRole('img', { hidden: true });
      if (skillElements.length > 0) {
        await userEvent.hover(skillElements[0]);
        // We can't easily test the tooltip here as it might be in a portal
      }
    });
  },
};

// Reduced Motion variant: animations switched off in AnimationContext, so the
// section fades in without the slide and stagger
export const ReducedMotion: Story = {
  decorators: [
    (Story) => (
      <AnimationContext.Provider
        value={{ ...mockAnimationData, animationEnabled: false, prefersReducedMotion: true }}
      >
        <Story />
      </AnimationContext.Provider>
    ),
  ],
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import Skills from '@/stories/containers/Skills';
 * import { PortfolioProvider } from '@context/PortfolioContext';
 * 
 * function App() {
 *   return (
 *     <PortfolioProvider>
 *       <main>
 *         <Skills />
 *       </main>
 *     </PortfolioProvider>
 *   );
 * }
 * ```
 * 
 * ## Context Dependencies
 * 
 * This component consumes data from `PortfolioContext` through the `useSkills` hook:
 * 
 * | Data | Type | Description |
 * |------|------|-------------|
 * | skillsSection.title | string | Section title |
 * | skillsSection.subTitle | string | Section subtitle |
 * | skillsSection.softwareSkills | array | Array of skill objects with name and icon |
 * | skillsSection.skills | array | Array of skill descriptions |
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Semantic HTML structure with appropriate heading levels
 * - ARIA labels for skill icons and descriptions
 * - Support for reduced motion preferences
 * - Keyboard navigable elements
 * - Screen reader friendly text alternatives
 * 
 * ## Performance Optimizations
 * 
 * The component includes several performance optimizations:
 * - Detection of low-end devices for simplified animations
 * - Respect for user's reduced motion preferences
 * - Memoized components and values
 * - Optimized animations for different devices
 */

// Mobile Viewport
export const MobileView: Story = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};

// Many Skills
export const ManySkills: Story = {
};
// This variant uses a customized context with many skills
ManySkills.decorators = [
  (Story) => {
    // Deep clone the mock data to avoid mutations
    const extendedData: PortfolioData = JSON.parse(JSON.stringify(mockPortfolioData));
    
    // Add more skills
    const additionalSkills = [
      { skillName: "AWS", iconName: "logos:aws" },
      { skillName: "Docker", iconName: "logos:docker-icon" },
      { skillName: "Kubernetes", iconName: "logos:kubernetes" },
      { skillName: "GraphQL", iconName: "logos:graphql" },
      { skillName: "Redis", iconName: "logos:redis" },
      { skillName: "PostgreSQL", iconName: "logos:postgresql" },
      { skillName: "MongoDB", iconName: "logos:mongodb" },
      { skillName: "Jenkins", iconName: "logos:jenkins" },
      { skillName: "Travis CI", iconName: "logos:travis-ci" },
      { skillName: "Firebase", iconName: "logos:firebase" }
    ];
    
    extendedData.skillsSection.softwareSkills = [
      ...extendedData.skillsSection.softwareSkills,
      ...additionalSkills
    ];
    
    extendedData.skillsSection.skills.push(
      "⚙️ Experience with containerization and orchestration using Docker and Kubernetes",
      "🗃️ Proficient in both SQL and NoSQL database systems",
      "🔄 Experienced with CI/CD pipelines and DevOps practices"
    );
    
    return (
      <PortfolioContext.Provider value={extendedData}>
        <Story />
      </PortfolioContext.Provider>
    );
  }
];
