import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EducationCard from '@molecules/EducationCard';
import Section from '@layout/Section';
import useEducation from "@hooks/useEducation";

/**
 * Education section displaying educational background with integrated certifications.
 * Redesigned for better visual presentation with combined education and certification display.
 * 
 * @component
 * @returns {React.ReactElement} Education component
 */
const Education = () => {
  const educationInfo = useEducation();
  
  // Animation config for framer-motion - main section animation
  const sectionAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  };
  
  return (
    <Section
      id="education"
      title="Education"
      animation={sectionAnimation}
      className="education-section"
      data-testid="education-section"
    >
      {educationInfo.length > 0 ? (
        <div className="education-content">
          {/* Education card with integrated certifications */}
          <div className="education-main education-card-animate">
            <EducationCard 
              education={educationInfo[0]} 
              index={0}
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-300">No education information available.</p>
        </div>
      )}
    </Section>
  );
};

Education.propTypes = {
  /* No props for this component as it uses context */
};

export default memo(Education);
