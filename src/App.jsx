// Use named imports to allow tree-shaking to work properly
import { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import Head from "@atoms/Head";
import Navigation from "@molecules/Navigation";
import Footer from "@molecules/Footer";
import SkipToContent from "@atoms/SkipToContent";
// ContextDevTool is dynamically imported to prevent inclusion in production builds

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
import { AnimationProvider } from "@context/AnimationContext";
import { HelmetProvider } from 'react-helmet-async';

// Lazy load components for better performance
const Greetings = lazy(() => import("@organisms/Greetings"));
const Skills = lazy(() => import("@organisms/Skills"));
const Education = lazy(() => import("@organisms/Education"));
const Experience = lazy(() => import("@organisms/Experience"));
const Projects = lazy(() => import("@organisms/Projects"));
// Import GithubProfile directly instead of using lazy loading
import GithubProfile from "@organisms/GithubProfile/GithubProfile";
const Feedbacks = lazy(() => import("@organisms/Feedbacks"));

// Import CSS - Using Tailwind CSS for styled components
import "@assets/css/design-system/index.css"; // Design system variables
import "@assets/css/tailwind.css"; // Tailwind styles with component customizations
import "@assets/css/index.css"; // Main CSS file with global styles
// Note: browser-fixes.css is imported through utilities/index.css

function App() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Function to scroll to top of page
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  
  // Apply enhancements on mount
  useEffect(() => {
    // Apply any runtime browser compatibility fixes
    applyRuntimeFixes();
    
    // Initialize image optimization
    initImageOptimization();
    
    // Apply security enhancements
    applySecurityEnhancements();
    
    // Scroll event handler
    const handleScroll = () => {
      // Update sections animation
      const sections = document.querySelectorAll('[class*="-section"]');
      sections.forEach(section => {
        if (isElementInViewport(section)) {
          section.classList.add('animate-fadeIn');
        }
      });
      
      // Show scroll button when scrolled down
      setShowScrollButton(window.scrollY > 300);
    };
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
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
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Lazily load the ContextDevTool only in development mode
  const DevTools = lazy(() => {
    // Only import in development mode
    if (import.meta.env.DEV) {
      return import("@utils/ContextDevTool").then(module => ({
        default: module.default
      }));
    }
    // Return an empty component in production
    return Promise.resolve({ default: () => null });
  });

  return (
    <ErrorBoundary fallback={errorFallback}>
      <HelmetProvider>
        <PortfolioProvider>
          <AnimationProvider>
            <div className="App bg-background text-text">
            <Head />
            <SkipToContent mainId="main-content" />
            <Navigation />
            {/* Developer tools - only rendered in development */}
            {import.meta.env.DEV && (
              <Suspense fallback={null}>
                <DevTools />
              </Suspense>
            )}
            
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
                <GithubProfile id="contact" />
              </ErrorBoundary>
            </main>
            
              <Footer />
              
              {/* Scroll to top button */}
              {showScrollButton && (
                <div className="scroll-top-container">
                  <button
                    onClick={scrollToTop}
                    style={{
                      position: 'fixed',
                      bottom: '2rem',
                      right: '2rem',
                      backgroundColor: 'rgba(0, 10, 20, 0.9)', 
                      color: '#00aaff',
                      padding: '0.8rem 1.2rem',
                      borderRadius: '2px',
                      boxShadow: '0 0 15px rgba(0, 170, 255, 0.6), 0 0 30px rgba(0, 170, 255, 0.3)',
                      zIndex: 1000,
                      border: '1px solid rgba(0, 170, 255, 0.5)',
                      borderLeft: '3px solid #00aaff',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      animation: 'fadeIn 0.3s ease-out forwards',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      backdropFilter: 'blur(8px)',
                      fontFamily: '"JetBrains Mono", monospace, system-ui',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      gap: '8px',
                      width: 'auto',
                      height: 'auto',
                      minWidth: '180px'
                    }}
                    className="scroll-top-btn"
                    aria-label="Return to system root"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="arrow-icon"
                    >
                      <line x1="12" y1="19" x2="12" y2="5"></line>
                      <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                    <span className="btn-text">
                      <span className="prefix">&gt;</span> cd /root
                    </span>
                    <div className="btn-status-light"></div>
                  </button>
                </div>
              )}
            </div>
          </AnimationProvider>
        </PortfolioProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
