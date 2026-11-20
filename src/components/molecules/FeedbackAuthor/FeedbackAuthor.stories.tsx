import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import FeedbackAuthor from './FeedbackAuthor';
import { placeholderImage } from '@stories-utils/placeholderImage';

const meta = {
  title: 'Molecules/FeedbackAuthor',
  component: FeedbackAuthor,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Name, role and photo of a testimonial author. Without a photo an initials badge (the same badge the timeline uses for companies) is drawn.',
      },
    },
  },
  argTypes: {
    name: { control: 'text' },
    role: { control: 'text' },
    avatar: { control: 'text' },
    animated: { control: 'boolean' },
  },
} satisfies Meta<typeof FeedbackAuthor>;
export default meta;

type Story = StoryObj<typeof meta>;

// Default story: no photo, so the initials badge
export const Default: Story = {
  args: {
    name: 'Scott Latsa',
    role: 'Director of Software Development, Ubicquia',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('SL')).toBeInTheDocument();
  },
};

// With a photo
export const WithPhoto: Story = {
  args: {
    name: 'Maya Okafor',
    role: 'VP of Engineering, Northwind Freight',
    avatar: placeholderImage(80, 80, { label: 'MO' }),
  },
};

// A single-word name gets one initial
export const SingleName: Story = {
  args: {
    name: 'Priya',
    role: 'Example University',
  },
};

// Same content at a 320px viewport
export const Responsive: Story = {
  args: Default.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
