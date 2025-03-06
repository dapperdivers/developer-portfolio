import React, { memo } from "react";
import PropTypes from 'prop-types';
import { FaGraduationCap } from 'react-icons/fa';
import Card from '@atoms/Card';
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import './EducationCard.css';

/**
 * Education card component for displaying educational background.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.education - Education data object
 * @param {string} props.education.schoolName - Name of the school or institution
 * @param {string} props.education.subHeader - Degree or certification title
 * @param {string} props.education.duration - Time period of education
 * @param {string} [props.education.desc] - Description or details
 * @param {Array} [props.education.descBullets] - Array of bullet points for additional details
 * @param {number} [props.index=0] - Index number for staggered animations
 * @returns {React.ReactElement} EducationCard component
 */
const EducationCard = ({ education, index = 0 }) => {
  const [ref, isInView] = useIntersectionObserver({ 
    threshold: 0.1,
    rootMargin: "-100px 0px" 
  });
  
  // Animation for the card
  const animation = {
    initial: { opacity: 0, x: -20 },
    animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 },
    transition: { 
      duration: 0.5, 
      delay: 0.2 + (index * 0.1),
      ease: "easeOut"
    }
  };
  
  return (
    <div className="relative mb-8 transition-all duration-300" ref={ref} data-testid="education-card">
      {/* Timeline dot */}
      <div className="absolute left-[-28px] top-6 w-4 h-4 rounded-full bg-white border-2 border-primary-400 z-10 shadow-md hidden md:block"></div>
      
      {/* Graduation cap icon - visible only on larger screens */}
      <div className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-gradient-to-r from-white to-gray-100 shadow-md mb-4">
        <FaGraduationCap className="text-primary-500 text-lg" />
      </div>
      
      <Card 
        className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        animation={animation}
        shadow
      >
        <div className="p-6">
          <h5 
            className="text-primary-600 font-bold text-xl mb-2" 
            tabIndex="0"
          >
            {education.schoolName}
          </h5>
          
          <h6 
            className="font-semibold text-gray-800 mb-3" 
            tabIndex="0"
          >
            {education.subHeader}
          </h6>
          
          <span 
            className="bg-primary-50 text-primary-600 font-semibold px-3 py-1 rounded-full text-xs tracking-wide mb-4 inline-block"
            aria-label={`Duration: ${education.duration}`}
          >
            {education.duration}
          </span>
          
          {education.desc && (
            <p 
              className="text-gray-600 text-sm leading-relaxed mt-3" 
              tabIndex="0"
            >
              {education.desc}
            </p>
          )}
          
          {education.descBullets && education.descBullets.length > 0 && (
            <ul 
              className="pl-5 mt-3 space-y-2" 
              aria-label="Additional information"
            >
              {education.descBullets.map((desc, i) => (
                <li 
                  key={i} 
                  className="text-gray-600 text-sm list-disc" 
                  tabIndex="0"
                >
                  {desc}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </div>
  );
};

EducationCard.propTypes = {
  education: PropTypes.shape({
    schoolName: PropTypes.string.isRequired,
    subHeader: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    desc: PropTypes.string,
    descBullets: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  index: PropTypes.number
};

// Apply memoization for performance optimization
export default memo(EducationCard);
