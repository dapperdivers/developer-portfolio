import React from 'react';
import { screen, within } from '@testing-library/react';
import EducationCard from './EducationCard';
import { vi } from 'vitest';
import { renderWithProviders } from '@/tests/unit/setup';

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
    ],
    certifications: [
      {
        name: 'Deep Learning Specialization',
        issuer: 'Coursera'
      }
    ]
  };

  const minimalEducation = {
    schoolName: 'MIT',
    degree: 'Bachelor of Science',
    major: 'Computer Science',
    duration: '2014 - 2018'
  };

  it('renders all education information correctly', () => {
    renderWithProviders(<EducationCard education={mockEducation} index={0} />);
    
    expect(screen.getByText('Stanford University')).toBeInTheDocument();
    expect(screen.getByText('Degree: Master of Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Major: Artificial Intelligence Minor: Data Science')).toBeInTheDocument();
    expect(screen.getByText('2018 - 2020')).toBeInTheDocument();
    expect(screen.getByText('Cert: Deep Learning Specialization - Coursera')).toBeInTheDocument();
  });

  it('applies correct animation based on index', () => {
    const { container } = renderWithProviders(<EducationCard education={mockEducation} index={2} />);

    const card = screen.getByTestId('mocked-card');
    const animation = JSON.parse(card.dataset.animation);

    // The animation context from renderWithProviders already includes slideUpVariants
    expect(animation).toEqual({
      variants: expect.any(Object), // We don't need to test the exact variant object
      initial: 'hidden',
      whileInView: 'visible',
      viewport: { once: true },
      transition: {
        delay: 0.2
      }
    });
  });

  it('renders with minimal education info', () => {
    renderWithProviders(<EducationCard education={minimalEducation} index={0} />);
    
    expect(screen.getByText('MIT')).toBeInTheDocument();
    expect(screen.getByText('Degree: Bachelor of Science')).toBeInTheDocument();
    expect(screen.getByText('Major: Computer Science')).toBeInTheDocument();
    expect(screen.getByText('2014 - 2018')).toBeInTheDocument();
    expect(screen.queryByText(/Cert:/)).not.toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    renderWithProviders(<EducationCard education={mockEducation} index={0} />);
    
    const card = screen.getByTestId('mocked-card');
    expect(card).toHaveAttribute('role', 'article');
    expect(card).toHaveAttribute('aria-label', 'Education at Stanford University');
    
    const heading = screen.getByRole('heading', { level: 5 });
    expect(heading).toHaveTextContent('Stanford University');
    
    const duration = screen.getByText('2018 - 2020');
    expect(duration).toHaveClass('date-chip');
  });

  it('disables animations when animation context is disabled', () => {
    renderWithProviders(<EducationCard education={mockEducation} index={0} />, { animationEnabled: false });
    
    const card = screen.getByTestId('mocked-card');
    const animation = JSON.parse(card.dataset.animation);
    expect(animation).toEqual({
      variants: expect.any(Object), // We don't need to test the exact variant object
      initial: 'visible',
      whileInView: 'visible',
      viewport: { once: true },
      transition: {
        delay: 0
      }
    });
  });
});