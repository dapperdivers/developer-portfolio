import{a as u}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import M from"./Education-D7ZFYMVO.js";import{w as l,e as c}from"./index-DZ0MIZXx.js";import{P as O}from"./PortfolioContext-CM91bWnU.js";import{b as d}from"./mockData-Bv86VHFx.js";import{w as _,a as N}from"./decorators-DZYmSUt9.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./EducationCard-ChW5JNA7.js";import"./index-Co38GRlK.js";import"./index-LaBibFJR.js";import"./Card-piHSsVOW.js";import"./proxy-Vqfb2hit.js";import"./useIntersectionObserver-D-75sPdH.js";import"./Section-D0daCtUT.js";/* empty css                 */const oe={title:"Organisms/Education",component:M,tags:["autodocs"],decorators:[_],parameters:{docs:{description:{component:"Education section that displays educational background and qualifications. Gets data from PortfolioContext and renders a grid of EducationCard components within a Section layout."}},a11y:{config:{rules:[{id:"heading-order",enabled:!0},{id:"landmark-unique",enabled:!0}]}}}},m=o=>{const t={...d,educationInfo:o};return e=>u(O.Provider,{value:t,children:u(e,{})})},p=()=>u(M,{}),i=p.bind({});i.decorators=[m(d.educationInfo)];i.play=async({canvasElement:o,step:t})=>{const e=l(o);await t("Check section title",()=>{c(e.getByText("Education")).toBeInTheDocument()}),await t("Check education cards",()=>{c(e.getAllByText(/University of|Coding Academy|Online University/i).length).toBeGreaterThan(0)})};const n=p.bind({});n.decorators=[m([d.educationInfo[0]])];n.play=async({canvasElement:o,step:t})=>{const e=l(o);await t("Check single education item",()=>{c(e.getByText("University of Technology")).toBeInTheDocument(),c(e.queryByText("Coding Academy")).not.toBeInTheDocument()})};const a=p.bind({});a.decorators=[m([])];a.play=async({canvasElement:o,step:t})=>{const e=l(o);await t("Check empty state",()=>{c(e.getByText("Education")).toBeInTheDocument(),c(e.queryByText("University of Technology")).not.toBeInTheDocument()})};const r=p.bind({});r.decorators=[m(d.educationInfo),N("mobile")];r.parameters={docs:{description:{story:"The Education section in mobile view, showing how the layout adapts to smaller screens."}}};const s=p.bind({});s.decorators=[m(d.educationInfo),N("tablet")];s.parameters={docs:{description:{story:"The Education section in tablet view, showing the responsive grid layout."}}};var h,y,f;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:"() => <Education />",...(f=(y=i.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var g,b,T,x,E;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:"() => <Education />",...(T=(b=n.parameters)==null?void 0:b.docs)==null?void 0:T.source},description:{story:`This story demonstrates how the Education component appears when there's only
a single education item. The grid layout should adapt appropriately.`,...(E=(x=n.parameters)==null?void 0:x.docs)==null?void 0:E.description}}};var w,v,C,I,P;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:"() => <Education />",...(C=(v=a.parameters)==null?void 0:v.docs)==null?void 0:C.source},description:{story:`This story demonstrates how the Education component handles an empty state
when no education data is available.`,...(P=(I=a.parameters)==null?void 0:I.docs)==null?void 0:P.description}}};var B,D,S,k,A;r.parameters={...r.parameters,docs:{...(B=r.parameters)==null?void 0:B.docs,source:{originalSource:"() => <Education />",...(S=(D=r.parameters)==null?void 0:D.docs)==null?void 0:S.source},description:{story:`## Component Usage

\`\`\`jsx
import Education from 'containers/Education';
import PortfolioContext from 'context/PortfolioContext';

function App() {
  const portfolioData = {
    educationInfo: [
      {
        schoolName: "University Name",
        subHeader: "Degree",
        duration: "2015 - 2019",
        desc: "Description",
        descBullets: ["Achievement 1", "Achievement 2"]
      }
    ]
  };
  
  return (
    <PortfolioContext.Provider value={portfolioData}>
      <Education />
    </PortfolioContext.Provider>
  );
}
\`\`\`

## Context Requirements

This component requires the following data in PortfolioContext:

| Context Path | Type | Description |
|------|------|-------------|
| educationInfo | array | Array of education items with schoolName, subHeader, duration, desc, and descBullets |

## Accessibility

This component follows these accessibility best practices:
- Uses semantic heading hierarchy
- Provides visible section title
- Uses appropriate landmark regions
- Ensures proper keyboard navigation through education items`,...(A=(k=r.parameters)==null?void 0:k.docs)==null?void 0:A.description}}};var U,q,W;s.parameters={...s.parameters,docs:{...(U=s.parameters)==null?void 0:U.docs,source:{originalSource:"() => <Education />",...(W=(q=s.parameters)==null?void 0:q.docs)==null?void 0:W.source}}};const ne=["WithMultipleItems","WithSingleItem","EmptyState","Mobile","Tablet"];export{a as EmptyState,r as Mobile,s as Tablet,i as WithMultipleItems,n as WithSingleItem,ne as __namedExportsOrder,oe as default};
