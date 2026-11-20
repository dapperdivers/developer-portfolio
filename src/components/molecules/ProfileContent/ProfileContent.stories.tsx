import type { Meta, StoryObj } from '@storybook/react-vite';
import ProfileContent from './ProfileContent';
import { greetings, profileLinks } from '@/portfolio';

// The call to action the Contact card shows
const callToAction = (
  <>
    Product security. AI agent security. Homelabs that got out of hand.
    <br />
    If one of those is your problem, email me.
  </>
);

const meta = {
  title: 'Molecules/ProfileContent',
  component: ProfileContent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Body of the Contact card: a short call to action, the social links and the email button. An optional security fact can be shown between them; the site does not use it.',
      },
    },
    componentSubtitle: 'A molecule component for profile content and contact information',
  },
  argTypes: {
    description: { control: 'text' },
    email: { control: 'text' },
    animate: { control: 'boolean' },
  },
  render: (args) => (
    <ProfileContent {...args} />
  ),
} satisfies Meta<typeof ProfileContent>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The content as the Contact card shows it, with the real links.
 */
export const Default: Story = {
  args: {
    description: callToAction,
    email: greetings.emailAddress ?? 'contact@chelonianlabs.com',
    links: profileLinks,
    animate: true,
  },
};

/**
 * With the optional security fact line.
 */
export const WithSecurityFact: Story = {
  args: {
    description: callToAction,
    securityFact: 'Two-factor authentication can prevent 99.9% of automated attacks.',
    email: greetings.emailAddress ?? 'contact@chelonianlabs.com',
    links: profileLinks,
    animate: true,
  },
};

/**
 * A plain-string description, with no social links.
 */
export const DescriptionOnly: Story = {
  args: {
    description: 'Have a security question or a homelab that got out of hand? My inbox is open.',
    email: greetings.emailAddress ?? 'contact@chelonianlabs.com',
    animate: true,
  },
};

/**
 * Without animation example.
 */
export const NoAnimation: Story = {
  args: {
    description: callToAction,
    email: greetings.emailAddress ?? 'contact@chelonianlabs.com',
    links: profileLinks,
    animate: false,
  },
};
