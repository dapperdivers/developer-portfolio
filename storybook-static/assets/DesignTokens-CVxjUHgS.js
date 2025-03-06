import{j as r}from"./jsx-runtime-BuIwgEqq.js";import{useMDXComponents as d}from"./index-BAciIf_w.js";import{M as a,C as o,a as i,T as t}from"./index-B54zaP-n.js";import"./index-B6-Y_Zgq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-hKvExgqn.js";import"./index-frfLogi_.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";function l(e){const n={code:"code",div:"div",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...d(),...e.components};return r.jsxs(r.Fragment,{children:[r.jsx(a,{title:"Design System/Design Tokens"}),`
`,r.jsx(n.h1,{id:"design-tokens",children:"Design Tokens"}),`
`,r.jsx(n.p,{children:"Design tokens are the visual design atoms of the design system—specifically, they are named entities that store visual design attributes. These are used in place of hard-coded values to ensure flexibility and consistency across the portfolio."}),`
`,r.jsx(n.h2,{id:"color-system",children:"Color System"}),`
`,r.jsx(n.h3,{id:"primary-colors",children:"Primary Colors"}),`
`,r.jsxs(o,{children:[r.jsx(i,{title:"Primary Colors",subtitle:"Main brand colors",colors:{Primary:"var(--color-primary)","Primary Light":"var(--color-primary-light)","Primary Dark":"var(--color-primary-dark)"}}),r.jsx(i,{title:"Secondary Colors",subtitle:"Supporting colors",colors:{Secondary:"var(--color-secondary)","Secondary Light":"var(--color-secondary-light)","Secondary Dark":"var(--color-secondary-dark)",Accent:"var(--color-accent)"}})]}),`
`,r.jsx(n.h3,{id:"semantic-colors",children:"Semantic Colors"}),`
`,r.jsx(o,{children:r.jsx(i,{title:"Semantic Colors",subtitle:"Colors with specific meanings",colors:{Success:"var(--color-success)",Info:"var(--color-info)",Warning:"var(--color-warning)",Danger:"var(--color-danger)"}})}),`
`,r.jsx(n.h3,{id:"neutral-colors",children:"Neutral Colors"}),`
`,r.jsx(o,{children:r.jsx(i,{title:"Gray Scale",subtitle:"Neutral colors for text, backgrounds, and borders",colors:{White:"var(--color-white)","Gray 100":"var(--color-gray-100)","Gray 200":"var(--color-gray-200)","Gray 300":"var(--color-gray-300)","Gray 400":"var(--color-gray-400)","Gray 500":"var(--color-gray-500)","Gray 600":"var(--color-gray-600)","Gray 700":"var(--color-gray-700)","Gray 800":"var(--color-gray-800)","Gray 900":"var(--color-gray-900)",Black:"var(--color-black)"}})}),`
`,r.jsx(n.h3,{id:"semantic-usage",children:"Semantic Usage"}),`
`,r.jsx(o,{children:r.jsx(i,{title:"Semantic Usage",subtitle:"Contextual color usage",colors:{Text:"var(--color-text)","Text Muted":"var(--color-text-muted)",Link:"var(--color-link)","Link Hover":"var(--color-link-hover)",Border:"var(--color-border)",Background:"var(--color-background)","Background Alt":"var(--color-background-alt)","Background Muted":"var(--color-background-muted)"}})}),`
`,r.jsx(n.h2,{id:"typography",children:"Typography"}),`
`,r.jsx(n.h3,{id:"font-families",children:"Font Families"}),`
`,r.jsxs(n.ul,{children:[`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Base Font"}),": ",r.jsx(n.code,{children:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'})]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Heading Font"}),": Same as base font"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Monospace Font"}),": ",r.jsx(n.code,{children:'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'})]}),`
`]}),`
`,r.jsx(n.h3,{id:"font-sizes",children:"Font Sizes"}),`
`,r.jsx(t,{fontSizes:["0.875rem","1rem","1.25rem","1.5rem","1.75rem","2rem","2.5rem"],fontWeight:400,sampleText:"The quick brown fox jumps over the lazy dog"}),`
`,r.jsx(n.h3,{id:"font-weights",children:"Font Weights"}),`
`,r.jsxs(n.ul,{children:[`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Light"}),": 300"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Regular"}),": 400"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Medium"}),": 500"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Bold"}),": 700"]}),`
`]}),`
`,r.jsx(n.p,{children:"Example with different weights:"}),`
`,r.jsxs("div",{style:{fontFamily:"var(--font-family-base)"},children:[r.jsx("div",{style:{fontWeight:"var(--font-weight-light)"},children:"Light (300): The quick brown fox jumps over the lazy dog"}),r.jsx("div",{style:{fontWeight:"var(--font-weight-normal)"},children:"Regular (400): The quick brown fox jumps over the lazy dog"}),r.jsx("div",{style:{fontWeight:"var(--font-weight-medium)"},children:"Medium (500): The quick brown fox jumps over the lazy dog"}),r.jsx("div",{style:{fontWeight:"var(--font-weight-bold)"},children:"Bold (700): The quick brown fox jumps over the lazy dog"})]}),`
`,r.jsx(n.h3,{id:"line-heights",children:"Line Heights"}),`
`,r.jsxs(n.ul,{children:[`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Tight"}),": 1.2"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Base"}),": 1.5"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Loose"}),": 1.8"]}),`
`]}),`
`,r.jsx(n.h2,{id:"spacing",children:"Spacing"}),`
`,r.jsx(n.p,{children:"Our spacing system is based on a 0.25rem (4px) scale."}),`
`,r.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"20px",marginTop:"20px"},children:[0,1,2,3,4,5,6,7,8,9,10].map(s=>r.jsxs(n.div,{style:{display:"flex",alignItems:"center"},children:[r.jsx(n.div,{style:{width:`${s*.25}rem`,height:"20px",backgroundColor:"var(--color-primary)",marginRight:"10px"}}),r.jsxs(n.code,{children:["--spacing-",s,": ",s===0?"0":`${s*.25}rem`]})]},s))}),`
`,r.jsx(n.h3,{id:"semantic-spacing",children:"Semantic Spacing"}),`
`,r.jsxs(n.ul,{children:[`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Section Padding (Y)"}),": 3rem (--spacing-8)"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Container Padding (X)"}),": 1rem (--spacing-4)"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Card Padding"}),": 1rem (--spacing-4)"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Button Padding (X)"}),": 1rem (--spacing-4)"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Button Padding (Y)"}),": 0.5rem (--spacing-2)"]}),`
`]}),`
`,r.jsx(n.h2,{id:"borders",children:"Borders"}),`
`,r.jsx(n.h3,{id:"border-widths",children:"Border Widths"}),`
`,r.jsxs(n.ul,{children:[`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Thin"}),": 1px"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Medium"}),": 2px"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Thick"}),": 4px"]}),`
`]}),`
`,r.jsx(n.h3,{id:"border-radius",children:"Border Radius"}),`
`,r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px",marginTop:"20px"},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[r.jsx("div",{style:{width:"100px",height:"40px",backgroundColor:"var(--color-primary)",borderRadius:"var(--border-radius-sm)"}}),r.jsx("code",{children:"--border-radius-sm: 0.2rem"})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[r.jsx("div",{style:{width:"100px",height:"40px",backgroundColor:"var(--color-primary)",borderRadius:"var(--border-radius)"}}),r.jsx("code",{children:"--border-radius: 0.25rem"})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[r.jsx("div",{style:{width:"100px",height:"40px",backgroundColor:"var(--color-primary)",borderRadius:"var(--border-radius-lg)"}}),r.jsx("code",{children:"--border-radius-lg: 0.5rem"})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[r.jsx("div",{style:{width:"100px",height:"40px",backgroundColor:"var(--color-primary)",borderRadius:"var(--border-radius-xl)"}}),r.jsx("code",{children:"--border-radius-xl: 1rem"})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[r.jsx("div",{style:{width:"100px",height:"40px",backgroundColor:"var(--color-primary)",borderRadius:"var(--border-radius-pill)"}}),r.jsx("code",{children:"--border-radius-pill: 50rem"})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[r.jsx("div",{style:{width:"50px",height:"50px",backgroundColor:"var(--color-primary)",borderRadius:"var(--border-radius-circle)"}}),r.jsx("code",{children:"--border-radius-circle: 50%"})]})]}),`
`,r.jsx(n.h2,{id:"shadows",children:"Shadows"}),`
`,r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"30px",marginTop:"20px"},children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[r.jsx("div",{style:{width:"150px",height:"60px",backgroundColor:"white",boxShadow:"var(--box-shadow-sm)",display:"flex",alignItems:"center",justifyContent:"center"},children:"Small Shadow"}),r.jsx("code",{children:"--box-shadow-sm"})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[r.jsx("div",{style:{width:"150px",height:"60px",backgroundColor:"white",boxShadow:"var(--box-shadow)",display:"flex",alignItems:"center",justifyContent:"center"},children:"Regular Shadow"}),r.jsx("code",{children:"--box-shadow"})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[r.jsx("div",{style:{width:"150px",height:"60px",backgroundColor:"white",boxShadow:"var(--box-shadow-lg)",display:"flex",alignItems:"center",justifyContent:"center"},children:"Large Shadow"}),r.jsx("code",{children:"--box-shadow-lg"})]}),r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[r.jsx("div",{style:{width:"150px",height:"60px",backgroundColor:"white",boxShadow:"var(--box-shadow-focus)",display:"flex",alignItems:"center",justifyContent:"center"},children:"Focus Shadow"}),r.jsx("code",{children:"--box-shadow-focus"})]})]}),`
`,r.jsx(n.h2,{id:"transitions",children:"Transitions"}),`
`,r.jsxs(n.ul,{children:[`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Base"}),": all 0.2s ease-in-out"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Slow"}),": all 0.3s ease-in-out"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Fast"}),": all 0.1s ease-in-out"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Fade"}),": opacity 0.15s linear"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Transform"}),": transform 0.2s ease-in-out"]}),`
`]}),`
`,r.jsx(n.h2,{id:"breakpoints",children:"Breakpoints"}),`
`,r.jsxs(n.ul,{children:[`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"XS"}),": 0 (default)"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"SM"}),": 576px"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"MD"}),": 768px"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"LG"}),": 992px"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"XL"}),": 1200px"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"XXL"}),": 1400px"]}),`
`]}),`
`,r.jsx(n.h2,{id:"z-index",children:"Z-index"}),`
`,r.jsxs(n.ul,{children:[`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Negative"}),": -1"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Zero"}),": 0"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Dropdown"}),": 1000"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Sticky"}),": 1020"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Fixed"}),": 1030"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Modal Backdrop"}),": 1040"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Modal"}),": 1050"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Popover"}),": 1060"]}),`
`,r.jsxs(n.li,{children:[r.jsx(n.strong,{children:"Toast"}),": 1070"]}),`
`]}),`
`,r.jsx(n.h2,{id:"using-design-tokens-in-css",children:"Using Design Tokens in CSS"}),`
`,r.jsx(n.pre,{children:r.jsx(n.code,{className:"language-css",children:`.my-component {
  /* Use design tokens for consistent styles */
  color: var(--color-text);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-4);
  padding: var(--spacing-2) var(--spacing-4);
  border: var(--border-width-thin) solid var(--color-border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow-sm);
  transition: var(--transition-base);
}

.my-component:hover {
  box-shadow: var(--box-shadow);
  border-color: var(--color-primary);
}

/* For responsiveness */
@media (min-width: var(--breakpoint-md)) {
  .my-component {
    font-size: var(--font-size-lg);
    padding: var(--spacing-3) var(--spacing-5);
  }
}
`})}),`
`,r.jsx(n.h2,{id:"using-design-tokens-in-javascript",children:"Using Design Tokens in JavaScript"}),`
`,r.jsx(n.pre,{children:r.jsx(n.code,{className:"language-jsx",children:`import React from 'react';

// Using CSS modules or class names
function StyledComponent() {
  // These classes would be defined in your CSS files
  return (
    <div className="styled-component">
      Component with CSS classes that use design tokens
    </div>
  );
}

// Or with inline styles
function InlineStyleComponent() {
  return (
    <div style={{ 
      color: 'var(--color-text)',
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-base)',
      marginBottom: 'var(--spacing-4)'
      // ... and so on
    }}>
      Component Content
    </div>
  );
}
`})})]})}function v(e={}){const{wrapper:n}={...d(),...e.components};return n?r.jsx(n,{...e,children:r.jsx(l,{...e})}):l(e)}export{v as default};
