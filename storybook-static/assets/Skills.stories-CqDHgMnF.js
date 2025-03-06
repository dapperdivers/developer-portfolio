import{a as l}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import P from"./Skills-BPcnO0Y6.js";import{w as D,e as m,u as T}from"./index-DZ0MIZXx.js";import{w as M}from"./decorators-DZYmSUt9.js";import{P as A}from"./PortfolioContext-CM91bWnU.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./DisplayLottie-BzSg4w-g.js";import"./Loading-DnxwpyrZ.js";import"./index-LaBibFJR.js";import"./dev-webdev-BS9LylDY.js";import"./Skill-DEX2uO-l.js";import"./index-Co38GRlK.js";import"./iconify-BRCYAcB5.js";/* empty css                 */import"./proxy-Vqfb2hit.js";import"./SkeletonCard-CCuh-sAq.js";import"./Section-D0daCtUT.js";import"./mockData-Bv86VHFx.js";const X={title:"Organisms/Skills",component:P,tags:["autodocs"],decorators:[M],parameters:{docs:{description:{component:"Skills component that displays a grid of skills icons and descriptions. Showcases the developer's technical skills with interactive icons and descriptions arranged in a responsive grid layout."}},a11y:{config:{rules:[{id:"aria-allowed-attr",enabled:!0}]}},viewport:{defaultViewport:"desktop"},layout:"fullscreen"}},c=o=>l("div",{style:{margin:"2rem"},children:l(P,{...o})}),r=c.bind({});r.play=async({canvasElement:o,step:e})=>{const s=D(o);await e("Initial render check",async()=>{await m(s.getByText("Skills")).toBeInTheDocument();const a=s.getAllByRole("img",{hidden:!0});await m(a.length).toBeGreaterThan(0)}),await e("Skill hover interaction",async()=>{const a=s.getAllByRole("img",{hidden:!0});a.length>0&&await T.hover(a[0])})};const n=c.bind({});n.parameters={chromatic:{reducedMotion:!0}};const i=c.bind({});i.parameters={viewport:{defaultViewport:"mobile1"}};const t=c.bind({});t.decorators=[o=>{const e=JSON.parse(JSON.stringify(require("../utils/mockData").mockPortfolioData)),s=[{skillName:"AWS",iconName:"logos:aws"},{skillName:"Docker",iconName:"logos:docker-icon"},{skillName:"Kubernetes",iconName:"logos:kubernetes"},{skillName:"GraphQL",iconName:"logos:graphql"},{skillName:"Redis",iconName:"logos:redis"},{skillName:"PostgreSQL",iconName:"logos:postgresql"},{skillName:"MongoDB",iconName:"logos:mongodb"},{skillName:"Jenkins",iconName:"logos:jenkins"},{skillName:"Travis CI",iconName:"logos:travis-ci"},{skillName:"Firebase",iconName:"logos:firebase"}];return e.skillsSection.softwareSkills=[...e.skillsSection.softwareSkills,...s],e.skillsSection.skills.push("⚙️ Experience with containerization and orchestration using Docker and Kubernetes","🗃️ Proficient in both SQL and NoSQL database systems","🔄 Experienced with CI/CD pipelines and DevOps practices"),l(A.Provider,{value:e,children:l(o,{})})}];var d,p,k;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`args => <div style={{
  margin: '2rem'
}}>
    <Skills {...args} />
  </div>`,...(k=(p=r.parameters)==null?void 0:p.docs)==null?void 0:k.source}}};var u,g,f;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => <div style={{
  margin: '2rem'
}}>
    <Skills {...args} />
  </div>`,...(f=(g=n.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var S,h,v,y,w;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`args => <div style={{
  margin: '2rem'
}}>
    <Skills {...args} />
  </div>`,...(v=(h=i.parameters)==null?void 0:h.docs)==null?void 0:v.source},description:{story:`## Component Usage

\`\`\`jsx
import Skills from '../containers/Skills';
import { PortfolioProvider } from '@context/PortfolioContext';

function App() {
  return (
    <PortfolioProvider>
      <main>
        <Skills />
      </main>
    </PortfolioProvider>
  );
}
\`\`\`

## Context Dependencies

This component consumes data from \`PortfolioContext\` through the \`useSkills\` hook:

| Data | Type | Description |
|------|------|-------------|
| skillsSection.title | string | Section title |
| skillsSection.subTitle | string | Section subtitle |
| skillsSection.softwareSkills | array | Array of skill objects with name and icon |
| skillsSection.skills | array | Array of skill descriptions |

## Accessibility

This component follows these accessibility best practices:
- Semantic HTML structure with appropriate heading levels
- ARIA labels for skill icons and descriptions
- Support for reduced motion preferences
- Keyboard navigable elements
- Screen reader friendly text alternatives

## Performance Optimizations

The component includes several performance optimizations:
- Detection of low-end devices for simplified animations
- Respect for user's reduced motion preferences
- Memoized components and values
- Optimized animations for different devices`,...(w=(y=i.parameters)==null?void 0:y.docs)==null?void 0:w.description}}};var b,N,x;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`args => <div style={{
  margin: '2rem'
}}>
    <Skills {...args} />
  </div>`,...(x=(N=t.parameters)==null?void 0:N.docs)==null?void 0:x.source}}};const Y=["Default","ReducedMotion","MobileView","ManySkills"];export{r as Default,t as ManySkills,i as MobileView,n as ReducedMotion,Y as __namedExportsOrder,X as default};
