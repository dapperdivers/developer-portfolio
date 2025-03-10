import React, { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAnimation } from '@context/AnimationContext';
import Card from '@atoms/Card';
import RatingStars from '@atoms/RatingStars';
import FeedbackQuote from '@molecules/FeedbackQuote';
import FeedbackAuthor from '@molecules/FeedbackAuthor/FeedbackAuthor';
import FeedbackHighlight from '@molecules/FeedbackHighlight';
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import './FeedbackCard.css';

/**
 * Enhanced feedback card component for displaying testimonials.
 * 
 * This component has been refactored to use smaller, more manageable sub-components
 * and enhanced with a highlighted section to draw focus to key parts of the feedback.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.data - Feedback data object
 * @param {string} props.data.name - Name of the person giving feedback
 * @param {string} props.data.feedback - The feedback text
 * @param {string} [props.data.highlight] - Optional highlighted portion of the feedback
 * @param {string} [props.data.avatar] - URL to avatar image
 * @param {string} [props.data.designation] - Job title or designation of the person
 * @param {number} [props.data.rating] - Rating from 1-5
 * @param {number} [props.index=0] - Index number for staggered animations
 * @param {boolean} [props.animated=true] - Whether to animate the component
 * @returns {React.ReactElement} FeedbackCard component
 */
const FeedbackCard = ({ data, index = 0, animated = true }) => {
  const [ref, isInView] = useIntersectionObserver({ 
    threshold: 0.1,
    rootMargin: "-50px 0px" 
  });
  
  const { animationEnabled, getAnimationDelay } = useAnimation();
  
  // Only use animations if both props are enabled
  const shouldAnimate = animated && animationEnabled;
  
  // Generate a rating based on the feedback length or use a default of 5
  const rating = data.rating || 5;
  
  // Default avatar if none is provided - using a data URI for a generic user avatar to avoid CSP issues
  const avatar = data.avatar || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cccccc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
  
  // Extract job title/role or use a default
  const role = data.designation || "Client";
  
  // Check for highlighted text or extract something impactful
  const highlightText = useMemo(() => {
    // If highlight is explicitly provided, use it
    if (data.highlight) return data.highlight;
    
    // Otherwise try to automatically extract a good highlight
    const feedback = data.feedback || "";
    
    // Try to find an impactful sentence with common keywords
    const sentences = feedback.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const keywords = ['excellent', 'amazing', 'outstanding', 'great', 'best', 'recommend', 'impressed', 'professional'];
    
    // Find a sentence containing at least one keyword
    const highlightSentence = sentences.find(sentence => 
      keywords.some(keyword => sentence.toLowerCase().includes(keyword))
    );
    
    // If found a good sentence, return it, otherwise return the first sentence (if it's not too long)
    if (highlightSentence) return highlightSentence.trim();
    if (sentences[0] && sentences[0].length < 100) return sentences[0].trim();
    
    // Return nothing if can't find a good highlight
    return '';
  }, [data.feedback, data.highlight]);
  
  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: index * 0.1
      }
    }
  };
  
  // Hover animation for the card
  const hoverVariants = {
    hover: { 
      y: -10,
      rotateX: 5,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(100, 255, 218, 0.1)",
      transition: { 
        duration: 0.4,
        ease: [0.175, 0.885, 0.32, 1.275]
      }
    }
  };
  
  // Decoration animation variants
  const decorationVariants = {
    initial: { opacity: 0.3, scale: 1 },
    hover: { 
      opacity: 0.7, 
      scale: 1.1, 
      filter: "blur(1px)",
      transition: { duration: 0.4, yoyo: Infinity, repeatDelay: 0.5 }
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="feedback-card-wrapper"
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={isInView && shouldAnimate ? "visible" : "visible"}
      whileHover={shouldAnimate ? "hover" : ""}
      variants={shouldAnimate ? cardVariants : {}}
    >
      <Card className="feedback-card" padded elevated>
        {/* Decorative elements */}
        <motion.div 
          className="feedback-decoration-top"
          variants={shouldAnimate ? decorationVariants : {}}
          initial="initial"
          animate={isInView && shouldAnimate ? "initial" : "initial"}
          whileHover="hover"
        ></motion.div>
        
        <motion.div 
          className="feedback-decoration-bottom"
          variants={shouldAnimate ? decorationVariants : {}}
          initial="initial"
          animate={isInView && shouldAnimate ? "initial" : "initial"}
          whileHover="hover"
        ></motion.div>
        
        {/* Main content */}
        <div className="feedback-content">
          {/* Rating stars */}
          <RatingStars rating={rating} animated={shouldAnimate} />
          
          {/* Highlighted excerpt */}
          {highlightText && (
            <FeedbackHighlight text={highlightText} animated={shouldAnimate} />
          )}
          
          {/* Main feedback quote */}
          <FeedbackQuote text={data.feedback} animated={shouldAnimate} />
          
          {/* Author information */}
          <FeedbackAuthor 
            name={data.name} 
            role={role} 
            avatar={avatar}
            animated={shouldAnimate} 
          />
        </div>
      </Card>
    </motion.div>
  );
};

FeedbackCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    feedback: PropTypes.string.isRequired,
    highlight: PropTypes.string,
    avatar: PropTypes.string,
    designation: PropTypes.string,
    rating: PropTypes.number
  }).isRequired,
  index: PropTypes.number,
  animated: PropTypes.bool
};

export default memo(FeedbackCard);
