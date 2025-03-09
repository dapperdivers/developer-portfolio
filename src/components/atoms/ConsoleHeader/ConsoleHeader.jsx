import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import Card from '@atoms/Card';
import TerminalControls from '@atoms/TerminalControls/TerminalControls';
import './ConsoleHeader.css';

/**
 * ConsoleHeader atom component for rendering a terminal-like console header
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.prompt='user@portfolio:~$'] - Command prompt text
 * @param {string} [props.command=''] - Command text
 * @param {boolean} [props.showCursor=true] - Whether to show the blinking cursor
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.variant='terminal'] - Visual variant ('terminal', 'security')
 * @param {boolean} [props.shadow=true] - Whether to show a shadow
 * @param {string} [props.id] - Unique ID for ARIA relationships
 * @param {string} [props.ariaDescription] - Description for screen readers
 * @returns {React.ReactElement} ConsoleHeader component
 */
const ConsoleHeader = ({ 
  prompt = 'user@portfolio:~$',
  command = '',
  showCursor = true,
  className = '',
  variant = 'terminal',
  shadow = true,
  id,
  ariaDescription,
  ...rest
}) => {
  // State to track if on mobile
  const [isMobile, setIsMobile] = useState(false);
  const { animationEnabled, shouldReduceMotion } = useAnimation();
  
  // Set up mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Animation variants
  const consoleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const cursorVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: [1, 0, 1],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
        repeatDelay: 0,
        ease: "linear"
      }
    },
    noAnimation: { opacity: 1 }
  };
  
  // Use shorter prompt on mobile
  const displayPrompt = isMobile ? 'user:~$' : prompt;
  
  // Build additional class names
  const classes = [
    'console-header',
    `console-header-${variant}`,
    className
  ].filter(Boolean).join(' ');
  
  // Calculate correct Card variant based on ConsoleHeader variant
  let cardVariant = 'terminal';
  if (variant === 'security') cardVariant = 'security';
  else if (variant === 'hacker') cardVariant = 'security'; // Using security as base for hacker
  
  // Build accessible label
  const ariaLabel = ariaDescription || 
    `Console with command: ${prompt} ${command}`;

  return (
    <motion.div 
      id={id}
      initial={animationEnabled ? "hidden" : "visible"}
      animate="visible"
      variants={consoleVariants}
    >
      <Card 
        className={classes}
        variant={cardVariant}
        shadow={shadow}
        aria-label={ariaLabel}
        data-testid="console-header"
        {...rest}
      >
      <div className="console-header-top">
        <TerminalControls variant="macos" />
        <span className="console-title">
          {variant === 'security' ? 'Alacritty' : 
           variant === 'hacker' ? 'H4CK3R-T3RM1N4L' : 
           'Command Prompt'}
        </span>
      </div>
      <div className="console-content">
        <span 
          className="console-prompt"
          aria-hidden="true" // Hide from screen readers as the full command is provided via aria-label
        >{displayPrompt}</span>
        <span 
          className="console-command"
          aria-hidden="true" // Hide from screen readers as the full command is provided via aria-label
        >{command}</span>
        {showCursor && (
          <motion.span 
            className="console-cursor" 
            aria-hidden="true"
            variants={cursorVariants}
            initial="visible"
            animate={animationEnabled && !shouldReduceMotion ? "visible" : "noAnimation"}
          ></motion.span>
        )}
      </div>
      {/* Hidden text for screen readers that represents the full command */}
      <span className="sr-only">
        {`${prompt} ${command}`}
      </span>
      </Card>
    </motion.div>
  );
};

ConsoleHeader.propTypes = {
  prompt: PropTypes.string,
  command: PropTypes.string,
  showCursor: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['terminal', 'security', 'hacker']),
  shadow: PropTypes.bool,
  id: PropTypes.string,
  ariaDescription: PropTypes.string
};

export default memo(ConsoleHeader);