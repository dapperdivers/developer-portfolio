import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skills from '../Skills';

// Mock required hooks and components
jest.mock('../../hooks/useSkills', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    skillsSection: {
      title: 'Skills & Expertise',
      subTitle: 'What I bring to the table',
      softwareSkills: [
        {
          skillName: 'React',
          iconName: 'logos:react',
          category: 'frontend'
        },
        {
          skillName: 'Node.js',
          iconName: 'logos:nodejs',
          category: 'backend'
        },
        {
          skillName: 'CSS3',
          fontAwesomeClassname: 'fab fa-css3',
          category: 'frontend'
        }
      ],
      skills: [
        'Building responsive web applications',
        'Creating user-friendly interfaces',
        'Developing RESTful APIs'
      ]
    },
    skillBars: [
      {
        Stack: 'Frontend',
        progressPercentage: 80
      },
      {
        Stack: 'Backend',
        progressPercentage: 70
      }
    ]
  }))
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, whileInView, viewport, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
    p: ({ children, variants, ...props }) => (
      <p data-testid="motion-p" {...props}>
        {children}
      </p>
    )
  }
}));

// Mock DisplayLottie component
jest.mock('../../components/DisplayLottie', () => ({
  __esModule: true,
  default: ({ animationData, quality, size, shouldOptimize }) => (
    <div 
      data-testid="lottie-animation" 
      data-quality={quality}
      data-size={size}
      data-optimize={shouldOptimize ? 'true' : 'false'}
    >
      Animation Mock
    </div>
  )
}));

// Mock Section component
jest.mock('../../components/layout/Section', () => ({
  __esModule: true,
  default: ({ children, title, subtitle, animation, className, id }) => (
    <section 
      data-testid="section-mock" 
      className={className}
      id={id}
    >
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <div>{children}</div>
    </section>
  )
}));

// Mock Skill component
jest.mock('../../components/ui/Skill', () => ({
  __esModule: true,
  default: ({ skill, index, size, reducedMotion }) => (
    <div 
      data-testid={`skill-${skill.skillName}`}
      data-size={size}
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
      data-index={index}
    >
      {skill.skillName}
    </div>
  )
}));

// Mock SkeletonCard component
jest.mock('../../components/SkeletonCard', () => ({
  __esModule: true,
  default: ({ type }) => (
    <div data-testid={`skeleton-${type}-mock`}></div>
  )
}));

// Mock context
jest.mock('../../context/PortfolioContext', () => ({
  __esModule: true,
  usePortfolio: jest.fn(() => ({
    skillsSection: {
      display: true
    },
    settings: {
      loadingDelay: 0
    }
  }))
}));

// Mock reactstrap components
jest.mock('reactstrap', () => ({
  Row: ({ children, className }) => <div data-testid="mock-row" className={className}>{children}</div>,
  Col: ({ children, lg }) => <div data-testid="mock-col" data-lg={lg}>{children}</div>
}));

describe('Skills Container', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset window width for device detection tests
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200
    });
    
    // Mock matchMedia for reduced motion detection
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  it('renders the skills section with correct title and subtitle', () => {
    render(<Skills />);
    
    // Check section title and subtitle
    expect(screen.getByText('Skills & Expertise')).toBeInTheDocument();
    expect(screen.getByText('What I bring to the table')).toBeInTheDocument();
  });

  it('renders all skills with proper configuration', () => {
    render(<Skills />);
    
    // Should render all skills
    expect(screen.getByTestId('skill-React')).toBeInTheDocument();
    expect(screen.getByTestId('skill-Node.js')).toBeInTheDocument();
    expect(screen.getByTestId('skill-CSS3')).toBeInTheDocument();
    
    // Check size prop
    expect(screen.getByTestId('skill-React')).toHaveAttribute('data-size', 'lg');
  });

  it('renders the Lottie animation with optimization based on device', () => {
    render(<Skills />);
    
    const lottieAnimation = screen.getByTestId('lottie-animation');
    expect(lottieAnimation).toBeInTheDocument();
    
    // Default (high-end device) should use high quality
    expect(lottieAnimation).toHaveAttribute('data-quality', '1');
    expect(lottieAnimation).toHaveAttribute('data-optimize', 'true');
  });

  it('renders skills description points', () => {
    render(<Skills />);
    
    // Check for skill description items
    expect(screen.getByText('Building responsive web applications')).toBeInTheDocument();
    expect(screen.getByText('Creating user-friendly interfaces')).toBeInTheDocument();
    expect(screen.getByText('Developing RESTful APIs')).toBeInTheDocument();
  });

  it('applies reduced motion settings for low-end devices', () => {
    // Simulate low-end device
    Object.defineProperty(window.navigator, 'deviceMemory', {
      value: 2, // 2GB RAM (low-end)
      configurable: true
    });
    
    render(<Skills />);
    
    // Check that reduced motion is applied
    const section = screen.getByTestId('section-mock');
    expect(section).toHaveClass('reduced-motion');
    
    // Skills should have reduced motion
    expect(screen.getByTestId('skill-React')).toHaveAttribute('data-reduced-motion', 'true');
    
    // Lottie animation should be optimized
    const lottieAnimation = screen.getByTestId('lottie-animation');
    expect(lottieAnimation).toHaveAttribute('data-quality', '0.7');
    expect(lottieAnimation).toHaveAttribute('data-size', 'small');
  });

  it('respects prefers-reduced-motion user setting', () => {
    // Simulate prefers-reduced-motion
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    
    render(<Skills />);
    
    // Check that reduced motion is applied
    const section = screen.getByTestId('section-mock');
    expect(section).toHaveClass('reduced-motion');
    
    // Skills should have reduced motion
    expect(screen.getByTestId('skill-React')).toHaveAttribute('data-reduced-motion', 'true');
  });
  
  it('renders loading skeleton when skills data is not ready', () => {
    // Override the useSkills mock to return null
    require('../../hooks/useSkills').default.mockImplementationOnce(() => null);
    
    render(<Skills />);
    
    // Should show skeleton loaders
    const skeletonCards = screen.getAllByTestId('skeleton-skill-mock');
    expect(skeletonCards.length).toBeGreaterThan(0);
  });
  
  it('does not render when display is set to false', () => {
    // Override the context mock
    require('../../context/PortfolioContext').usePortfolio.mockImplementationOnce(() => ({
      skillsSection: {
        display: false
      }
    }));
    
    const { container } = render(<Skills />);
    
    // Should not render anything
    expect(container.firstChild).toBeNull();
  });
});