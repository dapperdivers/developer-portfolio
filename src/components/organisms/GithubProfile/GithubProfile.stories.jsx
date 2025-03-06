import React from 'react';
import GithubProfile from './GithubProfile';
import { within, userEvent, expect } from '@storybook/test';
import PortfolioContext from '@context/PortfolioContext';
import { mockPortfolioData, mockGithubProfile } from '@stories-utils/mockData';
import { withPortfolioContext } from '@stories-utils/decorators';
import axios from 'axios';

// Mock axios for GitHub API calls
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn()
  })),
  isCancel: jest.fn(() => false)
}));

// Mock localStorage for cache testing
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    clear: jest.fn(() => { store = {}; })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

export default {
  title: 'Organisms/GithubProfile',
  component: GithubProfile,
  tags: ['autodocs'],
  decorators: [withPortfolioContext],
  parameters: {
    docs: {
      description: {
        component: 'GitHub profile section that fetches and displays user data from the GitHub API. Includes loading states, error handling, and caching.',
      },
    },
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

// Helper to prepare context with openSource configuration
const withOpenSource = (githubUserName) => {
  const customContext = {
    ...mockPortfolioData,
    openSource: { githubUserName }
  };
  
  return (Story) => (
    <PortfolioContext.Provider value={customContext}>
      <Story />
    </PortfolioContext.Provider>
  );
};

// Helper to mock API responses
const setupMockResponses = (mockResponse, error = false) => {
  // Clear any previous mocks
  jest.clearAllMocks();
  window.localStorage.clear();
  
  if (error) {
    // Mock API error response
    axios.create().get.mockRejectedValueOnce({
      response: { data: { message: mockResponse } }
    });
  } else {
    // Mock successful API response
    axios.create().get.mockResolvedValueOnce({
      data: mockGithubProfile
    });
  }
};

/**
 * Default story shows the GitHub profile with a successful API response.
 * Here we mock axios to return profile data.
 */
export const Success = Template.bind({});
Success.decorators = [withOpenSource('dmackley')];
Success.parameters = {
  mockData: [
    {
      url: 'https://api.github.com/users/dmackley',
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
Loading.decorators = [withOpenSource('dmackley')];
Loading.parameters = {
  mockData: [
    {
      url: 'https://api.github.com/users/dmackley',
      method: 'GET',
      delay: 10000 // Long delay to ensure loading state is shown
    }
  ]
};

/**
 * Error state shows how the component handles API errors.
 * Here we mock axios to return an error response.
 */
export const Error = Template.bind({});
Error.decorators = [withOpenSource('dmackley')];
Error.parameters = {
  mockData: [
    {
      url: 'https://api.github.com/users/dmackley',
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
Retry.decorators = [withOpenSource('dmackley')];
Retry.parameters = {
  mockData: [
    {
      url: 'https://api.github.com/users/dmackley',
      method: 'GET',
      status: 403,
      response: {
        message: 'API rate limit exceeded'
      }
    }
  ]
};
Retry.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  // Wait for error state to appear
  await step('Wait for error state to appear', async () => {
    const retryButton = await canvas.findByRole('button', { name: /retry/i });
    await expect(retryButton).toBeInTheDocument();
    
    // Mock successful response for the retry
    setupMockResponses(mockGithubProfile);
    
    // Click retry button
    await userEvent.click(retryButton);
  });
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import GithubProfile from '@/stories/containers/GithubProfile';
 * 
 * // The component expects a GitHub username to be defined in the 'portfolio.js' file:
 * // export const openSource = { githubUserName: "username" };
 * 
 * function App() {
 *   return <GithubProfile />;
 * }
 * ```
 * 
 * ## Technical Details
 * 
 * This component:
 * - Fetches GitHub profile data using axios
 * - Implements caching via localStorage
 * - Handles loading states during data fetching
 * - Provides error handling and retry functionality
 * - Sanitizes the received data for security
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Provides clear loading indicators
 * - Uses properly labeled retry button for error states
 * - Ensures proper alt text for GitHub avatar image
 * - Maintains focus management during state transitions
 * 
 * ## Edge Cases
 * 
 * The component has robust handling for various edge cases:
 * - API rate limiting
 * - Network failures
 * - Invalid GitHub usernames
 * - Cache usage when API is unavailable
 */

/**
 * This story demonstrates the cached data fallback.
 * When the API request fails but cached data exists,
 * the component will display the cached data with a notice.
 */
export const CachedFallback = Template.bind({});
CachedFallback.decorators = [withOpenSource('dmackley')];
CachedFallback.parameters = {
  docs: {
    description: {
      story: 'When the GitHub API request fails but cached data exists, the component displays the cached profile data with a notice about using cached data.'
    }
  }
};

// Set up cached data and then simulate an API error
CachedFallback.play = async ({ canvasElement }) => {
  // Set up cached profile data
  window.localStorage.setItem(
    'github-profile-dmackley',
    JSON.stringify({
      data: mockGithubProfile,
      timestamp: Date.now()
    })
  );
  
  // Mock API error
  setupMockResponses('API rate limit exceeded', true);
};