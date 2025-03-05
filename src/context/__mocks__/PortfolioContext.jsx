import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

// Create a mock context with sample data
const PortfolioContext = createContext(null);

// Sample data for tests
const mockPortfolioData = {
  greetings: {
    name: "Derek Mackley",
    title: "Full Stack Developer",
    description: "Passionate full stack developer with experience in building high-performance web applications.",
    resumeLink: "https://example.com/resume"
  },
  openSource: {
    githubUserName: "derekmackley",
    showGithubProfile: true
  },
  contact: {
    email: "test@example.com"
  },
  socialLinks: {
    github: "https://github.com/derekmackley",
    linkedin: "https://www.linkedin.com/in/derekmackley",
    twitter: "https://twitter.com/derekmackley"
  },
  skillsSection: {
    title: "Skills",
    subTitle: "Professional capabilities and technologies",
    display: true,
    softwareSkills: [
      {
        skillName: "React",
        iconName: "logos:react",
        category: "frontend"
      },
      {
        skillName: "Node.js",
        iconName: "logos:nodejs",
        category: "backend"
      },
      {
        skillName: "CSS",
        fontAwesomeClassname: "fab fa-css3",
        category: "frontend"
      }
    ],
    skills: ["Skill 1", "Skill 2"],
  },
  skillBars: [
    { Stack: "Frontend", progressPercentage: 90 },
    { Stack: "Backend", progressPercentage: 70 }
  ],
  educationSection: {
    title: "Education",
    subtitle: "Academic background",
    display: true
  },
  experienceSection: {
    title: "Work Experience",
    subtitle: "Professional journey",
    display: true,
    viewType: "timeline",
    experiences: [
      {
        role: "Software Engineer",
        company: "Test Company 1",
        companylogo: "/test-logo1.png",
        date: "2022 - Present",
        desc: "Leading development efforts",
        descBullets: ["Led team of 5", "Deployed to production"]
      },
      {
        role: "Developer",
        company: "Test Company 2",
        companylogo: "/test-logo2.png",
        date: "2020 - 2022",
        desc: "Contributed to key projects",
        descBullets: ["Built frontend", "Improved performance"]
      }
    ]
  },
  projectsSection: {
    title: "My Projects",
    subtitle: "Things I've built",
    display: true,
    showTopProjectsOnly: false,
    projects: [
      {
        name: "Project 1",
        desc: "A cool project",
        image: "/project1.jpg",
        github: "https://github.com/user/project1",
        link: "https://project1.com",
        stack: ["React", "Node.js"]
      },
      {
        name: "Project 2",
        desc: "Another project",
        image: "/project2.jpg",
        github: "https://github.com/user/project2",
        stack: ["Vue", "Express"]
      }
    ]
  },
  feedbackSection: {
    title: "Testimonials",
    subtitle: "What others say about me",
    display: true
  },
  settings: {
    isBlog: false,
    colors: {
      primary: "#3563E9",
      secondary: "#5E72E4"
    },
    theme: "light",
    loadingDelay: 0
  }
};

// Provider component for tests
export const PortfolioProvider = ({ children }) => {
  return (
    <PortfolioContext.Provider value={mockPortfolioData}>
      {children}
    </PortfolioContext.Provider>
  );
};

PortfolioProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook to use the context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === null) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export default {
  PortfolioContext,
  PortfolioProvider,
  usePortfolio
};