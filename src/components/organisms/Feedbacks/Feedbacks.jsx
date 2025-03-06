import React, { memo } from "react";
import PropTypes from 'prop-types';
import FeedbackCard from '@molecules/FeedbackCard';
import Section from '@layout/Section';
import useFeedback from "@hooks/useFeedback";

/**
 * Feedbacks section displaying testimonials and recommendations.
 * 
 * @component
 * @returns {React.ReactElement} Feedbacks component
 */
const Feedbacks = () => {
  const feedbacks = useFeedback();
  
  // Animation config for framer-motion
  const animation = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.5 }
  };

  // Skip rendering if no feedbacks are available
  if (!feedbacks || feedbacks.length === 0) {
    return null;
  }

  return (
    <Section
      id="testimonials"
      title="Personal Recommendations"
      icon="simple-icons:trustpilot"
      animation={animation}
      className="py-16"
      data-testid="feedbacks-section"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((data, i) => (
          <FeedbackCard key={`feedback-${i}`} data={data} index={i} />
        ))}
      </div>
    </Section>
  );
};

Feedbacks.propTypes = {
  /* No props for this component as it uses context */
};

// Apply memoization for performance optimization
export default memo(Feedbacks);
