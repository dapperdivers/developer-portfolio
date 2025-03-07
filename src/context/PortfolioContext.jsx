/**
 * Portfolio Context - central data store for portfolio data
 * 
 * This file creates a React Context to provide portfolio data to all components
 * Using contextUtils helpers to ensure safety in production builds
 */

import React from 'react';
import { createTypedContext, createContextHook } from '@utils/contextUtils';

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
 * Context for portfolio data management
 * @type {React.Context}
 */
const PortfolioContext = createTypedContext();

/**
 * Provider component for portfolio data
 * 
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that will have access to the portfolio context
 * @returns {ReactElement} Portfolio Provider component
 */
export const PortfolioProvider = ({ children, testValue = null }) => {
  // Use memoization to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => {
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
    <PortfolioContext.Provider value={contextValue}>
      {children}
    </PortfolioContext.Provider>
  );
};

PortfolioProvider.propTypes = {
  children: PropTypes.node.isRequired,
  testValue: PropTypes.object
};

/**
 * Hook to access portfolio data
 * 
 * @returns {Object} Portfolio data object containing all sections
 */
export const usePortfolio = createContextHook(PortfolioContext, 'usePortfolio');

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

export default PortfolioContext;
