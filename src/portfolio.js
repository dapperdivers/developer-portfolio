import emoji from "react-easy-emoji";

import TractionToolsLogo from "./assets/img/icons/common/tt.svg";
import UbiquiaLogo from "./assets/img/icons/common/ubiquia.png";
import StarrLogo from "./assets/img/icons/common/Starr_Companies_Logo.png";

export const greetings = {
	name: "Derek Mackley",
	title: "Hi There, I'm Derek",
	description:
		"A passionate Full Stack Web Developer with experience of building Web applications and APIs with .Net / C# / Python / JavaScript / Reactjs / Nodejs / Angular / Flask / and tons of other cool libraries and frameworks.",
	resumeLink: "https://cv.dummY_URl",
};

export const openSource = {
	githubUserName: "DapperDivers",
};

export const contact = {};

export const socialLinks = {
	github: "https://github.com/DapperDivers",
	linkedin: "https://www.linkedin.com/in/dmackley/",
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
			skillName: "flutter",
			fontAwesomeClassname: "logos:flutter",
		},
		{
			skillName: "swift",
			fontAwesomeClassname: "vscode-icons:file-type-swift",
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
			skillName: "mongoDB",
			fontAwesomeClassname: "vscode-icons:file-type-mongo",
		},
		{
			skillName: "aws",
			fontAwesomeClassname: "logos:aws",
		},
		{
			skillName: "firebase",
			fontAwesomeClassname: "logos:firebase",
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
		role: "Senior Software Engineer",
		company: "Traction Tools",
		companylogo: TractionToolsLogo,
		date: "February 2021 – Present",
		desc: "Working as the lead Engineer for a direct-to-consumer site that provides tooling for businesses running EOS. I lead a team of 4 other engineers, doing all code reviews, sprint management, and overseeing the direction of the product from the engineering standpoint. In my first few months I was able to institute Azure Devops, automated deployments, and sprints to the organization. I’m currently working to modernize the tech stack, by methodically migrating the website from .NET Razor and AngualarJS, to a microservices architecture with a react front end.",
	},
	{
		role: "Senior Software Engineer",
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
];

export const feedbacks = [
	{
		name: "Scott Latsa",
		feedback:
		"Derek Mackley reported directly to me at Ubicquia in Melboure Florida and was an invaluable asset to the team, myself and the company.  Derek was a dependable developer that always accomplished the task assigned even in the midst of changing business requirements and priorities.  He was quick to learn new technologies, such as languages, servers, cloud platforms, orchestration systems, and the like. This was despite Derek being from a .NET Windows development environment. He was able to learn PHP Laravel, Python, Debian Linux systems and IOT devices in short order. \n Derek  was an asset to my team. He was always self-motivated and willing to assist with any project. Along with being a top notch developer, he had strong communication and interpersonal skills. While working with Derek I assigned him many tasks with different scopes and technologies and he was able to learn what was needed and produce a working solution in a minimal timeframe.  I enjoyed working with him and would happily work with him in the future. He has my highest recommendation.",
	}
];
