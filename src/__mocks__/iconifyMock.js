// Mock for iconify
import React from 'react';

export const Icon = ({ icon, className, style, ...props }) => (
  <div 
    data-testid="mock-icon" 
    data-icon={icon}
    className={className}
    style={style}
    role="img"
    aria-label={icon}
    {...props}
  />
);