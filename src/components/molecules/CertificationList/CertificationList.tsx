import React from "react";
import CertificationBadge from '@molecules/CertificationBadge';
import type { Certification } from '@/types/portfolio';
import './CertificationList.css';

export interface CertificationListProps {
  /** Certifications to show */
  certifications?: Certification[];
  /** Optional heading above the list, in the mono label style */
  title?: string;
  /** Additional CSS classes */
  className?: string;
  /** Passed to each row */
  animated?: boolean;
}

/**
 * Certifications as a ruled list: one CertificationBadge row per item with
 * hairline dividers. Renders nothing when there are none.
 *
 * @component
 */
const CertificationList = ({ certifications = [], title, className = "", animated = true }: CertificationListProps) => {
  if (!certifications || !certifications.length) return null;

  return (
    <div className={`certifications-container ${className}`}>
      {title && <h4 className="certifications-title">{title}</h4>}
      <ul className="certifications-list">
        {certifications.map((cert, i) => (
          <CertificationBadge
            key={`cert-${i}`}
            as="li"
            name={cert.name}
            issuer={cert.issuer}
            date={cert.date}
            credentialId={cert.credentialId}
            animated={animated}
          />
        ))}
      </ul>
    </div>
  );
};

export default CertificationList;
