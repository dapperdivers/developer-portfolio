import { usePortfolio } from '../context/PortfolioContext';

/**
 * Custom hook to access skills data from the portfolio context.
 * 
 * @function useSkills
 * @returns {Object} Object containing skillsSection and skillBars data
 * 
 * @example
 * import { useSkills } from '../hooks/useSkills';
 * 
 * const SkillsDisplay = () => {
 *   const { skillsSection, skillBars } = useSkills();
 *   
 *   return (
 *     <div>
 *       <h2>{skillsSection.title}</h2>
 *       {skillsSection.softwareSkills.map(skill => (
 *         <div key={skill.skillName}>{skill.skillName}</div>
 *       ))}
 *     </div>
 *   );
 * };
 */
const useSkills = () => {
  const { skillsSection, skillBars } = usePortfolio();
  return { skillsSection, skillBars };
};

export default useSkills;
