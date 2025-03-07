import React from "react";
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import './RatingStars.css';

/**
 * A component that displays a star rating.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} props.rating - Rating from 1-5
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} RatingStars component
 */
const RatingStars = ({ rating, className = "" }) => {
  return (
    <div 
      className={`flex mb-4 text-primary rating-stars ${className}`} 
      aria-label={`${rating} out of 5 stars`}
    >
      {[...Array(5)].map((_, i) => (
        <FaStar 
          key={i} 
          className="star mr-1 text-sm" 
          color={i < rating ? '#64ffda' : '#343a40'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default RatingStars;
