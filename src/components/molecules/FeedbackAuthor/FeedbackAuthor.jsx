import React from "react";
import PropTypes from 'prop-types';
import ResponsiveImage from '@atoms/ResponsiveImage';
import './FeedbackAuthor.css';

/**
 * Component for displaying author information in feedback cards.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - Author's name
 * @param {string} props.role - Author's role or designation
 * @param {string} props.avatar - URL to author's avatar image
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} FeedbackAuthor component
 */
const FeedbackAuthor = ({ name, role, avatar, className = "" }) => {
  return (
    <div className={`flex items-center author-container ${className}`}>
      <div className="author-image-container w-10 h-10 mr-3 overflow-hidden">
        <ResponsiveImage 
          src={avatar} 
          alt={`${name}`} 
          className="rounded-full border border-primary object-cover author-image w-10 h-10"
          lazy={true}
        />
      </div>
      
      <div className="author-info">
        <h5 
          className="font-bold text-primary text-base mb-0.5 author-name" 
          tabIndex={0}
        >
          {name}
        </h5>
        <p 
          className="text-text-muted text-xs author-role" 
          tabIndex={0}
        >
          {role}
        </p>
      </div>
    </div>
  );
};

FeedbackAuthor.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default FeedbackAuthor;
