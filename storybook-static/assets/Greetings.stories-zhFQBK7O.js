import{a as d}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import R from"./Greetings-DWEnjiiu.js";import{w as H,e as r}from"./index-DZ0MIZXx.js";import{P as W}from"./PortfolioContext-CM91bWnU.js";import{b as p}from"./mockData-Bv86VHFx.js";import{w as U,a as j}from"./decorators-DZYmSUt9.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./dev-coding-DSnmwsmw.js";import"./index-LaBibFJR.js";import"./Button-DTt19CJR.js";import"./index-Co38GRlK.js";import"./iconify-BRCYAcB5.js";import"./DisplayLottie-BzSg4w-g.js";import"./Loading-DnxwpyrZ.js";import"./SocialLinks-DRjwrL1j.js";import"./proxy-Vqfb2hit.js";const F=a=>{const i={...p,greetings:a};return e=>d(W.Provider,{value:i,children:d(e,{})})},ie={title:"Organisms/Greetings",component:R,tags:["autodocs"],decorators:[U],parameters:{docs:{description:{component:"Hero section with personal greeting, description, animation, and call-to-action buttons."}},a11y:{config:{rules:[{id:"color-contrast",enabled:!0},{id:"button-name",enabled:!0},{id:"image-alt",enabled:!0}]}}}},l=()=>d(R,{}),m=l.bind({});m.play=async({canvasElement:a,step:i})=>{const e=H(a);await i("Check essential elements",async()=>{await r(e.getByText(p.greetings.title)).toBeInTheDocument(),await r(e.getByText(p.greetings.description)).toBeInTheDocument(),await r(e.getByRole("link",{name:/download resume/i})).toBeInTheDocument();const c=e.getByRole("list");await r(c).toBeInTheDocument()}),await i("Button interaction",async()=>{const c=e.getByRole("link",{name:/download resume/i});await r(c).toHaveAttribute("href",p.greetings.resumeLink)})};const t=l.bind({});t.decorators=[F({...p.greetings,animation:"webdev"})];t.parameters={docs:{description:{story:"The greeting section can be customized with different animations."}}};const n=l.bind({});n.decorators=[F({name:"Derek Mackley",title:"Hello, I'm Derek Mackley",description:"A passionate Full Stack Web Developer with extensive experience in building secure web applications. I specialize in creating robust, scalable solutions that solve real-world problems. With expertise in JavaScript, React, Node.js, Python, C#, and various cloud technologies, I bring a comprehensive approach to development. I'm dedicated to writing clean, maintainable code and continuously learning new technologies to stay at the forefront of the industry. Let's collaborate to bring your ideas to life!",resumeLink:"https://example.com/resume.pdf"})];n.play=async({canvasElement:a,step:i})=>{const e=H(a);await i("Check long content handling",async()=>{const c=e.getByText(/A passionate Full Stack Web Developer with extensive experience/);await r(c).toBeInTheDocument()})};const o=l.bind({});o.decorators=[j("mobile")];o.parameters={docs:{description:{story:"Mobile view of the greeting section, showing how it adapts to smaller screens."}}};const s=l.bind({});s.decorators=[j("tablet")];s.parameters={docs:{description:{story:"Tablet view of the greeting section."}}};var g,u,h;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:"() => <Greetings />",...(h=(u=m.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var f,b,w,y,v;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:"() => <Greetings />",...(w=(b=t.parameters)==null?void 0:b.docs)==null?void 0:w.source},description:{story:`Demonstrates the component with a different animation.
This story shows how the hero section can be customized with
different Lottie animations.`,...(v=(y=t.parameters)==null?void 0:y.docs)==null?void 0:v.description}}};var x,k,T,D,B;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:"() => <Greetings />",...(T=(k=n.parameters)==null?void 0:k.docs)==null?void 0:T.source},description:{story:`Demonstrates the component with different content,
showing how it handles longer text.`,...(B=(D=n.parameters)==null?void 0:D.docs)==null?void 0:B.description}}};var A,G,C,L,I;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:"() => <Greetings />",...(C=(G=o.parameters)==null?void 0:G.docs)==null?void 0:C.source},description:{story:`## Component Usage

\`\`\`jsx
import Greetings from '../containers/Greetings';

// Component uses data from portfolio.js:
// export const greetings = {
//   name: "Derek Mackley",
//   title: "Hi There, I'm Derek",
//   description: "A passionate Full Stack Web Developer...",
//   resumeLink: "https://example.com/resume.pdf"
// };

function App() {
  return <Greetings />;
}
\`\`\`

## Data Requirements

The component depends on the following data structure from portfolio.js:

| Field | Type | Description |
|------|------|-------------|
| greetings.name | string | Your full name |
| greetings.title | string | Hero section title/greeting |
| greetings.description | string | Brief description about yourself |
| greetings.resumeLink | string | URL to your resume file |

## Accessibility

This component follows these accessibility best practices:
- Uses semantic HTML with proper heading hierarchy
- Provides ARIA labels for interactive elements
- Ensures proper keyboard focus management
- Maintains high contrast for text readability
- Uses SVG and animation in an accessible way

## Animation

The component uses Framer Motion for entrance animations and Lottie for the 
decorative animation. These enhance the visual appeal without affecting usability.`,...(I=(L=o.parameters)==null?void 0:L.docs)==null?void 0:I.description}}};var S,M,P;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:"() => <Greetings />",...(P=(M=s.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};const re=["Default","AlternativeAnimation","LongContent","Mobile","Tablet"];export{t as AlternativeAnimation,m as Default,n as LongContent,o as Mobile,s as Tablet,re as __namedExportsOrder,ie as default};
