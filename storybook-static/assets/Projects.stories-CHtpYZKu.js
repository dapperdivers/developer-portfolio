import{a as h}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import z from"./Projects-BIzzySeu.js";import{w as F,e as t}from"./index-DZ0MIZXx.js";import{P as H}from"./PortfolioContext-CM91bWnU.js";import{b as O}from"./mockData-Bv86VHFx.js";import{w as Q,a as Z}from"./decorators-DZYmSUt9.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./ProjectsCard-CatNf-Dc.js";import"./index-Co38GRlK.js";import"./Card-piHSsVOW.js";import"./proxy-Vqfb2hit.js";import"./Button-DTt19CJR.js";import"./iconify-BRCYAcB5.js";import"./ResponsiveImage-DeSVJz96.js";import"./useIntersectionObserver-D-75sPdH.js";/* empty css                 */import"./SkeletonCard-CCuh-sAq.js";import"./Section-D0daCtUT.js";import"./index-LaBibFJR.js";const p=l=>{const s={...O,projects:l};return e=>h(H.Provider,{value:s,children:h(e,{})})},je={title:"Organisms/Projects",component:z,tags:["autodocs"],decorators:[Q],parameters:{docs:{description:{component:"Projects section that displays a grid of project cards, showcasing the portfolio projects with descriptions and links."}},a11y:{config:{rules:[{id:"color-contrast",enabled:!0},{id:"heading-order",enabled:!0},{id:"link-name",enabled:!0}]}}}},m=()=>h(z,{}),d=[{name:"Project Alpha",desc:"A full-stack web application with React and Node.js",image:"https://via.placeholder.com/600x400?text=Project+Alpha",link:"https://example.com/project-alpha",github:"https://github.com/username/project-alpha",stack:["React","Node.js","MongoDB"]},{name:"Project Beta",desc:"Mobile-first responsive website with modern UI/UX",image:"https://via.placeholder.com/600x400?text=Project+Beta",link:"https://example.com/project-beta",github:"https://github.com/username/project-beta",stack:["React","CSS3","Firebase"]},{name:"Project Gamma",desc:"Real-time data visualization dashboard",image:"https://via.placeholder.com/600x400?text=Project+Gamma",link:"https://example.com/project-gamma",github:"https://github.com/username/project-gamma",stack:["D3.js","React","Express","Socket.io"]}],n=m.bind({});n.decorators=[p(d)];n.play=async({canvasElement:l,step:s})=>{const e=F(l);await s("Check section title",async()=>{await t(e.getByText("Projects")).toBeInTheDocument()}),await s("Check project cards",async()=>{await t(e.getByText("Project Alpha")).toBeInTheDocument(),await t(e.getByText("Project Beta")).toBeInTheDocument(),await t(e.getByText("Project Gamma")).toBeInTheDocument();const _=e.getAllByText("Demo"),q=e.getAllByText("Code");await t(_.length).toBe(3),await t(q.length).toBe(3)})};const o=m.bind({});o.decorators=[p([d[0]])];o.play=async({canvasElement:l,step:s})=>{const e=F(l);await s("Check single project item",async()=>{await t(e.getByText("Project Alpha")).toBeInTheDocument(),await t(e.queryByText("Project Beta")).not.toBeInTheDocument()})};const a=m.bind({});a.decorators=[p([])];a.parameters={docs:{description:{story:"When no projects are available, the section is rendered without any project cards."}}};const c=m.bind({});c.decorators=[p([d[0],{name:"No Image Project",desc:"A project without an image",github:"https://github.com/username/no-image",stack:["JavaScript","HTML","CSS"]},{name:"No Links Project",desc:"A project without any links",image:"https://via.placeholder.com/600x400?text=No+Links",stack:["Python","Django"]},{name:"Minimal Project",desc:"A project with minimal information"}])];const r=m.bind({});r.decorators=[p(d),Z("mobile")];r.parameters={docs:{description:{story:"Mobile view of the projects section, showing how the card grid adapts to smaller screens."}}};const i=m.bind({});i.decorators=[p([...d,{name:"Project Delta",desc:"E-commerce platform with payment integration",image:"https://via.placeholder.com/600x400?text=Project+Delta",link:"https://example.com/project-delta",stack:["React","Redux","Stripe","Express"]},{name:"Project Epsilon",desc:"Content management system for digital publications",image:"https://via.placeholder.com/600x400?text=Project+Epsilon",github:"https://github.com/username/project-epsilon",stack:["Next.js","GraphQL","PostgreSQL"]},{name:"Project Zeta",desc:"Machine learning application for image recognition",image:"https://via.placeholder.com/600x400?text=Project+Zeta",github:"https://github.com/username/project-zeta",link:"https://example.com/project-zeta",stack:["Python","TensorFlow","Flask","React"]}])];i.parameters={docs:{description:{story:"Shows how the grid layout handles a large number of projects."}}};var u,j,g;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:"() => <Projects />",...(g=(j=n.parameters)==null?void 0:j.docs)==null?void 0:g.source}}};var P,x,b,w,y;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:"() => <Projects />",...(b=(x=o.parameters)==null?void 0:x.docs)==null?void 0:b.source},description:{story:`Shows how the component handles having only a single project item.
The grid layout should adjust accordingly.`,...(y=(w=o.parameters)==null?void 0:w.docs)==null?void 0:y.description}}};var f,k,v,B,S;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:"() => <Projects />",...(v=(k=a.parameters)==null?void 0:k.docs)==null?void 0:v.source},description:{story:`Shows what happens when no projects are available.
The component should render the section without any cards.`,...(S=(B=a.parameters)==null?void 0:B.docs)==null?void 0:S.description}}};var T,C,D,M,A;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:"() => <Projects />",...(D=(C=c.parameters)==null?void 0:C.docs)==null?void 0:D.source},description:{story:`Shows projects with varying amounts of data.
Some have full info, while others have minimal data.`,...(A=(M=c.parameters)==null?void 0:M.docs)==null?void 0:A.description}}};var R,E,I,N,L;r.parameters={...r.parameters,docs:{...(R=r.parameters)==null?void 0:R.docs,source:{originalSource:"() => <Projects />",...(I=(E=r.parameters)==null?void 0:E.docs)==null?void 0:I.source},description:{story:`## Component Usage

\`\`\`jsx
import Projects from '../containers/Projects';
import PortfolioContext from '@context/PortfolioContext';

function App() {
  const portfolioData = {
    projects: [
      {
        name: "Project Name",
        desc: "Project description",
        image: "path/to/image.jpg",
        github: "https://github.com/username/repo",
        link: "https://example.com/demo",
        stack: ["React", "Node.js"]
      }
    ]
  };
  
  return (
    <PortfolioContext.Provider value={portfolioData}>
      <Projects />
    </PortfolioContext.Provider>
  );
}
\`\`\`

## Context Requirements

The component expects the following data in the PortfolioContext:

| Context Path | Type | Description |
|------|------|-------------|
| projects | array | Array of project objects with name, desc, image (optional), github (optional), link (optional), and stack (optional) |

## Accessibility

This component follows these accessibility best practices:
- Uses semantic HTML with proper heading structure
- Provides ARIA labels for buttons and links
- Ensures sufficient color contrast for text
- Makes interactive elements accessible via keyboard navigation
- Uses tab indices to ensure proper focus management`,...(L=(N=r.parameters)==null?void 0:N.docs)==null?void 0:L.description}}};var W,U,G;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:"() => <Projects />",...(G=(U=i.parameters)==null?void 0:U.docs)==null?void 0:G.source}}};const ge=["WithMultipleProjects","WithSingleProject","EmptyState","MixedDataCompleteness","Mobile","ManyProjects"];export{a as EmptyState,i as ManyProjects,c as MixedDataCompleteness,r as Mobile,n as WithMultipleProjects,o as WithSingleProject,ge as __namedExportsOrder,je as default};
