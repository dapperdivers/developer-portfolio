import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import TimelineEntry from '@molecules/TimelineEntry/TimelineEntry';
import SkeletonCard from '@atoms/SkeletonCard';
import './ExperienceTimeline.css';

/**
 * ExperienceTimeline component for rendering experience entries in a visually engaging vertical timeline
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.experience - Array of experience data objects
 * @param {Function} props.extractDateYear - Function to extract year from date string
 * @returns {React.ReactElement} ExperienceTimeline component
 */
const ExperienceTimeline = ({ experience, extractDateYear }) => {
  // Animation delay calculation
  const getAnimationDelay = (index) => `${0.15 * index}s`;
  
  // Get decorative quote elements (random quotes about experience/career)
  const decorativeQuotes = useMemo(() => [
    "Experience is the teacher of all things",
    "The only source of knowledge is experience",
    "Experience is what you get when you didn't get what you wanted"
  ], []);

  return (
    <div 
      className="experience-timeline-container" 
      data-testid="experience-timeline"
    >
      {/* Main timeline wrapper */}
      <div 
        className="experience-timeline" 
        aria-label={`${experience.length} work experiences in timeline format`}
      >
        <div className="timeline-main-line"></div>
        
        {/* Decorative elements */}
        <div className="timeline-decorative-quotes">
          {decorativeQuotes.map((quote, i) => (
            <div 
              key={`quote-${i}`} 
              className="timeline-quote"
              style={{ 
                top: `${(i + 1) * 25}%`, 
                left: i % 2 === 0 ? '15%' : '75%',
                opacity: 0.04
              }}
              aria-hidden="true"
            >
              {quote}
            </div>
          ))}
        </div>
        
        {/* Timeline entries */}
        {experience.map((data, i) => (
          <TimelineEntry
            key={`experience-timeline-${data.company}-${i}`}
            data={data}
            index={i}
            extractDateYear={extractDateYear}
            animationDelay={getAnimationDelay(i)}
          />
        ))}
      </div>
    </div>
  );
};

ExperienceTimeline.propTypes = {
  experience: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      companylogo: PropTypes.string.isRequired,
      descBullets: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  extractDateYear: PropTypes.func.isRequired
};

export default memo(ExperienceTimeline);
