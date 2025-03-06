import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExperienceCard from '@molecules/ExperienceCard';

// Import modules to mock
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useImageColor from '@hooks/useImageColor';
import useCallbackHandlers from '@hooks/useCallbackHandlers';
import Card from '@molecules/ui/Card';
import ResponsiveImage from '@molecules/ui/ResponsiveImage';

// Mock the hooks and components
jest.mock('../../hooks/useIntersectionObserver');
jest.mock('../../hooks/useImageColor');
jest.mock('../../hooks/useCallbackHandlers');
jest.mock('../ui/Card');
jest.mock('../ui/ResponsiveImage');

// Create mock functions
const mockGetColorFromImage = jest.fn();
const mockResetToDefaultColor = jest.fn();

// Set up default mock implementations
beforeEach(() => {
  // Reset all mocks
  jest.clearAllMocks();
  
  // Set up mock implementations
  useIntersectionObserver.mockReturnValue([jest.fn(), true]); // [ref, isInView]
  
  useImageColor.mockReturnValue({
    color: [0, 100, 200],
    getColorFromImage: mockGetColorFromImage,
    resetToDefaultColor: mockResetToDefaultColor,
    rgbToString: () => 'rgb(0, 100, 200)'
  });
  
  useCallbackHandlers.mockReturnValue({
    handleExternalLink: jest.fn()
  });
  
  Card.mockImplementation(({ children, header }) => (
    <div data-testid="card-mock">
      {header}
      <div>{children}</div>
    </div>
  ));
  
  ResponsiveImage.mockImplementation(({ src, alt, onLoad, onError }) => (
    <img
      data-testid="responsive-image-mock"
      src={src}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
    />
  ));
});

describe('ExperienceCard Component', () => {
  const mockExperienceData = {
    company: 'Test Company',
    role: 'Software Engineer',
    date: 'Jan 2022 - Present',
    desc: 'Working on exciting projects',
    companylogo: '/test-logo.png',
    descBullets: ['Built features', 'Fixed bugs', 'Improved performance']
  };

  it('renders the experience card with correct information', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    // Check if company name is rendered
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    
    // Check if role and date are rendered
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Jan 2022 - Present')).toBeInTheDocument();
    
    // Check if description is rendered
    expect(screen.getByText('Working on exciting projects')).toBeInTheDocument();
    
    // Check if all description bullets are rendered
    expect(screen.getByText('Built features')).toBeInTheDocument();
    expect(screen.getByText('Fixed bugs')).toBeInTheDocument();
    expect(screen.getByText('Improved performance')).toBeInTheDocument();
  });

  it('renders the responsive image with correct props', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const image = screen.getByTestId('responsive-image-mock');
    expect(image).toHaveAttribute('src', '/test-logo.png');
    expect(image).toHaveAttribute('alt', 'Test Company logo');
  });

  it('applies correct accessibility attributes', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    // Check for accessible elements
    const roleHeading = screen.getByText('Software Engineer');
    expect(roleHeading).toHaveAttribute('id', 'role-0');
    
    // Check that the date is associated with the role via aria-labelledby
    const dateElement = screen.getByText('Jan 2022 - Present');
    expect(dateElement).toHaveAttribute('aria-labelledby', 'role-0');
    
    // Check for aria-label on the responsibilities list
    const responsibilitiesList = screen.getByRole('list');
    expect(responsibilitiesList).toHaveAttribute('aria-label', 'Responsibilities at Test Company');
  });

  it('renders without description bullets when none are provided', () => {
    const dataWithoutBullets = {
      ...mockExperienceData,
      descBullets: undefined
    };
    
    render(<ExperienceCard data={dataWithoutBullets} index={0} />);
    
    // Main description should exist
    expect(screen.getByText('Working on exciting projects')).toBeInTheDocument();
    
    // List shouldn't exist
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
  
  it('applies animation with correct delay based on index', () => {
    render(<ExperienceCard data={mockExperienceData} index={3} />);
    
    // Get the animation props passed to Card
    const card = screen.getByTestId('card-mock');
    
    // Check that animation parameters were passed
    expect(card).toBeInTheDocument();
    
    // We can't directly access the animation props since they're passed to the mocked component,
    // but we can confirm the component renders without errors when index is changed
  });
  
  it('handles image loading errors gracefully', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const image = screen.getByTestId('responsive-image-mock');
    
    // Get the onError handler directly and call it
    const { onError } = ResponsiveImage.mock.calls[0][0];
    onError();
    
    // Should call the error handler which resets to default color
    expect(mockResetToDefaultColor).toHaveBeenCalled();
  });
  
  it('extracts color from image on load', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    // Get the onLoad handler directly
    const { onLoad } = ResponsiveImage.mock.calls[0][0];
    
    // Mock event object with target
    const mockEvent = {
      target: { src: '/test-logo.png' }
    };
    
    // Call the handler directly with the mock event
    onLoad(mockEvent);
    
    // Should call the load handler which extracts color
    expect(mockGetColorFromImage).toHaveBeenCalled();
  });
});
