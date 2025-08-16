import React from 'react';
import PropTypes from 'prop-types';
import { FaTerminal } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './SecurityFact.css';

/**
 * SecurityFact component for displaying security-themed facts with terminal icon.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.text - Fact text content
 * @param {Object} [props.icon] - Custom icon component (defaults to FaTerminal)
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} SecurityFact component
 */
const SecurityFact = ({ 
  text, 
  icon: Icon = FaTerminal, 
  animate = true,
  className = ''
}) => {
  const { animationEnabled, slideUpVariants } = useAnimation();
  
  // Use animation only if both component prop and context allow it
  const shouldAnimate = animate && animationEnabled;

  return (
    <motion.div 
      className={`security-fact ${className}`}
      variants={shouldAnimate ? slideUpVariants : undefined}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={shouldAnimate ? "visible" : "visible"}
      viewport={{ once: true }}
    >
      <Icon className="security-fact__icon" />
      <p className="security-fact__text">{text}</p>
    </motion.div>
  );
};

SecurityFact.propTypes = {
  /** Fact text content */
  text: PropTypes.string.isRequired,
  /** Custom icon component */
  icon: PropTypes.elementType,
  /** Whether to animate the component */
  animate: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default SecurityFact;