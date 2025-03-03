import { useMemo } from 'react';

/**
 * Custom hook that provides memoized computed values for the portfolio.
 * Uses useMemo to prevent recalculating values on each render.
 * 
 * @function useMemoValues
 * @param {Object} data - Portfolio data from context
 * @returns {Object} Object containing memoized computed values
 * 
 * @example
 * import { useMemoValues } from '../hooks/useMemoValues';
 * import { usePortfolio } from '../context/PortfolioContext';
 * 
 * const Component = () => {
 *   const portfolioData = usePortfolio();
 *   const { totalExperience, skillsByCategory, topProjects } = useMemoValues(portfolioData);
 *   
 *   return (
 *     <div>
 *       <p>Total Experience: {totalExperience} years</p>
 *     </div>
 *   );
 * };
 */
const useMemoValues = (data) => {
  // Calculate total years of professional experience
  const totalExperience = useMemo(() => {
    if (!data?.workExperiences || data.workExperiences.length === 0) {
      return 0;
    }
    
    const now = new Date();
    const startDate = data.workExperiences.reduce((earliest, exp) => {
      const currentStart = new Date(exp.startDate);
      return currentStart < earliest ? currentStart : earliest;
    }, new Date());
    
    const yearsOfExperience = ((now - startDate) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1);
    return parseFloat(yearsOfExperience);
  }, [data?.workExperiences]);
  
  // Group skills by category
  const skillsByCategory = useMemo(() => {
    if (!data?.skills) return {};
    
    const categories = {};
    data.skills.forEach(skill => {
      const category = skill.category || 'Other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(skill);
    });
    
    return categories;
  }, [data?.skills]);
  
  // Sort and filter projects for featured display
  const topProjects = useMemo(() => {
    if (!data?.projects || data.projects.length === 0) {
      return [];
    }
    
    // Create a weighted score for each project
    const scoredProjects = data.projects.map(project => {
      let score = 0;
      
      // Weight factors (can be adjusted for different priorities)
      if (project.isFeatured) score += 100;
      if (project.isProductionApp) score += 50;
      if (project.technologies?.length) score += project.technologies.length * 5;
      if (project.stars) score += project.stars * 2;
      if (project.forks) score += project.forks;
      
      return { ...project, score };
    });
    
    // Sort by score (descending) and return top N
    return scoredProjects
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [data?.projects]);
  
  // Filter experiences by type (work, volunteer, etc.)
  const experiencesByType = useMemo(() => {
    if (!data?.workExperiences) return {};
    
    const types = {};
    data.workExperiences.forEach(exp => {
      const type = exp.type || 'professional';
      if (!types[type]) {
        types[type] = [];
      }
      types[type].push(exp);
    });
    
    // Sort each category by date (most recent first)
    Object.keys(types).forEach(type => {
      types[type].sort((a, b) => {
        const dateA = new Date(a.endDate || Date.now());
        const dateB = new Date(b.endDate || Date.now());
        return dateB - dateA;
      });
    });
    
    return types;
  }, [data?.workExperiences]);
  
  // Calculate skill proficiency percentages for visualization
  const skillProficiencies = useMemo(() => {
    if (!data?.skillsSection?.softwareSkills) return [];
    
    return data.skillsSection.softwareSkills.map(skill => {
      // Convert string proficiency descriptions to numeric values
      let percentage;
      switch(skill.proficiency?.toLowerCase()) {
        case 'expert':
        case 'advanced':
          percentage = 90;
          break;
        case 'intermediate':
          percentage = 70;
          break;
        case 'beginner':
          percentage = 40;
          break;
        default:
          // If proficiency is already a number or missing
          percentage = typeof skill.proficiency === 'number' 
            ? skill.proficiency 
            : skill.level || 75; // Default to 75% if no data available
      }
      
      return {
        ...skill,
        percentage
      };
    }).sort((a, b) => b.percentage - a.percentage);
  }, [data?.skillsSection?.softwareSkills]);
  
  // Create filtered list of social links (only populated ones)
  const activeSocialLinks = useMemo(() => {
    if (!data?.socialLinks) return {};
    
    const filtered = {};
    Object.entries(data.socialLinks).forEach(([key, value]) => {
      if (value && typeof value === 'string' && value.trim() !== '') {
        filtered[key] = value;
      }
    });
    
    return filtered;
  }, [data?.socialLinks]);
  
  return {
    totalExperience,
    skillsByCategory,
    topProjects,
    experiencesByType,
    skillProficiencies,
    activeSocialLinks
  };
};

export default useMemoValues;
