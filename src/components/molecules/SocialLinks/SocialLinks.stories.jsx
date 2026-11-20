import { within, userEvent, expect } from 'storybook/test';
import SocialLinks from './SocialLinks';

// Sample link sets passed through the `links` prop
const sampleLinks = {
  both: {
    github: 'https://github.com/username',
    linkedin: 'https://www.linkedin.com/in/username',
  },
  githubOnly: {
    github: 'https://github.com/username',
  },
  linkedinOnly: {
    linkedin: 'https://www.linkedin.com/in/username',
  },
  none: {},
};

export default {
  title: 'Molecules/SocialLinks',
  component: SocialLinks,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A row of round icon links: GitHub and LinkedIn from the `links` prop (falling back to the site data in `portfolio.js`), ' +
          'followed by a contact card download. The contact card comes from the site data and is always shown. ' +
          'Each link has an `aria-label`, since the links are icon-only.',
      },
    },
  },
  argTypes: {
    links: {
      control: 'object',
      description: 'Social link URLs (`github`, `linkedin`). A missing key hides that icon.',
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
};

/**
 * GitHub, LinkedIn and the contact card
 */
export const Default = {
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
export const GitHubOnly = {
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
export const LinkedInOnly = {
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
export const ContactCardOnly = {
  args: {
    links: sampleLinks.none,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('link')).toHaveLength(1);
    await expect(canvas.getByLabelText('Download Contact Card')).toBeInTheDocument();
  },
};

/**
 * Extra classes on the container, here a bordered panel around the icons
 */
export const CustomStyling = {
  args: {
    className: 'p-4 rounded-lg border border-gray-700 bg-gray-900',
  },
};

/**
 * Entry and hover animations switched off
 */
export const WithoutAnimation = {
  args: {
    animated: false,
  },
};

/**
 * Mobile viewport
 */
export const MobileView = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
