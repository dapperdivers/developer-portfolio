import React, { memo } from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import './TerminalControls.css';

export interface TerminalControlsProps extends HTMLMotionProps<'div'> {
  /** Visual variant */
  variant?: 'macos' | 'windows' | 'linux' | 'kitty';
  /** Whether controls are clickable */
  interactive?: boolean;
  /** Callback for close button click */
  onCloseClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Callback for minimize button click */
  onMinimizeClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Callback for maximize button click */
  onMaximizeClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Additional CSS classes */
  className?: string;
  /** Play the hover and tap animations on interactive controls */
  animated?: boolean;
}

/**
 * TerminalControls atom component for rendering terminal window controls
 * Updated to use framer-motion for animations and support kitty terminal style
 * 
 * @component
 */
const TerminalControls = ({ 
  variant = 'kitty',
  interactive = false,
  onCloseClick,
  onMinimizeClick,
  onMaximizeClick,
  className = '',
  animated = true,
  ...rest
}: TerminalControlsProps) => {
  const motionOn = useMotionEnabled(animated);
  
  // Determine class names based on props
  const classes = [
    'terminal-controls',
    `terminal-controls-${variant}`,
    interactive ? 'terminal-controls-interactive' : '',
    className
  ].filter(Boolean).join(' ');

  // Handle interactivity
  const handleClose = interactive && onCloseClick ? onCloseClick : undefined;
  const handleMinimize = interactive && onMinimizeClick ? onMinimizeClick : undefined;
  const handleMaximize = interactive && onMaximizeClick ? onMaximizeClick : undefined;
  
  // Animation variants
  const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: interactive ? 1.15 : 1,
      transition: { duration: 0.2, ease: "easeOut" } 
    },
    tap: { 
      scale: interactive ? 0.9 : 1,
      transition: { duration: 0.1 } 
    }
  };
  
  const shouldAnimate = motionOn && interactive;

  return (
    <motion.div 
      className={classes}
      aria-hidden={!interactive}
      initial={{ opacity: 0.95 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      {...rest}
    >
      <motion.button 
        className="terminal-circle terminal-circle-close"
        onClick={handleClose}
        aria-label="Close window"
        tabIndex={interactive ? 0 : -1}
        disabled={!interactive}
        variants={buttonVariants}
        initial="initial"
        whileHover={shouldAnimate ? "hover" : "initial"}
        whileTap={shouldAnimate ? "tap" : "initial"}
      />
      <motion.button 
        className="terminal-circle terminal-circle-minimize"
        onClick={handleMinimize}
        aria-label="Minimize window"
        tabIndex={interactive ? 0 : -1}
        disabled={!interactive}
        variants={buttonVariants}
        initial="initial"
        whileHover={shouldAnimate ? "hover" : "initial"}
        whileTap={shouldAnimate ? "tap" : "initial"}
      />
      <motion.button 
        className="terminal-circle terminal-circle-maximize"
        onClick={handleMaximize}
        aria-label="Maximize window"
        tabIndex={interactive ? 0 : -1}
        disabled={!interactive}
        variants={buttonVariants}
        initial="initial"
        whileHover={shouldAnimate ? "hover" : "initial"}
        whileTap={shouldAnimate ? "tap" : "initial"}
      />
    </motion.div>
  );
};

export default memo(TerminalControls);