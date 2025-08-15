import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import MapComponent from '@molecules/MapComponent';
import { useAnimation } from '@context/AnimationContext';
import './ProfileLocation.css';

// Terminal animation variants
const terminalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

/**
 * ProfileLocation component - Terminal-style mapping interface wrapper
 * 
 * This component acts as a container/wrapper around MapComponent,
 * providing additional terminal UI elements and cybersecurity theming
 * while keeping MapComponent as the core mapping functionality.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.location - Location string (e.g., "Warrior, AL")
 * @param {string} [props.variant='default'] - Security variant theme
 * @param {boolean} [props.animate=true] - Whether to animate the component
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement} ProfileLocation component
 */
const ProfileLocation = ({ 
  location = "Warrior, AL", 
  variant = 'default',
  animate = true,
  className = '',
  ...props
}) => {
  const { isAnimationEnabled } = useAnimation();
  const [isLive, setIsLive] = useState(true);
  
  // Only use animations if enabled
  const shouldAnimate = animate && isAnimationEnabled;

  const handleRefresh = () => setIsLive(prev => !prev);

  if (!location) {
    return null;
  }

  return (
    <motion.div 
      className={`profile-location profile-location--${variant} ${className}`}
      variants={shouldAnimate ? terminalVariants : undefined}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      {...props}
    >
      {/* Additional Terminal Status Bar */}
      <div className="profile-location__system-status">
        <div className="status-left">
          <span className="system-label">SECURITY SYSTEM:</span>
          <span className={`system-status system-status--${variant}`}>
            {variant === 'secure' ? 'SECURED' : 
             variant === 'breach' ? 'BREACH DETECTED' : 
             variant === 'critical' ? 'CRITICAL ALERT' : 'ACTIVE'}
          </span>
          <span className="separator">|</span>
          <span>Location: {location}</span>
        </div>
        <div className="status-right">
          <span className={`live-indicator ${isLive ? 'active' : ''}`}>
            [{isLive ? 'LIVE' : 'OFF'}]
          </span>
          <button 
            className="control-button refresh-btn" 
            onClick={handleRefresh}
            aria-label="Toggle live status"
          >
            [REFRESH]
          </button>
        </div>
      </div>

      {/* Map Component Integration */}
      <div className="profile-location__map-wrapper">
        <MapComponent location={location} />
      </div>

    </motion.div>
  );
};

ProfileLocation.propTypes = {
  /** Location string */
  location: PropTypes.string,
  /** Security variant theme */
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  /** Whether to animate the component */
  animate: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
};

export default ProfileLocation;