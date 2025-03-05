import React, { memo } from 'react';

import EducationCard from "../components/EducationCard";
import Section from "../components/layout/Section";
import useEducation from "../hooks/useEducation";
import "../assets/css/tailwind.css";

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
      className="education-section"
      separator="true"
    >
      <div className="flex flex-wrap -mx-4 education-timeline align-items-start">
        {educationInfo.map((info, index) => (
          <div key={`education-${index}`} className="w-full px-4 lg:w-6/12 education-card mb-4">
            <EducationCard education={info} index={index} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default memo(Education);
