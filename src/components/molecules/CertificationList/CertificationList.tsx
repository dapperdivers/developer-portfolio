import React from "react";
import CertificationBadge from '@molecules/CertificationBadge';
import type { Certification } from '@/types/portfolio';
import './CertificationList.css';

export interface CertificationListProps {
  /** Certifications to show */
  certifications?: Certification[];
  /** Additional CSS classes */
  className?: string;
  /** Passed to each badge */
  animated?: boolean;
}

/**
 * Enhanced component for displaying a grid of certification badges
 * with improved layout and animations
 * 
 * @component
 */
const CertificationList = ({ certifications = [], className = "", animated = true }: CertificationListProps) => {
  if (!certifications || !certifications.length) return null;
  
  // Group certifications by issuer for better organization (optional)
  const groupByIssuer = (certs: Certification[]) => {
    return certs.reduce<Record<string, Certification[]>>((groups, cert) => {
      const issuer = cert.issuer || 'Other';
      if (!groups[issuer]) {
        groups[issuer] = [];
      }
      groups[issuer].push(cert);
      return groups;
    }, {});
  };
  
  const renderCertifications = () => {
    // Simple flat list of certifications
    return (
      <div className="certifications-grid">
        {certifications.map((cert, i) => (
          <div className={`certification-badge-wrapper certification-badge-${i}`} key={`cert-${i}`}>
            <CertificationBadge 
              name={cert.name} 
              issuer={cert.issuer}
              date={cert.date}
              credentialId={cert.credentialId}
              animated={animated}
            />
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className={`certifications-container ${className}`}>
      <div className="certifications-content">
        {renderCertifications()}
      </div>
    </div>
  );
};

export default CertificationList;
