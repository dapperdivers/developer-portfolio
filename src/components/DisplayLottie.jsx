import React, { Suspense, useState, useRef, useEffect, useMemo } from 'react';
import Lottie from 'lottie-react';
import Loading from './Loading';
import { FaPlay, FaPause } from 'react-icons/fa';
import './DisplayLottie.css';

/**
 * A component for displaying Lottie animations with accessibility controls
 * and performance optimizations.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.animationData - Lottie animation data object
 * @param {string} [props.ariaLabel="Animation"] - Accessible description of the animation
 * @param {boolean} [props.loop=true] - Whether the animation should loop
 * @param {string} [props.size="medium"] - Animation size (small, medium, large)
 * @param {number} [props.quality=1] - Animation quality (0.5 to 1)
 * @param {boolean} [props.shouldOptimize=true] - Whether to apply performance optimizations
 * @returns {React.ReactElement} DisplayLottie component
 */
const DisplayLottie = ({ 
    animationData, 
    ariaLabel = "Animation illustrating coding and development",
    loop = true,
    size = "medium",
    quality = 1,
    shouldOptimize = true
}) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isLowPower, setIsLowPower] = useState(false);
    const [controlsVisible, setControlsVisible] = useState(false);
    const lottieRef = useRef(null);
    
    // Define size constraints
    const sizeMap = useMemo(() => ({
        small: { maxWidth: "25rem", maxHeight: "25rem" },
        medium: { maxWidth: "45rem", maxHeight: "45rem" },
        large: { maxWidth: "55rem", maxHeight: "55rem" }
    }), []);
    
    // Optimize animation data if needed
    const optimizedAnimationData = useMemo(() => {
        if (!shouldOptimize || !animationData) return animationData;
        
        try {
            // Deep clone the animation data
            const optimized = JSON.parse(JSON.stringify(animationData));
            
            // Apply optimizations based on device capabilities
            const optimizationLevel = isLowPower ? 0.5 : quality;
            
            // Reduce framerate for low-power devices
            if (optimized.fr && optimized.fr > 30 && optimizationLevel < 0.8) {
                optimized.fr = 30;
            }
            
            // Limit number of animations on low-power devices
            if (optimized.layers && optimizationLevel < 0.7) {
                // Keep only essential layers
                optimized.layers = optimized.layers.filter((layer, index) => {
                    // Keep first few layers and essential animation layers
                    return index < 5 || layer.nm?.includes('main');
                });
            }
            
            return optimized;
        } catch (err) {
            console.error("Error optimizing animation:", err);
            return animationData;
        }
    }, [animationData, shouldOptimize, isLowPower, quality]);
    
    // Detect low-power devices
    useEffect(() => {
        // Check for battery API
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                // Consider low power if battery level is below 20%
                setIsLowPower(battery.level < 0.2 && !battery.charging);
                
                // Listen for changes
                battery.addEventListener('levelchange', () => {
                    setIsLowPower(battery.level < 0.2 && !battery.charging);
                });
            }).catch(() => {
                // If unable to access battery API, use device memory as fallback
                if ('deviceMemory' in navigator) {
                    setIsLowPower(navigator.deviceMemory < 4);
                }
            });
        } else if ('deviceMemory' in navigator) {
            // Use device memory as fallback for battery API
            setIsLowPower(navigator.deviceMemory < 4);
        }
    }, []);
    
    // Check for reduced motion preference
    useEffect(() => {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleMotionPreferenceChange = (e) => {
            const prefersReduced = e.matches;
            setPrefersReducedMotion(prefersReduced);
            
            // If user prefers reduced motion, pause animation by default
            if (prefersReduced && isPlaying) {
                setIsPlaying(false);
            }
        };
        
        // Initial check
        handleMotionPreferenceChange(motionQuery);
        
        // Add listener for changes
        motionQuery.addEventListener('change', handleMotionPreferenceChange);
        
        // Cleanup
        return () => {
            motionQuery.removeEventListener('change', handleMotionPreferenceChange);
        };
    }, [isPlaying]);
    
    // Configure style based on size and optimization level
    const containerStyle = {
        ...sizeMap[size],
        margin: '0 auto'
    };
    
    // Play/pause the animation
    const togglePlay = () => {
        if (lottieRef.current) {
            if (isPlaying) {
                lottieRef.current.pause();
            } else {
                lottieRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    
    return (
        <Suspense fallback={<Loading />}>
            <div 
                className={`lottie-container ${controlsVisible ? 'controls-visible' : ''}`}
                style={containerStyle}
                role="img"
                aria-label={ariaLabel}
                onClick={() => setControlsVisible(!controlsVisible)}
            >
                <Lottie
                    ref={lottieRef}
                    animationData={optimizedAnimationData}
                    loop={loop}
                    autoplay={!prefersReducedMotion}
                    rendererSettings={{
                        preserveAspectRatio: 'xMidYMid slice',
                        progressiveLoad: true,
                        hideOnTransparent: true
                    }}
                />
                
                {/* Accessibility controls */}
                <div className="animation-controls" aria-live="polite">
                    <button 
                        onClick={togglePlay}
                        className="animation-control-button"
                        aria-label={isPlaying ? "Pause animation" : "Play animation"}
                        aria-pressed={isPlaying}
                    >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                        <span className="sr-only">
                            {isPlaying ? "Pause" : "Play"} animation
                        </span>
                    </button>
                    
                    <div className="animation-status" aria-live="polite">
                        Animation is {isPlaying ? "playing" : "paused"}
                    </div>
                </div>
                
                {/* Hidden text for screen readers to explain what the animation shows */}
                <div className="sr-only">
                    {ariaLabel}
                </div>
            </div>
        </Suspense>
    );
};
 
export default DisplayLottie;
