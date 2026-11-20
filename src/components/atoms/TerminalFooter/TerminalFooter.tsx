import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import './TerminalFooter.css';

export interface TerminalFooterProps extends HTMLMotionProps<'div'> {
  /** Prompt text to display */
  prompt?: string;
  /** Security variant theme */
  variant?: 'default' | 'secure' | 'breach' | 'critical';
  /** Renders nothing unless true */
  expanded?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Whether the cursor blinks */
  animated?: boolean;
}

const TerminalFooter = ({ 
  prompt = 'user@portfolio:~$',
  variant = 'default',
  expanded = false,
  className = '',
  animated = true,
  ...props
}: TerminalFooterProps) => {
  const motionOn = useMotionEnabled(animated);

  const footerClasses = [
    'terminal-footer',
    `terminal-footer--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const cursorVariants: Variants = {
    visible: {
      opacity: [1, 0, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    },
    hidden: { opacity: 1 }
  };

  if (!expanded) return null;

  return (
    <motion.div 
      className={footerClasses}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      {...props}
    >
      <span className="terminal-footer__prompt">{prompt}</span>
      <motion.span 
        className="terminal-footer__cursor"
        variants={cursorVariants}
        animate={motionOn ? "visible" : "hidden"}
      >
        |
      </motion.span>
    </motion.div>
  );
};

export default TerminalFooter;