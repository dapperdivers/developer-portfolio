import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './DateBubble.css';

/**
 * DateBubble atom component for displaying dates in timelines
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.date - Date text to display
 * @param {string} [props.level=''] - Security level ('low', 'medium', 'high', 'critical')
 * @param {string} [props.variant=''] - Visual variant ('', 'security', 'terminal')
 * @param {string} [props.size='md'] - Size of the bubble ('sm', 'md', 'lg')
 * @param {Object} [props.animation=null] - Framer Motion animation props
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
  animation = null,
  className = '',
  style = {},
  onClick,
  id,
  ariaLabel,
  ...rest
}) => {
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

  // Content to render inside the DateBubble
  const bubbleContent = (
    <span className="date-bubble-text">{date}</span>
  );

  // Conditionally wrap with motion.div if animation is provided
  return animation ? (
    <motion.div 
      className={classes}
      style={style}
      onClick={onClick}
      data-testid="date-bubble"
      {...a11yProps}
      {...animation}
      {...rest}
    >
      {bubbleContent}
    </motion.div>
  ) : (
    <div 
      className={classes}
      style={style}
      onClick={onClick}
      data-testid="date-bubble"
      {...a11yProps}
      {...rest}
    >
      {bubbleContent}
    </div>
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
