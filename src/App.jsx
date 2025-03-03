import React, { useEffect, Suspense, lazy } from 'react';
import Head from "./components/Head";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import SkipToContent from "./components/SkipToContent";
import { applyBrowserFixes } from "./utils/accessibility.jsx";
import { initImageOptimization } from "./utils/imageOptimizer";
import { applySecurityEnhancements } from "./utils/security";
import Loading from "./components/Loading";
import { PortfolioProvider } from "./context/PortfolioContext";

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

  return (
    <PortfolioProvider>
      <div className="App">
        <Head />
        <SkipToContent mainId="main-content" />
        <Navigation />
        
        <main id="main-content">
          <Suspense fallback={<Loading />}>
            <Greetings />
            <Skills />
            <Proficiency />
            <Education />
            <Experience />
            <Feedbacks />
            <Projects />
            <GithubProfile id="contact" />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </PortfolioProvider>
  );
}

export default App;
