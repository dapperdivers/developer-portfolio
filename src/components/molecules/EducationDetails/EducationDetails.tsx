import React from "react";
import { motion } from "framer-motion";
import { useMotionEnabled, slideUpVariants } from '@utils/motion';
import SchoolHeader from '@atoms/SchoolHeader';
import DegreeInfo from '@atoms/DegreeInfo';
import FieldsOfStudy from '@atoms/FieldsOfStudy';
import DateBubble from '@atoms/DateBubble';
import CertificationList from '@molecules/CertificationList';
import type { Certification } from '@/types/portfolio';
import './EducationDetails.css';

export interface EducationDetailsProps {
  /** Name of the school or institution */
  schoolName: string;
  /** Degree title, optionally "Degree in Major" */
  subHeader: string;
  /** Time period of education */
  duration: string;
  /** Minor field of study (a leading "Minor in " is dropped) */
  desc?: string;
  /** Bullet points for additional details */
  descBullets?: string[];
  /** Certifications earned */
  certifications?: Certification[];
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

/**
 * Education details on the shared card surface: school, degree and fields,
 * dates, optional bullets and the ruled certification list. Built from the
 * same pieces as EducationCard.
 *
 * @component
 */
const EducationDetails = ({
  schoolName,
  subHeader,
  duration,
  desc,
  descBullets = [],
  certifications = [],
  className = "",
  animated = true
}: EducationDetailsProps) => {
  const animationEnabled = useMotionEnabled(animated);

  // Extract degree and major from subHeader if it follows the pattern "X in Y"
  const degreeMatch = subHeader.match(/^(.*?)\s+in\s+(.*)$/);
  const degree = degreeMatch ? degreeMatch[1] : subHeader;
  const major = degreeMatch ? degreeMatch[2] : '';

  return (
    <motion.div
      className={`education-details ${className}`}
      variants={animationEnabled ? slideUpVariants : {}}
      initial={animationEnabled ? "hidden" : "visible"}
      animate="visible"
    >
      <SchoolHeader schoolName={schoolName} animated={animationEnabled} />

      <div className="education-academic-info">
        <DegreeInfo degree={degree} animated={animationEnabled} />
        {(major || desc) && (
          <FieldsOfStudy major={major} minor={desc} animated={animationEnabled} />
        )}
      </div>

      <DateBubble date={duration} size="sm" animated={animationEnabled} />

      {descBullets.length > 0 && (
        <ul className="education-bullets">
          {descBullets.map((bullet, i) => (
            <li key={i} className="education-bullet-item">{bullet}</li>
          ))}
        </ul>
      )}

      <CertificationList
        title="Certifications"
        certifications={certifications}
        animated={animationEnabled}
      />
    </motion.div>
  );
};

export default EducationDetails;
