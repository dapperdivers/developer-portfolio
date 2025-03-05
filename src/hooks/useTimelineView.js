import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for managing timeline view functionality.
 * Handles view selection (grid vs timeline) and visibility animations.
 * 
 * @function useTimelineView
 * @param {Object} options - Hook options
 * @param {string} [options.defaultView='timeline'] - Default view type ('timeline' or 'grid')
 * @param {number} [options.animationDelayIncrement=150] - Delay increment between items in ms
 * @param {boolean} [options.enableIntersectionObserver=true] - Whether to use intersection observer for entry animations
 * @returns {Object} Timeline view utilities
 */
const useTimelineView = (options = {}) => {
  const {
    defaultView = 'timeline',
    animationDelayIncrement = 150,
    enableIntersectionObserver = true
  } = options;
  
  // Current view state (grid or timeline)
  const [viewType, setViewType] = useState(defaultView);
  
  // Refs for timeline entries
  const entriesRef = useRef([]);
  const observerRef = useRef(null);
  
  // Toggle between timeline and grid views
  const toggleView = useCallback(() => {
    setViewType(prev => prev === 'timeline' ? 'grid' : 'timeline');
  }, []);
  
  // Set a specific view type
  const setView = useCallback((view) => {
    if (view === 'timeline' || view === 'grid') {
      setViewType(view);
    }
  }, []);
  
  // Calculate animation delay based on index
  const getAnimationDelay = useCallback((index) => {
    return `${index * (animationDelayIncrement / 1000)}s`;
  }, [animationDelayIncrement]);
  
  // Ref callback for timeline entries
  const entryRef = useCallback((index) => (el) => {
    if (el) {
      entriesRef.current[index] = el;
    }
  }, []);
  
  // Initialize intersection observer for entry animations
  useEffect(() => {
    if (!enableIntersectionObserver) return;
    
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );
    
    // Start observing elements
    const startObserving = () => {
      if (entriesRef.current.length > 0) {
        entriesRef.current.forEach((entryEl) => {
          if (entryEl) {
            observerRef.current.observe(entryEl);
          }
        });
      }
    };
    
    // Delay observation to allow for view transitions
    const timeoutId = setTimeout(startObserving, 100);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      clearTimeout(timeoutId);
    };
  }, [enableIntersectionObserver, viewType]);
  
  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Switch to grid on small screens
      if (window.innerWidth < 992 && viewType === 'timeline') {
        setViewType('grid');
      }
    };
    
    // Initial check
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [viewType]);
  
  // Extract date
  const extractDateYear = useCallback((dateString) => {
    // Try to extract year from common date formats
    // Examples: "May 2020 - Present", "2018 - 2020", "2022"
    const matches = dateString.match(/(\d{4})/g);
    return matches ? matches[0] : '';
  }, []);
  
  return {
    viewType,
    toggleView,
    setView,
    getAnimationDelay,
    entryRef,
    entriesRef,
    extractDateYear
  };
};

export default useTimelineView;