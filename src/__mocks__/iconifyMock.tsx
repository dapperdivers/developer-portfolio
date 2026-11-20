// Simple mock for Iconify
import type { HTMLAttributes } from 'react';
import type { IconProps } from '@iconify/react';

// The mock renders a div, so it takes div attributes plus the icon itself
interface MockIconProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onLoad'> {
  icon: IconProps['icon'];
  onLoad?: () => void;
}

// Mock the Icon component
export const Icon = ({ icon, className, style, /* onError is unused but kept for API compatibility */ onLoad, ...props }: MockIconProps) => {
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
