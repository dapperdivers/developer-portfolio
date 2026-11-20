import type { Meta, StoryObj } from '@storybook/react-vite';
import ProjectsCard from './ProjectsCard';
import type { Project } from '@/types/portfolio';
import { within, userEvent, expect } from 'storybook/test';
import { placeholderImage } from '@stories-utils/placeholderImage';
import { projects } from '@/portfolio';

const meta = {
  title: 'Molecules/ProjectsCard',
  component: ProjectsCard,
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Project data object',
    },
    index: {
      control: 'number',
      description: 'Index number for staggered animations',
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate the card',
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
} satisfies Meta<typeof ProjectsCard>;
export default meta;

type Story = StoryObj<typeof meta>;

// The real flagship project from the site data
const realProject = projects[0];

// Fictional samples for the stories that need a screenshot or a demo link
const exampleProjects: Project[] = [
  {
    name: "Release Dashboard",
    desc: "Shows which build is live in each environment, who approved it and what changed, so a release review takes minutes instead of an afternoon.",
    image: placeholderImage(800, 450, { label: 'dashboard' }),
    github: "https://github.com/example/release-dashboard",
    link: "https://release-dashboard.example.com",
    stack: ["TypeScript", "React", "PostgreSQL", "Grafana"]
  },
  {
    name: "Freight Tracker",
    desc: "Live shipment status for Northwind Freight dispatchers, with alerts when a load falls behind.",
    image: placeholderImage(800, 450, { label: 'tracker', accent: 'blue' }),
    github: "https://github.com/example/freight-tracker",
    link: "https://freight-tracker.example.com",
    stack: ["C#", ".NET", "SQL Server"]
  },
  {
    name: "Cert Watcher",
    desc: "Checks every public certificate the company owns and opens a ticket two weeks before one expires.",
    github: "https://github.com/example/cert-watcher",
    stack: ["Python", "Kubernetes"]
  }
];

// Default story: a real project from the site, as it appears on the page
export const Default: Story = {
  args: {
    data: realProject,
    index: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(realProject.name)).toBeInTheDocument();
    await expect(canvas.getByText('Kubernetes')).toBeInTheDocument();
    await expect(canvas.getByText('Code')).toBeInTheDocument();
  },
};

// Complete project with image and both links
export const WithFullDetails: Story = {
  args: {
  data: exampleProjects[0],
  index: 0,
},
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  
    await step('Initial render check', async () => {
      // Check title is rendered
      await expect(canvas.getByText('Release Dashboard')).toBeInTheDocument();
    
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
  },
};

// Project without image
export const WithoutImage: Story = {
  args: {
  data: exampleProjects[2],
  index: 2,
}
};

// Project with no links: no empty button row
export const WithoutLinks: Story = {
  args: {
    data: projects[2],
    index: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText('Code')).toBeNull();
    await expect(canvasElement.querySelector('.project-links')).toBeNull();
  },
};

// Project with long text
export const WithLongText: Story = {
  args: {
  data: {
    name: "Project with Very Long Title That Should Wrap to Multiple Lines",
    desc: "This is a project with an extremely long description that should be truncated or handled gracefully by the component. The description explains all the features and technologies used in great detail.",
    image: placeholderImage(800, 450, { label: 'code', accent: 'amber' }),
    github: "https://github.com/example/long-title-project",
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
 *     name: "Release Dashboard",
 *     desc: "A description of the project",
 *     image: "/path/to/image.jpg", // Optional
 *     github: "https://github.com/example/repo", // Optional
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
 * | animated | boolean | true | Whether to animate the card |
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
export const MissingRequiredProps: Story = {
  args: {
  // Deliberately partial: name and desc are left out
  data: {
    github: "https://github.com/example/project",
    stack: ["JavaScript"]
  } as Project,
}
};

// Responsive behavior example
export const Responsive: Story = {
  args: {
  data: exampleProjects[1],
  index: 1,
},
  globals: { viewport: { value: 'mobile1', isRotated: false } },
};
