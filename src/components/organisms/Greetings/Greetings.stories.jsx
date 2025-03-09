import React from 'react';
import Greetings from './Greetings';
import { within, userEvent, expect } from '@storybook/test';
import PortfolioContext from '@context/PortfolioContext';
import { mockPortfolioData, withPortfolioContext, withViewport } from '@stories-utils';
import code from '@assets/animations/lottie/dev-coding.json';
import webdev from '@assets/animations/lottie/dev-webdev.json';
import build from '@assets/animations/lottie/dev-building.json';

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
        component: 'Hero section with personal greeting, description, download resume button, social links, and scroll down indicator.',
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
    layout: 'fullscreen',
  },
};


// Template for the component
const Template = () => <Greetings />;

// Default story with standard greeting
export const Default = Template.bind({});
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  // Test heading elements
  await step('Verify greeting elements are present', async () => {
    const headingElement = canvas.getByTestId('greeting-heading');
    const nameElement = canvas.getByTestId('name-heading');
    const descriptionElement = canvas.getByTestId('title-text');
    
    expect(headingElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
  
  // Test download button
  await step('Verify download button works', async () => {
    const downloadButton = canvas.getByText('Download Resume');
    expect(downloadButton).toBeInTheDocument();
    
    // Click the download button (note: actual download functionality can't be fully tested in Storybook)
    await userEvent.click(downloadButton);
  });
  
  // Test SocialLinks component is present after the download button
  await step('Verify social links are present and correctly positioned', async () => {
    // Look for the social links container
    const socialLinksContainer = canvas.getByRole('list');
    expect(socialLinksContainer).toBeInTheDocument();
    
    // Verify social links appear after the download button in the DOM
    const downloadButton = canvas.getByText('Download Resume');
    const downloadButtonParent = downloadButton.closest('div');
    const socialLinksParent = socialLinksContainer.closest('div');
    
    // Check that the social links div comes after the download button div in the DOM order
    expect(socialLinksParent.compareDocumentPosition(downloadButtonParent) & Node.DOCUMENT_POSITION_PRECEDING)
      .toBeTruthy();
  });
  
  // Test scroll down button
  await step('Verify scroll down component is present', async () => {
    const scrollDownLabel = canvas.getByText('SCROLL_DOWN');
    expect(scrollDownLabel).toBeInTheDocument();
    
    // Find the ScrollDown component by its container class
    const scrollDownContainer = canvas.getByText('SCROLL_DOWN').closest('.scroll-down-container');
    expect(scrollDownContainer).toBeInTheDocument();
    
    // Click the scroll down button
    await userEvent.click(scrollDownContainer);
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
 * import Greetings from '@/stories/containers/Greetings';
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

// Mobile viewport story
export const Mobile = Template.bind({});
Mobile.parameters = {
  viewport: { defaultViewport: 'mobile1' },
};

// Tablet viewport story
export const Tablet = Template.bind({});
Tablet.parameters = {
  viewport: { defaultViewport: 'tablet' },
};

// Story with customized greeting content
export const CustomContent = Template.bind({});
CustomContent.decorators = [
  createContextWithGreetings({
    title: "Hello World!",
    name: "Jane Developer",
    description: "Frontend Developer & UI/UX Enthusiast",
    resumeLink: "jane-developer-resume.pdf",
  }),
];