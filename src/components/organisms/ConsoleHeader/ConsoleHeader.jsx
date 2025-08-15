import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import Card from '@atoms/Card';
import TerminalTitleBar from '@molecules/TerminalTitleBar';
import TerminalCommandLine from '@molecules/TerminalCommandLine';
import './ConsoleHeader.css';

/**
 * ConsoleHeader organism component for rendering an interactive terminal-like console header
 * Now properly structured using atomic design principles with TerminalTitleBar and TerminalCommandLine
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
 * @param {string} [props.variant='terminal'] - Visual variant ('terminal', 'security', 'hacker')
 * @param {boolean} [props.shadow=true] - Whether to show a shadow
 * @param {string} [props.id] - Unique ID for ARIA relationships
 * @param {string} [props.ariaDescription] - Description for screen readers
 * @param {boolean} [props.showHint=true] - Whether to show the interactive hint
 * @param {string} [props.hintText='Type a command...'] - Custom hint text
 * @param {string} [props.title] - Custom title for the terminal window
 * @param {boolean} [props.interactiveControls=false] - Whether terminal controls are interactive
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onCloseClick] - Callback for close button
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onMinimizeClick] - Callback for minimize button
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onMaximizeClick] - Callback for maximize button
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
  title,
  interactiveControls = false,
  onCloseClick,
  onMinimizeClick,
  onMaximizeClick,
  ...rest
}) => {
  // State management
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { animationEnabled, prefersReducedMotion } = useAnimation();
  
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
    }
  };

  // Build additional class names
  const classes = [
    'console-header',
    `console-header--${variant}`,
    interactive ? 'console-header--interactive' : '',
    hasBeenFocused ? 'console-header--active' : '',
    isLoading ? 'console-header--loading' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Calculate correct Card variant based on ConsoleHeader variant
  let cardVariant = 'terminal';
  if (variant === 'security') cardVariant = 'security';
  else if (variant === 'hacker') cardVariant = 'security'; // Using security as base for hacker
  
  // Build accessible label
  const ariaLabel = ariaDescription || 
    `Console with command: ${prompt} ${interactive ? 'interactive input' : command}`;

  // Enhanced command handler with loading state
  const handleCommand = async (commandText) => {
    setIsLoading(true);
    setHasBeenFocused(true);
    
    try {
      if (onCommand) {
        await onCommand(commandText);
      }
    } catch (error) {
      console.error('Command execution error:', error);
    } finally {
      // Small delay to show loading state
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  return (
    <motion.div 
      id={id}
      initial={animationEnabled ? "hidden" : "visible"}
      animate="visible"
      variants={consoleVariants}
      style={{ width: '100%' }}
    >
      <Card 
        className={classes}
        variant={cardVariant}
        shadow={shadow}
        aria-label={ariaLabel}
        data-testid="console-header"
        data-hint={interactive && showHint ? hintText : undefined}
        {...rest}
      >
        <TerminalTitleBar
          title={title}
          variant={variant}
          interactive={interactiveControls}
          onCloseClick={onCloseClick}
          onMinimizeClick={onMinimizeClick}
          onMaximizeClick={onMaximizeClick}
        />
        
        <TerminalCommandLine
          prompt={prompt}
          command={command}
          placeholder={placeholder}
          interactive={interactive}
          onCommand={handleCommand}
          showCursor={showCursor}
          variant={variant}
          isLoading={isLoading}
        />
        
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
  hintText: PropTypes.string,
  title: PropTypes.string,
  interactiveControls: PropTypes.bool,
  onCloseClick: PropTypes.func,
  onMinimizeClick: PropTypes.func,
  onMaximizeClick: PropTypes.func
};

export default memo(ConsoleHeader);