import React from "react";
import { motion, Variants } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { useMotionEnabled } from '@utils/motion';
import './RatingStars.css';

export interface RatingStarsProps {
  /** Rating from 1-5 */
  rating: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * A component that displays a star rating.
 * 
 * @component
 */
const RatingStars = ({ rating, className = "", animated = true }: RatingStarsProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);

  // Container and star animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const starVariants: Variants = {
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

export default RatingStars;
