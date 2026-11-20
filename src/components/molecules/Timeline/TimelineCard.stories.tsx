import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { placeholderImage } from '@stories-utils/placeholderImage';
import TimelineCard from './TimelineCard';
import type { TimelineExperience } from './TimelineCard';

const experience: TimelineExperience = {
  role: 'Staff Product Security Engineer',
  company: 'Northwind Freight',
  companylogo: placeholderImage(96, 96, { label: 'NF' }),
  date: 'July 2023 – Present',
  desc: 'Sets the technical direction for a newly formed product security team and runs the vulnerability management program.',
  descBullets: [
    'Built a vulnerability aggregation service that merges findings from open-source and commercial scanners',
    'Added pull request checks for secrets, vulnerable packages and outdated base images',
  ],
};

const meta = {
  title: 'Molecules/TimelineCard',
  component: TimelineCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 'min(520px, 90vw)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'One role on the experience timeline. Collapsed it shows logo, title, company and dates; expanded it adds the description, achievements and a terminal footer. It is a button: click, Enter or Space toggles it.',
      },
    },
  },
  args: { experience, expanded: false, clickCount: 0, onToggle: fn() },
  argTypes: {
    experience: { control: 'object' },
    expanded: { control: 'boolean' },
    clickCount: { control: { type: 'number', min: 0, max: 7 }, description: '3 or more reads BREACHED, 5 or more HACKED' },
    effects: { control: 'object', description: 'Easter-egg effects: matrix, glitch, hack' },
  },
} satisfies Meta<typeof TimelineCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  play: async ({ args, canvasElement }) => {
    const card = within(canvasElement).getByRole('button');
    await expect(card).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(card);
    await expect(args.onToggle).toHaveBeenCalledTimes(1);
    card.focus();
    await userEvent.keyboard(' ');
    await expect(args.onToggle).toHaveBeenCalledTimes(2);
  },
};

export const Expanded: Story = {
  args: { expanded: true },
};

/** No logo: a monospace initials badge is drawn instead. */
export const WithoutLogo: Story = {
  args: { experience: { ...experience, company: 'Mastery Logistics Systems', companylogo: undefined } },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('MLS')).toBeInTheDocument();
  },
};

/** A generated avatar URL is treated as a placeholder. */
export const GeneratedAvatarIgnored: Story = {
  args: { experience: { ...experience, company: 'Acme Security', companylogo: 'https://ui-avatars.com/api/?name=AS' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('AS')).toBeInTheDocument();
    await expect(canvas.queryByRole('img')).toBeNull();
  },
};

export const WithoutBullets: Story = {
  args: { expanded: true, experience: { ...experience, descBullets: [] } },
};

export const Breached: Story = {
  args: { expanded: true, clickCount: 3 },
};

export const Hacked: Story = {
  args: { expanded: true, clickCount: 5, effects: { hack: true } },
};
