// Use named imports to allow tree-shaking to work properly
import { useEffect, useState, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import Head from "@/components/layout/Head";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import SkipToContent from "@/components/atoms/SkipToContent";
import Background from "@/components/layout/Background";

// Use single import for all debugging
import { DebugProvider, RegisterDebugComponents } from "@utils/debug";

// Enable debug tools if not set
if (localStorage.getItem('debug_tools_enabled') === null) {
  localStorage.setItem('debug_tools_enabled', 'true');
}

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

// Lazy load components
const Greetings = lazy(() => import("@organisms/Greetings"));
const Skills = lazy(() => import("@organisms/Skills"));
const Education = lazy(() => import("@organisms/Education"));
const Experience = lazy(() => import("@organisms/Experience"));
const Projects = lazy(() => import("@organisms/Projects"));
const Contact = lazy(() => import("@organisms/GithubProfile"));

// Updated comprehensive list of components to debug
const componentsToDebug = {
  // Layout components
  Background,
  
  // Atom components - import them here so we don't need to modify each file
  Loading,
  SkipToContent,
  Head,
  
  // Molecule components
  Navigation,
  Footer,
  ErrorBoundary,
  
  // Organism components
  Greetings,
  Skills,
  Experience,
  Projects,
  Education,
  Contact
};

// Initial debug configuration - THIS IS THE ONLY PLACE WE NEED TO EDIT FOR DEBUGGING
const initialDebugConfig = {
  enabled: localStorage.getItem('debug_tools_enabled') === 'true',
  components: {
    // Components to debug by default
    Background: true,
    Greetings: true,
    Skills: true,
    Experience: true,
    Projects: false,
    Education: false,
    Contact: false,
    Navigation: false,
    Footer: false
  },
  features: {
    // Features to enable by default
    profiling: true,
    backgroundEffects: true,
    animations: true,
    scrollDebugging: false,
    layoutMonitoring: false,
    renderVisualizer: false,
    showFPS: true
  }
};

/**
 * Main App Component
 * 
 * The root component for the portfolio application
 */
function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  
  // Handle initial loading
  useEffect(() => {
    // Apply runtime fixes for browser compatibility
    applyRuntimeFixes();
    
    // Initialize image optimization
    initImageOptimization();
    
    // Apply security enhancements
    applySecurityEnhancements();
    
    // Simulate loading delay for dev testing of the loader
    const timer = setTimeout(() => {
      setIsLoaded(true);
      
      // Hide loader after transition completes
      setTimeout(() => {
        setHideLoader(true);
      }, 1000);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Error fallback component for suspense
  const errorFallback = () => (
    <div className="error-boundary">
      <h2>Something went wrong</h2>
      <p>There was an error loading this section.</p>
      <button onClick={() => window.location.reload()}>
        Reload page
      </button>
    </div>
  );

  return (
    <HelmetProvider>
      <ErrorBoundary fallback={errorFallback}>
        <PortfolioProvider>
          <AnimationProvider>
            {/* Wrap the app with our debug provider - everything inside gets debugging capabilities */}
            <DebugProvider initialConfig={initialDebugConfig}>
              {/* Register components for debugging without modifying their source files */}
              <RegisterDebugComponents components={componentsToDebug} />
              
              <Background>
                <SkipToContent />
                <Head />
                <Navigation />
                
                <main id="main-content">
                  <Suspense fallback={<Loading text="Loading sections..." />}>
                    <Greetings />
                    <Skills />
                    <Experience />
                    <Projects />
                    <Education />
                    <Contact />
                  </Suspense>
                </main>
                
                <Footer />
                
                {!hideLoader && (
                  <div className={`initial-loader ${isLoaded ? 'loaded' : ''}`}>
                    <Loading text="Initializing portfolio..." />
                  </div>
                )}
              </Background>
            </DebugProvider>
          </AnimationProvider>
        </PortfolioProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

// Export the app - no need for withGlobalDebug, the DebugProvider handles debugging now
export default App;
