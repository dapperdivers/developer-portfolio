import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './TimelineNode.css';

/**
 * TimelineNode atom component for rendering nodes in a timeline
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.size='md'] - Size of the node ('sm', 'md', 'lg')
 * @param {string} [props.variant=''] - Visual variant ('', 'security', 'terminal')
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Object} [props.style={}] - Additional inline styles
 * @param {boolean} [props.active=false] - Whether the node is active
 * @param {boolean} [props.animated=false] - Whether the node should be animated
 * @param {string} [props.id] - Unique identifier for ARIA relationships
 * @param {boolean} [props.interactive=false] - Whether node is part of interactive timeline
 * @returns {React.ReactElement} TimelineNode component
 */
const TimelineNode = ({ 
  size = 'md',
  variant = '',
  className = '',
  style = {},
  active = false,
  animated = false,
  id,
  interactive = false,
  ...rest
}) => {
  const nodeRef = useRef(null);

  // Force visibility update when active state changes
  useEffect(() => {
    if (nodeRef.current && active) {
      // Add a class then force a reflow to ensure animation triggers
      nodeRef.current.classList.add('timeline-node-force-visible');
      setTimeout(() => {
        if (nodeRef.current) {
          nodeRef.current.classList.remove('timeline-node-force-visible');
        }
      }, 50);
    }
  }, [active]);

  // Determine class names based on props
  const classes = [
    'timeline-node',
    `timeline-node-${size}`,
    variant ? `timeline-node-${variant}` : '',
    active ? 'timeline-node-active' : '',
    animated ? 'timeline-node-animated' : '',
    className
  ].filter(Boolean).join(' ');

  // Set appropriate ARIA attributes
  const ariaProps = interactive ? {
    role: 'button',
    tabIndex: 0,
    'aria-label': `Timeline node ${active ? 'active' : 'inactive'}`,
    id
  } : {
    'aria-hidden': true
  };

  return (
    <div 
      ref={nodeRef}
      className={classes}
      style={style}
      data-testid="timeline-node"
      {...ariaProps}
      {...rest}
    />
  );
};

// For PropType validation in development
TimelineNode.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['', 'security', 'terminal']),
  className: PropTypes.string,
  style: PropTypes.object,
  active: PropTypes.bool,
  animated: PropTypes.bool,
  id: PropTypes.string,
  interactive: PropTypes.bool
};

export default memo(TimelineNode);
