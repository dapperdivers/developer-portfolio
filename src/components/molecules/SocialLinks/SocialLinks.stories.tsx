import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent, expect } from 'storybook/test';
import SocialLinks from './SocialLinks';

// Sample link sets passed through the `links` prop
const sampleLinks = {
  both: {
    github: 'https://github.com/DapperDivers',
    linkedin: 'https://www.linkedin.com/in/dmackley',
    contactCard: '/contact/Derek_Mackley.vcf',
  },
  githubOnly: {
    github: 'https://github.com/DapperDivers',
  },
  linkedinOnly: {
    linkedin: 'https://www.linkedin.com/in/dmackley',
  },
  contactCardOnly: {
    contactCard: '/contact/Derek_Mackley.vcf',
  },
};

const meta = {
  title: 'Molecules/SocialLinks',
  component: SocialLinks,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A row of square icon links that match the Button system (--control-height, --radius-control, shared focus ring): GitHub, LinkedIn and a contact card download, all from the `links` prop. ' +
          'An icon shows only if its link is given. The block reads no site data itself. ' +
          'Each link has an `aria-label`, since the links are icon-only.',
      },
    },
  },
  argTypes: {
    links: {
      control: 'object',
      description: 'URLs for `github`, `linkedin` and `contactCard` (a vCard to download). A missing key hides that icon.',
    },
    size: {
      control: 'radio',
      options: ['default', 'large'],
      description: '`large` makes each icon a 44px touch target; the hero uses it on phones',
    },
    animated: {
      control: 'boolean',
      description: 'Whether the icons animate in and react to hover',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the container',
    },
  },
  args: {
    links: sampleLinks.both,
    animated: true,
    className: '',
  },
} satisfies Meta<typeof SocialLinks>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * GitHub, LinkedIn and the contact card
 */
export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Initial render check', async () => {
      const githubLink = canvas.getByLabelText('GitHub Profile');
      const linkedinLink = canvas.getByLabelText('LinkedIn Profile');

      await expect(githubLink).toHaveAttribute('href', sampleLinks.both.github);
      await expect(linkedinLink).toHaveAttribute('href', sampleLinks.both.linkedin);
      await expect(canvas.getByLabelText('Download Contact Card')).toBeInTheDocument();
    });

    await step('Keyboard navigation test', async () => {
      await userEvent.tab();
      await expect(canvas.getByLabelText('GitHub Profile')).toHaveFocus();

      await userEvent.tab();
      await expect(canvas.getByLabelText('LinkedIn Profile')).toHaveFocus();

      await userEvent.tab();
      await expect(canvas.getByLabelText('Download Contact Card')).toHaveFocus();
    });
  },
};

/**
 * Only a GitHub URL is supplied, so the LinkedIn icon is not rendered
 */
export const GitHubOnly: Story = {
  args: {
    links: sampleLinks.githubOnly,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('GitHub Profile')).toBeInTheDocument();
    await expect(canvas.queryByLabelText('LinkedIn Profile')).not.toBeInTheDocument();
  },
};

/**
 * Only a LinkedIn URL is supplied, so the GitHub icon is not rendered
 */
export const LinkedInOnly: Story = {
  args: {
    links: sampleLinks.linkedinOnly,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('LinkedIn Profile')).toBeInTheDocument();
    await expect(canvas.queryByLabelText('GitHub Profile')).not.toBeInTheDocument();
  },
};

/**
 * No social URLs: only the contact card download remains
 */
export const ContactCardOnly: Story = {
  args: {
    links: sampleLinks.contactCardOnly,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('link')).toHaveLength(1);
    await expect(canvas.getByLabelText('Download Contact Card')).toBeInTheDocument();
  },
};

/**
 * Extra classes on the container
 */
export const CustomStyling: Story = {
  args: {
    className: 'p-4 rounded-lg',
  },
};

/**
 * Entry and hover animations switched off
 */
export const WithoutAnimation: Story = {
  args: {
    animated: false,
  },
};

/**
 * Mobile viewport
 */
export const MobileView: Story = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};

/**
 * 44px touch targets, as shown in the phone hero
 */
export const Large: Story = {
  args: {
    size: 'large',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('GitHub Profile').parentElement).toHaveClass('social-links--large');
  },
};
