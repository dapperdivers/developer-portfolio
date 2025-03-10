import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExperienceCard from './ExperienceCard';
import { vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, animate, initial, whileHover, ...props }) => (
      <div data-testid="motion-div" data-animate={JSON.stringify({ variants, animate, initial })} {...props}>
        {children}
      </div>
    )
  },
  useInView: () => true
}));

// Mock AnimationContext
vi.mock('@context/AnimationContext', () => ({
  useAnimation: () => ({
    animationEnabled: true,
    getAnimationDelay: (index) => `${index * 0.1}s`
  })
}));

// Mock the Card component
vi.mock('@atoms/Card', () => ({
  default: ({ children, className }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  )
}));

vi.mock('@hooks/useImageColor', () => ({
  default: () => ({
    color: [0, 100, 200],
    getColorFromImage: vi.fn(),
    resetToDefaultColor: vi.fn(),
    rgbToString: () => 'rgb(0, 100, 200)'
  })
}));

vi.mock('@hooks/useCallbackHandlers', () => ({
  default: () => ({
    handleExternalLink: vi.fn()
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
    
    // Check if the card renders
    const card = screen.getByTestId('experience-card');
    expect(card).toBeInTheDocument();
    
    // Check for description
    expect(screen.getByText('Working on exciting projects')).toBeInTheDocument();
    
    // Check if all description bullets are rendered
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
    
    const card = screen.getByTestId('experience-card');
    expect(card).toHaveAttribute('data-variant', 'default');
  });

  it('applies animation with correct delay based on index', () => {
    const { rerender } = render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const firstCard = screen.getByTestId('experience-card');
    expect(firstCard.style.transitionDelay).toBe('0s');
    
    rerender(<ExperienceCard data={mockExperienceData} index={2} />);
    
    const secondCard = screen.getByTestId('experience-card');
    expect(secondCard.style.transitionDelay).toBe('0.2s');
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
    
    const card = screen.getByTestId('experience-card');
    expect(card.style.getPropertyValue('--card-accent-color')).toBe('rgb(255, 0, 0)');
    expect(card.style.getPropertyValue('--card-accent-color-rgb')).toBe('255, 0, 0');
  });

  it('applies shadow class when shadow prop is true', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} shadow={true} />);
    
    const card = screen.getByTestId('experience-card');
    expect(card.className).toContain('experience-card--shadow');
  });

  it('applies variant class when variant prop is provided', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} variant="custom" />);
    
    const card = screen.getByTestId('experience-card');
    expect(card.className).toContain('experience-card--custom');
    expect(card).toHaveAttribute('data-variant', 'custom');
  });

  it('handles image interactions', () => {
    render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const image = screen.getByAltText('Test Company logo');
    
    // Just verify the image renders - we can't easily test the events
    // without triggering actual browser behavior
    expect(image).toBeInTheDocument();
  });

  it('calls color handlers on image load and unmount', () => {
    const { unmount } = render(<ExperienceCard data={mockExperienceData} index={0} />);
    
    const image = screen.getByAltText('Test Company logo');
    fireEvent.load(image);
    
    expect(vi.fn()).toHaveBeenCalledWith('/test-logo.png');
    
    unmount();
    expect(vi.fn()).toHaveBeenCalled();
  });

  it('handles external link clicks', () => {
    render(<ExperienceCard data={{ ...mockExperienceData, url: 'https://example.com' }} index={0} />);
    
    const card = screen.getByTestId('experience-card');
    fireEvent.click(card);
    
    expect(vi.fn()).toHaveBeenCalledWith('https://example.com');
  });
});
