import React, { memo, useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

import SkillCard, { SkillCardExpanded } from '@molecules/SkillCard';
import SkeletonCard from '@atoms/SkeletonCard';
import Section from '@layout/Section';
import useSkills from "@hooks/useSkills";
import { usePortfolio } from "@context/PortfolioContext";
import { useAnimation, MotionVariants } from '@context/AnimationContext';
import '@assets/css/tailwind.css';
import './Skills.css';

/**
 * Skills component that displays a grid of skills icons and descriptions.
 * Showcases the developer's technical skills with interactive icons and 
 * descriptions arranged in a responsive grid layout.
 * 
 * @component
 * @returns {React.ReactElement} Skills component
 */
const Skills = () => {
  // Get portfolio data
  const portfolioData = usePortfolio();
  
  // Get animation context
  const { 
    animationEnabled, 
    slideUpVariants, 
    fadeInVariants, 
    animationStaggerDelay 
  } = useAnimation();
  
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
  
  // State for expanded skill card
  const [expandedSkill, setExpandedSkill] = useState(null);
  
  // Loading and error states
  const isLoading = !skillsData;
  const hasError = skillsData && skillsSection.softwareSkills.length === 0;
  
  // Skip rendering if explicitly disabled in config
  if (portfolioData?.skillsSection?.display === false) {
    return null;
  }
  
  // Determine number of skeleton cards to show
  const skeletonCount = 12; // Reasonable default
  
  // Device capability detection - now simplified using AnimationContext
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    
    // Listen for changes
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);
  
  // Determine if we should use simplified animations
  // Now uses animationEnabled from context plus local prefersReducedMotion
  const shouldAnimate = useMemo(() => 
    animationEnabled && !prefersReducedMotion, 
    [animationEnabled, prefersReducedMotion]
  );
  
  // Animation config for framer-motion - optimized with context values
  const sectionAnimation = useMemo(() => ({
    initial: shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 0 },
    whileInView: shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1 },
    viewport: { once: true, margin: shouldAnimate ? "-50px" : "0px" },
    transition: { 
      duration: shouldAnimate ? 0.5 : 0.3,
      // Use simpler animation curve on low-end devices
      ease: shouldAnimate ? "easeInOut" : "easeIn"
    }
  }), [shouldAnimate]);
  
  // Text entry animations - simplified when needed
  const textVariants = useMemo(() => ({
    hidden: shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 0 },
    visible: {
      opacity: 1,
      y: shouldAnimate ? 0 : 0,
      transition: { 
        delay: shouldAnimate ? 0.6 : 0.3, 
        duration: shouldAnimate ? 0.5 : 0.3,
        staggerChildren: shouldAnimate ? animationStaggerDelay : animationStaggerDelay / 2
      }
    }
  }), [shouldAnimate, animationStaggerDelay]);
  
  // Function to generate staggered animations for skill text items - optimized version
  const getSkillTextVariants = useMemo(() => (index) => {
    // Convert index to number for calculations
    const numIndex = typeof index === 'string' ? parseInt(index, 10) || 0 : index || 0;
    
    if (!shouldAnimate) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { delay: 0.1 + (numIndex * 0.03) }
        }
      };
    }
    
    return {
      hidden: { opacity: 0, x: -10 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { delay: 0.3 + (numIndex * animationStaggerDelay) }
      }
    };
  }, [shouldAnimate, animationStaggerDelay]);
  
  // Group skills by security domain
  const groupedSkills = useMemo(() => {
    const grouped = {};
    
    // First, collect all skills with security domains
    skillsSection.softwareSkills.forEach(skill => {
      if (skill.securityDomain) {
        if (!grouped[skill.securityDomain]) {
          grouped[skill.securityDomain] = [];
        }
        grouped[skill.securityDomain].push(skill);
      }
    });
    
    // Create an "Other Development Skills" domain for skills without a securityDomain
    const otherSkills = skillsSection.softwareSkills.filter(skill => !skill.securityDomain);
    if (otherSkills.length > 0) {
      grouped["Development Skills"] = otherSkills;
    }
    
    return grouped;
  }, [skillsSection.softwareSkills]);
  
  // Modal animations - use standard patterns from context when appropriate
  const modalVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 500 }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  }), []);
  
  // Background overlay animations - simplified from context
  const overlayVariants = useMemo(() => MotionVariants.fadeIn, []);
  
  // Handle skill card click
  const handleSkillClick = (skill) => {
    setExpandedSkill(skill);
  };
  
  // Close expanded skill card
  const closeExpandedSkill = () => {
    setExpandedSkill(null);
  };
  
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (expandedSkill) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [expandedSkill]);
  
  // Loading state
  if (isLoading) {
    return (
      <Section
        id="skills"
        title="Skills"
        icon="simple-icons:apachespark"
        className={`skills-section bg-gray-900 text-white ${!shouldAnimate ? 'reduced-motion' : ''}`}
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
        className="skills-section text-white"
      >
        <div className="skills-empty-state">
          <p>No skills are currently available.</p>
        </div>
      </Section>
    );
  }

  // Normal state with standard view
  return (
    <Section
      id="skills"
      title={skillsSection.title}
      subtitle={skillsSection.subTitle}
      animation={sectionAnimation}
      className="skills-section text-white"
      aria-label="Developer skills and technologies"
    >
      <div className="skills-content-wrapper">
        {/* Terminal Section - Core Capabilities */}
        <div className="terminal-container">
          <div className="terminal-header">
            <span className="terminal-title">Core Capabilities</span>
            <div className="terminal-buttons">
              <span className="terminal-button"></span>
              <span className="terminal-button"></span>
              <span className="terminal-button"></span>
            </div>
          </div>
          <motion.div 
            className="terminal-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            {skillsSection.skills.map((skill, index) => (
              <motion.p 
                key={`skill-desc-${index}`} 
                className="terminal-line" 
                tabIndex={0}
                variants={getSkillTextVariants(+index)}
              >
                <span className="terminal-prompt">$&gt;</span> {skill}
              </motion.p>
            ))}
          </motion.div>
        </div>
        
        {/* Skills Grid Section */}
        <div className="skills-container">
          <h3 className="skills-category-title">Technical Skills</h3>
          
          {/* Render skills grouped by domain */}
          {Object.keys(groupedSkills).map(domain => (
            <div key={domain}>
              <h4 className="domain-header">{domain}</h4>
              <div 
                className="skills-grid standard-grid"
                aria-label={`${groupedSkills[domain].length} skills in ${domain}`}
              >
                {groupedSkills[domain].map((skill, index) => (
                  <SkillCard
                    key={`skill-card-${skill.skillName}`}
                    skill={skill}
                    index={+index}
                    reducedMotion={!shouldAnimate}
                    onClick={handleSkillClick}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Expanded Skill Modal */}
      <AnimatePresence>
        {expandedSkill && (
          <>
            <motion.div 
              className="modal-backdrop"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              onClick={closeExpandedSkill}
            />
            <SkillCardExpanded
              skill={expandedSkill}
              onClose={closeExpandedSkill}
              animationVariants={modalVariants}
            />
          </>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default memo(Skills);
