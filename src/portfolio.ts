import type {
  Certification,
  Contact,
  Education,
  Experience,
  Feedback,
  Greeting,
  OpenSource,
  ProfileLinks,
  Project,
  SecurityDomain,
  SkillBar,
  SkillLevel,
  SkillsSection,
  SocialLinks,
} from '@/types/portfolio';

// Security domain constants for consistent categorization
const SECURITY_DOMAINS = {
  APP_SECURITY: "Application Security",
  CLOUD_SECURITY: "Cloud Security",
  NETWORK_SECURITY: "Network Security",
  IDENTITY: "Identity & Access Management",
  DEVSECOPS: "DevSecOps",
  COMPLIANCE: "Compliance & Governance",
  CRYPTO: "Cryptography & PKI",
  CONTAINER: "Container Security",
  AI_SECURITY: "AI & Agent Security",
  PLATFORM: "Platform Engineering"
} as const satisfies Record<string, SecurityDomain>;

// Security level constants (1-5 scale)
const SECURITY_LEVELS = {
  BASIC: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
  EXPERT: 4,
  MASTER: 5
} as const satisfies Record<string, SkillLevel>;

// URL validation helper
const validateImage = (imagePath: string): string => {
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

const validateUrl = (url: string): string => {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'https:' ? url : `https://${url.replace(/^https?:\/\//, '')}`;
    } catch {
        console.error(`Invalid URL: ${url}`);
        return '#';
    }
};

// Sanitize text content with recursive sanitization to prevent incomplete sanitization attacks
const sanitizeText = (text: string): string => {
    if (typeof text !== 'string') return '';

    // Create a safe version by using the browser's built-in HTML escaping
    const div = document.createElement('div');
    div.textContent = text;
    const safeText = div.innerHTML;

    // Alternative approach for server-side rendering where DOM might not be available
    const recursiveSanitize = (str: string): string => {
        const originalStr = str;
        // Replace HTML tags and potential HTML tag fragments recursively
        // First eliminate < followed by any character that might start a tag
        const sanitized = str.replace(/<[a-zA-Z!\/]/g, '')
                            // Then remove any remaining > characters that could be part of tags
                            .replace(/>/g, '');
        // If sanitization made changes, run again to catch nested tags
        return sanitized !== originalStr ? recursiveSanitize(sanitized) : sanitized.trim();
    };

    // Use DOM-based approach if available, otherwise use recursive regex
    return typeof document !== 'undefined' ? safeText.trim() : recursiveSanitize(text);
};

export const greetings: Greeting = {
    name: sanitizeText("Derek Mackley"),
    title: sanitizeText("Hi There, I'm Derek Mackley"),
    jobTitle: sanitizeText("Principal Security Engineer"),
    location: sanitizeText("Canton, GA"),
    // The contact card reuses the first sentence on its own, so keep it
    // self-contained and free of full stops (no ".NET" in sentence one).
    description: sanitizeText(
        "I'm a Principal Security Engineer who builds security programs the way I used to build software: automated, measurable and easy for developers to live with. I lead product security across a logistics software company and set the guardrails for how its engineers put AI agents to work. Before security I spent years shipping code and leading engineering teams, and at home I run a GitOps-managed Kubernetes cluster that is increasingly operated by agents of my own."
    ),
    resumeLink: validateUrl("https://www.derekmackley.com/resume/Cybersecurity_2025.pdf"),
    emailAddress: sanitizeText("contact@chelonianlabs.com"),
};

// New section for security facts for the profile card
export const securityFacts: string[] = [
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

export const openSource: OpenSource = {
    githubUserName: sanitizeText("DapperDivers"),
};

export const contact: Contact = {
    vcfLink: '/contact/Derek_Mackley.vcf',
};

export const socialLinks: SocialLinks = {
    github: validateUrl("https://github.com/DapperDivers"),
    linkedin: validateUrl("https://www.linkedin.com/in/dmackley/"),
};

// Everything the SocialLinks block shows, in the shape it takes as a prop
export const profileLinks: ProfileLinks = {
    ...socialLinks,
    contactCard: contact.vcfLink,
};

export const skillsSection: SkillsSection = {
	title: "What I do",
	subTitle:
		"PRINCIPAL SECURITY ENGINEER: PRODUCT SECURITY, PLATFORM ENGINEERING AND AI AGENTS",
	skills: [
		"Build and run product security programs: vulnerability management, AppSec and a secure SDLC",
		"Automate security into CI/CD so the secure path is also the easy path for developers",
		"Lead safe AI agent adoption: guardrails, scoped identity and controlled tool access",
		"Design and operate Kubernetes platforms with GitOps, policy as code and deep observability",
		"Translate risk for engineers and executives, drawing on years as a developer and engineering manager",
	],

	// Skills section displays icons from Iconify - https://iconify.design/
	// You can use any icon from Iconify by specifying the icon name
	softwareSkills: [
		// Application Security
		{
			skillName: "Vulnerability Management",
			iconName: "carbon:security",
			securityDomain: SECURITY_DOMAINS.APP_SECURITY,
			level: SECURITY_LEVELS.EXPERT,
			description: "Built a company-wide vulnerability management program from scratch: scanner aggregation, exploit-aware triage against known-exploited vulnerabilities, ownership mapping and risk reporting that leadership actually reads."
		},
		{
			skillName: "SAST, DAST & SCA",
			iconName: "tabler:bug",
			securityDomain: SECURITY_DOMAINS.APP_SECURITY,
			level: SECURITY_LEVELS.EXPERT,
			description: "Selected, rolled out and tuned static, dynamic and dependency scanning across an engineering organization, with tools including SonarQube, Trivy and Burp Suite, and made the results land with the team that owns the code."
		},
		{
			skillName: "Secure Code Review",
			iconName: "mdi:code-braces",
			securityDomain: SECURITY_DOMAINS.APP_SECURITY,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Years of writing production code before moving into security. I review for security in C#, Python and JavaScript, and I run secure coding tournaments and training for development teams."
		},
		{
			skillName: "Threat Modeling",
			iconName: "carbon:data-vis-4",
			securityDomain: SECURITY_DOMAINS.APP_SECURITY,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Architecture and design reviews for new systems and features, with threat models that turn into concrete engineering work rather than a document nobody opens again."
		},
		{
			skillName: "Penetration Testing",
			iconName: "mdi:security-network",
			securityDomain: SECURITY_DOMAINS.APP_SECURITY,
			level: SECURITY_LEVELS.INTERMEDIATE,
			description: "PNPT certified. I scope and manage external penetration tests, validate findings and demonstrate real exploitability in test environments so the critical issues get prioritized."
		},

		// AI & Agent Security
		{
			skillName: "AI Agent Guardrails",
			iconName: "mdi:robot-outline",
			securityDomain: SECURITY_DOMAINS.AI_SECURITY,
			level: SECURITY_LEVELS.EXPERT,
			description: "Lead AI security for an engineering organization: rolling out AI coding agents with guardrails enforced in the tooling itself, sandboxed execution and risk assessments for new AI use cases."
		},
		{
			skillName: "Agent Identity & Tool Access",
			iconName: "material-symbols:shield-lock-outline",
			securityDomain: SECURITY_DOMAINS.AI_SECURITY,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Designing how autonomous agents authenticate and what they can reach: scoped credentials, gateway patterns for Model Context Protocol tools and audit trails, instead of agents borrowing a human's access."
		},
		{
			skillName: "Agent Platforms",
			iconName: "carbon:machine-learning-model",
			securityDomain: SECURITY_DOMAINS.AI_SECURITY,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Build and operate agent platforms on Kubernetes: containerized harnesses, scheduled and event-driven agents, egress allowlists and local model serving alongside hosted models."
		},

		// DevSecOps
		{
			skillName: "CI/CD Security",
			iconName: "logos:github-actions",
			securityDomain: SECURITY_DOMAINS.DEVSECOPS,
			level: SECURITY_LEVELS.EXPERT,
			description: "Organization-wide security checks in GitHub Actions: secrets, vulnerable dependencies, container images and end-of-life base images checked on every pull request and release."
		},
		{
			skillName: "Container Security",
			iconName: "logos:docker-icon",
			securityDomain: SECURITY_DOMAINS.DEVSECOPS,
			level: SECURITY_LEVELS.EXPERT,
			description: "Image scanning in the pipeline and in the cluster, least-privilege runtime configuration, and tooling that traces a running workload back to the repository and team that owns it."
		},
		{
			skillName: "Security Automation",
			iconName: "carbon:script",
			securityDomain: SECURITY_DOMAINS.DEVSECOPS,
			level: SECURITY_LEVELS.EXPERT,
			description: "I write the tooling a security team needs instead of waiting for a vendor: multi-threaded Python CLIs, API integrations and reporting pipelines that replace manual triage."
		},

		// Platform Engineering
		{
			skillName: "Kubernetes",
			iconName: "logos:kubernetes",
			securityDomain: SECURITY_DOMAINS.PLATFORM,
			level: SECURITY_LEVELS.EXPERT,
			description: "Run a multi-node Talos Linux cluster end to end: Cilium networking, Gateway API, Rook-Ceph storage, admission policy with Kyverno, and upgrades automated through pull requests."
		},
		{
			skillName: "GitOps & IaC",
			iconName: "logos:flux",
			securityDomain: SECURITY_DOMAINS.PLATFORM,
			level: SECURITY_LEVELS.EXPERT,
			description: "Everything declared in Git and reconciled by Flux, with encrypted secrets, automated dependency updates and policy checks in CI. Earlier work includes Terraform and Ansible for cloud infrastructure."
		},
		{
			skillName: "Observability",
			iconName: "logos:prometheus",
			securityDomain: SECURITY_DOMAINS.PLATFORM,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Prometheus, Grafana and centralized logging, with alerting designed around what a human needs to act on. The same stack carries security scan results as metrics."
		},
		{
			skillName: "Cloud Security",
			iconName: "logos:microsoft-azure",
			securityDomain: SECURITY_DOMAINS.PLATFORM,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Securing workloads in Azure day to day, with earlier hands-on platform work in AWS and GCP, including a cloud migration that cut annual spend by $500K."
		},

		// Identity & Network
		{
			skillName: "SSO, OAuth 2.0 & OIDC",
			iconName: "carbon:two-factor-authentication",
			securityDomain: SECURITY_DOMAINS.IDENTITY,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Single sign-on in front of everything: OIDC and forward-auth integration, group-based access, and identity-backed access to the Kubernetes API itself."
		},
		{
			skillName: "Network Security",
			iconName: "mdi:lan",
			securityDomain: SECURITY_DOMAINS.NETWORK_SECURITY,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Segmented networks, firewall policy, Kubernetes network policies and intrusion detection, on an estate that runs from enterprise switches to the cluster's own networking layer."
		},
		{
			skillName: "TLS & PKI",
			iconName: "mdi:certificate",
			securityDomain: SECURITY_DOMAINS.NETWORK_SECURITY,
			level: SECURITY_LEVELS.ADVANCED,
			description: "Automated certificate issuance and rotation and TLS everywhere, with expiry monitored before it becomes an outage."
		},

		// Development Skills
		{
			skillName: "Python",
			iconName: "logos:python",
			description: "My main language today: security tooling, automation, APIs and data pipelines."
		},
		{
			skillName: "C# / .NET",
			iconName: "vscode-icons:file-type-csharp",
			description: "Years of production services and APIs on .NET Framework and .NET Core, including migrating a monolith to microservices."
		},
		{
			skillName: "JavaScript & React",
			iconName: "logos:javascript",
			description: "Front ends in React and Angular and services in Node.js. This site is React, with its components documented in Storybook."
		},
		{
			skillName: "Git & DevOps",
			iconName: "logos:git-icon",
			description: "Pull-request workflows, CI/CD pipelines and release automation as the default way of changing anything."
		},
	],

	// This structure allows for adding actual certifications in the future
	certifications: [] as Certification[],
};

export const SkillBars: SkillBar[] = [
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

export const educationInfo: Education[] = [
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

export const experience: Experience[] = [
	{
		role: "Principal Security Engineer",
		company: "Mastery Logistics Systems",
		companylogo: "https://ui-avatars.com/api/?name=MLS&background=3563E9&color=fff&bold=true",
		date: "November 2026 – Present",
		url: "https://www.masterylogistics.com",
		desc: "Own product security across the company and lead how its engineering organization adopts AI agents safely, with scope now extending into security operations and endpoint hardening.",
		descBullets: [
			"Lead AI security for engineering: rolled out AI coding agents with guardrails enforced in the tooling rather than in a policy document, and run risk assessments for new AI use cases",
			"Designed identity, access and tool-gateway patterns so autonomous agents get scoped, auditable access instead of borrowing a human's credentials",
			"Built a containerized agent harness to prove agentic workflows can run inside controlled, observable sandboxes",
			"Took on security operations and endpoint hardening for the company's Apple fleet alongside the product security program"
		]
	},
	{
		role: "Staff Product Security Engineer",
		company: "Mastery Logistics Systems",
		companylogo: "https://ui-avatars.com/api/?name=MLS&background=3563E9&color=fff&bold=true",
		date: "July 2023 – October 2026",
		url: "https://www.masterylogistics.com",
		desc: "Founding technical lead of a new product security team. Built the program from scratch: vulnerability management, pipeline security, testing and developer education.",
		descBullets: [
			"Built the vulnerability management lifecycle end to end: scanner aggregation, exploit-aware triage against known-exploited vulnerabilities, and Power BI risk reporting for leadership",
			"Shipped organization-wide checks in GitHub Actions that test every pull request and release for secrets, vulnerable packages, vulnerable images and end-of-life base images",
			"Wrote the team's multi-threaded Python CLI, which maps running Kubernetes workloads back to their GitHub repositories so findings reach the team that owns the code",
			"Deployed in-cluster image scanning with metrics and dashboards, and selected and rolled out dynamic application security testing",
			"Selected and managed penetration testing vendors, and demonstrated real exploitability of critical vulnerabilities in test environments to drive prioritization",
			"Trained junior security engineers and ran secure coding tournaments for development teams several times a year"
		]
	},
	{
		role: "Senior Software Engineering Manager",
		company: "Mastery Logistics Systems",
		companylogo: "https://ui-avatars.com/api/?name=MLS&background=3563E9&color=fff&bold=true",
		date: "May 2022 – July 2023",
		url: "https://www.masterylogistics.com",
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
		url: "https://www.tractiontools.com",
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
		companylogo: "https://ui-avatars.com/api/?name=SD&background=FF4D4D&color=fff&bold=true",
		date: "July 2020 – February 2021",
		url: "https://www.satcomdirect.com",
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
		url: "https://www.ubicquia.com",
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
		url: "https://www.medicomp.com",
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
		url: "https://www.starrcompanies.com",
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
		url: "https://www.starrcompanies.com",
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
		companylogo: "https://ui-avatars.com/api/?name=AST&background=A85C32&color=fff&bold=true",
		date: "November 2015 – March 2016",
		url: "https://www.astreya.com",
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
		companylogo: "https://ui-avatars.com/api/?name=SD&background=FFA500&color=fff&bold=true",
		date: "March 2015 – August 2015",
		url: "https://www.facebook.com/sunshinediverskhtao",
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

export const projects: Project[] = [
	{
		name: "Dapper Cluster: Kubernetes Homelab",
		desc: "Welcome, you're on it! This site is served from a multi-node Talos Linux cluster in my garage. Everything is declared in Git and reconciled by Flux, with Cilium networking, Rook-Ceph storage, single sign-on in front of every app, encrypted secrets and dependency updates that merge themselves once CI is green.",
		github: "https://github.com/DapperDivers/dapper-cluster",
		stack: ["Talos Linux", "Kubernetes", "Flux", "Cilium", "Rook-Ceph"]
	},
	{
		name: "Agents That Run the Cluster",
		desc: "The cluster is increasingly operated by AI agents: an overnight chain that triages alerts and opens its own fix pull requests, a morning briefing, and a reading pipeline that sorts and summarizes my feeds. Each agent runs sandboxed in Kubernetes with an explicit tool list and an egress allowlist, which makes it a working lab for the agent security problems I deal with professionally.",
		stack: ["Claude", "Model Context Protocol", "Local LLMs", "NATS"]
	},
	{
		name: "Security Lab",
		desc: "Policy as code at admission, a segmented network behind my own firewall with intrusion detection, and alerting designed to an industrial alarm-management standard so that a page always means something. It is where I test tools and ideas before recommending them at work.",
		stack: ["Kyverno", "OPNsense", "Suricata", "Prometheus", "Grafana"]
	},
	{
		name: "Home Automation",
		desc: "Home Assistant, Node-RED and a Zigbee mesh running on the cluster, with appliance state machines, camera-based detection and wall switches whose LED bars double as a notification system.",
		stack: ["Home Assistant", "Node-RED", "Zigbee2MQTT", "Frigate"]
	},
	{
		name: "3D Printing & RFID",
		desc: "I like turning digital ideas into physical objects and run a small fleet of customized printers. I'm also slowly removing keys from my life with RFID. Ask me about it!",
	},
	{
		name: "Scuba Diving",
		desc: "PADI Divemaster. I spent a season working at a dive school on Koh Tao, Thailand, and still get underwater whenever I can.",
	},
];

// Sanitize feedback data
export const feedbacks: Feedback[] = [
    {
        name: sanitizeText("Scott Latsa"),
        feedback: sanitizeText(
            "Derek Mackley reported directly to me at Ubicquia in Melboure Florida and was an invaluable asset to the team, myself and the company. Derek was a dependable developer that always accomplished the task assigned even in the midst of changing business requirements and priorities. He was quick to learn new technologies, such as languages, servers, cloud platforms, orchestration systems, and the like. This was despite Derek being from a .NET Windows development environment. He was able to learn PHP Laravel, Python, Debian Linux systems and IOT devices in short order. Derek was an asset to my team. He was always self-motivated and willing to assist with any project. Along with being a top notch developer, he had strong communication and interpersonal skills. While working with Derek I assigned him many tasks with different scopes and technologies and he was able to learn what was needed and produce a working solution in a minimal timeframe. I enjoyed working with him and would happily work with him in the future. He has my highest recommendation."
        ),
        highlight: "He has my highest recommendation.",
        designation: "Director of Software Development, Ubicquia",
        rating: 5
    }
];
