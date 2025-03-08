# ExperienceTimeline Component

This component is a specialized implementation of the generic Timeline component, specifically designed for displaying professional experience data.

## Features

- Displays work experience entries in a vertical timeline format
- Uses a cyberpunk hacker aesthetic
- Supports multiple themes: security, terminal
- Handles loading, error, and empty states

## Usage

```jsx
import ExperienceTimeline from '@molecules/ExperienceTimeline';

// Your experience data
const experience = [
  {
    company: "TechCorp",
    role: "Senior Developer",
    date: "Jan 2020 - Present",
    desc: "Leading development of cutting-edge applications...",
    companylogo: "/path/to/logo.png",
    descBullets: [
      "Built scalable microservices architecture",
      "Implemented CI/CD pipeline"
    ]
  },
  // More experience entries...
];

// Function to extract year from date string
const extractDateYear = (dateString) => {
  const matches = dateString.match(/\b(19|20)\d{2}\b/);
  return matches ? matches[0] : '';
};

// Render the timeline
<ExperienceTimeline
  experience={experience}
  extractDateYear={extractDateYear}
  variant="security"
  isLoading={false}
  hasError={false}
/>
```

## Relationship to Timeline

This component is an adapter that transforms experience data into the format expected by the generic Timeline component. It handles:

1. Transforming experience data to `TimelineItem` format
2. Providing a render function for TimelineEntry components
3. Setting appropriate defaults for the cyberpunk experience visualization

Using this pattern allows for both specialized usage (ExperienceTimeline) and more generic implementations (Timeline) depending on your needs.