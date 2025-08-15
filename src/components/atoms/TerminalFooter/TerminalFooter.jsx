import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './TerminalFooter.css';

const TerminalFooter = ({ 
  prompt = 'user@portfolio:~$',
  variant = 'default',
  expanded = false,
  className = '',
  ...props
}) => {
  const { animationEnabled } = useAnimation();

  const footerClasses = [
    'terminal-footer',
    `terminal-footer--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const cursorVariants = {
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
        animate={animationEnabled ? "visible" : "hidden"}
      >
        |
      </motion.span>
    </motion.div>
  );
};

TerminalFooter.propTypes = {
  prompt: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  expanded: PropTypes.bool,
  className: PropTypes.string,
};

export default TerminalFooter;