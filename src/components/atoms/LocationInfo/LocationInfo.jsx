import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaShieldAlt, FaEye } from 'react-icons/fa';
import { useAnimation } from '@context/AnimationContext';
import { usePortfolio } from '@context/PortfolioContext';
import DataStream from '@atoms/DataStream';
import './LocationInfo.css';

// Optimized animation variants
const panelVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

const LocationInfo = ({ 
  variant = 'default',
  locationData,
  mapMode = 'dark',
  className = '',
  ...props 
}) => {
  const { isAnimationEnabled } = useAnimation();

  if (!locationData) {
    return null;
  }

  // Format coordinates for display
  const formatCoordinates = (lat, lng) => {
    if (!lat || !lng) return "Coordinates unavailable";
    return `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;
  };

  const getSecurityLevel = () => {
    switch (variant) {
      case 'secure': return 'Level 5';
      case 'breach': return 'Level 2';
      case 'critical': return 'Level 1';
      default: return 'Level 3';
    }
  };

  const getSecurityStatus = () => {
    switch (variant) {
      case 'secure': return 'Secure';
      case 'breach': return 'Compromised';
      case 'critical': return 'Critical';
      default: return 'Active';
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className={`location-info location-info--${variant} ${className}`}
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        viewport={{ once: true }}
        {...props}
      >
        <motion.div className="location-info__header" variants={itemVariants}>
          <div className="location-info__title">
            <FaMapMarkerAlt className="location-info__icon" />
            <span className="location-info__name">{locationData.name}</span>
          </div>
          <div className="location-info__badge">
            <motion.span 
              className="location-info__status-dot"
              animate={{ 
                opacity: isAnimationEnabled ? [0.4, 1, 0.4] : 0.7
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <span className="location-info__status-text">Live</span>
          </div>
        </motion.div>

        <motion.div className="location-info__coordinates" variants={itemVariants}>
          {formatCoordinates(locationData.lat, locationData.lng)}
        </motion.div>

        <motion.div className="location-info__metrics" variants={itemVariants}>
          <div className="location-info__metric">
            <span className="location-info__metric-label">Status</span>
            <span className={`location-info__metric-value location-info__metric-value--${variant}`}>
              {getSecurityStatus()}
            </span>
          </div>
          
          <div className="location-info__metric">
            <span className="location-info__metric-label">Security</span>
            <span className="location-info__metric-value">
              <FaShieldAlt className="location-info__metric-icon" />
              {getSecurityLevel()}
            </span>
          </div>
          
          <div className="location-info__metric">
            <span className="location-info__metric-label">View Mode</span>
            <span className="location-info__metric-value">
              <FaEye className="location-info__metric-icon" />
              {mapMode === 'dark' ? 'Standard' : 'Satellite'}
            </span>
          </div>
        </motion.div>

        <motion.div className="location-info__data-streams" variants={itemVariants}>
          <DataStream variant={variant} delay={0} />
          <DataStream variant={variant} delay={0.3} />
          <DataStream variant={variant} delay={0.6} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

LocationInfo.propTypes = {
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  locationData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  mapMode: PropTypes.oneOf(['dark', 'satellite']),
  className: PropTypes.string,
};

export default LocationInfo;