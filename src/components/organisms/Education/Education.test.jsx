import React from 'react';
import { render, screen } from '@testing-library/react';
import Education from '@organisms/Education';
import { vi } from 'vitest';

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
    
    render(<Education />);
    
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
    
    render(<Education />);
    
    // Check that the section renders
    expect(screen.getByTestId('education-section')).toBeInTheDocument();
    
    // Check that the section title is correct
    expect(screen.getByText('Education & Certifications')).toBeInTheDocument();
    
    // Check that the empty state message is displayed
    expect(screen.getByText('No education information available.')).toBeInTheDocument();
    
    // Check that no education cards are rendered
    expect(screen.queryByTestId(/education-card-/)).not.toBeInTheDocument();
  });

  it('passes animation props to the Section component', () => {
    mockUseEducation.mockReturnValue(mockEducationData);
    
    render(<Education />);
    
    // Check that the section has the correct props
    const section = screen.getByTestId('education-section');
    expect(section).toHaveAttribute('id', 'education');
    expect(section).toHaveAttribute('class', 'education-section');
  });
});