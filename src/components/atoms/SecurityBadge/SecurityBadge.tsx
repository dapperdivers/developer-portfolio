import React, { FC, memo } from 'react';
import { motion, Variants } from 'framer-motion';
import './SecurityBadge.css';

interface SecurityBadgeProps {
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
  style?: React.CSSProperties;
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
}) => {
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
      initial="hidden"
      animate={verified ? "verified" : "scanning"}
      variants={animationVariants}
      style={style}
      data-testid="security-badge"
      data-verified={verified}
      data-variant={variant}
      whileHover={{ y: -3, scale: 1.05 }}
    >
      <div className="security-badge-icon">
        {verified ? (
          // Verified checkmark icon
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        ) : (
          // Scanning/processing icon
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="security-badge-loading-icon">
            <path d="M12 4V2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8z" />
          </svg>
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
