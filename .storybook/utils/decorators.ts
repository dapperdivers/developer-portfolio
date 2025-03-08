/**
 * Decorators - Backward Compatibility Module
 * 
 * This file re-exports all decorators from their new locations
 * to maintain backward compatibility with existing stories.
 * 
 * @deprecated Use direct imports from './.storybook/utils' instead
 */

export { 
  withPortfolioContext,
  withHelmetProvider,
  withAnimationContext
} from './index';

export {
  withDarkBackground,
  withViewport
} from './decorators/ui'; 