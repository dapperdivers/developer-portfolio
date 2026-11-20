import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import Section from './Section';
import Button from '@atoms/Button';
import Card from '@atoms/Card';

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

/**
 * Default story showing a basic section
 */
export const Default: Story = {
  args: {
    title: 'Section Title',
    subtitle: 'Section Subtitle',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This is the section content.</p>
      </div>
    ),
  },
};

/**
 * Education section with a kicker from its id
 */
export const Education: Story = {
  args: {
    id: 'education',
    title: 'Education',
    subtitle: 'My academic journey',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Education section content.</p>
      </div>
    ),
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
    subtitle: 'Professional journey',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Experience section content.</p>
      </div>
    ),
  },
};

/**
 * Story showing a section with animation
 */
export const WithAnimation: Story = {
  args: {
    title: 'Animated Section',
    subtitle: 'With Framer Motion animation',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This section animates on mount.</p>
      </div>
    ),
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
    title: 'Fluid Section',
    subtitle: 'Full-width container',
    fluid: true,
    children: (
      <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
        <p>This section uses a fluid container that spans the full width.</p>
      </div>
    ),
  },
};

/**
 * Five sections in a row. Section no longer takes a background prop (the global
 * background shows through), so they differ only in their subtitle.
 */
export const BackgroundStyles: Story = {
  args: {
    title: 'Background Styles',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This section demonstrates different background options.</p>
      </div>
    ),
  },
  render: (args) => (
    <>
      <Section {...args} subtitle="Light Background" />
      <Section {...args} subtitle="Dark Background" />
      <Section {...args} subtitle="Primary Background" />
      <Section {...args} subtitle="Secondary Background" />
      <Section {...args} subtitle="Gray Background" />
    </>
  ),
};

/**
 * Story showing a section without a container
 */
export const NoContainer: Story = {
  args: {
    title: 'No Container',
    subtitle: 'Content spans full width',
    container: false,
    children: (
      <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
        <p>This section has no container wrapper.</p>
      </div>
    ),
  },
};

/**
 * Story showing a section in dark mode
 */
export const DarkMode: Story = {
  args: {
    title: 'Dark Mode Section',
    subtitle: 'Optimized for dark theme',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This section is optimized for dark mode viewing.</p>
      </div>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

// Education section
export const EducationSection: Story = {
  args: {
  title: 'Education',
  subtitle: 'My educational background',
  id: 'education',
  children: <p style={{ padding: '20px' }}>Section content goes here.</p>,
}
};

// Experience section
export const ExperienceSection: Story = {
  args: {
  title: 'Experience',
  subtitle: 'My professional journey',
  id: 'experience',
  children: <p style={{ padding: '20px' }}>Section content goes here.</p>,
}
};

// Projects section
export const ProjectsSection: Story = {
  args: {
  title: 'Projects',
  subtitle: 'Some of my recent work',
  id: 'projects',
  children: <p style={{ padding: '20px' }}>Section content goes here.</p>,
}
};

// Section with cards
export const SectionWithCards: StoryFn<typeof Section> = () => (
  <Section
    title="Projects"
    subtitle="Check out some of my work"
    id="projects"
  >
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
      gap: '20px',
      padding: '20px 0'
    }}>
      <Card title="Project 1" shadow hoverable>
        <p>This is a description of project 1.</p>
        <Button variant="primary" size="sm">View Project</Button>
      </Card>
      <Card title="Project 2" shadow hoverable>
        <p>This is a description of project 2.</p>
        <Button variant="primary" size="sm">View Project</Button>
      </Card>
      <Card title="Project 3" shadow hoverable>
        <p>This is a description of project 3.</p>
        <Button variant="primary" size="sm">View Project</Button>
      </Card>
    </div>
  </Section>
);

// Section with dark background
export const DarkSection: Story = {
  args: {
  title: 'Contact',
  subtitle: 'Get in touch with me',
  id: 'contact',
  children: <p style={{ padding: '20px' }}>Section content goes here.</p>,
}
};

// Section with animation
export const AnimatedSection: StoryFn<typeof Section> = () => (
  <Section
    title="Animated Section"
    subtitle="This section animates when it comes into view"
    id="animated"
    animation={{
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 }
    }}
  >
    <div style={{ padding: '20px 0' }}>
      <p>The entire section animates with Framer Motion when it renders.</p>
    </div>
  </Section>
);

// Fluid section
export const FluidSection: Story = {
  args: {
  title: 'Full Width Section',
  subtitle: 'This section uses a fluid container',
  id: 'fluid',
  container: true,
  fluid: true,
  children: <p style={{ padding: '20px' }}>Section content goes here.</p>,
}
};

// Same header across sections: kicker, title, subtitle
export const HeaderConsistency: Story = {
  args: { title: 'Header', children: null },
  render: () => (
    <>
      <Section id="skills" title="What I do" subtitle="Principal security engineer across product security, platforms and AI agents">
        <p>Content</p>
      </Section>
      <Section id="projects" title="Projects" subtitle="Some of my recent work">
        <p>Content</p>
      </Section>
      <Section id="contact" title="Contact" kicker="">
        <p>No kicker when it is set to an empty string.</p>
      </Section>
    </>
  ),
};
