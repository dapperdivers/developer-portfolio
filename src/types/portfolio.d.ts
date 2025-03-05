/**
 * Type definitions for portfolio data
 */

export interface Greeting {
  username: string;
  title: string;
  subtitle: string;
  resumeLink?: string;
}

export interface Skill {
  skillName: string;
  fontAwesomeClassname?: string;
  iconName?: string;
  category?: string;
}

export interface SkillsSection {
  title: string;
  subTitle: string;
  skills: string[];
  softwareSkills: Skill[];
}

export interface SkillBar {
  Stack: string;
  progressPercentage: string;
}

export interface Education {
  schoolName: string;
  subHeader: string;
  duration: string;
  desc: string;
  descBullets?: string[];
}

export interface Experience {
  role: string;
  company: string;
  companylogo: string;
  date: string;
  desc: string;
  descBullets?: string[];
}

export interface Project {
  name: string;
  desc: string;
  link?: string;
  github?: string;
  image: string;
  tags?: string[];
}

export interface Feedback {
  name: string;
  feedback: string;
  role?: string;
  company?: string;
  avatar?: string;
}

export interface SocialLink {
  url: string;
  name: string;
  icon: string;
}

export interface Contact {
  title: string;
  subtitle: string;
  email?: string;
  profileLink?: string;
}

export interface OpenSource {
  githubUserName: string;
}

export interface PortfolioData {
  greetings: Greeting;
  openSource: OpenSource;
  contact: Contact;
  socialLinks: SocialLink[];
  skillsSection: SkillsSection;
  skillBars: SkillBar[];
  educationInfo: Education[];
  experience: Experience[];
  projects: Project[];
  feedbacks: Feedback[];
}