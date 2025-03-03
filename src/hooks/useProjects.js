import { usePortfolio } from '../context/PortfolioContext';

/**
 * Custom hook to access project data from the portfolio context.
 * 
 * @function useProjects
 * @returns {Array} Array of project objects
 * 
 * @example
 * import { useProjects } from '../hooks/useProjects';
 * 
 * const ProjectsList = () => {
 *   const projects = useProjects();
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
const useProjects = () => {
  const { projects } = usePortfolio();
  return projects;
};

export default useProjects;
