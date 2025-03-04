import React from 'react';
import Skills from '../../containers/Skills';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { withPortfolioContext } from '../utils/decorators';

export default {
  title: 'Organisms/Skills',
  component: Skills,
  tags: ['autodocs'],
  decorators: [withPortfolioContext],
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
    viewport: {
      defaultViewport: 'desktop',
    },
    layout: 'fullscreen',
  },
};

// Template for the component
const Template = (args) => (
  <div style={{ margin: '2rem' }}>
    <Skills {...args} />
  </div>
);

// Default story with full context
export const Default = Template.bind({});
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', async () => {
    // Check section title is rendered
    await expect(canvas.getByText('Skills')).toBeInTheDocument();
    
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
};

// Reduced Motion variant
export const ReducedMotion = Template.bind({});
ReducedMotion.parameters = {
  chromatic: { reducedMotion: true },
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import Skills from '../containers/Skills';
 * import { PortfolioProvider } from '../context/PortfolioContext';
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
export const MobileView = Template.bind({});
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};

// Many Skills
export const ManySkills = Template.bind({});
// This variant uses a customized context with many skills
ManySkills.decorators = [
  (Story) => {
    // Deep clone the mock data to avoid mutations
    const extendedData = JSON.parse(JSON.stringify(require('../utils/mockData').mockPortfolioData));
    
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

import { PortfolioContext } from '../../context/PortfolioContext';
