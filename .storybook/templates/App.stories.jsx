import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { PortfolioProvider } from '@context/PortfolioContext';

// Import the real App component
import App from '@/App';

// Mock data
import { mockPortfolioData } from '../utils/mockData';

// For Storybook display
export default {
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
};

// Create a story that wraps the App with necessary providers
export const AppWithProviders = () => {
  // Create a Helmet context to avoid conflicts
  const helmetContext = {};
  
  return (
    <HelmetProvider context={helmetContext}>
      <PortfolioProvider testValue={mockPortfolioData}>
        <App />
      </PortfolioProvider>
    </HelmetProvider>
  );
};

// Also include a simplified overview for documentation purposes
export const AppOverview = () => (
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
  </div>
);

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