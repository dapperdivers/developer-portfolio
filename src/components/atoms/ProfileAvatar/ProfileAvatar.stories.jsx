import React from 'react';
import ProfileAvatar from './ProfileAvatar';
import { withAnimationContext } from '@stories-utils';

export default {
  title: 'GitHub Profile/Atoms/UI/ProfileAvatar',
  component: ProfileAvatar,
  tags: ['autodocs'],
  decorators: [withAnimationContext],
  parameters: {
    docs: {
      description: {
        component: 'Profile avatar component with security clearance overlay for displaying user profile images.',
      },
    },
    componentSubtitle: 'A UI component for displaying user avatars with security clearance',
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    clearanceText: { control: 'text' },
    animate: { control: 'boolean' },
  },
};

// Template for the component
const Template = (args) => (
  <div style={{ padding: '2rem', background: '#121212', display: 'flex', justifyContent: 'center' }}>
    <ProfileAvatar {...args} />
  </div>
);

/**
 * Default story shows the profile avatar with default settings.
 */
export const Default = Template.bind({});
Default.args = {
  src: 'https://avatars.githubusercontent.com/u/12345678',
  alt: 'John Doe',
  clearanceText: 'Security Clearance: Top Level',
  animate: true,
};

/**
 * Custom clearance text example.
 */
export const CustomClearance = Template.bind({});
CustomClearance.args = {
  src: 'https://avatars.githubusercontent.com/u/12345678',
  alt: 'Jane Smith',
  clearanceText: 'Jane Smith',
  animate: true,
};

/**
 * Without animation example.
 */
export const NoAnimation = Template.bind({});
NoAnimation.args = {
  src: 'https://avatars.githubusercontent.com/u/12345678',
  alt: 'John Doe',
  clearanceText: 'Security Clearance: Top Level',
  animate: false,
};