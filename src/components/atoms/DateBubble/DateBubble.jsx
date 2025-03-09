import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './DateBubble.css';

/**
 * DateBubble atom component for displaying dates in timelines
 * Enhanced with framer-motion animations controlled by AnimationContext
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.date - Date text to display
 * @param {string} [props.level=''] - Security level ('low', 'medium', 'high', 'critical')
 * @param {string} [props.variant=''] - Visual variant ('', 'security', 'terminal')
 * @param {string} [props.size='md'] - Size of the bubble ('sm', 'md', 'lg')
 * @param {Object} [props.animation=null] - Framer Motion animation props (deprecated, use AnimationContext)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Object} [props.style={}] - Additional inline styles
 * @param {Function} [props.onClick=undefined] - Click handler function
 * @param {string} [props.id] - Unique ID for ARIA relationships
 * @param {string} [props.ariaLabel] - ARIA label override
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
  ...rest
}) => {
  // Get animation context values
  const { animationEnabled, fadeInVariants } = useAnimation();
  
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
      onKeyPress: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      }
    } : {})
  };
  
  // Animation variants for scanner effect
  const scannerVariants = {
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
  const indicatorScanVariants = {
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
  const hoverVariants = onClick ? {
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

DateBubble.propTypes = {
  date: PropTypes.string.isRequired,
  level: PropTypes.oneOf(['', 'low', 'medium', 'high', 'critical']),
  variant: PropTypes.oneOf(['', 'security', 'terminal']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  animation: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func, /* React.MouseEventHandler<HTMLDivElement> */
  id: PropTypes.string,
  ariaLabel: PropTypes.string
};

export default memo(DateBubble);
