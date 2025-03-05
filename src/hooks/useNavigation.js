import { useState, useEffect, useCallback } from 'react';
import { usePortfolio } from '@context/PortfolioContext';

/**
 * Custom hook to handle navigation behavior and data.
 * Manages scroll behavior and provides navigation data from the portfolio context.
 * 
 * @function useNavigation
 * @returns {Object} Navigation state and data
 * @returns {boolean} returns.isScrolled - Whether the page has been scrolled down
 * @returns {boolean} returns.isVisible - Whether the navbar should be visible
 * @returns {Object} returns.greetings - Greetings data from the portfolio
 * @returns {Object} returns.socialLinks - Social links data from the portfolio
 * 
 * @example
 * import { useNavigation } from '@hooks/useNavigation';
 * 
 * const NavComponent = () => {
 *   const { isScrolled, isVisible, greetings, socialLinks } = useNavigation();
 *   
 *   return (
 *     <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isVisible ? '' : 'hidden'}`}>
 *       <div>{greetings.name}</div>
 *       <a href={socialLinks.github}>GitHub</a>
 *     </nav>
 *   );
 * };
 */
const useNavigation = () => {
  // Get data from portfolio context
  const { greetings, socialLinks } = usePortfolio();
  
  // Navbar state
  const [collapseClasses, setCollapseClasses] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  // Collapse handlers for responsive menu
  const onExiting = useCallback(() => setCollapseClasses("collapsing-out"), []);
  const onExited = useCallback(() => setCollapseClasses(""), []);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const greetingsSection = document.getElementById('greetings');
      const greetingsHeight = greetingsSection?.offsetHeight || 0;
      const buffer = 50; // Buffer zone for smoother transition
      
      // Update scroll state for visual effects
      setIsScrolled(currentScrollPos > 50);
      
      // Determine if we should show/hide based on scroll position and direction
      const isScrollingDown = currentScrollPos > prevScrollPos;
      const isPastGreetings = currentScrollPos > (greetingsHeight - buffer);
      
      // Hide navbar when scrolling down past greetings section
      setIsVisible(!isPastGreetings || !isScrollingDown);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return {
    // Navbar state
    collapseClasses,
    isScrolled,
    isVisible,
    
    // Collapse handlers
    onExiting,
    onExited,
    
    // Data from portfolio
    greetings,
    socialLinks
  };
};

export default useNavigation;
