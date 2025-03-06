import { useState, useEffect, useMemo } from 'react';
import { usePortfolio } from '@context/PortfolioContext';

/**
 * Validates a skill object to ensure it has all required properties
 * 
 * @param {Object} skill - Skill object to validate
 * @returns {boolean} Whether the skill is valid
 */
const isValidSkill = (skill) => {
  return (
    skill &&
    typeof skill === 'object' &&
    typeof skill.skillName === 'string' &&
    (typeof skill.iconName === 'string' || typeof skill.fontAwesomeClassname === 'string')
  );
};

/**
 * Adds fallback icons to skills that are missing them
 * 
 * @param {Array} skills - Array of skill objects
 * @returns {Array} Array of skill objects with fallback icons
 */
const addFallbackIcons = (skills) => {
  if (!skills || !Array.isArray(skills)) return [];
  
  return skills.map(skill => {
    // Skip skills that already have icons
    if (skill.iconName || skill.fontAwesomeClassname) {
      return skill;
    }
    
    // Determine fallback icon based on skill name
    const name = skill.skillName.toLowerCase();
    let fallbackIcon = '';
    
    // Frontend
    if (name.includes('react')) fallbackIcon = 'logos:react';
    else if (name.includes('angular')) fallbackIcon = 'logos:angular-icon';
    else if (name.includes('vue')) fallbackIcon = 'logos:vue';
    else if (name.includes('javascript') || name.includes('js')) fallbackIcon = 'logos:javascript';
    else if (name.includes('typescript') || name.includes('ts')) fallbackIcon = 'logos:typescript-icon';
    else if (name.includes('html')) fallbackIcon = 'logos:html-5';
    else if (name.includes('css')) fallbackIcon = 'logos:css-3';
    else if (name.includes('sass')) fallbackIcon = 'logos:sass';
    
    // Backend
    else if (name.includes('node')) fallbackIcon = 'logos:nodejs-icon';
    else if (name.includes('python')) fallbackIcon = 'logos:python';
    else if (name.includes('java')) fallbackIcon = 'logos:java';
    else if (name.includes('php')) fallbackIcon = 'logos:php';
    else if (name.includes('ruby')) fallbackIcon = 'logos:ruby';
    else if (name.includes('go')) fallbackIcon = 'logos:go';
    else if (name.includes('rust')) fallbackIcon = 'logos:rust';
    
    // Database
    else if (name.includes('sql') || name.includes('database')) fallbackIcon = 'vscode-icons:file-type-sql';
    else if (name.includes('mongo')) fallbackIcon = 'logos:mongodb-icon';
    else if (name.includes('postgres')) fallbackIcon = 'logos:postgresql';
    else if (name.includes('redis')) fallbackIcon = 'logos:redis';
    
    // Tools
    else if (name.includes('git')) fallbackIcon = 'logos:git-icon';
    else if (name.includes('docker')) fallbackIcon = 'logos:docker-icon';
    else if (name.includes('aws')) fallbackIcon = 'logos:aws';
    else if (name.includes('azure')) fallbackIcon = 'logos:microsoft-azure';
    else if (name.includes('google cloud') || name.includes('gcp')) fallbackIcon = 'logos:google-cloud';
    
    // Default
    else fallbackIcon = 'vscode-icons:file-type-code';
    
    return {
      ...skill,
      iconName: fallbackIcon
    };
  });
};

/**
 * Custom hook to access and optimize skills data from the portfolio context.
 * Provides data validation, fallback icons, categorization, and memoization.
 * 
 * @function useSkills
 * @param {Object} options - Hook options
 * @param {string} [options.filter] - Optional filter string to search in skill names
 * @param {string} [options.category] - Optional category to filter skills by
 * @param {boolean} [options.addFallbacks=true] - Whether to add fallback icons
 * @param {number} [options.delay=0] - Optional delay in ms to simulate loading (for skeleton demo)
 * @returns {Object|null} Object containing skillsSection and skillBars data or null if loading
 * 
 * @example
 * import useSkills from '@hooks/useSkills';
 * 
 * const SkillsDisplay = () => {
 *   // Get all skills
 *   const { skillsSection, skillBars } = useSkills();
 *   
 *   // Or get filtered skills with loading delay
 *   const filteredSkills = useSkills({ 
 *     filter: 'react', 
 *     category: 'frontend',
 *     delay: 1000 // Show skeleton for 1 second
 *   });
 *   
 *   if (!filteredSkills) {
 *     return <LoadingSkeleton />;
 *   }
 *   
 *   return (
 *     <div>
 *       <h2>{filteredSkills.skillsSection.title}</h2>
 *       {filteredSkills.skillsSection.softwareSkills.map(skill => (
 *         <div key={skill.skillName}>{skill.skillName}</div>
 *       ))}
 *     </div>
 *   );
 * };
 */
const useSkills = (options = {}) => {
  const { filter, category, addFallbacks = true, delay = 0 } = options;
  const portfolioData = usePortfolio();
  const [loading, setLoading] = useState(delay > 0);
  
  // Get raw data
  const { skillsSection, skillBars } = portfolioData || {};
  
  // Effect for simulating loading time (for skeleton demo)
  useEffect(() => {
    let timer;
    if (delay > 0) {
      setLoading(true);
      timer = setTimeout(() => {
        setLoading(false);
      }, delay);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [delay]);
  
  // Process skills data with memoization to prevent unnecessary re-renders
  const processedData = useMemo(() => {
    // Return null if data is missing
    if (!skillsSection || !skillBars) {
      console.warn('Skills data is missing or invalid');
      return null;
    }
    
    // Start with the original data
    const result = {
      skillsSection: { ...skillsSection },
      skillBars: [...skillBars]
    };
    
    // Ensure softwareSkills exists and is an array
    if (!result.skillsSection.softwareSkills || !Array.isArray(result.skillsSection.softwareSkills)) {
      result.skillsSection.softwareSkills = [];
    }
    
    // Filter out invalid skills
    let validSkills = result.skillsSection.softwareSkills.filter(isValidSkill);
    
    // Apply text filter if provided
    if (filter && typeof filter === 'string' && filter.length > 0) {
      const lowerFilter = filter.toLowerCase();
      validSkills = validSkills.filter(skill => {
        const nameMatch = skill.skillName.toLowerCase().includes(lowerFilter);
        return nameMatch;
      });
    }
    
    // Apply category filter if provided
    if (category && typeof category === 'string' && category.length > 0) {
      const lowerCategory = category.toLowerCase();
      validSkills = validSkills.filter(skill => {
        const skillCategory = (skill.category || '').toLowerCase();
        return skillCategory.includes(lowerCategory);
      });
    }
    
    // Add fallback icons if requested
    if (addFallbacks) {
      validSkills = addFallbackIcons(validSkills);
    }
    
    // Update the processed result
    result.skillsSection.softwareSkills = validSkills;
    
    return result;
  }, [skillsSection, skillBars, filter, category, addFallbacks]);
  
  // Return null during loading to trigger skeleton UI
  return loading ? null : processedData;
};

export default useSkills;
