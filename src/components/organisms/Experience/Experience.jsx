import React, { memo, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';
import SkeletonCard from '@atoms/SkeletonCard';
import Section from '@layout/Section';
import ConsoleHeader from '@atoms/ConsoleHeader/ConsoleHeader';
import ExperienceCard from '@molecules/ExperienceCard';
import { usePortfolio } from "@context/PortfolioContext";
import { useAnimation } from "@context//AnimationContext";
import { experience as experienceData } from '../../../portfolio';
import './Experience.css';

/**
 * Experience section component displaying professional work history in a grid layout.
 * Enhanced with framer-motion animations that respect user preferences.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} [props.isLoading] - Whether the component is in loading state
 * @returns {React.ReactElement} Experience section component
 */
const Experience = ({ isLoading: forcedLoading }) => {
  // Get portfolio data
  const { isLoading: contextLoading } = usePortfolio();
  
  // Get animation settings from context
  const { animationEnabled, fadeInVariants, slideUpVariants } = useAnimation();
  
  // Reference for scroll animation
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -100px 0px"
  });
  
  // Use the directly imported experience data from portfolio.js
  // Fallback to context data only if needed
  const experience = experienceData || [];
  
  // Determine section title and subtitle
  const sectionTitle = "Professional Experience";
  const sectionSubtitle = "My career journey and professional highlights";
  
  // Determine number of skeleton cards to show
  const skeletonCount = useMemo(() => 3, []);
  
  // Loading and error state flags
  const isLoading = forcedLoading || contextLoading;
  const hasError = !isLoading && (!experience || experience.length === 0);
  
  // Animation variants for framer-motion
  const sectionVariants = {
    ...fadeInVariants,
    visible: {
      ...fadeInVariants.visible,
      transition: {
        ...fadeInVariants.visible.transition,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const headerVariants = {
    ...slideUpVariants,
    visible: {
      ...slideUpVariants.visible,
      transition: {
        ...slideUpVariants.visible.transition,
        duration: 0.4
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
  
  // Render loading state if experience data is not available
  if (isLoading) {
    return (
      <Section
        id="experience"
        title={sectionTitle}
        subtitle={sectionSubtitle}
        className="experience-section"
        data-testid="experience-section-loading"
      >
        <motion.div 
          className="experience-loading skeleton-staggered"
          ref={sectionRef}
          initial={animationEnabled ? "hidden" : false}
          animate={animationEnabled && isInView ? "visible" : false}
          variants={sectionVariants}
        >
          <AnimatePresence>
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <motion.div 
                key={`skeleton-${i}`}
                variants={cardVariants}
                custom={i}
                data-testid="skeleton-card"
              >
                <SkeletonCard 
                  type="experience" 
                  index={i}
                  data-testid="skeleton-card-content"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    );
  }
  
  // Render empty state if no experience data
  if (hasError) {
    return (
      <Section
        id="experience"
        title={sectionTitle}
        subtitle={sectionSubtitle}
        className="experience-section"
        data-testid="experience-section-empty"
      >
        <motion.div 
          className="experience-empty-state"
          variants={fadeInVariants}
          initial={animationEnabled ? "hidden" : false}
          animate={animationEnabled ? "visible" : false}
        >
          <p>No work experience is currently available.</p>
        </motion.div>
      </Section>
    );
  }
  
  return (
    <Section
      id="experience"
      title={sectionTitle}
      subtitle={sectionSubtitle}
      className="experience-section"
      aria-label="Work experience history"
      data-testid="experience-section"
    >
      <motion.div
        ref={sectionRef}
        initial={animationEnabled ? "hidden" : false}
        animate={animationEnabled && isInView ? "visible" : false}
        variants={sectionVariants}
        className="experience-grid"
      >
        <motion.div variants={headerVariants}>
          <ConsoleHeader
            prompt="root@security:~$"
            command="view --secure professional_experience.json"
            variant="security"
            className="experience-header"
          />
        </motion.div>
        
        <div className="experience-cards">
          {experience.map((item, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              data={{
                role: item.title,
                company: item.company,
                date: item.date,
                desc: item.description,
                descBullets: item.technologies,
                companylogo: item.logo
              }}
              index={index}
              data-testid="experience-card-mock"
            />
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

Experience.propTypes = {
  isLoading: PropTypes.bool
};

// Apply memoization for performance optimization
export default memo(Experience);
