import { useState, useEffect, useRef } from 'react';

/**
 * Hook for detecting when an element is visible in the viewport using Intersection Observer API.
 * Useful for implementing scroll-based animations or lazy loading.
 *
 * @function useIntersectionObserver
 * @param {Object} options - IntersectionObserver options
 * @param {number} [options.threshold=0] - A number between 0 and 1 indicating the percentage that should be visible before triggering
 * @param {Element|null} [options.root=null] - The element that is used as the viewport for checking visibility
 * @param {string} [options.rootMargin='0px'] - Margin around the root element
 * @returns {Array} - Array containing [ref, isIntersecting]
 * 
 * @example
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
 * 
 * return (
 *   <div ref={ref} className={isVisible ? 'animate-in' : ''}>
 *     This will animate when 50% visible
 *   </div>
 * );
 */
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Create the observer with provided options
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);
    
    // Start observing the element
    observer.observe(element);
    
    // Clean up function to stop observing on unmount
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]); // Re-run if options change
  
  return [elementRef, isIntersecting];
};

export default useIntersectionObserver;
