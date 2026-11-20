// Not exported from the index and not imported anywhere. An older verified/scanning
// badge that shared this folder's name with the text/icon SecurityBadge.
import React, { FC, memo } from 'react';
import { motion, MotionStyle, Variants } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import './SecurityBadge.css';

export interface SecurityBadgeProps {
  /** Whether the badge is verified */
  verified: boolean;
  /** Visual variant ('', 'security', 'terminal') */
  variant?: '' | 'security' | 'terminal';
  /** Security verification ID */
  securityId: string;
  /** Additional CSS class */
  className?: string;
  /** Custom animation variants */
  animation?: Variants;
  /** Additional inline styles */
  style?: MotionStyle;
  /** Whether animations are enabled for this instance */
  animated?: boolean;
  /** Whether to show the hover effect */
  hoverEffect?: boolean;
}

/**
 * SecurityBadge component that displays security verification status
 * 
 * @component
 * @param {SecurityBadgeProps} props - Component props
 * @returns {React.ReactElement} SecurityBadge component
 */
const SecurityBadge: FC<SecurityBadgeProps> = ({
  verified = false,
  variant = 'security',
  securityId,
  className = '',
  animation,
  style = {},
  animated = true,
  hoverEffect = true,
}) => {
  const shouldAnimate = useMotionEnabled(animated);
  
  // Default animation variants
  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    scanning: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    verified: {
      opacity: 1,
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        times: [0, 0.5, 1]
      }
    }
  };
  
  // Loading icon animation variants
  const loadingIconVariants: Variants = {
    rotate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };
  
  // Hover animation
  const hoverVariants = hoverEffect && shouldAnimate ? {
    whileHover: { 
      y: -3, 
      scale: 1.05,
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(var(--color-primary-rgb), 0.6)",
      filter: "brightness(1.2)",
      transition: { duration: 0.2 }
    }
  } : {};
  
  // Use provided animation or default
  const animationVariants = animation || defaultVariants;
  
  // Generate CSS classes
  const badgeClasses = [
    'security-badge',
    `security-badge-${variant}`,
    verified ? 'security-badge-verified' : 'security-badge-scanning',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <motion.div 
      className={badgeClasses}
      initial={shouldAnimate ? "hidden" : false}
      animate={shouldAnimate ? (verified ? "verified" : "scanning") : false}
      variants={animationVariants}
      style={style}
      data-testid="security-badge"
      data-verified={verified}
      data-variant={variant}
      {...hoverVariants}
    >
      <div className="security-badge-icon">
        {verified ? (
          // Verified checkmark icon
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        ) : (
          // Scanning/processing icon with animation
          <motion.svg 
            viewBox="0 0 24 24" 
            width="16" 
            height="16" 
            fill="currentColor"
            animate={shouldAnimate ? "rotate" : false}
            variants={loadingIconVariants}
            className="security-badge-loading-icon"
          >
            <path d="M12 4V2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8z" />
          </motion.svg>
        )}
      </div>
      <div className="security-badge-text">
        <div className="security-badge-status">
          {verified ? 'Verified' : 'Scanning'}
        </div>
        <div className="security-badge-id">
          {securityId}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(SecurityBadge);
