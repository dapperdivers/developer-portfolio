import React, { memo, useMemo, useCallback } from 'react';
import ExperienceCard from '@molecules/ExperienceCard';
import SkeletonCard from '@atoms/SkeletonCard';
import Section from '@layout/Section';
import { motion } from "framer-motion";
import { Icon } from '@iconify/react';
import useExperience from "@hooks/useExperience";
import useTimelineView from "@hooks/useTimelineView";
import { usePortfolio } from "@context/PortfolioContext";


/**
 * Experience section component displaying work history.
 * Renders a grid of ExperienceCard components with work history data.
 * 
 * @component
 * @returns {React.ReactElement} Experience section component
 * 
 * @example
 * // Usage in App.jsx or another container
 * import Experience from '@organisms/containers/Experience';
 * 
 * const App = () => (
 *   <main>
 *     <Experience />
 *   </main>
 * );
 */
const Experience = () => {
  // Get portfolio data
  const portfolioData = usePortfolio();
  
  // Get loading delay from context or use default (demonstrates skeleton loading)
  const loadingDelay = portfolioData?.settings?.loadingDelay || 0;
  
  // Get experience data with options
  const experience = useExperience({
    sortBy: 'recent',
    delay: loadingDelay
  });
  
  // Determine section title and subtitle from context if available
  const sectionTitle = portfolioData?.experienceSection?.title || "Experience";
  const sectionSubtitle = portfolioData?.experienceSection?.subtitle;
  
  // Get preferred view type from context or default to 'timeline'
  const preferredViewType = portfolioData?.experienceSection?.viewType || 'timeline';
  
  // Use timeline view hook for managing view state and animations
  const { 
    viewType, 
    setView, 
    getAnimationDelay, 
    entryRef,
    extractDateYear 
  } = useTimelineView({
    defaultView: preferredViewType,
    animationDelayIncrement: 150,
    enableIntersectionObserver: true
  });
  
  // Set the appropriate layout class based on view type
  const layoutClass = useMemo(() => `layout-${viewType}`, [viewType]);
  
  // Handler for view toggle button clicks
  const handleViewToggle = useCallback((view) => {
    setView(view);
  }, [setView]);
  
  // Determine number of skeleton cards to show
  const skeletonCount = useMemo(() => {
    // Could be dynamic based on viewport, for now static
    return 3;
  }, []);
  
  // Loading state flag
  const isLoading = !experience;
  
  // Error state flag
  const hasError = experience && experience.length === 0;
  
  // Skip rendering the whole section if explicitly disabled in config
  if (portfolioData?.experienceSection?.display === false) {
    return null;
  }
  
  // Memoize animation configuration to prevent unnecessary recalculations
  const animation = useMemo(() => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { 
      duration: 0.5,
      // Optimize performance
      type: "tween",
      translateY: true
    }
  }), []);
  
  // Render loading state if experience data is not available
  if (isLoading) {
    return (
      <Section
        id="experience"
        title={sectionTitle}
        subtitle={sectionSubtitle}
        icon="simple-icons:briefcase"
        className="experience-section"
      >
        <div className="experience-grid experience-grid-loading skeleton-staggered">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <SkeletonCard 
              key={i} 
              type="experience" 
              index={i} 
            />
          ))}
        </div>
      </Section>
    );
  }
  
  // Render error state if no experience is available
  if (hasError) {
    return (
      <Section
        id="experience"
        title={sectionTitle}
        subtitle={sectionSubtitle}
        icon="simple-icons:briefcase"
        className="experience-section"
      >
        <div className="experience-empty-state">
          <p>No work experience is currently available.</p>
        </div>
      </Section>
    );
  }

  // Render view controls for normal state
  const renderViewControls = () => (
    <div className="view-controls">
      <button 
        type="button"
        className={`view-toggle ${viewType === 'timeline' ? 'active' : ''}`}
        onClick={() => handleViewToggle('timeline')}
        aria-pressed={viewType === 'timeline'}
      >
        <Icon icon="mdi:timeline-outline" className="view-icon" aria-hidden="true" />
        <span>Timeline</span>
      </button>
      <button 
        type="button"
        className={`view-toggle ${viewType === 'grid' ? 'active' : ''}`}
        onClick={() => handleViewToggle('grid')}
        aria-pressed={viewType === 'grid'}
      >
        <Icon icon="mdi:grid" className="view-icon" aria-hidden="true" />
        <span>Grid</span>
      </button>
    </div>
  );
  
  return (
    <Section
      id="experience"
      title={sectionTitle}
      subtitle={sectionSubtitle}
      icon="simple-icons:briefcase"
      animation={animation}
      className={`experience-section ${layoutClass}`}
      aria-label="Work experience history"
    >
      {/* View toggle controls */}
      {renderViewControls()}
      
      {/* Grid layout (default for small screens) */}
      <div 
        className="experience-grid" 
        aria-label={`${experience.length} work experiences in grid layout`}
      >
        {experience.map((data, i) => (
          <ExperienceCard 
            key={`experience-grid-${data.company}-${i}`} 
            data={data} 
            index={i} 
          />
        ))}
      </div>
      
      {/* Timeline layout (default for large screens) */}
      <div 
        className="experience-timeline timeline-animate-in" 
        aria-label={`${experience.length} work experiences in timeline layout`}
      >
        {experience.map((data, i) => (
          <motion.div 
            key={`experience-timeline-${data.company}-${i}`}
            className="timeline-entry"
            ref={entryRef(i)}
            style={{ 
              transitionDelay: getAnimationDelay(i)
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px 0px" }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1 * i, 
              ease: "easeOut" 
            }}
          >
            <div className="timeline-date" aria-label={`Work period: ${data.date}`}>
              {extractDateYear(data.date)}
            </div>
            <ExperienceCard 
              data={data} 
              index={i} 
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

Experience.propTypes = {
  // This component doesn't accept any props directly,
  // but uses useExperience hook to access data
};

// Apply memoization for performance optimization
export default memo(Experience);
