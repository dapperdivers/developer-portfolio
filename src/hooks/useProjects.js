import { useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

/**
 * Validates a project object to ensure it has all required properties
 * 
 * @param {Object} project - Project object to validate
 * @returns {boolean} Whether the project is valid
 */
const isValidProject = (project) => {
  return (
    project &&
    typeof project === 'object' &&
    typeof project.name === 'string' &&
    typeof project.desc === 'string'
  );
};

/**
 * Custom hook to access and optimize project data from the portfolio context.
 * Provides data validation, sorting, and memoization to prevent unnecessary re-renders.
 * 
 * @function useProjects
 * @param {Object} options - Hook options
 * @param {string} [options.filter] - Optional filter string to search in project name/description
 * @param {string} [options.sortBy='default'] - Optional sort method ('default', 'name', 'recent')
 * @returns {Array} Array of validated and sorted project objects
 * 
 * @example
 * import useProjects from '../hooks/useProjects';
 * 
 * const ProjectsList = () => {
 *   // Get all projects sorted by default order
 *   const projects = useProjects();
 *   
 *   // Or get filtered and sorted projects
 *   const filteredProjects = useProjects({ 
 *     filter: 'react', 
 *     sortBy: 'recent' 
 *   });
 *   
 *   return (
 *     <div>
 *       {projects.map(project => (
 *         <div key={project.name}>{project.name}</div>
 *       ))}
 *     </div>
 *   );
 * };
 */
const useProjects = (options = {}) => {
  const { filter, sortBy = 'default' } = options;
  const { projects } = usePortfolio();
  
  // Return memoized projects array to prevent unnecessary re-renders
  return useMemo(() => {
    // If projects is undefined or not an array, return empty array
    if (!projects || !Array.isArray(projects)) {
      console.warn('Projects data is missing or invalid');
      return [];
    }
    
    // Filter out invalid projects
    let validProjects = projects.filter(isValidProject);
    
    // Apply text filter if provided
    if (filter && typeof filter === 'string' && filter.length > 0) {
      const lowerFilter = filter.toLowerCase();
      validProjects = validProjects.filter(project => {
        const nameMatch = project.name.toLowerCase().includes(lowerFilter);
        const descMatch = project.desc.toLowerCase().includes(lowerFilter);
        const techMatch = Array.isArray(project.stack) && 
          project.stack.some(tech => tech.toLowerCase().includes(lowerFilter));
        
        return nameMatch || descMatch || techMatch;
      });
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'name':
        return [...validProjects].sort((a, b) => a.name.localeCompare(b.name));
      case 'recent':
        return [...validProjects].sort((a, b) => {
          // If date property exists, sort by it
          if (a.date && b.date) {
            return new Date(b.date) - new Date(a.date);
          }
          return 0;
        });
      case 'default':
      default:
        return validProjects;
    }
  }, [projects, filter, sortBy]);
};

export default useProjects;
