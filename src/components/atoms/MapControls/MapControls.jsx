import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaRedo, FaMap, FaSatellite, FaTh } from 'react-icons/fa';
import { useMotionEnabled } from '@utils/motion';
import './MapControls.css';

// Optimized animation variants
const controlsVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  },
  hover: { scale: 1.1 },
  tap: { scale: 0.95 }
};

/**
 * Map control buttons: reset view, toggle map mode, toggle grid overlay.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Security variant theme
 * @param {string} [props.mapMode='dark'] - Current map mode: dark or satellite
 * @param {boolean} [props.showGrid=false] - Whether the grid overlay is active
 * @param {Function} [props.onResetView] - Called when the reset button is pressed
 * @param {Function} [props.onToggleMapMode] - Called when the map mode button is pressed
 * @param {Function} [props.onToggleGrid] - Called when the grid button is pressed
 * @param {boolean} [props.animated=true] - Whether the buttons react to hover and tap
 * @param {string} [props.className=''] - Additional CSS classes
 * @returns {React.ReactElement} MapControls component
 */
const MapControls = ({
  variant = 'default',
  mapMode = 'dark',
  showGrid = false,
  onResetView,
  onToggleMapMode,
  onToggleGrid,
  animated = true,
  className = '',
  ...props
}) => {
  const isAnimationEnabled = useMotionEnabled(animated);

  const getMapModeIcon = () => {
    return mapMode === 'dark' ? FaSatellite : FaMap;
  };

  const MapModeIcon = getMapModeIcon();

  return (
    <motion.div
      className={`map-controls map-controls--${variant} ${className}`}
      variants={controlsVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      {...props}
    >
      <div className="map-controls__label">
        <span className="map-controls__status-dot" />
        {mapMode === 'dark' ? 'Standard View' : 'Satellite View'}
      </div>
      
      <div className="map-controls__actions">
        <motion.button 
          className="map-controls__button"
          variants={buttonVariants}
          whileHover={isAnimationEnabled ? "hover" : undefined}
          whileTap={isAnimationEnabled ? "tap" : undefined}
          onClick={onResetView}
          aria-label="Reset map view"
          title="Reset View"
        >
          <FaRedo className="map-controls__icon" />
        </motion.button>

        <motion.button 
          className={`map-controls__button ${mapMode === 'satellite' ? 'map-controls__button--active' : ''}`}
          variants={buttonVariants}
          whileHover={isAnimationEnabled ? "hover" : undefined}
          whileTap={isAnimationEnabled ? "tap" : undefined}
          onClick={onToggleMapMode}
          aria-label="Toggle map mode"
          title={mapMode === 'dark' ? 'Switch to Satellite' : 'Switch to Standard'}
        >
          <MapModeIcon className="map-controls__icon" />
        </motion.button>

        <motion.button 
          className={`map-controls__button ${showGrid ? 'map-controls__button--active' : ''}`}
          variants={buttonVariants}
          whileHover={isAnimationEnabled ? "hover" : undefined}
          whileTap={isAnimationEnabled ? "tap" : undefined}
          onClick={onToggleGrid}
          aria-label="Toggle grid overlay"
          title="Toggle Grid"
        >
          <FaTh className="map-controls__icon" />
        </motion.button>
      </div>
    </motion.div>
  );
};

MapControls.propTypes = {
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  mapMode: PropTypes.oneOf(['dark', 'satellite']),
  showGrid: PropTypes.bool,
  onResetView: PropTypes.func,
  onToggleMapMode: PropTypes.func,
  onToggleGrid: PropTypes.func,
  animated: PropTypes.bool,
  className: PropTypes.string,
};

export default MapControls;