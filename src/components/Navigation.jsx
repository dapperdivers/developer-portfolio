import React, { memo, useState, useRef, useEffect } from 'react';

import useNavigation from '../hooks/useNavigation';


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
  
  // Focus trap functionality removed as it's not currently used
  // If needed in the future, re-implement the handleTabKey function here

  return (
    <header 
      className={`header-global ${isScrolled ? 'scrolled' : ''} ${isVisible ? '' : 'header-hidden'}`}
      role="banner"
    >
      <nav 
        className="navbar-main navbar-transparent navbar-light lg:flex"
        role="navigation"
        id="navbar-main"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 flex items-center">
          <div className="navbar-brand">
            <h2 className="text-white" id="nav-title">{greetings.name}</h2>
          </div>
          
          {/* Navigation links removed as requested */}
          
          {/* Social links removed to avoid duplication with hero section */}
        </div>
      </nav>
    </header>
  );
};

// Apply memoization for performance optimization
export default memo(Navigation);
