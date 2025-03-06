import{a,j as M}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{d as A,e as E,l as G,m as W,n as C,o as V,p as Y,q as $}from"./index-LaBibFJR.js";import{w as z,e as o,u as f}from"./index-DZ0MIZXx.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";const B=({links:e,variant:r="default"})=>M("div",{className:`social-links ${r==="dark"?"dark-theme":""}`,children:[e.github&&a("a",{className:"social-link-button",href:e.github,target:"_blank",rel:"noopener noreferrer","aria-label":"GitHub Profile",children:a(A,{className:"social-icon"})}),e.linkedin&&a("a",{className:"social-link-button",href:e.linkedin,target:"_blank",rel:"noopener noreferrer","aria-label":"LinkedIn Profile",children:a(E,{className:"social-icon"})}),e.twitter&&a("a",{className:"social-link-button",href:e.twitter,target:"_blank",rel:"noopener noreferrer","aria-label":"Twitter Profile",children:a(G,{className:"social-icon"})}),e.medium&&a("a",{className:"social-link-button",href:e.medium,target:"_blank",rel:"noopener noreferrer","aria-label":"Medium Profile",children:a(W,{className:"social-icon"})}),e.dev&&a("a",{className:"social-link-button",href:e.dev,target:"_blank",rel:"noopener noreferrer","aria-label":"Dev.to Profile",children:a(C,{className:"social-icon"})}),e.stackoverflow&&a("a",{className:"social-link-button",href:e.stackoverflow,target:"_blank",rel:"noopener noreferrer","aria-label":"Stack Overflow Profile",children:a(V,{className:"social-icon"})}),e.youtube&&a("a",{className:"social-link-button",href:e.youtube,target:"_blank",rel:"noopener noreferrer","aria-label":"YouTube Channel",children:a(Y,{className:"social-icon"})}),e.instagram&&a("a",{className:"social-link-button",href:e.instagram,target:"_blank",rel:"noopener noreferrer","aria-label":"Instagram Profile",children:a($,{className:"social-icon"})})]}),n={default:{github:"https://github.com/username",linkedin:"https://www.linkedin.com/in/username"},complete:{github:"https://github.com/username",linkedin:"https://www.linkedin.com/in/username",twitter:"https://twitter.com/username",medium:"https://medium.com/@username",dev:"https://dev.to/username",stackoverflow:"https://stackoverflow.com/users/123456/username",youtube:"https://youtube.com/c/username",instagram:"https://instagram.com/username"},minimal:{github:"https://github.com/username"}},Z={title:"Molecules/SocialLinks",component:B,tags:["autodocs"],argTypes:{links:{control:"object",description:"Object containing social media platform links"},variant:{control:"select",options:["default","dark"],description:"Visual style variant of the social links"}},parameters:{docs:{description:{component:"Social Links component for displaying social media profile links with icons. Supports multiple platforms and can be extended to include additional platforms."}},a11y:{config:{rules:[{id:"button-name",reviewOnFail:!0},{id:"color-contrast",reviewOnFail:!0},{id:"aria-allowed-attr",reviewOnFail:!0}]}}}},l={args:{links:n.default,variant:"default"}};l.play=async({canvasElement:e,step:r})=>{const t=z(e);await r("Initial render check",()=>{const p=t.getByLabelText("GitHub Profile"),u=t.getByLabelText("LinkedIn Profile");o(p).toBeInTheDocument(),o(u).toBeInTheDocument(),o(p).toHaveAttribute("href",n.default.github),o(u).toHaveAttribute("href",n.default.linkedin)}),await r("Keyboard navigation test",async()=>{await f.tab();const p=t.getByLabelText("GitHub Profile");o(p).toHaveFocus(),await f.tab();const u=t.getByLabelText("LinkedIn Profile");o(u).toHaveFocus()})};const c={args:{links:n.complete,variant:"default"}};c.parameters={docs:{description:{story:"Displays social media links for all supported platforms including GitHub, LinkedIn, Twitter, Medium, Dev.to, Stack Overflow, YouTube, and Instagram."}}};const d={args:{links:n.minimal,variant:"default"}};d.parameters={docs:{description:{story:"Shows how the component appears when only a single social media platform is used."}}};const m={args:{links:n.default,variant:"dark"}};m.parameters={docs:{description:{story:"Demonstrates the social links with a dark background, useful for footer sections or dark-themed pages."}},backgrounds:{default:"dark"}};const q=()=>{const e={};for(let r=0;r<5;r++)Object.keys(n.complete).forEach(t=>{e[`${t}${r}`]=n.complete[t]});return e},s=()=>a("div",{style:{maxWidth:"400px",padding:"20px",background:"#f8f9fa",border:"1px dashed #ccc"},children:a(B,{links:q(),variant:"default"})});s.parameters={docs:{description:{story:"Tests how the component handles many social links in a constrained width container, demonstrating wrapping behavior."}}};const i={args:{links:n.complete,variant:"default"}};i.parameters={viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Shows how the social links appear on mobile devices with smaller icons and spacing."}}};s.__docgenInfo={description:"",methods:[],displayName:"WrappingBehavior"};var h,k,b;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    links: sampleLinks.default,
    variant: 'default'
  }
}`,...(b=(k=l.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var g,v,w;c.parameters={...c.parameters,docs:{...(g=c.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    links: sampleLinks.complete,
    variant: 'default'
  }
}`,...(w=(v=c.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var y,L,S;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    links: sampleLinks.minimal,
    variant: 'default'
  }
}`,...(S=(L=d.parameters)==null?void 0:L.docs)==null?void 0:S.source}}};var x,N,T;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    links: sampleLinks.default,
    variant: 'dark'
  }
}`,...(T=(N=m.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var P,F,I;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`() => <div style={{
  maxWidth: '400px',
  padding: '20px',
  background: '#f8f9fa',
  border: '1px dashed #ccc'
}}>
    <StorySocialLinks links={createManyLinks()} variant="default" />
  </div>`,...(I=(F=s.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};var _,j,D,H,O;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    links: sampleLinks.complete,
    variant: 'default'
  }
}`,...(D=(j=i.parameters)==null?void 0:j.docs)==null?void 0:D.source},description:{story:`## Component Usage

\`\`\`jsx
import SocialLinks from '@molecules/SocialLinks';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <h3>Connect with me</h3>
        <SocialLinks />
      </div>
    </footer>
  );
}
\`\`\`

The component uses social media links defined in the portfolio.js file:

\`\`\`javascript
// In portfolio.js
export const socialLinks = {
  github: "https://github.com/username",
  linkedin: "https://www.linkedin.com/in/username",
  twitter: "https://twitter.com/username",
  // Add more platforms as needed
};
\`\`\`

## Accessibility Features

- Each social link has an appropriate aria-label for screen reader users
- Links have proper focus styling for keyboard navigation
- High color contrast for icon visibility
- Proper use of semantic HTML elements
- Icon-only links are supplemented with descriptive text for screen readers

## Customization Options

The component can be customized by:

- Adding or removing social media platforms in the portfolio.js file
- Styling through the SocialLinks.css file
- Enhancing with additional icons from the react-icons library
- Placing in various containers (footer, header, sidebar, etc.)`,...(O=(H=i.parameters)==null?void 0:H.docs)==null?void 0:O.description}}};const ee=["Default","AllPlatforms","SinglePlatform","DarkTheme","WrappingBehavior","MobileView"];export{c as AllPlatforms,m as DarkTheme,l as Default,i as MobileView,d as SinglePlatform,s as WrappingBehavior,ee as __namedExportsOrder,Z as default};
