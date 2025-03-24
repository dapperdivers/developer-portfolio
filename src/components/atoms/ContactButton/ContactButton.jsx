import React from 'react';
import PropTypes from 'prop-types';
import { FaRocket } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './ContactButton.css';

/**
 * ContactButton component for email contact links with rocket icon.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.email - Email address
 * @param {string} [props.text='Contact Me'] - Button text
 * @param {Object} [props.icon] - Custom icon component (defaults to FaRocket)
 * @param {Object} [props.variants] - Framer motion animation variants
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} ContactButton component
 */
const ContactButton = ({ 
  email, 
  text = 'Contact Me', 
  icon: Icon = FaRocket, 
  variants,
  animate = true,
  className = ''
}) => {
  return (
    <motion.a 
      href={`mailto:${email}`}
      className={`contact-button ${className}`}
      variants={animate ? variants : undefined}
      whileHover={animate ? { scale: 1.05 } : undefined}
      whileTap={animate ? { scale: 0.95 } : undefined}
    >
      <span className="contact-button__text">{text}</span>
      <Icon className="contact-button__icon" />
    </motion.a>
  );
};

ContactButton.propTypes = {
  /** Email address */
  email: PropTypes.string.isRequired,
  /** Button text */
  text: PropTypes.string,
  /** Custom icon component */
  icon: PropTypes.elementType,
  /** Framer motion animation variants */
  variants: PropTypes.object,
  /** Whether to animate the component */
  animate: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string
};

export default ContactButton;