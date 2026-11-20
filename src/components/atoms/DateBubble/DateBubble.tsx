import React, { memo } from 'react';
import { motion, HTMLMotionProps, MotionStyle, Variants } from 'framer-motion';
import { useMotionEnabled, fadeInVariants } from '@utils/motion';
import './DateBubble.css';

export interface DateBubbleProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Date text to display */
  date: string;
  /** Security level */
  level?: '' | 'low' | 'medium' | 'high' | 'critical';
  /** Visual variant */
  variant?: '' | 'security' | 'terminal';
  /** Size of the bubble */
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
 * DateBubble atom component for displaying dates in timelines
 * Enhanced with framer-motion animations controlled by the `animated` prop
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.date - Date text to display
 * @param {string} [props.level=''] - Security level ('low', 'medium', 'high', 'critical')
 * @param {string} [props.variant=''] - Visual variant ('', 'security', 'terminal')
 * @param {string} [props.size='md'] - Size of the bubble ('sm', 'md', 'lg')
 * @param {Object} [props.animation=null] - Framer Motion animation props (deprecated, unused)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Object} [props.style={}] - Additional inline styles
 * @param {Function} [props.onClick=undefined] - Click handler function
 * @param {string} [props.id] - Unique ID for ARIA relationships
 * @param {string} [props.ariaLabel] - ARIA label override
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} DateBubble component
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
  
  // Determine class names based on props
  const classes = [
    'date-bubble',
    `date-bubble-${size}`,
    level ? `date-bubble-level-${level}` : '',
    variant ? `date-bubble-${variant}` : '',
    onClick ? 'date-bubble-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  // Set ARIA attributes
  const a11yProps = {
    'aria-label': ariaLabel || `Date: ${date}`,
    id,
    ...(onClick ? {
      role: 'button',
      tabIndex: 0,
      onKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // The click handler is reused for keyboard activation
          onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }
    } : {})
  };
  
  // Animation variants for scanner effect
  const scannerVariants: Variants = {
    hidden: { top: "5%", opacity: 0 },
    visible: {
      top: ["5%", "95%", "5%"],
      opacity: [0, 0.8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    }
  };
  
  // Animation variants for indicator scan effect
  const indicatorScanVariants: Variants = {
    hidden: { left: "-100%" },
    visible: {
      left: "100%",
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };
  
  // Hover animation for clickable bubbles
  const hoverVariants: Variants = onClick ? {
    initial: { y: 0, scale: 1 },
    hover: { y: -5, scale: 1.05 },
    tap: { y: -2, scale: 0.98 }
  } : {};

  // Content to render inside the DateBubble with hacker-themed elements
  return (
    <motion.div 
      className={classes}
      style={style}
      onClick={onClick}
      data-testid="date-bubble"
      variants={fadeInVariants}
      initial={animationEnabled ? "hidden" : "visible"}
      animate="visible"
      whileHover={onClick && animationEnabled ? "hover" : undefined}
      whileTap={onClick && animationEnabled ? "tap" : undefined}
      {...(onClick && animationEnabled ? { variants: hoverVariants } : {})}
      {...a11yProps}
      {...rest}
    >
      <motion.div 
        className="date-bubble-scanner"
        variants={scannerVariants}
        initial="hidden"
        animate={animationEnabled ? "visible" : "hidden"}
      />
      <span className="date-bubble-text">
        <span className="date-bubble-year">{date}</span>
        <span className="date-bubble-indicator">
          <motion.span 
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)'
            }}
            variants={indicatorScanVariants}
            initial="hidden"
            animate={animationEnabled ? "visible" : "hidden"}
          />
        </span>
      </span>
      <div className="date-chip"></div>
    </motion.div>
  );
};

export default memo(DateBubble);
