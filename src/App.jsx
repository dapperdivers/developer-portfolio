import React, { useEffect, Suspense, lazy } from 'react';
import Head from "./components/Head";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SkipToContent from "./components/SkipToContent";

// Import Iconify icon collections - this ensures icons are available offline
import '@iconify-json/logos';
import '@iconify-json/simple-icons';
import '@iconify-json/vscode-icons';

import { applyBrowserFixes } from "./utils/accessibility.jsx";
import { initImageOptimization } from "./utils/imageOptimizer";
import { applySecurityEnhancements } from "./utils/security";
import Loading from "./components/Loading";
import ErrorBoundary from "./components/ErrorBoundary";
import { PortfolioProvider } from "./context/PortfolioContext";
import { HelmetProvider } from 'react-helmet-async';

// Lazy load components for better performance
const Greetings = lazy(() => import("./containers/Greetings"));
const Skills = lazy(() => import("./containers/Skills"));
const Proficiency = lazy(() => import("./containers/Proficiency"));
const Education = lazy(() => import("./containers/Education"));
const Experience = lazy(() => import("./containers/Experience"));
const Projects = lazy(() => import("./containers/Projects"));
const GithubProfile = lazy(() => import("./containers/GithubProfile"));
const Feedbacks = lazy(() => import("./containers/Feedbacks"));

// Import CSS - Modern optimized styles with proper ordering
import "./assets/css/design-tokens.css"; // Design system variables
import "./assets/css/custom-bootstrap.css";
import "./assets/css/typography.css";
import "./assets/css/component-styles.css";
import "./assets/css/hero-section.css";
import "./assets/css/skills-section.css";
import "./assets/css/proficiency-section.css";
import "./assets/css/education-section.css";
import "./assets/css/experience-section.css";
import "./assets/css/projects-section.css";
import "./assets/css/feedbacks-section.css";
import "./assets/css/contact-section.css";
import "./assets/css/footer.css";
import "./assets/css/browser-fixes.css";

function App() {
  // Apply enhancements on mount
  useEffect(() => {
    // Apply cross-browser compatibility fixes
    applyBrowserFixes();
    
    // Initialize image optimization
    initImageOptimization();
    
    // Apply security enhancements
    applySecurityEnhancements();
  }, []);

  // Custom fallback UI for unhandled errors
  const errorFallback = (error, errorInfo) => (
    <div className="error-container" role="alert" style={{ 
      padding: '2rem', 
      margin: '2rem auto',
      maxWidth: '800px',
      textAlign: 'center' 
    }}>
      <h1>Something went wrong</h1>
      <p>We're sorry, but there was an error loading this page.</p>
      <p>Try reloading the page or clearing your browser cache.</p>
      {/* Provide a button to reload */}
      <button 
        onClick={() => window.location.reload()} 
        style={{
          padding: '0.5rem 1rem',
          background: '#3563E9',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        Reload Page
      </button>
    </div>
  );

  return (
    <ErrorBoundary fallback={errorFallback}>
      <HelmetProvider>
        <PortfolioProvider>
          <div className="App">
            <Head />
            <SkipToContent mainId="main-content" />
            <Navigation />
            
            <main id="main-content">
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <Greetings />
                </Suspense>
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <Skills />
                </Suspense>
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <Proficiency />
                </Suspense>
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <Education />
                </Suspense>
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <Experience />
                </Suspense>
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <Feedbacks />
                </Suspense>
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <Projects />
                </Suspense>
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <GithubProfile id="contact" />
                </Suspense>
              </ErrorBoundary>
            </main>
            
            <Footer />
          </div>
        </PortfolioProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
