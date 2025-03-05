import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import EducationCard from '../EducationCard';

// Mock the Card component
jest.mock('../ui/Card', () => {
  return function MockCard({ children, animation, className }) {
    return (
      <div data-testid="mocked-card" className={className} data-animation={JSON.stringify(animation)}>
        {children}
      </div>
    );
  };
});

// Mock useIntersectionObserver hook
jest.mock('../../hooks/useIntersectionObserver', () => ({
  __esModule: true,
  default: jest.fn(() => [null, true])
}));

describe('EducationCard Component', () => {
  const mockEducation = {
    schoolName: 'Stanford University',
    subHeader: 'Master of Computer Science',
    duration: '2018 - 2020',
    desc: 'Specialized in Artificial Intelligence and Machine Learning',
    descBullets: [
      'Thesis on Deep Learning applications in healthcare',
      'Received Outstanding Graduate Student Award'
    ]
  };

  const minimalEducation = {
    schoolName: 'MIT',
    subHeader: 'Bachelor of Science',
    duration: '2014 - 2018'
  };

  it('renders all education information correctly', () => {
    render(<EducationCard education={mockEducation} />);
    
    // Check that the card renders
    expect(screen.getByTestId('education-card')).toBeInTheDocument();
    
    // Check for school name
    expect(screen.getByText('Stanford University')).toBeInTheDocument();
    
    // Check for degree
    expect(screen.getByText('Master of Computer Science')).toBeInTheDocument();
    
    // Check for duration
    expect(screen.getByText('2018 - 2020')).toBeInTheDocument();
    
    // Check for description
    expect(screen.getByText('Specialized in Artificial Intelligence and Machine Learning')).toBeInTheDocument();
    
    // Check for bullet points
    expect(screen.getByText('Thesis on Deep Learning applications in healthcare')).toBeInTheDocument();
    expect(screen.getByText('Received Outstanding Graduate Student Award')).toBeInTheDocument();
  });

  it('renders with minimal education info (no description or bullets)', () => {
    render(<EducationCard education={minimalEducation} />);
    
    // Check that the essential fields are rendered
    expect(screen.getByText('MIT')).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Science')).toBeInTheDocument();
    expect(screen.getByText('2014 - 2018')).toBeInTheDocument();
    
    // Check that optional fields are not rendered
    expect(screen.queryByText(/Specialized in/)).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('applies different animations based on index prop', () => {
    const { rerender } = render(<EducationCard education={minimalEducation} index={0} />);
    
    const firstCard = screen.getByTestId('mocked-card');
    const firstAnimation = JSON.parse(firstCard.dataset.animation);
    
    rerender(<EducationCard education={minimalEducation} index={2} />);
    
    const secondCard = screen.getByTestId('mocked-card');
    const secondAnimation = JSON.parse(secondCard.dataset.animation);
    
    // The delay should be different based on index
    expect(firstAnimation.transition.delay).not.toEqual(secondAnimation.transition.delay);
  });

  it('has proper accessibility attributes', () => {
    render(<EducationCard education={mockEducation} />);
    
    // Check for proper aria-label on duration badge
    const durationBadge = screen.getByText('2018 - 2020');
    expect(durationBadge).toHaveAttribute('aria-label', 'Duration: 2018 - 2020');
    
    // Check for proper aria-label on bullet points list
    const bulletList = screen.getByRole('list');
    expect(bulletList).toHaveAttribute('aria-label', 'Additional information');
    
    // Check that interactive elements have proper heading tags
    expect(screen.getByText('Stanford University').tagName.toLowerCase()).toBe('h5');
    expect(screen.getByText('Master of Computer Science').tagName.toLowerCase()).toBe('h6');
  });
});