import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EducationCard from "../components/EducationCard";
import Section from "../components/layout/Section";
import useEducation from "../hooks/useEducation";

/**
 * Education section displaying a list of educational background items.
 * 
 * @component
 * @returns {React.ReactElement} Education component
 */
const Education = () => {
  const educationInfo = useEducation();
  
  // Animation config for framer-motion
  const animation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
  };
  
  return (
    <Section
      id="education"
      title="Education"
      icon="simple-icons:graduation-cap"
      animation={animation}
      className="py-16"
      separator="true"
      data-testid="education-section"
    >
      {educationInfo.length > 0 ? (
        <div className="relative pl-0 md:pl-6 md:before:absolute md:before:left-0 md:before:top-0 md:before:bottom-0 md:before:w-0.5 md:before:bg-gradient-to-b md:before:from-gray-300 md:before:to-gray-100 md:before:rounded">
          <div className="flex flex-wrap -mx-4 items-start">
            {educationInfo.map((info, index) => (
              <div 
                key={`education-${index}`} 
                className="w-full px-4 lg:w-6/12"
              >
                <EducationCard education={info} index={index} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">No education information available.</p>
        </div>
      )}
    </Section>
  );
};

Education.propTypes = {
  /* No props for this component as it uses context */
};

export default memo(Education);
