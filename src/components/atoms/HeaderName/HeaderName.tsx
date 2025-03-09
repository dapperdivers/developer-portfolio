import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useAnimation as useAppAnimation, MotionVariants } from '@context/AnimationContext';
import './HeaderName.css';

/**
 * HeaderName component - Displays a name with cyberpunk animation effects
 * 
 * @component
 * @example
 * ```tsx
 * <HeaderName name="John Doe" />
 * ```
 */
interface HeaderNameProps {
  /** The name to display with animation effects */
  name: string;
  /** Optional CSS class names to add to the component */
  className?: string;
}

const HeaderName: React.FC<HeaderNameProps> = ({ 
  name, 
  className = '' 
}: HeaderNameProps) => {
  // Animation controls for hover effects
  const controls = useAnimation();
  const { animationEnabled } = useAppAnimation();
  
  // Animation variants for the component
  const textVariants = {
    initial: { 
      textShadow: '0 0 5px rgba(5, 213, 250, 0.7), 0 0 10px rgba(5, 213, 250, 0.5)',
      y: 0
    },
    hover: { 
      textShadow: '0 0 10px rgba(5, 213, 250, 1), 0 0 20px rgba(5, 213, 250, 0.8), 0 0 30px rgba(5, 213, 250, 0.6)',
      y: -2,
      color: '#ffffff',
      transition: { duration: 0.3 }
    }
  };
  
  const underlineVariants = {
    initial: { 
      scaleX: 0,
      originX: 1 
    },
    hover: { 
      scaleX: 1,
      originX: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const scanlineVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };
  
  const cursorVariants = {
    initial: { opacity: 1 },
    blink: { 
      opacity: [1, 0, 1],
      transition: { 
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.5, 1]
      }
    }
  };
  
  return (
    <motion.h2 
      className={`text-xl font-bold text-cyan-400 ${className}`.trim()}
      data-content={name}
      aria-label={name}
      variants={textVariants}
      initial="initial"
      whileHover="hover"
      animate={controls}
      onHoverStart={() => animationEnabled && controls.start('hover')}
      onHoverEnd={() => controls.start('initial')}
    >
      {name}
      
      <motion.span 
        className="cursor" 
        aria-hidden="true"
        variants={cursorVariants}
        initial="initial"
        animate="blink"
      />
      
      <motion.div 
        className="scanline" 
        aria-hidden="true"
        variants={scanlineVariants}
        initial="initial"
        animate={controls}
        style={{
          position: "absolute",
          top: 0,
          left: "-10%",
          width: "120%",
          height: "100%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(5, 213, 250, 0) 20%, rgba(5, 213, 250, 0.3) 50%, rgba(5, 213, 250, 0) 80%, transparent 100%)",
          pointerEvents: "none",
          transform: "skewX(-20deg)"
        }}
      />
      
      <motion.div
        style={{
          position: "absolute",
          bottom: "-4px",
          left: 0,
          width: "100%",
          height: "2px",
          background: "var(--color-cyan)",
          boxShadow: "0 0 10px rgba(5, 213, 250, 1), 0 0 20px rgba(5, 213, 250, 0.8)"
        }}
        variants={underlineVariants}
        initial="initial"
        animate={controls}
      />
    </motion.h2>
  );
};

export default HeaderName;
