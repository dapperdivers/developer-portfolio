import React, { memo, useMemo } from "react";
import PropTypes from 'prop-types';
import SkeletonCard from '@atoms/SkeletonCard';
import Section from '@layout/Section';
import ConsoleHeader from '@atoms/ConsoleHeader/ConsoleHeader';
import useExperience from "@hooks/useExperience";
import { usePortfolio } from "@context/PortfolioContext";
// Updated import path to use the new molecule component
import ExperienceTimeline from '@molecules/ExperienceTimeline';
import { experience as experienceData } from '../../../portfolio';
// Updated import path to use modular CSS
import './styles/index.css';

/**
 * Experience section component displaying professional work history in a visually appealing timeline.
 * 
 * @component
 * @returns {React.ReactElement} Experience section component
 */
const Experience = () => {
  // Get portfolio data
  const portfolioData = usePortfolio();
  
  // Get loading delay from context or use default
  const loadingDelay = portfolioData?.settings?.loadingDelay || 0;
  
  // Use the directly imported experience data from portfolio.js
  // Fallback to context data only if needed
  const experience = experienceData || portfolioData?.experience || [];
  
  // Determine section title and subtitle from context if available
  const sectionTitle = portfolioData?.experienceSection?.title || "Professional Experience";
  const sectionSubtitle = portfolioData?.experienceSection?.subtitle || "My career journey and professional highlights";
  
  // Determine number of skeleton cards to show
  const skeletonCount = useMemo(() => 3, []);
  
  // Loading and error state flags
  const isLoading = !experience || experience.length === 0;
  const hasError = false; // We'll always use portfolio.js data as fallback
  
  // Skip rendering the whole section if explicitly disabled in config
  if (portfolioData?.experienceSection?.display === false) {
    return null;
  }
  
  // Animation config for framer-motion
  const animation = useMemo(() => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { 
      duration: 0.5,
      type: "tween",
      ease: "easeOut"
    }
  }), []);
  
  // Extract year from date string (e.g., "Jan 2019 - Present" => "2019")
  const extractDateYear = (dateString) => {
    if (!dateString) return '';
    const matches = dateString.match(/\b(19|20)\d{2}\b/);
    return matches ? matches[0] : '';
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
        <div className="experience-loading skeleton-staggered">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard 
              key={`skeleton-${i}`} 
              type="experience" 
              index={i} 
            />
          ))}
        </div>
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
        <div className="experience-empty-state">
          <p>No work experience is currently available.</p>
        </div>
      </Section>
    );
  }
  
  return (
    <Section
      id="experience"
      title={sectionTitle}
      subtitle={sectionSubtitle}
      animation={animation}
      className="experience-section"
      aria-label="Work experience history"
      data-testid="experience-section"
    >
      <ConsoleHeader
        prompt="root@security-portfolio:~#"
        command="analyze --depth=full --secure --format=timeline professional_experience.json"
        variant="security"
        className="timeline-header"
      />
      <ExperienceTimeline 
        experience={experience} 
        extractDateYear={extractDateYear}
        variant="security"
      />
    </Section>
  );
};

Experience.propTypes = {
  /* No props for this component as it uses hooks for data */
};

// Apply memoization for performance optimization
export default memo(Experience);
