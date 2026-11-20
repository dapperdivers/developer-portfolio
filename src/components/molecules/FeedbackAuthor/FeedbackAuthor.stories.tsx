import type { Meta, StoryObj } from '@storybook/react-vite';
import FeedbackAuthor from './FeedbackAuthor';
import { placeholderImage } from '@stories-utils/placeholderImage';


const meta = {
  title: 'Molecules/FeedbackAuthor',
  component: FeedbackAuthor,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Avatar, name and role of a testimonial author.',
      },
    },
  },
} satisfies Meta<typeof FeedbackAuthor>;
export default meta;

type Story = StoryObj<typeof meta>;


// Default story
export const Default: Story = {
  args: {
    name: 'Alex Example',
    role: 'Director of Software Development',
    avatar: placeholderImage(80, 80, { label: 'AE' }),
  }
};

// Same content at a 320px viewport
export const Responsive: Story = {
  args: Default.args,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};