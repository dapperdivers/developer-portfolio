import React from 'react';
import ProjectsCard from './ProjectsCard';
import { within, userEvent, expect } from '@storybook/test';
import { withPortfolioContext } from '@stories-utils/decorators';

export default {
  title: 'Molecules/ProjectsCard',
  component: ProjectsCard,
  tags: ['autodocs'],
  decorators: [withPortfolioContext],
  argTypes: {
    data: {
      control: 'object',
      description: 'Project data object',
    },
    index: {
      control: 'number',
      description: 'Index number for staggered animations',
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'Project card component for displaying individual project information with image, description, tech stack, and links to code and demo.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'button-name',
            enabled: true,
          },
          {
            id: 'image-alt',
            enabled: true,
          }
        ],
      },
    },
  },
};

// Sample project data for stories
const exampleProjects = [
  {
    name: "React Dashboard",
    desc: "A comprehensive admin dashboard with multiple views and data visualization components",
    image: "https://source.unsplash.com/random/800x450/?dashboard",
    github: "https://github.com/username/react-dashboard",
    link: "https://react-dashboard-demo.example.com",
    stack: ["React", "Redux", "Material UI", "Chart.js"]
  },
  {
    name: "E-commerce Platform",
    desc: "Full-featured online store with product listings, cart functionality, and payment integration",
    image: "https://source.unsplash.com/random/800x450/?ecommerce",
    github: "https://github.com/username/ecommerce-platform",
    link: "https://ecommerce-demo.example.com",
    stack: ["React", "Node.js", "MongoDB", "Stripe"]
  },
  {
    name: "Weather App",
    desc: "Simple weather application that shows current and forecasted weather conditions",
    github: "https://github.com/username/weather-app",
    stack: ["JavaScript", "CSS", "Weather API"]
  }
];

// Template for the component
const Template = (args) => <div style={{ width: '350px' }}><ProjectsCard {...args} /></div>;

// Default story - Complete project with image and links
export const WithFullDetails = {
  args: {
  data: exampleProjects[0],
  index: 0,
}
};
WithFullDetails.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Initial render check', async () => {
    // Check title is rendered
    await expect(canvas.getByText('React Dashboard')).toBeInTheDocument();
    
    // Check tech stack tags are rendered
    await expect(canvas.getByText('React')).toBeInTheDocument();
    
    // Check buttons are rendered
    await expect(canvas.getByText('Code')).toBeInTheDocument();
    await expect(canvas.getByText('Demo')).toBeInTheDocument();
  });
  
  await step('Button interaction test', async () => {
    // Find and hover on the demo button
    const demoButton = canvas.getByText('Demo');
    await userEvent.hover(demoButton);
  });
};

// Project without image
export const WithoutImage = {
  args: {
  data: exampleProjects[2],
  index: 2,
}
};

// Project with long text
export const WithLongText = {
  args: {
  data: {
    name: "Project with Very Long Title That Should Wrap to Multiple Lines",
    desc: "This is a project with an extremely long description that should be truncated or handled gracefully by the component. The description explains all the features and technologies used in great detail.",
    image: "https://source.unsplash.com/random/800x450/?code",
    github: "https://github.com/username/long-title-project",
    link: "https://demo.example.com",
    stack: ["React", "GraphQL", "Node.js", "PostgreSQL", "Redis", "WebSockets", "AWS", "Docker", "Kubernetes"]
  },
  index: 3,
}
};

/**
 * ## Component Usage
 * 
 * ```jsx
 * import ProjectsCard from './ProjectsCard';
 * 
 * function MyComponent() {
 *   // Project data object with required properties
 *   const projectData = {
 *     name: "My Awesome Project",
 *     desc: "A description of the project",
 *     image: "/path/to/image.jpg", // Optional
 *     github: "https://github.com/username/repo", // Optional
 *     link: "https://demo-link.com", // Optional
 *     stack: ["React", "Node.js", "MongoDB"] // Optional
 *   };
 * 
 *   return <ProjectsCard data={projectData} index={0} />;
 * }
 * ```
 * 
 * ## Properties
 * 
 * | Name | Type | Default | Description |
 * |------|------|---------|-------------|
 * | data | object | required | Project data object |
 * | data.name | string | required | Project name |
 * | data.desc | string | required | Project description |
 * | data.image | string | undefined | Project image URL |
 * | data.github | string | undefined | GitHub repository URL |
 * | data.link | string | undefined | Live demo URL |
 * | data.stack | string[] | [] | Array of technologies used |
 * | index | number | 0 | Index number for staggered animations |
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Proper image alt text for screen readers
 * - Keyboard navigable elements with tabIndex
 * - ARIA labels on buttons
 * - Semantic HTML structure
 * 
 * ## Edge Cases
 * 
 * The following stories demonstrate edge cases and special scenarios.
 */
export const MissingRequiredProps = {
  args: {
  data: {
    // Missing required name and desc
    github: "https://github.com/username/project",
    stack: ["JavaScript"]
  },
}
};

// Responsive behavior example
export const Responsive = {
  args: {
  data: exampleProjects[1],
  index: 1,
}
};
Responsive.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};
