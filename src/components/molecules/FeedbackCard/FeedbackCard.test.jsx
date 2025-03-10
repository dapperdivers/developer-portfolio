import React from 'react';
import { render, screen } from '@testing-library/react';
import FeedbackCard from '@molecules/FeedbackCard';
import { vi } from 'vitest';

// Note: framer-motion is mocked globally via src/__mocks__/framerMotionMock.jsx

// Mock the Card component
vi.mock('@atoms/Card', () => ({
  default: ({ children, animation, className, style }) => {
    const animationData = {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: animation?.transition || {}
    };
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

// Mock AnimationContext
vi.mock('@context/AnimationContext', () => ({
  useAnimation: () => ({
    animationEnabled: true,
    getAnimationDelay: (index) => `${index * 0.1}s`
  })
}));

describe('FeedbackCard Component', () => {
  const mockFeedbackData = {
    complete: {
      name: "John Doe",
      feedback: "Working with this developer was a fantastic experience. Their technical expertise was impressive.",
      designation: "Project Manager",
      rating: 5,
      avatar: "https://example.com/avatar.jpg"
    },
    minimal: {
      name: "Jane Smith",
      feedback: "Great work!"
    },
    partialRating: {
      name: "Bob Johnson",
      feedback: "Good work but could improve communication.",
      rating: 3
    }
  };

  it('renders with complete data correctly', () => {
    render(<FeedbackCard data={mockFeedbackData.complete} />);
    
    // Check that the card wrapper renders
    const card = screen.getByTestId('mocked-card');
    expect(card).toBeInTheDocument();
    
    // Check for feedback components
    expect(screen.getByTestId('feedback-quote')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-highlight')).toBeInTheDocument();
    
    // Check for author component
    const authorSection = screen.getByTestId('feedback-author');
    expect(authorSection).toBeInTheDocument();
    expect(authorSection).toHaveTextContent('John Doe');
    expect(authorSection).toHaveTextContent('Project Manager');
    
    // Check for rating
    expect(screen.getByLabelText('5 out of 5 stars')).toBeInTheDocument();
  });

  it('renders with minimal data correctly', () => {
    render(<FeedbackCard data={mockFeedbackData.minimal} />);
    
    // Check that essential fields are rendered
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Great work!')).toBeInTheDocument();
    
    // Check that default values are used
    expect(screen.getByText('Client')).toBeInTheDocument(); // Default designation
    expect(screen.getByLabelText('5 out of 5 stars')).toBeInTheDocument(); // Default rating
  });

  it('renders correct number of filled stars for partial rating', () => {
    render(<FeedbackCard data={mockFeedbackData.partialRating} />);
    
    // Check that the rating label is correct
    expect(screen.getByLabelText('3 out of 5 stars')).toBeInTheDocument();
    
    // We can't easily check the color of stars in the test environment
    // In a real app, we would use something like jest-styled-components
    // or a different test approach for this
  });

  it('applies different animations based on index prop', () => {
    const { rerender } = render(<FeedbackCard data={mockFeedbackData.minimal} index={0} />);
    
    const firstCard = screen.getByTestId('mocked-card');
    const firstAnimationData = JSON.parse(firstCard.dataset.animation || '{}');
    
    // Check first card animation properties
    expect(firstAnimationData.initial).toEqual({ opacity: 0, y: 50 });
    expect(firstAnimationData.whileInView).toEqual({ opacity: 1, y: 0 });
    expect(firstAnimationData.viewport).toEqual({ once: true });
    expect(firstAnimationData.transition.delay).toBe('0s');
    
    rerender(<FeedbackCard data={mockFeedbackData.minimal} index={2} />);
    
    const secondCard = screen.getByTestId('mocked-card');
    const secondAnimationData = JSON.parse(secondCard.dataset.animation || '{}');
    
    // Check second card animation properties
    expect(secondAnimationData.initial).toEqual({ opacity: 0, y: 50 });
    expect(secondAnimationData.whileInView).toEqual({ opacity: 1, y: 0 });
    expect(secondAnimationData.viewport).toEqual({ once: true });
    expect(secondAnimationData.transition.delay).toBe('0.2s');
  });

  it('handles animation when animation is disabled', () => {
    // Mock AnimationContext to disable animations
    vi.mock('@context/AnimationContext', () => ({
      useAnimation: () => ({
        animationEnabled: false,
        getAnimationDelay: () => '0s'
      })
    }));

    render(<FeedbackCard data={mockFeedbackData.minimal} index={0} />);
    
    const card = screen.getByTestId('mocked-card');
    const animationData = JSON.parse(card.dataset.animation || '{}');
    
    // When animations are disabled, should have no animation properties
    expect(animationData).toEqual({});
  });

  it('handles missing avatar gracefully', () => {
    const dataWithoutAvatar = {
      ...mockFeedbackData.complete,
      avatar: undefined
    };
    
    render(<FeedbackCard data={dataWithoutAvatar} />);
    
    // Should still render without errors
    expect(screen.getByTestId('feedback-author')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('handles missing feedback text gracefully', () => {
    const dataWithoutFeedback = {
      name: "Test User",
      designation: "Tester"
    };
    
    render(<FeedbackCard data={dataWithoutFeedback} />);
    
    // Should render with default or empty feedback
    expect(screen.getByTestId('feedback-quote')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-author')).toBeInTheDocument();
  });
});