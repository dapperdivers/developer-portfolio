import React from 'react';
import SecurityFact from './SecurityFact';
import { FaTerminal, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { withAnimationContext } from '@stories-utils';

export default {
  title: 'GitHub Profile/Atoms/Security/SecurityFact',
  component: SecurityFact,
  tags: ['autodocs'],
  decorators: [withAnimationContext],
  parameters: {
    docs: {
      description: {
        component: 'Security fact component for displaying security-themed information with an icon.',
      },
    },
    componentSubtitle: 'A security component for displaying informative security facts',
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
  <div style={{ padding: '2rem', background: '#121212', maxWidth: '600px', margin: '0 auto' }}>
    <SecurityFact {...args} />
  </div>
);

/**
 * Default story shows the security fact with default settings.
 */
export const Default = Template.bind({});
Default.args = {
  text: 'Multi-factor authentication adds an extra layer of security by requiring multiple forms of verification.',
  animate: true,
};

/**
 * With info icon example.
 */
export const WithInfoIcon = Template.bind({});
WithInfoIcon.args = {
  text: 'Regular security audits help identify vulnerabilities before they can be exploited.',
  icon: FaInfoCircle,
  animate: true,
};

/**
 * With warning icon example.
 */
export const WithWarningIcon = Template.bind({});
WithWarningIcon.args = {
  text: 'Never share your passwords or security credentials with anyone, even if they claim to be from IT support.',
  icon: FaExclamationTriangle,
  animate: true,
};

/**
 * Long text example.
 */
export const LongText = Template.bind({});
LongText.args = {
  text: 'Zero Trust security is a model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter. It operates on the principle of "never trust, always verify."',
  animate: true,
};

/**
 * Without animation example.
 */
export const NoAnimation = Template.bind({});
NoAnimation.args = {
  text: 'Multi-factor authentication adds an extra layer of security by requiring multiple forms of verification.',
  animate: false,
};