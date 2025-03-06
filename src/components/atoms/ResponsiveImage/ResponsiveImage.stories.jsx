import React from 'react';
import ResponsiveImage from './ResponsiveImage';
import { within, userEvent, expect } from '@storybook/test';

export default {
  title: 'Atoms/ResponsiveImage',
  component: ResponsiveImage,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Source URL of the image'
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    },
    placeholderSrc: {
      control: 'text',
      description: 'Low-quality placeholder image to show while loading'
    },
    lazy: {
      control: 'boolean',
      description: 'Whether to lazy load the image',
      defaultValue: true
    },
    objectFit: {
      control: 'select',
      options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
      description: 'CSS object-fit property',
      defaultValue: 'cover'
    },
    animation: {
      control: 'object',
      description: 'Framer Motion animation properties'
    },
    threshold: {
      control: 'number',
      description: 'Intersection observer threshold (0-1)',
      defaultValue: 0.1
    },
    onLoad: {
      action: 'loaded',
      description: 'Callback when image is loaded'
    },
    onError: {
      action: 'error occurred',
      description: 'Callback when image fails to load'
    },
    sizes: {
      control: 'text',
      description: 'Sizes attribute for responsive images'
    },
    srcSet: {
      control: 'text',
      description: 'SrcSet attribute for responsive images'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'ResponsiveImage component for optimized image loading with lazy loading, placeholder support, and animation capabilities.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'image-alt',
            enabled: true
          }
        ],
      },
    },
  },
};

// Container to give the image reasonable dimensions
const Container = ({ children, width = '300px', height = '200px' }) => (
  <div style={{ width, height, backgroundColor: '#f0f0f0' }}>
    {children}
  </div>
);

// Template for the component
const Template = (args) => (
  <Container>
    <ResponsiveImage {...args} />
  </Container>
);

// Default story - Basic responsive image
export const Default = {
  args: {
  src: 'https://source.unsplash.com/featured/600x400/?nature',
  alt: 'Nature landscape',
  objectFit: 'cover'
}
};
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', async () => {
    const img = canvas.getByRole('img');
    await expect(img).toBeInTheDocument();
    await expect(img).toHaveAttribute('alt', 'Nature landscape');
  });
};

// With Placeholder - Using a low-res placeholder
export const WithPlaceholder = {
  args: {
  src: 'https://source.unsplash.com/featured/600x400/?mountains',
  alt: 'Mountain landscape',
  placeholderSrc: 'https://source.unsplash.com/featured/60x40/?mountains', // Low-res version
  objectFit: 'cover'
}
};

// With Animation - Demonstrates animation capabilities
export const WithAnimation = {
  args: {
  src: 'https://source.unsplash.com/featured/600x400/?ocean',
  alt: 'Ocean view',
  animation: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  }
}
};

// Eager Loading - Non-lazy loaded image
export const EagerLoading = {
  args: {
  src: 'https://source.unsplash.com/featured/600x400/?city',
  alt: 'City skyline',
  lazy: false,
  objectFit: 'cover'
}
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import ResponsiveImage from './ResponsiveImage';
 * 
 * function MyComponent() {
 *   return (
 *     <ResponsiveImage
 *       src="/path/to/image.jpg"
 *       alt="Description"
 *       lazy={true}
 *       animation={{
 *         initial: { opacity: 0 },
 *         animate: { opacity: 1 },
 *         transition: { duration: 0.3 }
 *       }}
 *       placeholderSrc="/path/to/placeholder.jpg"
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
 * | alt | string | '' | Alt text for the image |
 * | className | string | '' | Additional CSS classes |
 * | placeholderSrc | string | undefined | Low-quality placeholder image to show while loading |
 * | lazy | boolean | true | Whether to lazy load the image |
 * | objectFit | string | 'cover' | CSS object-fit property ('contain', 'cover', 'fill', 'none', 'scale-down') |
 * | animation | object | undefined | Framer Motion animation properties |
 * | threshold | number | 0.1 | Intersection observer threshold (0-1) |
 * | onLoad | function | undefined | Callback when image is loaded |
 * | onError | function | undefined | Callback when image fails to load |
 * | sizes | string | undefined | Sizes attribute for responsive images |
 * | srcSet | string | undefined | SrcSet attribute for responsive images |
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Provides appropriate alt text for screen readers
 * - Uses semantic HTML img tags
 * - Error states are clearly indicated
 * 
 * ## Edge Cases
 * 
 * The following stories demonstrate edge cases and special scenarios.
 */

// Error State - Image that fails to load
export const ErrorState = {
  args: {
  src: 'https://non-existent-image-url.jpg',
  alt: 'This image will fail to load'
}
};

// With SrcSet - Responsive images with different sizes
export const WithSrcSet = {
  args: {
  src: 'https://source.unsplash.com/featured/800x600/?landscape',
  alt: 'Responsive landscape image',
  srcSet: `
    https://source.unsplash.com/featured/400x300/?landscape 400w,
    https://source.unsplash.com/featured/800x600/?landscape 800w,
    https://source.unsplash.com/featured/1200x900/?landscape 1200w
  `,
  sizes: '(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px'
}
};

// Responsive behavior example
export const ResponsiveViewport = {
  args: {
  src: 'https://source.unsplash.com/featured/600x400/?technology',
  alt: 'Technology image',
  objectFit: 'contain'
}
};
ResponsiveViewport.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
