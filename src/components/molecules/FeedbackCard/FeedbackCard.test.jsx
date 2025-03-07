import React from 'react';
import { render, screen } from '@testing-library/react';
import FeedbackCard from '@molecules/FeedbackCard';
import { vi } from 'vitest';

// Mock the Card component
vi.mock('@atoms/Card', () => ({
  default: ({ children, animation, className }) => (
    <div data-testid="mocked-card" className={className} data-animation={JSON.stringify(animation)}>
      {children}
    </div>
  )
}));

// Mock the ResponsiveImage component
vi.mock('@atoms/ResponsiveImage', () => ({
  default: ({ src, alt, className }) => (
    <img src={src} alt={alt} className={className} data-testid="responsive-image" />
  )
}));

// Mock useIntersectionObserver hook
vi.mock('@hooks/useIntersectionObserver', () => ({
  default: () => [null, true]
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
    
    // Check that the card renders
    expect(screen.getByTestId('feedback-card')).toBeInTheDocument();
    
    // Check for name
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check for feedback text
    expect(screen.getByText(mockFeedbackData.complete.feedback)).toBeInTheDocument();
    
    // Check for designation
    expect(screen.getByText('Project Manager')).toBeInTheDocument();
    
    // Check for rating
    expect(screen.getByLabelText('5 out of 5 stars')).toBeInTheDocument();
    
    // Check for avatar
    const avatar = screen.getByTestId('responsive-image');
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(avatar).toHaveAttribute('alt', 'John Doe');
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
    const firstAnimation = JSON.parse(firstCard.dataset.animation);
    
    rerender(<FeedbackCard data={mockFeedbackData.minimal} index={2} />);
    
    const secondCard = screen.getByTestId('mocked-card');
    const secondAnimation = JSON.parse(secondCard.dataset.animation);
    
    // The delay should be different based on index
    expect(firstAnimation.transition.delay).not.toEqual(secondAnimation.transition.delay);
  });
});