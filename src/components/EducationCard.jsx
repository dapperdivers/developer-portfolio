import React, { memo } from "react";
import PropTypes from 'prop-types';
import { Badge } from "reactstrap";
import { FaGraduationCap } from 'react-icons/fa';
import Card from "./ui/Card";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
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
    <div className="education-card" ref={ref}>
      <div className="education-icon">
        <FaGraduationCap />
      </div>
      <Card 
        className="education-card-inner"
        animation={animation}
        shadow
      >
        <div className="education-content">
          <h5 className="school-name" tabIndex="0">
            {education.schoolName}
          </h5>
          <h6 className="degree" tabIndex="0">{education.subHeader}</h6>
          
          <Badge 
            color="primary" 
            className="duration-badge"
            aria-label={`Duration: ${education.duration}`}
          >
            {education.duration}
          </Badge>
          
          {education.desc && (
            <p className="description" tabIndex="0">{education.desc}</p>
          )}
          
          {education.descBullets && education.descBullets.length > 0 && (
            <ul aria-label="Additional information">
              {education.descBullets.map((desc, i) => (
                <li key={i} tabIndex="0">{desc}</li>
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
