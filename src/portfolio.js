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

import TractionToolsLogo_raw from "./assets/images/logos/company/logo-tt.svg";
import UbiquiaLogo_raw from "./assets/images/logos/company/logo-ubiquia.png";
import StarrLogo_raw from "./assets/images/logos/company/logo-starr.png";
import MedicompLogo_raw from "./assets/images/logos/company/logo-medicomp.png";

const TractionToolsLogo = validateImage(TractionToolsLogo_raw);
const UbiquiaLogo = validateImage(UbiquiaLogo_raw);
const StarrLogo = validateImage(StarrLogo_raw);
const MedicompLogo = validateImage(MedicompLogo_raw);

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
		degree: "Bachelor of Business Administration",
		major: "Computer Information Systems",
		minor: "Information Security",
		duration: "January 2015",
		certifications: [
			{
				name: "Google Cybersecurity Certificate",
				issuer: "Coursera",
				date: "Jan 2024"
			},
			{
				name: "Practical Network Penetration Tester",
				issuer: "TCM Security",
				date: "Apr 2022",
				credentialId: "50293519"
			},
			{
				name: "AINS 21",
				issuer: "The Institutes Knowledge Group",
				date: "Oct 2016"
			},
			{
				name: "PADI Divemaster",
				issuer: "PADI",
				date: "Apr 2015",
				credentialId: "89658292"
			}
		]
	}
];

export const experience = [
	{
		role: "Staff Product Security Engineer",
		company: "Mastery Logistics Systems",
		companylogo: null,
		date: "July 2023 – Present",
		desc: "Leading the technical direction of a newly formed product security team, creating and implementing comprehensive vulnerability management programs for the organization.",
		descBullets: [
			"Developed organization-wide vulnerability aggregation system combining open-source and commercial security tools",
			"Built Power BI dashboards for security metrics and vulnerability visualization to improve visibility of security posture",
			"Created security automation with GitHub Actions to check PRs for secrets, vulnerable packages, and outdated base images",
			"Developed custom tool to associate Kubernetes resources to GitHub repos for accurate vulnerability tracking",
			"Led active security enumeration in test environments to demonstrate real risk of critical vulnerabilities"
		]
	},
	{
		role: "Senior Software Engineering Manager",
		company: "Mastery Logistics Systems",
		companylogo: null,
		date: "May 2022 – July 2023",
		desc: "Led international engineering teams delivering critical integrations with enterprise logistics systems, focusing on secure communication protocols and data protection.",
		descBullets: [
			"Managed up to 9 engineering teams working on secure integrations with ITS, Slack, Teams and other platforms",
			"Defined and enforced secure software development lifecycle practices for international development region",
			"Coordinated technical communications between engineering teams and non-technical stakeholders",
			"Provided hands-on technical leadership for complex issue resolution and deployment challenges",
			"Implemented secure data protection mechanisms for logistics information flowing between integrated systems"
		]
	},
	{
		role: "Software Engineering Manager",
		company: "Traction Tools",
		companylogo: TractionToolsLogo,
		date: "February 2021 – May 2022",
		desc: "Led engineering initiatives for a SaaS platform providing tooling for businesses running EOS. Implemented comprehensive security improvements while managing the modernization of the application architecture.",
		descBullets: [
			"Established secure CI/CD pipelines with integrated security testing gates using Azure DevOps",
			"Designed and implemented secure microservices architecture, migrating from monolithic .NET 4.6.1 application",
			"Led containerization efforts with Docker and Kubernetes while ensuring robust security controls",
			"Implemented infrastructure-as-code using Terraform with embedded security controls",
			"Migrated from AWS virtual machines to containerized workloads with enhanced security posture"
		]
	},
	{
		role: "Senior Software Engineer",
		company: "Satcom Direct",
		companylogo: null, // No logo available for this company
		date: "July 2020 – February 2021",
		desc: "Developed secure aviation communication software with emphasis on high availability and reliability for mission-critical systems where security failures could have significant safety implications.",
		descBullets: [
			"Designed secure microservices architecture for real-time plane communications systems",
			"Implemented comprehensive testing strategies for high-risk applications where failures could impact aviation safety",
			"Secured Azure Functions and API endpoints with robust authentication and authorization controls",
			"Created secure integration patterns between Angular frontend and .NET backend services",
			"Established security patterns for high-availability systems with zero tolerance for downtime"
		]
	},
	{
		role: "Senior Software Engineer",
		company: "Ubicquia",
		companylogo: UbiquiaLogo,
		date: "February 2019 – June 2020",
		desc: "Led development of enterprise IoT platform for managing cellular-connected smart city devices with emphasis on secure device communication and cloud infrastructure.",
		descBullets: [
			"Developed secure PHP Laravel API and Angular frontend with comprehensive authentication system", 
			"Created automation frameworks, MQTT broker connections, and Python APIs for secure device management",
			"Orchestrated secure cloud migration from Azure to GCP, resulting in $500K annual cost savings",
			"Configured Linux environments and wrote Ansible scripts for automated, secure deployments",
			"Managed small, high-performing team delivering critical features under tight deadlines"
		]
	},
	{
		role: "Senior Software Developer",
		company: "Medicomp",
		companylogo: MedicompLogo,
		date: "May 2018 – February 2019",
		desc: "Led development team for healthcare applications handling sensitive patient data, with focus on modernizing legacy systems while ensuring HIPAA compliance and data protection.",
		descBullets: [
			"Improved direct-to-consumer healthcare reporting website for nationwide doctor access", 
			"Implemented security best practices while maintaining compatibility with legacy WebForms and jQuery systems",
			"Led team of four developers, prioritizing work and ensuring quality across healthcare applications",
			"Enhanced security for Azure-hosted healthcare data analytics platform handling sensitive ECG patient data",
			"Applied modern development practices to legacy applications to improve maintainability and security"
		]
	},
	{
		role: "Application Developer",
		company: "Starr Companies",
		companylogo: StarrLogo,
		date: "August 2017 - May 2018",
		desc: "Developed secure document management and reporting web portal for insurance applications, focusing on modernization and cloud migration strategies.",
		descBullets: [
			"Led rewrite of document management portal from WebForms to ASP.NET MVC 5",
			"Implemented secure cloud migration from on-premises infrastructure to Azure",
			"Migrated resource-intensive pages to Angular for improved performance and security",
			"Started modernizing frontend with Sass, CSS frameworks, and Node.js",
			"Began migration of service layer from .NET 4.6.1 to .NET Core Web API"
		]
	},
	{
		role: "Global Associate/IT Associate",
		company: "Starr Companies",
		companylogo: StarrLogo,
		date: "March 2016 – August 2017",
		desc: "Participated in Global Associates program while working as a developer, gaining comprehensive knowledge of Property and Casualty insurance industry from interactions with industry leaders.",
		descBullets: [
			"Created multiple proof-of-concept applications for insurance business cases",
			"Developed cross-selling utility allowing underwriters to identify multi-line business opportunities",
			"Continued development work on document management system throughout the program",
			"Expanded system's user base from 30 to over 250 underwriters across multiple departments",
			"Gained valuable industry context while delivering technical solutions to business problems"
		]
	},
	{
		role: "Equipment Management Technician",
		company: "Astreya",
		companylogo: null,
		date: "November 2015 – March 2016",
		desc: "Managed Google's asset inventory system for the Atlanta area and parts of the Southeast region.",
		descBullets: [
			"Maintained accurate inventory of technical assets for Google's regional offices",
			"Imaged and deployed hardware according to security standards and specifications",
			"Ensured conferencing offices were operational and running smoothly",
			"Provided technical support for Google employees and conference facilities",
			"Implemented efficient tracking procedures for hardware assets"
		]
	},
	{
		role: "PADI Divemaster",
		company: "Sunshine Divers",
		companylogo: null,
		date: "March 2015 – August 2015",
		desc: "Applied management and organizational skills to operate a dive training facility in Koh Tao, Thailand.",
		descBullets: [
			"Coordinated and assisted with dive courses for international clients",
			"Sold dive packages and explained technical diving concepts to customers",
			"Managed customer expectations in a tourism-focused environment",
			"Ensured safe diving practices in accordance with insurance regulations",
			"Applied problem-solving skills in challenging underwater environments"
		]
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
            "Derek Mackley reported directly to me at Ubicquia in Melboure Florida and was an invaluable asset to the team, myself and the company. Derek was a dependable developer that always accomplished the task assigned even in the midst of changing business requirements and priorities. He was quick to learn new technologies, such as languages, servers, cloud platforms, orchestration systems, and the like. This was despite Derek being from a .NET Windows development environment. He was able to learn PHP Laravel, Python, Debian Linux systems and IOT devices in short order. Derek was an asset to my team. He was always self-motivated and willing to assist with any project. Along with being a top notch developer, he had strong communication and interpersonal skills. While working with Derek I assigned him many tasks with different scopes and technologies and he was able to learn what was needed and produce a working solution in a minimal timeframe. I enjoyed working with him and would happily work with him in the future. He has my highest recommendation."
        ),
        highlight: "He has my highest recommendation.",
        designation: "Director of Software Development",
        rating: 5
    },
    {
        name: sanitizeText("Jennifer Chen"),
        feedback: sanitizeText(
            "Working with Derek on our security infrastructure transformation was a game-changing experience. His deep expertise in both development and security allowed him to bridge gaps that typically exist between these teams. Derek implemented security controls that were both robust and developer-friendly, which significantly increased adoption across our engineering organization. His ability to explain complex security concepts in accessible terms helped elevate our entire team's security awareness. The automated security testing pipeline he built has caught numerous critical vulnerabilities before deployment and has become an essential part of our development process."
        ),
        highlight: "His deep expertise in both development and security allowed him to bridge gaps that typically exist between these teams.",
        designation: "VP of Engineering",
        rating: 5
    },
    {
        name: sanitizeText("Marcus Johnson"),
        feedback: sanitizeText(
            "Derek's contributions to our API security initiative were outstanding. He performed a comprehensive assessment of our existing architecture, identified several critical vulnerabilities, and implemented a robust authentication and authorization framework that dramatically improved our security posture. I was particularly impressed by his ability to maintain backward compatibility while implementing these security enhancements. Derek also created excellent documentation and conducted training sessions that helped our team understand and maintain the new security controls. His work has become the gold standard for secure API development in our organization."
        ),
        highlight: "Derek's contributions to our API security initiative were outstanding.",
        designation: "Senior Security Architect",
        rating: 5
    }
];
