import { usePortfolio } from '@context/PortfolioContext';

/**
 * Custom hook to provide footer functionality and data.
 * 
 * @function useFooter
 * @returns {Object} Footer data and functions
 * @returns {number} returns.currentYear - Current year for copyright
 * @returns {Object} returns.greetings - Greetings data from portfolio
 * @returns {Object} returns.socialLinks - Social links data from portfolio
 * 
 * @example
 * import { useFooter } from '@hooks/useFooter';
 * 
 * const FooterComponent = () => {
 *   const { currentYear, greetings } = useFooter();
 *   
 *   return (
 *     <footer>
 *       <p>© {currentYear} {greetings.name}</p>
 *     </footer>
 *   );
 * };
 */
const useFooter = () => {
  // Get data from portfolio context
  const { greetings, socialLinks } = usePortfolio();
  
  // Get current year for copyright notice
  const currentYear = new Date().getFullYear();
  
  return {
    currentYear,
    greetings,
    socialLinks
  };
};

export default useFooter;
