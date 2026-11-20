import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite';
import RatingStars from './RatingStars';

const meta = {
  title: 'Atoms/RatingStars',
  component: RatingStars,
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 0.5 },
      description: 'Rating value from 0 to 5',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
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

// Half rating
export const HalfRating: Story = {
  args: {
    rating: 3.5,
  }
};

// Low rating
export const LowRating: Story = {
  args: {
    rating: 1,
  }
};

// With custom class
export const WithCustomClass: Story = {
  args: {
    rating: 4,
    className: 'large-stars',
  }
};

// Multiple ratings example
export const MultipleRatings: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <p>Excellent</p>
      <RatingStars rating={5} />
    </div>
    <div>
      <p>Very Good</p>
      <RatingStars rating={4} />
    </div>
    <div>
      <p>Good</p>
      <RatingStars rating={3} />
    </div>
    <div>
      <p>Fair</p>
      <RatingStars rating={2} />
    </div>
    <div>
      <p>Poor</p>
      <RatingStars rating={1} />
    </div>
  </div>
); 