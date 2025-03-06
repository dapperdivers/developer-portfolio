import{j as r,a as e,F as i}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{T as I,C as t,a as o}from"./index-CDnoKuKi.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BIL_-Lzo.js";import"./index-frfLogi_.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";const G={title:"Design System/Design Tokens",tags:["autodocs"],parameters:{controls:{disable:!0},docs:{description:{component:`
# Design Tokens

Design tokens are the visual design atoms of the design system—specifically, they are named entities that store visual design attributes. These are used in place of hard-coded values to ensure flexibility and consistency across the portfolio.
        `}}}},l={render:()=>r(i,{children:[e("h2",{children:"Color System"}),e("h3",{children:"Primary Colors"}),r(t,{children:[e(o,{title:"Primary Colors",subtitle:"Main brand colors",colors:{Primary:"#0062cc","Primary Light":"#4d8fe6","Primary Dark":"#0050a6"}}),e(o,{title:"Secondary Colors",subtitle:"Supporting colors",colors:{Secondary:"#6c757d","Secondary Light":"#8c959d","Secondary Dark":"#555c64",Accent:"#fd7e14"}})]}),e("h3",{children:"Semantic Colors"}),e(t,{children:e(o,{title:"Semantic Colors",subtitle:"Colors with specific meanings",colors:{Success:"#28a745",Info:"#17a2b8",Warning:"#ffc107",Danger:"#dc3545"}})}),e("h3",{children:"Neutral Colors"}),e(t,{children:e(o,{title:"Gray Scale",subtitle:"Neutral colors for text, backgrounds, and borders",colors:{White:"#ffffff","Gray 100":"#f8f9fa","Gray 200":"#e9ecef","Gray 300":"#dee2e6","Gray 400":"#ced4da","Gray 500":"#adb5bd","Gray 600":"#6c757d","Gray 700":"#495057","Gray 800":"#343a40","Gray 900":"#212529",Black:"#000000"}})}),e("h3",{children:"Semantic Usage"}),e(t,{children:e(o,{title:"Semantic Usage",subtitle:"Contextual color usage",colors:{Text:"#212529","Text Muted":"#6c757d",Link:"#0062cc","Link Hover":"#0050a6",Border:"#dee2e6",Background:"#ffffff","Background Alt":"#f8f9fa","Background Muted":"#e9ecef"}})})]})},a={render:()=>r(i,{children:[e("h2",{children:"Typography"}),e("h3",{children:"Font Families"}),r("ul",{children:[r("li",{children:[e("strong",{children:"Base Font"}),": ",e("code",{children:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'})]}),r("li",{children:[e("strong",{children:"Heading Font"}),": Same as base font"]}),r("li",{children:[e("strong",{children:"Monospace Font"}),": ",e("code",{children:'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'})]})]}),e("h3",{children:"Font Sizes"}),e(I,{fontSizes:["0.875rem","1rem","1.25rem","1.5rem","1.75rem","2rem","2.5rem"],fontWeight:400,sampleText:"The quick brown fox jumps over the lazy dog"}),e("h3",{children:"Font Weights"}),r("ul",{children:[r("li",{children:[e("strong",{children:"Light"}),": 300"]}),r("li",{children:[e("strong",{children:"Regular"}),": 400"]}),r("li",{children:[e("strong",{children:"Medium"}),": 500"]}),r("li",{children:[e("strong",{children:"Bold"}),": 700"]})]}),r("div",{style:{fontFamily:"var(--font-family-base)"},children:[e("div",{style:{fontWeight:"var(--font-weight-light)"},children:"Light (300): The quick brown fox jumps over the lazy dog"}),e("div",{style:{fontWeight:"var(--font-weight-normal)"},children:"Regular (400): The quick brown fox jumps over the lazy dog"}),e("div",{style:{fontWeight:"var(--font-weight-medium)"},children:"Medium (500): The quick brown fox jumps over the lazy dog"}),e("div",{style:{fontWeight:"var(--font-weight-bold)"},children:"Bold (700): The quick brown fox jumps over the lazy dog"})]}),e("h3",{children:"Line Heights"}),r("ul",{children:[r("li",{children:[e("strong",{children:"Tight"}),": 1.2"]}),r("li",{children:[e("strong",{children:"Base"}),": 1.5"]}),r("li",{children:[e("strong",{children:"Loose"}),": 1.8"]})]})]})},s={render:()=>r(i,{children:[e("h2",{children:"Spacing"}),e("p",{children:"Our spacing system is based on a 0.25rem (4px) scale."}),e("div",{style:{display:"flex",flexDirection:"column",gap:"20px",marginTop:"20px"},children:[0,1,2,3,4,5,6,7,8,9,10].map(n=>r("div",{style:{display:"flex",alignItems:"center"},children:[e("div",{style:{width:`${n*.25}rem`,height:"20px",backgroundColor:"var(--color-primary)",marginRight:"10px"}}),r("code",{children:["--spacing-",n,": ",n===0?"0":`${n*.25}rem`]})]},n))}),e("h3",{children:"Semantic Spacing"}),r("ul",{children:[r("li",{children:[e("strong",{children:"Section Padding (Y)"}),": 3rem (--spacing-8)"]}),r("li",{children:[e("strong",{children:"Container Padding (X)"}),": 1rem (--spacing-4)"]}),r("li",{children:[e("strong",{children:"Card Padding"}),": 1rem (--spacing-4)"]}),r("li",{children:[e("strong",{children:"Button Padding (X)"}),": 1rem (--spacing-4)"]}),r("li",{children:[e("strong",{children:"Button Padding (Y)"}),": 0.5rem (--spacing-2)"]})]})]})},d={render:()=>r(i,{children:[e("h2",{children:"Borders"}),e("h3",{children:"Border Widths"}),r("ul",{children:[r("li",{children:[e("strong",{children:"Thin"}),": 1px"]}),r("li",{children:[e("strong",{children:"Medium"}),": 2px"]}),r("li",{children:[e("strong",{children:"Thick"}),": 4px"]})]}),e("h3",{children:"Border Radius"}),r("div",{style:{display:"flex",flexDirection:"column",gap:"20px",marginTop:"20px"},children:[r("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("div",{style:{width:"100px",height:"40px",backgroundColor:"var(--color-primary)",borderRadius:"var(--border-radius-sm)"}}),e("code",{children:"--border-radius-sm: 0.2rem"})]}),r("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("div",{style:{width:"100px",height:"40px",backgroundColor:"var(--color-primary)",borderRadius:"var(--border-radius)"}}),e("code",{children:"--border-radius: 0.25rem"})]}),r("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("div",{style:{width:"100px",height:"40px",backgroundColor:"var(--color-primary)",borderRadius:"var(--border-radius-lg)"}}),e("code",{children:"--border-radius-lg: 0.5rem"})]}),r("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("div",{style:{width:"100px",height:"40px",backgroundColor:"var(--color-primary)",borderRadius:"var(--border-radius-xl)"}}),e("code",{children:"--border-radius-xl: 1rem"})]}),r("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("div",{style:{width:"100px",height:"40px",backgroundColor:"var(--color-primary)",borderRadius:"var(--border-radius-pill)"}}),e("code",{children:"--border-radius-pill: 50rem"})]}),r("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e("div",{style:{width:"50px",height:"50px",backgroundColor:"var(--color-primary)",borderRadius:"var(--border-radius-circle)"}}),e("code",{children:"--border-radius-circle: 50%"})]})]})]})},c={render:()=>r(i,{children:[e("h2",{children:"Shadows"}),r("div",{style:{display:"flex",flexDirection:"column",gap:"30px",marginTop:"20px"},children:[r("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[e("div",{style:{width:"150px",height:"60px",backgroundColor:"white",boxShadow:"var(--box-shadow-sm)",display:"flex",alignItems:"center",justifyContent:"center"},children:"Small Shadow"}),e("code",{children:"--box-shadow-sm"})]}),r("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[e("div",{style:{width:"150px",height:"60px",backgroundColor:"white",boxShadow:"var(--box-shadow)",display:"flex",alignItems:"center",justifyContent:"center"},children:"Regular Shadow"}),e("code",{children:"--box-shadow"})]}),r("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[e("div",{style:{width:"150px",height:"60px",backgroundColor:"white",boxShadow:"var(--box-shadow-lg)",display:"flex",alignItems:"center",justifyContent:"center"},children:"Large Shadow"}),e("code",{children:"--box-shadow-lg"})]}),r("div",{style:{display:"flex",alignItems:"center",gap:"20px"},children:[e("div",{style:{width:"150px",height:"60px",backgroundColor:"white",boxShadow:"var(--box-shadow-focus)",display:"flex",alignItems:"center",justifyContent:"center"},children:"Focus Shadow"}),e("code",{children:"--box-shadow-focus"})]})]}),e("h2",{children:"Transitions"}),r("ul",{children:[r("li",{children:[e("strong",{children:"Base"}),": all 0.2s ease-in-out"]}),r("li",{children:[e("strong",{children:"Slow"}),": all 0.3s ease-in-out"]}),r("li",{children:[e("strong",{children:"Fast"}),": all 0.1s ease-in-out"]}),r("li",{children:[e("strong",{children:"Fade"}),": opacity 0.15s linear"]}),r("li",{children:[e("strong",{children:"Transform"}),": transform 0.2s ease-in-out"]})]}),e("h2",{children:"Breakpoints"}),r("ul",{children:[r("li",{children:[e("strong",{children:"XS"}),": 0 (default)"]}),r("li",{children:[e("strong",{children:"SM"}),": 576px"]}),r("li",{children:[e("strong",{children:"MD"}),": 768px"]}),r("li",{children:[e("strong",{children:"LG"}),": 992px"]}),r("li",{children:[e("strong",{children:"XL"}),": 1200px"]}),r("li",{children:[e("strong",{children:"XXL"}),": 1400px"]})]}),e("h2",{children:"Z-index"}),r("ul",{children:[r("li",{children:[e("strong",{children:"Negative"}),": -1"]}),r("li",{children:[e("strong",{children:"Zero"}),": 0"]}),r("li",{children:[e("strong",{children:"Dropdown"}),": 1000"]}),r("li",{children:[e("strong",{children:"Sticky"}),": 1020"]}),r("li",{children:[e("strong",{children:"Fixed"}),": 1030"]}),r("li",{children:[e("strong",{children:"Modal Backdrop"}),": 1040"]}),r("li",{children:[e("strong",{children:"Modal"}),": 1050"]}),r("li",{children:[e("strong",{children:"Popover"}),": 1060"]}),r("li",{children:[e("strong",{children:"Toast"}),": 1070"]})]}),e("h2",{children:"Using Design Tokens in CSS"}),e("pre",{children:`
.my-component {
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
        `}),e("h2",{children:"Using Design Tokens in JavaScript"}),e("pre",{children:`
import React from 'react';
import styled from 'styled-components';

const StyledComponent = styled.div\`
  color: var(--color-text);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-4);
  /* ... and so on */
\`;

// Or with inline styles
function MyComponent() {
  return (
    <div style={{ 
      color: 'var(--color-text)',
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-base)',
      // ... and so on
    }}>
      Component Content
    </div>
  );
}
        `})]})};var h,g,p;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <>
      <h2>Color System</h2>
      <h3>Primary Colors</h3>
      <ColorPalette>
        <ColorItem title="Primary Colors" subtitle="Main brand colors" colors={{
        'Primary': '#0062cc',
        // Explicit value for Storybook
        'Primary Light': '#4d8fe6',
        // Explicit value for Storybook
        'Primary Dark': '#0050a6' // Explicit value for Storybook
      }} />
        <ColorItem title="Secondary Colors" subtitle="Supporting colors" colors={{
        'Secondary': '#6c757d',
        // Explicit value for Storybook
        'Secondary Light': '#8c959d',
        // Explicit value for Storybook
        'Secondary Dark': '#555c64',
        // Explicit value for Storybook
        'Accent': '#fd7e14' // Explicit value for Storybook
      }} />
      </ColorPalette>

      <h3>Semantic Colors</h3>
      <ColorPalette>
        <ColorItem title="Semantic Colors" subtitle="Colors with specific meanings" colors={{
        'Success': '#28a745',
        // Explicit value for Storybook
        'Info': '#17a2b8',
        // Explicit value for Storybook
        'Warning': '#ffc107',
        // Explicit value for Storybook
        'Danger': '#dc3545' // Explicit value for Storybook
      }} />
      </ColorPalette>

      <h3>Neutral Colors</h3>
      <ColorPalette>
        <ColorItem title="Gray Scale" subtitle="Neutral colors for text, backgrounds, and borders" colors={{
        'White': '#ffffff',
        // Explicit value for Storybook
        'Gray 100': '#f8f9fa',
        // Explicit value for Storybook
        'Gray 200': '#e9ecef',
        // Explicit value for Storybook
        'Gray 300': '#dee2e6',
        // Explicit value for Storybook
        'Gray 400': '#ced4da',
        // Explicit value for Storybook
        'Gray 500': '#adb5bd',
        // Explicit value for Storybook
        'Gray 600': '#6c757d',
        // Explicit value for Storybook
        'Gray 700': '#495057',
        // Explicit value for Storybook
        'Gray 800': '#343a40',
        // Explicit value for Storybook
        'Gray 900': '#212529',
        // Explicit value for Storybook
        'Black': '#000000' // Explicit value for Storybook
      }} />
      </ColorPalette>

      <h3>Semantic Usage</h3>
      <ColorPalette>
        <ColorItem title="Semantic Usage" subtitle="Contextual color usage" colors={{
        'Text': '#212529',
        // Explicit value for Storybook
        'Text Muted': '#6c757d',
        // Explicit value for Storybook
        'Link': '#0062cc',
        // Explicit value for Storybook
        'Link Hover': '#0050a6',
        // Explicit value for Storybook
        'Border': '#dee2e6',
        // Explicit value for Storybook
        'Background': '#ffffff',
        // Explicit value for Storybook
        'Background Alt': '#f8f9fa',
        // Explicit value for Storybook
        'Background Muted': '#e9ecef' // Explicit value for Storybook
      }} />
      </ColorPalette>
    </>
}`,...(p=(g=l.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var m,y,u;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <>
      <h2>Typography</h2>
      
      <h3>Font Families</h3>
      <ul>
        <li><strong>Base Font</strong>: <code>-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, sans-serif</code></li>
        <li><strong>Heading Font</strong>: Same as base font</li>
        <li><strong>Monospace Font</strong>: <code>SFMono-Regular, Menlo, Monaco, Consolas, &quot;Liberation Mono&quot;, &quot;Courier New&quot;, monospace</code></li>
      </ul>
      
      <h3>Font Sizes</h3>
      <Typeset fontSizes={['0.875rem',
    // --font-size-sm
    '1rem',
    // --font-size-base
    '1.25rem',
    // --font-size-lg
    '1.5rem',
    // --font-size-xl
    '1.75rem',
    // --font-size-h3
    '2rem',
    // --font-size-h2
    '2.5rem' // --font-size-h1
    ]} fontWeight={400} sampleText="The quick brown fox jumps over the lazy dog" />
      
      <h3>Font Weights</h3>
      <ul>
        <li><strong>Light</strong>: 300</li>
        <li><strong>Regular</strong>: 400</li>
        <li><strong>Medium</strong>: 500</li>
        <li><strong>Bold</strong>: 700</li>
      </ul>
      
      <div style={{
      fontFamily: 'var(--font-family-base)'
    }}>
        <div style={{
        fontWeight: 'var(--font-weight-light)'
      }}>Light (300): The quick brown fox jumps over the lazy dog</div>
        <div style={{
        fontWeight: 'var(--font-weight-normal)'
      }}>Regular (400): The quick brown fox jumps over the lazy dog</div>
        <div style={{
        fontWeight: 'var(--font-weight-medium)'
      }}>Medium (500): The quick brown fox jumps over the lazy dog</div>
        <div style={{
        fontWeight: 'var(--font-weight-bold)'
      }}>Bold (700): The quick brown fox jumps over the lazy dog</div>
      </div>
      
      <h3>Line Heights</h3>
      <ul>
        <li><strong>Tight</strong>: 1.2</li>
        <li><strong>Base</strong>: 1.5</li>
        <li><strong>Loose</strong>: 1.8</li>
      </ul>
    </>
}`,...(u=(y=a.parameters)==null?void 0:y.docs)==null?void 0:u.source}}};var f,v,x;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <>
      <h2>Spacing</h2>
      <p>Our spacing system is based on a 0.25rem (4px) scale.</p>
      
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginTop: '20px'
    }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => <div key={size} style={{
        display: 'flex',
        alignItems: 'center'
      }}>
            <div style={{
          width: \`\${size * 0.25}rem\`,
          height: '20px',
          backgroundColor: 'var(--color-primary)',
          marginRight: '10px'
        }}></div>
            <code>--spacing-{size}: {size === 0 ? '0' : \`\${size * 0.25}rem\`}</code>
          </div>)}
      </div>
      
      <h3>Semantic Spacing</h3>
      <ul>
        <li><strong>Section Padding (Y)</strong>: 3rem (--spacing-8)</li>
        <li><strong>Container Padding (X)</strong>: 1rem (--spacing-4)</li>
        <li><strong>Card Padding</strong>: 1rem (--spacing-4)</li>
        <li><strong>Button Padding (X)</strong>: 1rem (--spacing-4)</li>
        <li><strong>Button Padding (Y)</strong>: 0.5rem (--spacing-2)</li>
      </ul>
    </>
}`,...(x=(v=s.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var b,S,k;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <>
      <h2>Borders</h2>
      
      <h3>Border Widths</h3>
      <ul>
        <li><strong>Thin</strong>: 1px</li>
        <li><strong>Medium</strong>: 2px</li>
        <li><strong>Thick</strong>: 4px</li>
      </ul>
      
      <h3>Border Radius</h3>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginTop: '20px'
    }}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
          <div style={{
          width: '100px',
          height: '40px',
          backgroundColor: 'var(--color-primary)',
          borderRadius: 'var(--border-radius-sm)'
        }}></div>
          <code>--border-radius-sm: 0.2rem</code>
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
          <div style={{
          width: '100px',
          height: '40px',
          backgroundColor: 'var(--color-primary)',
          borderRadius: 'var(--border-radius)'
        }}></div>
          <code>--border-radius: 0.25rem</code>
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
          <div style={{
          width: '100px',
          height: '40px',
          backgroundColor: 'var(--color-primary)',
          borderRadius: 'var(--border-radius-lg)'
        }}></div>
          <code>--border-radius-lg: 0.5rem</code>
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
          <div style={{
          width: '100px',
          height: '40px',
          backgroundColor: 'var(--color-primary)',
          borderRadius: 'var(--border-radius-xl)'
        }}></div>
          <code>--border-radius-xl: 1rem</code>
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
          <div style={{
          width: '100px',
          height: '40px',
          backgroundColor: 'var(--color-primary)',
          borderRadius: 'var(--border-radius-pill)'
        }}></div>
          <code>--border-radius-pill: 50rem</code>
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
          <div style={{
          width: '50px',
          height: '50px',
          backgroundColor: 'var(--color-primary)',
          borderRadius: 'var(--border-radius-circle)'
        }}></div>
          <code>--border-radius-circle: 50%</code>
        </div>
      </div>
    </>
}`,...(k=(S=d.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var w,C,T;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <>
      <h2>Shadows</h2>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
      marginTop: '20px'
    }}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
          <div style={{
          width: '150px',
          height: '60px',
          backgroundColor: 'white',
          boxShadow: 'var(--box-shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>Small Shadow</div>
          <code>--box-shadow-sm</code>
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
          <div style={{
          width: '150px',
          height: '60px',
          backgroundColor: 'white',
          boxShadow: 'var(--box-shadow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>Regular Shadow</div>
          <code>--box-shadow</code>
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
          <div style={{
          width: '150px',
          height: '60px',
          backgroundColor: 'white',
          boxShadow: 'var(--box-shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>Large Shadow</div>
          <code>--box-shadow-lg</code>
        </div>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
          <div style={{
          width: '150px',
          height: '60px',
          backgroundColor: 'white',
          boxShadow: 'var(--box-shadow-focus)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>Focus Shadow</div>
          <code>--box-shadow-focus</code>
        </div>
      </div>
      
      <h2>Transitions</h2>
      <ul>
        <li><strong>Base</strong>: all 0.2s ease-in-out</li>
        <li><strong>Slow</strong>: all 0.3s ease-in-out</li>
        <li><strong>Fast</strong>: all 0.1s ease-in-out</li>
        <li><strong>Fade</strong>: opacity 0.15s linear</li>
        <li><strong>Transform</strong>: transform 0.2s ease-in-out</li>
      </ul>
      
      <h2>Breakpoints</h2>
      <ul>
        <li><strong>XS</strong>: 0 (default)</li>
        <li><strong>SM</strong>: 576px</li>
        <li><strong>MD</strong>: 768px</li>
        <li><strong>LG</strong>: 992px</li>
        <li><strong>XL</strong>: 1200px</li>
        <li><strong>XXL</strong>: 1400px</li>
      </ul>
      
      <h2>Z-index</h2>
      <ul>
        <li><strong>Negative</strong>: -1</li>
        <li><strong>Zero</strong>: 0</li>
        <li><strong>Dropdown</strong>: 1000</li>
        <li><strong>Sticky</strong>: 1020</li>
        <li><strong>Fixed</strong>: 1030</li>
        <li><strong>Modal Backdrop</strong>: 1040</li>
        <li><strong>Modal</strong>: 1050</li>
        <li><strong>Popover</strong>: 1060</li>
        <li><strong>Toast</strong>: 1070</li>
      </ul>
      
      <h2>Using Design Tokens in CSS</h2>
      <pre>
        {\`
.my-component {
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
        \`}
      </pre>
      
      <h2>Using Design Tokens in JavaScript</h2>
      <pre>
        {\`
import React from 'react';
import styled from 'styled-components';

const StyledComponent = styled.div\\\`
  color: var(--color-text);
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  margin-bottom: var(--spacing-4);
  /* ... and so on */
\\\`;

// Or with inline styles
function MyComponent() {
  return (
    <div style={{ 
      color: 'var(--color-text)',
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-base)',
      // ... and so on
    }}>
      Component Content
    </div>
  );
}
        \`}
      </pre>
    </>
}`,...(T=(C=c.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};const j=["Colors","Typography","Spacing","Borders","OtherTokens"];export{d as Borders,l as Colors,c as OtherTokens,s as Spacing,a as Typography,j as __namedExportsOrder,G as default};
