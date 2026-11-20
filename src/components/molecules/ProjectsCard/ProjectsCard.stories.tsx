import type { Meta, StoryObj } from '@storybook/react-vite';
import ProjectsCard from './ProjectsCard';
import type { Project } from '@/types/portfolio';
import { within, userEvent, expect } from 'storybook/test';
import { placeholderImage } from '@stories-utils/placeholderImage';

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

// Sample project data for stories
const exampleProjects: Project[] = [
  {
    name: "React Dashboard",
    desc: "A comprehensive admin dashboard with multiple views and data visualization components",
    image: placeholderImage(800, 450, { label: 'dashboard' }),
    github: "https://github.com/username/react-dashboard",
    link: "https://react-dashboard-demo.example.com",
    stack: ["React", "Redux", "Material UI", "Chart.js"]
  },
  {
    name: "E-commerce Platform",
    desc: "Full-featured online store with product listings, cart functionality, and payment integration",
    image: placeholderImage(800, 450, { label: 'ecommerce', accent: 'blue' }),
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

// Default story - Complete project with image and links
export const WithFullDetails: Story = {
  args: {
  data: exampleProjects[0],
  index: 0,
},
  play: async ({ canvasElement, step }) => {
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
  },
};

// Project without image
export const WithoutImage: Story = {
  args: {
  data: exampleProjects[2],
  index: 2,
}
};

// Project with long text
export const WithLongText: Story = {
  args: {
  data: {
    name: "Project with Very Long Title That Should Wrap to Multiple Lines",
    desc: "This is a project with an extremely long description that should be truncated or handled gracefully by the component. The description explains all the features and technologies used in great detail.",
    image: placeholderImage(800, 450, { label: 'code', accent: 'amber' }),
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
    github: "https://github.com/username/project",
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
