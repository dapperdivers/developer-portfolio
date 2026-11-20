import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Head from './Head';
import type { HeadProps } from './Head';

const meta = {
  title: 'Layout/Head',
  component: Head,
  tags: ['autodocs'],
  // Head renders nothing itself, so every story shows a preview of what it sets
  render: (args) => <HeadPreview {...args} />,
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
} satisfies Meta<typeof Head>;

export default meta;
type Story = StoryObj<typeof meta>;

// Schema.org samples for the structured data stories
const structuredDataSamples = {
  person: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Derek Mackley',
    jobTitle: 'Principal Security Engineer',
    url: 'https://www.derekmackley.com',
    knowsAbout: ['Product Security', 'Kubernetes', 'AI Agent Security'],
  },
  article: {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Running a Kubernetes cluster from the garage',
    author: { '@type': 'Person', name: 'Derek Mackley' },
    datePublished: '2026-11-01',
  },
  product: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Developer Portfolio',
    operatingSystem: 'Web Browser',
    applicationCategory: 'WebApplication',
  },
};

const DEFAULT_TITLE = 'Derek Mackley | Principal Security Engineer';
const DEFAULT_DESCRIPTION = 'Derek Mackley - Principal Security Engineer working across product security, Kubernetes platform engineering and AI agent security';

const previewLabel = {
  margin: '0 0 var(--spacing-2)',
  color: 'var(--color-primary)',
  fontFamily: 'var(--font-family-jetbrains)',
  fontSize: 'var(--font-size-xs)',
  letterSpacing: 'var(--letter-spacing-technical)',
  textTransform: 'uppercase',
} as const;

// Head modifies document.head and renders no UI, so show what it sets: the
// browser tab and search result, then the tags that carry the same values.
const HeadPreview = (args: HeadProps) => {
  const title = args.title || DEFAULT_TITLE;
  const description = args.description || DEFAULT_DESCRIPTION;
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    args.canonicalUrl ? `<link rel="canonical" href="${args.canonicalUrl}" />` : '',
    args.imageUrl ? `<meta property="og:image" content="${args.imageUrl}" />` : '',
    args.imageUrl ? `<meta name="twitter:image" content="${args.imageUrl}" />` : '',
    args.structuredData ? `<script type="application/ld+json"> ${JSON.stringify(args.structuredData)}` : '',
  ].filter(Boolean);

  return (
    <div style={{
      width: 'min(100%, 40rem)',
      padding: 'var(--spacing-5)',
      background: 'var(--surface-card)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-card)',
    }}>
      <Head {...args} />
      <p style={previewLabel}>Search result</p>
      <p style={{ margin: 0, color: 'var(--color-primary)', fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)', overflowWrap: 'anywhere' }}>{title}</p>
      <p style={{ margin: 'var(--spacing-1) 0 var(--spacing-5)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>{description}</p>
      <p style={previewLabel}>Tags set in the document head</p>
      <pre style={{
        margin: 0,
        padding: 'var(--spacing-3)',
        background: 'var(--surface-inset)',
        border: '1px solid var(--surface-divider)',
        borderRadius: 'var(--radius-control)',
        color: 'var(--color-text)',
        fontFamily: 'var(--font-family-jetbrains)',
        fontSize: 'var(--font-size-xs)',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'anywhere',
      }}>
        {tags.join('\n')}
      </pre>
    </div>
  );
};

// Default story with default values
export const Default: Story = {
  args: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  parameters: {
    docs: {
      description: {
        story: 'The Head component with the title and description the site uses.'
      }
    }
  },
};

// Story with custom title and description
export const CustomMetadata: Story = {
  args: {
  title: "Derek Mackley | Projects",
  description: "The homelab, agents and security projects behind this site",
  canonicalUrl: "https://www.derekmackley.com/projects"
},
  parameters: {
    docs: {
      description: {
        story: 'Customized metadata for a specific page, with modified title, description and canonical URL.'
      }
    }
  },
};

/**
 * Social sharing metadata is critical for proper rendering when links 
 * are shared on platforms like Twitter, Facebook, LinkedIn, etc.
 */
export const SocialSharing: Story = {
  args: {
  title: "Derek Mackley | The Garage Cluster",
  description: "How the site is served from a cluster in the garage",
  imageUrl: "https://www.derekmackley.com/images/project-preview.jpg",
  imageAlt: "Diagram of the garage cluster",
  canonicalUrl: "https://www.derekmackley.com/case-study"
}
};

// Demonstration of structured data for rich search results
export const StructuredData: Story = {
  args: {
  title: "Derek Mackley | About",
  description: "Background, skills and experience",
  structuredData: structuredDataSamples.person
},
  parameters: {
    docs: {
      description: {
        story: 'Using structured data (schema.org) to enhance search engine results with rich data.'
      }
    }
  },
};

// Article page example with article schema
export const ArticlePage: Story = {
  args: {
  title: "Running a Kubernetes Cluster from the Garage | Derek Mackley",
  description: "Notes on running a GitOps-managed cluster at home",
  imageUrl: "https://www.derekmackley.com/images/article.jpg",
  structuredData: structuredDataSamples.article
}
};

// Product page example
export const ProductPage: Story = {
  args: {
  title: "Developer Portfolio | Derek Mackley",
  description: "The source for this site",
  structuredData: structuredDataSamples.product
}
};

export const WithLongTitle: Story = {
  args: {
    title: 'Derek Mackley | Principal Security Engineer | Product Security, Platform Engineering and AI Agent Security',
    description: 'Principal security engineer who builds security programs the way he used to build software: automated, measurable and easy for developers to live with.',
  }
};