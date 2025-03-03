import React, { memo, useMemo } from 'react';
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
 * Showcases the developer's technical skills with interactive icons and 
 * descriptions arranged in a responsive grid layout.
 * 
 * @component
 * @returns {React.ReactElement} Skills component
 * 
 * @example
 * // Usage in App.jsx
 * import Skills from './containers/Skills';
 * 
 * const App = () => (
 *   <main>
 *     <Skills />
 *   </main>
 * );
 */
const Skills = () => {
  const { skillsSection } = useSkills();
  
  // Animation config for framer-motion
  const sectionAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
  }), []);
  
  // Text entry animations
  const textVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.6, duration: 0.5 }
    }
  }), []);
  
  // Function to generate staggered animations for skill text items
  const getSkillTextVariants = useMemo(() => (index) => ({
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.7 + (index * 0.1) }
    }
  }), []);
  
  return (
    <Section
      id="skills"
      title={skillsSection.title}
      subtitle={skillsSection.subTitle}
      animation={sectionAnimation}
      className="skills-section"
      aria-label="Developer skills and technologies"
    >
      <Row className="align-items-center">
        <Col lg="6">
          <div 
            className="skills-animation"
            aria-hidden="true" // Animation is decorative
          >
            <DisplayLottie animationData={webdev} />
          </div>
        </Col>
        
        <Col lg="6">
          <div 
            className="skills-grid"
            aria-label={`${skillsSection.softwareSkills.length} technical skills`}
          >
            {skillsSection.softwareSkills.map((skill, index) => (
              <Skill 
                key={`skill-${skill.skillName}`} 
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
                key={`skill-desc-${index}`} 
                className="skill-text" 
                tabIndex="0"
                variants={getSkillTextVariants(index)}
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
