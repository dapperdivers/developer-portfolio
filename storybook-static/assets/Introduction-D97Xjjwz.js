import{j as n}from"./jsx-runtime-BuIwgEqq.js";import{useMDXComponents as o}from"./index-BAciIf_w.js";import{M as t}from"./index-CDnoKuKi.js";import"./index-B6-Y_Zgq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BIL_-Lzo.js";import"./index-frfLogi_.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";function s(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(t,{title:"Introduction/Getting Started"}),`
`,n.jsx(e.h1,{id:"developer-portfolio-component-library",children:"Developer Portfolio Component Library"}),`
`,n.jsx(e.p,{children:"Welcome to the Developer Portfolio component library. This Storybook contains the UI components used in the portfolio project, organized according to atomic design principles."}),`
`,n.jsx(e.h2,{id:"atomic-design-structure",children:"Atomic Design Structure"}),`
`,n.jsx(e.p,{children:"Our components are organized following atomic design methodology:"}),`
`,n.jsx(e.h3,{id:"1-atoms",children:"1. Atoms"}),`
`,n.jsx(e.p,{children:"The basic building blocks of the application - buttons, inputs, cards, and other UI elements that can't be broken down further."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Button"}),": Multi-variant button component with different sizes and styles"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Card"}),": Content container with various display options"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Skill"}),": Icon-based skill representation with tooltips"]}),`
`]}),`
`,n.jsx(e.h3,{id:"2-molecules",children:"2. Molecules"}),`
`,n.jsx(e.p,{children:"Combinations of atoms that form relatively simple UI components with specific functionality."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"ExperienceCard"}),": Display professional experience with company logo and details"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"ProjectCard"}),": Showcase projects with images and technologies used"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"EducationCard"}),": Display educational background"]}),`
`]}),`
`,n.jsx(e.h3,{id:"3-organisms",children:"3. Organisms"}),`
`,n.jsx(e.p,{children:"More complex UI components composed of molecules and atoms that form a distinct section of the interface."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Navigation"}),": Site navigation including links and mobile menu"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Footer"}),": Site footer with links and social icons"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Skills"}),": Grid display of multiple skill icons"]}),`
`]}),`
`,n.jsx(e.h3,{id:"4-templates",children:"4. Templates"}),`
`,n.jsx(e.p,{children:"Page-level objects that place components into a layout and articulate the design's underlying content structure."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.code,{children:"Section"}),": Standardized page section component with title and content areas"]}),`
`]}),`
`,n.jsx(e.h2,{id:"component-features",children:"Component Features"}),`
`,n.jsx(e.p,{children:"The component library includes these key features:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Design Token System"}),": Components use CSS variables for consistent styling"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Accessibility"}),": ARIA attributes and keyboard navigation support"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Responsive Design"}),": Components adapt to different screen sizes"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Performance Optimization"}),": Components use React.memo and optimization hooks"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Animation"}),": Framer Motion integration for smooth animations"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Documentation"}),": Comprehensive props documentation and examples"]}),`
`]}),`
`,n.jsx(e.h2,{id:"using-these-components",children:"Using These Components"}),`
`,n.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`import { Button, Card } from '../components/ui';

function MyComponent() {
  return (
    <Card title="Sample Card" shadow hoverable>
      <p>This is a sample card with a button.</p>
      <Button variant="primary" icon="mdi:arrow-right" iconPosition="right">
        Learn More
      </Button>
    </Card>
  );
}
`})}),`
`,n.jsx(e.h3,{id:"responsive-components",children:"Responsive Components"}),`
`,n.jsx(e.p,{children:"Many components have built-in responsiveness:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Card 
  title="Responsive Card"
  className="my-responsive-card" // Custom styling if needed
>
  <ResponsiveImage 
    src="/path/to/image.jpg"
    alt="Description"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</Card>
`})}),`
`,n.jsx(e.h3,{id:"animation-integration",children:"Animation Integration"}),`
`,n.jsx(e.p,{children:"Components with animation support:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-jsx",children:`<Card
  title="Animated Card"
  animation={{
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  }}
>
  This card animates when it appears.
</Card>
`})}),`
`,n.jsx(e.h2,{id:"contributing-new-components",children:"Contributing New Components"}),`
`,n.jsx(e.p,{children:"When creating new components for the portfolio:"}),`
`,n.jsxs(e.ol,{children:[`
`,n.jsx(e.li,{children:"Follow the atomic design pattern"}),`
`,n.jsxs(e.li,{children:["Use existing design tokens from ",n.jsx(e.code,{children:"design-tokens.css"})]}),`
`,n.jsx(e.li,{children:"Include comprehensive PropTypes"}),`
`,n.jsx(e.li,{children:"Add JSDoc documentation"}),`
`,n.jsx(e.li,{children:"Create Storybook stories to showcase the component"}),`
`,n.jsx(e.li,{children:"Implement proper accessibility features"}),`
`,n.jsx(e.li,{children:"Test on different screen sizes"}),`
`]}),`
`,n.jsx(e.h2,{id:"getting-started",children:"Getting Started"}),`
`,n.jsx(e.p,{children:"Explore the component library by navigating through the sidebar. Each component includes:"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Interactive examples"}),`
`,n.jsx(e.li,{children:"Props documentation"}),`
`,n.jsx(e.li,{children:"Usage guidelines"}),`
`]}),`
`,n.jsx(e.p,{children:"Start with the basic atoms, then explore how they combine into more complex components."})]})}function j(i={}){const{wrapper:e}={...o(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(s,{...i})}):s(i)}export{j as default};
