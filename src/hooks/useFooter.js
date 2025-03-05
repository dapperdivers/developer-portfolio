import { useCallback } from 'react';
import { usePortfolio } from '@context/PortfolioContext';

/**
 * Custom hook to provide footer functionality and data.
 * 
 * @function useFooter
 * @returns {Object} Footer data and functions
 * @returns {Function} returns.scrollToTop - Function to scroll to the top of the page
 * @returns {number} returns.currentYear - Current year for copyright
 * @returns {Object} returns.greetings - Greetings data from portfolio
 * @returns {Object} returns.socialLinks - Social links data from portfolio
 * 
 * @example
 * import { useFooter } from '@hooks/useFooter';
 * 
 * const FooterComponent = () => {
 *   const { currentYear, scrollToTop, greetings } = useFooter();
 *   
 *   return (
 *     <footer>
 *       <p>© {currentYear} {greetings.name}</p>
 *       <button onClick={scrollToTop}>Back to top</button>
 *     </footer>
 *   );
 * };
 */
const useFooter = () => {
  // Get data from portfolio context
  const { greetings, socialLinks } = usePortfolio();
  
  // Get current year for copyright notice
  const currentYear = new Date().getFullYear();
  
  // Function to scroll to top of page
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  return {
    currentYear,
    scrollToTop,
    greetings,
    socialLinks
  };
};

export default useFooter;
