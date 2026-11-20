import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { FaRedo, FaMap, FaSatellite, FaTh } from 'react-icons/fa';
import { useMotionEnabled } from '@utils/motion';
import './MapControls.css';

// Optimized animation variants
const controlsVariants: Variants = {
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

const buttonVariants: Variants = {
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

export interface MapControlsProps extends HTMLMotionProps<'div'> {
  /** Security variant theme */
  variant?: 'default' | 'secure' | 'breach' | 'critical';
  /** Current map mode */
  mapMode?: 'dark' | 'satellite';
  /** Whether the grid overlay is active */
  showGrid?: boolean;
  /** Called when the reset button is pressed */
  onResetView?: React.MouseEventHandler<HTMLButtonElement>;
  /** Called when the map mode button is pressed */
  onToggleMapMode?: React.MouseEventHandler<HTMLButtonElement>;
  /** Called when the grid button is pressed */
  onToggleGrid?: React.MouseEventHandler<HTMLButtonElement>;
  /** Whether the buttons react to hover and tap */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Map control buttons: reset view, toggle map mode, toggle grid overlay.
 *
 * @component
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
}: MapControlsProps) => {
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

export default MapControls;