// emoji is not used but may be used in future features
// import emoji from "react-easy-emoji";

// Security domain constants for consistent categorization
const SECURITY_DOMAINS = {
  APP_SECURITY: "Application Security",
  CLOUD_SECURITY: "Cloud Security",
  NETWORK_SECURITY: "Network Security",
  IDENTITY: "Identity & Access Management",
  DEVSECOPS: "DevSecOps",
  COMPLIANCE: "Compliance & Governance",
  CRYPTO: "Cryptography & PKI",
  CONTAINER: "Container Security"
};

// Security level constants (1-5 scale)
const SECURITY_LEVELS = {
  BASIC: 1,
  INTERMEDIATE: 2, 
  ADVANCED: 3,
  EXPERT: 4,
  MASTER: 5
};

// URL validation helper
const validateImage = (imagePath) => {
    try {
        if (typeof imagePath === 'string' && imagePath.startsWith('data:image/')) {
            return imagePath;
        }
        return new URL(imagePath, import.meta.url).href;
    } catch {
        console.error(`Invalid image path: ${imagePath}`);
        return '';
    }
};

import TractionToolsLogo_raw from "@assets/images/logos/company/logo-tt.svg";
import UbiquiaLogo_raw from "@assets/images/logos/company/logo-ubiquia.png";
import StarrLogo_raw from "@assets/images/logos/company/logo-starr.png";

const TractionToolsLogo = validateImage(TractionToolsLogo_raw);
const UbiquiaLogo = validateImage(UbiquiaLogo_raw);
const StarrLogo = validateImage(StarrLogo_raw);

const validateUrl = (url) => {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'https:' ? url : `https://${url.replace(/^https?:\/\//, '')}`;
    } catch {
        console.error(`Invalid URL: ${url}`);
        return '#';
    }
};

// Sanitize text content
const sanitizeText = (text) => {
    if (typeof text !== 'string') return '';
    return text.replace(/<[^>]*>/g, '').trim();
};

export const greetings = {
    name: sanitizeText("Derek Mackley"),
    title: sanitizeText("Hi There, I'm Derek"),
    description: sanitizeText(
        "A Staff Product Security Engineer with a long web development career spanning many languages and frameworks. Specializing in securing applications throughout the development lifecycle. Extensive experience with .NET / C# / Python / JavaScript / React / Node.js / Angular / Docker / Azure while implementing robust security measures across applications."
    ),
    resumeLink: validateUrl("https://www.derekmackley.com/resume/Derek_Mackley_Resume_2025.pdf"),
};

// New section for security facts for the profile card
export const securityFacts = [
    "Did you know? The first computer bug was an actual moth caught in a relay in 1947.",
    "The average cost of a data breach in 2023 was $4.45 million.",
    "The most common password is still '123456'. Please don't use that!",
    "The term 'firewall' originated from construction, where it was a wall designed to prevent fire from spreading.",
    "The first ransomware attack occurred in 1989, distributed via floppy disks.",
    "Over 300,000 new malware samples are created every day.",
    "91% of cyberattacks begin with a spear phishing email.",
    "The global cybersecurity market is projected to reach $376 billion by 2029.",
    "The concept of 'Zero Trust' was created in 1994 by Stephen Paul Marsh.",
    "Two-factor authentication can prevent 99.9% of automated attacks."
];

export const openSource = {
    githubUserName: sanitizeText("DapperDivers"),
};

export const contact = {};

export const socialLinks = {
    github: validateUrl("https://github.com/DapperDivers"),
    linkedin: validateUrl("https://www.linkedin.com/in/dmackley/"),
};

export const skillsSection = {
	title: "What I do",
	subTitle:
		"STAFF PRODUCT SECURITY ENGINEER WITH EXTENSIVE DEVELOPMENT EXPERIENCE",
	skills: [
		"Lead application security initiatives and implement secure-by-design principles throughout the SDLC",
		"Conduct security architecture reviews, threat modeling, and vulnerability assessments",
		"Develop and maintain secure web applications across multiple languages and frameworks",
		"Implement robust security controls and automation to ensure product and infrastructure security",
		"Stay current with emerging security threats and mitigation techniques across the technology landscape",
	],

	// Skills section displays icons from Iconify - https://iconify.design/
	// You can use any icon from Iconify by specifying the icon name
	softwareSkills: [
		// Application Security Skills
		{
			skillName: "OWASP Top 10",
			iconName: "simple-icons:owasp",
			securityDomain: SECURITY_DOMAINS.APP_SECURITY,
			level: SECURITY_LEVELS.EXPERT,
			description: "Expert-level implementation of OWASP Top 10 security controls in application design and development. Regularly conduct code reviews and security assessments to ensure compliance with these critical security standards."
		},
		{
			skillName: "Secure Coding",
			iconName: "carbon:security",
			securityDomain: SECURITY_DOMAINS.APP_SECURITY,
			level: SECURITY_LEVELS.EXPERT,
			description: "Extensive expertise in secure coding practices across multiple languages and frameworks. Lead secure code reviews, develop security standards, and train development teams on defensive programming techniques."
		},
		{
			skillName: "Static & Dynamic Analysis",
			iconName: "tabler:bug",
			securityDomain: SECURITY_DOMAINS.APP_SECURITY,
			level: SECURITY_LEVELS.EXPERT,
			description: "Advanced experience with SAST, DAST, and IAST tools including Checkmarx, SonarQube, and Burp Suite. Implement and maintain automated security scanning across CI/CD pipelines."
		},
		{
			skillName: "Penetration Testing",
			iconName: "mdi:security-network",
			securityDomain: SECURITY_DOMAINS.APP_SECURITY,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Advanced application security testing experience, including developing custom exploits for business logic flaws and conducting thorough penetration tests on critical applications."
		},
		{
			skillName: "Threat Modeling",
			iconName: "carbon:data-vis-4",
			securityDomain: SECURITY_DOMAINS.APP_SECURITY,
			level: SECURITY_LEVELS.EXPERT,
			description: "Lead STRIDE and DREAD threat modeling sessions for complex applications and systems. Develop threat models that guide security architecture and implementation decisions."
		},
		
		// Cloud Security Skills
		{
			skillName: "AWS Security",
			iconName: "logos:aws",
			securityDomain: SECURITY_DOMAINS.CLOUD_SECURITY,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Deep expertise securing AWS environments including IAM, Security Groups, GuardDuty, CloudTrail, and implementing secure architecture patterns for multi-tier applications."
		},
		{
			skillName: "Azure Security",
			iconName: "logos:microsoft-azure",
			securityDomain: SECURITY_DOMAINS.CLOUD_SECURITY,
			level: SECURITY_LEVELS.EXPERT,
			description: "Lead implementation of Azure Security Center, Azure Sentinel, Key Vault, and secure networking configurations. Expert in securing Azure-hosted applications and infrastructure."
		},
		{
			skillName: "GCP Security",
			iconName: "logos:google-cloud",
			securityDomain: SECURITY_DOMAINS.CLOUD_SECURITY,
			level: SECURITY_LEVELS.INTERMEDIATE,
			description: "Implementation of GCP security controls including IAM, VPC Service Controls, Cloud Security Scanner, and Binary Authorization. Experience securing applications in GCP environments."
		},
		
		// DevSecOps Skills
		{
			skillName: "Docker Security",
			iconName: "logos:docker-icon",
			securityDomain: SECURITY_DOMAINS.DEVSECOPS,
			level: SECURITY_LEVELS.EXPERT,
			description: "Expert in container security, including implementing least privilege, image scanning, runtime protection, and secure orchestration. Develop and enforce security policies for containerized environments."
		},
		{
			skillName: "Kubernetes Security",
			iconName: "logos:kubernetes",
			securityDomain: SECURITY_DOMAINS.CONTAINER,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Advanced implementation of Kubernetes security patterns including network policies, RBAC, pod security policies, and secure deployment configurations. Experience with tools like Falco, Trivy, and OPA/Gatekeeper."
		},
		{
			skillName: "CI/CD Security",
			iconName: "cib:jenkins",
			securityDomain: SECURITY_DOMAINS.DEVSECOPS,
			level: SECURITY_LEVELS.EXPERT,
			description: "Design and implementation of secure CI/CD pipelines with integrated security testing, secret management, and policy enforcement. Experience with GitHub Actions, Jenkins, CircleCI, and Azure DevOps."
		},
		{
			skillName: "Infrastructure as Code",
			iconName: "logos:terraform-icon",
			securityDomain: SECURITY_DOMAINS.DEVSECOPS,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Writing secure Terraform, CloudFormation, and Ansible code with embedded security checks and compliance validation. Implement security guardrails for infrastructure automation."
		},
		
		// Identity & Access Management
		{
			skillName: "OAuth 2.0 / OIDC",
			iconName: "simple-icons:auth0",
			securityDomain: SECURITY_DOMAINS.IDENTITY,
			level: SECURITY_LEVELS.EXPERT,
			description: "Expert implementation of OAuth 2.0 and OpenID Connect protocols, including secure token handling, proper grant type selection, and secure identity provider integration."
		},
		{
			skillName: "Zero Trust",
			iconName: "material-symbols:shield-lock-outline",
			securityDomain: SECURITY_DOMAINS.IDENTITY,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Designing and implementing Zero Trust architectures with continuous verification, least privilege access, and micro-segmentation across applications and infrastructure."
		},
		{
			skillName: "SSO & MFA",
			iconName: "carbon:two-factor-authentication",
			securityDomain: SECURITY_DOMAINS.IDENTITY,
			level: SECURITY_LEVELS.EXPERT,
			description: "Design and implementation of enterprise single sign-on solutions with strong multi-factor authentication. Experience with SAML, FIDO2/WebAuthn, and passwordless authentication."
		},
		
		// Network Security
		{
			skillName: "Firewall Management",
			iconName: "tabler:firewall",
			securityDomain: SECURITY_DOMAINS.NETWORK_SECURITY,
			level: SECURITY_LEVELS.INTERMEDIATE,
			description: "Configuration and management of firewall rules, network segmentation, and traffic filtering. Experience with both traditional and next-generation firewalls."
		},
		{
			skillName: "TLS/SSL",
			iconName: "mdi:certificate",
			securityDomain: SECURITY_DOMAINS.NETWORK_SECURITY,
			level: SECURITY_LEVELS.EXPERT,
			description: "Expert implementation of TLS/SSL best practices, including proper cipher suite selection, certificate management, and secure protocol configuration. Experience with PKI and certificate authorities."
		},
		{
			skillName: "API Security",
			iconName: "carbon:api",
			securityDomain: SECURITY_DOMAINS.NETWORK_SECURITY,
			level: SECURITY_LEVELS.EXPERT,
			description: "Design and implementation of secure API gateways, authentication, authorization, rate limiting, and input validation. Experience with OWASP API Security Top 10."
		},
		
		// Development Skills
		{
			skillName: "HTML5",
			iconName: "vscode-icons:file-type-html",
			description: "Expert-level HTML5 development with focus on semantic markup, accessibility, and security best practices including XSS prevention and CSP implementation."
		},
		{
			skillName: "CSS3",
			iconName: "vscode-icons:file-type-css",
			description: "Advanced CSS3 development with experience in responsive design, CSS frameworks, preprocessors, and implementing UI component security patterns."
		},
		{
			skillName: "JavaScript",
			iconName: "logos:javascript",
			description: "Expert JavaScript development with deep understanding of secure coding patterns, frontend security controls, and modern frameworks including React, Angular, and Vue."
		},
		{
			skillName: "Python",
			iconName: "logos:python",
			description: "Advanced Python development for web applications, security tooling, and automation. Experience with Django, Flask, FastAPI, and implementing secure coding practices."
		},
		{
			skillName: "C#/.NET",
			iconName: "vscode-icons:file-type-csharp",
			description: "Extensive experience developing secure .NET applications, API services, and implementing security patterns for both .NET Framework and .NET Core."
		},
		{
			skillName: "Node.js",
			iconName: "logos:nodejs-icon",
			description: "Expert Node.js development with focus on secure architecture, dependency management, and implementing security controls for server-side JavaScript applications."
		},
		{
			skillName: "Git & DevOps",
			iconName: "logos:git-icon",
			description: "Advanced Git workflow management, CI/CD pipeline implementation, and securing development operations with policy as code and automated security controls."
		},
	],
	
	// This structure allows for adding actual certifications in the future
	certifications: [],
};

export const SkillBars = [
	{
		Stack: "Software Architecture", //Insert stack or technology you have experience in
		progressPercentage: "75",
	},
	{
		Stack: "API layer and below", //Insert relative proficiency in percentage
		progressPercentage: "90",
	},
	{
		Stack: "Frontend/Design",
		progressPercentage: "50",
	},
];

export const educationInfo = [
	{
		schoolName: "Georgia State University, J. Mack Robinson College of Business",
		subHeader: "Bachelor of Business Administration in Computer Information Systems",
		duration: "January 2015",
		desc: "Minor in Information Security",
	}
];

export const experience = [
	{
		role: "Software Engineering Manager",
		company: "Traction Tools",
		companylogo: TractionToolsLogo,
		date: "February 2021 – Present",
		desc: "Working as the Software Engineering Manager for a direct-to-consumer site that provides tooling for businesses running EOS. I lead the software, QA, and project management teams, overseeing sprint management, code reviews, tech stack, and the direction of the product from an engineering standpoint. Thus far I've instituted Azure Devops, automated deployments, unit testing, integration testing, selenium tests and a two-week sprint/release cadence to the organization. I'm currently leading the effort to modernize the tech stack, by methodically migrating the website from .NET 4.6.1 MVC Razor and AngularJS, to a microservices architecture with a react front end. This involves moving from AWS virtual machines to an ECS cluster, as well as migrating the current project to .NET Core while ensuring no downtime and adding new features. Basically, rebuilding the car piece by piece while in a drag race. "
	},
	{
		role: "Senior Software Engineer / Development Lead",
		company: "Ubicquia",
		companylogo: UbiquiaLogo,
		date: "May 2018 – June 2020",
		desc: "This role involved creating an enterprise solution to manage cellular connected units on light poles. While in this role, I wrote and managed a php Laravel API, with an Angular front end, as well as wrote automation frameworks, MQTT broker connections, python API's, virtualized environments, and a whole host of supporting software. While in this role I learned to manage and configure Linux environments, and wrote ansible scripts to migrate and re-architect the business from Azure to the Google Cloud Platform. The last one saving the company 500K annually. This role involved a very small team with big tasks, and short deadlines. This taught me how to move quickly, focus on what is truly important, and to write extensible software with manageable tech debt.",
	},
	{
		role: "Software Engineer",
		company: "Starr Companies",
		companylogo: StarrLogo,
		date: "March 2016 – May 2018",
		desc: "Worked on a Document Management/ Reporting web portal. Myself and one other developer rewrote the site in MVC 5 from webforms, moved from an on-prem virtual machine to an azure web service, moved our most resource intensive page to Angular JS, and at the time I left were in the process of updating the front-end to use modern technologies, like Sass, CSS frameworks, NodeJS, etc. In addition, began moving the service layer from .NET4.6.1 to a .NET Core Web API",
	}

];

export const projects = [
	{
		name: "Homelab & Security Testing Environment",
		desc: "Welcome - you're on it! This site is hosted from my home lab. I believe that to excel in this field, you need passion and hands-on experience. My lab serves as both a hosting environment and a security testing playground, featuring multiple servers with around 240TB of storage."
	},
	{
		name: "Tinkering with RFID",
		desc: "I started playing with rfid tags a few years ago, and am in the process of \"removing keys\" from my life.  Ask me about it!"
	},
	{
		name: "3D Printing",
		desc: "I love turning digital ideas into physical objects! Currently operating 4 printers and finding great joy in customizing them for optimal performance.",
	},
	{
		name: "Home Automation & Security",
		desc: "Running a comprehensive Home Assistant setup integrated with various systems including 3D printing, brewing, environmental controls, and security monitoring. Everything is configured with security best practices in mind.",
	},
	{
		name: "Scuba Diving",
		desc: "Passionate scuba diver exploring the underwater world. This hobby combines my love for technology with adventure, often incorporating underwater photography and diving computers.",
	},
];

// Sanitize feedback data
export const feedbacks = [
    {
        name: sanitizeText("Scott Latsa"),
        feedback: sanitizeText(
            "Derek Mackley reported directly to me at Ubicquia in Melboure Florida and was an invaluable asset to the team, myself and the company. '\r\n' Derek was a dependable developer that always accomplished the task assigned even in the midst of changing business requirements and priorities.  He was quick to learn new technologies, such as languages, servers, cloud platforms, orchestration systems, and the like. This was despite Derek being from a .NET Windows development environment. He was able to learn PHP Laravel, Python, Debian Linux systems and IOT devices in short order. Derek  was an asset to my team. He was always self-motivated and willing to assist with any project. Along with being a top notch developer, he had strong communication and interpersonal skills. While working with Derek I assigned him many tasks with different scopes and technologies and he was able to learn what was needed and produce a working solution in a minimal timeframe.  I enjoyed working with him and would happily work with him in the future. He has my highest recommendation."
        ),
    }
];
