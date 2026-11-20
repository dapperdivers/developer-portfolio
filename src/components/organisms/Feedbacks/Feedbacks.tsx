import React, { memo } from "react";
import type { MotionProps } from 'framer-motion';
import FeedbackCard from '@molecules/FeedbackCard';
import Section from '../../layout/Section';
import useFeedback from "@hooks/useFeedback";
import { useAnimation } from "@context/AnimationContext";

/**
 * Feedbacks section displaying testimonials and recommendations.
 * 
 * @component
 * @returns {React.ReactElement} Feedbacks component
 */
const Feedbacks = () => {
  const feedbacks = useFeedback();
  const { animationEnabled, slideUpVariants } = useAnimation();
  
  // Animation config for framer-motion using AnimationContext
  const animation: MotionProps = {
    variants: slideUpVariants,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-50px" },
    // Use the animation context to determine if animations should be enabled
    animate: animationEnabled ? undefined : "visible"
  };

  // Skip rendering if no feedbacks are available
  if (!feedbacks || feedbacks.length === 0) {
    return null;
  }

  return (
    <Section
      id="testimonials"
      title="Personal Feedback"
      animation={animation}
      className="feedbacks-section"
      data-testid="feedbacks-section"
    >
      <div className="feedbacks-carousel-container">
        <div className="feedbacks-carousel">
          {feedbacks.map((data, i) => (
            <FeedbackCard key={`feedback-${i}`} data={data} index={i} animated={animationEnabled} />
          ))}
        </div>
      </div>
    </Section>
  );
};

// Apply memoization for performance optimization
export default memo(Feedbacks);
