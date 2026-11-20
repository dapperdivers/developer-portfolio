import React, { memo, useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import Card from '@atoms/Card';
import type { CardProps } from '@atoms/Card/Card';
import TerminalTitleBar from '@molecules/TerminalTitleBar';
import TerminalCommandLine from '@molecules/TerminalCommandLine';
import './ConsoleHeader.css';

export type ConsoleHeaderVariant = 'kitty' | 'terminal' | 'security' | 'hacker';

// Remaining props are passed to the Card that wraps the console
export interface ConsoleHeaderProps
  extends Omit<CardProps, 'children' | 'title' | 'variant' | 'id'> {
  /** Command prompt text */
  prompt?: string;
  /** Command text (for display mode) */
  command?: string;
  /** Placeholder text for input mode */
  placeholder?: string;
  /** Shorter placeholder used at 480px and narrower */
  compactPlaceholder?: string;
  /** Whether to show interactive input */
  interactive?: boolean;
  /** Callback when command is executed */
  onCommand?: (command: string) => void | Promise<void>;
  /** Whether to show the blinking cursor */
  showCursor?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Visual variant */
  variant?: ConsoleHeaderVariant;
  /** Whether to show a shadow */
  shadow?: boolean;
  /** Unique ID for ARIA relationships */
  id?: string;
  /** Description for screen readers */
  ariaDescription?: string;
  /** Whether to show the interactive hint */
  showHint?: boolean;
  /** Custom hint text */
  hintText?: string;
  /** Custom title for the terminal window */
  title?: string;
  /** Whether terminal controls are interactive */
  interactiveControls?: boolean;
  /** Callback for close button */
  onCloseClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Callback for minimize button */
  onMinimizeClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Callback for maximize button */
  onMaximizeClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * ConsoleHeader organism component for rendering an interactive terminal-like console header
 * Now properly structured using atomic design principles with TerminalTitleBar and TerminalCommandLine
 *
 * @component
 * @returns {React.ReactElement} ConsoleHeader component
 */
const ConsoleHeader = ({ 
  prompt = 'user@portfolio:~$',
  command = '',
  placeholder = '',
  compactPlaceholder = '',
  interactive = false,
  onCommand,
  showCursor = true,
  className = '',
  variant = 'kitty',
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
}: ConsoleHeaderProps) => {
  // State management
  const [hasBeenFocused, setHasBeenFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { animationEnabled, prefersReducedMotion } = useAnimation();
  
  // Animation variants - FIXED: Removed hover transform that causes disappearing
  const consoleVariants: Variants = {
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
  let cardVariant: CardProps['variant'] = 'terminal';
  if (variant === 'security') cardVariant = 'security';
  else if (variant === 'hacker') cardVariant = 'security'; // Using security as base for hacker
  
  // Build accessible label
  const ariaLabel = ariaDescription || 
    `Console with command: ${prompt} ${interactive ? 'interactive input' : command}`;

  // Enhanced command handler with loading state
  const handleCommand = async (commandText: string) => {
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
          animated={animationEnabled}
        />
        
        <TerminalCommandLine
          prompt={prompt}
          command={command}
          placeholder={placeholder}
          compactPlaceholder={compactPlaceholder}
          interactive={interactive}
          onCommand={handleCommand}
          showCursor={showCursor}
          // The command line has no hacker styling of its own; it uses the security look
          variant={variant === 'hacker' ? 'security' : variant}
          isLoading={isLoading}
          animated={animationEnabled}
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

export default memo(ConsoleHeader);