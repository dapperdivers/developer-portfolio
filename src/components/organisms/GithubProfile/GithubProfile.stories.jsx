import React from 'react';
import GithubProfile from './GithubProfile';
import { mockGithubProfile, withPortfolioContext, withAnimationContext } from '@stories-utils';

export default {
  title: 'GitHub Profile/Organisms/GithubProfile',
  component: GithubProfile,
  tags: ['autodocs'],
  decorators: [withPortfolioContext, withAnimationContext],
  parameters: {
    docs: {
      description: {
        component: 'GitHub profile section that fetches and displays user data from the GitHub API. Includes loading states, error handling, and caching.',
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
};

// Template for the component
const Template = () => <GithubProfile />;

/**
 * Default story shows the GitHub profile with a successful API response.
 */
export const Success = Template.bind({});
Success.parameters = {
  mockData: [
    {
      url: 'https://api.github.com/users/*',
      method: 'GET',
      status: 200,
      response: mockGithubProfile
    }
  ]
};

/**
 * Loading state shows what the component looks like while waiting for
 * the GitHub API response.
 */
export const Loading = Template.bind({});
Loading.parameters = {
  mockData: [
    {
      url: 'https://api.github.com/users/*',
      method: 'GET',
      delay: 10000 // Long delay to ensure loading state is shown
    }
  ]
};

/**
 * Error state shows how the component handles API errors.
 */
export const Error = Template.bind({});
Error.parameters = {
  mockData: [
    {
      url: 'https://api.github.com/users/*',
      method: 'GET',
      status: 403,
      response: {
        message: 'API rate limit exceeded'
      }
    }
  ]
};

/**
 * This story demonstrates the retry functionality when an error occurs.
 */
export const Retry = Template.bind({});
Retry.parameters = {
  mockData: [
    {
      url: 'https://api.github.com/users/*',
      method: 'GET',
      status: 403,
      response: {
        message: 'API rate limit exceeded'
      }
    }
  ]
};

/**
 * This story demonstrates the cached data fallback.
 */
export const CachedFallback = Template.bind({});
CachedFallback.parameters = {
  docs: {
    description: {
      story: 'When the GitHub API request fails but cached data exists, the component displays the cached profile data with a notice about using cached data.'
    }
  },
  mockData: [
    {
      url: 'https://api.github.com/users/*',
      method: 'GET',
      status: 403,
      response: {
        message: 'API rate limit exceeded'
      }
    }
  ]
};