import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import MapComponent from '@molecules/MapComponent';
import { useAnimation } from '@context/AnimationContext';
import './ProfileLocation.css';

/**
 * ProfileLocation component for displaying a user's location with a map.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.location - Location string (e.g., "San Francisco, CA")
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @returns {React.ReactElement} ProfileLocation component
 */
const ProfileLocation = ({ location, animate = true }) => {
  const { animationEnabled, itemVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animate && animationEnabled;

  if (!location) {
    return null;
  }

  return (
    <motion.div 
      className="profile-location"
      variants={shouldAnimate ? itemVariants : undefined}
    >
      <MapComponent location={location} />
    </motion.div>
  );
};

ProfileLocation.propTypes = {
  /** Location string */
  location: PropTypes.string,
  /** Whether to animate the component */
  animate: PropTypes.bool
};

export default ProfileLocation;