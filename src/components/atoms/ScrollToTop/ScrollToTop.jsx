import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@context//AnimationContext';
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
  const { animationEnabled } = useAnimation();

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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const buttonVariants = {
    hidden: { 
      y: 50, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    hover: { 
      y: -5,
      scale: 1.05,
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.5)',
      transition: { 
        duration: 0.3 
      }
    },
    tap: { 
      scale: 0.95,
      transition: { 
        duration: 0.1 
      }
    },
    exit: { 
      y: 50, 
      opacity: 0,
      transition: { 
        duration: 0.3 
      }
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          className="scroll-to-top"
          aria-label="Scroll to top of page"
          initial={animationEnabled ? "hidden" : false}
          animate={animationEnabled ? "visible" : false}
          exit={animationEnabled ? "exit" : false}
          whileHover={animationEnabled ? "hover" : false}
          whileTap={animationEnabled ? "tap" : false}
          variants={buttonVariants}
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
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;