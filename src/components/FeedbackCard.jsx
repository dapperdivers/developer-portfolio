import React, { memo, useState } from "react";
import PropTypes from 'prop-types';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Card from "./ui/Card";
import ResponsiveImage from "./ui/ResponsiveImage";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import './FeedbackCard.css';

/**
 * Feedback card component for displaying testimonials.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.data - Feedback data object
 * @param {string} props.data.name - Name of the person giving feedback
 * @param {string} props.data.feedback - The feedback text
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
  
  // Animation for the card
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
    <div className="feedback-card" ref={ref}>
      <Card 
        className="h-100"
        animation={animation}
        shadow
      >
        <div className="rating" aria-label={`${rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className="star" 
              color={i < rating ? 'currentColor' : '#e0e0e0'}
              aria-hidden="true"
            />
          ))}
        </div>
        
        <div className="quote-container">
          <FaQuoteLeft className="quote-icon quote-icon-left" aria-hidden="true" />
          <p className="quote-content" tabIndex="0">
            {data.feedback}
          </p>
          <FaQuoteRight className="quote-icon quote-icon-right" aria-hidden="true" />
        </div>
        
        <div className="author-container">
          <ResponsiveImage 
            src={avatar} 
            alt={`${data.name}`} 
            className="author-image"
            lazy={true}
          />
          
          <div className="author-info">
            <h5 className="author-name" tabIndex="0">{data.name}</h5>
            <p className="author-role" tabIndex="0">{role}</p>
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
    avatar: PropTypes.string,
    designation: PropTypes.string,
    rating: PropTypes.number
  }).isRequired,
  index: PropTypes.number
};

// Apply memoization for performance optimization
export default memo(FeedbackCard);
