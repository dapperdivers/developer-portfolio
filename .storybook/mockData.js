/**
 * Mock data for Storybook to simulate the portfolio context
 * Matches the exact structure expected by PortfolioContext.jsx
 */

import React from 'react';

export const mockPortfolioData = {
  greetings: {
    name: "John Doe",
    title: "I'm a Full Stack Developer",
    description: "A passionate Full Stack Software Developer with experience building Web and Mobile applications with JavaScript / React / Node and some cool libraries and frameworks.",
    resumeLink: "#"
  },
  openSource: {
    githubUserName: "johndoe"
  },
  contact: {},
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com"
  },
  skillsSection: {
    title: "What I do",
    subTitle: "CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK",
    skills: [
      "Develop highly interactive Front end / User Interfaces for your web and mobile applications",
      "Progressive Web Applications (PWA) in normal and SPA Stacks",
      "Integration of third party services such as Firebase/ AWS / Digital Ocean"
    ],
    softwareSkills: [
      {
        skillName: "HTML-5",
        iconName: "vscode-icons:file-type-html"
      },
      {
        skillName: "CSS3",
        iconName: "vscode-icons:file-type-css"
      },
      {
        skillName: "JavaScript",
        iconName: "logos:javascript"
      },
      {
        skillName: "ReactJS",
        iconName: "logos:react"
      },
      {
        skillName: "NodeJS",
        iconName: "logos:nodejs-icon"
      }
    ]
  },
  skillBars: [
    {
      Stack: "Frontend/Design",
      progressPercentage: "70"
    },
    {
      Stack: "Backend",
      progressPercentage: "90"
    },
    {
      Stack: "Programming",
      progressPercentage: "85"
    }
  ],
  educationInfo: [
    {
      schoolName: "Harvard University",
      subHeader: "Bachelor of Science in Computer Science",
      duration: "September 2017 - April 2021",
      desc: "Ranked top 10% in the program."
    },
    {
      schoolName: "Stanford University",
      subHeader: "Bachelor of Science in Computer Science",
      duration: "September 2013 - April 2017",
      desc: "Ranked top 10% in the program."
    }
  ],
  experience: [
    {
      role: "Frontend Developer",
      company: "Google",
      companylogo: "/logo-google.svg",
      date: "June 2020 – Present",
      desc: "Developer portal for Google Maps API"
    },
    {
      role: "Full Stack Developer",
      company: "Microsoft",
      companylogo: "/logo-microsoft.svg",
      date: "May 2018 – May 2020",
      desc: "Built robust authentication systems for Azure"
    }
  ],
  projects: [
    {
      name: "Developer Portfolio",
      desc: "Software Developer Portfolio built with React.js and Tailwind CSS"
    },
    {
      name: "Chat Application",
      desc: "Real-time chat application built with React.js and Socket.io"
    }
  ],
  feedbacks: [
    {
      name: "Jane Smith",
      feedback:
        "John is an excellent developer who completes tasks ahead of schedule. His attention to detail is impressive, and he communicates well with the team."
    },
    {
      name: "Michael Johnson",
      feedback:
        "Working with John has been a fantastic experience. He's proactive, creative, and delivers high-quality code consistently."
    }
  ]
};

// Mock context provider decorator
export const MockPortfolioDecorator = (StoryFn) => {
  // Return the component with mocked context
  return (
    <div>
      <StoryFn />
    </div>
  );
};