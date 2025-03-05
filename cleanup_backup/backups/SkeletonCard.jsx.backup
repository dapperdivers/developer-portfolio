import React, { memo } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/skeleton-loading.css';

/**
 * SkeletonCard component for use as loading placeholders
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.type='project'] - Type of skeleton ('project', 'experience', 'skill')
 * @param {number} [props.index=0] - Index for staggered animations
 * @param {string} [props.className=''] - Additional CSS class names
 * @param {Object} [props.style={}] - Additional inline styles
 * @returns {React.ReactElement} SkeletonCard component
 */
const SkeletonCard = ({ type = 'project', index = 0, className = '', style = {} }) => {
  const baseClass = `${type}-card-skeleton`;
  const combinedClassName = `${baseClass} ${className}`.trim();
  
  // Calculate animation delay based on index (staggered effect)
  const animationDelay = `${index * 0.15}s`;
  
  // Render different skeleton types
  switch (type) {
    case 'project':
      return (
        <div 
          className={combinedClassName} 
          style={{ ...style, animationDelay }} 
          aria-hidden="true"
          data-testid="skeleton-project"
        >
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-tags"></div>
            <div className="skeleton-actions"></div>
          </div>
          <div className="skeleton-shimmer"></div>
        </div>
      );
      
    case 'experience':
      return (
        <div 
          className={combinedClassName} 
          style={{ ...style, animationDelay }} 
          aria-hidden="true"
          data-testid="skeleton-experience"
        >
          <div className="skeleton-header"></div>
          <div className="skeleton-content">
            <div className="skeleton-image-circle"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
            <div className="skeleton-description"></div>
            <div className="skeleton-description"></div>
          </div>
          <div className="skeleton-shimmer"></div>
        </div>
      );
      
    case 'skill':
      return (
        <div 
          className={combinedClassName} 
          style={{ ...style, animationDelay }} 
          aria-hidden="true"
          data-testid="skeleton-skill"
        >
          <div className="skeleton-icon"></div>
          <div className="skeleton-name"></div>
          <div className="skeleton-shimmer"></div>
        </div>
      );
    
    default:
      return (
        <div 
          className={combinedClassName} 
          style={{ ...style, animationDelay }} 
          aria-hidden="true"
          data-testid="skeleton-default"
        >
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-description"></div>
          </div>
          <div className="skeleton-shimmer"></div>
        </div>
      );
  }
};

SkeletonCard.propTypes = {
  type: PropTypes.oneOf(['project', 'experience', 'skill', 'default']),
  index: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
};

export default memo(SkeletonCard);