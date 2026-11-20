import type { Meta, StoryObj } from '@storybook/react-vite';
import ContactButton from './ContactButton';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const meta = {
  title: 'Atoms/ContactButton',
  component: ContactButton,
  tags: ['autodocs'],
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
  // Shared wrapper for every story
  render: (args) => (
    <div style={{ padding: '2rem', background: '#121212', display: 'flex', justifyContent: 'center' }}>
      <ContactButton {...args} />
    </div>
  ),
} satisfies Meta<typeof ContactButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story shows the contact button with default settings.
 */
export const Default: Story = {
  args: {
    email: 'contact@example.com',
    text: 'Contact Me',
    animate: true,
  },
};

/**
 * With envelope icon example.
 */
export const WithEnvelopeIcon: Story = {
  args: {
    email: 'contact@example.com',
    text: 'Send Email',
    icon: FaEnvelope,
    animate: true,
  },
};

/**
 * With paper plane icon example.
 */
export const WithPaperPlaneIcon: Story = {
  args: {
    email: 'contact@example.com',
    text: 'Message Me',
    icon: FaPaperPlane,
    animate: true,
  },
};

/**
 * Custom text example.
 */
export const CustomText: Story = {
  args: {
    email: 'security@example.com',
    text: 'Report Security Issue',
    animate: true,
  },
};

/**
 * Without animation example.
 */
export const NoAnimation: Story = {
  args: {
    email: 'contact@example.com',
    text: 'Contact Me',
    animate: false,
  },
};