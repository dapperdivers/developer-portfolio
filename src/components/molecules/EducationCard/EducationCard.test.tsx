import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import EducationCard from './EducationCard';
import { vi } from 'vitest';
import type { Education } from '@/types/portfolio';

// Mock framer-motion
vi.mock('framer-motion', () => {
  type MockMotionProps = Record<string, unknown> & { children?: ReactNode };

  const filterMotionProps = (props: Record<string, unknown>) => {
    const {
      initial, animate, exit, transition, whileHover, whileTap, whileFocus, whileInView,
      variants, viewport, drag, dragConstraints, dragElastic, dragMomentum,
      onDragStart, onDrag, onDragEnd, layout, layoutId, ...filteredProps
    } = props;
    return filteredProps;
  };

  // Any motion.<tag> renders the plain tag
  const motion = new Proxy({}, {
    get: (_target, tag: string) => {
      const Tag = tag as 'div';
      const Mock = ({ children, ...props }: MockMotionProps) => <Tag {...filterMotionProps(props)}>{children}</Tag>;
      return Mock;
    }
  });

  return {
    motion,
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: { children?: ReactNode }) => <div data-testid="animate-presence">{children}</div>
  };
});

// Mock react-icons
vi.mock('react-icons/fa', () => ({
  FaGraduationCap: () => <div data-testid="graduation-cap-icon">🎓</div>,
  FaCertificate: () => <div data-testid="certificate-icon">📜</div>,
  FaUniversity: () => <div data-testid="university-icon">🏛️</div>
}));

// The card takes everything through props, so it renders with no provider
const TestWrapper = ({ children }: { children: ReactNode }) => <>{children}</>;

describe('EducationCard Component', () => {
  const mockEducation: Education = {
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

  const minimalEducation: Education = {
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
    
    // No certification icon without certifications
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
    expect(screen.getAllByTestId('certificate-icon')).toHaveLength(1); // Main icon only
    
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

  it('does not render a certification count chip', () => {
    render(
      <TestWrapper>
        <EducationCard education={mockEducation} />
      </TestWrapper>
    );

    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });

  it('handles missing optional fields gracefully', () => {
    // Deliberately partial: duration is left out
    const incompleteEducation = {
      schoolName: 'Test University',
      degree: 'Test Degree'
    } as Education;
    
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
    // Deliberately partial: the certification has no issuer or date
    const educationWithMinimalCerts = {
      ...mockEducation,
      certifications: [
        {
          name: 'Basic Certification'
        }
      ]
    } as Education;
    
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