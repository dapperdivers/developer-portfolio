import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAnimation } from '@context//AnimationContext';
import EducationCard from '@molecules/EducationCard';
import { useEducation } from '@context/PortfolioContext';
import Section from '@layout/Section';
import './Education.css';

/**
 * Education section component displaying educational history
 * Enhanced with framer-motion animations that respect user preferences
 * 
 * @component
 */
const Education = () => {
  const educationData = useEducation();
  const { animationEnabled, fadeInVariants, slideUpVariants } = useAnimation();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  });
  
  // Animation variants
  const containerVariants = {
    ...fadeInVariants,
    visible: {
      ...fadeInVariants.visible,
      transition: {
        ...fadeInVariants.visible.transition,
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };
  
  const cardVariants = {
    ...slideUpVariants,
    visible: (index) => ({ 
      ...slideUpVariants.visible,
      transition: {
        ...slideUpVariants.visible.transition,
        delay: index * 0.1
      }
    })
  };

  if (!educationData || educationData.length === 0) {
    return (
      <Section
        id="education"
        title="Education & Certifications"
        subtitle="My academic background and professional credentials"
        data-testid="education-section"
        className="education-section"
      >
        <motion.p
          variants={fadeInVariants}
          initial={animationEnabled ? "hidden" : false}
          animate={animationEnabled ? "visible" : false}
        >
          No education information available.
        </motion.p>
      </Section>
    );
  }

  return (
    <Section
      id="education"
      title="Education & Certifications"
      subtitle="My academic background and professional credentials"
      data-testid="education-section"
      className="education-section"
    >
      <motion.div 
        ref={containerRef}
        className="education-cards-container"
        initial={animationEnabled ? "hidden" : false}
        animate={animationEnabled && isInView ? "visible" : false}
        variants={containerVariants}
      >
        {educationData.map((education, index) => (
          <motion.div
            key={`education-${index}`}
            variants={cardVariants}
            custom={index}
            className="education-card-wrapper"
          >
            <EducationCard 
              education={education}
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default Education;
