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
  const { animationEnabled } = useAnimation();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true,
    amount: 0.1,
    margin: "0px 0px -100px 0px"
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5,
        when: "beforeChildren"
      }
    }
  };
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: (index) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
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
          initial={animationEnabled ? { opacity: 0 } : false}
          animate={animationEnabled ? { opacity: 1 } : false}
          transition={{ duration: 0.5 }}
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
