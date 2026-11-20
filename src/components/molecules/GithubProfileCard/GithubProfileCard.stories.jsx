import React from 'react';
import GithubProfileCard from './GithubProfileCard';
import { mockGithubProfile } from '@data/mockPortfolioData';
import { greetings, securityFacts, openSource } from '@/portfolio';

export default {
  title: 'Molecules/GithubProfileCard',
  component: GithubProfileCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'GitHub profile card component for displaying contact information from the site data. The GitHub API result only supplies the avatar. Enhanced with map visualization and security-themed decorative elements.',
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
  // Site data the organism passes in
  args: {
    greetings,
    securityFacts,
    githubUserName: openSource.githubUserName,
    animated: true,
  },
  argTypes: {
    animated: { control: 'boolean' },
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
  prof: mockGithubProfile
};

/**
 * API failed: no profile data (rate limit, blocked or slow API). The card still
 * renders in full with the fallback avatar and no error box.
 */
export const ApiFailed = Template.bind({});
ApiFailed.args = {
  prof: null
};

/**
 * Empty profile object, the initial state before the API answers.
 */
export const EmptyProfile = Template.bind({});
EmptyProfile.args = {
  prof: {}
};

/**
 * No Location story shows the GitHub profile card without location data.
 */
export const NoLocation = Template.bind({});
NoLocation.args = {
  prof: {
    ...mockGithubProfile,
    location: null
  }
};