import React, { memo, useState, useRef, useEffect } from 'react';
import {
  NavbarBrand,
  Navbar,
  Container
} from "reactstrap";
import useNavigation from '../hooks/useNavigation';
import '../assets/css/components/layout/navigation.css';

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
      <Navbar
        className="navbar-main navbar-transparent navbar-light"
        expand="lg"
        id="navbar-main"
        role="navigation"
        aria-label="Main navigation"
      >
        <Container className="d-flex align-items-center">
          <NavbarBrand>
            <h2 className="text-white" id="nav-title">{greetings.name}</h2>
          </NavbarBrand>
          
          {/* Navigation links removed as requested */}
          
          {/* Social links removed to avoid duplication with hero section */}
        </Container>
      </Navbar>
    </header>
  );
};

// Apply memoization for performance optimization
export default memo(Navigation);
