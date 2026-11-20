import React, { memo } from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import './TerminalCursor.css';

export interface TerminalCursorProps extends HTMLMotionProps<'span'> {
  /** Whether to show the cursor */
  show?: boolean;
  /** Whether the cursor is in focused state */
  focused?: boolean;
  /** Visual variant */
  variant?: 'default' | 'security' | 'terminal' | 'kitty';
  /** Additional CSS classes */
  className?: string;
  /** Whether the cursor blinks */
  animated?: boolean;
}

/**
 * TerminalCursor atom component for rendering a blinking terminal cursor
 * 
 * @component
 */
const TerminalCursor = ({ 
  show = true,
  focused = false,
  variant = 'default',
  className = '',
  animated = true,
  ...rest
}: TerminalCursorProps) => {
  const motionOn = useMotionEnabled(animated);
  
  // Enhanced cursor variants with better blinking
  const cursorVariants: Variants = {
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
        motionOn
          ? (focused ? "focused" : "visible")
          : "noAnimation"
      }
      {...rest}
    />
  );
};

export default memo(TerminalCursor);