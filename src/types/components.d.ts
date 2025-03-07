import { ReactNode } from 'react';
import { Variants } from 'framer-motion';

// Define shared types for reuse
export type ComponentVariant = '' | 'security' | 'terminal';
export type SecurityLevel = '' | 'low' | 'medium' | 'high' | 'critical';
export type ComponentSize = 'sm' | 'md' | 'lg';

/**
 * Common properties for all components
 */
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

/**
 * TimelineNode Component Props
 */
export interface TimelineNodeProps extends BaseComponentProps {
  variant?: ComponentVariant;
  active?: boolean;
  size?: ComponentSize;
  animated?: boolean;
  interactive?: boolean;
  id?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * DateBubble Component Props
 */
export interface DateBubbleProps extends BaseComponentProps {
  date: string;
  level?: SecurityLevel;
  variant?: ComponentVariant;
  size?: ComponentSize;
  animation?: Variants;
}

/**
 * CodeSnippet Component Props
 */
export interface CodeSnippetProps extends BaseComponentProps {
  code: string;
  language?: string;
  theme?: 'light' | 'dark';
  variant?: ComponentVariant;
  isDecorative?: boolean;
}

/**
 * SecurityBadge Component Props
 */
export interface SecurityBadgeProps extends BaseComponentProps {
  verified: boolean;
  variant?: ComponentVariant;
  securityId: string;
  animation?: Variants;
}

/**
 * TerminalControls Component Props
 */
export interface TerminalControlsProps extends BaseComponentProps {
  variant?: 'macos' | 'windows' | 'linux';
  interactive?: boolean;
  onCloseClick?: React.MouseEventHandler<HTMLDivElement>;
  onMinimizeClick?: React.MouseEventHandler<HTMLDivElement>;
  onMaximizeClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * TechBadge Component Props
 */
export interface TechBadgeProps extends BaseComponentProps {
  label: string;
  size?: ComponentSize;
  variant?: ComponentVariant;
  level?: SecurityLevel;
  interactive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  tooltip?: string;
}

/**
 * Card Component Props
 */
export interface CardProps extends BaseComponentProps {
  children: ReactNode;
  variant?: ComponentVariant;
  shadow?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
}

/**
 * ConsoleHeader Component Props
 */
export interface ConsoleHeaderProps extends BaseComponentProps {
  prompt?: string;
  command?: string;
  showCursor?: boolean;
  variant?: ComponentVariant;
  shadow?: boolean;
  id?: string;
  ariaDescription?: string;
}

/**
 * ExperienceCard Component Props
 */
export interface ExperienceCardProps extends BaseComponentProps {
  data: {
    company: string;
    role: string;
    date: string;
    desc: string;
    companylogo: string;
    descBullets?: string[];
  };
  index: number;
  variant?: ComponentVariant;
  colorOverride?: { r: number; g: number; b: number } | null;
  showHeader?: boolean;
  shadow?: boolean;
}

/**
 * TimelineEntry Component Props
 */
export interface TimelineEntryProps extends BaseComponentProps {
  data: {
    company: string;
    role: string;
    date: string;
    desc: string;
    companylogo: string;
    descBullets?: string[];
  };
  index: number;
  extractDateYear: (date: string) => string;
  entryRef?: React.RefObject<HTMLDivElement>;
  animationDelay?: string;
  variant?: ComponentVariant;
  id?: string;
}

/**
 * ExperienceTimeline Component Props
 */
export interface ExperienceTimelineProps extends BaseComponentProps {
  experience: Array<{
    company: string;
    role: string;
    date: string;
    desc: string;
    companylogo: string;
    descBullets?: string[];
  }>;
  extractDateYear: (date: string) => string;
  variant?: ComponentVariant;
  isLoading?: boolean;
  hasError?: boolean;
}
