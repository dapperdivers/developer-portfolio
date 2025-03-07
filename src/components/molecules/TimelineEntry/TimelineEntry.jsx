import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import ExperienceCard from '@molecules/ExperienceCard';
import './TimelineEntry.css';

/**
 * TimelineEntry component that renders an experience card within a timeline layout
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.data - Experience data object
 * @param {number} props.index - Index of the entry for animation sequencing
 * @param {Function} props.extractDateYear - Function to extract year from date string
 * @param {React.RefObject} props.entryRef - Ref for the entry for intersection observer
 * @param {string} props.animationDelay - Animation delay for the entry
 * @returns {React.ReactElement} TimelineEntry component
 */
const TimelineEntry = ({ 
  data, 
  index, 
  extractDateYear, 
  entryRef,
  animationDelay 
}) => {
  const [isInView, setIsInView] = useState(false);
  const isEven = index % 2 === 0;
  
  // Set up animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 300 * index);
    
    return () => clearTimeout(timer);
  }, [index]);
  
  // Animation variants
  const slideVariants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? -50 : 50,
      y: 20,
      scale: 0.95,
      rotateY: isEven ? -5 : 5
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: { 
        duration: 0.7, 
        delay: 0.1 * index,
        ease: [0.43, 0.13, 0.23, 0.96] // Custom easing curve
      }
    }
  };
  
  // Date bubble animation
  const bubbleVariants = {
    hidden: { 
      scale: 0.6,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.5, 
        delay: 0.2 * index + 0.3,
        ease: "backOut"
      }
    }
  };
  
  // Connector dot animation
  const dotVariants = {
    hidden: { 
      scale: 0,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.4, 
        delay: 0.1 * index + 0.2,
        ease: "backOut"
      }
    }
  };
  
  return (
    <motion.div 
      className="timeline-entry"
      // Don't use the ref for now to avoid TypeScript errors
      // We can add it back if needed after fixing the type issues
      style={{ 
        transitionDelay: animationDelay
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={slideVariants}
      viewport={{ once: true, margin: "-50px 0px" }}
    >
      <div className="timeline-connector">
        <motion.div 
          className="timeline-dot"
          variants={dotVariants}
        />
        <div className="timeline-line"></div>
      </div>
      
      <div className="timeline-date-container">
        <motion.div 
          className="timeline-date" 
          aria-label={`Work period: ${data.date}`}
          variants={bubbleVariants}
        >
          {extractDateYear(data.date)}
        </motion.div>
      </div>
      
      <div className="timeline-card-container">
        <ExperienceCard 
          data={data} 
          index={index} 
        />
      </div>
      
      {/* Decorative elements - tech icons related to job */}
      <div className="timeline-decorative-elements">
        {index % 3 === 0 && (
          <div className="tech-badge" style={{ top: '15%', right: isEven ? 'auto' : '-20px', left: isEven ? '-20px' : 'auto' }}>
            <span className="tech-icon">&#60;/&#62;</span>
          </div>
        )}
        {index % 3 === 1 && (
          <div className="tech-badge" style={{ bottom: '10%', right: isEven ? 'auto' : '-15px', left: isEven ? '-15px' : 'auto' }}>
            <span className="tech-icon">&#123;&#125;</span>
          </div>
        )}
        {index % 3 === 2 && (
          <div className="tech-badge" style={{ top: '40%', right: isEven ? 'auto' : '-25px', left: isEven ? '-25px' : 'auto' }}>
            <span className="tech-icon">&#60;&#62;</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

TimelineEntry.propTypes = {
  data: PropTypes.shape({
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    companylogo: PropTypes.string.isRequired,
    descBullets: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  index: PropTypes.number.isRequired,
  extractDateYear: PropTypes.func.isRequired,
  entryRef: PropTypes.func, // Optional
  animationDelay: PropTypes.string
};

export default memo(TimelineEntry);
