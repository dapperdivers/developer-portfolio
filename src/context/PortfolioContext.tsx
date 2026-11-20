/**
 * Portfolio Context - central data store for portfolio data
 * 
 * This file creates a React Context to provide portfolio data to all components
 * Using the decoupled factory pattern for better maintainability
 */

import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { createTypedContext } from '@utils/contextUtils';
import type { PortfolioData } from '@/types/portfolio';

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
// Empty placeholders, only seen by a consumer rendered outside the provider
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
} as unknown as PortfolioData;

/**
 * Create the context using the factory pattern
 */
const { 
  context: PortfolioContext, 
  useTypedContext: usePortfolio,
  Provider: PortfolioContextProvider
} = createTypedContext<PortfolioData>(defaultPortfolioData, 'usePortfolio');

/** Portfolio data as tests supply it: any section may be missing or partly filled. */
export type PortfolioTestValue = {
  [K in keyof PortfolioData]?: PortfolioData[K] extends unknown[]
    ? PortfolioData[K]
    : Partial<PortfolioData[K]>;
};

export interface PortfolioProviderProps {
  /** Child components that will have access to the portfolio context */
  children: ReactNode;
  /** Optional replacement data, for tests and stories; sections may be incomplete */
  testValue?: PortfolioTestValue | null;
}

/**
 * Provider component for portfolio data
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the portfolio context
 * @param {Object} props.testValue - Optional test value for testing
 * @returns {React.ReactElement} Portfolio Provider component
 */
export const PortfolioProvider = ({ children, testValue = null }: PortfolioProviderProps) => {
  // Use memoization to prevent unnecessary re-renders
  const contextValue = useMemo<PortfolioData>(() => {
    // Allow injecting test values for tests
    if (testValue) {
      // Passed through as given, incomplete or not
      return testValue as PortfolioData;
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
