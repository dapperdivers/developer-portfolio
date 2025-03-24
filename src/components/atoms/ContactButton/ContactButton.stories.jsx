import React from 'react';
import ContactButton from './ContactButton';
import { FaRocket, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { withAnimationContext } from '@stories-utils';

export default {
  title: 'GitHub Profile/Atoms/Contact/ContactButton',
  component: ContactButton,
  tags: ['autodocs'],
  decorators: [withAnimationContext],
  parameters: {
    docs: {
      description: {
        component: 'Contact button component for email links with customizable icon and text.',
      },
    },
    componentSubtitle: 'A contact component for email communication',
  },
  argTypes: {
    email: { control: 'text' },
    text: { control: 'text' },
    icon: { control: { disable: true } },
    animate: { control: 'boolean' },
    className: { control: 'text' },
  },
};

// Template for the component
const Template = (args) => (
  <div style={{ padding: '2rem', background: '#121212', display: 'flex', justifyContent: 'center' }}>
    <ContactButton {...args} />
  </div>
);

/**
 * Default story shows the contact button with default settings.
 */
export const Default = Template.bind({});
Default.args = {
  email: 'contact@example.com',
  text: 'Contact Me',
  animate: true,
};

/**
 * With envelope icon example.
 */
export const WithEnvelopeIcon = Template.bind({});
WithEnvelopeIcon.args = {
  email: 'contact@example.com',
  text: 'Send Email',
  icon: FaEnvelope,
  animate: true,
};

/**
 * With paper plane icon example.
 */
export const WithPaperPlaneIcon = Template.bind({});
WithPaperPlaneIcon.args = {
  email: 'contact@example.com',
  text: 'Message Me',
  icon: FaPaperPlane,
  animate: true,
};

/**
 * Custom text example.
 */
export const CustomText = Template.bind({});
CustomText.args = {
  email: 'security@example.com',
  text: 'Report Security Issue',
  animate: true,
};

/**
 * Without animation example.
 */
export const NoAnimation = Template.bind({});
NoAnimation.args = {
  email: 'contact@example.com',
  text: 'Contact Me',
  animate: false,
};