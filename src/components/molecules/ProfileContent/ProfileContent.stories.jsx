import React from 'react';
import ProfileContent from './ProfileContent';
import { withAnimationContext } from '@stories-utils';

// Mock the SocialLinks component
jest.mock('@molecules/SocialLinks', () => {
  return function MockSocialLinks({ className }) {
    return (
      <div 
        className={className}
        style={{ 
          display: 'flex',
          gap: '10px'
        }}
      >
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: '#4fd1c5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0a2e38',
          fontWeight: 'bold'
        }}>
          GH
        </div>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: '#4fd1c5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0a2e38',
          fontWeight: 'bold'
        }}>
          LI
        </div>
      </div>
    );
  };
});

export default {
  title: 'GitHub Profile/Molecules/Profile/ProfileContent',
  component: ProfileContent,
  tags: ['autodocs'],
  decorators: [withAnimationContext],
  parameters: {
    docs: {
      description: {
        component: 'Profile content component that displays description, security fact, and contact information.',
      },
    },
    componentSubtitle: 'A molecule component for profile content and contact information',
  },
  argTypes: {
    description: { control: 'text' },
    securityFact: { control: 'text' },
    email: { control: 'text' },
    animate: { control: 'boolean' },
  },
};

// Template for the component
const Template = (args) => (
  <div style={{ padding: '2rem', background: '#121212' }}>
    <ProfileContent {...args} />
  </div>
);

/**
 * Default story shows the profile content with all information.
 */
export const Default = Template.bind({});
Default.args = {
  description: 'I am a security professional with expertise in secure architecture. Need to discuss secure architecture? My inbox is always open!',
  securityFact: 'Multi-factor authentication adds an extra layer of security by requiring multiple forms of verification.',
  email: 'contact@example.com',
  animate: true,
};

/**
 * Without security fact example.
 */
export const WithoutSecurityFact = Template.bind({});
WithoutSecurityFact.args = {
  description: 'I am a security professional with expertise in secure architecture. Need to discuss secure architecture? My inbox is always open!',
  securityFact: null,
  email: 'contact@example.com',
  animate: true,
};

/**
 * Different description example.
 */
export const DifferentDescription = Template.bind({});
DifferentDescription.args = {
  description: 'Have a security concern? Want to discuss secure architecture? Or just want to talk tech? My inbox is secure and always open!',
  securityFact: 'Zero Trust security is a model that requires strict identity verification for every person and device trying to access resources on a private network.',
  email: 'security@example.com',
  animate: true,
};

/**
 * Without animation example.
 */
export const NoAnimation = Template.bind({});
NoAnimation.args = {
  description: 'I am a security professional with expertise in secure architecture. Need to discuss secure architecture? My inbox is always open!',
  securityFact: 'Multi-factor authentication adds an extra layer of security by requiring multiple forms of verification.',
  email: 'contact@example.com',
  animate: false,
};