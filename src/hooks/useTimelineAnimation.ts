import { useEffect, useCallback, useMemo, useRef, useState } from 'react';
import { Variants } from 'framer-motion';
import { useAnimation } from '../context/AnimationContext';

interface UseTimelineAnimationOptions {
  /** Index of the entry for staggered animations */
  index?: number;
  /** Unique ID for the entry */
  id?: string;
  /** Whether this is a full timeline or single entry */
  isTimeline?: boolean;
}

interface UseTimelineAnimationResult {
  /** Ref to attach to the timeline entry element */
  entryRef: React.RefObject<HTMLDivElement>;
  /** Whether the entry is in view */
  isEntryInView: boolean;
  /** Whether the entry verification is complete */
  isVerified: boolean;
  /** Whether this is an even-indexed entry */
  isEven: boolean;
  /** Animation delay based on index */
  animationDelay: string;
  /** Whether animations are enabled */
  animationEnabled: boolean;
  /** Animation variants for the main slide */
  slideVariants: Variants;
  /** Animation variants for date bubbles */
  bubbleVariants: Variants;
  /** Animation variants for timeline dots */
  dotVariants: Variants;
  /** Animation variants for security badges */
  securityBadgeVariants: Variants;
  /** Generated security ID */
  securityId: string;
}

/**
 * Custom hook for timeline entry animations
 * 
 * @param {UseTimelineAnimationOptions} options - Hook options
 * @returns {UseTimelineAnimationResult} Animation properties and controls
 */
const useTimelineAnimation = ({
  index = 0,
  id,
  isTimeline = false
}: UseTimelineAnimationOptions): UseTimelineAnimationResult => {
  const entryRef = useRef<HTMLDivElement>(null);
  const [isEntryInView, setIsEntryInView] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  
  // Get global animation context
  const { 
    animationEnabled, 
    getAnimationDelay,
    registerEntryAnimation,
    playEntryAnimation
  } = useAnimation();

  // Generate animation delay based on index
  const animationDelay = useMemo(() => getAnimationDelay(index), [getAnimationDelay, index]);

  // Entry ID for registration
  const entryId = useMemo(() => id || `timeline-entry-${index}`, [id, index]);

  // Initialize entry in animation registry
  useEffect(() => {
    if (entryId) {
      registerEntryAnimation(entryId, 'hidden');
    }
  }, [entryId, registerEntryAnimation]);

  // Set up intersection observer to trigger animations when entry becomes visible
  useEffect(() => {
    const currentRef = entryRef.current;
    
    if (!currentRef || !animationEnabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsEntryInView(true);
          
          // Trigger animation with staggered delay
          playEntryAnimation(entryId, index * 0.2);
          
          // Simulate security verification after a delay
          const verifyTimer = setTimeout(() => {
            setIsVerified(true);
          }, index * 200 + 1000);
          
          observer.unobserve(currentRef);
          
          return () => clearTimeout(verifyTimer);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "-50px 0px"
      }
    );
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [entryId, index, animationEnabled, playEntryAnimation]);

  // Animation variants for the entry
  const slideVariants = useMemo<Variants>(() => {
    const isEven = index % 2 === 0;
    
    return {
      hidden: { 
        opacity: 0, 
        x: isEven ? -50 : 50,
        y: 20,
        scale: 0.95,
        rotateY: isEven ? -5 : 5
      },
      visible: { 
        opacity: 1, 
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        transition: { 
          duration: 0.7, 
          delay: index * 0.1,
          ease: [0.43, 0.13, 0.23, 0.96] // Custom easing curve
        }
      }
    };
  }, [index]);
  
  // Date bubble animation
  const bubbleVariants = useMemo<Variants>(() => ({
    hidden: { 
      scale: 0.6,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.5, 
        delay: index * 0.2 + 0.3,
        ease: "backOut"
      }
    }
  }), [index]);
  
  // Connector dot animation
  const dotVariants = useMemo<Variants>(() => ({
    hidden: { 
      scale: 0,
      opacity: 0
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.4, 
        delay: index * 0.1 + 0.2,
        ease: "backOut"
      }
    }
  }), [index]);

  // Security badge verification animation
  const securityBadgeVariants = useMemo<Variants>(() => ({
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    scanning: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    },
    verified: {
      opacity: 1,
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        times: [0, 0.5, 1]
      }
    }
  }), []);

  // Helper for generating sequential security IDs
  const generateSecurityId = useCallback((): string => {
    const chars = '0123456789ABCDEF';
    let id = 'SEC-';
    for (let i = 0; i < 8; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  }, []);

  // Create memoized security ID
  const securityId = useMemo(() => generateSecurityId(), [generateSecurityId]);

  return {
    // Refs
    entryRef,
    
    // State
    isEntryInView,
    isVerified,
    isEven: index % 2 === 0,
    
    // Animation controls
    animationDelay,
    animationEnabled,
    
    // Animation variants
    slideVariants,
    bubbleVariants,
    dotVariants,
    securityBadgeVariants,
    
    // Generated values
    securityId
  };
};

export default useTimelineAnimation;
