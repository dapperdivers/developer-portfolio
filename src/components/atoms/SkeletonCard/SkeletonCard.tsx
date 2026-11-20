import React, { memo } from 'react';
import { motion, MotionStyle, Variants } from 'framer-motion';
import { useMotionEnabled, STAGGER_DELAY } from '@utils/motion';
import './SkeletonCard.css';


export interface SkeletonCardProps {
  /** Type of skeleton */
  type?: 'project' | 'experience' | 'skill' | 'default';
  /** Visual variant */
  variant?: '' | 'security' | 'terminal';
  /** Index for staggered animations */
  index?: number;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: MotionStyle;
  /** Whether to animate the entrance and shimmer */
  animated?: boolean;
}

/**
 * SkeletonCard component for use as loading placeholders
 * Updated with security-themed variants and framer-motion animations.
 * 
 * @component
 */
const SkeletonCard = ({ 
  type = 'project', 
  variant = '', 
  index = 0, 
  className = '', 
  style = {},
  animated = true
}: SkeletonCardProps) => {
  const shouldAnimate = useMotionEnabled(animated);
  const baseClass = `${type}-card-skeleton`;
  const combinedClassName = [
    baseClass,
    variant, // Will add 'security' or 'terminal' class if provided
    shouldAnimate ? '' : 'skeleton-static',
    className
  ].filter(Boolean).join(' ');
  
  // Calculate animation delay based on index (staggered effect)
  const staggerDelay = index * STAGGER_DELAY;
  
  // Define animation variants
  const cardVariants: Variants = {
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
  const shimmerVariants: Variants = {
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

export default memo(SkeletonCard);
