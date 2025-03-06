import{a as c,j as v}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import{R as H}from"./index-B6-Y_Zgq.js";import{N as I}from"./Navigation-BbhDlWTa.js";import{w as K,e as h,u as _}from"./index-DZ0MIZXx.js";import{w as F}from"./decorators-DZYmSUt9.js";import"./PortfolioContext-CM91bWnU.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./mockData-Bv86VHFx.js";import"./index-Co38GRlK.js";const W={title:"Molecules/Navigation",component:I,tags:["autodocs"],decorators:[F],parameters:{docs:{description:{component:"Navigation component for the site header. Handles scroll behavior, branding, and provides a responsive design that adapts to different device sizes."}},a11y:{config:{rules:[{id:"aria-roles",enabled:!0},{id:"button-name",enabled:!0},{id:"color-contrast",enabled:!0}]}},layout:"fullscreen"}},m=(e=100)=>{global.window.scrollY=e,global.window.dispatchEvent(new Event("scroll"))},l=e=>v("div",{style:{background:"linear-gradient(#4286f4, #373B44)",height:"100vh",width:"100%",padding:"0",position:"relative"},children:[c(e,{}),v("div",{style:{padding:"100px 20px",color:"white"},children:[c("h2",{children:"Scroll down to see navigation behavior"}),c("p",{children:"The navigation will change appearance on scroll"}),Array(10).fill(0).map((a,o)=>v("p",{children:["Scroll content ",o+1]},o))]})]}),p=e=>c(I,{...e}),t=p.bind({});t.decorators=[l];t.play=async({canvasElement:e,step:a})=>{const o=K(e);await a("Initial render check",async()=>{const g=o.getByRole("navigation");await h(g).toBeInTheDocument();const u=o.getByText("Derek Mackley");await h(u).toBeInTheDocument()})};const r=p.bind({});r.decorators=[l,e=>(H.useEffect(()=>(m(200),()=>m(0)),[]),c(e,{}))];r.parameters={docs:{description:{story:"Navigation appearance changes when the user scrolls down the page."}}};const n=p.bind({});n.decorators=[l,e=>(H.useEffect(()=>{m(300);const a=new Event("scroll");return global.window.scrollY=400,global.window.dispatchEvent(a),()=>m(0)},[]),c(e,{}))];n.parameters={docs:{description:{story:"Navigation hides when the user scrolls down quickly."}}};const i=p.bind({});i.decorators=[l];i.parameters={viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Navigation displayed on mobile devices with a hamburger menu for navigation links."}}};const s=p.bind({});s.decorators=[l];s.play=async({canvasElement:e,step:a})=>{const o=K(e);await a("Focus navigation with keyboard",async()=>{await _.tab();const g=o.getByRole("navigation"),u=document.activeElement;await h(g.contains(u)).toBeTruthy()})};const d=()=>null;d.parameters={docs:{source:{code:"This is documentation only"},description:{story:`
## Component Usage

\`\`\`jsx
import Navigation from '@molecules/Navigation';
import { PortfolioProvider } from '@context/PortfolioContext';

function App() {
  return (
    <PortfolioProvider>
      <Navigation />
      <main>
        // Main content would go here
      </main>
    </PortfolioProvider>
  );
}
\`\`\`

## Context Dependencies

This component depends on data from the PortfolioContext through the useNavigation hook:

| Data | Description |
|------|-------------|
| greetings.name | The name displayed in the navigation |

## Accessibility Features

This component implements these accessibility best practices:
- Semantic HTML with appropriate header and navigation elements
- ARIA roles and labels for navigation and buttons
- Keyboard navigation with focus management
- Escape key support for closing menus
- Focus trap for modal navigation on mobile devices

## Behavior Enhancements

The navigation includes several enhanced behaviors:
- Transparent to solid background transition on scroll
- Auto-hide on scroll down, reveal on scroll up
- Mobile-responsive design with hamburger menu
- Keyboard navigation support
      `}}};var b,w,f;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:"args => <Navigation {...args} />",...(f=(w=t.parameters)==null?void 0:w.docs)==null?void 0:f.source}}};var y,N,x;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:"args => <Navigation {...args} />",...(x=(N=r.parameters)==null?void 0:N.docs)==null?void 0:x.source}}};var T,E,S;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:"args => <Navigation {...args} />",...(S=(E=n.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var k,D,B;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:"args => <Navigation {...args} />",...(B=(D=i.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};var P,M,A;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:"args => <Navigation {...args} />",...(A=(M=s.parameters)==null?void 0:M.docs)==null?void 0:A.source}}};var C,R,j;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:"() => null",...(j=(R=d.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};const X=["Default","Scrolled","Hidden","Mobile","KeyboardNavigation","Documentation"];export{t as Default,d as Documentation,n as Hidden,s as KeyboardNavigation,i as Mobile,r as Scrolled,X as __namedExportsOrder,W as default};
