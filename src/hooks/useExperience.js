import { usePortfolio } from '../context/PortfolioContext';

/**
 * Custom hook to access experience data from the portfolio context.
 * 
 * @function useExperience
 * @returns {Array} Array of experience objects
 * 
 * @example
 * import { useExperience } from '../hooks/useExperience';
 * 
 * const ExperienceList = () => {
 *   const experience = useExperience();
 *   
 *   return (
 *     <div>
 *       {experience.map(job => (
 *         <div key={job.company}>{job.role} at {job.company}</div>
 *       ))}
 *     </div>
 *   );
 * };
 */
const useExperience = () => {
  const { experience } = usePortfolio();
  return experience;
};

export default useExperience;
