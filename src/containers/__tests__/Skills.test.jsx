import React from 'react';
import { render, screen } from '@testing-library/react';
import Skills from '../Skills';
import { jest } from '@jest/globals';

// Mock hooks data
const mockSkillsData = {
  skillsSection: {
    title: 'Skills',
    subTitle: 'My technical skills',
    skills: [
      'Developing highly interactive Front end / User Interfaces',
      'Building responsive web applications with React',
      'Creating application backend in Node and Express'
    ],
    softwareSkills: [
      {
        skillName: 'HTML5',
        fontAwesomeClassname: 'logos:html-5'
      },
      {
        skillName: 'CSS3',
        fontAwesomeClassname: 'logos:css-3'
      },
      {
        skillName: 'JavaScript',
        fontAwesomeClassname: 'logos:javascript'
      },
      {
        skillName: 'React',
        fontAwesomeClassname: 'logos:react'
      }
    ]
  }
};

// Set up mocks before importing components
jest.mock('../../hooks/useSkills', () => {
  return {
    __esModule: true,
    default: () => mockSkillsData
  };
});

// Mock DisplayLottie
jest.mock('../../components/DisplayLottie', () => {
  return {
    __esModule: true,
    default: function MockDisplayLottie() {
      return <div data-testid="mocked-lottie">Lottie Animation</div>;
    }
  };
});

// Mock Section component
jest.mock('../../components/layout/Section', () => {
  return {
    __esModule: true,
    default: ({ id, title, subtitle, children, className, 'aria-label': ariaLabel }) => (
      <section 
        id={id} 
        data-testid="mocked-section" 
        className={className}
        aria-label={ariaLabel}
      >
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        <div data-testid="section-content">
          {children}
        </div>
      </section>
    )
  };
});

// Mock Skill component
jest.mock('../../components/ui/Skill', () => {
  return {
    __esModule: true,
    default: ({ skill, index, size }) => (
      <div 
        data-testid={`skill-${index}`} 
        data-skill-name={skill.skillName}
        data-size={size}
      >
        {skill.skillName}
      </div>
    )
  };
});

// Simple mocks for reactstrap components
jest.mock('reactstrap', () => {
  return {
    Row: ({ children, className }) => (
      <div data-testid="mock-row" className={className}>
        {children}
      </div>
    ),
    Col: ({ children, lg }) => (
      <div data-testid="mock-col" data-lg={lg}>
        {children}
      </div>
    )
  };
});

describe('Skills Container', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  
  it('renders the Skills section with proper title and subtitle', () => {
    render(<Skills />);
    
    // Check for section title and subtitle
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('My technical skills')).toBeInTheDocument();
  });
  
  it('renders the Lottie animation component', () => {
    render(<Skills />);
    
    // Check if Lottie component is rendered
    const lottieComponent = screen.getByTestId('mocked-lottie');
    expect(lottieComponent).toBeInTheDocument();
  });
  
  it('renders all skills from the hook data', () => {
    render(<Skills />);
    
    // We should have 4 skill components based on our mock data
    const skill1 = screen.getByText('HTML5');
    const skill2 = screen.getByText('CSS3');
    const skill3 = screen.getByText('JavaScript');
    const skill4 = screen.getByText('React');
    
    expect(skill1).toBeInTheDocument();
    expect(skill2).toBeInTheDocument();
    expect(skill3).toBeInTheDocument();
    expect(skill4).toBeInTheDocument();
  });
  
  it('renders skill descriptions', () => {
    render(<Skills />);
    
    // Check for all our skill description items
    expect(screen.getByText('Developing highly interactive Front end / User Interfaces')).toBeInTheDocument();
    expect(screen.getByText('Building responsive web applications with React')).toBeInTheDocument();
    expect(screen.getByText('Creating application backend in Node and Express')).toBeInTheDocument();
  });
  
  it('passes correct props to Section component', () => {
    render(<Skills />);
    
    // Check if section has the right props
    const section = screen.getByTestId('mocked-section');
    expect(section).toHaveAttribute('id', 'skills');
    expect(section).toHaveClass('skills-section');
    expect(section).toHaveAttribute('aria-label', 'Developer skills and technologies');
  });
  
  it('passes correct props to Skill components', () => {
    render(<Skills />);
    
    // Check size prop is passed correctly
    const skillComponent = screen.getByTestId('skill-0');
    expect(skillComponent).toHaveAttribute('data-size', 'lg');
  });
});