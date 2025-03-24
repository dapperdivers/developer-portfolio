import React from 'react';
import PropTypes from 'prop-types';
import { FaTerminal } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './SecurityFact.css';

/**
 * SecurityFact component for displaying security-themed facts with terminal icon.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.text - Fact text content
 * @param {Object} [props.icon] - Custom icon component (defaults to FaTerminal)
 * @param {Object} [props.variants] - Framer motion animation variants
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} SecurityFact component
 */
const SecurityFact = ({ 
  text, 
  icon: Icon = FaTerminal, 
  variants,
  animate = true,
  className = ''
}) => {
  return (
    <motion.div 
      className={`security-fact ${className}`}
      variants={animate ? variants : undefined}
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
  /** Framer motion animation variants */
  variants: PropTypes.object,
  /** Whether to animate the component */
  animate: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default SecurityFact;