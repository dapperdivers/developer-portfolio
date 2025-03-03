import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Card from "./ui/Card";
import ResponsiveImage from "./ui/ResponsiveImage";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import useImageColor from "../hooks/useImageColor";
import useCallbackHandlers from '../hooks/useCallbackHandlers';
import { useMemo } from 'react';
import './ExperienceCard.css';

/**
 * Experience card component for displaying job experience information.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.data - Experience data object
 * @param {string} props.data.company - Company name
 * @param {string} props.data.role - Job role
 * @param {string} props.data.date - Employment date range
 * @param {string} props.data.desc - Job description
 * @param {string} props.data.companylogo - Company logo URL
 * @param {string[]} [props.data.descBullets] - Array of description bullet points
 * @param {number} [props.index=0] - Index number for staggered animations
 * @returns {React.ReactElement} ExperienceCard component
 */
const ExperienceCard = ({ data, index = 0 }) => {
    const [ref, isInView] = useIntersectionObserver({ 
      threshold: 0.1,
      rootMargin: "-50px 0px" 
    });
    
    const { color, getColorFromImage, resetToDefaultColor, rgbToString } = useImageColor();
    const { handleExternalLink } = useCallbackHandlers();
    
    // Memoize animation configuration to prevent unnecessary recalculations
    const animation = useMemo(() => ({
      initial: { opacity: 0, y: 30 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
      transition: { 
        duration: 0.5, 
        delay: 0.1 * (index % 3), 
        ease: "easeOut" 
      }
    }), [isInView, index]);
    
    // Custom header for the card with extracted color
    const header = useMemo(() => (
        <div 
            className="experience-card-header"
            style={{ backgroundColor: rgbToString(color) }}
            aria-label={`${data.company} header`}
        >
            <h5 className="company-name" tabIndex="0">{data.company}</h5>
        </div>
    ), [data.company, color, rgbToString]);
    
    return (
        <div className="experience-card" ref={ref}>
            <Card 
                className="text-center h-100"
                animation={animation}
                header={header}
                shadow
            >
                <div className="company-logo-container">
                    <ResponsiveImage 
                        className="company-logo" 
                        src={data.companylogo} 
                        alt={`${data.company} logo`}
                        onLoad={(evt) => evt && evt.target && getColorFromImage(evt.target)}
                        onError={resetToDefaultColor}
                        lazy={true}
                    />
                </div>
                
                <h5 className="job-title" id={`role-${index}`} tabIndex="0">{data.role}</h5>
                <div 
                    className="date-range" 
                    tabIndex="0"
                    aria-labelledby={`role-${index}`}
                >{data.date}</div>
                
                <div className="description text-start">
                    <div tabIndex="0">{data.desc}</div>
                    {data.descBullets && data.descBullets.length > 0 && (
                        <ul aria-label={`Responsibilities at ${data.company}`}>
                            {data.descBullets.map((desc, i) => (
                                <li key={`${data.company}-bullet-${i}`} tabIndex="0">{desc}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </Card>
        </div>
    );
};

ExperienceCard.propTypes = {
    data: PropTypes.shape({
        company: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        companylogo: PropTypes.string.isRequired,
        descBullets: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    index: PropTypes.number
};

// Applying memoization for performance optimization
export default memo(ExperienceCard);
