import React, { FC, memo } from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { useAnimation } from '@context//AnimationContext';
import './TechBadge.css';

interface TechBadgeProps extends Omit<HTMLMotionProps<'div'>, 'size'> {
  /** Badge label text */
  label: string;
  /** Badge size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: '' | 'security' | 'terminal';
  /** Security level for color coding */
  level?: '' | 'low' | 'medium' | 'high' | 'critical';
  /** Whether badge is interactive */
  interactive?: boolean;
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Additional CSS class */
  className?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Whether to animate the badge */
  animate?: boolean;
  /** Index for staggered animations */
  index?: number;
}

/**
 * TechBadge component for displaying technology labels
 * Enhanced with framer-motion animations that respect user preferences
 * 
 * @component
 * @param {TechBadgeProps} props - Component props
 * @returns {React.ReactElement} TechBadge component
 */
const TechBadge: FC<TechBadgeProps> = ({
  label,
  size = 'md',
  variant = '',
  level = '',
  interactive = false,
  onClick,
  className = '',
  tooltip,
  animate = true,
  index = 0,
  ...rest
}) => {
  // Get animation settings from context
  const { animationEnabled } = useAnimation();
  
  // Determine if animations should run
  const shouldAnimate = animate && animationEnabled;
  
  // Determine if the badge is clickable
  const isClickable = interactive || !!onClick;
  
  // Generate badge classes
  const badgeClasses = [
    'tech-badge',
    `tech-badge--${size}`,
    variant ? `tech-badge--${variant}` : '',
    level ? `tech-badge--${level}` : '',
    isClickable ? 'tech-badge--interactive' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Animation variants
  const badgeVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 10,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut"
      }
    },
    hover: isClickable ? { 
      y: -2,
      scale: 1.05,
      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
      transition: { 
        duration: 0.2
      }
    } : {
      y: -1,
      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
      transition: { 
        duration: 0.2
      }
    },
    tap: isClickable ? { 
      scale: 0.95,
      y: -1,
      transition: { 
        duration: 0.1
      }
    } : {}
  };
  
  // Handle keyboard accessibility for interactive badges
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };
  
  return (
    <motion.div
      className={badgeClasses}
      onClick={isClickable ? onClick : undefined}
      onKeyPress={isClickable ? handleKeyPress : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      initial={shouldAnimate ? "hidden" : undefined}
      animate={shouldAnimate ? "visible" : undefined}
      whileHover={shouldAnimate ? "hover" : undefined}
      whileTap={(isClickable && shouldAnimate) ? "tap" : undefined}
      variants={badgeVariants}
      title={tooltip}
      aria-label={tooltip || `Technology: ${label}`}
      data-testid="tech-badge"
      data-variant={variant || 'default'}
      data-level={level || 'default'}
      {...rest}
    >
      <span className="tech-badge__label">{label}</span>
    </motion.div>
  );
};

export default memo(TechBadge);
