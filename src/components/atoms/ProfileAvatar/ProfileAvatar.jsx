import React from 'react';
import PropTypes from 'prop-types';
import { FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './ProfileAvatar.css';

/**
 * ProfileAvatar component for displaying user profile image with security clearance overlay.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {string} [props.clearanceText] - Security clearance text
 * @param {Object} [props.variants] - Framer motion animation variants
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @returns {React.ReactElement} ProfileAvatar component
 */
const ProfileAvatar = ({ 
  src, 
  alt, 
  clearanceText = "Security Clearance: Top Level", 
  variants,
  animate = true
}) => {
  return (
    <motion.div 
      className="profile-avatar__container"
      variants={animate ? variants : undefined}
    >
      <img 
        src={src} 
        alt={alt}
        className="profile-avatar__image"
        loading="lazy"
      />
      <div className="profile-avatar__clearance">
        <FaLock className="profile-avatar__lock-icon" />
        <span>{clearanceText}</span>
      </div>
    </motion.div>
  );
};

ProfileAvatar.propTypes = {
  /** Image source URL */
  src: PropTypes.string.isRequired,
  /** Image alt text */
  alt: PropTypes.string.isRequired,
  /** Security clearance text */
  clearanceText: PropTypes.string,
  /** Framer motion animation variants */
  variants: PropTypes.object,
  /** Whether to animate the component */
  animate: PropTypes.bool
};

export default ProfileAvatar;