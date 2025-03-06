import React, { memo, useState, useRef, useEffect } from 'react';
import useNavigation from '@hooks/useNavigation';
import PropTypes from 'prop-types';
import './Navigation.css';

/**
 * Navigation component for the site header.
 * Handles scroll behavior, social links, and branding.
 * 
 * @component
 * @returns {React.ReactElement} Navigation component
 */
const Navigation = () => {
  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  // Refs for keyboard navigation
  const togglerRef = useRef(null);
  const navItemsRef = useRef(null);
  
  // Use custom hook for navigation behavior and data
  const { 
    isScrolled, 
    isVisible, 
    greetings
  } = useNavigation();
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Close menu on escape key
      if (e.key === 'Escape' && isOpen) {
        toggle();
        togglerRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggle]);
  
  // Focus trap for mobile menu
  useEffect(() => {
    if (isOpen) {
      // Set initial focus on first interactive element when menu opens
      const firstFocusable = navItemsRef.current?.querySelector('a, button, [tabindex="0"]');
      setTimeout(() => {
        firstFocusable?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      role="banner"
    >
      <nav 
        className="py-4 px-4 lg:flex"
        role="navigation"
        id="navbar-main"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <h2 
              className="text-xl font-bold text-cyan-400 cyber-text-animation" 
              id="nav-title"
              data-content={greetings.name}
            >
              {greetings.name}
              <span className="cursor"></span>
            </h2>
          </div>
          
          {/* Empty div to maintain spacing for future navigation items */}
          <div className="hidden lg:flex items-center space-x-4" ref={navItemsRef}>
            {/* Navigation links would go here if needed */}
          </div>
        </div>
      </nav>
    </header>
  );
};

Navigation.propTypes = {
  /* No props for this component as it uses context */
};

// Apply memoization for performance optimization
export default memo(Navigation);
