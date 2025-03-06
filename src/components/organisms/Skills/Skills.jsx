import React, { memo, useMemo, useState, useEffect } from 'react';
import DisplayLottie from '@molecules/DisplayLottie';
import webdev from '@assets/animations/lottie/dev-webdev.json';
import { motion } from "framer-motion";

import Skill from '@atoms/Skill';
import SkeletonCard from '@atoms/SkeletonCard';
import Section from '@layout/Section';
import useSkills from "@hooks/useSkills";
import { usePortfolio } from "@context/PortfolioContext";
import '@assets/css/tailwind.css';

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
 * import Skills from '@organisms/containers/Skills';
 * 
 * const App = () => (
 *   <main>
 *     <Skills />
 *   </main>
 * );
 */
const Skills = () => {
  // Get portfolio data
  const portfolioData = usePortfolio();
  
  // Get loading delay from context or use default (demonstrates skeleton loading)
  const loadingDelay = portfolioData?.settings?.loadingDelay || 0;
  
  // Get skills data with options and loading delay
  const skillsData = useSkills({
    addFallbacks: true,
    delay: loadingDelay
  });
  
  // Extract skillsSection or use empty default
  const skillsSection = skillsData?.skillsSection || { 
    softwareSkills: [],
    skills: []
  };
  
  // Loading and error states
  const isLoading = !skillsData;
  const hasError = skillsData && skillsSection.softwareSkills.length === 0;
  
  // Skip rendering if explicitly disabled in config
  if (portfolioData?.skillsSection?.display === false) {
    return null;
  }
  
  // Determine number of skeleton cards to show
  const skeletonCount = 12; // Reasonable default
  
  // Device capability detection
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Detect low-end devices and motion preferences
  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    
    // Listen for changes
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);
    
    // Device performance detection
    const checkDevicePerformance = () => {
      // Check device memory (available in Chrome)
      if ('deviceMemory' in navigator) {
        setIsLowEndDevice(navigator.deviceMemory < 4);
        return;
      }
      
      // Check hardware concurrency (CPU cores)
      if ('hardwareConcurrency' in navigator) {
        setIsLowEndDevice(navigator.hardwareConcurrency < 4);
        return;
      }
      
      // Fallback: use user agent for basic mobile detection
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsLowEndDevice(isMobile);
    };
    
    checkDevicePerformance();
    
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);
  
  // Determine if we should use simplified animations
  const useSimplifiedAnimations = useMemo(() => 
    isLowEndDevice || prefersReducedMotion, 
    [isLowEndDevice, prefersReducedMotion]
  );
  
  // Animation config for framer-motion - optimized for device capabilities
  const sectionAnimation = useMemo(() => ({
    initial: useSimplifiedAnimations ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: useSimplifiedAnimations ? { opacity: 1 } : { opacity: 1, y: 0 },
    viewport: { once: true, margin: useSimplifiedAnimations ? "0px" : "-50px" },
    transition: { 
      duration: useSimplifiedAnimations ? 0.3 : 0.5,
      // Use simpler animation curve on low-end devices
      ease: useSimplifiedAnimations ? "easeIn" : "easeInOut"
    }
  }), [useSimplifiedAnimations]);
  
  // Text entry animations - simplified for low-end devices
  const textVariants = useMemo(() => ({
    hidden: useSimplifiedAnimations ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: useSimplifiedAnimations ? 0 : 0,
      transition: { 
        delay: useSimplifiedAnimations ? 0.3 : 0.6, 
        duration: useSimplifiedAnimations ? 0.3 : 0.5,
        staggerChildren: useSimplifiedAnimations ? 0.05 : 0.1
      }
    }
  }), [useSimplifiedAnimations]);
  
  // Function to generate staggered animations for skill text items - optimized version
  const getSkillTextVariants = useMemo(() => (index) => {
    if (useSimplifiedAnimations) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delay: 0.3 + (index * 0.05) }
        }
      };
    }
    
    return {
      hidden: { opacity: 0, x: -10 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.7 + (index * 0.1) }
      }
    };
  }, [useSimplifiedAnimations]);
  
  // Loading state
  if (isLoading) {
    return (
      <Section
        id="skills"
        title="Skills"
        icon="simple-icons:apachespark"
        className={`skills-section ${useSimplifiedAnimations ? 'reduced-motion' : ''}`}
      >
        <div className="flex flex-wrap -mx-4 items-center">
          <div className="w-full px-4 lg:w-6/12">
            <div className="skills-animation skeleton-animation">
              <div className="skeleton-gradient" style={{ width: '300px', height: '300px', borderRadius: '8px' }}></div>
            </div>
          </div>
          
          <div className="w-full px-4 lg:w-6/12">
            <div className="skills-grid skills-grid-loading skeleton-staggered">
              {Array.from({ length: skeletonCount }).map((_, i) => (
                <SkeletonCard 
                  key={i} 
                  type="skill" 
                  index={i} 
                />
              ))}
            </div>
            
            <div className="skills-description skeleton-staggered">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton-text-block" style={{ animationDelay: `${i * 0.15}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    );
  }
  
  // Error state
  if (hasError) {
    return (
      <Section
        id="skills"
        title="Skills"
        icon="simple-icons:apachespark"
        className="skills-section"
      >
        <div className="skills-empty-state">
          <p>No skills are currently available.</p>
        </div>
      </Section>
    );
  }

  // Normal state
  return (
    <Section
      id="skills"
      title={skillsSection.title}
      subtitle={skillsSection.subTitle}
      animation={sectionAnimation}
      className={`skills-section ${useSimplifiedAnimations ? 'reduced-motion' : ''}`}
      aria-label="Developer skills and technologies"
    >
      <div className="flex flex-wrap -mx-4 items-center">
        <div className="w-full px-4 lg:w-6/12">
          <div 
            className="skills-animation"
            aria-hidden="true" // Animation is decorative
          >
            <DisplayLottie 
              animationData={webdev} 
              quality={useSimplifiedAnimations ? 0.7 : 1}
              size={useSimplifiedAnimations ? "small" : "medium"}
              shouldOptimize={true}
            />
          </div>
        </div>
        
        <div className="w-full px-4 lg:w-6/12">
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
                reducedMotion={useSimplifiedAnimations}
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
        </div>
      </div>
    </Section>
  );
};

export default memo(Skills);
