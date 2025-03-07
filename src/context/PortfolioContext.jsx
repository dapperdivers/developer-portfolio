/**
 * Portfolio Context - central data store for portfolio data
 * 
 * This file creates a React Context to provide portfolio data to all components
 * Using the decoupled factory pattern for better maintainability
 */

import React, { useMemo } from 'react';
import { createTypedContext } from '@utils/contextUtils';

import PropTypes from 'prop-types';
import {
  greetings,
  openSource,
  contact,
  socialLinks,
  skillsSection,
  SkillBars,
  educationInfo,
  experience,
  projects,
  feedbacks
} from '@/portfolio';

/**
 * Default portfolio data structure
 */
const defaultPortfolioData = {
  greetings: {},
  openSource: {},
  contact: {},
  socialLinks: {},
  skillsSection: {},
  skillBars: [],
  educationInfo: [],
  experience: [],
  projects: [],
  feedbacks: []
};

/**
 * Create the context using the factory pattern
 */
const { 
  context: PortfolioContext, 
  useTypedContext: usePortfolio,
  Provider: PortfolioContextProvider
} = createTypedContext(defaultPortfolioData, 'usePortfolio');

/**
 * Provider component for portfolio data
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the portfolio context
 * @param {Object} props.testValue - Optional test value for testing
 * @returns {React.ReactElement} Portfolio Provider component
 */
export const PortfolioProvider = ({ children, testValue = null }) => {
  // Use memoization to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    // Allow injecting test values for tests
    if (testValue) {
      return testValue;
    }
    
    return {
      greetings,
      openSource,
      contact,
      socialLinks,
      skillsSection,
      skillBars: SkillBars,
      educationInfo,
      experience,
      projects,
      feedbacks
    };
  }, [testValue]);

  return (
    <PortfolioContextProvider value={contextValue}>
      {children}
    </PortfolioContextProvider>
  );
};

PortfolioProvider.propTypes = {
  children: PropTypes.node.isRequired,
  testValue: PropTypes.object
};

/**
 * Section-specific hooks for more targeted data access
 */

export const useGreetings = () => {
  const { greetings } = usePortfolio();
  return greetings;
};

export const useSkills = () => {
  const { skillsSection, skillBars } = usePortfolio();
  return { skillsSection, skillBars };
};

export const useEducation = () => {
  const { educationInfo } = usePortfolio();
  return educationInfo;
};

export const useExperience = () => {
  const { experience } = usePortfolio();
  return experience;
};

export const useProjects = () => {
  const { projects } = usePortfolio();
  return projects;
};

export const useFeedback = () => {
  const { feedbacks } = usePortfolio();
  return feedbacks;
};

export const useSocialLinks = () => {
  const { socialLinks } = usePortfolio();
  return socialLinks;
};

// Export the context, hook, and individual hooks
export { PortfolioContext, usePortfolio };
export default PortfolioContext;
