import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './CyberpunkEffects.css';

const CyberpunkEffects = ({ 
  expanded = false,
  isHovered = false,
  variant = 'default',
  showGlow = true,
  showCorners = true,
  showScanLines = true,
  showDataStream = true,
  className = '',
  ...props
}) => {
  const { animationEnabled } = useAnimation();

  const effectsClasses = [
    'cyberpunk-effects',
    `cyberpunk-effects--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const glowVariants = {
    idle: {
      opacity: 0,
      transition: { duration: 0.3 }
    },
    active: {
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const scanLineVariants = {
    hidden: { y: '-100%', opacity: 0 },
    visible: {
      y: ['100%', '200%'],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const cornerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Optimized data stream with fewer particles for better performance
  const dataStreamVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    }
  };

  const particleVariants = {
    hidden: { y: '-10px', opacity: 0 },
    visible: {
      y: ['110%'],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className={effectsClasses} {...props}>
      {/* Dynamic glow effect */}
      {showGlow && (
        <motion.div
          className="cyberpunk-effects__glow"
          variants={glowVariants}
          animate={expanded || isHovered ? "active" : "idle"}
        />
      )}

      {/* Holographic scan lines */}
      {showScanLines && (
        <motion.div
          className="cyberpunk-effects__scan-lines"
          variants={scanLineVariants}
          animate={expanded && animationEnabled ? "visible" : "hidden"}
        />
      )}

      {/* Cyberpunk corner effects */}
      {showCorners && (
        <motion.div 
          className="cyberpunk-effects__corners"
          variants={cornerVariants}
          animate={expanded || isHovered ? "visible" : "hidden"}
        >
          <div className="cyberpunk-effects__corner cyberpunk-effects__corner--tl"></div>
          <div className="cyberpunk-effects__corner cyberpunk-effects__corner--tr"></div>
          <div className="cyberpunk-effects__corner cyberpunk-effects__corner--bl"></div>
          <div className="cyberpunk-effects__corner cyberpunk-effects__corner--br"></div>
        </motion.div>
      )}

      {/* Optimized data stream effect - reduced from 5 to 3 particles */}
      {showDataStream && (
        <AnimatePresence>
          {expanded && (
            <motion.div 
              className="cyberpunk-effects__data-stream"
              variants={dataStreamVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`cyberpunk-effects__data-particle cyberpunk-effects__data-particle--${i + 1}`}
                  variants={particleVariants}
                  transition={{
                    delay: i * 0.5,
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

CyberpunkEffects.propTypes = {
  expanded: PropTypes.bool,
  isHovered: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  showGlow: PropTypes.bool,
  showCorners: PropTypes.bool,
  showScanLines: PropTypes.bool,
  showDataStream: PropTypes.bool,
  className: PropTypes.string,
};

export default CyberpunkEffects;