import React from 'react';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaUniversity } from 'react-icons/fa';
import { useMotionEnabled } from '@utils/motion';
import EducationIcon from '@atoms/EducationIcon';
import SchoolHeader from '@atoms/SchoolHeader';
import DegreeInfo from '@atoms/DegreeInfo';
import FieldsOfStudy from '@atoms/FieldsOfStudy';
import DateBubble from '@atoms/DateBubble';
import CertificationList from '@molecules/CertificationList';
import './EducationCard.css';
import type { Education } from '@/types/portfolio';

export type EducationCardVariant = 'default' | 'secure' | 'breach' | 'critical';

export interface EducationCardProps extends HTMLMotionProps<'article'> {
  /** Education data object */
  education: Education;
  /** Variant: changes the icon glyph and its colour, nothing else */
  variant?: EducationCardVariant;
  /** Index for staggered animations */
  index?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the component */
  animated?: boolean;
}

const VARIANT_ICONS = {
  default: { icon: FaGraduationCap, color: 'var(--color-primary)' },
  secure: { icon: FaUniversity, color: 'var(--color-success)' },
  breach: { icon: FaCertificate, color: 'var(--color-danger)' },
  critical: { icon: FaGraduationCap, color: 'var(--color-warning)' }
} as const;

/**
 * EducationCard: school, degree/major/minor and certifications on the
 * shared card surface. It is composed of the smaller education pieces:
 * EducationIcon, SchoolHeader, DateBubble, DegreeInfo, FieldsOfStudy and
 * CertificationList.
 *
 * @component
 */
const EducationCard = ({
  education,
  variant = 'default',
  index = 0,
  className = '',
  animated = true,
  ...props
}: EducationCardProps) => {
  const animationEnabled = useMotionEnabled(animated);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const { icon, color } = VARIANT_ICONS[variant];
  const certifications = education.certifications ?? [];
  const hasFields = Boolean(education.major || education.minor);

  return (
    <motion.article
      className={`education-card education-card--${variant} ${className}`}
      data-testid="education-card"
      variants={animationEnabled ? cardVariants : {}}
      initial={animationEnabled ? 'hidden' : false}
      animate="visible"
      {...props}
    >
      <header className="education-card__header">
        <EducationIcon icon={icon} color={color} animated={animationEnabled} />
        <div className="education-card__title-section">
          <SchoolHeader schoolName={education.schoolName} animated={animationEnabled} />
          {education.duration && (
            <DateBubble date={education.duration} size="sm" animated={animationEnabled} />
          )}
        </div>
      </header>

      <div className="education-card__academic-info">
        <DegreeInfo degree={education.degree} animated={animationEnabled} />
        {hasFields && (
          <FieldsOfStudy major={education.major} minor={education.minor} animated={animationEnabled} />
        )}
      </div>

      {certifications.length > 0 && (
        <CertificationList
          title="Certifications"
          certifications={certifications}
          animated={animationEnabled}
        />
      )}
    </motion.article>
  );
};

export default EducationCard;
