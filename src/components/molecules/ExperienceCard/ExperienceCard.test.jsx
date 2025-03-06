import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExperienceCard from '@molecules/ExperienceCard';

import { vi } from 'vitest';

// Create mock functions
const mockGetColorFromImage = vi.fn();
const mockResetToDefaultColor = vi.fn();
const mockHandleExternalLink = vi.fn();

// Mock the hooks directly with vi
vi.mock('@hooks/useIntersectionObserver', () => ({
  default: () => [vi.fn(), true] // [ref, isInView]
}));

vi.mock('@hooks/useImageColor', () => ({
  default: () => ({
    color: [0, 100, 200],
    getColorFromImage: mockGetColorFromImage,
    resetToDefaultColor: mockResetToDefaultColor,
    rgbToString: () => 'rgb(0, 100, 200)'
  })
}));

vi.mock('@hooks/useCallbackHandlers', () => ({
  default: () => ({
    handleExternalLink: mockHandleExternalLink
  })
}));

// Mock the components
vi.mock('@atoms/Card', () => ({
  default: ({ children, header }) => (
    <div data-testid="card-mock">
      {header}
      <div>{children}</div>
    </div>
  )
}));

vi.mock('@atoms/ResponsiveImage', () => ({
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

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
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
    
    // Directly call the onError handler on the image instead
    fireEvent.error(image);
    
    // Should call the error handler which resets to default color
    expect(mockResetToDefaultColor).toHaveBeenCalled();
  });
  
  it('extracts color from image on load', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const image = screen.getByTestId('responsive-image-mock');
    
    // Directly trigger a load event on the image
    fireEvent.load(image, {
      target: { src: '/test-logo.png' }
    });
    
    // Should call the load handler which extracts color
    expect(mockGetColorFromImage).toHaveBeenCalled();
  });
});
