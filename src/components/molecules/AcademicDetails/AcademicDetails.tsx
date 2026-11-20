import React from "react";
import { motion } from 'framer-motion';
import { useMotionEnabled, slideUpVariants } from '@utils/motion';
import SchoolHeader from '@atoms/SchoolHeader';
import DegreeInfo from '@atoms/DegreeInfo';
import FieldsOfStudy from '@atoms/FieldsOfStudy';
import DateBubble from '@atoms/DateBubble';
import './AcademicDetails.css';

export interface AcademicDetailsProps {
  /** Name of the school or institution */
  schoolName: string;
  /** Degree title (e.g., Bachelor of Science) */
  degree: string;
  /** Major field of study */
  major?: string;
  /** Minor field of study */
  minor?: string;
  /** Graduation date */
  graduationDate: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * School, degree, fields of study and graduation date on the shared card
 * surface. The same pieces as EducationCard, without icon or certifications.
 *
 * @component
 */
const AcademicDetails = ({
  schoolName,
  degree,
  major,
  minor,
  graduationDate,
  className = "",
  animated = true
}: AcademicDetailsProps) => {
  // Animate only when the prop is on and reduced motion is not requested
  const shouldAnimate = useMotionEnabled(animated);

  return (
    <motion.div
      className={`academic-details ${className}`}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={shouldAnimate ? slideUpVariants : {}}
    >
      <SchoolHeader schoolName={schoolName} animated={shouldAnimate} />

      <div className="academic-panel">
        <DegreeInfo degree={degree} animated={shouldAnimate} />
        <FieldsOfStudy major={major} minor={minor} animated={shouldAnimate} />
      </div>

      <DateBubble date={graduationDate} size="sm" animated={shouldAnimate} />
    </motion.div>
  );
};

export default AcademicDetails;
