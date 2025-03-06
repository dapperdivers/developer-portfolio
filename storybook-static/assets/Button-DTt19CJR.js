import{j as p,a as u}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{P as e}from"./index-Co38GRlK.js";import{I as q}from"./iconify-BRCYAcB5.js";const m=({children:t,onClick:o,variant:c="primary",size:d="md",className:f="",href:l,icon:n,iconPosition:s="left",disabled:a=!1,type:g="button",ariaLabel:v,...b})=>{const y={sm:"btn-sm",md:"",lg:"btn-lg"}[d],h=["btn",`btn-${c}`,y,f,n&&!t?"btn-icon":"",a?"disabled":""].filter(Boolean).join(" "),r=n&&u("span",{className:`btn-icon-${s}`,children:u(q,{icon:n})}),i={className:h,"aria-label":v||(typeof t=="string"?t:void 0),"aria-disabled":a?"true":void 0,...b};return l?p("a",{href:a?void 0:l,onClick:a?k=>k.preventDefault():o,role:"button",tabIndex:a?-1:0,...i,children:[s==="left"&&r,t,s==="right"&&r]}):p("button",{type:g,onClick:o,disabled:a,...i,children:[s==="left"&&r,t,s==="right"&&r]})};m.propTypes={children:e.node,onClick:e.func,variant:e.oneOf(["primary","secondary","success","danger","warning","info","light","dark","link"]),size:e.oneOf(["sm","md","lg"]),className:e.string,href:e.string,icon:e.string,iconPosition:e.oneOf(["left","right"]),disabled:e.bool,type:e.oneOf(["button","submit","reset"]),ariaLabel:e.string};m.__docgenInfo={description:`Button component for user interactions.

@component
@param {Object} props - The component props
@param {ReactNode} props.children - The button content
@param {Function} [props.onClick] - Click handler function
@param {string} [props.variant='primary'] - Button style variant (primary, secondary, success, danger, link)
@param {string} [props.size='md'] - Button size (sm, md, lg)
@param {string} [props.className] - Additional CSS classes
@param {string} [props.href] - URL to navigate to (renders as anchor when provided)
@param {string} [props.icon] - Iconify icon name (e.g. 'mdi:home')
@param {string} [props.iconPosition='left'] - Icon position (left, right)
@param {boolean} [props.disabled=false] - Whether the button is disabled
@param {string} [props.type='button'] - Button type (button, submit, reset)
@param {string} [props.ariaLabel] - Aria label for accessibility
@returns {ReactElement} The Button component

@example
<Button onClick={() => console.log('clicked')} variant="secondary" size="lg">
  Click Me
</Button>`,methods:[],displayName:"Button",props:{variant:{defaultValue:{value:"'primary'",computed:!1},description:"",type:{name:"enum",value:[{value:"'primary'",computed:!1},{value:"'secondary'",computed:!1},{value:"'success'",computed:!1},{value:"'danger'",computed:!1},{value:"'warning'",computed:!1},{value:"'info'",computed:!1},{value:"'light'",computed:!1},{value:"'dark'",computed:!1},{value:"'link'",computed:!1}]},required:!1},size:{defaultValue:{value:"'md'",computed:!1},description:"",type:{name:"enum",value:[{value:"'sm'",computed:!1},{value:"'md'",computed:!1},{value:"'lg'",computed:!1}]},required:!1},className:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},iconPosition:{defaultValue:{value:"'left'",computed:!1},description:"",type:{name:"enum",value:[{value:"'left'",computed:!1},{value:"'right'",computed:!1}]},required:!1},disabled:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},type:{defaultValue:{value:"'button'",computed:!1},description:"",type:{name:"enum",value:[{value:"'button'",computed:!1},{value:"'submit'",computed:!1},{value:"'reset'",computed:!1}]},required:!1},children:{description:"",type:{name:"node"},required:!1},onClick:{description:"",type:{name:"func"},required:!1},href:{description:"",type:{name:"string"},required:!1},icon:{description:"",type:{name:"string"},required:!1},ariaLabel:{description:"",type:{name:"string"},required:!1}}};export{m as B};
