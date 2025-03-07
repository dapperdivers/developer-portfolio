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
 * Create path aliases configuration for Vite
 * @returns {Object} Alias configuration object for resolve.alias
 */
export function createAliases() {
  return {
    // Base directories
    '@': dirs.src,
    
    // Component directories
    '@components': dirs.components,
    '@atoms': componentDirs.atoms,
    '@molecules': componentDirs.molecules,
    '@organisms': componentDirs.organisms,
    '@layout': componentDirs.layout,
    
    // Asset directories
    '@assets': dirs.assets,
    
    // Utility directories
    '@utils': path.resolve(dirs.src, 'utils'),
    
    // Data and state directories
    '@hooks': path.resolve(dirs.src, 'hooks'),
    '@context': path.resolve(dirs.src, 'context'),
    '@types': path.resolve(dirs.src, 'types'),
    
    // Component-specific aliases
    '@atoms/Button': path.resolve(componentDirs.atoms, 'Button'),
    '@atoms/Card': path.resolve(componentDirs.atoms, 'Card'),
    '@atoms/Head': path.resolve(componentDirs.atoms, 'Head'),
    '@atoms/LazyImage': path.resolve(componentDirs.atoms, 'LazyImage'),
    '@atoms/Loading': path.resolve(componentDirs.atoms, 'Loading'),
    '@atoms/Progress': path.resolve(componentDirs.atoms, 'Progress'),
    '@atoms/ResponsiveImage': path.resolve(componentDirs.atoms, 'ResponsiveImage'),
    '@atoms/SkeletonCard': path.resolve(componentDirs.atoms, 'SkeletonCard'),
    '@atoms/Skill': path.resolve(componentDirs.atoms, 'Skill'),
    '@atoms/SkipToContent': path.resolve(componentDirs.atoms, 'SkipToContent'),
    '@molecules/DisplayLottie': path.resolve(componentDirs.molecules, 'DisplayLottie'),
    '@molecules/EducationCard': path.resolve(componentDirs.molecules, 'EducationCard'),
    '@molecules/ErrorBoundary': path.resolve(componentDirs.molecules, 'ErrorBoundary'),
    '@molecules/ExperienceCard': path.resolve(componentDirs.molecules, 'ExperienceCard'),
    '@molecules/FeedbackCard': path.resolve(componentDirs.molecules, 'FeedbackCard'),
    '@molecules/Footer': path.resolve(componentDirs.molecules, 'Footer'),
    '@molecules/GithubProfileCard': path.resolve(componentDirs.molecules, 'GithubProfileCard'),
    '@molecules/Navigation': path.resolve(componentDirs.molecules, 'Navigation'),
    '@molecules/ProjectsCard': path.resolve(componentDirs.molecules, 'ProjectsCard'),
    '@molecules/SocialLinks': path.resolve(componentDirs.molecules, 'SocialLinks'),
    '@organisms/Education': path.resolve(componentDirs.organisms, 'Education'),
    '@organisms/Experience': path.resolve(componentDirs.organisms, 'Experience'),
    '@organisms/Feedbacks': path.resolve(componentDirs.organisms, 'Feedbacks'),
    '@organisms/GithubProfile': path.resolve(componentDirs.organisms, 'GithubProfile'),
    '@organisms/Greetings': path.resolve(componentDirs.organisms, 'Greetings'),
    '@organisms/Proficiency': path.resolve(componentDirs.organisms, 'Proficiency'),
    '@organisms/Projects': path.resolve(componentDirs.organisms, 'Projects'),
    '@organisms/Skills': path.resolve(componentDirs.organisms, 'Skills'),
    '@layout/Section': path.resolve(componentDirs.layout, 'Section'),
  };
}

/**
 * Generate TypeScript compatible path aliases
 * @returns {Object} TypeScript compatible path mapping
 */
export const getTsPathAliases = () => {
  const tsPathAliases = {};
  
  // Convert each path to TypeScript format (with /* suffix)
  Object.entries(createAliases()).forEach(([alias, aliasPath]) => {
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
    
    // Include all standard aliases
    ...createAliases()
  };
};

// Legacy export for backward compatibility
export const pathAliases = createAliases();

export default {
  dirs,
  componentDirs,
  pathAliases,
  createAliases,
  getTsPathAliases,
  getTestAliases
};
