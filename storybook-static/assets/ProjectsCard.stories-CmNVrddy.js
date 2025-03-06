import"./index-B6-Y_Zgq.js";import{P as v}from"./ProjectsCard-CatNf-Dc.js";import{w as L,e as r,u as W}from"./index-DZ0MIZXx.js";import{w as B}from"./decorators-DZYmSUt9.js";import"./_commonjsHelpers-CqkleIqs.js";import"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./jsx-runtime-BuIwgEqq.js";import"./index-Co38GRlK.js";import"./Card-piHSsVOW.js";import"./proxy-Vqfb2hit.js";import"./Button-DTt19CJR.js";import"./iconify-BRCYAcB5.js";import"./ResponsiveImage-DeSVJz96.js";import"./useIntersectionObserver-D-75sPdH.js";/* empty css                 */import"./PortfolioContext-CM91bWnU.js";import"./mockData-Bv86VHFx.js";const z={title:"Molecules/ProjectsCard",component:v,tags:["autodocs"],decorators:[B],argTypes:{data:{control:"object",description:"Project data object"},index:{control:"number",description:"Index number for staggered animations"}},parameters:{docs:{description:{component:"Project card component for displaying individual project information with image, description, tech stack, and links to code and demo."}},a11y:{config:{rules:[{id:"button-name",enabled:!0},{id:"image-alt",enabled:!0}]}}}},i=[{name:"React Dashboard",desc:"A comprehensive admin dashboard with multiple views and data visualization components",image:"https://source.unsplash.com/random/800x450/?dashboard",github:"https://github.com/username/react-dashboard",link:"https://react-dashboard-demo.example.com",stack:["React","Redux","Material UI","Chart.js"]},{name:"E-commerce Platform",desc:"Full-featured online store with product listings, cart functionality, and payment integration",image:"https://source.unsplash.com/random/800x450/?ecommerce",github:"https://github.com/username/ecommerce-platform",link:"https://ecommerce-demo.example.com",stack:["React","Node.js","MongoDB","Stripe"]},{name:"Weather App",desc:"Simple weather application that shows current and forecasted weather conditions",github:"https://github.com/username/weather-app",stack:["JavaScript","CSS","Weather API"]}],a={args:{data:i[0],index:0}};a.play=async({canvasElement:R,step:c})=>{const e=L(R);await c("Initial render check",async()=>{await r(e.getByText("React Dashboard")).toBeInTheDocument(),await r(e.getByText("React")).toBeInTheDocument(),await r(e.getByText("Code")).toBeInTheDocument(),await r(e.getByText("Demo")).toBeInTheDocument()}),await c("Button interaction test",async()=>{const D=e.getByText("Demo");await W.hover(D)})};const n={args:{data:i[2],index:2}},s={args:{data:{name:"Project with Very Long Title That Should Wrap to Multiple Lines",desc:"This is a project with an extremely long description that should be truncated or handled gracefully by the component. The description explains all the features and technologies used in great detail.",image:"https://source.unsplash.com/random/800x450/?code",github:"https://github.com/username/long-title-project",link:"https://demo.example.com",stack:["React","GraphQL","Node.js","PostgreSQL","Redis","WebSockets","AWS","Docker","Kubernetes"]},index:3}},t={args:{data:{github:"https://github.com/username/project",stack:["JavaScript"]}}},o={args:{data:i[1],index:1}};o.parameters={viewport:{defaultViewport:"mobile1"}};var d,m,p;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    data: exampleProjects[0],
    index: 0
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,l,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    data: exampleProjects[2],
    index: 2
  }
}`,...(h=(l=n.parameters)==null?void 0:l.docs)==null?void 0:h.source}}};var g,b,x;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    data: {
      name: "Project with Very Long Title That Should Wrap to Multiple Lines",
      desc: "This is a project with an extremely long description that should be truncated or handled gracefully by the component. The description explains all the features and technologies used in great detail.",
      image: "https://source.unsplash.com/random/800x450/?code",
      github: "https://github.com/username/long-title-project",
      link: "https://demo.example.com",
      stack: ["React", "GraphQL", "Node.js", "PostgreSQL", "Redis", "WebSockets", "AWS", "Docker", "Kubernetes"]
    },
    index: 3
  }
}`,...(x=(b=s.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var j,f,y,w,P;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    data: {
      // Missing required name and desc
      github: "https://github.com/username/project",
      stack: ["JavaScript"]
    }
  }
}`,...(y=(f=t.parameters)==null?void 0:f.docs)==null?void 0:y.source},description:{story:`## Component Usage

\`\`\`jsx
import ProjectsCard from '@molecules/ProjectsCard';

function MyComponent() {
  // Project data object with required properties
  const projectData = {
    name: "My Awesome Project",
    desc: "A description of the project",
    image: "/path/to/image.jpg", // Optional
    github: "https://github.com/username/repo", // Optional
    link: "https://demo-link.com", // Optional
    stack: ["React", "Node.js", "MongoDB"] // Optional
  };

  return <ProjectsCard data={projectData} index={0} />;
}
\`\`\`

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| data | object | required | Project data object |
| data.name | string | required | Project name |
| data.desc | string | required | Project description |
| data.image | string | undefined | Project image URL |
| data.github | string | undefined | GitHub repository URL |
| data.link | string | undefined | Live demo URL |
| data.stack | string[] | [] | Array of technologies used |
| index | number | 0 | Index number for staggered animations |

## Accessibility

This component follows these accessibility best practices:
- Proper image alt text for screen readers
- Keyboard navigable elements with tabIndex
- ARIA labels on buttons
- Semantic HTML structure

## Edge Cases

The following stories demonstrate edge cases and special scenarios.`,...(P=(w=t.parameters)==null?void 0:w.docs)==null?void 0:P.description}}};var T,k,S;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    data: exampleProjects[1],
    index: 1
  }
}`,...(S=(k=o.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};const X=["WithFullDetails","WithoutImage","WithLongText","MissingRequiredProps","Responsive"];export{t as MissingRequiredProps,o as Responsive,a as WithFullDetails,s as WithLongText,n as WithoutImage,X as __namedExportsOrder,z as default};
