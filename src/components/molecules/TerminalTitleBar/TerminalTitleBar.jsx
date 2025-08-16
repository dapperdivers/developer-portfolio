import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import TerminalControls from '@atoms/TerminalControls';
import './TerminalTitleBar.css';

/**
 * TerminalTitleBar molecule component for rendering terminal window title bars
 * Combines TerminalControls with a title display
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title='kitty'] - Title text to display
 * @param {string} [props.variant='kitty'] - Visual variant ('kitty', 'security', 'hacker')
 * @param {boolean} [props.interactive=false] - Whether controls are interactive
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onCloseClick] - Callback for close button
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onMinimizeClick] - Callback for minimize button
 * @param {React.MouseEventHandler<HTMLButtonElement>} [props.onMaximizeClick] - Callback for maximize button
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement} TerminalTitleBar component
 */
const TerminalTitleBar = ({ 
  title,
  variant = 'kitty',
  interactive = false,
  onCloseClick,
  onMinimizeClick,
  onMaximizeClick,
  className = '',
  ...rest
}) => {
  const { animationEnabled, prefersReducedMotion } = useAnimation();
  const [glitchActive, setGlitchActive] = useState(false);
  const [titleText, setTitleText] = useState('');
  // Determine title based on variant
  const baseTitle = title || (
    variant === 'security' ? 'SEC-TERMINAL-7.4.1' : 
    variant === 'hacker' ? 'H4CK3R-T3RM1N4L-v3.14' : 
    variant === 'terminal' ? 'CYBER-CONSOLE-2.0' :
    'kitty'
  );
  
  // Matrix-style typing effect for hacker variant
  useEffect(() => {
    if (variant === 'hacker' && animationEnabled && !prefersReducedMotion) {
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
  }, [baseTitle, variant, animationEnabled, prefersReducedMotion]);
  
  // Glitch effect for hacker variant
  useEffect(() => {
    if (variant === 'hacker' && animationEnabled && !prefersReducedMotion) {
      const glitchInterval = setInterval(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }, 3000 + Math.random() * 2000);
      
      return () => clearInterval(glitchInterval);
    }
  }, [variant, animationEnabled, prefersReducedMotion]);
  
  const displayTitle = titleText || baseTitle;
  
  // Build class names
  const classes = [
    'terminal-title-bar',
    `terminal-title-bar--${variant}`,
    glitchActive ? 'terminal-title-bar--glitch' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Animation variants
  const titleBarVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };
  
  const titleVariants = {
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
      initial={animationEnabled && !prefersReducedMotion ? "initial" : "animate"}
      animate="animate"
      {...rest}
    >
      {/* Animated background effects */}
      {variant === 'security' && (
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
        variant={variant}
        interactive={interactive}
        onCloseClick={onCloseClick}
        onMinimizeClick={onMinimizeClick}
        onMaximizeClick={onMaximizeClick}
      />
      
      <motion.span 
        className="terminal-title-bar__title"
        variants={titleVariants}
        initial={animationEnabled && !prefersReducedMotion ? "initial" : "animate"}
        animate={glitchActive ? "glitch" : "animate"}
      >
        {displayTitle}
        {variant === 'hacker' && (
          <motion.span 
            className="terminal-title-bar__cursor"
            animate={{ opacity: [1, 0] }}
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
            animate={{ 
              boxShadow: [
                "0 0 5px rgba(0, 255, 0, 0.3)",
                "0 0 15px rgba(0, 255, 0, 0.6)",
                "0 0 5px rgba(0, 255, 0, 0.3)"
              ]
            }}
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
            animate={{ 
              boxShadow: [
                "0 0 5px rgba(255, 0, 0, 0.5)",
                "0 0 20px rgba(255, 0, 0, 0.8)",
                "0 0 5px rgba(255, 0, 0, 0.5)"
              ]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="status-text">BREACH MODE</span>
        </motion.div>
      )}
    </motion.div>
  );
};

TerminalTitleBar.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.oneOf(['kitty', 'security', 'hacker', 'terminal']),
  interactive: PropTypes.bool,
  onCloseClick: PropTypes.func,
  onMinimizeClick: PropTypes.func,
  onMaximizeClick: PropTypes.func,
  className: PropTypes.string,
};

export default memo(TerminalTitleBar);