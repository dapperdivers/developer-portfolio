import{a as p}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import I from"./Feedbacks-Btgug8lc.js";import{w as J,e as t}from"./index-DZ0MIZXx.js";import{P as A}from"./PortfolioContext-CM91bWnU.js";import{b as L}from"./mockData-Bv86VHFx.js";import{w as R,a as O}from"./decorators-DZYmSUt9.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./FeedbackCard-B8QmyUa1.js";import"./index-Co38GRlK.js";import"./index-LaBibFJR.js";import"./Card-piHSsVOW.js";import"./proxy-Vqfb2hit.js";import"./ResponsiveImage-DeSVJz96.js";import"./useIntersectionObserver-D-75sPdH.js";/* empty css                 */import"./Section-D0daCtUT.js";const d=c=>{const s={...L,feedbacks:c};return e=>p(A.Provider,{value:s,children:p(e,{})})},se={title:"Organisms/Feedbacks",component:I,tags:["autodocs"],decorators:[R],parameters:{docs:{description:{component:"Feedbacks section that displays testimonials and recommendations. Renders a grid of FeedbackCard components within a Section layout, using data from PortfolioContext."}},a11y:{config:{rules:[{id:"color-contrast",enabled:!0},{id:"heading-order",enabled:!0}]}}}},l=()=>p(I,{}),m=[{name:"John Smith",feedback:"Derek is an exceptional developer who consistently delivers high-quality code and innovative solutions.",designation:"CTO at TechCorp",rating:5},{name:"Emily Johnson",feedback:"Working with Derek was a pleasure. He understood our requirements perfectly and delivered beyond expectations.",designation:"Product Manager",rating:5,avatar:"https://via.placeholder.com/150"},{name:"Michael Williams",feedback:"Derek's attention to detail and commitment to quality made our project a great success.",designation:"Engineering Lead",rating:4}],i=l.bind({});i.decorators=[d(m)];i.play=async({canvasElement:c,step:s})=>{const e=J(c);await s("Check section title",async()=>{await t(e.getByText("Personal Recommendations")).toBeInTheDocument()}),await s("Check feedback cards are rendered",async()=>{await t(e.getByText("John Smith")).toBeInTheDocument(),await t(e.getByText("Emily Johnson")).toBeInTheDocument(),await t(e.getByText("Michael Williams")).toBeInTheDocument();const j=e.getAllByLabelText(/out of 5 stars/i);await t(j.length).toBe(3)})};const o=l.bind({});o.decorators=[d([m[0]])];o.play=async({canvasElement:c,step:s})=>{const e=J(c);await s("Check single feedback item",async()=>{await t(e.getByText("John Smith")).toBeInTheDocument(),await t(e.queryByText("Emily Johnson")).not.toBeInTheDocument()})};const a=l.bind({});a.decorators=[d([])];a.parameters={docs:{description:{story:"When no feedback items are available, the component returns null and nothing is rendered."}}};const n=l.bind({});n.decorators=[d(m),O("mobile")];n.parameters={docs:{description:{story:"Feedbacks section in mobile view, with feedback cards stacked vertically."}}};const r=l.bind({});r.decorators=[d([{name:"Long Feedback",feedback:"This is an example of a very long feedback that tests how the component handles extensive text content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",designation:"Verbose Client",rating:4},...m])];r.parameters={docs:{description:{story:"Shows how the component handles very long feedback text."}}};var h,u,b;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:"() => <Feedbacks />",...(b=(u=i.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};var g,f,k,y,w;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:"() => <Feedbacks />",...(k=(f=o.parameters)==null?void 0:f.docs)==null?void 0:k.source},description:{story:`Shows how the component handles having only a single feedback item.
The grid layout should adjust accordingly.`,...(w=(y=o.parameters)==null?void 0:y.docs)==null?void 0:w.description}}};var x,v,T,C,F;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:"() => <Feedbacks />",...(T=(v=a.parameters)==null?void 0:v.docs)==null?void 0:T.source},description:{story:`Empty state shows what happens when there are no feedbacks available.
The component should simply not render anything per the implementation.`,...(F=(C=a.parameters)==null?void 0:C.docs)==null?void 0:F.description}}};var S,P,B,D,E;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:"() => <Feedbacks />",...(B=(P=n.parameters)==null?void 0:P.docs)==null?void 0:B.source},description:{story:`## Component Usage

\`\`\`jsx
import Feedbacks from '../containers/Feedbacks';
import PortfolioContext from '@context/PortfolioContext';

function App() {
  const portfolioData = {
    feedbacks: [
      {
        name: "John Smith",
        feedback: "Great developer!",
        designation: "CTO",
        rating: 5
      }
    ]
  };
  
  return (
    <PortfolioContext.Provider value={portfolioData}>
      <Feedbacks />
    </PortfolioContext.Provider>
  );
}
\`\`\`

## Context Requirements

| Context Path | Type | Description |
|------|------|-------------|
| feedbacks | array | Array of feedback objects with name, feedback, designation (optional), rating (optional), and avatar (optional) |

## Accessibility

This component follows these accessibility best practices:
- Uses semantic heading hierarchy for section title
- Provides proper ARIA attributes for star ratings
- Ensures keyboard navigability through feedback items
- Has appropriate color contrast for readability

## Responsiveness

The feedback grid automatically adjusts to different screen sizes:
- Desktop: Multiple columns of feedback cards
- Mobile: Single column of stacked cards`,...(E=(D=n.parameters)==null?void 0:D.docs)==null?void 0:E.description}}};var M,W,q;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:"() => <Feedbacks />",...(q=(W=r.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};const ie=["WithMultipleFeedbacks","WithSingleFeedback","EmptyState","Mobile","LongContent"];export{a as EmptyState,r as LongContent,n as Mobile,i as WithMultipleFeedbacks,o as WithSingleFeedback,ie as __namedExportsOrder,se as default};
