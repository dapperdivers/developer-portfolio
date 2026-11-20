import React from "react";
import { motion, Variants } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import './FeedbackHighlight.css';

export interface FeedbackHighlightProps {
  /** The highlighted text; nothing renders without it */
  text?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * Component for displaying a highlighted portion of a testimonial.
 * 
 * @component
 */
const FeedbackHighlight = ({ text, className = "", animated = true }: FeedbackHighlightProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);

  if (!text) return null;
  
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 300, 
        damping: 15
      }
    }
  };
  
  // Decoration animation
  const decorationVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 0.7, 
      scale: 1,
      transition: { duration: 0.6, delay: 0.2 }
    },
    hover: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.05, 1],
      transition: { 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" 
      }
    }
  };
  
  return (
    <motion.div 
      className={`feedback-highlight ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? containerVariants : {}}
    >
      <motion.div 
        className="highlight-container"
        whileHover={shouldAnimate ? "hover" : {}}
      >
        <motion.p className="highlight-text">
          &ldquo;{text}&rdquo;
        </motion.p>
        <motion.div 
          className="highlight-decoration"
          variants={shouldAnimate ? decorationVariants : {}}
          animate={shouldAnimate ? "visible" : {}}
          whileHover={shouldAnimate ? "hover" : {}}
        ></motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackHighlight;
