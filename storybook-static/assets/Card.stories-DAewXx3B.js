import{a as e,j as m}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{C as r}from"./Card-piHSsVOW.js";import{B as p}from"./Button-DTt19CJR.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Co38GRlK.js";import"./proxy-Vqfb2hit.js";import"./iconify-BRCYAcB5.js";const P={title:"Atoms/Card",component:r,tags:["autodocs"],argTypes:{title:{control:"text",description:"Card title"},subtitle:{control:"text",description:"Card subtitle"},hoverable:{control:"boolean",description:"Whether the card has hover effects"},bordered:{control:"boolean",description:"Whether the card has a border"},shadow:{control:"boolean",description:"Whether the card has a shadow"},header:{control:{disable:!0},description:"Custom header content"},footer:{control:{disable:!0},description:"Custom footer content"},animation:{control:{disable:!0},description:"Framer Motion animation properties"}}},h=t=>e("div",{style:{maxWidth:"350px"},children:e(r,{...t,children:e("p",{children:"This is the content of the card. You can add any elements or components here."})})}),a={render:h,args:{title:"Card Title",subtitle:"Card Subtitle",bordered:!0,shadow:!1,hoverable:!1}},s={render:h,args:{title:"Hoverable Card",subtitle:"This card has a hover effect",hoverable:!0,bordered:!0}},o={render:h,args:{title:"Card With Shadow",shadow:!0}},i={render:h,args:{title:"Borderless Card",bordered:!1,shadow:!0}},d={render:t=>e("div",{style:{maxWidth:"350px"},children:e(r,{...t,header:m("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e("h3",{children:"Custom Header"}),e(p,{size:"sm",variant:"primary",children:"Action"})]}),children:e("p",{children:"This card has a custom header with a button."})})})},n={render:t=>e("div",{style:{maxWidth:"350px"},children:e(r,{...t,title:"Card With Footer",footer:m("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px"},children:[e(p,{size:"sm",variant:"secondary",children:"Cancel"}),e(p,{size:"sm",variant:"primary",children:"Submit"})]}),children:e("p",{children:"This card has a footer with action buttons."})})})},c={render:t=>e("div",{style:{maxWidth:"350px"},children:e(r,{...t,title:"Animated Card",subtitle:"This card uses Framer Motion animations",animation:{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.5}},children:e("p",{children:"This card animates when it appears on the screen."})})})},l={render:()=>m("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"16px"},children:[e(r,{title:"Card 1",shadow:!0,hoverable:!0,children:e("p",{children:"This is card 1 content."})}),e(r,{title:"Card 2",shadow:!0,hoverable:!0,children:e("p",{children:"This is card 2 content."})}),e(r,{title:"Card 3",shadow:!0,hoverable:!0,children:e("p",{children:"This is card 3 content."})}),e(r,{title:"Card 4",shadow:!0,hoverable:!0,children:e("p",{children:"This is card 4 content."})})]})};var u,C,b;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: DefaultRender,
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    bordered: true,
    shadow: false,
    hoverable: false
  }
}`,...(b=(C=a.parameters)==null?void 0:C.docs)==null?void 0:b.source}}};var v,f,y;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: DefaultRender,
  args: {
    title: 'Hoverable Card',
    subtitle: 'This card has a hover effect',
    hoverable: true,
    bordered: true
  }
}`,...(y=(f=s.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var g,x,w;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: DefaultRender,
  args: {
    title: 'Card With Shadow',
    shadow: true
  }
}`,...(w=(x=o.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var T,W,S;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: DefaultRender,
  args: {
    title: 'Borderless Card',
    bordered: false,
    shadow: true
  }
}`,...(S=(W=i.parameters)==null?void 0:W.docs)==null?void 0:S.source}}};var B,H,j;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <div style={{
    maxWidth: '350px'
  }}>
      <Card {...args} header={<div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
            <h3>Custom Header</h3>
            <Button size="sm" variant="primary">Action</Button>
          </div>}>
        <p>This card has a custom header with a button.</p>
      </Card>
    </div>
}`,...(j=(H=d.parameters)==null?void 0:H.docs)==null?void 0:j.source}}};var A,D,F;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <div style={{
    maxWidth: '350px'
  }}>
      <Card {...args} title="Card With Footer" footer={<div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '8px'
    }}>
            <Button size="sm" variant="secondary">Cancel</Button>
            <Button size="sm" variant="primary">Submit</Button>
          </div>}>
        <p>This card has a footer with action buttons.</p>
      </Card>
    </div>
}`,...(F=(D=n.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var z,R,M;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => <div style={{
    maxWidth: '350px'
  }}>
      <Card {...args} title="Animated Card" subtitle="This card uses Framer Motion animations" animation={{
      initial: {
        opacity: 0,
        y: 50
      },
      animate: {
        opacity: 1,
        y: 0
      },
      transition: {
        duration: 0.5
      }
    }}>
        <p>This card animates when it appears on the screen.</p>
      </Card>
    </div>
}`,...(M=(R=c.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var G,I,_;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  }}>
      <Card title="Card 1" shadow hoverable>
        <p>This is card 1 content.</p>
      </Card>
      <Card title="Card 2" shadow hoverable>
        <p>This is card 2 content.</p>
      </Card>
      <Card title="Card 3" shadow hoverable>
        <p>This is card 3 content.</p>
      </Card>
      <Card title="Card 4" shadow hoverable>
        <p>This is card 4 content.</p>
      </Card>
    </div>
}`,...(_=(I=l.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};const Q=["Default","Hoverable","WithShadow","Borderless","CustomHeader","WithFooter","WithAnimation","CardGrid"];export{i as Borderless,l as CardGrid,d as CustomHeader,a as Default,s as Hoverable,c as WithAnimation,n as WithFooter,o as WithShadow,Q as __namedExportsOrder,P as default};
