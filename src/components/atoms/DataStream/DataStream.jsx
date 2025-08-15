import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import { usePortfolio } from '@context/PortfolioContext';
import './DataStream.css';

// Optimized animation variants
const streamVariants = {
  hidden: { 
    width: 0,
    opacity: 0 
  },
  visible: (custom) => ({
    width: "100%",
    opacity: [0, 0.8, 0.3, 0],
    transition: {
      delay: custom.delay || 0,
      duration: custom.duration || 2.5,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear"
    }
  })
};

const DataStream = ({ 
  variant = 'default',
  delay = 0,
  duration = 2.5,
  intensity = 'medium',
  className = '',
  ...props 
}) => {
  const { isAnimationEnabled } = useAnimation();

  const getStreamColor = () => {
    switch (variant) {
      case 'secure': return 'var(--color-level-low)';
      case 'breach': return 'var(--color-level-medium)';
      case 'critical': return 'var(--color-level-critical)';
      default: return 'var(--color-cyan)';
    }
  };

  const getIntensityClass = () => {
    switch (intensity) {
      case 'low': return 'data-stream--low';
      case 'high': return 'data-stream--high';
      default: return 'data-stream--medium';
    }
  };

  return (
    <div className={`data-stream-container ${className}`} {...props}>
      <motion.div
        className={`data-stream data-stream--${variant} ${getIntensityClass()}`}
        variants={streamVariants}
        initial="hidden"
        animate={isAnimationEnabled ? "visible" : "hidden"}
        custom={{ delay, duration }}
        style={{
          '--stream-color': getStreamColor()
        }}
      />
      
      {/* Secondary stream for enhanced effect */}
      <motion.div
        className={`data-stream data-stream--secondary data-stream--${variant} ${getIntensityClass()}`}
        variants={streamVariants}
        initial="hidden"
        animate={isAnimationEnabled ? "visible" : "hidden"}
        custom={{ delay: delay + 0.1, duration: duration * 1.2 }}
        style={{
          '--stream-color': getStreamColor()
        }}
      />
      
      {/* Tertiary stream for complex effect */}
      {intensity === 'high' && (
        <motion.div
          className={`data-stream data-stream--tertiary data-stream--${variant} ${getIntensityClass()}`}
          variants={streamVariants}
          initial="hidden"
          animate={isAnimationEnabled ? "visible" : "hidden"}
          custom={{ delay: delay + 0.2, duration: duration * 0.8 }}
          style={{
            '--stream-color': getStreamColor()
          }}
        />
      )}
    </div>
  );
};

DataStream.propTypes = {
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  delay: PropTypes.number,
  duration: PropTypes.number,
  intensity: PropTypes.oneOf(['low', 'medium', 'high']),
  className: PropTypes.string,
};

export default DataStream;