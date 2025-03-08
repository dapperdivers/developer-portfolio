import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

// Import the real App component
import App from '../../src/App';

// Import utility mocks
import { withHelmetProvider } from '../utils/mocks/helmetProvider';
import { withPortfolioContext } from '../utils/mocks/portfolioContext';
import { mockPortfolioData } from '../utils/mocks/data.js';

/**
 * # App Component Stories
 * 
 * This file contains stories for the main App component, which is the entry point 
 * of the developer portfolio application.
 * 
 * ## How to use this Storybook file:
 * 
 * 1. **View the full application**: Use the `WithProviders` story to see the entire
 *    application with mocked data, which is useful for testing the overall layout.
 * 
 * 2. **Understanding the structure**: The `Overview` story provides a visual guide
 *    to the component hierarchy and key features of the application.
 * 
 * ## Testing with Storybook:
 * 
 * - Use the Controls panel to modify props and see how they affect the component
 * - Toggle between different viewport sizes to test responsive behavior
 * - Use the Accessibility panel to check for a11y issues
 */

// Use a type or interface to ensure type safety with App Component
type AppProps = React.ComponentProps<typeof App>;

const meta: Meta<AppProps> = {
  title: 'Templates/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main application component that composes the entire portfolio page structure. It integrates the header, navigation, all content sections, and footer into a complete page layout.',
      },
    },
  },
  // Apply Storybook decorators using our utility mocks
  decorators: [withHelmetProvider, withPortfolioContext]
};

export default meta;
type Story = StoryObj<AppProps>;

/**
 * This story shows the complete App with all required providers automatically
 * applied through decorators. The decorators provide:
 * - HelmetProvider from '../utils/mocks/helmetProvider'
 * - PortfolioContext from '../utils/mocks/portfolioContext'
 * 
 * **Usage:** 
 * - Useful for testing the entire application flow
 * - Great for visual regression testing
 * - Shows how components interact with each other
 */
export const WithProviders: Story = {
  render: () => <App />
};

/**
 * This story provides a visual explanation of the App structure.
 * It's useful for documentation and onboarding new developers.
 * 
 * **Usage:**
 * - Learn about the component architecture
 * - Understand key features of the application
 * - See the overall component hierarchy
 */
export const Overview: Story = {
  // Remove decorators for this specific story as we don't need the providers
  decorators: [],
  render: () => (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0062cc, #0033cc)',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Portfolio App Structure</h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
        The App component is the root component that composes the entire portfolio site.
        It includes several key components and sections organized in a clean hierarchy.
      </p>
      <div style={{ 
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '0.5rem',
        maxWidth: '700px'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
          Component Hierarchy
        </h2>
        <pre style={{ 
          textAlign: 'left', 
          fontFamily: 'monospace', 
          fontSize: '0.9rem',
          lineHeight: '1.6',
          background: 'rgba(0,0,0,0.2)',
          padding: '1rem',
          borderRadius: '0.3rem',
          overflow: 'auto',
          maxHeight: '400px'
        }}>
{`<ErrorBoundary>
  <HelmetProvider>
    <PortfolioProvider>
      <div className="App">
        <Head /> {/* Meta tags & SEO */}
        <SkipToContent />
        <Navigation />
        <main id="main-content">
          <Suspense fallback={<Loading />}>
            <Greetings />  {/* Hero Section */}
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Proficiency />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Education />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Feedbacks />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <GithubProfile />
          </Suspense>
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  </HelmetProvider>
</ErrorBoundary>`}
        </pre>
      </div>
      <div style={{ 
        marginTop: '2rem', 
        textAlign: 'left', 
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        maxWidth: '700px'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
          Key Features
        </h2>
        <ul style={{ lineHeight: '1.6' }}>
          <li><strong>Lazy Loading:</strong> All major sections use React.lazy for code splitting</li>
          <li><strong>Error Boundaries:</strong> Each section has its own error boundary for fault tolerance</li>
          <li><strong>Accessibility:</strong> Includes skip-to-content link and semantic HTML structure</li>
          <li><strong>Performance:</strong> Uses Suspense for loading states and browser optimizations</li>
          <li><strong>Responsive Design:</strong> Adapts to all screen sizes and devices</li>
          <li><strong>Security:</strong> Applies security enhancements and input sanitization</li>
        </ul>
      </div>
      
      <div style={{ 
        marginTop: '2rem', 
        textAlign: 'left', 
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        maxWidth: '700px'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
          Storybook Usage Tips
        </h2>
        <ul style={{ lineHeight: '1.6' }}>
          <li><strong>Component Exploration:</strong> Use the sidebar to browse individual components</li>
          <li><strong>Controls Panel:</strong> Modify component props in real-time using the Controls tab</li>
          <li><strong>Responsive Testing:</strong> Use the viewport toolbar to test different screen sizes</li>
          <li><strong>Documentation:</strong> Click on the "Docs" tab for detailed component documentation</li>
          <li><strong>Accessibility:</strong> Use the Accessibility tab to check for WCAG compliance</li>
        </ul>
      </div>
    </div>
  )
}; 