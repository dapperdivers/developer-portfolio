// Mock portfolio data for Storybook stories
export const mockGithubProfile = {
  name: 'Derek Mackley',
  login: 'dapperdivers',
  avatar_url: 'https://avatars.githubusercontent.com/u/15368703?v=4',
  bio: 'Full-stack developer passionate about creating innovative solutions',
  company: 'DapperDivers',
  location: 'United States',
  email: 'derek.mackley@hotmail.com',
  blog: 'https://derek-mackley.com',
  public_repos: 42,
  public_gists: 5,
  followers: 15,
  following: 20,
  created_at: '2015-10-01T00:00:00Z',
  updated_at: '2025-08-18T00:00:00Z',
  html_url: 'https://github.com/dapperdivers'
};

export const mockPortfolioData = {
  greetings: {
    name: 'Derek Mackley',
    title: "Hi all, I'm Derek",
    description: "A passionate Full Stack Software Developer 🚀 having an experience of building Web and Mobile applications with JavaScript / Reactjs / Nodejs / React Native and some other cool libraries and frameworks.",
    displayGreeting: true
  },
  socialLinks: {
    github: 'https://github.com/dapperdivers',
    linkedin: 'https://linkedin.com/in/derek-mackley',
    gmail: 'derek.mackley@hotmail.com',
    twitter: 'https://twitter.com/dapperdivers',
    facebook: 'https://facebook.com/dapperdivers',
    instagram: 'https://instagram.com/dapperdivers'
  },
  SkillBars: [
    {
      Stack: 'Frontend/Design',
      progressPercentage: '90'
    },
    {
      Stack: 'Backend',
      progressPercentage: '85'
    },
    {
      Stack: 'Programming',
      progressPercentage: '95'
    }
  ],
  projects: [
    {
      id: 1,
      name: 'Developer Portfolio',
      description: 'A clean, beautiful, responsive portfolio template for Software Developers!',
      url: 'https://github.com/dapperdivers/developer-portfolio',
      demo: 'https://derek-mackley.com',
      technologies: ['React', 'Node.js', 'Express', 'Vite']
    },
    {
      id: 2,
      name: 'Sample Project',
      description: 'Another example project for demonstration purposes.',
      url: 'https://github.com/dapperdivers/sample-project',
      demo: 'https://sample-demo.com',
      technologies: ['JavaScript', 'HTML', 'CSS']
    }
  ],
  feedbacks: [
    {
      name: 'John Doe',
      feedback: 'Derek is an excellent developer with great attention to detail.',
      role: 'Senior Developer',
      company: 'Tech Corp'
    },
    {
      name: 'Jane Smith',
      feedback: 'Professional, reliable, and delivers quality work on time.',
      role: 'Project Manager',
      company: 'Software Solutions Inc'
    }
  ],
  education: [
    {
      schoolName: 'University of Technology',
      subHeader: 'Bachelor of Science in Computer Science',
      duration: '2010 - 2014',
      desc: 'Graduated with honors. Focused on software engineering and web development.',
      grade: '3.8 GPA',
      descBullets: [
        'Relevant coursework: Data Structures, Algorithms, Web Development',
        'Dean\'s List for 6 semesters',
        'Senior project: Full-stack web application'
      ]
    }
  ],
  experience: [
    {
      role: 'Senior Full Stack Developer',
      company: 'DapperDivers',
      companylogo: '/images/logo-dapperdivers.png',
      date: '2020 – Present',
      desc: 'Leading development of web applications and mentoring junior developers.',
      descBullets: [
        'Architected and built scalable React applications',
        'Implemented CI/CD pipelines and DevOps practices',
        'Mentored team of 5 junior developers'
      ]
    }
  ]
};

export default mockPortfolioData;