import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import SecurityBadge from '@atoms/SecurityBadge';
import { useAnimation } from '@context/AnimationContext';
import './ProfileHeader.css';

/**
 * ProfileHeader component for displaying a security-themed header with badge and title.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - Header title
 * @param {string} props.subtitle - Subtitle for the security badge
 * @param {string} [props.highlightText='Security'] - Text to highlight in the title
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @returns {React.ReactElement} ProfileHeader component
 */
const ProfileHeader = ({ 
  title, 
  subtitle, 
  highlightText = 'Security',
  animate = true
}) => {
  const { animationEnabled, itemVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animate && animationEnabled;

  return (
    <div className="profile-header">
      <motion.div 
        className="profile-header__badge-container"
        variants={shouldAnimate ? itemVariants : undefined}
      >
        <SecurityBadge 
          text={subtitle} 
          animate={shouldAnimate}
        />
      </motion.div>
      
      <motion.h2 
        className="profile-header__title"
        variants={shouldAnimate ? itemVariants : undefined}
      >
        <span className="profile-header__highlight">{highlightText}</span> {title}
      </motion.h2>
    </div>
  );
};

ProfileHeader.propTypes = {
  /** Header title */
  title: PropTypes.string.isRequired,
  /** Subtitle for the security badge */
  subtitle: PropTypes.string.isRequired,
  /** Text to highlight in the title */
  highlightText: PropTypes.string,
  /** Whether to animate the component */
  animate: PropTypes.bool
};

export default ProfileHeader;