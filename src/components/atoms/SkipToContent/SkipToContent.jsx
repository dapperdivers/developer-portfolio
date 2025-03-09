import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './SkipToContent.css';

/**
 * Skip to content link component for keyboard users.
 * This component allows keyboard users to bypass navigation
 * and jump directly to the main content.
 * Updated with security-themed variants.
 * 
 * Place this at the very top of your App component.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.mainId='main-content'] - The ID of the main content element
 * @param {string} [props.variant=''] - Visual variant ('', 'security', 'terminal')
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} SkipToContent component
 * 
 * @example
 * <SkipToContent mainId="main-content" variant="security" />
 */
const SkipToContent = ({ mainId = 'main-content', variant = '', animated = true }) => {
  const { animationEnabled } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;
  
  // Combine class names
  const className = [
    'skip-to-content',
    variant ? `skip-to-content-${variant}` : ''
  ].filter(Boolean).join(' ');

  // Animation variants
  const animationVariants = {
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

SkipToContent.propTypes = {
  mainId: PropTypes.string,
  variant: PropTypes.oneOf(['', 'security', 'terminal']),
  animated: PropTypes.bool
};

// Note: defaultProps is deprecated, we're using default parameters instead

export default SkipToContent;
