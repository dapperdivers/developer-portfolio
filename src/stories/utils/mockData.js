/**
 * Mock data for Storybook stories
 * 
 * This file contains mock data objects for use in Storybook stories,
 * especially for components that depend on context values.
 */

// Mock data for PortfolioContext
export const mockPortfolioData = {
  greeting: {
    title: "Hi there, I'm Derek Mackley",
    subtitle: "A passionate Full Stack Developer",
    description: "I design and develop web applications with modern JavaScript frameworks and build scalable backend services.",
    resumeLink: "https://example.com/resume.pdf"
  },
  socialLinks: [
    {
      name: "github",
      url: "https://github.com/username",
      icon: "github"
    },
    {
      name: "linkedin",
      url: "https://linkedin.com/in/username",
      icon: "linkedin"
    },
    {
      name: "twitter",
      url: "https://twitter.com/username",
      icon: "twitter"
    }
  ],
  skillsSection: {
    title: "Skills",
    subTitle: "My technical expertise",
    skills: [
      { skillName: "JavaScript", iconName: "logos:javascript" },
      { skillName: "React", iconName: "logos:react" },
      { skillName: "Node.js", iconName: "logos:nodejs" },
      { skillName: "TypeScript", iconName: "logos:typescript-icon" },
      { skillName: "Git", iconName: "logos:git-icon" },
      { skillName: "Python", iconName: "logos:python" }
    ]
  },
  educationInfo: [
    {
      schoolName: "University of Technology",
      subHeader: "Bachelor of Science in Computer Science",
      duration: "2015 - 2019",
      desc: "Graduated with honors",
      descBullets: [
        "Specialized in Software Engineering",
        "Completed thesis on scalable web applications"
      ]
    },
    {
      schoolName: "Coding Academy",
      subHeader: "Advanced Web Development Certification",
      duration: "2019 - 2020",
      desc: "Intensive full-stack development program",
      descBullets: [
        "Developed production-ready applications",
        "Focused on modern JavaScript frameworks"
      ]
    },
    {
      schoolName: "Online University",
      subHeader: "Cloud Computing Specialization",
      duration: "2021",
      desc: "Professional certification in cloud architecture",
      descBullets: []
    }
  ],
  experience: [
    {
      role: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      companylogo: "https://via.placeholder.com/150",
      date: "Jan 2022 – Present",
      desc: "Led the development of responsive web applications using React and modern JavaScript frameworks.",
      descBullets: [
        "Implemented atomic design system across multiple projects",
        "Reduced bundle size by 40% through code splitting",
        "Mentored junior developers on React best practices"
      ]
    },
    {
      role: "Frontend Developer",
      company: "Digital Solutions",
      companylogo: "https://via.placeholder.com/150",
      date: "Mar 2020 – Dec 2021",
      desc: "Designed and developed user interfaces for client web applications.",
      descBullets: [
        "Created reusable component libraries",
        "Optimized application performance",
        "Collaborated with UX designers"
      ]
    }
  ],
  feedbacks: [
    {
      name: "John Smith",
      feedback: "Derek is an exceptional developer who consistently delivers high-quality code and innovative solutions.",
      title: "CTO at TechCorp"
    }
  ],
  projects: [
    {
      name: "Project Alpha",
      desc: "A full-stack web application with React and Node.js",
      link: "https://example.com/project-alpha",
      github: "https://github.com/username/project-alpha",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      name: "Project Beta",
      desc: "Mobile-first responsive website with modern UI/UX",
      link: "https://example.com/project-beta",
      github: "https://github.com/username/project-beta",
      tags: ["React", "CSS3", "Firebase"]
    }
  ]
};

// Mock GitHub Profile data
export const mockGithubProfile = {
  login: "dmackley",
  avatar_url: "https://via.placeholder.com/150",
  html_url: "https://github.com/username",
  name: "Derek Mackley",
  bio: "Full Stack Developer and Security Expert",
  location: "Chicago, IL",
  company: "Traction Tools"
};

// Mock Structured Data for Head component
export const mockStructuredData = {
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Derek Mackley",
    "jobTitle": "Full Stack Developer",
    "url": "https://example.com",
    "knowsAbout": ["JavaScript", "React", "Node.js"]
  },
  article: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Build a Portfolio",
    "author": {
      "@type": "Person",
      "name": "Derek Mackley"
    },
    "datePublished": "2025-03-04"
  },
  product: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Developer Portfolio",
    "operatingSystem": "Web Browser",
    "applicationCategory": "WebApplication"
  }
};

// Mock data for ThemeContext (if needed)
export const mockThemeData = {
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {}
};
