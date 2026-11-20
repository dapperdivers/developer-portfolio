import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import OffTheClock from './OffTheClock';

const meta = {
  title: 'Molecules/OffTheClock',
  component: OffTheClock,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'A compact strip for hobbies and other non-work projects.' } },
  },
} satisfies Meta<typeof OffTheClock>;
export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  { name: '3D Printing & RFID', desc: 'A small fleet of customized printers, and slowly removing keys from my life.' },
  { name: 'Scuba Diving', desc: 'PADI Divemaster. A season at a dive school on Koh Tao, Thailand.' },
];

export const Default: Story = {
  args: { items },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Off the clock')).toBeInTheDocument();
    await expect(canvas.getByText('Scuba Diving')).toBeInTheDocument();
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
