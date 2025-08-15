import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import Card from '@atoms/Card';
import TerminalControls from '@atoms/TerminalControls/TerminalControls';
import './ConsoleHeader.css';

/**
 * ConsoleHeader atom component for rendering an interactive terminal-like console header
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.prompt='user@portfolio:~$'] - Command prompt text
 * @param {string} [props.command=''] - Command text (for display mode)
 * @param {string} [props.placeholder=''] - Placeholder text for input mode
 * @param {boolean} [props.interactive=false] - Whether to show interactive input
 * @param {function} [props.onCommand] - Callback when command is executed
 * @param {boolean} [props.showCursor=true] - Whether to show the blinking cursor
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.variant='terminal'] - Visual variant ('terminal', 'security')
 * @param {boolean} [props.shadow=true] - Whether to show a shadow
 * @param {string} [props.id] - Unique ID for ARIA relationships
 * @param {string} [props.ariaDescription] - Description for screen readers
 * @param {boolean} [props.showHint=true] - Whether to show the interactive hint
 * @param {string} [props.hintText='Type a command...'] - Custom hint text
 * @returns {React.ReactElement} ConsoleHeader component
 */
const ConsoleHeader = ({ 
  prompt = 'user@portfolio:~$',
  command = '',
  placeholder = '',
  interactive = false,
  onCommand,
  showCursor = true,
  className = '',
  variant = 'terminal',
  shadow = true,
  id,
  ariaDescription,
  showHint = true,
  hintText = 'Type a command...',
  ...rest
}) => {
  // State to track if on mobile
  const [isMobile, setIsMobile] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { animationEnabled, prefersReducedMotion } = useAnimation();
  const inputRef = useRef(null);
  
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
  
  // Animation variants - FIXED: Removed hover transform that causes disappearing
  const consoleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    },
    // REMOVED hover variant that was causing the disappearing issue
  };

  // Enhanced cursor variants with better blinking
  const cursorVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: [1, 0, 1],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: isFocused ? 0.6 : 1,
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
  
  // Use shorter prompt on mobile
  const displayPrompt = isMobile ? 'user:~$' : prompt;
  
  // Build additional class names
  const classes = [
    'console-header',
    `console-header-${variant}`,
    interactive ? 'console-header-interactive' : '',
    hasBeenFocused ? 'console-header-active' : '',
    isLoading ? 'console-header-loading' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Calculate correct Card variant based on ConsoleHeader variant
  let cardVariant = 'terminal';
  if (variant === 'security') cardVariant = 'security';
  else if (variant === 'hacker') cardVariant = 'security'; // Using security as base for hacker
  
  // Build accessible label
  const ariaLabel = ariaDescription || 
    `Console with command: ${prompt} ${interactive ? 'interactive input' : command}`;

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle key press with loading state
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setIsLoading(true);
      
      try {
        if (onCommand) {
          await onCommand(inputValue.trim());
        }
        setInputValue('');
      } catch (error) {
        console.error('Command execution error:', error);
      } finally {
        // Small delay to show loading state
        setTimeout(() => setIsLoading(false), 300);
      }
    }
  };

  // Handle focus/blur
  const handleFocus = () => {
    setIsFocused(true);
    setHasBeenFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
  };
  
  // Handle hover states - FIXED: Simplified hover handling
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Click handler to focus input
  const handleConsoleClick = () => {
    if (interactive && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <motion.div 
      id={id}
      initial={animationEnabled ? "hidden" : "visible"}
      animate="visible" // FIXED: Always animate to visible, no hover animation
      variants={consoleVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card 
        className={classes}
        variant={cardVariant}
        shadow={shadow}
        aria-label={ariaLabel}
        data-testid="console-header"
        data-hint={interactive && showHint ? hintText : undefined}
        onClick={handleConsoleClick}
        {...rest}
      >
      <div className="console-header-top">
        <TerminalControls variant="kitty" />
        <span className="console-title">
          {variant === 'security' ? 'Alacritty' : 
           variant === 'hacker' ? 'H4CK3R-T3RM1N4L' : 
           'kitty'}
        </span>
      </div>
      <div className="console-content">
        <span 
          className="console-prompt"
          aria-hidden="true"
        >{displayPrompt}</span>
        
        {interactive ? (
          <div className="console-input-container">
            {showCursor && (
              <motion.span 
                className="console-cursor console-cursor-input" 
                aria-hidden="true"
                variants={cursorVariants}
                initial="visible"
                animate={
                  animationEnabled && !prefersReducedMotion
                    ? (isFocused ? "focused" : "visible")
                    : "noAnimation"
                }
              ></motion.span>
            )}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              className="console-input"
              aria-label={`Terminal input. ${placeholder}`}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        ) : (
          <>
            <span 
              className="console-command"
              aria-hidden="true"
            >{command}</span>
            {showCursor && (
              <motion.span 
                className="console-cursor" 
                aria-hidden="true"
                variants={cursorVariants}
                initial="visible"
                animate={
                  animationEnabled && !prefersReducedMotion
                    ? "visible"
                    : "noAnimation"
                }
              ></motion.span>
            )}
          </>
        )}
      </div>
      {/* Hidden text for screen readers that represents the full command */}
      <span className="sr-only">
        {interactive ? 
          `${prompt} Interactive terminal input. ${placeholder}` :
          `${prompt} ${command}`
        }
      </span>
      </Card>
    </motion.div>
  );
};

ConsoleHeader.propTypes = {
  prompt: PropTypes.string,
  command: PropTypes.string,
  placeholder: PropTypes.string,
  interactive: PropTypes.bool,
  onCommand: PropTypes.func,
  showCursor: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['terminal', 'security', 'hacker']),
  shadow: PropTypes.bool,
  id: PropTypes.string,
  ariaDescription: PropTypes.string,
  showHint: PropTypes.bool,
  hintText: PropTypes.string
};

export default memo(ConsoleHeader);