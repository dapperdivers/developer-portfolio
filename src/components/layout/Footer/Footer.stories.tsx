import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import Footer from './Footer';
import { within, userEvent, expect } from 'storybook/test';
import PortfolioContext from '@context/PortfolioContext';
import type { PortfolioTestValue } from '@context/PortfolioContext';
import type { PortfolioData } from '@/types/portfolio';
import { withSiteData } from '../../organisms/storyFixtures';

// Context with only a name: no resume link, so the Resume link falls back to the default PDF
const minimalPortfolioData: PortfolioTestValue = {
  greetings: {
    name: "Alex Example"
  }
};

// Context decorator for providing portfolio data
const createPortfolioDecorator = (data: PortfolioTestValue): Decorator => (Story) => (
  // Partial data on purpose
  <PortfolioContext.Provider value={data as PortfolioData}>
    <Story />
  </PortfolioContext.Provider>
);

// Stubs the cluster-status endpoint for a story. Other requests pass through.
const clusterFeed = (respond: () => Response | Promise<Response>) => ({
  loaders: [
    async () => {
      const realFetch = window.fetch;
      window.fetch = ((input: RequestInfo | URL, init?: RequestInit) =>
        String(input).includes('/api/cluster-status') ? Promise.resolve(respond()) : realFetch(input, init)) as typeof window.fetch;
      return {};
    },
  ],
});

const badge = (title: string, value: string, color = 'green') => ({ title, value, color });
const feedBody = (clusterState: string) =>
  JSON.stringify({
    updatedAt: '2026-11-20T14:32:00.000Z',
    badges: {
      cluster_status: badge('Cluster', clusterState),
      cluster_node_count: badge('Nodes', '11'),
      cluster_pod_count: badge('Pods', '266'),
    },
  });

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  decorators: [withSiteData()],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Site footer with the copyright line, in-page navigation links, resume and contact card downloads, and a line saying the site is served from the garage cluster with live node and pod counts (from `useClusterStatus`, with a plain fallback when the feed is unavailable). ' +
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
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The footer with the real site data
 */
export const Default: Story = {
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

/** Live numbers from the cluster feed. */
export const ClusterUp: Story = {
  ...clusterFeed(() => new Response(feedBody('up'))),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText(/11 nodes · 266 pods · all systems up/)).toBeInTheDocument();
    await expect(canvas.getByTestId('footer-cluster-line')).toHaveAttribute('href', 'https://github.com/dapperdivers/dapper-cluster');
  },
};

export const ClusterDegraded: Story = {
  ...clusterFeed(() => new Response(feedBody('degraded'))),
  play: async ({ canvasElement }) => {
    await expect(await within(canvasElement).findByText(/266 pods · degraded/)).toBeInTheDocument();
  },
};

/** Feed down: only the fixed text, no numbers. */
export const ClusterUnavailable: Story = {
  ...clusterFeed(() => new Response('{}', { status: 503 })),
  play: async ({ canvasElement }) => {
    const line = within(canvasElement).getByTestId('footer-cluster-line');
    await expect(line).toHaveTextContent(/^Served from a Talos cluster in my garage$/);
  },
};

/**
 * Mobile viewport: the groups stack and centre
 */
export const Mobile: Story = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};

/**
 * Tablet viewport
 */
export const Tablet: Story = {
  globals: {
    viewport: { value: 'tablet', isRotated: false },
  },
};

/**
 * Context that supplies only a name. The copyright line uses it and the Resume link
 * falls back to the default PDF.
 */
export const MinimalData: Story = {
  decorators: [createPortfolioDecorator(minimalPortfolioData)],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Alex Example/)).toBeInTheDocument();
    await expect(canvas.getByText("Resume")).toHaveAttribute('href', '/files/Cybersecurity_2025.pdf');
  },
};
