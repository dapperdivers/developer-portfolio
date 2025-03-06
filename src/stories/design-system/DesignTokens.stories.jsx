import React from 'react';
import { ColorPalette, ColorItem, Typeset } from '@storybook/blocks';

const meta = {
  title: 'Design System/Design Tokens',
  tags: ['autodocs'],
  parameters: {
    controls: {
      disable: true,
    },
    docs: {
      description: {
        component: `
# Design Tokens

Design tokens are the visual design atoms of the design system—specifically, they are named entities that store visual design attributes. These are used in place of hard-coded values to ensure flexibility and consistency across the portfolio.
        `,
      }
    }
  },
};

export default meta;

export const Colors = {
  render: () => (
    <>
      <h2>Color System</h2>
      <h3>Primary Colors</h3>
      <ColorPalette>
        <ColorItem 
          title="Primary Colors" 
          subtitle="Main brand colors"
          colors={{ 
            'Primary': '#0062cc', // Explicit value for Storybook
            'Primary Light': '#4d8fe6', // Explicit value for Storybook
            'Primary Dark': '#0050a6', // Explicit value for Storybook
          }} 
        />
        <ColorItem 
          title="Secondary Colors" 
          subtitle="Supporting colors"
          colors={{ 
            'Secondary': '#6c757d', // Explicit value for Storybook
            'Secondary Light': '#8c959d', // Explicit value for Storybook
            'Secondary Dark': '#555c64', // Explicit value for Storybook
            'Accent': '#fd7e14', // Explicit value for Storybook
          }} 
        />
      </ColorPalette>

      <h3>Semantic Colors</h3>
      <ColorPalette>
        <ColorItem 
          title="Semantic Colors" 
          subtitle="Colors with specific meanings"
          colors={{ 
            'Success': '#28a745', // Explicit value for Storybook
            'Info': '#17a2b8', // Explicit value for Storybook
            'Warning': '#ffc107', // Explicit value for Storybook
            'Danger': '#dc3545', // Explicit value for Storybook
          }} 
        />
      </ColorPalette>

      <h3>Neutral Colors</h3>
      <ColorPalette>
        <ColorItem 
          title="Gray Scale" 
          subtitle="Neutral colors for text, backgrounds, and borders"
          colors={{ 
            'White': '#ffffff', // Explicit value for Storybook
            'Gray 100': '#f8f9fa', // Explicit value for Storybook
            'Gray 200': '#e9ecef', // Explicit value for Storybook
            'Gray 300': '#dee2e6', // Explicit value for Storybook
            'Gray 400': '#ced4da', // Explicit value for Storybook
            'Gray 500': '#adb5bd', // Explicit value for Storybook
            'Gray 600': '#6c757d', // Explicit value for Storybook
            'Gray 700': '#495057', // Explicit value for Storybook
            'Gray 800': '#343a40', // Explicit value for Storybook
            'Gray 900': '#212529', // Explicit value for Storybook
            'Black': '#000000', // Explicit value for Storybook
          }} 
        />
      </ColorPalette>

      <h3>Semantic Usage</h3>
      <ColorPalette>
        <ColorItem 
          title="Semantic Usage" 
          subtitle="Contextual color usage"
          colors={{ 
            'Text': '#212529', // Explicit value for Storybook
            'Text Muted': '#6c757d', // Explicit value for Storybook
            'Link': '#0062cc', // Explicit value for Storybook
            'Link Hover': '#0050a6', // Explicit value for Storybook
            'Border': '#dee2e6', // Explicit value for Storybook
            'Background': '#ffffff', // Explicit value for Storybook
            'Background Alt': '#f8f9fa', // Explicit value for Storybook
            'Background Muted': '#e9ecef', // Explicit value for Storybook
          }} 
        />
      </ColorPalette>
    </>
  ),
};

export const Typography = {
  render: () => (
    <>
      <h2>Typography</h2>
      
      <h3>Font Families</h3>
      <ul>
        <li><strong>Base Font</strong>: <code>-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, sans-serif</code></li>
        <li><strong>Heading Font</strong>: Same as base font</li>
        <li><strong>Monospace Font</strong>: <code>SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace</code></li>
      </ul>
      
      <h3>Font Sizes</h3>
      <Typeset
        fontSizes={[
          '0.875rem', // --font-size-sm
          '1rem',     // --font-size-base
          '1.25rem',  // --font-size-lg
          '1.5rem',   // --font-size-xl
          '1.75rem',  // --font-size-h3
          '2rem',     // --font-size-h2
          '2.5rem'    // --font-size-h1
        ]}
        fontWeight={400}
        sampleText="The quick brown fox jumps over the lazy dog"
      />
      
      <h3>Font Weights</h3>
      <ul>
        <li><strong>Light</strong>: 300</li>
        <li><strong>Regular</strong>: 400</li>
        <li><strong>Medium</strong>: 500</li>
        <li><strong>Bold</strong>: 700</li>
      </ul>
      
      <div style={{ fontFamily: 'var(--font-family-base)' }}>
        <div style={{ fontWeight: 'var(--font-weight-light)' }}>Light (300): The quick brown fox jumps over the lazy dog</div>
        <div style={{ fontWeight: 'var(--font-weight-normal)' }}>Regular (400): The quick brown fox jumps over the lazy dog</div>
        <div style={{ fontWeight: 'var(--font-weight-medium)' }}>Medium (500): The quick brown fox jumps over the lazy dog</div>
        <div style={{ fontWeight: 'var(--font-weight-bold)' }}>Bold (700): The quick brown fox jumps over the lazy dog</div>
      </div>
      
      <h3>Line Heights</h3>
      <ul>
        <li><strong>Tight</strong>: 1.2</li>
        <li><strong>Base</strong>: 1.5</li>
        <li><strong>Loose</strong>: 1.8</li>
      </ul>
    </>
  ),
};

export const Spacing = {
  render: () => (
    <>
      <h2>Spacing</h2>
      <p>Our spacing system is based on a 0.25rem (4px) scale.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
          <div key={size} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: `${size * 0.25}rem`, 
              height: '20px', 
              backgroundColor: 'var(--color-primary)',
              marginRight: '10px'
            }}></div>
            <code>--spacing-{size}: {size === 0 ? '0' : `${size * 0.25}rem`}</code>
          </div>
        ))}
      </div>
      
      <h3>Semantic Spacing</h3>
      <ul>
        <li><strong>Section Padding (Y)</strong>: 3rem (--spacing-8)</li>
        <li><strong>Container Padding (X)</strong>: 1rem (--spacing-4)</li>
        <li><strong>Card Padding</strong>: 1rem (--spacing-4)</li>
        <li><strong>Button Padding (X)</strong>: 1rem (--spacing-4)</li>
        <li><strong>Button Padding (Y)</strong>: 0.5rem (--spacing-2)</li>
      </ul>
    </>
  ),
};

export const Borders = {
  render: () => (
    <>
      <h2>Borders</h2>
      
      <h3>Border Widths</h3>
      <ul>
        <li><strong>Thin</strong>: 1px</li>
        <li><strong>Medium</strong>: 2px</li>
        <li><strong>Thick</strong>: 4px</li>
      </ul>
      
      <h3>Border Radius</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '100px', 
            height: '40px', 
            backgroundColor: 'var(--color-primary)',
            borderRadius: 'var(--border-radius-sm)'
          }}></div>
          <code>--border-radius-sm: 0.2rem</code>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '100px', 
            height: '40px', 
            backgroundColor: 'var(--color-primary)',
            borderRadius: 'var(--border-radius)'
          }}></div>
          <code>--border-radius: 0.25rem</code>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '100px', 
            height: '40px', 
            backgroundColor: 'var(--color-primary)',
            borderRadius: 'var(--border-radius-lg)'
          }}></div>
          <code>--border-radius-lg: 0.5rem</code>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '100px', 
            height: '40px', 
            backgroundColor: 'var(--color-primary)',
            borderRadius: 'var(--border-radius-xl)'
          }}></div>
          <code>--border-radius-xl: 1rem</code>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '100px', 
            height: '40px', 
            backgroundColor: 'var(--color-primary)',
            borderRadius: 'var(--border-radius-pill)'
          }}></div>
          <code>--border-radius-pill: 50rem</code>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            backgroundColor: 'var(--color-primary)',
            borderRadius: 'var(--border-radius-circle)'
          }}></div>
          <code>--border-radius-circle: 50%</code>
        </div>
      </div>
    </>
  ),
};

export const OtherTokens = {
  render: () => (
    <>
      <h2>Shadows</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ 
            width: '150px', 
            height: '60px', 
            backgroundColor: 'white',
            boxShadow: 'var(--box-shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>Small Shadow</div>
          <code>--box-shadow-sm</code>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ 
            width: '150px', 
            height: '60px', 
            backgroundColor: 'white',
            boxShadow: 'var(--box-shadow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>Regular Shadow</div>
          <code>--box-shadow</code>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ 
            width: '150px', 
            height: '60px', 
            backgroundColor: 'white',
            boxShadow: 'var(--box-shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>Large Shadow</div>
          <code>--box-shadow-lg</code>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ 
            width: '150px', 
            height: '60px', 
            backgroundColor: 'white',
            boxShadow: 'var(--box-shadow-focus)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>Focus Shadow</div>
          <code>--box-shadow-focus</code>
        </div>
      </div>
      
      <h2>Transitions</h2>
      <ul>
        <li><strong>Base</strong>: all 0.2s ease-in-out</li>
        <li><strong>Slow</strong>: all 0.3s ease-in-out</li>
        <li><strong>Fast</strong>: all 0.1s ease-in-out</li>
        <li><strong>Fade</strong>: opacity 0.15s linear</li>
        <li><strong>Transform</strong>: transform 0.2s ease-in-out</li>
      </ul>
      
      <h2>Breakpoints</h2>
      <ul>
        <li><strong>XS</strong>: 0 (default)</li>
        <li><strong>SM</strong>: 576px</li>
        <li><strong>MD</strong>: 768px</li>
        <li><strong>LG</strong>: 992px</li>
        <li><strong>XL</strong>: 1200px</li>
        <li><strong>XXL</strong>: 1400px</li>
      </ul>
      
      <h2>Z-index</h2>
      <ul>
        <li><strong>Negative</strong>: -1</li>
        <li><strong>Zero</strong>: 0</li>
        <li><strong>Dropdown</strong>: 1000</li>
        <li><strong>Sticky</strong>: 1020</li>
        <li><strong>Fixed</strong>: 1030</li>
        <li><strong>Modal Backdrop</strong>: 1040</li>
        <li><strong>Modal</strong>: 1050</li>
        <li><strong>Popover</strong>: 1060</li>
        <li><strong>Toast</strong>: 1070</li>
      </ul>
      
      <h2>Using Design Tokens in CSS</h2>
      <pre>
        {`
.my-component {
  /* Use design tokens for consistent styles */
  color: var(--color-text);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-4);
  padding: var(--spacing-2) var(--spacing-4);
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-sm);
  transition: var(--transition-base);
}

.my-component:hover {
  box-shadow: var(--box-shadow);
  border-color: var(--color-primary);
}

/* For responsiveness */
@media (min-width: var(--breakpoint-md)) {
  .my-component {
    font-size: var(--font-size-lg);
    padding: var(--spacing-3) var(--spacing-5);
  }
}
        `}
      </pre>
      
      <h2>Using Design Tokens in JavaScript</h2>
      <pre>
        {`
import React from 'react';
import styled from 'styled-components';

const StyledComponent = styled.div\`
  color: var(--color-text);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-4);
  /* ... and so on */
\`;

// Or with inline styles
function MyComponent() {
  return (
    <div style={{ 
      color: 'var(--color-text)',
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-base)',
      // ... and so on
    }}>
      Component Content
    </div>
  );
}
        `}
      </pre>
    </>
  ),
};