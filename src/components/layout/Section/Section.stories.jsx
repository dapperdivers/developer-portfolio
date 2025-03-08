import React from 'react';
import Section from './Section';
import Button from '@atoms/Button';
import Card from '@atoms/Card';

export default {
  title: 'Layout/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A layout component for structuring content into sections with consistent styling and optional animations.',
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
    id: {
      control: 'text',
      description: 'Section ID for navigation',
    },
    background: {
      control: 'select',
      options: ['light', 'dark', 'primary', 'secondary', 'gray'],
      description: 'Background style',
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
};

/**
 * Default story showing a basic section
 */
export const Default = {
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
 * Story showing a section with predefined icons
 */
export const Education = {
  args: {
    title: 'Education',
    subtitle: 'My academic journey',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Education section content with graduation cap icon.</p>
      </div>
    ),
  },
};

/**
 * Story showing a section with experience icon
 */
export const Experience = {
  args: {
    title: 'Experience',
    subtitle: 'Professional journey',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Experience section content with briefcase icon.</p>
      </div>
    ),
  },
};

/**
 * Story showing a section with animation
 */
export const WithAnimation = {
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
export const FluidContainer = {
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
 * Story showing different background styles
 */
export const BackgroundStyles = {
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
      <Section {...args} background="light" subtitle="Light Background" />
      <Section {...args} background="dark" subtitle="Dark Background" />
      <Section {...args} background="primary" subtitle="Primary Background" />
      <Section {...args} background="secondary" subtitle="Secondary Background" />
      <Section {...args} background="gray" subtitle="Gray Background" />
    </>
  ),
};

/**
 * Story showing a section without a container
 */
export const NoContainer = {
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
export const DarkMode = {
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
export const EducationSection = {
  args: {
  title: 'Education',
  subtitle: 'My educational background',
  id: 'education',
  background: 'light',
}
};

// Experience section
export const ExperienceSection = {
  args: {
  title: 'Experience',
  subtitle: 'My professional journey',
  id: 'experience',
  background: 'gray',
}
};

// Projects section
export const ProjectsSection = {
  args: {
  title: 'Projects',
  subtitle: 'Some of my recent work',
  id: 'projects',
  background: 'light',
}
};

// Section with cards
export const SectionWithCards = (args) => (
  <Section
    title="Projects"
    subtitle="Check out some of my work"
    id="projects"
    background="light"
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
export const DarkSection = {
  args: {
  title: 'Contact',
  subtitle: 'Get in touch with me',
  id: 'contact',
  background: 'dark',
}
};

// Section with animation
export const AnimatedSection = (args) => (
  <Section
    title="Animated Section"
    subtitle="This section animates when it comes into view"
    id="animated"
    background="light"
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
export const FluidSection = {
  args: {
  title: 'Full Width Section',
  subtitle: 'This section uses a fluid container',
  id: 'fluid',
  background: 'primary',
  container: true,
  fluid: true,
}
};
