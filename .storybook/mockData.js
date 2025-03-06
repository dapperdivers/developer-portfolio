/**
 * Mock data for Storybook to simulate the portfolio context
 */

export const mockPortfolioData = {
  greetings: {
    name: "John Doe",
    title: "I'm a Full Stack Developer",
    description: "A passionate Full Stack Software Developer with experience building Web and Mobile applications with JavaScript / React / Node and some cool libraries and frameworks.",
    resumeLink: "#"
  },
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com"
  },
  skillsSection: {
    title: "What I do",
    subTitle: "CRAZY FULL STACK DEVELOPER WHO WANTS TO EXPLORE EVERY TECH STACK",
    skills: [
      "⚡ Develop highly interactive Front end / User Interfaces for your web and mobile applications",
      "⚡ Progressive Web Applications (PWA) in normal and SPA Stacks",
      "⚡ Integration of third party services such as Firebase/ AWS / Digital Ocean"
    ],
    softwareSkills: [
      {
        skillName: "HTML-5",
        iconName: "html5"
      },
      {
        skillName: "CSS3",
        iconName: "css3"
      },
      {
        skillName: "JavaScript",
        iconName: "javascript"
      },
      {
        skillName: "ReactJS",
        iconName: "react"
      },
      {
        skillName: "NodeJS",
        iconName: "nodejs"
      }
    ]
  },
  education: {
    title: "Education",
    schools: [
      {
        schoolName: "Harvard University",
        logo: "https://example.com/harvard.png",
        subHeader: "Bachelor of Science in Computer Science",
        duration: "September 2017 - April 2021",
        desc: "Ranked top 10% in the program.",
        descBullets: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        ]
      },
      {
        schoolName: "Stanford University",
        logo: "https://example.com/stanford.png",
        subHeader: "Bachelor of Science in Computer Science",
        duration: "September 2013 - April 2017",
        desc: "Ranked top 10% in the program.",
        descBullets: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        ]
      }
    ]
  },
  experience: [
    {
      role: "Frontend Developer",
      company: "Google",
      companylogo: "/logo-google.svg",
      date: "June 2020 – Present",
      desc: "Developer portal for Google Maps API",
      descBullets: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      ]
    },
    {
      role: "Full Stack Developer",
      company: "Microsoft",
      companylogo: "/logo-microsoft.svg",
      date: "May 2018 – May 2020",
      desc: "Built robust authentication systems for Azure",
      descBullets: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      ]
    }
  ],
  projects: [
    {
      name: "Developer Portfolio",
      desc: "Software Developer Portfolio built with React.js and Tailwind CSS",
      github: "https://github.com",
      link: "https://example.com",
      image: "https://example.com/portfolio.jpg",
      stack: ["React", "JavaScript", "CSS", "Tailwind"]
    },
    {
      name: "Chat Application",
      desc: "Real-time chat application built with React.js and Socket.io",
      github: "https://github.com",
      link: "https://example.com",
      image: "https://example.com/chat.jpg",
      stack: ["React", "JavaScript", "Socket.io", "CSS"]
    }
  ],
  feedbacks: [
    {
      name: "Jane Smith",
      feedback:
        "John is an excellent developer who completes tasks ahead of schedule. His attention to detail is impressive, and he communicates well with the team.",
      designation: "Project Manager",
      rating: 5
    },
    {
      name: "Michael Johnson",
      feedback:
        "Working with John has been a fantastic experience. He's proactive, creative, and delivers high-quality code consistently.",
      designation: "Senior Developer",
      rating: 4
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