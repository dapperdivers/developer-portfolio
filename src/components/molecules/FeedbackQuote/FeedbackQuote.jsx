import React from "react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import './FeedbackQuote.css';

/**
 * Component for displaying a testimonial quote with quotation marks.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.text - The quote text
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} FeedbackQuote component
 */
const FeedbackQuote = ({ text, className = "", animated = true }) => {
  const { animationEnabled, fadeInVariants } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;
  
  // Animation variants
  const quoteIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 0.8,
      scale: 1,
      transition: { duration: 0.5, type: "spring" }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.2 }
    }
  };

  return (
    <motion.div 
      className={`relative flex-grow mb-5 feedback-quote ${className}`}
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
          className="text-text-muted text-lg absolute top-0 left-0 quote-icon" 
          aria-hidden="true" 
        />
      </motion.div>
      
      <motion.p 
        className="pl-7 pr-7 text-text italic text-sm leading-relaxed relative border-l border-primary quote-content" 
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
          className="text-text-muted text-lg absolute bottom-0 right-0 quote-icon" 
          aria-hidden="true" 
        />
      </motion.div>
    </motion.div>
  );
};

FeedbackQuote.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  animated: PropTypes.bool
};

export default FeedbackQuote;
