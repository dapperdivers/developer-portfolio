import React from 'react';
import SecurityFact from './SecurityFact';
import { FaTerminal, FaInfoCircle, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';

export default {
  title: 'atoms/SecurityFact',
  component: SecurityFact,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Security fact component for displaying security-themed information with an icon. Perfect for showing cybersecurity tips and facts in the developer portfolio.',
      },
    },
    componentSubtitle: 'A security component for displaying informative security facts',
    layout: 'centered',
  },
  argTypes: {
    text: { 
      control: 'text',
      description: 'The security fact text to display'
    },
    icon: { 
      control: { disable: true },
      description: 'Icon component to display (React component)'
    },
    animate: { 
      control: 'boolean',
      description: 'Whether to animate the component'
    },
    className: { 
      control: 'text',
      description: 'Additional CSS classes'
    },
  },
};

// Template for the component
const Template = (args) => (
  <div style={{ 
    padding: '2rem', 
    background: 'var(--color-navy)', 
    maxWidth: '600px', 
    margin: '0 auto',
    borderRadius: '8px'
  }}>
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
 * Default variant with cybersecurity theme
 */
export const Secure = Template.bind({});
Secure.args = {
  text: 'Zero Trust security operates on the principle of "never trust, always verify" for all network access.',
  icon: FaShieldAlt,
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
 * Critical security warning with warning icon.
 */
export const Critical = Template.bind({});
Critical.args = {
  text: 'Never share your passwords or security credentials with anyone, even if they claim to be from IT support.',
  icon: FaExclamationTriangle,
  animate: true,
};

/**
 * Long text example showing how the component handles longer security facts.
 */
export const LongText = Template.bind({});
LongText.args = {
  text: 'The average cost of a data breach in 2023 was $4.45 million globally. This highlights the critical importance of implementing robust security measures throughout the entire software development lifecycle, from initial design to deployment and maintenance.',
  animate: true,
};

/**
 * Without animation example for accessibility or performance scenarios.
 */
export const NoAnimation = Template.bind({});
NoAnimation.args = {
  text: 'Multi-factor authentication adds an extra layer of security by requiring multiple forms of verification.',
  animate: false,
};

/**
 * Interactive playground for testing different security facts
 */
export const Playground = Template.bind({});
Playground.args = {
  text: 'Did you know? The first computer bug was an actual moth caught in a relay in 1947.',
  animate: true,
};

// Real examples from the portfolio
export const RealExample1 = Template.bind({});
RealExample1.args = {
  text: 'The term "firewall" originated from construction, where it was a wall designed to prevent fire from spreading.',
  animate: true,
};

export const RealExample2 = Template.bind({});
RealExample2.args = {
  text: 'Two-factor authentication can prevent 99.9% of automated attacks.',
  animate: true,
};