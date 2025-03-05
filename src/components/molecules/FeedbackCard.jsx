import React, { memo } from "react";
import PropTypes from 'prop-types';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Card from "@atoms/Card";
import ResponsiveImage from "@atoms/ResponsiveImage";
import useIntersectionObserver from "@hooks/useIntersectionObserver";

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
    <div className="h-full transition-all duration-300" ref={ref} data-testid="feedback-card">
      <Card 
        className="h-full overflow-hidden hover:-translate-y-2 transition-all duration-300"
        animation={animation}
        shadow
      >
        <div className="p-6 flex flex-col h-full">
          {/* Rating stars */}
          <div 
            className="flex mb-4 text-amber-500" 
            aria-label={`${rating} out of 5 stars`}
          >
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className="star mr-1" 
                color={i < rating ? 'currentColor' : '#e0e0e0'}
                aria-hidden="true"
              />
            ))}
          </div>
          
          {/* Quote content */}
          <div className="relative flex-grow mb-5">
            <FaQuoteLeft 
              className="text-gray-200 text-lg absolute top-0 left-0" 
              aria-hidden="true" 
            />
            <p 
              className="pl-7 pr-7 text-gray-600 italic text-sm leading-relaxed relative border-l-3 border-primary-300" 
              tabIndex="0"
            >
              {data.feedback}
            </p>
            <FaQuoteRight 
              className="text-gray-200 text-lg absolute bottom-0 right-0" 
              aria-hidden="true" 
            />
          </div>
          
          {/* Author info */}
          <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
            <ResponsiveImage 
              src={avatar} 
              alt={`${data.name}`} 
              className="w-12 h-12 rounded-full border-2 border-primary-100 object-cover mr-3"
              lazy={true}
            />
            
            <div>
              <h5 
                className="font-bold text-primary-600 text-base mb-0.5" 
                tabIndex="0"
              >
                {data.name}
              </h5>
              <p 
                className="text-gray-500 text-xs" 
                tabIndex="0"
              >
                {role}
              </p>
            </div>
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
