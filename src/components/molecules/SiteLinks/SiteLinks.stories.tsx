import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import SiteLinks from './SiteLinks';

const sampleLinks = [
  { id: 'docs', label: 'Docs', href: '/docs/' },
  { id: 'storybook', label: 'Components', href: '/storybook/' },
  { id: 'blog', label: 'Blog', href: '/blog/' },
  { id: 'source', label: 'Source', href: 'https://github.com/DapperDivers/developer-portfolio', external: true },
];

const meta = {
  title: 'Molecules/SiteLinks',
  component: SiteLinks,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Text links to the parts of the site that live outside the single page: the Jekyll docs, this Storybook, the blog and the source repo. ' +
          'Used in the header (`nav`) and the footer (`footer`). Takes its links as a prop and reads no site data. ' +
          'External links open in a new tab and say so to screen readers.',
      },
    },
  },
  argTypes: {
    links: { control: 'object', description: 'Links in display order: `id`, `label`, `href`, optional `external`' },
    variant: {
      control: 'radio',
      options: ['nav', 'footer'],
      description: '`nav` is the compact lowercase header row; `footer` matches the footer text links',
    },
    label: { control: 'text', description: 'Accessible name for the nav landmark' },
    currentId: { control: 'text', description: 'Id of the link for the current page; marked `aria-current="page"` and coloured' },
    className: { control: 'text', description: 'Additional CSS classes' },
  },
  args: {
    links: sampleLinks,
    variant: 'nav',
  },
} satisfies Meta<typeof SiteLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Nav: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: 'More from this site' })).toBeInTheDocument();
    await expect(canvas.getByText('Docs').closest('a')).toHaveAttribute('href', '/docs/');
  },
};

/** The blog header marks its own link as the current page. */
export const CurrentPage: Story = {
  args: { currentId: 'blog' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Blog').closest('a')).toHaveAttribute('aria-current', 'page');
    await expect(canvas.getByText('Docs').closest('a')).not.toHaveAttribute('aria-current');
  },
};

export const Footer: Story = {
  args: { variant: 'footer' },
};

export const ExternalLink: Story = {
  args: { links: [sampleLinks[3]] },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', { name: /Source/ });
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};

export const Empty: Story = {
  args: { links: [] },
  parameters: { docs: { description: { story: 'With no links nothing renders.' } } },
};
