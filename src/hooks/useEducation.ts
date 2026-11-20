import { usePortfolio } from '@context/PortfolioContext';

/**
 * Custom hook to access education data from the portfolio context.
 * 
 * @function useEducation
 * @returns {Array} Array of education objects
 * 
 * @example
 * import { useEducation } from '@hooks/useEducation';
 * 
 * const EducationList = () => {
 *   const education = useEducation();
 *   
 *   return (
 *     <div>
 *       {education.map(item => (
 *         <div key={item.schoolName}>{item.schoolName}</div>
 *       ))}
 *     </div>
 *   );
 * };
 */
const useEducation = () => {
  const { educationInfo } = usePortfolio();
  return educationInfo;
};

export default useEducation;
