import React, { memo } from 'react';
import { Row, Col } from "reactstrap";
import EducationCard from "../components/EducationCard";
import Section from "../components/layout/Section";
import useEducation from "../hooks/useEducation";
import "../assets/css/education-section.css";

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
      background="gradient"
      separator
    >
      <Row className="education-timeline align-items-start">
        {educationInfo.map((info, index) => (
          <Col 
            lg="6" 
            key={info.schoolName}
            className="education-card mb-4"
          >
            <EducationCard education={info} index={index} />
          </Col>
        ))}
      </Row>
    </Section>
  );
};

export default memo(Education);
