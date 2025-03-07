/**
 * Centralized path configuration for the portfolio project
 * 
 * This file serves as the single source of truth for path aliases and file locations
 * throughout the build process. By centralizing these paths, we ensure consistent
 * behavior across different build tools (Vite, Babel, TypeScript, etc.)
 */

import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Project directory structure
 */
export const dirs = {
  root: rootDir,
  src: path.resolve(rootDir, 'src'),
  build: path.resolve(rootDir, 'build'),
  public: path.resolve(rootDir, 'public'),
  nodeModules: path.resolve(rootDir, 'node_modules'),
  assets: path.resolve(rootDir, 'src/assets'),
  components: path.resolve(rootDir, 'src/components')
};

/**
 * Component directory structure for atomic design pattern
 */
export const componentDirs = {
  atoms: path.resolve(dirs.components, 'atoms'),
  molecules: path.resolve(dirs.components, 'molecules'),
  organisms: path.resolve(dirs.components, 'organisms'),
  layout: path.resolve(dirs.components, 'layout')
};

/**
 * Path aliases shared across all tools (Vite, Babel, TypeScript, Jest)
 */
export const pathAliases = {
  '@': dirs.src,
  '@components': dirs.components,
  '@atoms': componentDirs.atoms,
  '@molecules': componentDirs.molecules,
  '@organisms': componentDirs.organisms,
  '@layout': componentDirs.layout,
  '@assets': dirs.assets,
  '@utils': path.resolve(dirs.src, 'utils'),
  '@hooks': path.resolve(dirs.src, 'hooks'),
  '@context': path.resolve(dirs.src, 'context'),
  
  // Extensions for specific components
  '@layout/Section': path.resolve(componentDirs.layout, 'Section'),
  '@atoms/SkipToContent': path.resolve(componentDirs.atoms, 'SkipToContent'),
  '@atoms/Skill': path.resolve(componentDirs.atoms, 'Skill'),
  '@atoms/SkeletonCard': path.resolve(componentDirs.atoms, 'SkeletonCard'),
  '@atoms/ResponsiveImage': path.resolve(componentDirs.atoms, 'ResponsiveImage'),
  '@atoms/Progress': path.resolve(componentDirs.atoms, 'Progress'),
  '@atoms/Loading': path.resolve(componentDirs.atoms, 'Loading'),
  '@atoms/LazyImage': path.resolve(componentDirs.atoms, 'LazyImage'),
  '@atoms/Head': path.resolve(componentDirs.atoms, 'Head'),
  '@atoms/Card': path.resolve(componentDirs.atoms, 'Card'),
  '@atoms/Button': path.resolve(componentDirs.atoms, 'Button'),
  '@molecules/SocialLinks': path.resolve(componentDirs.molecules, 'SocialLinks'),
  '@molecules/ProjectsCard': path.resolve(componentDirs.molecules, 'ProjectsCard'),
  '@molecules/Navigation': path.resolve(componentDirs.molecules, 'Navigation'),
  '@molecules/GithubProfileCard': path.resolve(componentDirs.molecules, 'GithubProfileCard'),
  '@molecules/Footer': path.resolve(componentDirs.molecules, 'Footer'),
  '@molecules/FeedbackCard': path.resolve(componentDirs.molecules, 'FeedbackCard'),
  '@molecules/ExperienceCard': path.resolve(componentDirs.molecules, 'ExperienceCard'),
  '@molecules/ErrorBoundary': path.resolve(componentDirs.molecules, 'ErrorBoundary'),
  '@molecules/EducationCard': path.resolve(componentDirs.molecules, 'EducationCard'),
  '@molecules/DisplayLottie': path.resolve(componentDirs.molecules, 'DisplayLottie'),
  '@organisms/Skills': path.resolve(componentDirs.organisms, 'Skills'),
  '@organisms/Projects': path.resolve(componentDirs.organisms, 'Projects'),
  '@organisms/Proficiency': path.resolve(componentDirs.organisms, 'Proficiency'),
  '@organisms/Greetings': path.resolve(componentDirs.organisms, 'Greetings'),
  '@organisms/GithubProfile': path.resolve(componentDirs.organisms, 'GithubProfile'),
  '@organisms/Feedbacks': path.resolve(componentDirs.organisms, 'Feedbacks'),
  '@organisms/Experience': path.resolve(componentDirs.organisms, 'Experience'),
  '@organisms/Education': path.resolve(componentDirs.organisms, 'Education'),
};

/**
 * Generate TypeScript compatible path aliases
 * @returns {Object} TypeScript compatible path mapping
 */
export const getTsPathAliases = () => {
  const tsPathAliases = {};
  
  // Convert each path to TypeScript format (with /* suffix)
  Object.entries(pathAliases).forEach(([alias, aliasPath]) => {
    // Handle specific component paths differently from directory paths
    if (alias.includes('/')) {
      tsPathAliases[alias] = [aliasPath];
    } else {
      tsPathAliases[`${alias}/*`] = [`${aliasPath}/*`];
    }
  });
  
  return tsPathAliases;
};

/**
 * Get testing-specific path aliases
 * @returns {Object} Testing aliases
 */
export const getTestAliases = () => {
  return {
    // Mock implementations for common dependencies
    'framer-motion': path.resolve(dirs.src, '__mocks__/framerMotionMock.jsx'),
    '@iconify/react': path.resolve(dirs.src, '__mocks__/iconifyMock.jsx'),
    'lottie-react': path.resolve(dirs.src, '__mocks__/lottieMock.jsx'),
    
    // Testing paths for components (if different from production)
    ...pathAliases
  };
};

export default {
  dirs,
  componentDirs,
  pathAliases,
  getTsPathAliases,
  getTestAliases
};
