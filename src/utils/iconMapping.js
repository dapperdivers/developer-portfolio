import { 
  FaHtml5, 
  FaCss3Alt, 
  FaSass, 
  FaJs, 
  FaReact, 
  FaNodeJs, 
  FaNpm, 
  FaDatabase, 
  FaAws, 
  FaMicrosoft, 
  FaGoogle, 
  FaPython, 
  FaGit, 
  FaDocker 
} from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';

/**
 * Maps Iconify icon names to React Icons components for CSP compatibility
 * 
 * @param {string} iconName - The Iconify icon name
 * @returns {React.ComponentType} A React Icons component or undefined if not found
 */
export const mapIconToComponent = (iconName) => {
  const iconMap = {
    'simple-icons:html5': FaHtml5,
    'simple-icons:css3': FaCss3Alt,
    'simple-icons:sass': FaSass,
    'simple-icons:javascript': FaJs,
    'simple-icons:typescript': SiTypescript,
    'simple-icons:react': FaReact,
    'simple-icons:nodejs': FaNodeJs,
    'simple-icons:npm': FaNpm,
    'simple-icons:mysql': FaDatabase,
    'simple-icons:amazonaws': FaAws,
    'simple-icons:microsoftazure': FaMicrosoft,
    'simple-icons:googlecloud': FaGoogle,
    'simple-icons:python': FaPython,
    'simple-icons:git': FaGit,
    'simple-icons:docker': FaDocker,
  };
  
  return iconMap[iconName];
};

export default mapIconToComponent;
