/**
 * Experience Component
 * 
 * This index file ensures the Experience component can be lazy loaded correctly
 * by creating a proper JavaScript module that exports the component.
 */

// Import the Experience component 
import Experience from './Experience';

// Export the Experience component as the default export
export default Experience;

// Also export ExperienceTimeline for direct usage
// The bundler will automatically resolve to the TypeScript version
export { default as ExperienceTimeline } from './ExperienceTimeline';
