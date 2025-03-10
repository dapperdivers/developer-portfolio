import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing timeline/grid view transitions and animations
 * @param {Object} options - Configuration options
 * @param {string} [options.defaultView='timeline'] - Initial view type ('timeline' or 'grid')
 * @param {number} [options.animationDelayIncrement=200] - Delay increment in milliseconds between animations
 * @param {number} [options.gridBreakpoint=1024] - Breakpoint width in pixels for switching to grid view
 * @returns {Object} Timeline view state and helper functions
 */
const useTimelineView = ({
  defaultView = 'timeline',
  animationDelayIncrement = 200,
  gridBreakpoint = 1024
} = {}) => {
  const [viewType, setViewType] = useState(defaultView);
  const entriesRef = useRef([]);

  // Toggle between timeline and grid views
  const toggleView = useCallback(() => {
    setViewType(prev => prev === 'timeline' ? 'grid' : 'timeline');
  }, []);

  // Set a specific view type
  const setView = useCallback((type) => {
    if (type === 'timeline' || type === 'grid') {
      setViewType(type);
    }
  }, []);

  // Get animation delay based on index
  const getAnimationDelay = useCallback((index) => {
    return `${(index * animationDelayIncrement) / 1000}s`;
  }, [animationDelayIncrement]);

  // Create ref callback for timeline entries
  const entryRef = useCallback((index) => (element) => {
    if (element) {
      entriesRef.current[index] = element;
    }
  }, []);

  // Extract year from date string
  const extractDateYear = useCallback((dateString) => {
    const match = dateString.match(/\b\d{4}\b/);
    return match ? match[0] : '';
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < gridBreakpoint) {
        setViewType('grid');
      }
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gridBreakpoint]);

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