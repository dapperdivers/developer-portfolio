import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Button from '@atoms/Button';
import { fadeInVariants, useMotionEnabled } from '@utils/motion';
import './ProfileError.css';

export interface ProfileErrorProps {
  /** Error message to display */
  message?: string;
  /** Callback function for retry button */
  onRetry?: () => void;
  /** Whether to animate the component */
  animate?: boolean;
}

/**
 * ProfileError component for displaying error states with retry functionality.
 * 
 * @component
 */
const ProfileError = ({ 
  message = "Unable to load GitHub profile data. Please try again later.", 
  onRetry,
  animate = true
}: ProfileErrorProps) => {
  const shouldAnimate = useMotionEnabled(animate);

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

export default ProfileError;