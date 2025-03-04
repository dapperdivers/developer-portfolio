import React from 'react';
import App from '../../App';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { PortfolioContext } from '../../context/PortfolioContext';
import { mockPortfolioData } from '../utils/mockData';
import { withPortfolioContext, withViewport } from '../utils/decorators';

// For the App component, we need to import specific mocks to avoid issues
import { withHelmetProvider } from '../utils/mockHelmetProvider';


export default {
  title: 'Templates/App',
  component: App,
  tags: ['autodocs'],
  decorators: [withHelmetProvider, withPortfolioContext],
  parameters: {
    docs: {
      description: {
        component: 'Main application component that composes the entire portfolio page structure. It integrates the header, navigation, all content sections, and footer into a complete page layout.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'landmark-unique', enabled: true },
          { id: 'heading-order', enabled: true },
          { id: 'skip-link', enabled: true }
        ],
      },
    },
    // Set a larger viewport for this component
    layout: 'fullscreen',
    // Disable default padding to show the full layout
    paddings: { disable: true }
  },
};


// Note: For the App component, we can't use args since it's a top-level component
// that includes the entire application structure
const Template = () => <App />;

// Default story - complete portfolio
export const CompletePortfolio = Template.bind({});
CompletePortfolio.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Verify main structural elements', async () => {
    // Check for the skip link
    await expect(canvas.getByText('Skip to content')).toBeInTheDocument();
    
    // Check for navigation
    await expect(canvas.getByRole('navigation')).toBeInTheDocument();
    
    // Check for main content
    await expect(canvas.getByRole('main')).toBeInTheDocument();
    
    // Check for footer
    await expect(canvas.getByRole('contentinfo')).toBeInTheDocument();
  });
  
  await step('Verify key sections exist', async () => {
    // We can check for section headings to verify sections are present
    // Note: Some sections might not be visible initially due to lazy loading
    
    // These should be visible immediately
    await expect(canvas.getByText('Proficiency')).toBeInTheDocument();
    await expect(canvas.getByText('Skills')).toBeInTheDocument();
  });
};

/**
 * Mobile view of the complete portfolio
 */
export const MobileView = Template.bind({});
MobileView.decorators = [withViewport('mobile')];
MobileView.parameters = {
  docs: {
    description: {
      story: 'Mobile view of the complete portfolio showing responsive layout adaptations.'
    }
  }
};

/**
 * Tablet view of the complete portfolio
 */
export const TabletView = Template.bind({});
TabletView.decorators = [withViewport('tablet')];
TabletView.parameters = {
  docs: {
    description: {
      story: 'Tablet view of the complete portfolio.'
    }
  }
};

/**
 * ## Application Structure
 * 
 * The App component serves as the main application shell with the following structure:
 * 
 * ```
 * <ErrorBoundary>
 *   <HelmetProvider>
 *     <PortfolioProvider>
 *       <Head /> (Metadata)
 *       <SkipToContent />
 *       <Navigation />
 *       <main>
 *         <Greetings />
 *         <Skills />
 *         <Proficiency />
 *         <Education />
 *         <Experience />
 *         <Feedbacks />
 *         <Projects />
 *         <GithubProfile />
 *       </main>
 *       <Footer />
 *     </PortfolioProvider>
 *   </HelmetProvider>
 * </ErrorBoundary>
 * ```
 * 
 * ## Technical Features
 * 
 * 1. **Performance Optimizations**:
 *    - Code splitting with React.lazy
 *    - Suspense for loading states
 *    - Browser fixes and optimizations
 * 
 * 2. **Accessibility**:
 *    - Skip to content link
 *    - Semantic HTML structure
 *    - ARIA attributes
 *    - Error boundaries for fault tolerance
 * 
 * 3. **Error Handling**:
 *    - ErrorBoundary for each section
 *    - Fallback UI for error states
 * 
 * ## Implementation Notes
 * 
 * The App component implements the complete page layout and applies various enhancements:
 * - CSS loading in correct cascade order
 * - Browser compatibility fixes
 * - Security enhancements
 * - Image optimization
 */