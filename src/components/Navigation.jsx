import React, { memo, useState, useRef, useEffect } from 'react';
import {
  NavbarBrand,
  Navbar,
  NavLink,
  Container,
  Collapse,
  NavbarToggler
} from "reactstrap";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import useNavigation from '../hooks/useNavigation';
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
  const socialLinksRef = useRef([]);
  
  // Use custom hook for navigation behavior and data
  const { 
    isScrolled, 
    isVisible, 
    greetings, 
    socialLinks,
    collapseClasses,
    onExiting,
    onExited
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
  
  // Handle focus trap in mobile menu
  const handleTabKey = (e) => {
    if (!isOpen || !navItemsRef.current) return;
    
    // Get all focusable elements
    const focusableElements = navItemsRef.current.querySelectorAll(
      'a, button, [tabindex="0"]'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Handle tab and shift+tab to create a focus trap
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

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
