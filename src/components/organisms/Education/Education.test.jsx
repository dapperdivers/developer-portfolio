import React from 'react';
import { screen } from '@testing-library/react';
import Education from '@organisms/Education';
import { vi } from 'vitest';
import { renderWithProviders } from '@/tests/unit/setup';

// Create mock function
const mockUseEducation = vi.fn();

// Mock the Section component
vi.mock('@layout/Section', () => ({
  default: (props) => {
    const { children, title, id, ...rest } = props;
    return (
      <div data-testid="education-section" id={id} {...rest}>
        <h2>{title}</h2>
        <div data-testid="section-content">{children}</div>
      </div>
    );
  }
}));

// Mock the EducationCard component
vi.mock('@molecules/EducationCard', () => ({
  default: ({ education, index }) => (
    <div data-testid={`education-card-${index}`}>
      <h3>{education.schoolName}</h3>
      <p>{education.subHeader}</p>
      <span>{education.duration}</span>
    </div>
  )
}));

// Mock useEducation hook
vi.mock('@context/PortfolioContext', () => ({
  useEducation: () => mockUseEducation()
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, animate, ...props }) => (
      <div 
        data-testid="motion-div"
        data-variants={JSON.stringify(variants)}
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
        {...props}
      >
        {children}
      </div>
    ),
    p: ({ children, variants, initial, animate, ...props }) => (
      <p 
        data-testid="motion-p"
        data-variants={JSON.stringify(variants)}
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
        {...props}
      >
        {children}
      </p>
    )
  },
  useInView: () => [null, true]
}));

describe('Education Container Component', () => {
  const mockEducationData = [
    {
      schoolName: 'Stanford University',
      subHeader: 'Master of Computer Science',
      duration: '2018 - 2020',
      desc: 'Specialized in Artificial Intelligence',
      descBullets: ['Thesis on Deep Learning']
    },
    {
      schoolName: 'MIT',
      subHeader: 'Bachelor of Science',
      duration: '2014 - 2018'
    }
  ];

  beforeEach(() => {
    // Reset mock before each test
    vi.clearAllMocks();
  });

  it('renders correctly with education data', () => {
    // Mock the hook to return education data
    mockUseEducation.mockReturnValue(mockEducationData);
    
    renderWithProviders(<Education />);
    
    // Check that the section renders
    expect(screen.getByTestId('education-section')).toBeInTheDocument();
    
    // Check that the section title is correct
    expect(screen.getByText('Education & Certifications')).toBeInTheDocument();
    
    // Check that education card is rendered (only first one is used)
    expect(screen.getByTestId('education-card-0')).toBeInTheDocument();
  });

  it('renders empty state when no education data is available', () => {
    // Mock the hook to return empty array
    mockUseEducation.mockReturnValue([]);
    
    renderWithProviders(<Education />);
    
    // Check that the section renders
    expect(screen.getByTestId('education-section')).toBeInTheDocument();
    
    // Check that the section title is correct
    expect(screen.getByText('Education & Certifications')).toBeInTheDocument();
    
    // Check that the empty state message is displayed
    expect(screen.getByText('No education information available.')).toBeInTheDocument();
    
    // Check that no education cards are rendered
    expect(screen.queryByTestId(/education-card-/)).not.toBeInTheDocument();
  });

  it('applies correct animations when enabled', () => {
    mockUseEducation.mockReturnValue(mockEducationData);
    
    renderWithProviders(<Education />, { animationEnabled: true });
    
    const container = screen.getByTestId('motion-div');
    const initial = JSON.parse(container.dataset.initial);
    const animate = JSON.parse(container.dataset.animate);
    const variants = JSON.parse(container.dataset.variants);

    expect(initial).toBe('hidden');
    expect(animate).toBe('visible');
    expect(variants).toEqual(expect.objectContaining({
      hidden: expect.any(Object),
      visible: expect.any(Object)
    }));
  });

  it('disables animations when animation context is disabled', () => {
    mockUseEducation.mockReturnValue(mockEducationData);
    
    renderWithProviders(<Education />, { animationEnabled: false });
    
    const container = screen.getByTestId('motion-div');
    expect(container.dataset.initial).toBe('false');
    expect(container.dataset.animate).toBe('false');
  });

  it('applies correct animations to empty state message', () => {
    mockUseEducation.mockReturnValue([]);
    
    renderWithProviders(<Education />, { animationEnabled: true });
    
    const message = screen.getByTestId('motion-p');
    const initial = JSON.parse(message.dataset.initial);
    const animate = JSON.parse(message.dataset.animate);
    const variants = JSON.parse(message.dataset.variants);

    expect(initial).toBe('hidden');
    expect(animate).toBe('visible');
    expect(variants).toEqual(expect.objectContaining({
      hidden: expect.any(Object),
      visible: expect.any(Object)
    }));
  });
});