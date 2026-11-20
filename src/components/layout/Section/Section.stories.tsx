import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import Section from './Section';
import Button from '@atoms/Button';
import Card from '@atoms/Card';
import { projects } from '@/portfolio';

const meta = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A layout component for structuring content into sections. Every section gets the same header: a monospace path kicker (~/id), the title, one subtitle style and a single hairline before the content.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Section title',
    },
    subtitle: {
      control: 'text',
      description: 'Section subtitle',
    },
    kicker: {
      control: 'text',
      description: 'Monospace path label above the title. Defaults to ~/<id>; "" hides it.',
    },
    id: {
      control: 'text',
      description: 'Section ID for navigation',
    },
    container: {
      control: 'boolean',
      description: 'Whether to wrap content in a container',
    },
    fluid: {
      control: 'boolean',
      description: 'Whether the container should be fluid (full-width)',
    },
    animation: {
      control: { disable: true },
      description: 'Animation properties for Framer Motion',
    },
    children: {
      control: { disable: true },
      description: 'Section content',
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleBlock = (text: string) => (
  <p style={{ margin: 0, color: 'var(--color-text-muted)', maxWidth: '40rem' }}>{text}</p>
);

/**
 * Default story showing a basic section
 */
export const Default: Story = {
  args: {
    id: 'skills',
    title: 'What I do',
    subtitle: 'Principal security engineer across product security, platforms and AI agents',
    children: sampleBlock('The section header (path kicker, title, subtitle and a hairline) is the same on every section of the site. Content goes below it.'),
  },
};

/**
 * Education section: the kicker comes from the id
 */
export const Education: Story = {
  args: {
    id: 'education',
    title: 'Education',
    subtitle: 'Degree and certifications',
    children: sampleBlock('The kicker above the title defaults to ~/education.'),
  },
};

/**
 * Experience section with an explicit kicker
 */
export const Experience: Story = {
  args: {
    id: 'experience',
    kicker: '// 02 experience',
    title: 'Experience',
    subtitle: 'Where I have worked',
    children: sampleBlock('A kicker passed in explicitly replaces the default.'),
  },
};

/**
 * Story showing a section with animation
 */
export const WithAnimation: Story = {
  args: {
    title: 'Animated section',
    subtitle: 'Entrance animation from Framer Motion',
    children: sampleBlock('This section fades and slides in on mount.'),
    animation: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    },
  },
};

/**
 * Story showing a fluid container section
 */
export const FluidContainer: Story = {
  args: {
    title: 'Fluid section',
    subtitle: 'Full-width container',
    fluid: true,
    children: sampleBlock('The container spans the full width of the page instead of stopping at the content width.'),
  },
};

/**
 * Story showing a section without a container
 */
export const NoContainer: Story = {
  args: {
    title: 'No container',
    subtitle: 'Content spans full width',
    container: false,
    children: sampleBlock('The header keeps its container; the content wrapper does not.'),
  },
};

/**
 * Sections stacked as they are on the page. Section takes no background prop:
 * the global background shows through.
 */
export const StackedSections: Story = {
  args: { title: 'Stacked', children: null },
  render: () => (
    <>
      <Section id="experience" title="Experience" subtitle="Where I have worked">
        {sampleBlock('First section.')}
      </Section>
      <Section id="projects" title="Projects" subtitle="What I build at home">
        {sampleBlock('Second section.')}
      </Section>
      <Section id="contact" title="Contact Me">
        {sampleBlock('Third section.')}
      </Section>
    </>
  ),
};

// Section holding a grid of cards, using the real project names
export const SectionWithCards: StoryFn<typeof Section> = () => (
  <Section
    title="Projects"
    subtitle="What I build at home"
    id="projects"
  >
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: 'var(--spacing-5)',
      padding: 'var(--spacing-5) 0'
    }}>
      {projects.slice(0, 3).map((project) => (
        <Card key={project.name} title={project.name} shadow hoverable>
          <p>{project.desc}</p>
          {project.github && (
            <Button variant="primary" size="sm" href={project.github} target="_blank" rel="noopener noreferrer">
              Code
            </Button>
          )}
        </Card>
      ))}
    </div>
  </Section>
);

// Same header across sections: kicker, title, subtitle
export const HeaderConsistency: Story = {
  args: { title: 'Header', children: null },
  render: () => (
    <>
      <Section id="skills" title="What I do" subtitle="Principal security engineer across product security, platforms and AI agents">
        {sampleBlock('Content')}
      </Section>
      <Section id="projects" title="Projects" subtitle="What I build at home">
        {sampleBlock('Content')}
      </Section>
      <Section id="contact" title="Contact" kicker="">
        {sampleBlock('No kicker when it is set to an empty string.')}
      </Section>
    </>
  ),
};
