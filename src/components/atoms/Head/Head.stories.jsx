import React from 'react';
import Head from './Head';
import { mockStructuredData } from '@stories-utils';
import { HelmetProvider } from 'react-helmet-async';

// We need to wrap the Head component in HelmetProvider
// for it to work properly in Storybook
const helmetContext = {};
const withHelmetProvider = (Story) => (
  <HelmetProvider context={helmetContext}>
    <Story />
  </HelmetProvider>
);

const meta = {
  title: 'Atoms/Head',
  component: Head,
  tags: ['autodocs'],
  decorators: [withHelmetProvider],
  argTypes: {
    title: {
      control: 'text',
      description: 'Page title',
    },
    description: {
      control: 'text',
      description: 'Meta description',
    },
    imageUrl: {
      control: 'text',
      description: 'URL for Open Graph and Twitter card images'
    },
    imageAlt: {
      control: 'text',
      description: 'Alt text for the Open Graph and Twitter card images'
    },
    canonicalUrl: {
      control: 'text',
      description: 'Canonical URL for SEO'
    },
    structuredData: {
      control: 'object',
      description: 'Schema.org structured data for rich results'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Head component for managing document metadata, SEO, and sharing information using react-helmet-async.',
      },
    },
    // Note: Most a11y tests don't apply to Head since it modifies document.head
    a11y: {
      disable: true,
    },
  },
};

export default meta;

// Template for the component
const Template = (args) => {
  // Since we can't directly visualize Head changes in Storybook,
  // we'll display some information about what tags would be set
  return (
    <div className="head-demo">
      <Head {...args} />
      <div className="head-preview">
        <h3>Head Component Preview</h3>
        <p className="note">Note: This component modifies the document head and does not render visible UI.</p>
        <h4>The following metadata would be set:</h4>
        <pre>
          {`
<title>${args.title || "Derek Mackley | Full Stack Developer"}</title>
<meta name="description" content="${args.description || "Derek Mackley - Full Stack Developer and Security Expert..."}" />
${args.canonicalUrl ? `<link rel="canonical" href="${args.canonicalUrl}" />` : ""}
${args.imageUrl ? `<meta property="og:image" content="${args.imageUrl}" />` : ""}
${args.imageUrl ? `<meta name="twitter:image" content="${args.imageUrl}" />` : ""}
          `}
        </pre>
      </div>
    </div>
  );
};

// Default story with default values
export const Default = {
  args: {
    title: 'My Portfolio',
    description: 'Welcome to my developer portfolio',
  }
};
Default.parameters = {
  docs: {
    description: {
      story: 'The Head component with default values for title, description, etc.'
    }
  }
};

// Story with custom title and description
export const CustomMetadata = {
  args: {
  title: "Derek Mackley | Portfolio Projects",
  description: "View my latest web development projects and case studies",
  canonicalUrl: "https://example.com/projects"
}
};
CustomMetadata.parameters = {
  docs: {
    description: {
      story: 'Customized metadata for a specific page, with modified title, description and canonical URL.'
    }
  }
};

/**
 * Social sharing metadata is critical for proper rendering when links 
 * are shared on platforms like Twitter, Facebook, LinkedIn, etc.
 */
export const SocialSharing = {
  args: {
  title: "Derek Mackley | Project Case Study",
  description: "How I built a high-performance React application",
  imageUrl: "https://example.com/project-preview.jpg",
  imageAlt: "Screenshot of project dashboard",
  canonicalUrl: "https://example.com/case-study"
}
};

// Documentation for component usage - this is used internally in the story development
// eslint-disable-next-line no-unused-vars
const componentDocumentation = `
## Component Usage

\`\`\`jsx
import Head from './Head';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Head 
        title="Custom Page Title" 
        description="Custom page description for SEO"
      />
      <main>
        {/* Main content */}
      </main>
    </HelmetProvider>
  );
}
\`\`\`

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| title | string | "Derek Mackley | Full Stack Developer" | Page title that appears in browser tab |
| description | string | "Derek Mackley - Full Stack Developer..." | Meta description for SEO |
| imageUrl | string | "" | URL for social sharing preview images |
| imageAlt | string | "Derek Mackley - Full Stack Developer" | Alt text for social preview images |
| canonicalUrl | string | "" | Canonical URL for SEO purposes |
| structuredData | object | null | Schema.org structured data for rich results |

## Structured Data

The component accepts structured data for schema.org markup, which helps search engines understand the page content.
`;

// Demonstration of structured data for rich search results
export const StructuredData = {
  args: {
  title: "Derek Mackley | About Me",
  description: "Learn about my background, skills and experience",
  structuredData: mockStructuredData.person
}
};
StructuredData.parameters = {
  docs: {
    description: {
      story: 'Using structured data (schema.org) to enhance search engine results with rich data.'
    }
  }
};

// Article page example with article schema
export const ArticlePage = {
  args: {
  title: "How to Build a Developer Portfolio | Derek Mackley",
  description: "A comprehensive guide to creating an effective developer portfolio website",
  imageUrl: "https://example.com/article-featured-image.jpg",
  structuredData: mockStructuredData.article
}
};

// Product page example
export const ProductPage = {
  args: {
  title: "Portfolio Template | Derek Mackley",
  description: "A customizable portfolio template for developers",
  structuredData: mockStructuredData.product
}
};

export const WithLongTitle = {
  args: {
    title: 'John Doe | Senior Software Engineer | Full Stack Developer',
    description: 'Professional portfolio showcasing my work in web development, software engineering, and cloud architecture',
  }
};