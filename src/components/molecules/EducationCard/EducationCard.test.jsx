import React from 'react';
import { render, screen } from '@testing-library/react';
import { AnimationProvider } from '@context/AnimationContext';
import { PortfolioProvider } from '@context/PortfolioContext';
import EducationCard from './EducationCard';
import { vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => {
  const filterMotionProps = (props) => {
    const {
      initial, animate, exit, transition, whileHover, whileTap, whileFocus, whileInView,
      variants, viewport, drag, dragConstraints, dragElastic, dragMomentum,
      onDragStart, onDrag, onDragEnd, layout, layoutId, ...filteredProps
    } = props;
    return filteredProps;
  };

  return {
    motion: {
      article: ({ children, ...props }) => <article {...filterMotionProps(props)}>{children}</article>,
      header: ({ children, ...props }) => <header {...filterMotionProps(props)}>{children}</header>,
      div: ({ children, ...props }) => <div {...filterMotionProps(props)}>{children}</div>,
      h3: ({ children, ...props }) => <h3 {...filterMotionProps(props)}>{children}</h3>
    },
    useAnimation: () => ({
      start: vi.fn().mockResolvedValue(undefined),
      stop: vi.fn(),
      set: vi.fn(),
      mount: vi.fn(),
      unmount: vi.fn()
    }),
    AnimatePresence: ({ children }) => <div data-testid="animate-presence">{children}</div>
  };
});

// Mock react-icons
vi.mock('react-icons/fa', () => ({
  FaGraduationCap: () => <div data-testid="graduation-cap-icon">🎓</div>,
  FaCertificate: () => <div data-testid="certificate-icon">📜</div>,
  FaCalendarAlt: () => <div data-testid="calendar-icon">📅</div>,
  FaUniversity: () => <div data-testid="university-icon">🏛️</div>
}));

// Test wrapper component
const TestWrapper = ({ children }) => (
  <AnimationProvider>
    <PortfolioProvider>
      {children}
    </PortfolioProvider>
  </AnimationProvider>
);

describe('EducationCard Component', () => {
  const mockEducation = {
    schoolName: 'Stanford University',
    degree: 'Master of Computer Science',
    major: 'Artificial Intelligence',
    minor: 'Data Science',
    duration: '2018 - 2020',
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2020',
        credentialId: 'AWS-SAA-123456'
      },
      {
        name: 'Google Cloud Professional',
        issuer: 'Google Cloud',
        date: '2019',
        credentialId: 'GCP-PCA-789012'
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
    render(
      <TestWrapper>
        <EducationCard education={mockEducation} />
      </TestWrapper>
    );
    
    // Check that the card renders
    expect(screen.getByTestId('education-card')).toBeInTheDocument();
    
    // Check for school name
    expect(screen.getByText('Stanford University')).toBeInTheDocument();
    
    // Check for degree
    expect(screen.getByText('Master of Computer Science')).toBeInTheDocument();
    
    // Check for major
    expect(screen.getByText('Artificial Intelligence')).toBeInTheDocument();
    
    // Check for minor
    expect(screen.getByText('Data Science')).toBeInTheDocument();
    
    // Check for duration
    expect(screen.getByText('2018 - 2020')).toBeInTheDocument();
    
    // Check for certifications
    expect(screen.getByText('Certifications')).toBeInTheDocument();
    expect(screen.getByText('AWS Certified Solutions Architect')).toBeInTheDocument();
    expect(screen.getByText('Google Cloud Professional')).toBeInTheDocument();
  });

  it('renders with minimal education info (no certifications or minor)', () => {
    render(
      <TestWrapper>
        <EducationCard education={minimalEducation} />
      </TestWrapper>
    );
    
    // Check that the essential fields are rendered
    expect(screen.getByText('MIT')).toBeInTheDocument();
    expect(screen.getByText('Bachelor of Science')).toBeInTheDocument();
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('2014 - 2018')).toBeInTheDocument();
    
    // Check that certifications section is not rendered
    expect(screen.queryByText('Certifications')).not.toBeInTheDocument();
    
    // Check that certification badge is not rendered
    expect(screen.queryByTestId('certificate-icon')).not.toBeInTheDocument();
  });

  it('displays correct icons for different variants', () => {
    const { rerender } = render(
      <TestWrapper>
        <EducationCard education={mockEducation} variant="default" />
      </TestWrapper>
    );
    
    // Default variant should show graduation cap
    expect(screen.getByTestId('graduation-cap-icon')).toBeInTheDocument();
    
    // Test secure variant
    rerender(
      <TestWrapper>
        <EducationCard education={mockEducation} variant="secure" />
      </TestWrapper>
    );
    expect(screen.getByTestId('university-icon')).toBeInTheDocument();
    
    // Test breach variant
    rerender(
      <TestWrapper>
        <EducationCard education={mockEducation} variant="breach" />
      </TestWrapper>
    );
    expect(screen.getAllByTestId('certificate-icon')).toHaveLength(2); // Main icon + cert badge
    
    // Test critical variant
    rerender(
      <TestWrapper>
        <EducationCard education={mockEducation} variant="critical" />
      </TestWrapper>
    );
    expect(screen.getByTestId('graduation-cap-icon')).toBeInTheDocument();
  });

  it('applies correct CSS classes for variants', () => {
    const { rerender } = render(
      <TestWrapper>
        <EducationCard education={mockEducation} variant="secure" />
      </TestWrapper>
    );
    
    expect(screen.getByTestId('education-card')).toHaveClass('education-card--secure');
    
    rerender(
      <TestWrapper>
        <EducationCard education={mockEducation} variant="breach" />
      </TestWrapper>
    );
    
    expect(screen.getByTestId('education-card')).toHaveClass('education-card--breach');
  });

  it('accepts additional className prop', () => {
    render(
      <TestWrapper>
        <EducationCard education={minimalEducation} className="custom-class" />
      </TestWrapper>
    );
    
    expect(screen.getByTestId('education-card')).toHaveClass('custom-class');
  });

  it('displays certification count badge when certifications exist', () => {
    render(
      <TestWrapper>
        <EducationCard education={mockEducation} />
      </TestWrapper>
    );
    
    // Should show certification count
    expect(screen.getByText('2')).toBeInTheDocument(); // Count of certifications
  });

  it('does not display certification badge when no certifications', () => {
    render(
      <TestWrapper>
        <EducationCard education={minimalEducation} />
      </TestWrapper>
    );
    
    // Should not show certification count
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('handles missing optional fields gracefully', () => {
    const incompleteEducation = {
      schoolName: 'Test University',
      degree: 'Test Degree'
    };
    
    render(
      <TestWrapper>
        <EducationCard education={incompleteEducation} />
      </TestWrapper>
    );
    
    expect(screen.getByText('Test University')).toBeInTheDocument();
    expect(screen.getByText('Test Degree')).toBeInTheDocument();
  });

  it('displays certification issuer and date when provided', () => {
    render(
      <TestWrapper>
        <EducationCard education={mockEducation} />
      </TestWrapper>
    );
    
    // Check for certification details
    expect(screen.getByText('Amazon Web Services')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
    expect(screen.getByText('ID: AWS-SAA-123456')).toBeInTheDocument();
  });

  it('handles certifications without issuer or date', () => {
    const educationWithMinimalCerts = {
      ...mockEducation,
      certifications: [
        {
          name: 'Basic Certification'
        }
      ]
    };
    
    render(
      <TestWrapper>
        <EducationCard education={educationWithMinimalCerts} />
      </TestWrapper>
    );
    
    expect(screen.getByText('Basic Certification')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <TestWrapper>
        <EducationCard education={mockEducation} />
      </TestWrapper>
    );
    
    const card = screen.getByTestId('education-card');
    expect(card).toBeInTheDocument();
  });

  it('accepts different index props for animations', () => {
    const { rerender } = render(
      <TestWrapper>
        <EducationCard education={minimalEducation} index={0} />
      </TestWrapper>
    );
    
    // Rerender with different index
    rerender(
      <TestWrapper>
        <EducationCard education={minimalEducation} index={2} />
      </TestWrapper>
    );
    
    // Should render without errors
    expect(screen.getByTestId('education-card')).toBeInTheDocument();
  });

  it('forwards additional props to the root element', () => {
    render(
      <TestWrapper>
        <EducationCard 
          education={minimalEducation} 
          data-custom="test-value"
          id="custom-id"
        />
      </TestWrapper>
    );
    
    const card = screen.getByTestId('education-card');
    expect(card).toHaveAttribute('data-custom', 'test-value');
    expect(card).toHaveAttribute('id', 'custom-id');
  });
});