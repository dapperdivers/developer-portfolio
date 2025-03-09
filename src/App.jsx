// Use named imports to allow tree-shaking to work properly
import { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import Head from "@atoms/Head";
import Navigation from "@molecules/Navigation";
import Footer from "@molecules/Footer";
import SkipToContent from "@atoms/SkipToContent";
import Background from "@layout/Background";
// Import the global debug wrapper
import { withGlobalDebug } from "@utils/ContextDevTool";

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

  // Intersection Observer for section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    // Observe all section elements
    document.querySelectorAll('[class*="-section"]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Optimized scroll handler for scroll button only
  useEffect(() => {
    let lastKnownScrollPosition = 0;
    let ticking = false;

    const handleScroll = () => {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollButton(lastKnownScrollPosition > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply enhancements on mount
  useEffect(() => {
    // Apply any runtime browser compatibility fixes
    applyRuntimeFixes();
    
    // Initialize image optimization
    initImageOptimization();
    
    // Apply security enhancements
    applySecurityEnhancements();
  }, []);

  // Custom fallback UI for unhandled errors
  const errorFallback = () => (
    <div className="error-fallback">
      <h2>Something went wrong</h2>
      <p>We apologize for the inconvenience. Please try refreshing the page.</p>
      <button onClick={() => window.location.reload()}>Refresh Page</button>
    </div>
  );
  
  return (
    <ErrorBoundary fallback={errorFallback}>
      <HelmetProvider>
        <PortfolioProvider>
          <AnimationProvider>
            <Background
              enableMatrix={true}
              enableBinaryStreams={true}
              enableCircuitGrid={true}
              enableScanlines={true}
              enableGlitch={true}
              enableColorPulse={true}
              enableNoise={true}
              matrixCharCount={150}
            >
              <div className="App text-text">
                <Head />
                <SkipToContent mainId="main-content" />
                <Navigation />
                
                <main id="main-content" className="text-text">
                  <ErrorBoundary>
                    <Suspense fallback={<Loading />}>
                      <>
                        <Greetings />
                        <Skills />
                        <Education />
                        <Experience />
                        <Feedbacks />
                        <Projects />
                        <GithubProfile id="contact" />
                      </>
                    </Suspense>
                  </ErrorBoundary>
                </main>
                
                <Footer />
                
                {/* Scroll to top button */}
                {showScrollButton && (
                  <div 
                    className="scroll-to-top-btn"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    role="button"
                    tabIndex={0}
                  >
                    <span className="arrow-up">↑</span>
                  </div>
                )}
              </div>
            </Background>
          </AnimationProvider>
        </PortfolioProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

// Wrap App component with global debug tools
export default withGlobalDebug(App);
