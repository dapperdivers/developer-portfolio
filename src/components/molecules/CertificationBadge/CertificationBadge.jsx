import React from "react";
import PropTypes from 'prop-types';
import { FaMedal, FaIdCard } from 'react-icons/fa';
import './CertificationBadge.css';

/**
 * A component to display certification information.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the certification
 * @param {string} [props.issuer] - Organization that issued the certification
 * @param {string} [props.date] - Date of certification
 * @param {string} [props.credentialId] - Credential ID if available
 * @param {string} [props.iconName] - Icon name to override the default medal icon
 * @param {string} [props.className] - Additional CSS classes
 * @returns {React.ReactElement} CertificationBadge component
 */
const CertificationBadge = ({ 
  name, 
  issuer, 
  date, 
  credentialId,
  iconName,
  className = "" 
}) => {
  // We could use dynamic icon loading here if needed
  const CertIcon = iconName ? null : FaMedal;

  return (
    <div className={`certification-badge ${className}`}>
      <div className="certification-icon">
        <CertIcon />
      </div>
      <div className="certification-details">
        <h5 className="certification-name">{name}</h5>
        {issuer && <p className="certification-issuer">{issuer}</p>}
        <div className="certification-meta">
          {date && <span className="certification-date">{date}</span>}
          {credentialId && (
            <span className="certification-id">
              <FaIdCard className="id-icon" />
              <span className="id-text">{credentialId}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

CertificationBadge.propTypes = {
  name: PropTypes.string.isRequired,
  issuer: PropTypes.string,
  date: PropTypes.string,
  credentialId: PropTypes.string,
  iconName: PropTypes.string,
  className: PropTypes.string
};

export default CertificationBadge;
