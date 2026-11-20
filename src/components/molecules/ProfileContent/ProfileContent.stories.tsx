import type { Meta, StoryObj } from '@storybook/react-vite';
import ProfileContent from './ProfileContent';

const meta = {
  title: 'Molecules/ProfileContent',
  component: ProfileContent,
  tags: ['autodocs'],
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
  render: (args) => (
    <div style={{ padding: '2rem', background: '#121212' }}>
      <ProfileContent {...args} />
    </div>
  ),
} satisfies Meta<typeof ProfileContent>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default story shows the profile content with all information.
 */
export const Default: Story = {
  args: {
    description: 'I am a security professional with expertise in secure architecture. Need to discuss secure architecture? My inbox is always open!',
    securityFact: 'Multi-factor authentication adds an extra layer of security by requiring multiple forms of verification.',
    email: 'contact@example.com',
    animate: true,
  },
};

/**
 * Without security fact example.
 */
export const WithoutSecurityFact: Story = {
  args: {
    description: 'I am a security professional with expertise in secure architecture. Need to discuss secure architecture? My inbox is always open!',
    securityFact: undefined,
    email: 'contact@example.com',
    animate: true,
  },
};

/**
 * Different description example.
 */
export const DifferentDescription: Story = {
  args: {
    description: 'Have a security concern? Want to discuss secure architecture? Or just want to talk tech? My inbox is secure and always open!',
    securityFact: 'Zero Trust security is a model that requires strict identity verification for every person and device trying to access resources on a private network.',
    email: 'security@example.com',
    animate: true,
  },
};

/**
 * Without animation example.
 */
export const NoAnimation: Story = {
  args: {
    description: 'I am a security professional with expertise in secure architecture. Need to discuss secure architecture? My inbox is always open!',
    securityFact: 'Multi-factor authentication adds an extra layer of security by requiring multiple forms of verification.',
    email: 'contact@example.com',
    animate: false,
  },
};