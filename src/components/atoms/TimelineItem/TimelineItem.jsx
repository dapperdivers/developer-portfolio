import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './TimelineItem.css';

/**
 * Timeline item atom - wrapper for timeline content with cybersecurity-themed positioning and effects
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display
 * @param {boolean} [props.isLeft] - Whether content should align to the left
 * @param {boolean} [props.isActive] - Whether this item is active/highlighted
 * @param {string} [props.variant] - Visual variant (default, secure, breach, critical)
 * @param {boolean} [props.isScanning] - Whether to show scanning animation
 * @param {boolean} [props.hasGlow] - Whether to show glowing border effect
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} TimelineItem component
 */
const TimelineItem = ({ 
  children, 
  isLeft = false, 
  isActive = false,
  variant = 'default',
  isScanning = false,
  hasGlow = false,
  className = '' 
}) => {
  const getVariantStyles = () => {
    const variants = {
      default: {
        border: isActive ? 'border-theme-cyan/30' : 'border-gray-700',
        glow: 'shadow-theme-cyan/20',
        accent: 'theme-cyan'
      },
      secure: {
        border: isActive ? 'border-green-400/30' : 'border-green-800',
        glow: 'shadow-green-400/20',
        accent: 'green-400'
      },
      breach: {
        border: isActive ? 'border-red-400/30' : 'border-red-800',
        glow: 'shadow-red-400/20',
        accent: 'red-400'
      },
      critical: {
        border: isActive ? 'border-yellow-400/30' : 'border-yellow-800',
        glow: 'shadow-yellow-400/20',
        accent: 'yellow-400'
      }
    };
    return variants[variant] || variants.default;
  };

  const styles = getVariantStyles();

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      x: isLeft ? -20 : 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const effectsVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.2, duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className={`timeline-item timeline-item--${isLeft ? 'left' : 'right'} ${isActive ? 'timeline-item--active' : ''} relative group w-full ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={isActive ? { scale: 1.01 } : {}}
    >
      {/* Content wrapper positioned for alternating sides with full width support */}
      <motion.div 
        className={`timeline-content relative overflow-hidden ${isLeft ? 'timeline-content--left' : 'timeline-content--right'} ${hasGlow ? 'filter drop-shadow-lg' : ''}`}
        variants={contentVariants}
      >
        {/* Security border effect */}
        <motion.div 
          className={`timeline-border absolute inset-0 rounded-lg border-2 ${styles.border} ${isActive && hasGlow ? `shadow-lg ${styles.glow}` : ''} pointer-events-none`}
          variants={effectsVariants}
        />
        
        {/* Scanning line effect - optimized */}
        {isScanning && isActive && (
          <motion.div 
            className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-${styles.accent} to-transparent opacity-60 z-10`}
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
        
        {/* Network grid overlay - conditional and optimized */}
        {isActive && (
          <motion.div 
            className="timeline-grid absolute inset-0 opacity-5 pointer-events-none"
            variants={effectsVariants}
            style={{
              backgroundImage: `
                linear-gradient(rgba(5, 213, 250, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(5, 213, 250, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
        )}
        
        {/* Data stream indicators - reduced z-index to avoid blocking content */}
        {isActive && (
          <motion.div variants={effectsVariants} className="absolute inset-0 pointer-events-none z-0">
            <motion.div 
              className={`absolute -top-1 -left-1 w-2 h-2 bg-${styles.accent} rounded-full`}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className={`absolute -bottom-1 -right-1 w-2 h-2 bg-${styles.accent} rounded-full`}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>
        )}
        
        {/* Content container - allow full expansion with reduced z-index */}
        <motion.div className="timeline-content-inner relative z-1" variants={contentVariants}>
          {children}
        </motion.div>
        
        {/* Security badge indicator - reduced z-index */}
        {variant !== 'default' && isActive && (
          <motion.div 
            className={`absolute -top-2 -right-2 w-4 h-4 bg-${styles.accent} rounded-full flex items-center justify-center text-xs font-bold text-gray-900 z-10`}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          >
            {variant === 'secure' && '✓'}
            {variant === 'breach' && '⚠'}
            {variant === 'critical' && '!'}
          </motion.div>
        )}
      </motion.div>
      
      {/* Connection beam - positioned to connect to center timeline */}
      {isActive && (
        <motion.div 
          className={`timeline-beam absolute ${isLeft ? 'right-1/2 mr-4' : 'left-1/2 ml-4'} top-1/2 w-8 h-px bg-gradient-to-${isLeft ? 'r' : 'l'} from-${styles.accent} to-transparent opacity-50 z-0`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        />
      )}
    </motion.div>
  );
};

TimelineItem.propTypes = {
  children: PropTypes.node.isRequired,
  isLeft: PropTypes.bool,
  isActive: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  isScanning: PropTypes.bool,
  hasGlow: PropTypes.bool,
  className: PropTypes.string
};

export default TimelineItem;