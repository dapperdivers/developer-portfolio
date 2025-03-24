import React from 'react';
import ProfileHeader from './ProfileHeader';
import { withAnimationContext } from '@stories-utils';

export default {
  title: 'GitHub Profile/Molecules/Profile/ProfileHeader',
  component: ProfileHeader,
  tags: ['autodocs'],
  decorators: [withAnimationContext],
  parameters: {
    docs: {
      description: {
        component: 'Profile header component that combines a security badge with a title for profile sections.',
      },
    },
    componentSubtitle: 'A molecule component for profile section headers',
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    highlightText: { control: 'text' },
    animate: { control: 'boolean' },
  },
};

// Template for the component
const Template = (args) => (
  <div style={{ padding: '2rem', background: '#121212' }}>
    <ProfileHeader {...args} />
  </div>
);

/**
 * Default story shows the profile header with default settings.
 */
export const Default = Template.bind({});
Default.args = {
  title: 'Headquarters',
  subtitle: 'Security Engineer',
  highlightText: 'Security',
  animate: true,
};

/**
 * Custom highlight example.
 */
export const CustomHighlight = Template.bind({});
CustomHighlight.args = {
  title: 'Operations',
  subtitle: 'Cybersecurity Analyst',
  highlightText: 'Cyber',
  animate: true,
};

/**
 * Different title example.
 */
export const DifferentTitle = Template.bind({});
DifferentTitle.args = {
  title: 'Command Center',
  subtitle: 'Chief Security Officer',
  highlightText: 'Security',
  animate: true,
};

/**
 * Without animation example.
 */
export const NoAnimation = Template.bind({});
NoAnimation.args = {
  title: 'Headquarters',
  subtitle: 'Security Engineer',
  highlightText: 'Security',
  animate: false,
};