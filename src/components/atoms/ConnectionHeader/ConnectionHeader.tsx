import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './ConnectionHeader.css';

export interface ConnectionHeaderProps {
  /** The title to display */
  title?: string;
  /** The status code to display */
  statusCode?: string;
  /** Whether to animate the header */
  animate?: boolean;
  /** The variant of the header */
  variant?: '' | 'security' | 'terminal' | 'cyberpunk';
}

/**
 * Connection header component for timelines
 * Displays a cyberpunk-style secure connection header
 * Enhanced with framer-motion animations controlled by AnimationContext
 * 
 * @component
 * @example
 * <ConnectionHeader 
 *   title="SECURE CONNECTION ESTABLISHED" 
 *   statusCode="[0xFF2941] VERIFIED" 
 * />
 */
const ConnectionHeader: FC<ConnectionHeaderProps> = ({
  title = 'SECURE CONNECTION ESTABLISHED',
  statusCode = '[0xFF2941] VERIFIED',
  animate = true,
  variant = 'security'
}) => {
  // Get animation context values
  const { animationEnabled, fadeInVariants } = useAnimation();
  
  // Only animate if both props and context allow it
  const shouldAnimate = animate && animationEnabled;
  
  const variantClass = variant ? `secure-connection-start--${variant}` : '';
  
  // Pulse animation variants
  const pulseVariants = {
    hidden: { opacity: 0.6, scale: 0.8 },
    visible: {
      opacity: [0.6, 1, 0.6],
      scale: [0.8, 1.2, 0.8],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };
  
  // Scan line animation variants
  const scanLineVariants = {
    hidden: { opacity: 0, left: 0 },
    visible: {
      opacity: [0, 0.5, 0.5, 0],
      left: ["0%", "20%", "80%", "100%"],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "linear",
        times: [0, 0.2, 0.8, 1]
      }
    }
  };
  
  return (
    <motion.div 
      className={`secure-connection-start ${variantClass}`}
      variants={fadeInVariants}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      transition={{ delay: 0.5 }}
      data-testid="connection-start"
    >
      <div className="secure-connection-status">
        <motion.span 
          className="connection-pulse"
          variants={pulseVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
        />
        <div className="secure-label">
          <motion.div 
            className="scanner-line"
            variants={scanLineVariants}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
          />
          {title}
          <div className="status-code">{statusCode}</div>
        </div>
        <div className="secure-connection-shield">
          <div className="shield-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConnectionHeader;