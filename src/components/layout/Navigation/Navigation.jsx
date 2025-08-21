import React, { memo } from 'react';
import { motion } from 'framer-motion';
import useNavigation from '@hooks/useNavigation';
import HeaderName from '@/components/atoms/HeaderName';
import SocialLinks from '@/components/molecules/SocialLinks';
import { useAnimation } from '@context/AnimationContext';

/**
 * Navigation component for the site header.
 * Displays HeaderName and SocialLinks.
 * 
 * @component
 * @returns {React.ReactElement} Navigation component
 */
const Navigation = () => {
  // Use custom hook for navigation behavior and data
  const { 
    isVisible, 
    greetings
  } = useNavigation();
  
  // Get animation context
  const { animationEnabled } = useAnimation();

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 pt-4 pb-2"
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
          {/* HeaderName - no longer clickable */}
          <div className="px-2">
            <HeaderName 
              name={greetings.name} 
              className="" 
            />
          </div>
          
          {/* Social Links - Hidden on mobile, visible on lg screens */}
          <div className="hidden lg:flex items-center px-2">
            <SocialLinks animated={animationEnabled} />
          </div>
        </div>

      </nav>
    </motion.header>
  );
};

export default memo(Navigation);
