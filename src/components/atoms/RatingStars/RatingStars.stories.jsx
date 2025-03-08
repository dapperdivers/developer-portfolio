import React from 'react';
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
};

export default meta;

// Default story
export const Default = {
  args: {
    rating: 4,
  }
};

// Full rating
export const FullRating = {
  args: {
    rating: 5,
  }
};

// Half rating
export const HalfRating = {
  args: {
    rating: 3.5,
  }
};

// Low rating
export const LowRating = {
  args: {
    rating: 1,
  }
};

// With custom class
export const WithCustomClass = {
  args: {
    rating: 4,
    className: 'large-stars',
  }
};

// Multiple ratings example
export const MultipleRatings = () => (
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