import"./index-B6-Y_Zgq.js";import{F as N}from"./FeedbackCard-B8QmyUa1.js";import{w as O,e as t,u}from"./index-DZ0MIZXx.js";import"./_commonjsHelpers-CqkleIqs.js";import"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./jsx-runtime-BuIwgEqq.js";import"./index-Co38GRlK.js";import"./index-LaBibFJR.js";import"./Card-piHSsVOW.js";import"./proxy-Vqfb2hit.js";import"./ResponsiveImage-DeSVJz96.js";import"./useIntersectionObserver-D-75sPdH.js";/* empty css                 */const e={default:{name:"John Doe",feedback:"Working with this developer was a fantastic experience. Their attention to detail and technical expertise was impressive.",designation:"Project Manager",rating:5},withImage:{name:"Jane Smith",feedback:"The developer delivered a high-quality application within the deadline. Very professional and responsive throughout the project.",designation:"CTO",rating:5,avatar:"https://randomuser.me/api/portraits/women/44.jpg"},longContent:{name:"Robert Johnson",feedback:"I've worked with many developers over the years, but this experience was truly exceptional. The attention to detail, clear communication, and problem-solving skills demonstrated throughout our project were outstanding. Not only was the work completed on time, but the quality exceeded our expectations. I especially appreciated how proactive the developer was in suggesting improvements and identifying potential issues before they became problems. I would absolutely recommend this developer to anyone looking for high-quality work and will definitely be hiring them for future projects.",designation:"Senior Product Manager",rating:5},lowRating:{name:"Michael Brown",feedback:"The work was completed on time, but there were some issues with the implementation that required additional revisions.",designation:"Product Owner",rating:3}},X={title:"Molecules/FeedbackCard",component:N,tags:["autodocs"],argTypes:{data:{control:"object",description:"Feedback data object containing name, feedback text, optional avatar, designation and rating"},index:{control:"number",description:"Index number for staggered animations",defaultValue:0}},parameters:{docs:{description:{component:"Feedback card component for displaying testimonials with ratings and author information."}},a11y:{config:{rules:[{id:"color-contrast",reviewOnFail:!0},{id:"nested-interactive",reviewOnFail:!0},{id:"label-content-name-mismatch",reviewOnFail:!0}]}},layout:"padded"}},i={args:{data:e.default,index:0}};i.play=async({canvasElement:m,step:l})=>{const a=O(m);await l("Initial render check",async()=>{await t(a.getByText(e.default.feedback)).toBeInTheDocument(),await t(a.getByText(e.default.name)).toBeInTheDocument(),await t(a.getByText(e.default.designation)).toBeInTheDocument();const n=a.getAllByText("",{selector:".star"});await t(n.length).toBe(5)}),await l("Keyboard navigation test",async()=>{await u.tab();const n=a.getByText(e.default.feedback);await t(n).toHaveFocus(),await u.tab();const p=a.getByText(e.default.name);await t(p).toHaveFocus(),await u.tab();const g=a.getByText(e.default.designation);await t(g).toHaveFocus()})};const s={args:{data:e.withImage,index:1}};s.parameters={docs:{description:{story:"Displays a feedback card with a custom avatar image."}}};const d={args:{data:e.longContent,index:2}};d.parameters={docs:{description:{story:"Shows how the component handles lengthy feedback content with automatic scrolling."}}};const r={args:{data:e.lowRating,index:3}};r.parameters={docs:{description:{story:"Displays a feedback card with a partial rating (3 out of 5 stars)."}}};r.play=async({canvasElement:m,step:l})=>{const a=O(m);await l("Rating verification",async()=>{const n=a.getAllByText("",{selector:".star"});await t(n.length).toBe(5);const p=n.filter(g=>window.getComputedStyle(g).color!=="rgb(224, 224, 224)");await t(p.length).toBe(3)})};const c={args:{data:e.default,index:0}};c.parameters={docs:{description:{story:"Demonstrates the animated entry of the feedback card when it comes into view."}},chromatic:{disable:!0}};const o={args:{data:e.default,index:0}};o.parameters={viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Shows how the feedback card responds to smaller screen sizes."}}};var h,b,f;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    data: mockFeedbackData.default,
    index: 0
  }
}`,...(f=(b=i.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var w,y,k;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    data: mockFeedbackData.withImage,
    index: 1
  }
}`,...(k=(y=s.parameters)==null?void 0:y.docs)==null?void 0:k.source}}};var v,x,F;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    data: mockFeedbackData.longContent,
    index: 2
  }
}`,...(F=(x=d.parameters)==null?void 0:x.docs)==null?void 0:F.source}}};var T,D,C;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    data: mockFeedbackData.lowRating,
    index: 3
  }
}`,...(C=(D=r.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};var B,S,I;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    data: mockFeedbackData.default,
    index: 0
  }
}`,...(I=(S=c.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var R,j,q,A,M;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    data: mockFeedbackData.default,
    index: 0
  }
}`,...(q=(j=o.parameters)==null?void 0:j.docs)==null?void 0:q.source},description:{story:`## Component Usage

\`\`\`jsx
import FeedbackCard from '@molecules/FeedbackCard';

function TestimonialSection() {
  const feedbacks = [
    {
      name: "John Doe",
      feedback: "Great work, very professional!",
      designation: "CTO, Tech Company",
      rating: 5
    },
    // More feedback items...
  ];
  
  return (
    <div className="testimonials-grid">
      {feedbacks.map((feedback, index) => (
        <FeedbackCard 
          key={index} 
          data={feedback} 
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
| data | Object | required | Feedback data object |
| data.name | string | required | Name of the person giving feedback |
| data.feedback | string | required | The feedback text content |
| data.avatar | string | null | URL to avatar image |
| data.designation | string | "Client" | Job title or role |
| data.rating | number | 5 | Rating from 1-5 stars |
| index | number | 0 | Index for staggered animation timing |

## Accessibility Features

- Rating stars have appropriate aria-label
- Quote icons are properly hidden from screen readers
- Interactive elements are keyboard navigable
- Semantic HTML structure
- High color contrast

## Implementation Notes

- Uses intersection observer for entry animations
- Automatically handles missing avatar with a placeholder
- Scrollable container for long content
- Responsive design for different screen sizes`,...(M=(A=o.parameters)==null?void 0:A.docs)==null?void 0:M.description}}};const Y=["Default","WithAvatar","LongContent","PartialRating","AnimatedEntry","MobileView"];export{c as AnimatedEntry,i as Default,d as LongContent,o as MobileView,r as PartialRating,s as WithAvatar,Y as __namedExportsOrder,X as default};
