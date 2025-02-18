import emoji from "react-easy-emoji";

import TractionToolsLogo from "./assets/img/icons/common/tt.svg";
import UbiquiaLogo from "./assets/img/icons/common/ubiquia.png";
import StarrLogo from "./assets/img/icons/common/Starr_Companies_Logo.png";

// URL validation helper
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
        "A passionate Full Stack Web Developer with experience building Web applications and APIs using .Net / C# / Python / JavaScript / Reactjs / Nodejs / Angular / Docker / Azure /and tons of other awesome porjects and repositories"
    ),
    resumeLink: validateUrl("https://www.derekmackley.com/resume/Mackley_Resume_2024.pdf"),
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
		emoji(
			"⚡ Develop extensable, scaleable, and secure web based applications"
		),
		emoji(
			"⚡ Update and Migrate legacy apps to new frameworks using cutting edge technology"
		),
		emoji(
			"⚡ Learn and play with any technology I can; from automation tools and frameworks to hardware."
		),
	],

	softwareSkills: [
		{
			skillName: "html-5",
			fontAwesomeClassname: "vscode-icons:file-type-html",
		},
		{
			skillName: "css3",
			fontAwesomeClassname: "vscode-icons:file-type-css",
		},
		{
			skillName: "sass",
			fontAwesomeClassname: "logos:sass",
		},
		{
			skillName: "JavaScript",
			fontAwesomeClassname: "logos:javascript",
		},
		{
			skillName: "TypeScript",
			fontAwesomeClassname: "logos:typescript-icon",
		},
		{
			skillName: "reactjs",
			fontAwesomeClassname: "vscode-icons:file-type-reactjs",
		},
		{
			skillName: "nodejs",
			fontAwesomeClassname: "logos:nodejs-icon",
		},
		{
			skillName: "npm",
			fontAwesomeClassname: "vscode-icons:file-type-npm",
		},
		{
			skillName: "sql-database",
			fontAwesomeClassname: "vscode-icons:file-type-sql",
		},
		{
			skillName: "aws",
			fontAwesomeClassname: "logos:aws",
		},
		{
			skillName: "azure",
			fontAwesomeClassname: "logos:azure",
		},
		{
			skillName: "gpc",
			fontAwesomeClassname: "logos:google",
		},
		{
			skillName: "python",
			fontAwesomeClassname: "logos:python",
		},
		{
			skillName: "git",
			fontAwesomeClassname: "logos:git-icon",
		},
		{
			skillName: "docker",
			fontAwesomeClassname: "logos:docker-icon",
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
		desc: "Worked on a Document Management/ Reporting web portal. Myself and one other developer rewrote the site in MVC 5 from webforms, moved from an on-prem virtual machine to an azure web service, moved our most resource intensive page to Angular JS, and at the time I left were in the process of updating the front-end to use modern technologies, like Saas, Twitter Bootstrap, NodeJS, etc. In addition, began moving the service layer from .NET4.6.1 to a .NET Core Web API",
	}

];

export const projects = [
	{
		name: "Homelab",
		desc: "Welcome you're on it, this site is hosted at home! I beleive that in order to be good at this job you have to love it, and you have to play with new stuff.  My homelab consists of more servers than I know what to do with with around 240TB of storage."
	},
	{
		name: "Tinkering with RFID",
		desc: "I started playing with rfid tags a few years ago, and am in the process of \"removing keys\" from my life.  Ask me about it!"
	},
	{
		name: "3D Printing",
		desc: "I love taking a idea on a computer and making a physical object! I currently have 4 printers and find alot of joy customizing them.",
	},
	{
		name: "Automation",
		desc: "I've got homeAssistant wired up in the house with alexa enabled. Most of my hobbyies are wired in (3D printing, brewing, surf data, light, ect.)",
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

// Validate all image imports
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

// Update image imports with validation
TractionToolsLogo = validateImage(TractionToolsLogo);
UbiquiaLogo = validateImage(UbiquiaLogo);
StarrLogo = validateImage(StarrLogo);
