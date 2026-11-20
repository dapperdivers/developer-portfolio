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
        component: 'Header of the Contact card: a badge with the job title, then the title with its first word highlighted in cyan. The site shows "Garage Headquarters".',
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
    >
      <ProfileHeader {...args} />
    </motion.div>
  ),
} satisfies Meta<typeof ProfileHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The header as the Contact card shows it.
 */
export const Default: Story = {
  args: {
    title: 'Headquarters',
    subtitle: 'Principal Security Engineer',
    highlightText: 'Garage',
    animate: true,
  },
};

/**
 * Another highlight word and title.
 */
export const CustomHighlight: Story = {
  args: {
    title: 'Operations',
    subtitle: 'Product Security',
    highlightText: 'Security',
    animate: true,
  },
};

/**
 * A long subtitle stays on one line inside the badge.
 */
export const LongSubtitle: Story = {
  args: {
    title: 'Headquarters',
    subtitle: 'Product Security, Platforms and AI Agents',
    highlightText: 'Garage',
    animate: true,
  },
};

/**
 * Without animation: the badge and title skip the slide-up entrance and render in place.
 */
export const NoAnimation: Story = {
  args: {
    title: 'Headquarters',
    subtitle: 'Principal Security Engineer',
    highlightText: 'Garage',
    animate: false,
  },
};
