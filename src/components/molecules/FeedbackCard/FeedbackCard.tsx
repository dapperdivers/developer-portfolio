import React, { memo, useMemo } from "react";
import { motion, Variants } from 'framer-motion';
import { useMotionEnabled } from '@utils/motion';
import Card from '@atoms/Card';
import RatingStars from '@atoms/RatingStars';
import FeedbackQuote from '@molecules/FeedbackQuote';
import FeedbackAuthor from '@molecules/FeedbackAuthor/FeedbackAuthor';
import FeedbackHighlight from '@molecules/FeedbackHighlight';
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import './FeedbackCard.css';
import type { Feedback } from '@/types/portfolio';

export interface FeedbackCardProps {
  /** Feedback data object */
  data: Feedback;
  /** Index number for staggered animations */
  index?: number;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * Enhanced feedback card component for displaying testimonials.
 * 
 * Built from small sub-components on the shared card surface: rating, an optional
 * highlighted pull quote, the quote itself and the author (photo or initials badge).
 * 
 * @component
 */
const FeedbackCard = ({ data, index = 0, animated = true }: FeedbackCardProps) => {
  const [ref, isInView] = useIntersectionObserver({ 
    threshold: 0.1,
    rootMargin: "-50px 0px" 
  });
  
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);
  
  // Generate a rating based on the feedback length or use a default of 5
  const rating = data.rating || 5;
  
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
  const cardVariants: Variants = {
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
  
  return (
    <motion.div 
      ref={ref}
      className="feedback-card-wrapper"
      initial={shouldAnimate ? "hidden" : "visible"}
      animate={isInView && shouldAnimate ? "visible" : "visible"}
      variants={shouldAnimate ? cardVariants : {}}
    >
      <Card className="feedback-card" shadow animated={animated}>
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
            avatar={data.avatar}
            animated={shouldAnimate} 
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default memo(FeedbackCard);
