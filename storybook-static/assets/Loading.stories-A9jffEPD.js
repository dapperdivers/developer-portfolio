import{a as e,j as p}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{L as i}from"./Loading-DnxwpyrZ.js";import{w as S,e as s}from"./index-DZ0MIZXx.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";const R={title:"Atoms/Loading",component:i,tags:["autodocs"],parameters:{docs:{description:{component:"Loading spinner component that provides visual feedback during asynchronous operations. The component includes proper ARIA attributes for accessibility and smooth animations."}},a11y:{config:{rules:[{id:"aria-valid-attr",reviewOnFail:!0},{id:"aria-roles",reviewOnFail:!0},{id:"aria-hidden-focus",reviewOnFail:!0}]}},chromatic:{pauseAnimationAtEnd:!0}}},j=d=>e(i,{...d}),r=j.bind({});r.play=async({canvasElement:d,step:D})=>{const l=S(d);await D("Accessibility verification",async()=>{const c=l.getByRole("status");await s(c).toBeInTheDocument(),await s(c).toHaveAttribute("aria-busy","true"),await s(c).toHaveAttribute("aria-live","polite");const T=l.getByText("Content is loading...");await s(T).toBeInTheDocument()})};const t=()=>e("div",{style:{width:"100px",height:"100px",border:"1px dashed #ccc"},children:e(i,{})});t.parameters={docs:{description:{story:"Shows how the loading spinner adapts to smaller container sizes."}}};const n=()=>p("div",{style:{position:"relative",width:"300px",height:"200px",border:"1px solid #ccc",padding:"1rem"},children:[e("p",{children:"This content is being updated..."}),e("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.8)",display:"flex",alignItems:"center",justifyContent:"center"},children:e(i,{})})]});n.parameters={docs:{description:{story:"Demonstrates how to use the loading spinner as an overlay on content that is being updated."}}};const o=()=>p("div",{style:{maxWidth:"300px",padding:"1rem",borderRadius:"8px",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)",backgroundColor:"#fff"},children:[e("h3",{style:{margin:"0 0 1rem 0"},children:"Loading Data"}),e(i,{}),e("p",{style:{textAlign:"center",marginTop:"1rem",color:"#666"},children:"Please wait while we fetch your data..."})]});o.parameters={docs:{description:{story:"Shows how to integrate the loading spinner within a card component."}}};const a=()=>p("div",{style:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"#f8f9fa",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1rem"},children:[e(i,{}),e("p",{style:{color:"#555",fontWeight:500},children:"Loading application..."})]});a.parameters={docs:{description:{story:"Demonstrates how to create a full-page loading state during initial application load."}},layout:"fullscreen"};t.__docgenInfo={description:"",methods:[],displayName:"ConstrainedContainer"};n.__docgenInfo={description:"",methods:[],displayName:"ContentOverlay"};o.__docgenInfo={description:"",methods:[],displayName:"InCard"};a.__docgenInfo={description:"",methods:[],displayName:"FullPageLoading"};var m,g,h;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:"args => <Loading {...args} />",...(h=(g=r.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var u,f,y;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`() => <div style={{
  width: '100px',
  height: '100px',
  border: '1px dashed #ccc'
}}>
    <Loading />
  </div>`,...(y=(f=t.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var x,b,v;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`() => <div style={{
  position: 'relative',
  width: '300px',
  height: '200px',
  border: '1px solid #ccc',
  padding: '1rem'
}}>
    <p>This content is being updated...</p>
    <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
      <Loading />
    </div>
  </div>`,...(v=(b=n.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var w,C,L;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`() => <div style={{
  maxWidth: '300px',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff'
}}>
    <h3 style={{
    margin: '0 0 1rem 0'
  }}>Loading Data</h3>
    <Loading />
    <p style={{
    textAlign: 'center',
    marginTop: '1rem',
    color: '#666'
  }}>
      Please wait while we fetch your data...
    </p>
  </div>`,...(L=(C=o.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var I,_,A;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`() => <div style={{
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#f8f9fa',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem'
}}>
    <Loading />
    <p style={{
    color: '#555',
    fontWeight: 500
  }}>Loading application...</p>
  </div>`,...(A=(_=a.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};const W=["Default","ConstrainedContainer","ContentOverlay","InCard","FullPageLoading"];export{t as ConstrainedContainer,n as ContentOverlay,r as Default,a as FullPageLoading,o as InCard,W as __namedExportsOrder,R as default};
