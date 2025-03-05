import { useState, useEffect, useMemo } from 'react';
import { usePortfolio } from '@context/PortfolioContext';

/**
 * Validates an experience object to ensure it has all required properties
 * 
 * @param {Object} experienceItem - Experience object to validate
 * @returns {boolean} Whether the experience item is valid
 */
const isValidExperience = (experienceItem) => {
  return (
    experienceItem &&
    typeof experienceItem === 'object' &&
    typeof experienceItem.company === 'string' &&
    typeof experienceItem.role === 'string' &&
    typeof experienceItem.date === 'string' &&
    typeof experienceItem.desc === 'string' &&
    typeof experienceItem.companylogo === 'string'
  );
};

/**
 * Custom hook to access and optimize experience data from the portfolio context.
 * Provides data validation, sorting, and memoization to prevent unnecessary re-renders.
 * 
 * @function useExperience
 * @param {Object} options - Hook options
 * @param {string} [options.filter] - Optional filter string to search in company/role/description
 * @param {string} [options.sortBy='recent'] - Optional sort method ('recent', 'company', 'role')
 * @param {number} [options.delay=0] - Optional delay in ms to simulate loading (for skeleton demo)
 * @returns {Array|null} Array of validated and sorted experience objects or null if loading
 * 
 * @example
 * import useExperience from '@hooks/useExperience';
 * 
 * const ExperienceList = () => {
 *   // Get all experiences sorted by most recent
 *   const experiences = useExperience();
 *   
 *   // Or get filtered and sorted experiences with loading delay
 *   const filteredExperiences = useExperience({ 
 *     filter: 'software', 
 *     sortBy: 'company',
 *     delay: 1500 // Show skeleton for 1.5 seconds 
 *   });
 *   
 *   if (!experiences) {
 *     return <LoadingSkeleton />;
 *   }
 *   
 *   return (
 *     <div>
 *       {experiences.map(job => (
 *         <div key={job.company}>{job.role} at {job.company}</div>
 *       ))}
 *     </div>
 *   );
 * };
 */
const useExperience = (options = {}) => {
  const { filter, sortBy = 'recent', delay = 0 } = options;
  const { experience } = usePortfolio();
  const [loading, setLoading] = useState(delay > 0);
  
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
  
  // Process experience data with memoization to prevent unnecessary re-renders
  const processedExperience = useMemo(() => {
    // If experience is undefined or not an array, return empty array
    if (!experience || !Array.isArray(experience)) {
      console.warn('Experience data is missing or invalid');
      return [];
    }
    
    // Filter out invalid experience items
    let validExperience = experience.filter(isValidExperience);
    
    // Apply text filter if provided
    if (filter && typeof filter === 'string' && filter.length > 0) {
      const lowerFilter = filter.toLowerCase();
      validExperience = validExperience.filter(item => {
        const companyMatch = item.company.toLowerCase().includes(lowerFilter);
        const roleMatch = item.role.toLowerCase().includes(lowerFilter);
        const descMatch = item.desc.toLowerCase().includes(lowerFilter);
        
        return companyMatch || roleMatch || descMatch;
      });
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'company':
        return [...validExperience].sort((a, b) => a.company.localeCompare(b.company));
      case 'role':
        return [...validExperience].sort((a, b) => a.role.localeCompare(b.role));
      case 'recent':
      default:
        // By default, assume the array is already sorted by recency
        return validExperience;
    }
  }, [experience, filter, sortBy]);
  
  // Return null during loading to trigger skeleton UI
  return loading ? null : processedExperience;
};

export default useExperience;
