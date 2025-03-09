import React from "react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { useAnimation } from '@context/AnimationContext';
import './RatingStars.css';

/**
 * A component that displays a star rating.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.rating - Rating from 1-5
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} RatingStars component
 */
const RatingStars = ({ rating, className = "", animated = true }) => {
  const { animationEnabled } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;

  // Container and star animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        damping: 12
      }
    }
  };
  
  // Hover animation for stars
  const hoverAnimation = {
    scale: 1.2,
    rotate: 5,
    transition: { duration: 0.2 }
  };

  return (
    <motion.div 
      className={`flex mb-4 text-primary rating-stars ${className}`} 
      aria-label={`${rating} out of 5 stars`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? containerVariants : {}}
    >
      {[...Array(5)].map((_, i) => (
        <motion.div 
          key={i}
          variants={shouldAnimate ? starVariants : {}}
          whileHover={shouldAnimate ? hoverAnimation : {}}
        >
          <FaStar 
            className="star mr-1 text-sm" 
            color={i < rating ? '#64ffda' : '#343a40'}
            aria-hidden="true"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  className: PropTypes.string,
  animated: PropTypes.bool
};

export default RatingStars;
