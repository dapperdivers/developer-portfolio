import{a as e,j as r}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{S as u}from"./Section-D0daCtUT.js";import{B as l}from"./Button-DTt19CJR.js";import{C as p}from"./Card-piHSsVOW.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Co38GRlK.js";import"./index-LaBibFJR.js";/* empty css                 */import"./proxy-Vqfb2hit.js";import"./iconify-BRCYAcB5.js";const X={title:"Templates/Section",component:u,tags:["autodocs"],argTypes:{title:{control:"text",description:"Section title"},subtitle:{control:"text",description:"Section subtitle"},id:{control:"text",description:"Section ID for navigation"},background:{control:"select",options:["light","dark","primary","secondary","gray"],description:"Background style"},container:{control:"boolean",description:"Whether to wrap content in a container"},fluid:{control:"boolean",description:"Whether the container should be fluid (full-width)"},animation:{control:{disable:!0},description:"Animation properties for Framer Motion"},children:{control:{disable:!0},description:"Section content"}},parameters:{layout:"fullscreen"}},o={args:{title:"Section Title",subtitle:"This is a subtitle that provides additional context",id:"sample-section",background:"light",container:!0,fluid:!1}},n={args:{title:"Education",subtitle:"My educational background",id:"education",background:"light"}},a={args:{title:"Experience",subtitle:"My professional journey",id:"experience",background:"gray"}},s={args:{title:"Projects",subtitle:"Some of my recent work",id:"projects",background:"light"}},t=D=>e(u,{title:"Projects",subtitle:"Check out some of my work",id:"projects",background:"light",children:r("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",gap:"20px",padding:"20px 0"},children:[r(p,{title:"Project 1",shadow:!0,hoverable:!0,children:[e("p",{children:"This is a description of project 1."}),e(l,{variant:"primary",size:"sm",children:"View Project"})]}),r(p,{title:"Project 2",shadow:!0,hoverable:!0,children:[e("p",{children:"This is a description of project 2."}),e(l,{variant:"primary",size:"sm",children:"View Project"})]}),r(p,{title:"Project 3",shadow:!0,hoverable:!0,children:[e("p",{children:"This is a description of project 3."}),e(l,{variant:"primary",size:"sm",children:"View Project"})]})]})}),c={args:{title:"Contact",subtitle:"Get in touch with me",id:"contact",background:"dark"}},i=D=>e(u,{title:"Animated Section",subtitle:"This section animates when it comes into view",id:"animated",background:"light",animation:{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.6}},children:e("div",{style:{padding:"20px 0"},children:e("p",{children:"The entire section animates with Framer Motion when it renders."})})}),d={args:{title:"Full Width Section",subtitle:"This section uses a fluid container",id:"fluid",background:"primary",container:!0,fluid:!0}};t.__docgenInfo={description:"",methods:[],displayName:"SectionWithCards"};i.__docgenInfo={description:"",methods:[],displayName:"AnimatedSection"};var m,h,g;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    title: 'Section Title',
    subtitle: 'This is a subtitle that provides additional context',
    id: 'sample-section',
    background: 'light',
    container: true,
    fluid: false
  }
}`,...(g=(h=o.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var b,S,y;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    title: 'Education',
    subtitle: 'My educational background',
    id: 'education',
    background: 'light'
  }
}`,...(y=(S=n.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var f,j,k;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    title: 'Experience',
    subtitle: 'My professional journey',
    id: 'experience',
    background: 'gray'
  }
}`,...(k=(j=a.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var w,x,v;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    title: 'Projects',
    subtitle: 'Some of my recent work',
    id: 'projects',
    background: 'light'
  }
}`,...(v=(x=s.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var T,P,C;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`args => <Section title="Projects" subtitle="Check out some of my work" id="projects" background="light">
    <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px 0'
  }}>
      <Card title="Project 1" shadow hoverable>
        <p>This is a description of project 1.</p>
        <Button variant="primary" size="sm">View Project</Button>
      </Card>
      <Card title="Project 2" shadow hoverable>
        <p>This is a description of project 2.</p>
        <Button variant="primary" size="sm">View Project</Button>
      </Card>
      <Card title="Project 3" shadow hoverable>
        <p>This is a description of project 3.</p>
        <Button variant="primary" size="sm">View Project</Button>
      </Card>
    </div>
  </Section>`,...(C=(P=t.parameters)==null?void 0:P.docs)==null?void 0:C.source}}};var B,E,F;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    title: 'Contact',
    subtitle: 'Get in touch with me',
    id: 'contact',
    background: 'dark'
  }
}`,...(F=(E=c.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var M,W,_;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`args => <Section title="Animated Section" subtitle="This section animates when it comes into view" id="animated" background="light" animation={{
  initial: {
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0
  },
  transition: {
    duration: 0.6
  }
}}>
    <div style={{
    padding: '20px 0'
  }}>
      <p>The entire section animates with Framer Motion when it renders.</p>
    </div>
  </Section>`,...(_=(W=i.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var z,A,V;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    title: 'Full Width Section',
    subtitle: 'This section uses a fluid container',
    id: 'fluid',
    background: 'primary',
    container: true,
    fluid: true
  }
}`,...(V=(A=d.parameters)==null?void 0:A.docs)==null?void 0:V.source}}};const Y=["Default","EducationSection","ExperienceSection","ProjectsSection","SectionWithCards","DarkSection","AnimatedSection","FluidSection"];export{i as AnimatedSection,c as DarkSection,o as Default,n as EducationSection,a as ExperienceSection,d as FluidSection,s as ProjectsSection,t as SectionWithCards,Y as __namedExportsOrder,X as default};
