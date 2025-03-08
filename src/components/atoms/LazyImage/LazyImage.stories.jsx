import React from 'react';
import LazyImage from './LazyImage';
import { within, userEvent, expect } from '@storybook/test';

const meta = {
  title: 'Atoms/LazyImage',
  component: LazyImage,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alternative text',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    lowResSrc: {
      control: 'text',
      description: 'Low resolution version of image to show while loading',
    },
    aspectRatio: {
      control: 'select',
      options: ['16:9', '4:3', '1:1', '3:2', '9:16'],
      description: 'Aspect ratio to maintain',
    },
    onLoad: {
      action: 'loaded',
      description: 'Callback when image loads',
    },
    onError: {
      action: 'error',
      description: 'Callback when image fails to load',
    },
    imgProps: {
      control: 'object',
      description: 'Additional props to pass to img element',
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Lazy-loaded image component that only loads images when they enter the viewport. Includes loading skeleton, blur-up effect, and proper accessibility attributes.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'image-alt',
            enabled: true,
          }
        ],
      },
    },
  },
};

export default meta;

// Template for the component
const Template = (args) => <div style={{ maxWidth: '500px' }}><LazyImage {...args} /></div>;

// Default story
export const Default = {
  args: {
    src: 'https://via.placeholder.com/300x200',
    alt: 'Placeholder image',
  }
};
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', async () => {
    await expect(canvas.getByRole('img')).toBeInTheDocument();
  });
};

// With aspect ratio
export const WithAspectRatio = {
  args: {
    src: 'https://source.unsplash.com/featured/800x450/?landscape',
    alt: 'Landscape with 16:9 aspect ratio',
    aspectRatio: '16:9',
  }
};

// With low-res placeholder
export const WithPlaceholder = {
  args: {
    src: 'https://source.unsplash.com/featured/800x600/?mountains',
    alt: 'Mountain landscape',
    lowResSrc: 'https://source.unsplash.com/featured/80x60/?mountains',
  }
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import LazyImage from './LazyImage';
 * 
 * function MyComponent() {
 *   return (
 *     <LazyImage 
 *       src="/path/to/image.jpg" 
 *       alt="Image description"
 *       aspectRatio="16:9"
 *       lowResSrc="/path/to/low-res-image.jpg"
 *     />
 *   );
 * }
 * ```
 * 
 * ## Properties
 * 
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | src | string | required | Source URL of the image |
 * | alt | string | required | Alt text for the image (required for accessibility) |
 * | className | string | undefined | Additional CSS classes to apply |
 * | lowResSrc | string | undefined | Low resolution version of image to show while loading |
 * | imgProps | object | {} | Additional props to pass to img element |
 * | aspectRatio | string | undefined | Aspect ratio to maintain (e.g., '16:9', '4:3', '1:1') |
 * | onLoad | function | undefined | Callback when image loads |
 * | onError | function | undefined | Callback when image fails to load |
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Uses appropriate `alt` text for screen readers
 * - Shows loading state with appropriate ARIA roles
 * - Error state with proper alert role
 * - Low-res placeholder images have empty alt and aria-hidden
 * 
 * ## Edge Cases
 * 
 * The following stories demonstrate edge cases and special scenarios.
 */
export const ErrorState = {
  args: {
    src: 'https://non-existent-image-url.jpg',
    alt: 'This image will fail to load',
  }
};

// Responsive behavior example
export const Responsive = {
  args: {
    src: 'https://source.unsplash.com/featured/600x400/?technology',
    alt: 'Technology image',
    aspectRatio: '3:2',
  }
};
Responsive.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};

export const WithCustomClass = {
  args: {
    src: 'https://via.placeholder.com/300x200',
    alt: 'Placeholder image with custom class',
    className: 'rounded-lg shadow-md',
  }
};

export const LoadingState = {
  args: {
    src: 'https://via.placeholder.com/800x600',
    alt: 'Large image to demonstrate loading',
  }
};
