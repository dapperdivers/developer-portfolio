import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite';
import RatingStars from './RatingStars';

const meta = {
  title: 'Atoms/RatingStars',
  component: RatingStars,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A small row of five cyan stars. Filled stars are cyan, the rest a faint cyan.',
      },
    },
  },
  argTypes: {
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 1 },
      description: 'Rating value from 0 to 5',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    animated: {
      control: 'boolean',
      description: 'Whether the stars animate in',
    },
  },
} satisfies Meta<typeof RatingStars>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    rating: 4,
  }
};

// Full rating
export const FullRating: Story = {
  args: {
    rating: 5,
  }
};

// Low rating
export const LowRating: Story = {
  args: {
    rating: 1,
  }
};

// Without the entrance animation
export const WithoutAnimation: Story = {
  args: {
    rating: 5,
    animated: false,
  }
};

// Every rating, with its label
export const AllRatings: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
    {[5, 4, 3, 2, 1].map((rating) => (
      <div
        key={rating}
        style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', fontFamily: 'var(--font-family-jetbrains)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}
      >
        <span style={{ width: '2rem' }}>{rating}/5</span>
        <RatingStars rating={rating} />
      </div>
    ))}
  </div>
);
