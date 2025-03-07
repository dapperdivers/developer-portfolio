import React from "react";
import PropTypes from 'prop-types';
import CertificationBadge from '@molecules/CertificationBadge';
import './CertificationList.css';

/**
 * Enhanced component for displaying a grid of certification badges
 * with improved layout and animations
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.certifications - Array of certification objects
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} CertificationList component
 */
const CertificationList = ({ certifications = [], className = "" }) => {
  if (!certifications || !certifications.length) return null;
  
  // Group certifications by issuer for better organization (optional)
  const groupByIssuer = (certs) => {
    return certs.reduce((groups, cert) => {
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

CertificationList.propTypes = {
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      issuer: PropTypes.string,
      date: PropTypes.string,
      credentialId: PropTypes.string
    })
  ),
  className: PropTypes.string
};

export default CertificationList;
