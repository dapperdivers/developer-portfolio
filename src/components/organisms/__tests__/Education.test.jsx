import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Education from '@organisms/Education';
import * as useEducationHook from '@hooks/useEducation';

// Mock the Section component
jest.mock('../../components/layout/Section', () => {
  return function MockSection(props) {
    const { children, title, id, ...rest } = props;
    return (
      <div data-testid="education-section" id={id} {...rest}>
        <h2>{title}</h2>
        <div data-testid="section-content">{children}</div>
      </div>
    );
  };
});

// Mock the EducationCard component
jest.mock('../../components/EducationCard', () => {
  return function MockEducationCard({ education, index }) {
    return (
      <div data-testid={`education-card-${index}`}>
        <h3>{education.schoolName}</h3>
        <p>{education.subHeader}</p>
        <span>{education.duration}</span>
      </div>
    );
  };
});

// Mock useEducation hook
jest.mock('../../hooks/useEducation', () => ({
  __esModule: true,
  default: jest.fn()
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
    jest.clearAllMocks();
  });

  it('renders correctly with education data', () => {
    // Mock the hook to return education data
    useEducationHook.default.mockReturnValue(mockEducationData);
    
    render(<Education />);
    
    // Check that the section renders
    expect(screen.getByTestId('education-section')).toBeInTheDocument();
    
    // Check that the section title is correct
    expect(screen.getByText('Education')).toBeInTheDocument();
    
    // Check that both education cards are rendered
    expect(screen.getByTestId('education-card-0')).toBeInTheDocument();
    expect(screen.getByTestId('education-card-1')).toBeInTheDocument();
    
    // Check that card info is displayed
    expect(screen.getByText('Stanford University')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
  });

  it('renders empty state when no education data is available', () => {
    // Mock the hook to return empty array
    useEducationHook.default.mockReturnValue([]);
    
    render(<Education />);
    
    // Check that the section renders
    expect(screen.getByTestId('education-section')).toBeInTheDocument();
    
    // Check that the section title is correct
    expect(screen.getByText('Education')).toBeInTheDocument();
    
    // Check that the empty state message is displayed
    expect(screen.getByText('No education information available.')).toBeInTheDocument();
    
    // Check that no education cards are rendered
    expect(screen.queryByTestId(/education-card-/)).not.toBeInTheDocument();
  });

  it('passes animation props to the Section component', () => {
    useEducationHook.default.mockReturnValue(mockEducationData);
    
    render(<Education />);
    
    // Check that the section has the correct props
    const section = screen.getByTestId('education-section');
    expect(section).toHaveAttribute('id', 'education');
    expect(section).toHaveAttribute('separator', 'true');
    expect(section).toHaveAttribute('class', 'py-16');
  });
});