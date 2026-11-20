/**
 * Type definitions for portfolio data (src/portfolio.ts)
 */

/** Hero / profile copy. */
export interface Greeting {
  name: string;
  title: string;
  /** Bio paragraph; the contact card reuses its first sentence. */
  description: string;
  jobTitle?: string;
  location?: string;
  resumeLink?: string;
  emailAddress?: string;
}

/** Category a security skill is grouped under. */
export type SecurityDomain =
  | 'Application Security'
  | 'Cloud Security'
  | 'Network Security'
  | 'Identity & Access Management'
  | 'DevSecOps'
  | 'Compliance & Governance'
  | 'Cryptography & PKI'
  | 'Container Security'
  | 'AI & Agent Security'
  | 'Platform Engineering';

/** Skill level on the 1 (basic) to 5 (master) scale. */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  skillName: string;
  /** Iconify icon name, e.g. "logos:python". */
  iconName?: string;
  /** Legacy Font Awesome class; the site data uses iconName. */
  fontAwesomeClassname?: string;
  /** Free-form category used by the useSkills filter; not set in the site data. */
  category?: string;
  /** Absent on plain development skills. */
  securityDomain?: SecurityDomain;
  /** Absent on plain development skills. */
  level?: SkillLevel;
  description?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface SkillsSection {
  title: string;
  subTitle: string;
  /** "What I do" bullet lines. */
  skills: string[];
  softwareSkills: Skill[];
  /** Currently empty in the site data. */
  certifications: Certification[];
  /** Set to false to hide the section; not set in the site data. */
  display?: boolean;
}

export interface SkillBar {
  Stack: string;
  /** Percentage as a numeric string, e.g. "75". */
  progressPercentage: string;
}

export interface Education {
  schoolName: string;
  degree: string;
  major?: string;
  minor?: string;
  duration: string;
  certifications?: Certification[];
}

export interface Experience {
  role: string;
  company: string;
  /** Image URL (bundled asset or remote avatar). */
  companylogo: string;
  date: string;
  /** Company website. */
  url?: string;
  desc: string;
  descBullets?: string[];
}

export interface Project {
  name: string;
  desc: string;
  github?: string;
  /** Technology names shown as badges. */
  stack?: string[];
  /** Live demo URL; not set in the site data. */
  link?: string;
  /** Not set in the site data. */
  image?: string;
  /** Parseable date, read by the useProjects 'recent' sort; not set in the site data. */
  date?: string;
}

export interface Feedback {
  name: string;
  feedback: string;
  /** Pull quote taken from the feedback text. */
  highlight?: string;
  /** Job title and company of the author. */
  designation?: string;
  /** 1 to 5. */
  rating?: number;
  /** Not set in the site data. */
  avatar?: string;
}

/** A single link entry; not produced by src/portfolio.ts (see SocialLinks). */
export interface SocialLink {
  url: string;
  name: string;
  icon: string;
}

/** Profile URLs keyed by network. */
export interface SocialLinks {
  github: string;
  linkedin: string;
}

/** What the SocialLinks block takes as a prop. */
export interface ProfileLinks extends SocialLinks {
  /** Path to the downloadable vCard. */
  contactCard: string;
}

export interface Contact {
  /** Path to the downloadable vCard. */
  vcfLink: string;
}

export interface OpenSource {
  githubUserName: string;
}

/** Value held by PortfolioContext. Note `skillBars` here vs the `SkillBars` export. */
export interface PortfolioData {
  greetings: Greeting;
  openSource: OpenSource;
  contact: Contact;
  socialLinks: SocialLinks;
  skillsSection: SkillsSection;
  skillBars: SkillBar[];
  educationInfo: Education[];
  experience: Experience[];
  projects: Project[];
  feedbacks: Feedback[];
}
