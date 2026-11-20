import React from 'react';
import Footer from './Footer';
import { within, userEvent, expect } from 'storybook/test';
import PortfolioContext from '@context/PortfolioContext';

// Context with only a name: no resume link, so the Resume link falls back to the default PDF
const minimalPortfolioData = {
  greetings: {
    name: "Jane Smith"
  }
};

// Context decorator for providing portfolio data
const createPortfolioDecorator = (data) => (Story) => (
  <PortfolioContext.Provider value={data}>
    <Story />
  </PortfolioContext.Provider>
);

export default {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Site footer with the copyright line, in-page navigation links, resume and contact card downloads, and the social links. ' +
          'It takes no props: the name and resume link come from `PortfolioContext` (`greetings`) through the `useFooter` hook. ' +
          'Below the `md` breakpoint the three groups stack and centre.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'landmark-contentinfo-is-top-level', reviewOnFail: true },
          { id: 'heading-order', reviewOnFail: true },
          { id: 'color-contrast', reviewOnFail: true },
          { id: 'link-name', reviewOnFail: true }
        ],
      },
    },
  },
};

/**
 * The footer with the site data from the global context
 */
export const Default = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial render check', async () => {
      // Name from context, with the current year
      const currentYear = new Date().getFullYear().toString();
      await expect(canvas.getByText(new RegExp(`© ${currentYear} Derek Mackley`))).toBeInTheDocument();

      // Essential links
      await expect(canvas.getByText("Experience")).toBeInTheDocument();
      await expect(canvas.getByText("Projects")).toBeInTheDocument();
      await expect(canvas.getByText("Contact")).toBeInTheDocument();
    });

    await step('Keyboard navigation test', async () => {
      // Tab through the footer and count the links that take focus
      let focusCount = 0;
      for (let i = 0; i < 10; i++) {
        await userEvent.tab();
        const focused = document.activeElement;
        if (focused && focused.tagName === 'A') {
          focusCount++;
        }
      }
      await expect(focusCount).toBeGreaterThan(3);
    });
  },
};

/**
 * Mobile viewport: the groups stack and the "Made with" line moves under the social links
 */
export const Mobile = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};

/**
 * Tablet viewport
 */
export const Tablet = {
  globals: {
    viewport: { value: 'tablet', isRotated: false },
  },
};

/**
 * Context that supplies only a name. The copyright line uses it and the Resume link
 * falls back to the default PDF.
 */
export const MinimalData = {
  decorators: [createPortfolioDecorator(minimalPortfolioData)],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Jane Smith/)).toBeInTheDocument();
    await expect(canvas.getByText("Resume")).toHaveAttribute('href', '/files/Cybersecurity_2025.pdf');
  },
};
