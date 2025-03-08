import React from 'react';
import Projects from './Projects';
import { within, userEvent, expect } from '@storybook/test';
import { mockPortfolioData, withPortfolioContext, withViewport } from '@stories-utils';
import PortfolioContext from '@context/PortfolioContext';

// Helper function to create context with custom projects data
const createContextWithProjects = (projectsData) => {
  const customContext = { ...mockPortfolioData, projects: projectsData };
  return (Story) => (
    <PortfolioContext.Provider value={customContext}>
      <Story />
    </PortfolioContext.Provider>
  );
};

export default {
  title: 'Organisms/Projects',
  component: Projects,
  tags: ['autodocs'],
  decorators: [withPortfolioContext],
  parameters: {
    docs: {
      description: {
        component: 'Projects section that displays a grid of project cards, showcasing the portfolio projects with descriptions and links.',
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'heading-order', enabled: true },
          { id: 'link-name', enabled: true }
        ],
      },
    },
  },
};


// Basic template
const Template = () => <Projects />;

// Sample project data for stories
const sampleProjects = [
  {
    name: "Project Alpha",
    desc: "A full-stack web application with React and Node.js",
    image: "https://via.placeholder.com/600x400?text=Project+Alpha",
    link: "https://example.com/project-alpha",
    github: "https://github.com/username/project-alpha",
    stack: ["React", "Node.js", "MongoDB"]
  },
  {
    name: "Project Beta",
    desc: "Mobile-first responsive website with modern UI/UX",
    image: "https://via.placeholder.com/600x400?text=Project+Beta",
    link: "https://example.com/project-beta",
    github: "https://github.com/username/project-beta",
    stack: ["React", "CSS3", "Firebase"]
  },
  {
    name: "Project Gamma",
    desc: "Real-time data visualization dashboard",
    image: "https://via.placeholder.com/600x400?text=Project+Gamma",
    link: "https://example.com/project-gamma",
    github: "https://github.com/username/project-gamma",
    stack: ["D3.js", "React", "Express", "Socket.io"]
  }
];

// Default story with multiple projects
export const WithMultipleProjects = Template.bind({});
WithMultipleProjects.decorators = [createContextWithProjects(sampleProjects)];
WithMultipleProjects.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Check section title', async () => {
    await expect(canvas.getByText('Projects')).toBeInTheDocument();
  });
  
  await step('Check project cards', async () => {
    // Project titles should be visible
    await expect(canvas.getByText('Project Alpha')).toBeInTheDocument();
    await expect(canvas.getByText('Project Beta')).toBeInTheDocument();
    await expect(canvas.getByText('Project Gamma')).toBeInTheDocument();
    
    // Link buttons should be present
    const demoButtons = canvas.getAllByText('Demo');
    const codeButtons = canvas.getAllByText('Code');
    await expect(demoButtons.length).toBe(3);
    await expect(codeButtons.length).toBe(3);
  });
};

/**
 * Shows how the component handles having only a single project item.
 * The grid layout should adjust accordingly.
 */
export const WithSingleProject = Template.bind({});
WithSingleProject.decorators = [
  createContextWithProjects([sampleProjects[0]])
];
WithSingleProject.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  
  await step('Check single project item', async () => {
    await expect(canvas.getByText('Project Alpha')).toBeInTheDocument();
    // Should not find other projects
    await expect(canvas.queryByText('Project Beta')).not.toBeInTheDocument();
  });
};

/**
 * Shows what happens when no projects are available.
 * The component should render the section without any cards.
 */
export const EmptyState = Template.bind({});
EmptyState.decorators = [createContextWithProjects([])];
EmptyState.parameters = {
  docs: {
    description: {
      story: 'When no projects are available, the section is rendered without any project cards.'
    }
  }
};

/**
 * Shows projects with varying amounts of data.
 * Some have full info, while others have minimal data.
 */
export const MixedDataCompleteness = Template.bind({});
MixedDataCompleteness.decorators = [
  createContextWithProjects([
    // Complete project with all fields
    sampleProjects[0],
    // Project without image
    {
      name: "No Image Project",
      desc: "A project without an image",
      github: "https://github.com/username/no-image",
      stack: ["JavaScript", "HTML", "CSS"]
    },
    // Project without links
    {
      name: "No Links Project",
      desc: "A project without any links",
      image: "https://via.placeholder.com/600x400?text=No+Links",
      stack: ["Python", "Django"]
    },
    // Minimal project
    {
      name: "Minimal Project",
      desc: "A project with minimal information"
    }
  ])
];

/**
 * ## Component Usage
 * 
 * ```jsx
 * import Projects from '@/stories/containers/Projects';
 * import PortfolioContext from '@context/PortfolioContext';
 * 
 * function App() {
 *   const portfolioData = {
 *     projects: [
 *       {
 *         name: "Project Name",
 *         desc: "Project description",
 *         image: "path/to/image.jpg",
 *         github: "https://github.com/username/repo",
 *         link: "https://example.com/demo",
 *         stack: ["React", "Node.js"]
 *       }
 *     ]
 *   };
 *   
 *   return (
 *     <PortfolioContext.Provider value={portfolioData}>
 *       <Projects />
 *     </PortfolioContext.Provider>
 *   );
 * }
 * ```
 * 
 * ## Context Requirements
 * 
 * The component expects the following data in the PortfolioContext:
 * 
 * | Context Path | Type | Description |
 * |------|------|-------------|
 * | projects | array | Array of project objects with name, desc, image (optional), github (optional), link (optional), and stack (optional) |
 * 
 * ## Accessibility
 * 
 * This component follows these accessibility best practices:
 * - Uses semantic HTML with proper heading structure
 * - Provides ARIA labels for buttons and links
 * - Ensures sufficient color contrast for text
 * - Makes interactive elements accessible via keyboard navigation
 * - Uses tab indices to ensure proper focus management
 */

// Mobile view
export const Mobile = Template.bind({});
Mobile.decorators = [
  createContextWithProjects(sampleProjects),
  withViewport('mobile')
];
Mobile.parameters = {
  docs: {
    description: {
      story: 'Mobile view of the projects section, showing how the card grid adapts to smaller screens.'
    }
  }
};

// Many projects view
export const ManyProjects = Template.bind({});
ManyProjects.decorators = [
  createContextWithProjects([
    ...sampleProjects,
    {
      name: "Project Delta",
      desc: "E-commerce platform with payment integration",
      image: "https://via.placeholder.com/600x400?text=Project+Delta",
      link: "https://example.com/project-delta",
      stack: ["React", "Redux", "Stripe", "Express"]
    },
    {
      name: "Project Epsilon",
      desc: "Content management system for digital publications",
      image: "https://via.placeholder.com/600x400?text=Project+Epsilon",
      github: "https://github.com/username/project-epsilon",
      stack: ["Next.js", "GraphQL", "PostgreSQL"]
    },
    {
      name: "Project Zeta",
      desc: "Machine learning application for image recognition",
      image: "https://via.placeholder.com/600x400?text=Project+Zeta",
      github: "https://github.com/username/project-zeta",
      link: "https://example.com/project-zeta",
      stack: ["Python", "TensorFlow", "Flask", "React"]
    }
  ])
];
ManyProjects.parameters = {
  docs: {
    description: {
      story: 'Shows how the grid layout handles a large number of projects.'
    }
  }
};