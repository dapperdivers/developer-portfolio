import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Experience from '../Experience';
import { jest } from '@jest/globals';

// Mock the hooks used in Experience
jest.mock('../../hooks/useExperience', () => {
  return {
    __esModule: true,
    default: () => [
      {
        company: 'Company A',
        role: 'Senior Developer',
        date: '2020 - Present',
        desc: 'Leading development teams',
        companylogo: '/logo-a.png',
        descBullets: ['Led frontend team', 'Implemented CI/CD']
      },
      {
        company: 'Company B',
        role: 'Developer',
        date: '2018 - 2020',
        desc: 'Building web applications',
        companylogo: '/logo-b.png',
        descBullets: ['Built React apps', 'Worked on API integration']
      }
    ]
  };
});

jest.mock('../../hooks/useMemoValues', () => {
  return {
    __esModule: true,
    default: (values) => values
  };
});

// Mock Section component
jest.mock('../../components/layout/Section', () => {
  return {
    __esModule: true,
    default: ({ children, title, id, className, 'aria-label': ariaLabel }) => (
      <section data-testid="section-mock" id={id} className={className} aria-label={ariaLabel}>
        <h2>{title}</h2>
        {children}
      </section>
    )
  };
});

// Mock ExperienceCard component
jest.mock('../../components/ExperienceCard', () => {
  return {
    __esModule: true,
    default: ({ data, index }) => (
      <div data-testid={`experience-card-${index}`} className="experience-card-mock">
        <h3>{data.company}</h3>
        <p>{data.role}</p>
      </div>
    )
  };
});

describe('Experience Container', () => {
  it('renders the experience section with correct structure', () => {
    render(<Experience />);
    
    // Check for the section with correct ID and class
    const section = screen.getByTestId('section-mock');
    expect(section).toHaveAttribute('id', 'experience');
    expect(section).toHaveAttribute('class', 'experience-section');
    
    // Check for section title
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('renders all experience cards from the hook data', () => {
    render(<Experience />);
    
    // Check if both mocked experience cards are rendered
    expect(screen.getByTestId('experience-card-0')).toBeInTheDocument();
    expect(screen.getByTestId('experience-card-1')).toBeInTheDocument();
    
    // Check if company names are rendered in the cards
    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('Company B')).toBeInTheDocument();
    
    // Check if roles are rendered in the cards
    expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('applies correct accessibility attributes', () => {
    render(<Experience />);
    
    // Check for the section's aria-label
    const section = screen.getByTestId('section-mock');
    expect(section).toHaveAttribute('aria-label', 'Work experience history');
  });
  
  // Check if component can be rerendered
  it('can be rendered multiple times', () => {
    const { rerender } = render(<Experience />);
    
    // Rerender the component
    rerender(<Experience />);
    
    // Should still show the correct content
    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('Company B')).toBeInTheDocument();
  });
});