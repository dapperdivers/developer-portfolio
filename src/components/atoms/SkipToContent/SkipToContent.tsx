import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import './SkipToContent.css';

export interface SkipToContentProps {
  /** The ID of the main content element */
  mainId?: string;
  /** Visual variant */
  variant?: '' | 'security' | 'terminal';
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * Skip to content link component for keyboard users.
 * This component allows keyboard users to bypass navigation
 * and jump directly to the main content.
 * Updated with security-themed variants.
 * 
 * Place this at the very top of your App component.
 * 
 * @component
 * 
 * @example
 * <SkipToContent mainId="main-content" variant="security" />
 */
const SkipToContent = ({ mainId = 'main-content', variant = '', animated = true }: SkipToContentProps) => {
  const shouldAnimate = useMotionEnabled(animated);
  
  // Combine class names
  const className = [
    'skip-to-content',
    variant ? `skip-to-content-${variant}` : ''
  ].filter(Boolean).join(' ');

  // Animation variants
  const animationVariants: Variants = {
    hidden: { top: -100, opacity: 0 },
    visible: { 
      top: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 25 } 
    },
    exit: { top: -100, opacity: 0 }
  };

  return (
    <motion.a 
      href={`#${mainId}`} 
      className={className}
      initial="hidden"
      whileFocus={shouldAnimate ? "visible" : {}}
      exit="exit"
      variants={shouldAnimate ? animationVariants : {}}
    >
      Skip to main content
    </motion.a>
  );
};


// Note: defaultProps is deprecated, we're using default parameters instead

export default SkipToContent;
