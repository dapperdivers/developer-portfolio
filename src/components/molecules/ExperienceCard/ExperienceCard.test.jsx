import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExperienceCard from './ExperienceCard';
import { vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, whileInView, viewport, ...props }) => (
      <div 
        data-testid="motion-div" 
        data-animation={JSON.stringify({ variants, initial, whileInView, viewport })} 
        {...props}
      >
        {children}
      </div>
    )
  }
}));

// Mock AnimationContext
const mockGetAnimationDelay = vi.fn((index) => index * 0.1);
vi.mock('@context/AnimationContext', () => ({
  useAnimation: () => ({
    animationEnabled: true,
    getAnimationDelay: mockGetAnimationDelay
  })
}));

// Mock the Card component
vi.mock('@atoms/Card', () => ({
  default: ({ children, className, ...props }) => (
    <div data-testid="card" className={className} {...props}>
      {children}
    </div>
  )
}));

// Mock color hook with spy functions
const mockGetColorFromImage = vi.fn();
const mockResetToDefaultColor = vi.fn();
vi.mock('@hooks/useImageColor', () => ({
  default: () => ({
    color: { r: 0, g: 100, b: 200 },
    getColorFromImage: mockGetColorFromImage,
    resetToDefaultColor: mockResetToDefaultColor,
    rgbToString: () => '0, 100, 200'
  })
}));

// Mock callback handlers with spy function
const mockHandleExternalLink = vi.fn();
vi.mock('@hooks/useCallbackHandlers', () => ({
  default: () => ({
    handleExternalLink: mockHandleExternalLink
  })
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
    
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('Working on exciting projects')).toBeInTheDocument();
    
    mockExperienceData.descBullets.forEach(bullet => {
      expect(screen.getByText(bullet)).toBeInTheDocument();
    });
  });

  it('renders the logo image with correct props', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const image = screen.getByAltText(`${mockExperienceData.company} logo`);
    expect(image).toHaveAttribute('src', mockExperienceData.companylogo);
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('width', '80');
    expect(image).toHaveAttribute('height', '80');
  });

  it('applies correct accessibility attributes', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('data-variant', 'default');
  });

  it('applies animation with correct delay based on index', () => {
    render(<ExperienceCard data={mockExperienceData} index={2} />);
    
    const card = screen.getByTestId('motion-div');
    const animation = JSON.parse(card.getAttribute('data-animation'));
    expect(animation.variants.visible.transition.delay).toBe(0.2);
  });

  it('handles missing company logo gracefully', () => {
    const dataWithoutLogo = {
      ...mockExperienceData,
      companylogo: undefined
    };
    
    render(<ExperienceCard data={dataWithoutLogo} index={0} />);
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText(mockExperienceData.desc)).toBeInTheDocument();
  });

  it('handles missing description bullets gracefully', () => {
    const dataWithoutBullets = {
      ...mockExperienceData,
      descBullets: undefined
    };
    
    render(<ExperienceCard data={dataWithoutBullets} index={0} />);
    
    expect(screen.getByText(mockExperienceData.desc)).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('applies custom styles when colorOverride is provided', () => {
    const colorOverride = { r: 255, g: 0, b: 0 };
    render(<ExperienceCard data={mockExperienceData} index={0} colorOverride={colorOverride} />);
    
    const card = screen.getByTestId('card');
    expect(card.style.getPropertyValue('--card-accent-color')).toBe('rgb(255, 0, 0)');
    expect(card.style.getPropertyValue('--card-accent-color-rgb')).toBe('255, 0, 0');
  });

  it('applies shadow class when shadow prop is true', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} shadow={true} />);
    
    const card = screen.getByTestId('card');
    expect(card.className).toContain('experience-card--shadow');
  });

  it('applies variant class when variant prop is provided', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} variant="custom" />);
    
    const card = screen.getByTestId('card');
    expect(card.className).toContain('experience-card--custom');
    expect(card).toHaveAttribute('data-variant', 'custom');
  });

  it('calls color handlers on image load', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const image = screen.getByAltText('Test Company logo');
    fireEvent.load(image);
    
    expect(mockGetColorFromImage).toHaveBeenCalledWith('/test-logo.png');
  });

  it('handles external link clicks', () => {
    const dataWithUrl = {
      ...mockExperienceData,
      url: 'https://example.com'
    };
    
    render(<ExperienceCard data={dataWithUrl} index={0} />);
    
    const card = screen.getByTestId('card');
    fireEvent.click(card);
    
    expect(mockHandleExternalLink).toHaveBeenCalledWith('https://example.com');
  });
});
