// emoji is not used but may be used in future features
// import emoji from "react-easy-emoji";

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
        "A passionate Full Stack Web Developer and Security Expert with extensive experience building secure web applications and APIs. Proficient in .NET / C# / Python / JavaScript / React / Node.js / Angular / Docker / Azure and implementing robust security measures across applications."
    ),
    resumeLink: validateUrl("https://www.derekmackley.com/resume/Derek_Mackley_Resume_2025.pdf"),
};

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
		"FULL STACK DEVELOPER THAT TINKERS WITH ANYTHING I CAN GET MY HANDS ON",
	skills: [
		"Develop extensible, scalable, and secure web-based applications with a strong focus on security best practices",
		"Implement robust security measures and conduct security audits to ensure application integrity",
		"Update and migrate legacy apps to modern frameworks using cutting-edge technology",
		"Learn and experiment with various technologies - from automation tools and security frameworks to hardware",
	],

	// Skills section displays icons from Iconify - https://iconify.design/
	// You can use any icon from Iconify by specifying the icon name
	// For example:
	// - Logos: 'logos:javascript' 
	// - Simple Icons: 'simple-icons:react'
	// - Material Design Icons: 'mdi:language-javascript'
	// - Font Awesome: 'fa6-brands:react'
	softwareSkills: [
		{
			skillName: "HTML5",
			iconName: "vscode-icons:file-type-html",
		},
		{
			skillName: "CSS3",
			iconName: "vscode-icons:file-type-css",
		},
		{
			skillName: "Sass",
			iconName: "vscode-icons:file-type-sass",
		},
		{
			skillName: "JavaScript",
			iconName: "logos:javascript",
		},
		{
			skillName: "TypeScript",
			iconName: "logos:typescript-icon",
		},
		{
			skillName: "React",
			iconName: "logos:react",
		},
		{
			skillName: "Node.js",
			iconName: "logos:nodejs-icon",
		},
		{
			skillName: "NPM",
			iconName: "logos:npm-icon",
		},
		{
			skillName: "MySQL",
			iconName: "logos:mysql",
		},
		{
			skillName: "AWS",
			iconName: "logos:aws",
		},
		{
			skillName: "Azure",
			iconName: "logos:microsoft-azure",
		},
		{
			skillName: "Google Cloud",
			iconName: "logos:google-cloud",
		},
		{
			skillName: "Python",
			iconName: "logos:python",
		},
		{
			skillName: "Git",
			iconName: "logos:git-icon",
		},
		{
			skillName: "Docker",
			iconName: "logos:docker-icon",
		},
	],
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
		desc: "Working as the Software Engineering Manager for a direct-to-consumer site that provides tooling for businesses running EOS. I lead the software, QA, and project management teams, overseeing sprint management, code reviews, tech stack, and the direction of the product from an engineering standpoint. Thus far I’ve instituted Azure Devops, automated deployments, unit testing, integration testing, selenium tests and a two-week sprint/release cadence to the organization. I’m currently leading the effort to modernize the tech stack, by methodically migrating the website from .NET 4.6.1 MVC Razor and AngularJS, to a microservices architecture with a react front end. This involves moving from AWS virtual machines to an ECS cluster, as well as migrating the current project to .NET Core while ensuring no downtime and adding new features. Basically, rebuilding the car piece by piece while in a drag race. "
	},
	{
		role: "Senior Software Engineer / Development Lead",
		company: "Ubicquia",
		companylogo: UbiquiaLogo,
		date: "May 2018 – June 2020",
		desc: "This role involved creating an enterprise solution to manage cellular connected units on light poles. While in this role, I wrote and managed a php Laravel API, with an Angular front end, as well as wrote automation frameworks, MQTT broker connections, python API’s, virtualized environments, and a whole host of supporting software. While in this role I learned to manage and configure Linux environments, and wrote ansible scripts to migrate and re-architect the business from Azure to the Google Cloud Platform. The last one saving the company 500K annually. This role involved a very small team with big tasks, and short deadlines. This taught me how to move quickly, focus on what is truly important, and to write extensible software with manageable tech debt.",
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
