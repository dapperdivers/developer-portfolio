import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import OffTheClock from './OffTheClock';
import { projects } from '@/portfolio';

const meta = {
  title: 'Molecules/OffTheClock',
  component: OffTheClock,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'A compact strip for hobbies and other non-work projects, on the shared card surface: a mono kicker, then a name and a sentence each.' } },
  },
} satisfies Meta<typeof OffTheClock>;
export default meta;

type Story = StoryObj<typeof meta>;

// The real personal projects from the site data
const items = projects.filter((p) => p.kind === 'personal');

export const Default: Story = {
  args: { items },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Off the clock')).toBeInTheDocument();
    await expect(canvas.getByText(items[1].name)).toBeInTheDocument();
  },
};

export const SingleItem: Story = { args: { items: items.slice(0, 1) } };

export const Static: Story = { args: { items, animated: false } };

export const Empty: Story = {
  args: { items: [] },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByText('Off the clock')).toBeNull();
  },
};
