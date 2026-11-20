import React, { memo, useState, useEffect } from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import TerminalControls from '@atoms/TerminalControls';
import './TerminalTitleBar.css';

export type TerminalTitleBarVariant = 'kitty' | 'security' | 'hacker' | 'terminal';

export interface TerminalTitleBarProps extends HTMLMotionProps<'div'> {
  /** Title text to display; defaults to a title that suits the variant */
  title?: string;
  /** Visual variant */
  variant?: TerminalTitleBarVariant;
  /** Whether controls are interactive */
  interactive?: boolean;
  /** Callback for close button */
  onCloseClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Callback for minimize button */
  onMinimizeClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Callback for maximize button */
  onMaximizeClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Additional CSS classes */
  className?: string;
  /** Play the entrance, typing and glitch animations */
  animated?: boolean;
}

/**
 * TerminalTitleBar molecule component for rendering terminal window title bars
 * Combines TerminalControls with a title display
 * 
 * @component
 */
const TerminalTitleBar = ({ 
  title,
  variant = 'kitty',
  interactive = false,
  onCloseClick,
  onMinimizeClick,
  onMaximizeClick,
  className = '',
  animated = true,
  ...rest
}: TerminalTitleBarProps) => {
  const motionOn = useMotionEnabled(animated);
  const [glitchActive, setGlitchActive] = useState(false);
  const [titleText, setTitleText] = useState('');
  // Determine title based on variant
  const baseTitle = title || (
    variant === 'security' ? 'SEC-TERMINAL-7.4.1' : 
    variant === 'hacker' ? 'H4CK3R-T3RM1N4L-v3.14' : 
    variant === 'terminal' ? 'kitty' :
    'kitty'
  );
  
  // Matrix-style typing effect for hacker variant
  useEffect(() => {
    if (variant === 'hacker' && motionOn) {
      let currentIndex = 0;
      const typeText = () => {
        if (currentIndex <= baseTitle.length) {
          setTitleText(baseTitle.slice(0, currentIndex));
          currentIndex++;
          setTimeout(typeText, 100 + Math.random() * 50);
        }
      };
      typeText();
    } else {
      setTitleText(baseTitle);
    }
  }, [baseTitle, variant, motionOn]);
  
  // Glitch effect for hacker variant
  useEffect(() => {
    if (variant === 'hacker' && motionOn) {
      const glitchInterval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }, 3000 + Math.random() * 2000);
      
      return () => clearInterval(glitchInterval);
    }
  }, [variant, motionOn]);
  
  const displayTitle = titleText || baseTitle;
  
  // Build class names
  const classes = [
    'terminal-title-bar',
    `terminal-title-bar--${variant}`,
    glitchActive ? 'terminal-title-bar--glitch' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Animation variants
  const titleBarVariants: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };
  
  const titleVariants: Variants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.6, delay: 0.2 }
    },
    glitch: {
      x: [0, -2, 2, 0],
      opacity: [1, 0.8, 1],
      transition: { duration: 0.15, repeat: 1 }
    }
  };

  return (
    <motion.div 
      className={classes} 
      variants={titleBarVariants}
      initial={motionOn ? "initial" : "animate"}
      animate="animate"
      {...rest}
    >
      {/* Animated background effects */}
      {variant === 'security' && motionOn && (
        <motion.div 
          className="terminal-title-bar__security-scan"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatDelay: 2,
            ease: "linear"
          }}
        />
      )}
      
      {variant === 'hacker' && (
        <>
          <div className="terminal-title-bar__matrix-bg" />
          <motion.div 
            className="terminal-title-bar__glitch-overlay"
            animate={glitchActive ? {
              opacity: [0, 0.3, 0],
              x: [0, -2, 2, -1, 1, 0]
            } : { opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        </>
      )}
      
      <TerminalControls 
        // The atom types only its own variants; the others just set a class name
        variant={variant as React.ComponentProps<typeof TerminalControls>['variant']}
        interactive={interactive}
        onCloseClick={onCloseClick}
        onMinimizeClick={onMinimizeClick}
        onMaximizeClick={onMaximizeClick}
        animated={animated}
      />
      
      <motion.span 
        className="terminal-title-bar__title"
        variants={titleVariants}
        initial={motionOn ? "initial" : "animate"}
        animate={glitchActive ? "glitch" : "animate"}
      >
        {displayTitle}
        {variant === 'hacker' && (
          <motion.span 
            className="terminal-title-bar__cursor"
            animate={motionOn ? { opacity: [1, 0] } : undefined}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          >
            █
          </motion.span>
        )}
      </motion.span>
      
      {/* Status indicators */}
      {variant === 'security' && (
        <motion.div 
          className="terminal-title-bar__status"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
        >
          <motion.span 
            className="status-indicator status-indicator--secure"
            animate={motionOn ? { 
              boxShadow: [
                "0 0 0px rgba(52, 199, 89, 0.3)",
                "0 0 8px rgba(52, 199, 89, 0.6)",
                "0 0 0px rgba(52, 199, 89, 0.3)"
              ]
            } : undefined}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="status-text">SECURE</span>
        </motion.div>
      )}
      
      {variant === 'hacker' && (
        <motion.div 
          className="terminal-title-bar__status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.span 
            className="status-indicator status-indicator--breach"
            animate={motionOn ? { 
              boxShadow: [
                "0 0 0px rgba(255, 45, 85, 0.4)",
                "0 0 8px rgba(255, 45, 85, 0.8)",
                "0 0 0px rgba(255, 45, 85, 0.4)"
              ]
            } : undefined}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="status-text">BREACH MODE</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default memo(TerminalTitleBar);