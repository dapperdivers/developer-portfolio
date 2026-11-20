import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import DateBubble from './DateBubble';
import { educationInfo } from '@/portfolio';

const meta = {
  title: 'Atoms/DateBubble',
  component: DateBubble,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A date in the shared mono metadata style: small, muted, technical letter spacing, no glow. The security and terminal variants add the inset chip surface; a click handler makes it a keyboard-operable button.',
      },
    },
  },
  argTypes: {
    animated: { control: 'boolean', description: 'Whether the date fades in' },
    date: { control: 'text', description: 'Date text to display' },
    level: {
      control: 'select',
      options: ['', 'low', 'medium', 'high', 'critical'],
      description: "Emphasis level. Only 'critical' changes colour, as a warning",
    },
    variant: {
      control: 'select',
      options: ['', 'security', 'terminal'],
      description: 'Plain text, or an inset chip',
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Size of the date text' },
    className: { control: 'text', description: 'Additional CSS classes' },
  },
} satisfies Meta<typeof DateBubble>;
export default meta;

type Story = StoryObj<typeof meta>;

/** The graduation date from the real site data */
export const Default: Story = {
  args: { date: educationInfo[0].duration, size: 'md' },
};

export const Sizes: Story = {
  args: { date: 'Jan 2024' },
  render: (args) => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <DateBubble {...args} size="sm" />
      <DateBubble {...args} size="md" />
      <DateBubble {...args} size="lg" />
    </div>
  ),
};

export const Chip: Story = {
  args: { date: 'Apr 2022', variant: 'security' },
};

export const Terminal: Story = {
  args: { date: 'Apr 2022', variant: 'terminal' },
};

/** A critical date is a warning, so it turns red */
export const Critical: Story = {
  args: { date: 'Expires Dec 2026', level: 'critical', variant: 'security' },
};

export const Clickable: Story = {
  args: { date: 'Oct 2016', onClick: fn() },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Date: Oct 2016' });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    button.focus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

export const ReducedMotion: Story = {
  args: { date: 'Jan 2015', animated: false },
};
