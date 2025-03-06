import{j as n,a,F as N}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{P as e}from"./index-Co38GRlK.js";import{m as q}from"./proxy-Vqfb2hit.js";const f=({children:t,header:d,footer:s,title:r,subtitle:o,className:u="",hoverable:b=!1,bordered:y=!0,shadow:v=!1,animation:l,ariaLabel:i,...p})=>{const c=["card",b?"card-hoverable":"",y?"card-bordered":"",v?"card-shadow":"",u].filter(Boolean).join(" "),m=d||r||o?a("div",{className:"card-header",children:d||n(N,{children:[r&&a("h3",{className:"card-title",children:r}),o&&a("div",{className:"card-subtitle",children:o})]})}):null,h=s&&a("div",{className:"card-footer",children:s});return l?n(q.div,{className:c,"aria-label":i,...l,...p,children:[m,a("div",{className:"card-body",children:t}),h]}):n("div",{className:c,"aria-label":i,...p,children:[m,a("div",{className:"card-body",children:t}),h]})};f.propTypes={children:e.node,header:e.node,footer:e.node,title:e.node,subtitle:e.node,className:e.string,hoverable:e.bool,bordered:e.bool,shadow:e.bool,animation:e.object,ariaLabel:e.string};f.__docgenInfo={description:`Card component for displaying content in a contained box.

@component
@param {Object} props - The component props
@param {ReactNode} [props.children] - The card content
@param {ReactNode} [props.header] - The card header content
@param {ReactNode} [props.footer] - The card footer content
@param {ReactNode} [props.title] - The card title
@param {ReactNode} [props.subtitle] - The card subtitle
@param {string} [props.className] - Additional CSS classes
@param {boolean} [props.hoverable=false] - Whether the card has hover effects
@param {boolean} [props.bordered=true] - Whether the card has a border
@param {boolean} [props.shadow=false] - Whether the card has a shadow
@param {Object} [props.animation] - Animation properties for Framer Motion
@param {string} [props.ariaLabel] - Aria label for accessibility
@returns {ReactElement} The Card component

@example
<Card
  header={<h3>Card Title</h3>}
  footer={<Button>Learn More</Button>}
  hoverable
  shadow
>
  <p>Card content goes here</p>
</Card>`,methods:[],displayName:"Card",props:{className:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},hoverable:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},bordered:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},shadow:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},children:{description:"",type:{name:"node"},required:!1},header:{description:"",type:{name:"node"},required:!1},footer:{description:"",type:{name:"node"},required:!1},title:{description:"",type:{name:"node"},required:!1},subtitle:{description:"",type:{name:"node"},required:!1},animation:{description:"",type:{name:"object"},required:!1},ariaLabel:{description:"",type:{name:"string"},required:!1}}};export{f as C};
