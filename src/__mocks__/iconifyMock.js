// Simple mock for Iconify
import React from 'react';

// Mock the Icon component
export const Icon = ({ icon, className, style, onError, onLoad, ...props }) => {
  // Call onLoad immediately if provided
  if (typeof onLoad === 'function') {
    setTimeout(onLoad, 0);
  }

  return (
    <div 
      data-testid="mock-icon" 
      data-icon={icon}
      className={className}
      style={style}
      role="img"
      aria-label={typeof icon === 'string' ? icon : 'icon'}
      {...props}
    />
  );
};

// Mock InlineIcon as well which might be used
export const InlineIcon = Icon;