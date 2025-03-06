import React from 'react';
import PropTypes from 'prop-types';

/**
 * Custom Progress component to replace reactstrap's Progress
 * 
 * @component
 * @param {Object} props - Component props
 * @param {number|string} [props.value=0] - Current progress value (can be a number or string that can be parsed to a number)
 * @param {number|string} [props.max=100] - Maximum progress value (can be a number or string that can be parsed to a number)
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
  // Convert string values to numbers if needed and calculate width as percentage
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  const numericMax = typeof max === 'string' ? parseFloat(max) : max;
  const percent = Math.round((numericValue / numericMax) * 100);
  
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
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  className: PropTypes.string,
  barClassName: PropTypes.string,
  style: PropTypes.object
};

export default Progress;