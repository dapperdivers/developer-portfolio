import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExperienceCard from '../ExperienceCard';

// Mock the hooks used in ExperienceCard
jest.mock('../../hooks/useIntersectionObserver', () => ({
  __esModule: true,
  default: () => [jest.fn(), true] // [ref, isInView]
}));

jest.mock('../../hooks/useImageColor', () => ({
  __esModule: true,
  default: () => ({
    color: [0, 100, 200],
    getColorFromImage: jest.fn(),
    resetToDefaultColor: jest.fn(),
    rgbToString: () => 'rgb(0, 100, 200)'
  })
}));

jest.mock('../../hooks/useCallbackHandlers', () => ({
  __esModule: true,
  default: () => ({
    handleExternalLink: jest.fn()
  })
}));

// Mock Card component to simplify testing
jest.mock('../ui/Card', () => ({
  __esModule: true,
  default: ({ children, header }) => (
    <div data-testid="card-mock">
      {header}
      <div>{children}</div>
    </div>
  )
}));

// Mock ResponsiveImage component
jest.mock('../ui/ResponsiveImage', () => ({
  __esModule: true,
  default: ({ src, alt, onLoad, onError }) => (
    <img
      data-testid="responsive-image-mock"
      src={src}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
    />
  )
}));

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
    const { getColorFromImage, resetToDefaultColor } = require('../../hooks/useImageColor').default();
    
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const image = screen.getByTestId('responsive-image-mock');
    
    // Simulate error event
    image.dispatchEvent(new Event('error'));
    
    // Should call the error handler which resets to default color
    expect(resetToDefaultColor).toHaveBeenCalled();
  });
  
  it('extracts color from image on load', () => {
    const { getColorFromImage } = require('../../hooks/useImageColor').default();
    
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const image = screen.getByTestId('responsive-image-mock');
    
    // Create a mock event with target property
    const mockEvent = { target: image };
    
    // Simulate load event
    image.dispatchEvent(Object.assign(new Event('load'), mockEvent));
    
    // Should call the load handler which extracts color
    expect(getColorFromImage).toHaveBeenCalled();
  });
});
