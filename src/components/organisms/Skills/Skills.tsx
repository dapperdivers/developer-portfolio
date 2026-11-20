import React, { memo, useMemo, useState, useEffect } from 'react';
import { motion, MotionProps, Variants } from "framer-motion";

import SkillChip from '@molecules/SkillChip';
import SkeletonCard from '@atoms/SkeletonCard';
import TerminalTitleBar from '@molecules/TerminalTitleBar';
import Section from '../../layout/Section';
import useSkills from "@hooks/useSkills";
import { usePortfolio } from "@context/PortfolioContext";
import { useAnimation } from '@context/AnimationContext';
import { STAGGER_DELAY } from '@utils/motion';
import type { PortfolioData, Skill, SkillsSection } from '@/types/portfolio';
import '@assets/css/tailwind.css';
import './Skills.css';

/** Optional config key this section reads; the site data does not set it */
export interface SkillsSettingsConfig {
  settings?: {
    /** Delay in ms before data is shown, to demonstrate the skeleton UI */
    loadingDelay?: number;
  };
}

/** Words kept upper-case when an ALL CAPS subtitle is converted to sentence case */
const KEEP_UPPER = new Set(['AI', 'AppSec', 'CI/CD', 'SDLC']);

/** Turns an ALL CAPS string into sentence case; mixed-case text is left as it is. */
const sentenceCase = (text: string): string => {
  if (text !== text.toUpperCase()) return text;
  const lower = text.toLowerCase().replace(/\b[a-z/]+\b/g, w =>
    [...KEEP_UPPER].find(k => k.toLowerCase() === w) ?? w
  );
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};

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
  const portfolioData: PortfolioData & SkillsSettingsConfig = usePortfolio();
  
  // Get animation context
  const { animationEnabled } = useAnimation();
  
  // Get loading delay from context or use default (demonstrates skeleton loading)
  const loadingDelay = portfolioData?.settings?.loadingDelay || 0;
  
  // Get skills data with options and loading delay
  const skillsData = useSkills({
    addFallbacks: true,
    delay: loadingDelay
  });

  // Extract skillsSection or use empty default
  const skillsSection: Partial<SkillsSection> & Pick<SkillsSection, 'softwareSkills' | 'skills'> = skillsData?.skillsSection || { 
    softwareSkills: [],
    skills: []
  };
  
  // One open skill description per group, keyed by domain
  const [openSkills, setOpenSkills] = useState<Record<string, string | null>>({});
  
  // Loading and error states
  const isLoading = !skillsData;
  const hasError = skillsData && skillsSection.softwareSkills.length === 0;
  
  
  // Determine number of skeleton cards to show
  const skeletonCount = 12; // Reasonable default
  
  // Device capability detection - now simplified using AnimationContext
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    
    // Listen for changes
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
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
  const sectionAnimation = useMemo<MotionProps>(() => ({
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
  const textVariants = useMemo<Variants>(() => ({
    hidden: shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 0 },
    visible: {
      opacity: 1,
      y: shouldAnimate ? 0 : 0,
      transition: { 
        delay: shouldAnimate ? 0.6 : 0.3, 
        duration: shouldAnimate ? 0.5 : 0.3,
        staggerChildren: shouldAnimate ? STAGGER_DELAY : STAGGER_DELAY / 2
      }
    }
  }), [shouldAnimate]);
  
  // Function to generate staggered animations for skill text items - optimized version
  const getSkillTextVariants = useMemo(() => (index: number | string): Variants => {
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
        transition: { delay: 0.3 + (numIndex * STAGGER_DELAY) }
      }
    };
  }, [shouldAnimate]);
  
  // Group skills by security domain
  const groupedSkills = useMemo(() => {
    const grouped: Record<string, Skill[]> = {};
    
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
  
  // Open a skill's description in its group, or close it if already open
  const toggleSkill = (domain: string, skillName: string) => {
    setOpenSkills(prev => ({ ...prev, [domain]: prev[domain] === skillName ? null : skillName }));
  };

  // Loading state
  // Skip rendering if explicitly disabled in config. This has to come after
  // every hook above, so the hooks run in the same order on each render.
  if (portfolioData?.skillsSection?.display === false) {
    return null;
  }

  if (isLoading) {
    return (
      <Section
        id="skills"
        title="Skills"
        className={`skills-section text-white ${!shouldAnimate ? 'reduced-motion' : ''}`}
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
                  animated={animationEnabled}
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
      subtitle={skillsSection.subTitle ? sentenceCase(skillsSection.subTitle) : undefined}
      animation={sectionAnimation}
      className="skills-section text-white"
      aria-label="Developer skills and technologies"
    >
      <div className="skills-content-wrapper">
        {/* Terminal Section - Core Capabilities */}
        <div className="terminal-container">
          <TerminalTitleBar
            title="Core Capabilities"
            variant="kitty"
            interactive={false}
            animated={animationEnabled}
          />
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
        
        {/* Skills by group: a label and a row of chips; the description opens under the row */}
        <div className="skills-container">
          <h3 className="skills-category-title">Technical Skills</h3>
          <dl className="skills-groups">
            {Object.keys(groupedSkills).map(domain => {
              const openName = openSkills[domain];
              const openSkill = groupedSkills[domain].find(s => s.skillName === openName);
              const detailId = `skill-detail-${domain.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
              return (
                <div key={domain} className="skills-group">
                  <dt className="domain-header">{domain}</dt>
                  <dd className="skills-group-body">
                    <div className="skills-chips">
                      {groupedSkills[domain].map(skill => (
                        <SkillChip
                          key={`skill-chip-${skill.skillName}`}
                          name={skill.skillName}
                          iconName={skill.iconName}
                          selected={openName === skill.skillName}
                          controlsId={skill.description ? detailId : undefined}
                          onClick={skill.description ? () => toggleSkill(domain, skill.skillName) : undefined}
                          animated={animationEnabled}
                        />
                      ))}
                    </div>
                    <p id={detailId} className="skills-detail" hidden={!openSkill} aria-live="polite">
                      {openSkill && (
                        <>
                          <strong>{openSkill.skillName}.</strong> {openSkill.description}
                        </>
                      )}
                    </p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </Section>
  );
};

export default memo(Skills);