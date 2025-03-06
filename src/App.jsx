import React, { useEffect, Suspense, lazy } from 'react';
import Head from "@atoms/Head";
import Navigation from "@molecules/Navigation";
import Footer from "@molecules/Footer";
import SkipToContent from "@atoms/SkipToContent";

// Import Iconify icon collections - this ensures icons are available offline
import '@iconify-json/logos';
import '@iconify-json/simple-icons';
import '@iconify-json/vscode-icons';

import { applyRuntimeFixes } from "@utils/browserFixes";
import { initImageOptimization } from "@utils/imageOptimizer";
import { applySecurityEnhancements } from "@utils/security";
import Loading from "@atoms/Loading";
import ErrorBoundary from "@molecules/ErrorBoundary";
import { PortfolioProvider } from "@context/PortfolioContext";
import { HelmetProvider } from 'react-helmet-async';

// Lazy load components for better performance
const Greetings = lazy(() => import("@organisms/Greetings"));
const Skills = lazy(() => import("@organisms/Skills"));
const Education = lazy(() => import("@organisms/Education"));
const Experience = lazy(() => import("@organisms/Experience"));
const Projects = lazy(() => import("@organisms/Projects"));
const GithubProfile = lazy(() => import("@organisms/GithubProfile"));
const Feedbacks = lazy(() => import("@organisms/Feedbacks"));

// Import CSS - Using Tailwind CSS for styled components
import "@assets/css/design-system/index.css"; // Design system variables
import "@assets/css/tailwind.css"; // Tailwind styles with component customizations
import "@assets/css/index.css"; // Main CSS file with global styles
// Note: browser-fixes.css is imported through utilities/index.css

function App() {
  // Apply enhancements on mount
  useEffect(() => {
    // Apply any runtime browser compatibility fixes
    applyRuntimeFixes();
    
    // Initialize image optimization
    initImageOptimization();
    
    // Apply security enhancements
    applySecurityEnhancements();
    
    // Improve scroll behavior
    document.addEventListener('scroll', function() {
      const sections = document.querySelectorAll('[class*="-section"]');
      sections.forEach(section => {
        if (isElementInViewport(section)) {
          section.classList.add('animate-fadeIn');
        }
      });
    });
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  }, []);

  // Custom fallback UI for unhandled errors
  const errorFallback = () => (
    <div className="error-container bg-gray-900 text-white" role="alert" style={{ 
      padding: '2rem', 
      margin: '2rem auto',
      maxWidth: '800px',
      textAlign: 'center' 
    }}>
      <h1>Something went wrong</h1>
      <p>We&apos;re sorry, but there was an error loading this page.</p>
      <p>Try reloading the page or clearing your browser cache.</p>
      {/* Provide a button to reload */}
      <button 
        onClick={() => window.location.reload()} 
        style={{
          padding: '0.5rem 1rem',
          background: '#22d3ee', // cyan-400
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
          <div className="App bg-background text-text">
            <Head />
            <SkipToContent mainId="main-content" />
            <Navigation />
            
            <main id="main-content" className="bg-background text-text">
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
