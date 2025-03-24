import React from 'react';
import GithubProfileCard from './GithubProfileCard';
import { mockGithubProfile, withPortfolioContext, withAnimationContext } from '@stories-utils';

export default {
  title: 'GitHub Profile/Molecules/Profile/GithubProfileCard',
  component: GithubProfileCard,
  tags: ['autodocs'],
  decorators: [withPortfolioContext, withAnimationContext],
  parameters: {
    docs: {
      description: {
        component: 'GitHub profile card component for displaying user information from GitHub API. Enhanced with map visualization and security-themed decorative elements.',
      },
    },
    componentSubtitle: 'A molecule component that combines profile components into a cohesive card',
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
const Template = (args) => (
  <div style={{ padding: '2rem', background: '#121212' }}>
    <GithubProfileCard {...args} />
  </div>
);

/**
 * Success story shows the GitHub profile card with profile data.
 */
export const Success = Template.bind({});
Success.args = {
  prof: mockGithubProfile,
  error: null,
  onRetry: () => console.log('Retry clicked')
};

/**
 * Error story shows the GitHub profile card with an error message.
 */
export const Error = Template.bind({});
Error.args = {
  prof: null,
  error: 'Unable to load GitHub profile data. API rate limit exceeded.',
  onRetry: () => console.log('Retry clicked')
};

/**
 * No Retry story shows the GitHub profile card with an error message but no retry button.
 */
export const NoRetry = Template.bind({});
NoRetry.args = {
  prof: null,
  error: 'Unable to load GitHub profile data. API rate limit exceeded.',
  onRetry: null
};

/**
 * No Location story shows the GitHub profile card without location data.
 */
export const NoLocation = Template.bind({});
NoLocation.args = {
  prof: {
    ...mockGithubProfile,
    location: null
  },
  error: null,
  onRetry: () => console.log('Retry clicked')
};