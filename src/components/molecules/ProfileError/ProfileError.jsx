import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Button from '@atoms/Button';
import { useAnimation } from '@context/AnimationContext';
import './ProfileError.css';

/**
 * ProfileError component for displaying error states with retry functionality.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {Function} [props.onRetry] - Callback function for retry button
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @returns {React.ReactElement} ProfileError component
 */
const ProfileError = ({ 
  message = "Unable to load GitHub profile data. Please try again later.", 
  onRetry,
  animate = true
}) => {
  const { animationEnabled, fadeInVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animate && animationEnabled;

  return (
    <motion.div 
      className="profile-error"
      variants={shouldAnimate ? fadeInVariants : undefined}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
    >
      <div className="profile-error__icon-container">
        <FaMapMarkerAlt className="profile-error__icon" />
      </div>
      
      <h3 className="profile-error__title">GitHub Profile Unavailable</h3>
      
      <p className="profile-error__message">
        {message}
      </p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="primary"
          className="profile-error__button"
        >
          Retry
        </Button>
      )}
    </motion.div>
  );
};

ProfileError.propTypes = {
  /** Error message to display */
  message: PropTypes.string,
  /** Callback function for retry button */
  onRetry: PropTypes.func,
  /** Whether to animate the component */
  animate: PropTypes.bool
};

export default ProfileError;