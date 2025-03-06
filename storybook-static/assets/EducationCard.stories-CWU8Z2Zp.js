import{a as p}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{E as F}from"./EducationCard-ChW5JNA7.js";import{w as q,e as t,u as l}from"./index-DZ0MIZXx.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Co38GRlK.js";import"./index-LaBibFJR.js";import"./Card-piHSsVOW.js";import"./proxy-Vqfb2hit.js";import"./useIntersectionObserver-D-75sPdH.js";const e={complete:{schoolName:"Stanford University",subHeader:"Master of Computer Science",duration:"2018 - 2020",desc:"Specialized in Artificial Intelligence and Machine Learning. Graduated with honors and participated in multiple research projects.",descBullets:["Thesis on Deep Learning applications in healthcare","Received Outstanding Graduate Student Award","Teaching Assistant for Algorithms course","Published 2 papers in peer-reviewed journals"]},minimal:{schoolName:"MIT",subHeader:"Bachelor of Science in Computer Engineering",duration:"2014 - 2018"},longNames:{schoolName:"Massachusetts Institute of Technology School of Engineering and Computer Science",subHeader:"Bachelor of Science in Computer Engineering with Specialization in Robotics and Embedded Systems",duration:"2014 - 2018",desc:"Graduated with honors. Focused on embedded systems and robotics."},certificate:{schoolName:"Udacity",subHeader:"Nanodegree in Front End Web Development",duration:"2021",desc:"Completed a 6-month intensive program on modern front-end technologies and best practices.",descBullets:["Built a weather app using React and OpenWeather API","Developed a restaurant review application with offline capabilities","Created a travel planning dashboard using Redux and Google Maps API"]}},K={title:"Molecules/EducationCard",component:F,tags:["autodocs"],argTypes:{education:{control:"object",description:"Education data object containing information about educational background"},index:{control:"number",description:"Index for staggered animations",defaultValue:0}},parameters:{docs:{description:{component:"Education card component for displaying educational background information including school name, degree, duration, and additional details."}},a11y:{config:{rules:[{id:"color-contrast",reviewOnFail:!0},{id:"list",reviewOnFail:!0},{id:"heading-order",reviewOnFail:!0}]}},layout:"padded"}},r={args:{education:e.complete,index:0}};r.play=async({canvasElement:u,step:o})=>{const n=q(u);await o("Initial render check",async()=>{await t(n.getByText("Stanford University")).toBeInTheDocument(),await t(n.getByText("Master of Computer Science")).toBeInTheDocument(),await t(n.getByText("2018 - 2020")).toBeInTheDocument(),await t(n.getByText(/Specialized in Artificial Intelligence/)).toBeInTheDocument(),await t(n.getByText("Thesis on Deep Learning applications in healthcare")).toBeInTheDocument()}),await o("Keyboard navigation test",async()=>{await l.tab(),await t(n.getByText("Stanford University")).toHaveFocus(),await l.tab(),await t(n.getByText("Master of Computer Science")).toHaveFocus(),await l.tab(),await t(n.getByText(/Specialized in Artificial Intelligence/)).toHaveFocus();for(let m=0;m<e.complete.descBullets.length;m++)await l.tab(),await t(n.getByText(e.complete.descBullets[m])).toHaveFocus()})};const s={args:{education:e.minimal,index:1}};s.parameters={docs:{description:{story:"Shows an education card with only the required fields: school name, degree, and duration."}}};const c={args:{education:e.longNames,index:2}};c.parameters={docs:{description:{story:"Demonstrates how the component handles very long school names and degree titles with proper text wrapping and truncation when necessary."}}};const d={args:{education:e.certificate,index:3}};d.parameters={docs:{description:{story:"Shows how the component can be used to display online certificates, nanodegrees, or other non-traditional education."}}};const i=()=>p("div",{style:{maxWidth:"600px",margin:"0 auto"},children:[e.complete,e.minimal,e.certificate].map((u,o)=>p(F,{education:u,index:o},`edu-${o}`))});i.parameters={docs:{description:{story:"Demonstrates the staggered animation of multiple education cards in sequence."}},chromatic:{delay:500}};const a={args:{education:e.complete,index:0}};a.parameters={viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Shows how the education card appears on mobile devices. Note that the graduation cap icon is hidden on mobile to conserve space."}}};i.__docgenInfo={description:"",methods:[],displayName:"AnimationSequence"};var g,h,f;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    education: mockEducationData.complete,
    index: 0
  }
}`,...(f=(h=r.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var b,w,y;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    education: mockEducationData.minimal,
    index: 1
  }
}`,...(y=(w=s.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var x,v,S;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    education: mockEducationData.longNames,
    index: 2
  }
}`,...(S=(v=c.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var T,D,E;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    education: mockEducationData.certificate,
    index: 3
  }
}`,...(E=(D=d.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};var B,A,C;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`() => <div style={{
  maxWidth: '600px',
  margin: '0 auto'
}}>
    {[mockEducationData.complete, mockEducationData.minimal, mockEducationData.certificate].map((education, index) => <EducationCard key={\`edu-\${index}\`} education={education} index={index} />)}
  </div>`,...(C=(A=i.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var I,M,k,N,H;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    education: mockEducationData.complete,
    index: 0
  }
}`,...(k=(M=a.parameters)==null?void 0:M.docs)==null?void 0:k.source},description:{story:`## Component Usage

\`\`\`jsx
import EducationCard from '@molecules/EducationCard';

function Education() {
  const educationData = [
    {
      schoolName: "Stanford University",
      subHeader: "Master of Computer Science",
      duration: "2018 - 2020",
      desc: "Specialized in AI and ML",
      descBullets: [
        "Thesis on Deep Learning applications",
        "Teaching Assistant for Algorithms"
      ]
    },
    // More education items...
  ];
  
  return (
    <div className="education-section">
      {educationData.map((education, index) => (
        <EducationCard 
          key={index} 
          education={education} 
          index={index} 
        />
      ))}
    </div>
  );
}
\`\`\`

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| education | Object | required | Education data object |
| education.schoolName | string | required | Name of the school or institution |
| education.subHeader | string | required | Degree or certification title |
| education.duration | string | required | Time period of education |
| education.desc | string | undefined | Description or details |
| education.descBullets | Array<string> | undefined | Array of bullet points for additional details |
| index | number | 0 | Index number for staggered animations |

## Accessibility Features

This component follows these accessibility best practices:
- Proper heading hierarchy (h5 for school name, h6 for degree)
- Semantic HTML with correct list markup for bullet points
- ARIA labels for duration badge and bullet points list
- Keyboard navigation with tabIndex on all interactive elements
- Appropriate color contrast for all text elements
- Proper text overflow handling for long content

## Animation Details

The card animates into view when it enters the viewport:
- Uses intersection observer for efficient scroll-based animations
- Slides in from left with fade-in effect
- Staggered timing based on index prop
- Subtle animation that doesn't interfere with readability`,...(H=(N=a.parameters)==null?void 0:N.docs)==null?void 0:H.description}}};const $=["Complete","Minimal","LongTextHandling","OnlineCertificate","AnimationSequence","MobileView"];export{i as AnimationSequence,r as Complete,c as LongTextHandling,s as Minimal,a as MobileView,d as OnlineCertificate,$ as __namedExportsOrder,K as default};
