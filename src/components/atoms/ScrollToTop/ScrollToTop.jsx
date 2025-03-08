import React, { useState, useEffect } from 'react';
import './ScrollToTop.css';

/**
 * ScrollToTop component - displays a floating button that allows user to scroll
 * back to the top of the page. The button appears after scrolling down.
 * 
 * @component
 * @returns {React.ReactElement} ScrollToTop component
 */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  // Toggle button visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 300);
    };

    // Set visibility on initial load
    toggleVisibility();
    
    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);
    
    // Clean up
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top with smooth animation 
  const scrollToTop = () => {
    // Get the current scroll position
    const currentPosition = window.pageYOffset;
    
    // If we're already near the top, just jump to top
    if (currentPosition < 100) {
      window.scrollTo(0, 0);
      return;
    }
    
    // Calculate duration based on scroll position (faster for shorter distances)
    const scrollDuration = Math.min(1000, Math.max(500, currentPosition / 3));
    
    // Use requestAnimationFrame for smoother scrolling
    const scrollStep = -currentPosition / (scrollDuration / 15);
    
    const scrollAnimation = () => {
      if (window.pageYOffset <= 0) return;
      
      window.scrollBy(0, scrollStep);
      requestAnimationFrame(scrollAnimation);
    };
    
    requestAnimationFrame(scrollAnimation);
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Scroll to top of page"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="scroll-icon" 
            viewBox="0 0 24 24" 
            fill="none"
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;