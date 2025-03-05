import React from 'react';
import { Helmet } from 'react-helmet-async';

const Head = ({ 
  title = "Derek Mackley | Full Stack Developer",
  description = "Derek Mackley - Full Stack Developer and Security Expert with experience in .NET, C#, Python, JavaScript, React, Node.js, Angular, Docker and Azure",
  imageUrl = "",
  imageAlt = "Derek Mackley - Full Stack Developer",
  canonicalUrl = "",
  structuredData = null
}) => {
  // Default structured data if none provided
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Derek Mackley",
    "url": canonicalUrl || window.location.href,
    "jobTitle": "Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Traction Tools"
    },
    "description": description,
    "knowsAbout": [
      "JavaScript", "React", "Node.js", "Angular", ".NET", "C#", "Python", "Docker", "Azure"
    ],
    "sameAs": [
      "https://github.com/DapperDivers",
      "https://www.linkedin.com/in/dmackley/"
    ]
  };
  
  // Merge provided structured data with default
  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl || window.location.href} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
      
      {/* Performance and security related tags */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta httpEquiv="Permissions-Policy" content="interest-cohort=()" />
      
      {/* PWA related tags */}
      <meta name="theme-color" content="#006ee6" />
      <meta name="color-scheme" content="light" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      
      {/* Preload critical resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://api.github.com" />
      
      {/* Resource hints for performance - remove preload for favicon as it's already loaded via link rel="icon" */}
      
      {/* Structured data for better SEO */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default Head;
