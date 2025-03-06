import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaMedium, FaDev, FaStackOverflow, FaYoutube, FaInstagram } from 'react-icons/fa';
import { within, userEvent, expect } from '@storybook/test';

// Import the CSS for styling
import '../../assets/css/components/ui/social-links.css';

// Create a modified version of SocialLinks component for Storybook
// This allows us to pass socialLinks as a prop instead of importing from portfolio.js
const StorySocialLinks = ({ links, variant = 'default' }) => {
  return (
    <div className={`social-links ${variant === 'dark' ? 'dark-theme' : ''}`}>
      {links.github && (
        <a
          className="social-link-button"
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <FaGithub className="social-icon" />
        </a>
      )}
      
      {links.linkedin && (
        <a
          className="social-link-button"
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin className="social-icon" />
        </a>
      )}
      
      {links.twitter && (
        <a
          className="social-link-button"
          href={links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter Profile"
        >
          <FaTwitter className="social-icon" />
        </a>
      )}
      
      {links.medium && (
        <a
          className="social-link-button"
          href={links.medium}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Medium Profile"
        >
          <FaMedium className="social-icon" />
        </a>
      )}
      
      {links.dev && (
        <a
          className="social-link-button"
          href={links.dev}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Dev.to Profile"
        >
          <FaDev className="social-icon" />
        </a>
      )}
      
      {links.stackoverflow && (
        <a
          className="social-link-button"
          href={links.stackoverflow}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Stack Overflow Profile"
        >
          <FaStackOverflow className="social-icon" />
        </a>
      )}
      
      {links.youtube && (
        <a
          className="social-link-button"
          href={links.youtube}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube Channel"
        >
          <FaYoutube className="social-icon" />
        </a>
      )}
      
      {links.instagram && (
        <a
          className="social-link-button"
          href={links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Profile"
        >
          <FaInstagram className="social-icon" />
        </a>
      )}
    </div>
  );
};

// Sample social links data for stories
const sampleLinks = {
  default: {
    github: "https://github.com/username",
    linkedin: "https://www.linkedin.com/in/username",
  },
  complete: {
    github: "https://github.com/username",
    linkedin: "https://www.linkedin.com/in/username",
    twitter: "https://twitter.com/username",
    medium: "https://medium.com/@username",
    dev: "https://dev.to/username",
    stackoverflow: "https://stackoverflow.com/users/123456/username",
    youtube: "https://youtube.com/c/username",
    instagram: "https://instagram.com/username"
  },
  minimal: {
    github: "https://github.com/username"
  }
};

export default {
  title: 'Molecules/SocialLinks',
  component: StorySocialLinks,
  tags: ['autodocs'],
  argTypes: {
    links: {
      control: 'object',
      description: 'Object containing social media platform links',
    },
    variant: {
      control: 'select',
      options: ['default', 'dark'],
      description: 'Visual style variant of the social links',
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Social Links component for displaying social media profile links with icons. Supports multiple platforms and can be extended to include additional platforms.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', reviewOnFail: true }, 
          { id: 'color-contrast', reviewOnFail: true },
          { id: 'aria-allowed-attr', reviewOnFail: true }
        ],
      },
    },
  },
};


// Template for the component
const Template = (args) => (
  <div style={{ padding: '20px', background: args.variant === 'dark' ? '#333' : '#f8f9fa' }}>
    <StorySocialLinks {...args} />
  </div>
);

// Default story - Standard GitHub and LinkedIn links
export const Default = {
  args: {
  links: sampleLinks.default,
  variant: 'default'
}
};
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', () => {
    // Check that the GitHub and LinkedIn links are rendered
    const githubLink = canvas.getByLabelText('GitHub Profile');
    const linkedinLink = canvas.getByLabelText('LinkedIn Profile');
    
    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    
    // Check that the links have the correct href attributes
    expect(githubLink).toHaveAttribute('href', sampleLinks.default.github);
    expect(linkedinLink).toHaveAttribute('href', sampleLinks.default.linkedin);
  });
  
  await step('Keyboard navigation test', async () => {
    // Focus on the first social link button
    await userEvent.tab();
    const githubLink = canvas.getByLabelText('GitHub Profile');
    expect(githubLink).toHaveFocus();
    
    // Tab to the second link
    await userEvent.tab();
    const linkedinLink = canvas.getByLabelText('LinkedIn Profile');
    expect(linkedinLink).toHaveFocus();
  });
};

// All social platforms example
export const AllPlatforms = {
  args: {
  links: sampleLinks.complete,
  variant: 'default'
}
};
AllPlatforms.parameters = {
  docs: {
    description: {
      story: 'Displays social media links for all supported platforms including GitHub, LinkedIn, Twitter, Medium, Dev.to, Stack Overflow, YouTube, and Instagram.'
    }
  }
};

// Single platform example
export const SinglePlatform = {
  args: {
  links: sampleLinks.minimal,
  variant: 'default'
}
};
SinglePlatform.parameters = {
  docs: {
    description: {
      story: 'Shows how the component appears when only a single social media platform is used.'
    }
  }
};

// Dark theme variation
export const DarkTheme = {
  args: {
  links: sampleLinks.default,
  variant: 'dark'
}
};
DarkTheme.parameters = {
  docs: {
    description: {
      story: 'Demonstrates the social links with a dark background, useful for footer sections or dark-themed pages.'
    }
  },
  backgrounds: { 
    default: 'dark'
  }
};

// Horizontal layout with wrapped links
const createManyLinks = () => {
  // Create a version with multiple duplicate links to test wrapping behavior
  const manyLinks = {};
  for (let i = 0; i < 5; i++) {
    Object.keys(sampleLinks.complete).forEach(platform => {
      manyLinks[`${platform}${i}`] = sampleLinks.complete[platform];
    });
  }
  return manyLinks;
};

export const WrappingBehavior = () => (
  <div style={{ maxWidth: '400px', padding: '20px', background: '#f8f9fa', border: '1px dashed #ccc' }}>
    <StorySocialLinks links={createManyLinks()} variant="default" />
  </div>
);
WrappingBehavior.parameters = {
  docs: {
    description: {
      story: 'Tests how the component handles many social links in a constrained width container, demonstrating wrapping behavior.'
    }
  }
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import SocialLinks from '@molecules/SocialLinks';
 * 
 * function Footer() {
 *   return (
 *     <footer className="site-footer">
 *       <div className="container">
 *         <h3>Connect with me</h3>
 *         <SocialLinks />
 *       </div>
 *     </footer>
 *   );
 * }
 * ```
 * 
 * The component uses social media links defined in the portfolio.js file:
 * 
 * ```javascript
 * // In portfolio.js
 * export const socialLinks = {
 *   github: "https://github.com/username",
 *   linkedin: "https://www.linkedin.com/in/username",
 *   twitter: "https://twitter.com/username",
 *   // Add more platforms as needed
 * };
 * ```
 * 
 * ## Accessibility Features
 * 
 * - Each social link has an appropriate aria-label for screen reader users
 * - Links have proper focus styling for keyboard navigation
 * - High color contrast for icon visibility
 * - Proper use of semantic HTML elements
 * - Icon-only links are supplemented with descriptive text for screen readers
 * 
 * ## Customization Options
 * 
 * The component can be customized by:
 * 
 * - Adding or removing social media platforms in the portfolio.js file
 * - Styling through the SocialLinks.css file
 * - Enhancing with additional icons from the react-icons library
 * - Placing in various containers (footer, header, sidebar, etc.)
 */

// Mobile view for responsive testing
export const MobileView = {
  args: {
  links: sampleLinks.complete,
  variant: 'default'
}
};
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
  docs: {
    description: {
      story: 'Shows how the social links appear on mobile devices with smaller icons and spacing.'
    }
  }
};
