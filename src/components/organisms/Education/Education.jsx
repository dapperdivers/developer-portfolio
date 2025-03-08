import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import EducationCard from '@molecules/EducationCard';
import './Education.css';

/**
 * Education section component displaying educational history
 * 
 * @component
 */
const Education = ({ educationData }) => {
  if (!educationData || educationData.length === 0) {
    return null;
  }

  return (
    <section id="education" className="education-section">
      <div className="education-content">
        <SectionHeader
          title="Education & Certifications"
          subtitle="My academic background and professional credentials"
          className="education-section-header"
          titleClassName="education-section-title"
          subtitleClassName="education-section-subtitle"
        />

        <div className="education-main">
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
        </div>
      </div>
    </section>
  );
};

Education.propTypes = {
  educationData: PropTypes.arrayOf(
    PropTypes.shape({
      schoolName: PropTypes.string.isRequired,
      degree: PropTypes.string.isRequired,
      duration: PropTypes.string,
      description: PropTypes.string,
      certifications: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        issuer: PropTypes.string,
        date: PropTypes.string,
        url: PropTypes.string
      }))
    })
  ).isRequired
};

export default Education;
