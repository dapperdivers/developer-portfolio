import{a as d}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import V from"./Proficiency-8_ri9l1u.js";import{w as O,e as t}from"./index-DZ0MIZXx.js";import{P as R}from"./PortfolioContext-CM91bWnU.js";import{b as _}from"./mockData-Bv86VHFx.js";import{w as q,a as E}from"./decorators-DZYmSUt9.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./DisplayLottie-BzSg4w-g.js";import"./Loading-DnxwpyrZ.js";import"./index-LaBibFJR.js";import"./index-Co38GRlK.js";import"./proxy-Vqfb2hit.js";const i=m=>{const p={..._,SkillBars:m};return e=>d(R.Provider,{value:p,children:d(e,{})})},te={title:"Organisms/Proficiency",component:V,tags:["autodocs"],decorators:[q],parameters:{docs:{description:{component:"Proficiency section that displays skill levels using animated progress bars and a complementary animation."}},a11y:{config:{rules:[{id:"color-contrast",enabled:!0},{id:"aria-progressbar",enabled:!0}]}}}},c=()=>d(V,{}),l=[{Stack:"Software Architecture",progressPercentage:"75"},{Stack:"API layer and below",progressPercentage:"90"},{Stack:"Frontend/Design",progressPercentage:"50"}],a=c.bind({});a.decorators=[i(l)];a.play=async({canvasElement:m,step:p})=>{const e=O(m);await p("Verify section heading",async()=>{await t(e.getByText("Proficiency")).toBeInTheDocument()}),await p("Verify skill bars",async()=>{await t(e.getByText("Software Architecture")).toBeInTheDocument(),await t(e.getByText("API layer and below")).toBeInTheDocument(),await t(e.getByText("Frontend/Design")).toBeInTheDocument(),await t(e.getByText("75%")).toBeInTheDocument(),await t(e.getByText("90%")).toBeInTheDocument(),await t(e.getByText("50%")).toBeInTheDocument();const F=e.getAllByRole("progressbar");await t(F.length).toBe(3)})};const r=c.bind({});r.decorators=[i([...l,{Stack:"DevOps",progressPercentage:"80"},{Stack:"Testing",progressPercentage:"70"},{Stack:"Mobile Development",progressPercentage:"60"},{Stack:"UX/UI Design",progressPercentage:"45"},{Stack:"Database Management",progressPercentage:"85"}])];r.parameters={docs:{description:{story:"Shows how the component handles displaying many skill bars."}}};const o=c.bind({});o.decorators=[i([{Stack:"Perfect Skill",progressPercentage:"100"},{Stack:"Zero Knowledge",progressPercentage:"0"},{Stack:"Just Starting",progressPercentage:"5"},{Stack:"Almost Perfect",progressPercentage:"99"}])];o.parameters={docs:{description:{story:"Shows how the component handles extreme progress values (0%, 5%, 99%, 100%)."}}};const s=c.bind({});s.decorators=[i(l),E("mobile")];s.parameters={docs:{description:{story:"Mobile view of the proficiency section, showing responsive layout."}}};const n=c.bind({});n.decorators=[i(l),E("tablet")];n.parameters={docs:{description:{story:"Tablet view of the proficiency section."}}};var g,f,y;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:"() => <Proficiency />",...(y=(f=a.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var h,u,w,P,b;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:"() => <Proficiency />",...(w=(u=r.parameters)==null?void 0:u.docs)==null?void 0:w.source},description:{story:"Shows how the component behaves with many skill bars",...(b=(P=r.parameters)==null?void 0:P.docs)==null?void 0:b.description}}};var S,k,T,B,x;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:"() => <Proficiency />",...(T=(k=o.parameters)==null?void 0:k.docs)==null?void 0:T.source},description:{story:"Shows how the component behaves with extreme percentage values",...(x=(B=o.parameters)==null?void 0:B.docs)==null?void 0:x.description}}};var D,v,A,I,M;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:"() => <Proficiency />",...(A=(v=s.parameters)==null?void 0:v.docs)==null?void 0:A.source},description:{story:`## Component Usage

\`\`\`jsx
import Proficiency from '../containers/Proficiency';

// Component uses data from portfolio.js:
// export const SkillBars = [
//   {
//     Stack: "Software Architecture",
//     progressPercentage: "75"
//   },
//   {
//     Stack: "API layer and below",
//     progressPercentage: "90"
//   }
// ];

function App() {
  return <Proficiency />;
}
\`\`\`

## Data Requirements

The component depends on the following data in the portfolio.js file:

| Data Object | Field | Type | Description |
|------|------|------|-------------|
| SkillBars | Stack | string | Name of the skill or technology stack |
| SkillBars | progressPercentage | string | Percentage value (0-100) as a string |

## Accessibility

This component follows these accessibility best practices:
- Uses semantic HTML for structure
- Includes proper ARIA attributes for progress bars
- Ensures all text elements have sufficient color contrast
- Makes skill percentages clearly visible
- Uses animation that doesn't interfere with readability

## Animation

The component features two types of animations:
1. Progress bar animations that fill from 0% to the specified percentage when scrolled into view
2. Fade-in animations for each skill bar with a staggered delay`,...(M=(I=s.parameters)==null?void 0:I.docs)==null?void 0:M.description}}};var C,j,U;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:"() => <Proficiency />",...(U=(j=n.parameters)==null?void 0:j.docs)==null?void 0:U.source}}};const re=["Default","ManySkills","ExtremeValues","Mobile","Tablet"];export{a as Default,o as ExtremeValues,r as ManySkills,s as Mobile,n as Tablet,re as __namedExportsOrder,te as default};
