import{j as F,a as s}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{S as i}from"./Skill-DEX2uO-l.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Co38GRlK.js";import"./iconify-BRCYAcB5.js";/* empty css                 */import"./proxy-Vqfb2hit.js";const se={title:"Atoms/Skill",component:i,tags:["autodocs"],argTypes:{skill:{control:"object",description:"Skill data object containing skillName and iconName"},size:{control:"select",options:["sm","md","lg"],description:"Size of the skill icon"},animate:{control:"boolean",description:"Whether to animate the component"},reducedMotion:{control:"boolean",description:"Whether to use simplified animations for performance"},index:{control:"number",description:"Index for staggered animations"}},parameters:{docs:{description:{component:"A component to display skills with icons and tooltips."}}}},e=[{skillName:"JavaScript",iconName:"logos:javascript"},{skillName:"React",iconName:"logos:react"},{skillName:"HTML5",iconName:"logos:html-5"},{skillName:"CSS3",iconName:"logos:css-3"},{skillName:"Node.js",iconName:"logos:nodejs"},{skillName:"TypeScript",iconName:"logos:typescript-icon"},{skillName:"Git",iconName:"logos:git-icon"},{skillName:"Python",iconName:"logos:python"},{skillName:"Docker",iconName:"logos:docker-icon"},{skillName:"MongoDB",iconName:"logos:mongodb-icon"}],t={args:{skill:e[0],size:"md",animate:!0,reducedMotion:!1,index:0}},n={args:{skill:e[1],size:"md",animate:!0}},m={args:{skill:e[2],size:"sm"}},c={args:{skill:e[3],size:"md"}},d={args:{skill:e[4],size:"lg"}},p={args:{skill:e[5],animate:!1}},k={args:{skill:e[6],reducedMotion:!0}},o=()=>F("div",{style:{display:"flex",gap:"24px",alignItems:"center"},children:[s(i,{skill:e[0],size:"sm"}),s(i,{skill:e[0],size:"md"}),s(i,{skill:e[0],size:"lg"})]}),l=()=>s("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(80px, 1fr))",gap:"16px",maxWidth:"600px"},children:e.map((g,a)=>s(i,{skill:g,index:a,size:"md"},a))}),r=()=>s("div",{style:{display:"flex",gap:"16px",maxWidth:"600px"},children:e.slice(0,5).map((g,a)=>s(i,{skill:g,index:a,size:"md"},a))});o.__docgenInfo={description:"",methods:[],displayName:"SizeComparison"};l.__docgenInfo={description:"",methods:[],displayName:"SkillGrid"};r.__docgenInfo={description:"",methods:[],displayName:"StaggeredAnimation"};var S,u,x;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    skill: exampleSkills[0],
    size: 'md',
    animate: true,
    reducedMotion: false,
    index: 0
  }
}`,...(x=(u=t.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var z,N,f;n.parameters={...n.parameters,docs:{...(z=n.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    skill: exampleSkills[1],
    size: 'md',
    animate: true
  }
}`,...(f=(N=n.parameters)==null?void 0:N.docs)==null?void 0:f.source}}};var y,h,v;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    skill: exampleSkills[2],
    size: 'sm'
  }
}`,...(v=(h=m.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var M,_,j;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    skill: exampleSkills[3],
    size: 'md'
  }
}`,...(j=(_=c.parameters)==null?void 0:_.docs)==null?void 0:j.source}}};var A,b,C;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    skill: exampleSkills[4],
    size: 'lg'
  }
}`,...(C=(b=d.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var I,W,R;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    skill: exampleSkills[5],
    animate: false
  }
}`,...(R=(W=p.parameters)==null?void 0:W.docs)==null?void 0:R.source}}};var T,D,G;k.parameters={...k.parameters,docs:{...(T=k.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    skill: exampleSkills[6],
    reducedMotion: true
  }
}`,...(G=(D=k.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};var L,w,B;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`() => <div style={{
  display: 'flex',
  gap: '24px',
  alignItems: 'center'
}}>
    <Skill skill={exampleSkills[0]} size="sm" />
    <Skill skill={exampleSkills[0]} size="md" />
    <Skill skill={exampleSkills[0]} size="lg" />
  </div>`,...(B=(w=o.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};var E,H,J;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`() => <div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
  gap: '16px',
  maxWidth: '600px'
}}>
    {exampleSkills.map((skill, index) => <Skill key={index} skill={skill} index={index} size="md" />)}
  </div>`,...(J=(H=l.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var O,P,q;r.parameters={...r.parameters,docs:{...(O=r.parameters)==null?void 0:O.docs,source:{originalSource:`() => <div style={{
  display: 'flex',
  gap: '16px',
  maxWidth: '600px'
}}>
    {exampleSkills.slice(0, 5).map((skill, index) => <Skill key={index} skill={skill} index={index} size="md" />)}
  </div>`,...(q=(P=r.parameters)==null?void 0:P.docs)==null?void 0:q.source}}};const ie=["Default","ReactSkill","SmallSize","MediumSize","LargeSize","NoAnimation","ReducedMotion","SizeComparison","SkillGrid","StaggeredAnimation"];export{t as Default,d as LargeSize,c as MediumSize,p as NoAnimation,n as ReactSkill,k as ReducedMotion,o as SizeComparison,l as SkillGrid,m as SmallSize,r as StaggeredAnimation,ie as __namedExportsOrder,se as default};
