import React from 'react';
import SkipToContent from '@atoms/SkipToContent';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Atoms/SkipToContent',
  component: SkipToContent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Skip to content link component for keyboard users. This component allows keyboard users to bypass navigation and jump directly to the main content.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // Ensure the component is keyboard accessible
            id: 'focus-order-semantics',
            reviewOnFail: true
          },
          {
            // Ensure proper focus visibility
            id: 'focus-visible',
            reviewOnFail: true
          }
        ],
      },
    },
    layout: 'fullscreen',
  },
};


// Create a basic layout to visualize how the skip link works
const WithLayoutTemplate = (args) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <SkipToContent {...args} />
    <header style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <nav>
        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none' }}>
          <li><a href="#" tabIndex={0}>Navigation Item 1</a></li>
          <li><a href="#" tabIndex={0}>Navigation Item 2</a></li>
          <li><a href="#" tabIndex={0}>Navigation Item 3</a></li>
        </ul>
      </nav>
    </header>
    <main id="main-content" style={{ padding: '20px', flex: 1 }}>
      <h1>Main Content Area</h1>
      <p>Tab to navigate. The skip link should appear when focused.</p>
      <p>The skip link is only visible when focused, demonstrating the focus-visibility pattern.</p>
    </main>
  </div>
);

// Default story - demonstrates the basic functionality
export const Default = WithLayoutTemplate.bind({});
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', async () => {
    // Skip link is in the document but not visible initially
    const skipLink = canvas.getByText('Skip to main content');
    await expect(skipLink).toBeInTheDocument();
  });
  
  await step('Keyboard navigation test', async () => {
    // First Tab press should focus the skip link
    await userEvent.tab();
    const skipLink = canvas.getByText('Skip to main content');
    await expect(skipLink).toHaveFocus();
  });
};

// Focused state story - demonstrates how the component appears when focused
export const Focused = WithLayoutTemplate.bind({});
Focused.parameters = {
  pseudo: { focus: true },
  docs: {
    description: {
      story: 'Shows how the Skip to Content link appears when focused using keyboard navigation. The link is positioned at the top of the viewport and provides a clear path to the main content.'
    }
  }
};
Focused.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // Tab to focus the skip link
  await userEvent.tab();
  const skipLink = canvas.getByText('Skip to main content');
  await expect(skipLink).toHaveFocus();
};

// Documentation for component usage - this is used internally in the story development
// eslint-disable-next-line no-unused-vars
const componentDocumentation = `
## Component Usage

\`\`\`jsx
import SkipToContent from '../components/SkipToContent';

function App() {
  return (
    <>
      <SkipToContent />
      <header>...</header>
      <main id="main-content">
        {/* Your main content here */}
      </main>
    </>
  );
}
\`\`\`

## Accessibility

This component follows these accessibility best practices:
- Positioned at the beginning of the page for keyboard users
- Visually hidden until focused via keyboard
- Provides direct navigation to main content
- Uses high contrast colors when visible
- Maintains visibility in high contrast modes
- Uses proper focus styles

## Implementation Details

The skip link uses CSS to hide visually but remain accessible to screen readers.
When focused, it appears at the top of the viewport, allowing users to skip
navigation elements and go directly to the main content area.
`;

export const KeyboardNavigation = WithLayoutTemplate.bind({});
KeyboardNavigation.parameters = {
  docs: {
    description: {
      story: 'Tab through this example to see how the Skip to Content component appears on focus and provides a way to bypass navigation.'
    }
  }
};

// A11y testing story
export const AccessibilityTesting = WithLayoutTemplate.bind({});
AccessibilityTesting.parameters = {
  a11y: {
    config: {
      rules: [
        { id: 'focus-visible', reviewOnFail: true },
        { id: 'skip-link', reviewOnFail: true },
        { id: 'focus-order-semantics', reviewOnFail: true }
      ]
    }
  },
  docs: {
    description: {
      story: 'This story is configured with specific accessibility rules to ensure the skip link meets accessibility standards.'
    }
  }
};