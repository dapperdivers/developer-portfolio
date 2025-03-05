/**
 * Setup file for Jest tests
 * This file runs before each test file
 */

// Mock portfolio.js completely to avoid the import.meta issue
jest.mock('../src/portfolio', () => {
  return {
    greetings: {
      name: "John Doe",
      title: "Hi, I'm John Doe",
      description: "A passionate Full Stack Web Developer with experience in JavaScript, React.js, Node.js, and MongoDB.",
      resumeLink: "https://cv.example.com"
    },
    openSource: {
      githubUserName: "johndoe"
    },
    contact: {
      title: "Contact Me",
      subtitle: "Discuss a project or just want to say hi?",
      email: "contact@johndoe.com"
    },
    socialLinks: {
      github: "https://github.com/johndoe",
      linkedin: "https://www.linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe"
    },
    skillsSection: {
      title: "Skills",
      subTitle: "CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK",
      skills: [
        "Develop highly interactive Front end / User Interfaces for your web applications",
        "Progressive Web Applications (PWA) in normal and SPA Stacks",
        "Integration of third party services such as Firebase/ AWS / Digital Ocean"
      ],
      softwareSkills: [
        {
          skillName: "html-5",
          fontAwesomeClassname: "fab fa-html5",
          iconName: "html-5"
        },
        {
          skillName: "css3",
          fontAwesomeClassname: "fab fa-css3-alt",
          iconName: "css3"
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "fab fa-js",
          iconName: "javascript"
        },
        {
          skillName: "reactjs",
          fontAwesomeClassname: "fab fa-react",
          iconName: "react"
        },
        {
          skillName: "nodejs",
          fontAwesomeClassname: "fab fa-node",
          iconName: "nodejs"
        }
      ]
    },
    getImagePath: (path) => `/mock-assets/${path}`,
    SkillBars: [
      {
        Stack: "Frontend/Design", 
        progressPercentage: "90"
      },
      {
        Stack: "Backend",
        progressPercentage: "70"
      },
      {
        Stack: "Programming",
        progressPercentage: "60"
      }
    ],
    educationInfo: [
      {
        schoolName: "Example University",
        subHeader: "Bachelor of Science in Computer Science",
        duration: "September 2016 - April 2020",
        desc: "Graduated with honors.",
        descBullets: [
          "Specialized in web technologies and artificial intelligence",
          "Active member of coding club"
        ]
      }
    ],
    experience: [
      {
        role: "Software Engineer",
        company: "Example Corp",
        companylogo: "/example-logo.png",
        date: "June 2020 – Present",
        desc: "Building amazing software products",
        descBullets: [
          "Led a team of developers",
          "Reduced loading time by 40%"
        ]
      },
      {
        role: "Junior Developer",
        company: "Sample Inc",
        companylogo: "/sample-logo.png",
        date: "Jan 2019 – May 2020",
        desc: "Focused on front-end development",
        descBullets: [
          "Developed reusable components",
          "Implemented state management"
        ]
      }
    ],
    projects: [
      {
        name: "Example Project",
        desc: "A showcase project demonstrating my skills",
        github: "https://github.com/johndoe/example-project",
        link: "https://example-project.com",
        isTopProject: true,
        tags: ["web", "frontend"]
      }
    ],
    feedbacks: [
      {
        name: "Jane Smith",
        feedback: "Working with John was a pleasure. Very professional and skilled developer."
      }
    ]
  };
});