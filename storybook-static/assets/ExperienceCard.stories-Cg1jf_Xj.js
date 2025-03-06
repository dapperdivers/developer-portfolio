import{a as i}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{E as S}from"./ExperienceCard-BC3092ar.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Co38GRlK.js";import"./Card-piHSsVOW.js";import"./proxy-Vqfb2hit.js";import"./ResponsiveImage-DeSVJz96.js";import"./useIntersectionObserver-D-75sPdH.js";/* empty css                 */const A={title:"Molecules/ExperienceCard",component:S,tags:["autodocs"],argTypes:{data:{control:"object",description:"Experience data object"},index:{control:"number",description:"Index for staggered animations"}},parameters:{docs:{description:{component:"Card component for displaying job experience information with company logo, role, date, and description."}}}},a=[{company:"Tech Innovations Inc.",role:"Senior Frontend Developer",date:"January 2022 - Present",desc:"Led the development of responsive web applications using React and modern JavaScript frameworks.",companylogo:"https://ui-avatars.com/api/?name=TI&background=0D8ABC&color=fff",descBullets:["Implemented atomic design system across multiple projects","Reduced bundle size by 40% through code splitting and lazy loading","Mentored junior developers on React best practices"]},{company:"Digital Solutions",role:"UI/UX Developer",date:"March 2020 - December 2021",desc:"Designed and developed user interfaces for client web applications.",companylogo:"https://ui-avatars.com/api/?name=DS&background=2D8A5F&color=fff",descBullets:["Created reusable component libraries using React and Styled Components","Collaborated with UX designers to implement design systems","Optimized application performance using React performance tools"]},{company:"Web Creators",role:"Frontend Developer",date:"June 2018 - February 2020",desc:"Developed responsive websites for various clients using modern frontend technologies.",companylogo:"https://ui-avatars.com/api/?name=WC&background=A85C32&color=fff",descBullets:["Built interactive web applications using React and Redux","Implemented responsive designs using CSS Grid and Flexbox","Integrated RESTful APIs with frontend applications"]}],r={args:{data:a[0],index:0}},n={args:{data:a[1],index:1}},o={args:{data:a[2],index:2}},e=()=>i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(350px, 1fr))",gap:"24px",maxWidth:"1200px"},children:a.map((D,t)=>i(S,{data:D,index:t},t))}),s={args:{data:{...a[0],descBullets:[]},index:0}};e.__docgenInfo={description:"",methods:[],displayName:"MultipleCards"};var p,d,c;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    data: exampleExperiences[0],
    index: 0
  }
}`,...(c=(d=r.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var l,m,u;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    data: exampleExperiences[1],
    index: 1
  }
}`,...(u=(m=n.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var x,g,f;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    data: exampleExperiences[2],
    index: 2
  }
}`,...(f=(g=o.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var y,b,h;e.parameters={...e.parameters,docs:{...(y=e.parameters)==null?void 0:y.docs,source:{originalSource:`() => <div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '24px',
  maxWidth: '1200px'
}}>
    {exampleExperiences.map((experience, index) => <ExperienceCard key={index} data={experience} index={index} />)}
  </div>`,...(h=(b=e.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var v,C,E;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    data: {
      ...exampleExperiences[0],
      descBullets: []
    },
    index: 0
  }
}`,...(E=(C=s.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};const z=["Default","SecondExperience","ThirdExperience","MultipleCards","WithoutBullets"];export{r as Default,e as MultipleCards,n as SecondExperience,o as ThirdExperience,s as WithoutBullets,z as __namedExportsOrder,A as default};
