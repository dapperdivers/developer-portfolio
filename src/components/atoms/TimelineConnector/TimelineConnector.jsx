import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Timeline connector atom - represents the line connecting timeline items with cybersecurity-themed effects
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.isFirst] - Whether this is the first item (no line above)
 * @param {boolean} [props.isLast] - Whether this is the last item (no line below)
 * @param {boolean} [props.isActive] - Whether this connector is active/highlighted
 * @param {string} [props.variant] - Visual variant (default, secure, breach, critical)
 * @param {boolean} [props.pulsing] - Whether to show pulsing animation
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} TimelineConnector component
 */
const TimelineConnector = ({ 
  isFirst = false, 
  isLast = false, 
  isActive = false,
  variant = 'default',
  pulsing = false,
  className = '' 
}) => {
  const getVariantStyles = () => {
    const variants = {
      default: {
        line: isActive ? 'bg-theme-cyan' : 'bg-gray-600',
        node: isActive 
          ? 'bg-theme-cyan border-theme-cyan shadow-lg shadow-theme-cyan/50' 
          : 'bg-gray-700 border-gray-600',
        glow: 'bg-theme-cyan',
        shadow: isActive 
          ? "0 0 20px rgba(5, 213, 250, 0.6)"
          : "0 0 10px rgba(156, 163, 175, 0.4)"
      },
      secure: {
        line: isActive ? 'bg-green-400' : 'bg-green-700',
        node: isActive 
          ? 'bg-green-400 border-green-400 shadow-lg shadow-green-400/50' 
          : 'bg-green-800 border-green-600',
        glow: 'bg-green-400',
        shadow: isActive 
          ? "0 0 20px rgba(74, 222, 128, 0.6)"
          : "0 0 10px rgba(34, 197, 94, 0.4)"
      },
      breach: {
        line: isActive ? 'bg-red-400' : 'bg-red-700',
        node: isActive 
          ? 'bg-red-400 border-red-400 shadow-lg shadow-red-400/50' 
          : 'bg-red-800 border-red-600',
        glow: 'bg-red-400',
        shadow: isActive 
          ? "0 0 20px rgba(248, 113, 113, 0.6)"
          : "0 0 10px rgba(239, 68, 68, 0.4)"
      },
      critical: {
        line: isActive ? 'bg-yellow-400' : 'bg-yellow-700',
        node: isActive 
          ? 'bg-yellow-400 border-yellow-400 shadow-lg shadow-yellow-400/50' 
          : 'bg-yellow-800 border-yellow-600',
        glow: 'bg-yellow-400',
        shadow: isActive 
          ? "0 0 20px rgba(250, 204, 21, 0.6)"
          : "0 0 10px rgba(234, 179, 8, 0.4)"
      }
    };
    return variants[variant] || variants.default;
  };

  const styles = getVariantStyles();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const nodeVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className={`timeline-connector flex flex-col items-center relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top line */}
      {!isFirst && (
        <motion.div 
          className={`w-px h-8 ${styles.line} origin-bottom relative`}
          variants={lineVariants}
        >
          {/* Data flow dot */}
          {isActive && (
            <motion.div 
              className={`absolute top-0 left-1/2 w-1 h-2 ${styles.glow} rounded-full -translate-x-1/2`}
              animate={{ y: [0, 32] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
          {/* Pulsing effect */}
          {pulsing && (
            <motion.div 
              className={`absolute inset-0 ${styles.line} opacity-30`}
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      )}
      
      {/* Node/dot */}
      <motion.div 
        className={`w-4 h-4 rounded-full border-2 relative z-10 cursor-pointer ${styles.node}`}
        variants={nodeVariants}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Single animated ring for active state */}
        {isActive && (
          <motion.div 
            className={`absolute -inset-2 rounded-full border ${styles.line.replace('bg-', 'border-')} opacity-30`}
            animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        )}
        
        {/* Inner glow - simplified */}
        {isActive && (
          <motion.div 
            className={`absolute inset-0.5 rounded-full ${styles.glow}`}
            animate={{ opacity: [0.4, 0.8] }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        )}

        {/* Static security indicator */}
        <div className={`absolute inset-1 rounded-full ${styles.glow} opacity-60`} />
        
        {/* Variant-specific indicators - optimized */}
        {variant === 'breach' && isActive && (
          <motion.div 
            className="absolute inset-0 rounded-full border border-red-300 opacity-60"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
        
        {variant === 'secure' && isActive && (
          <div className="absolute inset-1.5 rounded-full bg-green-200 opacity-80" />
        )}
      </motion.div>
      
      {/* Bottom line */}
      {!isLast && (
        <motion.div 
          className={`w-px h-8 ${styles.line} origin-top relative`}
          variants={lineVariants}
        >
          {/* Data flow dot */}
          {isActive && (
            <motion.div 
              className={`absolute bottom-0 left-1/2 w-1 h-2 ${styles.glow} rounded-full -translate-x-1/2`}
              animate={{ y: [0, -32] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.3
              }}
            />
          )}
          {/* Pulsing effect */}
          {pulsing && (
            <motion.div 
              className={`absolute inset-0 ${styles.line} opacity-30`}
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          )}
        </motion.div>
      )}
      
      {/* Network connection indicators - simplified */}
      {isActive && (
        <motion.div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className={`absolute -left-6 top-1/2 w-4 h-px ${styles.line} opacity-40`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          />
          <motion.div 
            className={`absolute -right-6 top-1/2 w-4 h-px ${styles.line} opacity-40`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

TimelineConnector.propTypes = {
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  isActive: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'secure', 'breach', 'critical']),
  pulsing: PropTypes.bool,
  className: PropTypes.string
};

export default TimelineConnector;