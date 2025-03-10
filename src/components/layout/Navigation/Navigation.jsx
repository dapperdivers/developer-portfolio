import React, { memo, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useNavigation from '@hooks/useNavigation';
import HeaderName from '@/components/atoms/HeaderName';
import SocialLinks from '@/components/molecules/SocialLinks';
import { useAnimation } from '@context/AnimationContext';

/**
 * Navigation component for the site header.
 * Uses HeaderName as menu toggle, with SocialLinks always visible.
 * 
 * @component
 * @returns {React.ReactElement} Navigation component
 */
const Navigation = () => {
  // State for menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  
  // Use custom hook for navigation behavior and data
  const { 
    isVisible, 
    greetings
  } = useNavigation();
  
  // Get animation context
  const { animationEnabled } = useAnimation();

  // Menu animation variants
  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md pt-4 pb-2"
      role="banner"
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav 
        className="container mx-auto px-6 py-2"
        role="navigation"
        id="navbar-main"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          {/* HeaderName as menu toggle */}
          <motion.button
            onClick={toggleMenu}
            className="appearance-none focus:outline-none group px-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu"
          >
            <HeaderName 
              name={greetings.name} 
              className="text-2xl cursor-pointer transition-opacity group-hover:opacity-80" 
            />
          </motion.button>
          
          {/* Social Links - Hidden on mobile, visible on lg screens */}
          <div className="hidden lg:flex items-center px-2">
            <SocialLinks animated={animationEnabled} />
          </div>
        </div>

        {/* Navigation Menu */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div 
              id="nav-menu"
              className="mt-6 overflow-hidden px-2"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex flex-col space-y-2">
                {[
                  { id: 'home', label: 'Home', href: '#home' },
                  { id: 'skills', label: 'Skills', href: '#skills' },
                  { id: 'projects', label: 'Projects', href: '#projects' },
                  { id: 'contact', label: 'Contact', href: '#contact' }
                ].map(item => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                {/* Social Links for mobile - Only shown in menu when on mobile */}
                <div className="lg:hidden px-4 py-2">
                  <SocialLinks animated={animationEnabled} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default memo(Navigation);
