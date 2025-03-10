import React from 'react';
import { screen } from '@testing-library/react';
import FeedbackCard from './FeedbackCard';
import { vi } from 'vitest';
import { renderWithProviders } from '@/tests/unit/setup';

// Note: framer-motion is mocked globally via src/__mocks__/framerMotionMock.jsx

// Mock the Card component
vi.mock('@atoms/Card', () => ({
  default: ({ children, variants, initial, animate, className, style }) => {
    const animationData = variants ? {
      initial,
      animate,
      variants
    } : {};
    return (
      <div 
        data-testid="mocked-card" 
        className={className} 
        style={style}
        data-animation={JSON.stringify(animationData)}
      >
        {children}
      </div>
    );
  }
}));

// Mock the RatingStars component
vi.mock('@atoms/RatingStars', () => ({
  default: ({ rating }) => (
    <div data-testid="rating-stars" aria-label={`${rating} out of 5 stars`}>
      {Array(rating).fill('★').join('')}
    </div>
  )
}));

// Mock the ResponsiveImage component
vi.mock('@atoms/ResponsiveImage', () => ({
  default: ({ src, alt, className }) => (
    <img src={src} alt={alt} className={className} data-testid="responsive-image" />
  )
}));

// Mock the FeedbackAuthor component
vi.mock('@molecules/FeedbackAuthor/FeedbackAuthor', () => ({
  default: ({ name, role, avatar, animated }) => (
    <div data-testid="feedback-author">
      <p>{name}</p>
      <p>{role}</p>
      <img src={avatar} alt={name} />
    </div>
  )
}));

// Mock useIntersectionObserver hook
vi.mock('@hooks/useIntersectionObserver', () => ({
  default: () => [null, true]
}));

// Mock FeedbackQuote component
vi.mock('@molecules/FeedbackQuote', () => ({
  default: ({ text }) => (
    <div data-testid="feedback-quote">{text}</div>
  )
}));

// Mock FeedbackHighlight component
vi.mock('@molecules/FeedbackHighlight', () => ({
  default: ({ text }) => (
    <div data-testid="feedback-highlight">{text}</div>
  )
}));

describe('FeedbackCard Integration Tests', () => {
  const mockFeedback = {
    name: 'John Doe',
    title: 'Software Engineer',
    company: 'Tech Corp',
    feedback: 'Great work!',
    image: '/test-image.jpg'
  };

  it('renders feedback information correctly', () => {
    renderWithProviders(<FeedbackCard data={mockFeedback} index={0} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Great work!')).toBeInTheDocument();
  });

  it('applies correct animation based on index', () => {
    renderWithProviders(<FeedbackCard data={mockFeedback} index={2} />);

    const card = screen.getByTestId('mocked-card');
    const animation = JSON.parse(card.dataset.animation);

    expect(animation).toEqual({
      variants: expect.any(Object),
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: 'easeOut'
      }
    });
  });

  it('handles missing feedback image gracefully', () => {
    const feedbackWithoutImage = { ...mockFeedback, image: undefined };
    renderWithProviders(<FeedbackCard data={feedbackWithoutImage} index={0} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    renderWithProviders(<FeedbackCard data={mockFeedback} index={0} />);

    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('John Doe');
    expect(screen.getByText('Great work!')).toBeInTheDocument();
  });
});