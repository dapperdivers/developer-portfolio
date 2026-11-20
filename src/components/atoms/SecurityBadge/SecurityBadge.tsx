import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { motion, Variants } from 'framer-motion';
import './SecurityBadge.css';

export interface SecurityBadgeProps {
  /** Badge text content */
  text: string;
  /** Custom icon component (defaults to FaShieldAlt) */
  icon?: React.ElementType;
  /** Framer motion animation variants */
  variants?: Variants;
  /** Whether to animate the component */
  animate?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * SecurityBadge component for displaying security-themed badge with icon and text.
 * 
 * @component
 */
const SecurityBadge = ({ 
  text, 
  icon: Icon = FaShieldAlt, 
  variants,
  animate = true,
  className = ''
}: SecurityBadgeProps) => {
  return (
    <motion.div 
      className={`security-badge ${className}`}
      variants={animate ? variants : undefined}
    >
      <Icon className="security-badge__icon" />
      <span className="security-badge__text">{text}</span>
    </motion.div>
  );
};

export default SecurityBadge;