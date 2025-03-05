import React from 'react';
import Section from '@layout/Section';
import Button from '@atoms/Button';
import Card from '@atoms/Card';

export default {
  title: 'Templates/Section',
  component: Section,
  tags: ['autodocs'],
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
  parameters: {
    layout: 'fullscreen',
  },
};

// Template for section
const Template = (args) => (
  <Section {...args}>
    <div style={{ padding: '20px 0' }}>
      <p>This is a sample section content. Sections are used to structure the page into logical parts.</p>
    </div>
  </Section>
);

// Default section
export const Default = {
  args: {
  title: 'Section Title',
  subtitle: 'This is a subtitle that provides additional context',
  id: 'sample-section',
  background: 'light',
  container: true,
  fluid: false,
}
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
