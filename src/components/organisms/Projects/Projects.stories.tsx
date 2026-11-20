import type { Meta, StoryObj } from '@storybook/react-vite';
import Projects from './Projects';
import { within, expect } from 'storybook/test';
import type { Project } from '@/types/portfolio';
import { withViewport } from '@stories-utils';
import { placeholderImage } from '@stories-utils/placeholderImage';
import { siteData, withSiteData, withSettledMotion } from '../storyFixtures';

const meta = {
  title: 'Organisms/Projects',
  component: Projects,
  tags: ['autodocs'],
  // Cards are shown in place; the entrance animation has its own stories
  decorators: [withSettledMotion],
  parameters: {
    docs: {
      description: {
        component: 'Projects section: a grid of project cards for the work projects, then an "Off the clock" strip for personal ones. Reads the projects from PortfolioContext.',
      },
    },
    layout: 'fullscreen',
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
} satisfies Meta<typeof Projects>;

export default meta;
type Story = StoryObj<typeof meta>;

const workProjects = siteData.projects.filter((p) => p.kind !== 'personal');
const personalProjects = siteData.projects.filter((p) => p.kind === 'personal');

// Clearly fictional extras for the stories that need images, links or more cards
const sampleProjects: Project[] = [
  {
    name: "Release Dashboard",
    desc: "Shows which build is live in each environment and who approved it.",
    image: placeholderImage(600, 400, { label: 'Dashboard' }),
    link: "https://example.com/release-dashboard",
    github: "https://github.com/example/release-dashboard",
    stack: ["TypeScript", "React", "PostgreSQL"]
  },
  {
    name: "Freight Tracker",
    desc: "Live shipment status for Northwind Freight dispatchers.",
    image: placeholderImage(600, 400, { label: 'Tracker', accent: 'blue' }),
    github: "https://github.com/example/freight-tracker",
    stack: ["C#", ".NET", "SQL Server"]
  },
];

// The real projects from the site data
export const Default: Story = {
  decorators: [withSiteData()],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check section title', async () => {
      await expect(canvas.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    });

    await step('Check project cards and the off the clock strip', async () => {
      for (const project of workProjects) {
        await expect(canvas.getByText(project.name)).toBeInTheDocument();
      }
      await expect(canvas.getByText('Off the clock')).toBeInTheDocument();
      for (const project of personalProjects) {
        await expect(canvas.getByText(project.name)).toBeInTheDocument();
      }
    });
  },
};

// Cards with a screenshot and a demo link, as well as code links
export const WithImagesAndLinks: Story = {
  decorators: [withSiteData({ projects: [...sampleProjects, ...workProjects.slice(0, 2)] })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Release Dashboard')).toBeInTheDocument();
    await expect(canvas.getAllByText('Code').length).toBeGreaterThan(1);
    await expect(canvas.getAllByText('Demo').length).toBe(1);
  },
};

/**
 * Only one project in the data: the grid adjusts.
 */
export const WithSingleProject: Story = {
  decorators: [withSiteData({ projects: [workProjects[0]] })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(workProjects[0].name)).toBeInTheDocument();
    await expect(canvas.queryByText(workProjects[1].name)).not.toBeInTheDocument();
    await expect(canvas.queryByText('Off the clock')).not.toBeInTheDocument();
  },
};

/**
 * Personal projects leave the grid and appear in the "Off the clock" strip.
 */
export const WithPersonalProjects: Story = {
  decorators: [withSiteData({ projects: [workProjects[0], ...personalProjects] })],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Off the clock')).toBeInTheDocument();
    await expect(canvas.getByText(personalProjects[0].name)).toBeInTheDocument();
    await expect(canvas.getByText(workProjects[0].name)).toBeInTheDocument();
  },
};

/**
 * When no projects are available the section says so.
 */
export const EmptyState: Story = {
  decorators: [withSiteData({ projects: [] })],
  parameters: {
    docs: {
      description: {
        story: 'With no projects the section shows a short message instead of cards.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('No projects are currently available.')).toBeInTheDocument();
  },
};

/**
 * Projects with varying amounts of data: full, no image, no links, minimal.
 */
export const MixedDataCompleteness: Story = {
  decorators: [
    withSiteData({
      projects: [
        sampleProjects[0],
        {
          name: "No Image Project",
          desc: "A project with source but no screenshot.",
          github: "https://github.com/example/no-image",
          stack: ["Python", "Flask"]
        },
        {
          name: "No Links Project",
          desc: "A project without any links.",
          image: placeholderImage(600, 400, { label: 'No links', accent: 'green' }),
          stack: ["Go", "gRPC"]
        },
        {
          name: "Minimal Project",
          desc: "A project with minimal information."
        }
      ]
    })
  ],
};

// Mobile view
export const Mobile: Story = {
  decorators: [withSiteData(), withViewport('mobile')],
  parameters: {
    docs: {
      description: {
        story: 'Mobile view of the projects section, showing how the card grid adapts to smaller screens.'
      }
    }
  },
};

// Many projects view
export const ManyProjects: Story = {
  decorators: [
    withSiteData({
      projects: [...workProjects, ...sampleProjects, ...personalProjects],
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'Shows how the grid layout handles a large number of projects.'
      }
    }
  },
};
