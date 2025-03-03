import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ExperienceCard from "../components/ExperienceCard";
import Section from "../components/layout/Section";
import useExperience from "../hooks/useExperience";
import useMemoValues from "../hooks/useMemoValues";
import "../assets/css/experience-section.css";

/**
 * Experience section component displaying work history.
 * Renders a grid of ExperienceCard components with work history data.
 * 
 * @component
 * @returns {React.ReactElement} Experience section component
 * 
 * @example
 * // Usage in App.jsx or another container
 * import Experience from './containers/Experience';
 * 
 * const App = () => (
 *   <main>
 *     <Experience />
 *   </main>
 * );
 */
const Experience = () => {
  const experience = useExperience();
  
  // Memoize animation configuration to prevent unnecessary recalculations
  const { sectionAnimation } = useMemoValues({
    sectionAnimation: {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.5 }
    }
  });

  return (
    <Section
      id="experience"
      title="Experience"
      icon="simple-icons:briefcase"
      animation={sectionAnimation}
      className="experience-section"
      aria-label="Work experience history"
    >
      <div 
        className="experience-grid" 
        aria-label={`${experience.length} work experiences`}
      >
        {experience.map((data, i) => (
          <ExperienceCard 
            key={`experience-${data.company}-${i}`} 
            data={data} 
            index={i} 
          />
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
