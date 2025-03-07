import React, { FC, memo } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
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
}

/**
 * TechBadge component for displaying technology labels
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
  ...rest
}) => {
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
      whileHover={isClickable ? { scale: 1.05 } : undefined}
      whileTap={isClickable ? { scale: 0.95 } : undefined}
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
