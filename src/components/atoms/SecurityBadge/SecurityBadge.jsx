import React from 'react';
import PropTypes from 'prop-types';
import { FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './SecurityBadge.css';

/**
 * SecurityBadge component for displaying security-themed badge with icon and text.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.text - Badge text content
 * @param {Object} [props.icon] - Custom icon component (defaults to FaShieldAlt)
 * @param {Object} [props.variants] - Framer motion animation variants
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} SecurityBadge component
 */
const SecurityBadge = ({ 
  text, 
  icon: Icon = FaShieldAlt, 
  variants,
  animate = true,
  className = ''
}) => {
  return (
    <motion.div 
      className={`security-badge ${className}`}
      variants={animate ? variants : undefined}
    >
      <Icon className="security-badge__icon" />
      <span className="security-badge__text">{text}</span>
    </motion.div>
  );
};

SecurityBadge.propTypes = {
  /** Badge text content */
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

export default SecurityBadge;