import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './TerminalCursor.css';

/**
 * TerminalCursor atom component for rendering a blinking terminal cursor
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.show=true] - Whether to show the cursor
 * @param {boolean} [props.focused=false] - Whether the cursor is in focused state
 * @param {string} [props.variant='default'] - Visual variant ('default', 'security', 'terminal', 'kitty')
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement} TerminalCursor component
 */
const TerminalCursor = ({ 
  show = true,
  focused = false,
  variant = 'default',
  className = '',
  ...rest
}) => {
  const { animationEnabled, prefersReducedMotion } = useAnimation();
  
  // Enhanced cursor variants with better blinking
  const cursorVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: [1, 0, 1],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: focused ? 0.6 : 1,
        repeatDelay: 0,
        ease: "linear"
      }
    },
    focused: {
      opacity: [1, 0.3, 1],
      scale: [1, 1.1, 1],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5,
        repeatDelay: 0,
        ease: "easeInOut"
      }
    },
    noAnimation: { opacity: 1 }
  };

  // Build class names
  const classes = [
    'terminal-cursor',
    `terminal-cursor--${variant}`,
    focused ? 'terminal-cursor--focused' : '',
    className
  ].filter(Boolean).join(' ');

  if (!show) return null;

  return (
    <motion.span 
      className={classes}
      aria-hidden="true"
      variants={cursorVariants}
      initial="visible"
      animate={
        animationEnabled && !prefersReducedMotion
          ? (focused ? "focused" : "visible")
          : "noAnimation"
      }
      {...rest}
    />
  );
};

TerminalCursor.propTypes = {
  show: PropTypes.bool,
  focused: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'security', 'terminal', 'kitty']),
  className: PropTypes.string,
};

export default memo(TerminalCursor);