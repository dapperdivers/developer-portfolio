import React from 'react';
import Greetings from '../../containers/Greetings';
import { within, userEvent, expect } from '@storybook/test';
import PortfolioContext from '@context/PortfolioContext';
import { mockPortfolioData } from '@utils/mockData';
import { withPortfolioContext, withViewport } from '@utils/decorators';
import code from '@assets/animations/coding.json';
import webdev from '@assets/animations/webdev.json';
import build from '@assets/animations/build.json';

// Helper function to create context with custom greeting data
const createContextWithGreetings = (greetingsData) => {
  const customContext = { ...mockPortfolioData, greetings: greetingsData };
  return (Story) => (
    <PortfolioContext.Provider value={customContext}>
      <Story />
    </PortfolioContext.Provider>
  );
};

export default {
  title: 'Organisms/Greetings',
  component: Greetings,
  tags: ['autodocs'],
  decorators: [withPortfolioContext],
  parameters: {
    docs: {
      description: {
        component: 'Hero section with personal greeting, description, animation, and call-to-action buttons.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'image-alt', enabled: true }
        ],
      },
    },
  },
};


// Template for the component
const Template = () => <Greetings />;

// Default story with standard greeting
export const Default = Template.bind({});
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Check essential elements', async () => {
    // Title should be visible
    await expect(canvas.getByText(mockPortfolioData.greetings.title)).toBeInTheDocument();
    
    // Description should be visible
    await expect(canvas.getByText(mockPortfolioData.greetings.description)).toBeInTheDocument();
    
    // Resume button should be present
    await expect(canvas.getByRole('link', { name: /download resume/i })).toBeInTheDocument();
    
    // Social links should be present
    const socialLinksContainer = canvas.getByRole('list');
    await expect(socialLinksContainer).toBeInTheDocument();
  });
  
  await step('Button interaction', async () => {
    const resumeButton = canvas.getByRole('link', { name: /download resume/i });
    await expect(resumeButton).toHaveAttribute('href', mockPortfolioData.greetings.resumeLink);
  });
};

/**
 * Demonstrates the component with a different animation.
 * This story shows how the hero section can be customized with
 * different Lottie animations.
 */
export const AlternativeAnimation = Template.bind({});
AlternativeAnimation.decorators = [
  createContextWithGreetings({
    ...mockPortfolioData.greetings,
    animation: 'webdev'
  })
];
AlternativeAnimation.parameters = {
  docs: {
    description: {
      story: 'The greeting section can be customized with different animations.'
    }
  }
};

/**
 * Demonstrates the component with different content,
 * showing how it handles longer text.
 */
export const LongContent = Template.bind({});
LongContent.decorators = [
  createContextWithGreetings({
    name: "Derek Mackley",
    title: "Hello, I'm Derek Mackley",
    description: "A passionate Full Stack Web Developer with extensive experience in building secure web applications. I specialize in creating robust, scalable solutions that solve real-world problems. With expertise in JavaScript, React, Node.js, Python, C#, and various cloud technologies, I bring a comprehensive approach to development. I'm dedicated to writing clean, maintainable code and continuously learning new technologies to stay at the forefront of the industry. Let's collaborate to bring your ideas to life!",
    resumeLink: "https://example.com/resume.pdf"
  })
];
LongContent.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Check long content handling', async () => {
    const description = canvas.getByText(/A passionate Full Stack Web Developer with extensive experience/);
    await expect(description).toBeInTheDocument();
  });
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import Greetings from '../containers/Greetings';
 * 
 * // Component uses data from portfolio.js:
 * // export const greetings = {
 * //   name: "Derek Mackley",
 * //   title: "Hi There, I'm Derek",
 * //   description: "A passionate Full Stack Web Developer...",
 * //   resumeLink: "https://example.com/resume.pdf"
 * // };
 * 
 * function App() {
 *   return <Greetings />;
 * }
 * ```
 * 
 * ## Data Requirements
 * 
 * The component depends on the following data structure from portfolio.js:
 * 
 * | Field | Type | Description |
 * |------|------|-------------|
 * | greetings.name | string | Your full name |
 * | greetings.title | string | Hero section title/greeting |
 * | greetings.description | string | Brief description about yourself |
 * | greetings.resumeLink | string | URL to your resume file |
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Uses semantic HTML with proper heading hierarchy
 * - Provides ARIA labels for interactive elements
 * - Ensures proper keyboard focus management
 * - Maintains high contrast for text readability
 * - Uses SVG and animation in an accessible way
 * 
 * ## Animation
 * 
 * The component uses Framer Motion for entrance animations and Lottie for the 
 * decorative animation. These enhance the visual appeal without affecting usability.
 */

// Mobile view
export const Mobile = Template.bind({});
Mobile.decorators = [withViewport('mobile')];
Mobile.parameters = {
  docs: {
    description: {
      story: 'Mobile view of the greeting section, showing how it adapts to smaller screens.'
    }
  }
};

// Tablet view
export const Tablet = Template.bind({});
Tablet.decorators = [withViewport('tablet')];
Tablet.parameters = {
  docs: {
    description: {
      story: 'Tablet view of the greeting section.'
    }
  }
};