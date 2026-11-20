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
  
  return (
    <motion.div 
      className={`feedback-highlight ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? containerVariants : {}}
    >
      <div className="highlight-container">
        <motion.p className="highlight-text">
          &ldquo;{text}&rdquo;
        </motion.p>
      </div>
    </motion.div>
  );
};

export default FeedbackHighlight;
