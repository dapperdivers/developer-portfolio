import React from 'react';
import Navigation from '../../components/Navigation';
import { within, userEvent, expect } from '@storybook/test';
import { withPortfolioContext } from '@utils/decorators';
import PortfolioContext from '@context/PortfolioContext';

export default {
  title: 'Molecules/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  decorators: [withPortfolioContext],
  parameters: {
    docs: {
      description: {
        component: 'Navigation component for the site header. Handles scroll behavior, branding, and provides a responsive design that adapts to different device sizes.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-roles',
            enabled: true
          },
          {
            id: 'button-name',
            enabled: true
          },
          {
            id: 'color-contrast',
            enabled: true
          }
        ],
      },
    },
    layout: 'fullscreen',
  },
};

// Helper for simulating window scroll
const simulateScroll = (y = 100) => {
  global.window.scrollY = y;
  global.window.dispatchEvent(new Event('scroll'));
};

// Background decorator to make the navigation visible against a dark background
const withBackground = (Story) => (
  <div style={{ 
    background: 'linear-gradient(#4286f4, #373B44)', 
    height: '100vh', 
    width: '100%', 
    padding: '0',
    position: 'relative'
  }}>
    <Story />
    <div style={{ padding: '100px 20px', color: 'white' }}>
      <h2>Scroll down to see navigation behavior</h2>
      <p>The navigation will change appearance on scroll</p>
      {Array(10).fill(0).map((_, i) => (
        <p key={i}>Scroll content {i+1}</p>
      ))}
    </div>
  </div>
);

// Template for the component
const Template = (args) => <Navigation {...args} />;

// Default story - Navigation in its default state
export const Default = Template.bind({});
Default.decorators = [withBackground];
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', async () => {
    // Check navbar exists
    const navbar = canvas.getByRole('navigation');
    await expect(navbar).toBeInTheDocument();
    
    // Check brand name
    const brandText = canvas.getByText('Derek Mackley');
    await expect(brandText).toBeInTheDocument();
  });
};

// Scrolled state
export const Scrolled = Template.bind({});
Scrolled.decorators = [
  withBackground,
  (Story) => {
    // Simulate scrolled state
    React.useEffect(() => {
      simulateScroll(200);
      return () => simulateScroll(0);
    }, []);
    
    return <Story />;
  }
];
Scrolled.parameters = {
  docs: {
    description: {
      story: 'Navigation appearance changes when the user scrolls down the page.',
    },
  },
};

// Hidden Navigation - Simulates the user scrolling down quickly (navigation hides)
export const Hidden = Template.bind({});
Hidden.decorators = [
  withBackground,
  (Story) => {
    // Simulate scrolled down state with hidden nav
    React.useEffect(() => {
      simulateScroll(300);
      // Simulate scroll movement to hide nav
      const scrollEvent = new Event('scroll');
      global.window.scrollY = 400;
      global.window.dispatchEvent(scrollEvent);
      
      return () => simulateScroll(0);
    }, []);
    
    return <Story />;
  }
];
Hidden.parameters = {
  docs: {
    description: {
      story: 'Navigation hides when the user scrolls down quickly.',
    },
  },
};

// Mobile viewport version
export const Mobile = Template.bind({});
Mobile.decorators = [withBackground];
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
  docs: {
    description: {
      story: 'Navigation displayed on mobile devices with a hamburger menu for navigation links.',
    },
  },
};

// With keyboard navigation
export const KeyboardNavigation = Template.bind({});
KeyboardNavigation.decorators = [withBackground];
KeyboardNavigation.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Focus navigation with keyboard', async () => {
    // Tab to focus on the first interactive element
    await userEvent.tab();
    
    // Check the focus is within the navigation
    const navbar = canvas.getByRole('navigation');
    const focused = document.activeElement;
    
    // Verify focus is within the navbar
    await expect(navbar.contains(focused)).toBeTruthy();
  });
};

// Documentation block
export const Documentation = () => null;
Documentation.parameters = {
  docs: {
    source: { code: 'This is documentation only' },
    description: {
      story: `
## Component Usage

\`\`\`jsx
import Navigation from '../components/Navigation';
import { PortfolioProvider } from '@context/PortfolioContext';

function App() {
  return (
    <PortfolioProvider>
      <Navigation />
      <main>
        // Main content would go here
      </main>
    </PortfolioProvider>
  );
}
\`\`\`

## Context Dependencies

This component depends on data from the PortfolioContext through the useNavigation hook:

| Data | Description |
|------|-------------|
| greetings.name | The name displayed in the navigation |

## Accessibility Features

This component implements these accessibility best practices:
- Semantic HTML with appropriate header and navigation elements
- ARIA roles and labels for navigation and buttons
- Keyboard navigation with focus management
- Escape key support for closing menus
- Focus trap for modal navigation on mobile devices

## Behavior Enhancements

The navigation includes several enhanced behaviors:
- Transparent to solid background transition on scroll
- Auto-hide on scroll down, reveal on scroll up
- Mobile-responsive design with hamburger menu
- Keyboard navigation support
      `,
    },
  },
};
