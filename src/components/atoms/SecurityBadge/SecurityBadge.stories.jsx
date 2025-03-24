import React from 'react';
import SecurityBadge from './SecurityBadge';
import { FaShieldAlt, FaLock, FaUserShield } from 'react-icons/fa';
import { withAnimationContext } from '@stories-utils';

export default {
  title: 'GitHub Profile/Atoms/Security/SecurityBadge',
  component: SecurityBadge,
  tags: ['autodocs'],
  decorators: [withAnimationContext],
  parameters: {
    docs: {
      description: {
        component: 'Security-themed badge component with icon and text for displaying security credentials or roles.',
      },
    },
    componentSubtitle: 'A security component for displaying credentials and roles',
  },
  argTypes: {
    text: { control: 'text' },
    icon: { control: { disable: true } },
    animate: { control: 'boolean' },
    className: { control: 'text' },
  },
};

// Template for the component
const Template = (args) => (
  <div style={{ padding: '2rem', background: '#121212', display: 'flex', justifyContent: 'center' }}>
    <SecurityBadge {...args} />
  </div>
);

/**
 * Default story shows the security badge with default settings.
 */
export const Default = Template.bind({});
Default.args = {
  text: 'Security Engineer',
  animate: true,
};

/**
 * With custom icon example.
 */
export const WithLockIcon = Template.bind({});
WithLockIcon.args = {
  text: 'Security Clearance: Level 5',
  icon: FaLock,
  animate: true,
};

/**
 * With user shield icon example.
 */
export const WithUserShieldIcon = Template.bind({});
WithUserShieldIcon.args = {
  text: 'Security Administrator',
  icon: FaUserShield,
  animate: true,
};

/**
 * Without animation example.
 */
export const NoAnimation = Template.bind({});
NoAnimation.args = {
  text: 'Security Engineer',
  animate: false,
};
