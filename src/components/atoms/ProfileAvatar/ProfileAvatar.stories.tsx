import type { Meta, StoryObj } from '@storybook/react-vite';
import { motion } from 'framer-motion';
import ProfileAvatar from './ProfileAvatar';
import type { ProfileAvatarProps } from './ProfileAvatar';
import { placeholderImage } from '@stories-utils/placeholderImage';

// Entrance variants, as a parent card would supply them
const entranceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const avatar = placeholderImage(200, 200, { label: 'JD' });

const meta = {
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
} satisfies Meta<typeof ProfileAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// The motion parent drives the entrance; `animate={false}` opts the component out of it
const Template = (args: ProfileAvatarProps) => (
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
export const Default: Story = {
  render: Template,
  args: {
    src: avatar,
    alt: 'John Doe',
    clearanceText: 'Security Clearance: Top Level',
    animate: true,
  },
};

/**
 * Custom clearance text example.
 */
export const CustomClearance: Story = {
  render: Template,
  args: {
    src: avatar,
    alt: 'Jane Smith',
    clearanceText: 'Jane Smith',
    animate: true,
  },
};

/**
 * Without animation: the avatar ignores the parent's entrance variants and renders in place.
 */
export const NoAnimation: Story = {
  render: Template,
  args: {
    src: avatar,
    alt: 'John Doe',
    clearanceText: 'Security Clearance: Top Level',
    animate: false,
  },
};

/**
 * Missing source: shows the icon placeholder instead of a broken image.
 */
export const NoSource: Story = {
  render: Template,
  args: {
    src: '',
    alt: 'John Doe',
    clearanceText: 'Security Clearance: Top Level',
    animate: false,
  },
};