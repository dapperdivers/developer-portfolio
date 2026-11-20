import React, { memo } from 'react';
import { motion, HTMLMotionProps, MotionStyle } from 'framer-motion';
import { useMotionEnabled, fadeInVariants } from '@utils/motion';
import './DateBubble.css';

export interface DateBubbleProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Date text to display */
  date: string;
  /** Emphasis level. Only 'critical' changes colour, as a warning */
  level?: '' | 'low' | 'medium' | 'high' | 'critical';
  /** Visual variant: 'security' and 'terminal' add the inset chip surface */
  variant?: '' | 'security' | 'terminal';
  /** Size of the date text */
  size?: 'sm' | 'md' | 'lg';
  /** Framer Motion animation props (deprecated, unused) */
  animation?: Record<string, unknown> | null;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: MotionStyle;
  /** Click handler function */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Unique ID for ARIA relationships */
  id?: string;
  /** ARIA label override */
  ariaLabel?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * DateBubble: a date in the shared mono metadata style (small, muted,
 * technical letter spacing). Variants add the inset chip surface; a click
 * handler makes it a keyboard-operable button.
 *
 * @component
 */
const DateBubble = ({
  date,
  level = '',
  variant = '',
  size = 'md',
  animation = null, // Kept for backward compatibility
  className = '',
  style = {},
  onClick,
  id,
  ariaLabel,
  animated = true,
  ...rest
}: DateBubbleProps) => {
  const animationEnabled = useMotionEnabled(animated);
  void animation;

  const classes = [
    'date-bubble',
    `date-bubble-${size}`,
    level ? `date-bubble-level-${level}` : '',
    variant ? `date-bubble-${variant}` : '',
    onClick ? 'date-bubble-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  // A label only where it adds something: the text already reads as the date
  const a11yProps = {
    id,
    ...(ariaLabel || onClick ? { 'aria-label': ariaLabel || `Date: ${date}` } : {}),
    ...(onClick ? {
      role: 'button',
      tabIndex: 0,
      onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // The click handler is reused for keyboard activation
          onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }
    } : {})
  };

  return (
    <motion.div
      className={classes}
      style={style}
      onClick={onClick}
      data-testid="date-bubble"
      variants={fadeInVariants}
      initial={animationEnabled ? 'hidden' : 'visible'}
      animate="visible"
      {...a11yProps}
      {...rest}
    >
      <span className="date-bubble-text">{date}</span>
    </motion.div>
  );
};

export default memo(DateBubble);
