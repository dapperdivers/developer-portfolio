import React from "react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import './FeedbackHighlight.css';

/**
 * Component for displaying a highlighted portion of a testimonial.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.text - The highlighted text
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} FeedbackHighlight component
 */
const FeedbackHighlight = ({ text, className = "", animated = true }) => {
  if (!text) return null;
  
  const { animationEnabled } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;
  
  // Animation variants
  const containerVariants = {
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
  const decorationVariants = {
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

FeedbackHighlight.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  animated: PropTypes.bool
};

export default FeedbackHighlight;
