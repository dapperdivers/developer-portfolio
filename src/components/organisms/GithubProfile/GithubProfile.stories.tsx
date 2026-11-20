import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect, waitFor } from 'storybook/test';
import axios from 'axios';
import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import GithubProfile, { githubApi } from './GithubProfile';
import { greetings, openSource } from '@/portfolio';

const meta = {
  title: 'Organisms/GithubProfile',
  component: GithubProfile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'GitHub profile section that fetches and displays user data from the GitHub API. The card renders immediately from site data; the API only supplies the avatar, with a fallback when it fails, and caching.',
      },
    },
    componentSubtitle: 'An organism component that manages GitHub profile data fetching and display',
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'image-alt', enabled: true }
        ],
      },
    },
  },
} satisfies Meta<typeof GithubProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories never reach the network: each one swaps the axios adapter of the
// module-level githubApi instance and starts from a known localStorage state.
const CACHE_KEY = `github-profile-${openSource.githubUserName}`;
const FALLBACK_AVATAR = `https://github.com/${openSource.githubUserName}.png`;

// Avatar that needs no network
const SAMPLE_AVATAR = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150"><rect width="150" height="150" fill="#0a192f"/><circle cx="75" cy="60" r="28" fill="#64ffda"/></svg>'
);
// The fields of the GitHub response the card keeps, filled from the site data
const sampleProfile = {
  login: openSource.githubUserName,
  name: greetings.name,
  location: greetings.location,
  html_url: `https://github.com/${openSource.githubUserName}`,
  avatar_url: SAMPLE_AVATAR,
};

const okResponse = (config: InternalAxiosRequestConfig): AxiosResponse => ({
  data: sampleProfile,
  status: 200,
  statusText: 'OK',
  headers: {},
  config,
  request: {}
});

const rateLimited = (config: InternalAxiosRequestConfig) => new axios.AxiosError(
  'Request failed with status code 403',
  axios.AxiosError.ERR_BAD_REQUEST,
  config,
  {},
  {
    data: { message: 'API rate limit exceeded' },
    status: 403,
    statusText: 'Forbidden',
    headers: {},
    config,
    request: {}
  }
);

interface ApiSetup {
  adapter: AxiosAdapter;
  cache?: { data: unknown; timestamp: number };
}

// Builds a story-level beforeEach that installs the adapter and the localStorage
// state, and restores both in the returned cleanup.
const withApi = ({ adapter, cache }: ApiSetup) => () => {
  const previousAdapter = githubApi.defaults.adapter;
  githubApi.defaults.adapter = adapter;
  localStorage.removeItem(CACHE_KEY);
  if (cache) localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  return () => {
    githubApi.defaults.adapter = previousAdapter;
    localStorage.removeItem(CACHE_KEY);
  };
};


const expectCardContent = async (canvas: ReturnType<typeof within>) => {
  const card = await canvas.findByTestId('github-profile-card');
  await expect(card).toBeInTheDocument();
  await expect(canvas.queryByText(/Unable to load|rate limit/i)).not.toBeInTheDocument();
  return card;
};

/**
 * Default story shows the GitHub profile with a successful API response.
 * The adapter resolves immediately with a sample profile (inline SVG avatar).
 * Starts with an empty cache.
 */
export const Success: Story = {
  beforeEach: withApi({
    adapter: (config) => Promise.resolve(okResponse(config))
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = await expectCardContent(canvas);
    await waitFor(() => {
      expect(within(card).getByRole('img', { name: /avatar/i })).toHaveAttribute('src', SAMPLE_AVATAR);
    });
  },
};

/**
 * Slow API: the card is shown immediately with the fallback avatar while the
 * GitHub API response is pending; the sample avatar replaces it after about 3 seconds.
 * Starts with an empty cache.
 */
export const SlowApi: Story = {
  beforeEach: withApi({
    adapter: (config) => new Promise<AxiosResponse>((resolve) => {
      setTimeout(() => resolve(okResponse(config)), 3000);
    })
  }),
};

/**
 * API failed: the API is rate limited (403) but the card still renders in full
 * with the fallback avatar and no error box.
 * The adapter rejects with an axios 403 error. Starts with an empty cache.
 */
export const ApiFailed: Story = {
  beforeEach: withApi({
    adapter: (config) => Promise.reject(rateLimited(config))
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = await expectCardContent(canvas);
    await waitFor(() => {
      expect(within(card).getByRole('img', { name: /avatar/i })).toHaveAttribute('src', FALLBACK_AVATAR);
    });
  },
};

/**
 * This story demonstrates the cached data fallback.
 * Starts with a stale cache entry (older than the 5 minute window) holding the
 * sample profile; the adapter then rejects with a 403, so the cached avatar is used.
 */
export const CachedFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When the GitHub API request fails but cached data exists, the component uses the cached profile data for the avatar.'
      }
    }
  },
  beforeEach: withApi({
    adapter: (config) => Promise.reject(rateLimited(config)),
    cache: { data: sampleProfile, timestamp: Date.now() - 60 * 60 * 1000 }
  }),
};
