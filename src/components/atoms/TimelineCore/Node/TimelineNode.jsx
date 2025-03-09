import React, { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useAnimation, MotionVariants } from '@context/AnimationContext';
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
  const { animationEnabled } = useAnimation();

  // Define animation variants for the node
  const nodeVariants = {
    initial: { 
      scale: 1,
      boxShadow: '0 0 8px var(--glow-primary), inset 0 0 6px var(--glow-primary)'
    },
    active: { 
      scale: 1.1,
      boxShadow: '0 0 15px var(--glow-primary), inset 0 0 10px var(--glow-primary)',
      transition: {
        duration: 0.4,
        ease: [0.165, 0.84, 0.44, 1]
      }
    },
    hover: {
      scale: 1.15,
      boxShadow: '0 0 12px var(--glow-primary), inset 0 0 8px var(--glow-primary)',
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const coreVariants = {
    initial: {
      opacity: 0.7,
      scale: 0.85,
      boxShadow: '0 0 5px var(--glow-primary), 0 0 2px rgba(255, 255, 255, 0.5)'
    },
    pulse: {
      opacity: [0.7, 1, 0.7],
      scale: [0.85, 1, 0.85],
      boxShadow: [
        '0 0 5px var(--glow-primary), 0 0 2px rgba(255, 255, 255, 0.5)',
        '0 0 15px var(--glow-primary), 0 0 8px rgba(255, 255, 255, 0.9)',
        '0 0 5px var(--glow-primary), 0 0 2px rgba(255, 255, 255, 0.5)'
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    },
    active: {
      opacity: 1,
      scale: 1,
      boxShadow: '0 0 15px var(--glow-primary), 0 0 8px rgba(255, 255, 255, 0.9)',
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  const connectorVariants = {
    initial: {
      opacity: 0.8,
      scale: 1.15
    },
    active: {
      opacity: 1,
      scale: 1.25,
      rotate: 45,
      transition: {
        rotate: {
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        },
        duration: 0.5
      }
    },
    hover: {
      opacity: 1,
      scale: 1.2,
      transition: {
        duration: 0.3
      }
    }
  };

  // Determine class names based on props
  const classes = [
    'timeline-node',
    `timeline-node-${size}`,
    variant ? `timeline-node-${variant}` : '',
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
  
  // Get animation state based on active and animation flags
  const animationState = active ? "active" : (animated && animationEnabled ? "pulse" : "initial");

  return (
    <motion.div 
      ref={nodeRef}
      className={classes}
      style={style}
      data-testid="timeline-node"
      variants={nodeVariants}
      initial="initial"
      animate={animationState}
      whileHover={interactive ? "hover" : ""}
      {...ariaProps}
      {...rest}
    >
      <motion.div
        className="node-connector"
        variants={connectorVariants}
        initial="initial"
        animate={animationState}
        whileHover={interactive ? "hover" : ""}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "50%",
          background: "conic-gradient(var(--node-primary) 0%, transparent 25%, var(--node-primary) 50%, transparent 75%, var(--node-primary) 100%)",
          zIndex: -1,
          filter: "drop-shadow(0 0 5px var(--glow-primary))"
        }}
      />
      
      <motion.div
        className="node-core"
        variants={coreVariants}
        initial="initial"
        animate={animationState}
        style={{
          position: "absolute",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.9), var(--node-primary) 60%)",
          zIndex: 1
        }}
      />
    </motion.div>
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
