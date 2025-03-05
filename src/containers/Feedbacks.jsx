import React, { memo } from "react";
import FeedbackCard from "../components/FeedbackCard";
import Section from "../components/layout/Section";
import useFeedback from "../hooks/useFeedback";


/**
 * Feedbacks section displaying testimonials and recommendations.
 * 
 * @component
 * @returns {React.ReactElement} Feedbacks component
 */
const Feedbacks = () => {
  const feedbacks = useFeedback();
  
  // Skip rendering if no feedbacks are available
  if (!feedbacks || feedbacks.length === 0) {
    return null;
  }
  
  // Animation config for framer-motion
  const animation = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
  };

  return (
    <Section
      id="testimonials"
      title="Personal Recommendations"
      icon="simple-icons:trustpilot"
      animation={animation}
      className="feedbacks-section"
    >
      <div className="feedbacks-grid">
        {feedbacks.map((data, i) => (
          <FeedbackCard key={i} data={data} index={i} />
        ))}
      </div>
    </Section>
  );
};

// Apply memoization for performance optimization
export default memo(Feedbacks);
