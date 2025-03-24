import React from 'react';
import ProfileError from './ProfileError';
import { withAnimationContext } from '@stories-utils';

export default {
  title: 'GitHub Profile/Molecules/Profile/ProfileError',
  component: ProfileError,
  tags: ['autodocs'],
  decorators: [withAnimationContext],
  parameters: {
    docs: {
      description: {
        component: 'Profile error component for displaying error states with retry functionality.',
      },
    },
    componentSubtitle: 'A molecule component for error states and retry functionality',
  },
  argTypes: {
    message: { control: 'text' },
    onRetry: { action: 'retried' },
    animate: { control: 'boolean' },
  },
};

// Template for the component
const Template = (args) => (
  <div style={{ padding: '2rem', background: '#121212' }}>
    <ProfileError {...args} />
  </div>
);

/**
 * Default story shows the profile error with default message and retry button.
 */
export const Default = Template.bind({});
Default.args = {
  message: 'Unable to load GitHub profile data. Please try again later.',
  onRetry: () => console.log('Retry clicked'),
  animate: true,
};

/**
 * Custom error message example.
 */
export const CustomMessage = Template.bind({});
CustomMessage.args = {
  message: 'API rate limit exceeded. Please try again in a few minutes.',
  onRetry: () => console.log('Retry clicked'),
  animate: true,
};

/**
 * Without retry button example.
 */
export const WithoutRetry = Template.bind({});
WithoutRetry.args = {
  message: 'Unable to load GitHub profile data. Please try again later.',
  onRetry: null,
  animate: true,
};

/**
 * Without animation example.
 */
export const NoAnimation = Template.bind({});
NoAnimation.args = {
  message: 'Unable to load GitHub profile data. Please try again later.',
  onRetry: () => console.log('Retry clicked'),
  animate: false,
};