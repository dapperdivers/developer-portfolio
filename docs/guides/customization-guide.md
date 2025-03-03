# Customization Guide

This guide explains how to customize the developer portfolio to match your personal information, preferences, and style.

## Table of Contents

- [Content Customization](#content-customization)
- [Styling Customization](#styling-customization)
- [Component Customization](#component-customization)
- [Advanced Customization](#advanced-customization)

## Content Customization

The primary way to customize your portfolio content is by editing the `src/portfolio.js` file. This file contains all the data displayed throughout your portfolio.

### Personal Information

Update your personal details in the `greeting` section:

```javascript
const greeting = {
  title: "Hello! I'm [Your Name]",
  subtitle: "A passionate [Your Role] based in [Your Location]",
  description: "I specialize in [Your Specialization]...",
  resumeLink: "https://link-to-your-resume.pdf"
};
```

### Skills Section

Customize your skills in the `skills` object:

```javascript
const skills = {
  title: "What I do",
  subtitle: "CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK",
  skills: [
    "⚡ Develop highly interactive Front end / User Interfaces for your web and mobile applications",
    "⚡ Progressive Web Applications (PWA) in normal and SPA Stacks",
    "⚡ Integration of third party services such as Firebase/ AWS / Digital Ocean"
  ],
  softwareSkills: [
    {
      skillName: "HTML5",
      icon: "mdi:language-html5",
      fontAwesomeClassName: "vscode-icons:file-type-html",
      color: "#E34F26"
    },
    // Add more technologies...
  ]
};
```

### Experience Section

Add your work experience:

```javascript
const workExperiences = {
  experiences: [
    {
      role: "Software Engineer",
      company: "Company Name",
      companyLogo: "/img/icons/common/company-logo.png",
      date: "June 2020 – Present",
      desc: "Your job description...",
      descBullets: [
        "Responsibility 1",
        "Responsibility 2",
        "Responsibility 3"
      ],
      technologies: ["React", "Node.js", "TypeScript"]
    },
    // Add more experiences...
  ]
};
```

### Education Section

Add your educational history:

```javascript
const educationInfo = {
  schools: [
    {
      schoolName: "University Name",
      logo: "/img/icons/common/university-logo.png",
      subHeader: "Bachelor of Science in Computer Science",
      duration: "September 2017 - April 2021",
      desc: "Description of your studies...",
      descBullets: [
        "Bullet 1",
        "Bullet 2"
      ]
    },
    // Add more education...
  ]
};
```

### Projects Section

Showcase your projects:

```javascript
const projects = {
  projects: [
    {
      name: "Project Name",
      description: "Project description...",
      image: "/img/projects/project1.png",
      link: "https://github.com/yourusername/project",
      demo: "https://project-demo.com",
      technologies: ["React", "Node.js", "MongoDB"],
      isFeatured: true
    },
    // Add more projects...
  ]
};
```

### Social Media Links

Update your social media profiles:

```javascript
const socialLinks = {
  github: "https://github.com/yourusername",
  linkedin: "https://www.linkedin.com/in/yourusername/",
  twitter: "https://twitter.com/yourusername",
  // Add more social links...
};
```

## Styling Customization

### Design Tokens

The design system uses CSS variables for consistent styling. Edit `src/assets/css/design-tokens.css` to change colors, typography, spacing, and more:

```css
:root {
  /* Color tokens */
  --color-primary: #0062cc;        /* Main brand color */
  --color-secondary: #6c757d;      /* Secondary color */
  --color-accent: #ffac42;         /* Accent color for highlights */
  --color-background: #ffffff;     /* Background color */
  --color-text: #172b4d;           /* Main text color */
  
  /* Typography tokens */
  --font-family-base: 'Roboto', sans-serif;
  --font-family-heading: 'Poppins', sans-serif;
  
  /* Font sizes */
  --font-size-xs: 0.75rem;         /* 12px */
  --font-size-sm: 0.875rem;        /* 14px */
  --font-size-base: 1rem;          /* 16px */
  --font-size-lg: 1.125rem;        /* 18px */
  --font-size-xl: 1.25rem;         /* 20px */
  --font-size-2xl: 1.5rem;         /* 24px */
  --font-size-3xl: 1.875rem;       /* 30px */
  --font-size-4xl: 2.25rem;        /* 36px */
  
  /* Spacing tokens */
  --spacing-1: 0.25rem;            /* 4px */
  --spacing-2: 0.5rem;             /* 8px */
  --spacing-3: 0.75rem;            /* 12px */
  --spacing-4: 1rem;               /* 16px */
  --spacing-5: 1.5rem;             /* 24px */
  --spacing-6: 2rem;               /* 32px */
  --spacing-8: 3rem;               /* 48px */
  --spacing-10: 4rem;              /* 64px */
  
  /* Border radius */
  --border-radius-sm: 0.125rem;    /* 2px */
  --border-radius-md: 0.25rem;     /* 4px */
  --border-radius-lg: 0.5rem;      /* 8px */
  --border-radius-xl: 1rem;        /* 16px */
  --border-radius-full: 9999px;    /* Fully rounded */
  
  /* Shadow tokens */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  
  /* Animation tokens */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

### Section-Specific Styling

Each section has its own CSS file in `src/assets/css/`. To customize a specific section, edit the corresponding file:

```
- hero-section.css       /* For greeting section */
- skills-section.css     /* For skills section */
- experience-section.css /* For experience section */
- projects-section.css   /* For projects section */
- etc.
```

### Component Styling

Individual components have their own CSS module files. To modify a specific component, edit its CSS file:

```
- src/components/ui/Button.css
- src/components/ui/Card.css
- src/components/ExperienceCard.css
- etc.
```

## Component Customization

### Changing Component Properties

You can customize components by changing their props when using them. For example, to change the appearance of a Card component:

```jsx
// Default card
<Card title="Project Title">
  <p>Content</p>
</Card>

// Customized card
<Card 
  title="Project Title"
  subtitle="Project Subtitle"
  hoverable
  shadow="lg"
  bordered
  padding="lg"
  className="custom-card"
>
  <p>Content</p>
</Card>
```

### Modifying Component Templates

To make deeper changes to component templates:

1. Locate the component in `src/components/`
2. Copy the component to a new file (e.g., `MyCustomCard.jsx`)
3. Modify the component as needed
4. Update imports in your code to use the custom component

For example, to customize the ProjectsCard:

```jsx
// src/components/MyCustomProjectsCard.jsx
import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import './MyCustomProjectsCard.css'; // Create this file with your custom styles

function MyCustomProjectsCard({ project }) {
  return (
    <Card
      title={project.name}
      subtitle={project.type}
      hoverable
      shadow
      className="my-custom-project-card"
    >
      <div className="project-image-container">
        <img src={project.image} alt={project.name} />
      </div>
      
      <p className="project-description">{project.description}</p>
      
      <div className="project-technology-stack">
        {project.technologies.map(tech => (
          <span key={tech} className="tech-badge">{tech}</span>
        ))}
      </div>
      
      <div className="project-links">
        <Button href={project.github} icon="mdi:github">Code</Button>
        {project.demo && (
          <Button href={project.demo} variant="secondary" icon="mdi:open-in-new">
            Live Demo
          </Button>
        )}
      </div>
    </Card>
  );
}

export default MyCustomProjectsCard;
```

Then update the Projects container:

```jsx
// src/containers/Projects.jsx
import MyCustomProjectsCard from '../components/MyCustomProjectsCard';

// Replace ProjectsCard with MyCustomProjectsCard in the render method
```

## Advanced Customization

### Adding New Sections

To add a completely new section to your portfolio:

1. Create a new data section in `portfolio.js`:

```javascript
// portfolio.js
export const publications = {
  title: "Publications",
  subtitle: "My research papers and articles",
  publications: [
    {
      title: "Paper Title",
      journal: "Journal Name",
      date: "January 2021",
      description: "Brief description of the paper...",
      link: "https://link-to-paper"
    },
    // Add more publications...
  ]
};
```

2. Create a new hook to access the data:

```javascript
// src/hooks/usePublications.js
import { usePortfolio } from '../context/PortfolioContext';

export function usePublications() {
  const { publications } = usePortfolio();
  
  return {
    publications: publications.publications || [],
    title: publications.title,
    subtitle: publications.subtitle,
    isLoading: false
  };
}
```

3. Create a PublicationCard component:

```jsx
// src/components/PublicationCard.jsx
import React from 'react';
import { Card } from './ui/Card';
import './PublicationCard.css';

function PublicationCard({ publication }) {
  return (
    <Card
      title={publication.title}
      subtitle={publication.journal}
      hoverable
    >
      <p className="publication-date">{publication.date}</p>
      <p className="publication-description">{publication.description}</p>
      <a href={publication.link} target="_blank" rel="noopener noreferrer">
        Read Publication
      </a>
    </Card>
  );
}

export default PublicationCard;
```

4. Create a Publications container component:

```jsx
// src/containers/Publications.jsx
import React from 'react';
import { usePublications } from '../hooks/usePublications';
import { Section } from '../components/layout/Section';
import PublicationCard from '../components/PublicationCard';
import { Col, Row } from 'reactstrap';

function Publications() {
  const { publications, title, subtitle } = usePublications();
  
  return (
    <Section
      id="publications"
      title={title}
      subtitle={subtitle}
      icon="mdi:file-document"
      background="light"
    >
      <Row className="publications-row">
        {publications.map((publication, index) => (
          <Col key={index} lg="6" className="mb-4">
            <PublicationCard publication={publication} />
          </Col>
        ))}
      </Row>
    </Section>
  );
}

export default Publications;
```

5. Add the new section to `App.jsx`:

```jsx
// src/App.jsx
import Publications from './containers/Publications';

// Add within your components list
<Publications />
```

### Creating Custom Themes

To create a complete custom theme:

1. Create a new file `src/assets/css/themes/custom-theme.css`:

```css
:root {
  /* Override design tokens with your theme colors */
  --color-primary: #ff6b6b;
  --color-secondary: #4ecdc4;
  --color-background: #f7fff7;
  --color-text: #2f3542;
  /* Override other tokens as needed */
}

/* You can add theme-specific styles here */
.theme-custom .card {
  border-radius: var(--border-radius-lg);
}

.theme-custom .button {
  text-transform: uppercase;
}
```

2. Import your theme CSS in `index.jsx`:

```jsx
// src/index.jsx
import './assets/css/themes/custom-theme.css';
```

3. Apply the theme class to your App:

```jsx
// src/App.jsx
function App() {
  return (
    <div className="theme-custom">
      {/* Your app components... */}
    </div>
  );
}
```

### Support for Dark Mode

The portfolio includes support for dark mode. To customize dark mode colors:

1. Edit the dark mode variables in `design-tokens.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1a1a2e;
    --color-text: #e6e6e6;
    --color-card-background: #16213e;
    --color-border: #0f3460;
    /* Other dark mode tokens */
  }
}
```

2. To add a manual dark mode toggle, implement a ThemeContext:

```jsx
// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  // Check system preference on initial load
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // Apply theme class to document
  useEffect(() => {
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

3. Wrap your App with the ThemeProvider:

```jsx
// src/App.jsx
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      {/* Your app components... */}
    </ThemeProvider>
  );
}
```

4. Add a theme toggle button in your Navigation component:

```jsx
// src/components/Navigation.jsx
import { useTheme } from '../context/ThemeContext';

function Navigation() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <nav>
      {/* Other navigation items */}
      <button onClick={toggleTheme} aria-label="Toggle dark mode">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </nav>
  );
}
```