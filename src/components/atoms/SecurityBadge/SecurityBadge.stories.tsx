import type { Meta, StoryObj } from '@storybook/react-vite';
import SecurityBadge from './SecurityBadge';
import type { SecurityBadgeProps } from './SecurityBadge';
import { motion } from 'framer-motion';
import { FaLock, FaUserShield } from 'react-icons/fa';

// Entrance variants, as a parent card would supply them
const entranceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const meta = {
  title: 'Atoms/SecurityBadge',
  component: SecurityBadge,
  tags: ['autodocs'],
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
    variants: { control: { disable: true } },
    className: { control: 'text' },
  },
} satisfies Meta<typeof SecurityBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

// The motion parent drives the entrance; `animate={false}` opts the component out of it
const Template = (args: SecurityBadgeProps) => (
  <motion.div
    initial="hidden"
    animate="visible"
    style={{ padding: '2rem', background: '#121212', display: 'flex', justifyContent: 'center' }}
  >
    <SecurityBadge variants={entranceVariants} {...args} />
  </motion.div>
);

/**
 * Default story shows the security badge with default settings.
 */
export const Default: Story = {
  render: Template,
  args: {
    text: 'Security Engineer',
    animate: true,
  },
};

/**
 * With custom icon example.
 */
export const WithLockIcon: Story = {
  render: Template,
  args: {
    text: 'Security Clearance: Level 5',
    icon: FaLock,
    animate: true,
  },
};

/**
 * With user shield icon example.
 */
export const WithUserShieldIcon: Story = {
  render: Template,
  args: {
    text: 'Security Administrator',
    icon: FaUserShield,
    animate: true,
  },
};

/**
 * Without animation: the badge ignores the parent's entrance variants and renders in place.
 */
export const NoAnimation: Story = {
  render: Template,
  args: {
    text: 'Security Engineer',
    animate: false,
  },
};
