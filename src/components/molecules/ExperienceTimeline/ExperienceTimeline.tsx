import React, { FC, memo } from 'react';
import Timeline, { TimelineItem } from '@molecules/Timeline';
import TimelineEntry from '@molecules/TimelineEntry/TimelineEntry';

export interface ExperienceData {
  company: string;
  role: string;
  date: string;
  desc: string;
  companylogo: string;
  descBullets?: string[];
}

export interface ExperienceTimelineProps {
  /** Experience data array */
  experience: ExperienceData[];
  /** Extract year from date string function */
  extractDateYear: (date: string) => string;
  /** Visual variant */
  variant?: '' | 'security' | 'terminal';
  /** Whether experience data is loading */
  isLoading?: boolean;
  /** Whether there was an error loading experience data */
  hasError?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Error message to display */
  errorMessage?: string;
  /** Empty state message */
  emptyMessage?: string;
}

/**
 * ExperienceTimeline component for displaying work experience entries
 * with a cyberpunk hacker aesthetic
 * 
 * Uses the generic Timeline component but adapts it specifically for experience data
 * 
 * @component
 * @param {ExperienceTimelineProps} props - Component props
 * @returns {React.ReactElement} ExperienceTimeline component
 */
const ExperienceTimeline: FC<ExperienceTimelineProps> = ({
  experience = [],
  extractDateYear,
  variant = 'security',
  isLoading = false,
  hasError = false,
  className = '',
  errorMessage = 'Error loading the experience data. Please try again later.',
  emptyMessage = 'No experience entries found.'
}) => {
  // Transform the experience data to the generic TimelineItem format
  const timelineItems: TimelineItem[] = experience.map((exp, index) => ({
    id: `experience-${exp.company.replace(/\s+/g, '-').toLowerCase()}-${index}`,
    date: exp.date,
    content: exp // Pass the full experience object as content
  }));

  // Define a render function for TimelineEntry that adapts to our API
  const renderTimelineEntry = (props: any) => {
    return (
      <TimelineEntry
        data={props.data}
        index={props.index}
        extractDateYear={extractDateYear}
        variant={props.variant}
        id={props.id}
      />
    );
  };

  return (
    <Timeline
      items={timelineItems}
      entryComponent={renderTimelineEntry}
      formatDate={extractDateYear}
      variant={variant}
      isLoading={isLoading}
      hasError={hasError}
      className={className}
      errorMessage={errorMessage}
      emptyMessage={emptyMessage}
      showDecorations={true}
      showMatrixBg={true}
      showBinaryStreams={variant === 'security'}
    />
  );
};

export default memo(ExperienceTimeline);