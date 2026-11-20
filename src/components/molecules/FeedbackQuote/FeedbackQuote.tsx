import React from "react";
import { motion, Variants } from 'framer-motion';
import { useMotionEnabled, fadeInVariants } from '@utils/motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import './FeedbackQuote.css';

export interface FeedbackQuoteProps {
  /** The quote text */
  text: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * Component for displaying a testimonial quote with quotation marks.
 * 
 * @component
 */
const FeedbackQuote = ({ text, className = "", animated = true }: FeedbackQuoteProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);
  
  // Animation variants
  const quoteIconVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 0.6,
      scale: 1,
      transition: { duration: 0.5, type: "spring" }
    }
  };
  
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.2 }
    }
  };

  return (
    <motion.div 
      className={`feedback-quote ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? fadeInVariants : {}}
    >
      <motion.div
        variants={shouldAnimate ? quoteIconVariants : {}}
        initial={shouldAnimate ? "hidden" : "visible"}
        animate="visible"
      >
        <FaQuoteLeft 
          className="quote-icon absolute top-0 left-0" 
          aria-hidden="true" 
        />
      </motion.div>
      
      <motion.p 
        className="quote-content" 
        tabIndex={0}
        variants={shouldAnimate ? contentVariants : {}}
      >
        {text}
      </motion.p>
      
      <motion.div
        variants={shouldAnimate ? quoteIconVariants : {}}
        initial={shouldAnimate ? "hidden" : "visible"}
        animate="visible"
      >
        <FaQuoteRight 
          className="quote-icon absolute bottom-0 right-0" 
          aria-hidden="true" 
        />
      </motion.div>
    </motion.div>
  );
};

export default FeedbackQuote;
