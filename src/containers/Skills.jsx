import React, { memo } from 'react';
import DisplayLottie from '../components/DisplayLottie';
import webdev from '../assets/lottie/webdev.json';
import { motion } from "framer-motion";
import { Row, Col } from "reactstrap";
import Skill from "../components/ui/Skill";
import Section from "../components/layout/Section";
import useSkills from "../hooks/useSkills";
import '../assets/css/skills-section.css';

/**
 * Skills component that displays a grid of skills icons and descriptions.
 * 
 * @component
 * @returns {React.ReactElement} Skills component
 */
const Skills = () => {
  const { skillsSection } = useSkills();
  
  // Animation config for framer-motion
  const animation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
  };
  
  // Text entry animations
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.6, duration: 0.5 }
    }
  };
  
  const skillTextVariants = (index) => ({
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.7 + (index * 0.1) }
    }
  });
  
  return (
    <Section
      id="skills"
      title={skillsSection.title}
      subtitle={skillsSection.subTitle}
      animation={animation}
      className="skills-section"
    >
      <Row className="align-items-center">
        <Col lg="6">
          <div className="skills-animation">
            <DisplayLottie animationData={webdev} />
          </div>
        </Col>
        
        <Col lg="6">
          <div className="skills-grid">
            {skillsSection.softwareSkills.map((skill, index) => (
              <Skill 
                key={skill.skillName} 
                skill={skill}
                index={index}
                size="lg"
              />
            ))}
          </div>
          
          <motion.div 
            className="skills-description"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            {skillsSection.skills.map((skill, index) => (
              <motion.p 
                key={index} 
                className="skill-text" 
                tabIndex="0"
                variants={skillTextVariants(index)}
              >
                {skill}
              </motion.p>
            ))}
          </motion.div>
        </Col>
      </Row>
    </Section>
  );
};

export default memo(Skills);
