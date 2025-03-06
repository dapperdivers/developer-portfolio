import React from 'react';
import { withHelmetProvider } from './utils/mockHelmetProvider';
import { withPortfolioContext } from './utils/decorators';

// Import design system tokens and Tailwind CSS
import '../src/assets/css/design-system/index.css';
import '../src/assets/css/tailwind.css';
import '../src/assets/css/utilities/index.css';
import '../src/assets/css/components/index.css';

// Import component-specific styles (atoms)
import '../src/components/atoms/Button/Button.css';
import '../src/components/atoms/Card/Card.css';
import '../src/components/atoms/Loading/Loading.css';

// Import component-specific styles (layout)
import '../src/components/layout/Section/Section.css';

// Import component-specific styles (molecules)
import '../src/components/molecules/DisplayLottie/DisplayLottie.css';
import '../src/components/molecules/EducationCard/EducationCard.css';
import '../src/components/molecules/ExperienceCard/ExperienceCard.css';
import '../src/components/molecules/FeedbackCard/FeedbackCard.css';
import '../src/components/molecules/Footer/Footer.css';
import '../src/components/molecules/Navigation/Navigation.css';
import '../src/components/molecules/SocialLinks/SocialLinks.css';

// Import section-specific CSS
import '../src/assets/css/skeleton-loading.css';
import '../src/assets/css/typography.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#1e293b' },
        { name: 'primary', value: '#0062cc' },
      ],
    },
    layout: 'centered',
  },
  
  // Global decorators applied to all stories
  decorators: [
    // Wrap all stories with HelmetProvider
    withHelmetProvider,
    
    // Use Portfolio Context only for stories that need it
    // Comment this out if you want to apply it selectively in each story
    // withPortfolioContext,
    
    // Add padding around all stories
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;