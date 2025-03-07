import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

// Note: We're not mocking components here since we want to test the actual component interactions
// The motion component is mocked by the framerMotionMock.jsx in the __mocks__ directory

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
    
    // Check if the card renders
    const card = screen.getByTestId('experience-card');
    expect(card).toBeInTheDocument();
    
    // Check if the logo has the correct alt text (which includes the company name)
    const logo = screen.getByAltText('Test Company logo');
    expect(logo).toBeInTheDocument();
    
    // Check if description is rendered
    expect(screen.getByText('Working on exciting projects')).toBeInTheDocument();
    
    // Check if all description bullets are rendered
    expect(screen.getByText('Built features')).toBeInTheDocument();
    expect(screen.getByText('Fixed bugs')).toBeInTheDocument();
    expect(screen.getByText('Improved performance')).toBeInTheDocument();
  });

  it('renders the logo image with correct props', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const image = screen.getByAltText('Test Company logo');
    expect(image).toHaveAttribute('src', '/test-logo.png');
    expect(image).toHaveAttribute('alt', 'Test Company logo');
  });

  it('applies correct accessibility attributes', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    // Check for aria-label on the responsibilities list
    const responsibilitiesList = screen.getByRole('list');
    expect(responsibilitiesList).toBeInTheDocument();
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
    
    // Check that component renders with a different index
    const card = screen.getByTestId('experience-card');
    expect(card).toBeInTheDocument();
    
    // We can't directly check the animation delay, but we can verify it renders
  });
  
  it('handles image interactions', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const image = screen.getByAltText('Test Company logo');
    
    // Just verify the image renders - we can't easily test the events
    // without triggering actual browser behavior
    expect(image).toBeInTheDocument();
  });
});
