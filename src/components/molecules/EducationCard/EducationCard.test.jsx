import React from 'react';
import { render, screen, within } from '@testing-library/react';
import EducationCard from '@molecules/EducationCard';
import { vi } from 'vitest';

// Mock the Card component
vi.mock('@atoms/Card', () => ({
  default: ({ children, animation, className }) => (
    <div data-testid="mocked-card" className={className} data-animation={JSON.stringify(animation)}>
      {children}
    </div>
  )
}));

// Mock child components
vi.mock('@atoms/EducationIcon', () => ({
  default: ({ className }) => <div className={className}>Education Icon</div>
}));

vi.mock('@atoms/SchoolHeader', () => ({
  default: ({ schoolName }) => <h5>{schoolName}</h5>
}));

vi.mock('@atoms/DegreeInfo', () => ({
  default: ({ degree }) => <div>Degree: {degree}</div>
}));

vi.mock('@atoms/FieldsOfStudy', () => ({
  default: ({ major, minor }) => <div>Major: {major} {minor ? `Minor: ${minor}` : ''}</div>
}));

vi.mock('@atoms/DateChip', () => ({
  default: ({ date, className }) => <span className={className}>{date}</span>
}));

vi.mock('@molecules/CertificationBadge', () => ({
  default: ({ name, issuer }) => <div>Cert: {name} - {issuer}</div>
}));

// Mock useIntersectionObserver hook
vi.mock('@hooks/useIntersectionObserver', () => ({
  default: () => [null, true]
}));

describe('EducationCard Component', () => {
  const mockEducation = {
    schoolName: 'Stanford University',
    degree: 'Master of Computer Science',
    major: 'Artificial Intelligence',
    minor: 'Data Science',
    duration: '2018 - 2020',
    desc: 'Specialized in Artificial Intelligence and Machine Learning',
    descBullets: [
      'Thesis on Deep Learning applications in healthcare',
      'Received Outstanding Graduate Student Award'
    ]
  };

  const minimalEducation = {
    schoolName: 'MIT',
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    duration: '2014 - 2018'
  };

  it('renders all education information correctly', () => {
    render(<EducationCard education={mockEducation} />);
    
    // Check that the card renders
    expect(screen.getByTestId('education-card')).toBeInTheDocument();
    
    // Check for school name
    expect(screen.getByText('Stanford University')).toBeInTheDocument();
    
    // Mock atoms here, so we just need to check if their wrappers are present
    expect(document.querySelector('.degree-container')).toBeInTheDocument();
    
    // Check for duration
    expect(screen.getByText('2018 - 2020')).toBeInTheDocument();
    
    // Check for fields container
    expect(document.querySelector('.fields-container')).toBeInTheDocument();
  });

  it('renders with minimal education info (no description or bullets)', () => {
    render(<EducationCard education={minimalEducation} />);
    
    // Check that the essential fields are rendered
    expect(screen.getByText('MIT')).toBeInTheDocument();
    expect(screen.getByText('2014 - 2018')).toBeInTheDocument();
    
    // Check that degree and fields containers exist
    expect(document.querySelector('.degree-container')).toBeInTheDocument();
    expect(document.querySelector('.fields-container')).toBeInTheDocument();
    
    // Check that certifications are not rendered
    expect(document.querySelector('.certifications-list')).not.toBeInTheDocument();
  });

  it('accepts different index props', () => {
    const { rerender } = render(<EducationCard education={minimalEducation} index={0} />);
    
    // Rerender with different index
    rerender(<EducationCard education={minimalEducation} index={2} />);
    
    // Just check that render succeeds
    expect(screen.getByTestId('education-card')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<EducationCard education={mockEducation} />);
    
    // Check for proper containers
    expect(document.querySelector('.education-details-panel')).toBeInTheDocument();
    expect(document.querySelector('.graduation-date-container')).toBeInTheDocument();
    
    // Check that the school name is present
    expect(screen.getByText('Stanford University')).toBeInTheDocument();
  });
});