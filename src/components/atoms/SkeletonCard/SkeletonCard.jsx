import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './SkeletonCard.css';


/**
 * SkeletonCard component for use as loading placeholders
 * Updated with security-themed variants and framer-motion animations.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.type='project'] - Type of skeleton ('project', 'experience', 'skill')
 * @param {string} [props.variant=''] - Visual variant ('', 'security', 'terminal')
 * @param {number} [props.index=0] - Index for staggered animations
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @returns {React.ReactElement} SkeletonCard component
 */
const SkeletonCard = ({ 
  type = 'project', 
  variant = '', 
  index = 0, 
  className = '', 
  style = {} 
}) => {
  const { animationEnabled, shouldReduceMotion, animationStaggerDelay } = useAnimation();
  const baseClass = `${type}-card-skeleton`;
  const combinedClassName = [
    baseClass,
    variant, // Will add 'security' or 'terminal' class if provided
    className
  ].filter(Boolean).join(' ');
  
  // Calculate animation delay based on index (staggered effect)
  const staggerDelay = index * (animationStaggerDelay || 0.15);
  
  // Define animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: staggerDelay
      }
    }
  };
  
  // Shimmer effect animation variants
  const shimmerVariants = {
    initial: {
      backgroundPosition: "200% 0"
    },
    animate: {
      backgroundPosition: "-200% 0",
      transition: {
        repeat: Infinity,
        duration: variant === 'terminal' ? 3 : variant === 'security' ? 2 : 1.5,
        ease: "linear",
        repeatType: "loop"
      }
    },
    disabled: {
      backgroundPosition: "200% 0" // Static position when animations are disabled
    }
  };
  
  // Animation properties based on context
  const shouldAnimate = animationEnabled && !shouldReduceMotion;
  
  // Render different skeleton types
  switch (type) {
    case 'project':
      return (
        <motion.div 
          className={combinedClassName} 
          style={style}
          aria-hidden="true"
          data-testid="skeleton-project"
          variants={cardVariants}
          initial={shouldAnimate ? "hidden" : "visible"}
          animate="visible"
        >
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-tags"></div>
            <div className="skeleton-actions"></div>
          </div>
          <motion.div 
            className="skeleton-shimmer"
            variants={shimmerVariants}
            initial="initial"
            animate={shouldAnimate ? "animate" : "disabled"}
          ></motion.div>
        </motion.div>
      );
      
    case 'experience':
      return (
        <motion.div 
          className={combinedClassName} 
          style={style}
          aria-hidden="true"
          data-testid="skeleton-experience"
          variants={cardVariants}
          initial={shouldAnimate ? "hidden" : "visible"}
          animate="visible"
        >
          <div className="skeleton-header"></div>
          <div className="skeleton-content">
            <div className="skeleton-image-circle"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-description"></div>
          </div>
          <motion.div 
            className="skeleton-shimmer"
            variants={shimmerVariants}
            initial="initial"
            animate={shouldAnimate ? "animate" : "disabled"}
          ></motion.div>
        </motion.div>
      );
      
    case 'skill':
      return (
        <motion.div 
          className={combinedClassName} 
          style={style} 
          aria-hidden="true"
          data-testid="skeleton-skill"
          variants={cardVariants}
          initial={shouldAnimate ? "hidden" : "visible"}
          animate="visible"
        >
          <div className="skeleton-icon"></div>
          <div className="skeleton-name"></div>
          <motion.div 
            className="skeleton-shimmer"
            variants={shimmerVariants}
            initial="initial"
            animate={shouldAnimate ? "animate" : "disabled"}
          ></motion.div>
        </motion.div>
      );
    
    default:
      return (
        <motion.div 
          className={combinedClassName} 
          style={style}
          aria-hidden="true"
          data-testid="skeleton-default"
          variants={cardVariants}
          initial={shouldAnimate ? "hidden" : "visible"}
          animate="visible"
        >
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
          </div>
          <motion.div 
            className="skeleton-shimmer"
            variants={shimmerVariants}
            initial="initial"
            animate={shouldAnimate ? "animate" : "disabled"}
          ></motion.div>
        </motion.div>
      );
  }
};

SkeletonCard.propTypes = {
  type: PropTypes.oneOf(['project', 'experience', 'skill', 'default']),
  variant: PropTypes.oneOf(['', 'security', 'terminal']),
  index: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
};

export default memo(SkeletonCard);
