import type { Meta, StoryObj } from '@storybook/react-vite';
import { motion } from 'framer-motion';
import ProfileHeader from './ProfileHeader';

const meta = {
  title: 'Molecules/ProfileHeader',
  component: ProfileHeader,
  tags: ['autodocs'],
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
  render: (args) => (
    <motion.div
      initial="hidden"
      animate="visible"
      style={{ padding: '2rem', background: '#121212' }}
    >
      <ProfileHeader {...args} />
    </motion.div>
  ),
} satisfies Meta<typeof ProfileHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default story shows the profile header with default settings.
 */
export const Default: Story = {
  args: {
    title: 'Headquarters',
    subtitle: 'Security Engineer',
    highlightText: 'Security',
    animate: true,
  },
};

/**
 * Custom highlight example.
 */
export const CustomHighlight: Story = {
  args: {
    title: 'Operations',
    subtitle: 'Cybersecurity Analyst',
    highlightText: 'Cyber',
    animate: true,
  },
};

/**
 * Different title example.
 */
export const DifferentTitle: Story = {
  args: {
    title: 'Command Center',
    subtitle: 'Chief Security Officer',
    highlightText: 'Security',
    animate: true,
  },
};

/**
 * Without animation: the badge and title skip the slide-up entrance and render in place.
 */
export const NoAnimation: Story = {
  args: {
    title: 'Headquarters',
    subtitle: 'Security Engineer',
    highlightText: 'Security',
    animate: false,
  },
};