import React from 'react';
import PropTypes from 'prop-types';

/**
 * Custom Progress component to replace reactstrap's Progress
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number} [props.value=0] - Current progress value
 * @param {number} [props.max=100] - Maximum progress value
 * @param {string} [props.color="primary"] - Progress bar color variant
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {string} [props.barClassName=""] - Additional CSS classes for the bar itself
 * @param {Object} [props.style={}] - Additional inline styles
 * @returns {React.ReactElement} Progress component
 */
const Progress = ({
  value = 0,
  max = 100,
  color = "primary",
  className = "",
  barClassName = "",
  style = {},
  ...rest
}) => {
  // Calculate width as percentage
  const percent = Math.round((value / max) * 100);
  
  // Construct class names
  const baseClassName = "tailwind-progress";
  const barBaseClassName = "tailwind-progress-bar";
  const colorClassName = `tailwind-progress-${color}`;
  
  const combinedClassName = `${baseClassName} ${className}`.trim();
  const combinedBarClassName = `${barBaseClassName} ${colorClassName} ${barClassName}`.trim();
  
  return (
    <div 
      className={combinedClassName} 
      style={style}
      role="progressbar"
      {...rest}
    >
      <div 
        className={combinedBarClassName} 
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

Progress.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  className: PropTypes.string,
  barClassName: PropTypes.string,
  style: PropTypes.object
};

export default Progress;