import React, { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import Card from '@atoms/Card';
import RatingStars from '@atoms/RatingStars';
import FeedbackQuote from '@molecules/FeedbackQuote';
import FeedbackAuthor from '@molecules/FeedbackAuthor';
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
 * @returns {React.ReactElement} FeedbackCard component
 */
const FeedbackCard = ({ data, index = 0 }) => {
  const [ref, isInView] = useIntersectionObserver({ 
    threshold: 0.1,
    rootMargin: "-50px 0px" 
  });
  
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
    
    // If found a good sentence, use it; otherwise return null
    return highlightSentence ? highlightSentence.trim() : null;
  }, [data.feedback, data.highlight]);
  
  // Enhanced animation for the card
  const animation = {
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { 
      duration: 0.5, 
      delay: 0.1 * (index % 3), 
      ease: "easeOut" 
    }
  };
  
  return (
    <div className="h-full transition-all duration-300 feedback-card-wrapper" ref={ref} data-testid="feedback-card">
      <Card 
        className="h-full overflow-hidden hover:-translate-y-2 hover:shadow-lg transition-all duration-300 bg-theme-navy feedback-card"
        animation={animation}
        shadow
      >
        <div className="p-6 flex flex-col h-full bg-theme-navy relative feedback-content">
          {/* Decorative elements */}
          <div className="feedback-decoration-top"></div>
          <div className="feedback-decoration-bottom"></div>
          
          {/* Rating stars component */}
          <RatingStars rating={rating} className="mb-3" />
          
          {/* Highlight section (if applicable) */}
          {highlightText && (
            <FeedbackHighlight text={highlightText} className="mb-3" />
          )}
          
          {/* Quote content component */}
          <FeedbackQuote text={data.feedback} />
          
          {/* Author info component */}
          <div className="mt-auto pt-4 border-t border-primary border-opacity-20">
            <FeedbackAuthor 
              name={data.name}
              role={role}
              avatar={avatar}
            />
          </div>
        </div>
      </Card>
    </div>
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
  index: PropTypes.number
};

// Apply memoization for performance optimization
export default memo(FeedbackCard);
