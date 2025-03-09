import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import EducationCard from '@molecules/EducationCard';
import { useEducation } from '@context/PortfolioContext';
import Section from '@layout/Section';
import './Education.css';

/**
 * Education section component displaying educational history
 * 
 * @component
 */
const Education = () => {
  const educationData = useEducation();

  if (!educationData || educationData.length === 0) {
    return (
      <Section
        id="education"
        title="Education & Certifications"
        subtitle="My academic background and professional credentials"
        data-testid="education-section"
        className="education-section"
      >
        <p>No education information available.</p>
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
        className="education-cards-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.2 }}
      >
        {educationData.map((education, index) => (
          <motion.div
            key={`education-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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

// PropTypes are no longer needed since we're using the context
export default Education;
