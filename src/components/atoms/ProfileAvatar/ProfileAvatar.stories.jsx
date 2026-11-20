import React from 'react';
import { motion } from 'framer-motion';
import ProfileAvatar from './ProfileAvatar';
import { placeholderImage } from '@stories-utils/placeholderImage';

// Entrance variants, as a parent card would supply them
const entranceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const avatar = placeholderImage(200, 200, { label: 'JD' });

export default {
  title: 'Atoms/ProfileAvatar',
  component: ProfileAvatar,
  tags: ['autodocs'],
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
    variants: { control: { disable: true } },
  },
};

// The motion parent drives the entrance; `animate={false}` opts the component out of it
const Template = (args) => (
  <motion.div
    initial="hidden"
    animate="visible"
    style={{ padding: '2rem', background: '#121212', display: 'flex', justifyContent: 'center' }}
  >
    <ProfileAvatar variants={entranceVariants} {...args} />
  </motion.div>
);

/**
 * Default story shows the profile avatar with default settings.
 */
export const Default = Template.bind({});
Default.args = {
  src: avatar,
  alt: 'John Doe',
  clearanceText: 'Security Clearance: Top Level',
  animate: true,
};

/**
 * Custom clearance text example.
 */
export const CustomClearance = Template.bind({});
CustomClearance.args = {
  src: avatar,
  alt: 'Jane Smith',
  clearanceText: 'Jane Smith',
  animate: true,
};

/**
 * Without animation: the avatar ignores the parent's entrance variants and renders in place.
 */
export const NoAnimation = Template.bind({});
NoAnimation.args = {
  src: avatar,
  alt: 'John Doe',
  clearanceText: 'Security Clearance: Top Level',
  animate: false,
};

/**
 * Missing source: shows the icon placeholder instead of a broken image.
 */
export const NoSource = Template.bind({});
NoSource.args = {
  src: '',
  alt: 'John Doe',
  clearanceText: 'Security Clearance: Top Level',
  animate: false,
};