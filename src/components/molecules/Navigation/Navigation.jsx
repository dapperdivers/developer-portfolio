import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useNavigation from '@hooks/useNavigation';
import HeaderName from '@/components/atoms/HeaderName';
import PropTypes from 'prop-types';
import { useAnimation, MotionVariants } from '@context/AnimationContext';
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
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  
  // Refs for keyboard navigation
  const togglerRef = useRef(null);
  const navItemsRef = useRef(null);
  
  // Use custom hook for navigation behavior and data
  const { 
    isScrolled, 
    isVisible, 
    greetings
  } = useNavigation();
  
  // Get animation context
  const { animationEnabled } = useAnimation();
  
  // Navigation animation variants
  const headerVariants = {
    visible: { 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    },
    hidden: { 
      y: "-100%",
      transition: { 
        duration: 0.3,
        ease: "easeIn" 
      }
    }
  };
  
  // Mobile menu animation variants
  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  const menuItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  // Combined styles for scroll effect
  const navStyle = {
    boxShadow: isScrolled ? 
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" : 
      "none",
    paddingTop: isScrolled ? "0.25rem" : "0.5rem",
    paddingBottom: isScrolled ? "0.25rem" : "0.5rem",
    backdropFilter: isScrolled ? "blur(12px)" : "blur(8px)"
  };
  
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
  
  // Close menu on resize (if window gets larger than mobile breakpoint)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50"
      role="banner"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={headerVariants}
      style={navStyle}
      transition={{ duration: 0.3 }}
    >
      <nav 
        className="py-4 px-4 lg:flex"
        role="navigation"
        id="navbar-main"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <HeaderName name={greetings.name} />
          </div>
          
          {/* Mobile menu button */}
          <motion.button
            ref={togglerRef}
            className="navbar-toggler lg:hidden"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls="navbar-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.95 }}
          >
            <span className="navbar-toggler-icon">
              {isOpen ? "✕" : "☰"}
            </span>
          </motion.button>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-4" ref={navItemsRef}>
            {navItems.map(item => (
              <motion.a
                key={item.id}
                href={item.href}
                className="nav-link"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
          
          {/* Mobile menu with AnimatePresence for exit animations */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="navbar-collapse lg:hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <div className="navbar-collapse-header">
                  <HeaderName name={greetings.name} />
                  <motion.button
                    className="navbar-toggler"
                    onClick={toggle}
                    aria-label="Close menu"
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="navbar-toggler-icon">✕</span>
                  </motion.button>
                </div>
                
                <div className="nav-items-container">
                  {navItems.map(item => (
                    <motion.div
                      key={item.id}
                      className="nav-item"
                      variants={menuItemVariants}
                    >
                      <motion.a
                        href={item.href}
                        className="nav-link"
                        onClick={toggle}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.label}
                      </motion.a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>
  );
};

Navigation.propTypes = {
  /* No props for this component as it uses context */
};

// Apply memoization for performance optimization
export default memo(Navigation);
