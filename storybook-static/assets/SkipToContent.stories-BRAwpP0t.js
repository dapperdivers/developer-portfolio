import{j as p,a as e}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{S as I}from"./SkipToContent--EoLpGE5.js";import{w as S,e as c,u as C}from"./index-DZ0MIZXx.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Co38GRlK.js";const j={title:"Atoms/SkipToContent",component:I,tags:["autodocs"],parameters:{docs:{description:{component:"Skip to content link component for keyboard users. This component allows keyboard users to bypass navigation and jump directly to the main content."}},a11y:{config:{rules:[{id:"focus-order-semantics",reviewOnFail:!0},{id:"focus-visible",reviewOnFail:!0}]}},layout:"fullscreen"}},l=a=>p("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column"},children:[e(I,{...a}),e("header",{style:{padding:"20px",backgroundColor:"#f0f0f0"},children:e("nav",{children:p("ul",{style:{display:"flex",gap:"20px",listStyle:"none"},children:[e("li",{children:e("a",{href:"#",tabIndex:0,children:"Navigation Item 1"})}),e("li",{children:e("a",{href:"#",tabIndex:0,children:"Navigation Item 2"})}),e("li",{children:e("a",{href:"#",tabIndex:0,children:"Navigation Item 3"})})]})})}),p("main",{id:"main-content",style:{padding:"20px",flex:1},children:[e("h1",{children:"Main Content Area"}),e("p",{children:"Tab to navigate. The skip link should appear when focused."}),e("p",{children:"The skip link is only visible when focused, demonstrating the focus-visibility pattern."})]})]}),t=l.bind({});t.play=async({canvasElement:a,step:s})=>{const r=S(a);await s("Initial render check",async()=>{const d=r.getByText("Skip to main content");await c(d).toBeInTheDocument()}),await s("Keyboard navigation test",async()=>{await C.tab();const d=r.getByText("Skip to main content");await c(d).toHaveFocus()})};const i=l.bind({});i.parameters={pseudo:{focus:!0},docs:{description:{story:"Shows how the Skip to Content link appears when focused using keyboard navigation. The link is positioned at the top of the viewport and provides a clear path to the main content."}}};i.play=async({canvasElement:a})=>{const s=S(a);await C.tab();const r=s.getByText("Skip to main content");await c(r).toHaveFocus()};const n=l.bind({});n.parameters={docs:{description:{story:"Tab through this example to see how the Skip to Content component appears on focus and provides a way to bypass navigation."}}};const o=l.bind({});o.parameters={a11y:{config:{rules:[{id:"focus-visible",reviewOnFail:!0},{id:"skip-link",reviewOnFail:!0},{id:"focus-order-semantics",reviewOnFail:!0}]}},docs:{description:{story:"This story is configured with specific accessibility rules to ensure the skip link meets accessibility standards."}}};var h,m,u;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`args => <div style={{
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
}}>
    <SkipToContent {...args} />
    <header style={{
    padding: '20px',
    backgroundColor: '#f0f0f0'
  }}>
      <nav>
        <ul style={{
        display: 'flex',
        gap: '20px',
        listStyle: 'none'
      }}>
          <li><a href="#" tabIndex={0}>Navigation Item 1</a></li>
          <li><a href="#" tabIndex={0}>Navigation Item 2</a></li>
          <li><a href="#" tabIndex={0}>Navigation Item 3</a></li>
        </ul>
      </nav>
    </header>
    <main id="main-content" style={{
    padding: '20px',
    flex: 1
  }}>
      <h1>Main Content Area</h1>
      <p>Tab to navigate. The skip link should appear when focused.</p>
      <p>The skip link is only visible when focused, demonstrating the focus-visibility pattern.</p>
    </main>
  </div>`,...(u=(m=t.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var f,g,y;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`args => <div style={{
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
}}>
    <SkipToContent {...args} />
    <header style={{
    padding: '20px',
    backgroundColor: '#f0f0f0'
  }}>
      <nav>
        <ul style={{
        display: 'flex',
        gap: '20px',
        listStyle: 'none'
      }}>
          <li><a href="#" tabIndex={0}>Navigation Item 1</a></li>
          <li><a href="#" tabIndex={0}>Navigation Item 2</a></li>
          <li><a href="#" tabIndex={0}>Navigation Item 3</a></li>
        </ul>
      </nav>
    </header>
    <main id="main-content" style={{
    padding: '20px',
    flex: 1
  }}>
      <h1>Main Content Area</h1>
      <p>Tab to navigate. The skip link should appear when focused.</p>
      <p>The skip link is only visible when focused, demonstrating the focus-visibility pattern.</p>
    </main>
  </div>`,...(y=(g=i.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var v,x,b;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`args => <div style={{
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
}}>
    <SkipToContent {...args} />
    <header style={{
    padding: '20px',
    backgroundColor: '#f0f0f0'
  }}>
      <nav>
        <ul style={{
        display: 'flex',
        gap: '20px',
        listStyle: 'none'
      }}>
          <li><a href="#" tabIndex={0}>Navigation Item 1</a></li>
          <li><a href="#" tabIndex={0}>Navigation Item 2</a></li>
          <li><a href="#" tabIndex={0}>Navigation Item 3</a></li>
        </ul>
      </nav>
    </header>
    <main id="main-content" style={{
    padding: '20px',
    flex: 1
  }}>
      <h1>Main Content Area</h1>
      <p>Tab to navigate. The skip link should appear when focused.</p>
      <p>The skip link is only visible when focused, demonstrating the focus-visibility pattern.</p>
    </main>
  </div>`,...(b=(x=n.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var k,T,w;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`args => <div style={{
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column'
}}>
    <SkipToContent {...args} />
    <header style={{
    padding: '20px',
    backgroundColor: '#f0f0f0'
  }}>
      <nav>
        <ul style={{
        display: 'flex',
        gap: '20px',
        listStyle: 'none'
      }}>
          <li><a href="#" tabIndex={0}>Navigation Item 1</a></li>
          <li><a href="#" tabIndex={0}>Navigation Item 2</a></li>
          <li><a href="#" tabIndex={0}>Navigation Item 3</a></li>
        </ul>
      </nav>
    </header>
    <main id="main-content" style={{
    padding: '20px',
    flex: 1
  }}>
      <h1>Main Content Area</h1>
      <p>Tab to navigate. The skip link should appear when focused.</p>
      <p>The skip link is only visible when focused, demonstrating the focus-visibility pattern.</p>
    </main>
  </div>`,...(w=(T=o.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};const B=["Default","Focused","KeyboardNavigation","AccessibilityTesting"];export{o as AccessibilityTesting,t as Default,i as Focused,n as KeyboardNavigation,B as __namedExportsOrder,j as default};
