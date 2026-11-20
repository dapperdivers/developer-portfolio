import React from "react";
import AcademicDetails from '@molecules/AcademicDetails';
import './CollegeInfo.css';

export interface CollegeInfoProps {
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
 * College information: university name, academic details and graduation
 * date. It renders AcademicDetails, so the two always look the same.
 *
 * @component
 */
const CollegeInfo = ({ className = "", ...rest }: CollegeInfoProps) => (
  <AcademicDetails {...rest} className={`college-info ${className}`} />
);

export default CollegeInfo;
