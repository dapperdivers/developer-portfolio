import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Skills from '../Skills';
import useSkills from '../../hooks/useSkills';

// Mocks
jest.mock('../../hooks/useSkills');
jest.mock('../../components/DisplayLottie', () => ({
  __esModule: true,
  default: ({ animationData }) => (
    <div data-testid="mock-lottie" data-animation={typeof animationData}>
      Lottie Animation
    </div>
  )
}));

// Advanced mock for framer-motion with animation state tracking
jest.mock('framer-motion', () => {
  const animationState = {
    current: {},
    setInView: (element, inView) => {
      animationState.current[element] = { inView };
    }
  };

  // Expose for tests
  window.__framerAnimationState = animationState;

  return {
    motion: {
      div: ({ children, whileInView, initial, variants, viewport, className, ...props }) => (
        <div 
          data-testid="mock-motion-div" 
          data-motion-initial={initial ? JSON.stringify(initial) : null}
          data-motion-whileinview={whileInView ? JSON.stringify(whileInView) : null}
          data-motion-viewport={viewport ? JSON.stringify(viewport) : null}
          data-framer-has-variants={!!variants}
          className={className}
          {...props}
        >
          {children}
        </div>
      ),
      p: ({ children, variants, className, ...props }) => (
        <p 
          data-testid="mock-motion-p" 
          data-framer-has-variants={!!variants}
          className={className}
          {...props}
        >
          {children}
        </p>
      ),
      section: ({ children, ...props }) => (
        <section data-testid="mock-motion-section" {...props}>
          {children}
        </section>
      )
    }
  };
});

describe('Enhanced Skills Container Tests', () => {
  // Mock skill data
  const mockSkillsData = {
    skillsSection: {
      title: "What I'm Good At",
      subTitle: "I can work with these technologies",
      skills: [
        "Building responsive SPAs with React and Next.js",
        "Creating performant backend services with Node.js",
        "Working with SQL and NoSQL databases"
      ],
      softwareSkills: [
        {
          skillName: "HTML5",
          fontAwesomeClassname: "logos:html-5"
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "logos:css-3"
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "logos:javascript"
        },
        {
          skillName: "React",
          fontAwesomeClassname: "logos:react"
        },
        {
          skillName: "Node.js",
          fontAwesomeClassname: "logos:nodejs"
        }
      ]
    }
  };

  beforeEach(() => {
    // Reset mock states
    jest.clearAllMocks();
    
    // Setup the mock data
    useSkills.mockReturnValue(mockSkillsData);
    
    // Reset animation state
    if (window.__framerAnimationState) {
      window.__framerAnimationState.current = {};
    }
  });

  it('renders with correct title and subtitle from hook data', () => {
    render(<Skills />);
    
    expect(screen.getByText("What I'm Good At")).toBeInTheDocument();
    expect(screen.getByText("I can work with these technologies")).toBeInTheDocument();
  });
  
  it('renders all skills from the data with animations', () => {
    render(<Skills />);
    
    // Each skill should be rendered as a motion.p element
    mockSkillsData.skillsSection.skills.forEach(skill => {
      const element = screen.getByText(skill);
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('data-testid', 'mock-motion-p');
      expect(element).toHaveAttribute('data-framer-has-variants', 'true');
    });
  });
  
  it('renders all softwareSkills in the skill grid', () => {
    render(<Skills />);
    
    // The skill grid should exist
    const skillGrid = screen.getByLabelText(`${mockSkillsData.skillsSection.softwareSkills.length} technical skills`);
    expect(skillGrid).toBeInTheDocument();
    
    // Since Skill components are mocked in setupTests.js, we can only check
    // that the correct number of child elements are rendered
    const childElements = skillGrid.children;
    expect(childElements.length).toBe(mockSkillsData.skillsSection.softwareSkills.length);
  });
  
  it('uses the Section component with proper animation props', () => {
    render(<Skills />);
    
    // Section should be rendered with animation props
    const section = screen.getByLabelText('Developer skills and technologies');
    expect(section).toBeInTheDocument();
    
    // This will actually test the Section component itself more than Skills
    // but it's important to confirm the integration is correct
    expect(section).toHaveAttribute('id', 'skills');
    expect(section).toHaveClass('skills-section');
  });
  
  it('renders the Lottie animation with correct props', () => {
    render(<Skills />);
    
    const lottie = screen.getByTestId('mock-lottie');
    expect(lottie).toBeInTheDocument();
    
    // The parent div should be marked as decorative
    const lottieContainer = lottie.parentElement;
    expect(lottieContainer).toHaveAttribute('aria-hidden', 'true');
    expect(lottieContainer).toHaveClass('skills-animation');
  });
  
  it('uses the correct layout in a responsive grid', () => {
    render(<Skills />);
    
    // Check for two columns layout (reactstrap Row with two Cols)
    const animationCol = screen.getByTestId('mock-lottie').closest('.col-lg-6');
    const skillsCol = screen.getByLabelText(`${mockSkillsData.skillsSection.softwareSkills.length} technical skills`).closest('.col-lg-6');
    
    expect(animationCol).toBeInTheDocument();
    expect(skillsCol).toBeInTheDocument();
    
    // Both should be children of the same row
    expect(animationCol.parentElement).toBe(skillsCol.parentElement);
    expect(animationCol.parentElement.classList.contains('row')).toBe(true);
  });
  
  it('has the motion elements with proper animation configuration', () => {
    render(<Skills />);
    
    // Check description container
    const descriptionContainer = screen.getByTestId('mock-motion-div');
    expect(descriptionContainer).toHaveAttribute('data-motion-initial');
    expect(descriptionContainer).toHaveAttribute('data-motion-whileinview');
    expect(descriptionContainer).toHaveClass('skills-description');
    
    // The initial animation state should be 'hidden'
    const initialState = JSON.parse(descriptionContainer.getAttribute('data-motion-initial'));
    expect(initialState).toEqual({ opacity: 0, y: 20 });
    
    // The whileInView state should be 'visible'
    const whileInViewState = JSON.parse(descriptionContainer.getAttribute('data-motion-whileinview'));
    expect(whileInViewState).toEqual({ opacity: 1, y: 0 });
  });

  it('applies proper accessibility attributes throughout the component', () => {
    render(<Skills />);
    
    // Check section ARIA label
    const section = screen.getByLabelText('Developer skills and technologies');
    expect(section).toBeInTheDocument();
    
    // Check skills grid ARIA label
    const skillsGrid = screen.getByLabelText(`${mockSkillsData.skillsSection.softwareSkills.length} technical skills`);
    expect(skillsGrid).toBeInTheDocument();
    
    // Animation should be marked as decorative
    const animation = screen.getByTestId('mock-lottie').parentElement;
    expect(animation).toHaveAttribute('aria-hidden', 'true');
    
    // Skill descriptions should be keyboard focusable
    const skillTexts = screen.getAllByTestId('mock-motion-p');
    skillTexts.forEach(text => {
      expect(text).toHaveAttribute('tabIndex', '0');
    });
  });
});
