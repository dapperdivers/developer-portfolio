import React from 'react';
import { render, screen } from '@testing-library/react';
import Skills from '../Skills';
import useSkills from '../../hooks/useSkills';
import { PortfolioProvider } from '../../context/PortfolioContext';

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

  // Filter out motion-specific props
  const filterMotionProps = (props) => {
    const {
      initial, animate, exit, transition, whileHover, whileTap, whileFocus, whileInView,
      variants, viewport, drag, dragConstraints, dragElastic, dragMomentum,
      onDragStart, onDrag, onDragEnd, layout, layoutId, ...filteredProps
    } = props;
    return filteredProps;
  };

  return {
    __animationState: animationState, // Expose for tests without using window
    motion: {
      div: ({ children, whileInView, initial, variants, viewport, className, ...props }) => (
        <div 
          data-testid="mock-motion-div" 
          data-motion-initial={initial ? JSON.stringify(initial) : null}
          data-motion-whileinview={whileInView ? JSON.stringify(whileInView) : null}
          data-motion-viewport={viewport ? JSON.stringify(viewport) : null}
          data-framer-has-variants={!!variants}
          className={className}
          {...filterMotionProps(props)}
        >
          {children}
        </div>
      ),
      p: ({ children, variants, className, ...props }) => (
        <p 
          data-testid="mock-motion-p" 
          data-framer-has-variants={!!variants}
          className={className}
          {...filterMotionProps(props)}
        >
          {children}
        </p>
      ),
      section: ({ children, ...props }) => (
        <section data-testid="mock-motion-section" {...filterMotionProps(props)}>
          {children}
        </section>
      ),
      span: ({ children, ...props }) => (
        <span data-testid="mock-motion-span" {...filterMotionProps(props)}>
          {children}
        </span>
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
          iconName: "logos:html-5"
        },
        {
          skillName: "CSS3",
          iconName: "logos:css-3"
        },
        {
          skillName: "JavaScript",
          iconName: "logos:javascript"
        },
        {
          skillName: "React",
          iconName: "logos:react"
        },
        {
          skillName: "Node.js",
          iconName: "logos:nodejs"
        }
      ]
    }
  };

  beforeEach(() => {
    // Reset mock states
    jest.clearAllMocks();
    
    // Setup the mock data
    useSkills.mockReturnValue(mockSkillsData);
    
    // Reset animation state using our module-scoped state
    const { __animationState } = require('framer-motion');
    if (__animationState) {
      __animationState.current = {};
    }
  });

  it('renders with correct title and subtitle from hook data', () => {
    render(
      <PortfolioProvider testValue={mockSkillsData}>
        <Skills />
      </PortfolioProvider>
    );
    
    expect(screen.getByText("What I'm Good At")).toBeInTheDocument();
    expect(screen.getByText("I can work with these technologies")).toBeInTheDocument();
  });
  
  it('renders all skills from the data with animations', () => {
    render(
      <PortfolioProvider testValue={mockSkillsData}>
        <Skills />
      </PortfolioProvider>
    );
    
    // Each skill should be rendered as a motion.p element
    mockSkillsData.skillsSection.skills.forEach(skill => {
      const element = screen.getByText(skill);
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('data-testid', 'mock-motion-p');
      expect(element).toHaveAttribute('data-framer-has-variants', 'true');
    });
  });
  
  it('renders all softwareSkills in the skill grid', () => {
    render(
      <PortfolioProvider testValue={mockSkillsData}>
        <Skills />
      </PortfolioProvider>
    );
    
    // The skill grid should exist
    const skillGrid = screen.getByLabelText(`${mockSkillsData.skillsSection.softwareSkills.length} technical skills`);
    expect(skillGrid).toBeInTheDocument();
    
    // Since Skill components are mocked in setupTests.js, we can only check
    // that the correct number of child elements are rendered
    const childElements = skillGrid.children;
    expect(childElements.length).toBe(mockSkillsData.skillsSection.softwareSkills.length);
  });
  
  it('uses the Section component with proper animation props', () => {
    render(
      <PortfolioProvider testValue={mockSkillsData}>
        <Skills />
      </PortfolioProvider>
    );
    
    // Section should be rendered with animation props
    const section = screen.getByLabelText('Developer skills and technologies');
    expect(section).toBeInTheDocument();
    
    // This will actually test the Section component itself more than Skills
    // but it's important to confirm the integration is correct
    expect(section).toHaveAttribute('id', 'skills');
    expect(section).toHaveClass('skills-section');
  });
  
  it('renders the Lottie animation with correct props', () => {
    render(
      <PortfolioProvider testValue={mockSkillsData}>
        <Skills />
      </PortfolioProvider>
    );
    
    const lottie = screen.getByTestId('mock-lottie');
    expect(lottie).toBeInTheDocument();
    
    // The parent div should be marked as decorative
    const lottieContainer = lottie.parentElement;
    expect(lottieContainer).toHaveAttribute('aria-hidden', 'true');
    expect(lottieContainer).toHaveClass('skills-animation');
  });
  
  it('uses the correct layout in a responsive grid', () => {
    render(
      <PortfolioProvider testValue={mockSkillsData}>
        <Skills />
      </PortfolioProvider>
    );
    
    // Check for two columns layout (using Tailwind classes)
    const animationCol = screen.getByTestId('mock-lottie').closest('.lg\\:w-6\\/12');
    const skillsCol = screen.getByLabelText(`${mockSkillsData.skillsSection.softwareSkills.length} technical skills`).closest('.lg\\:w-6\\/12');
    
    expect(animationCol).toBeInTheDocument();
    expect(skillsCol).toBeInTheDocument();
    
    // Both should be children of the same flex container
    expect(animationCol.parentElement).toBe(skillsCol.parentElement);
    expect(animationCol.parentElement.classList.contains('flex')).toBe(true);
  });
  
  it('has the motion elements with proper animation configuration', () => {
    render(
      <PortfolioProvider testValue={mockSkillsData}>
        <Skills />
      </PortfolioProvider>
    );
    
    // Get all motion div elements
    const motionDivs = screen.getAllByTestId('mock-motion-div');
    
    // Find the one with the 'skills-description' class by filtering
    const skillsDescriptionContainer = motionDivs.find(el => 
      el.classList.contains('skills-description')
    );
    
    // Make sure we found the element
    expect(skillsDescriptionContainer).toBeTruthy();
    expect(skillsDescriptionContainer).toHaveClass('skills-description');
    
    // Check animation properties
    expect(skillsDescriptionContainer).toHaveAttribute('data-motion-initial');
    expect(skillsDescriptionContainer).toHaveAttribute('data-motion-whileinview');
    expect(skillsDescriptionContainer).toHaveAttribute('data-motion-viewport');
    
    // The initial animation state should be present (the actual value may vary)
    const initialStateAttr = skillsDescriptionContainer.getAttribute('data-motion-initial');
    expect(initialStateAttr).toBeTruthy();
    
    // Check that whileInView is set to something
    const whileInViewAttr = skillsDescriptionContainer.getAttribute('data-motion-whileinview');
    expect(whileInViewAttr).toBeTruthy();
  });

  it('applies proper accessibility attributes throughout the component', () => {
    render(
      <PortfolioProvider testValue={mockSkillsData}>
        <Skills />
      </PortfolioProvider>
    );
    
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
