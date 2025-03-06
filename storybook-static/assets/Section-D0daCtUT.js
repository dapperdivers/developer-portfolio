import{a as e,j as t,F}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{P as a}from"./index-Co38GRlK.js";import{F as S,g as j,h as m,a as k,i as T}from"./index-LaBibFJR.js";/* empty css                 */import{m as C}from"./proxy-Vqfb2hit.js";const u=({children:r,id:f,title:i,subtitle:o,className:g="",container:h=!0,fluid:y=!1,background:s,animation:c,ariaLabel:b,role:N="region",...v})=>{const q=["section",s?`bg-${s}`:"",g].filter(Boolean).join(" "),l=`container${y?"-fluid":""}`,n=(i||o)&&t("div",{className:"section-header",children:[i==="Education"&&e(S,{className:"section-icon"}),i==="Experience"&&e(j,{className:"section-icon"}),i==="Projects"&&e(m,{className:"section-icon"}),i==="What I do"&&e(m,{className:"section-icon"}),i==="Feedbacks"&&e(k,{className:"section-icon"}),i==="Contact"&&e(T,{className:"section-icon"}),i&&e("h2",{className:"section-title",children:i}),o&&e("div",{className:"section-subtitle",children:o})]}),p=h?t("div",{className:l,children:[n,e("div",{className:"section-content",children:r})]}):t(F,{children:[n&&e("div",{className:l,children:n}),e("div",{className:"section-content",children:r})]}),d={id:f,className:q,"aria-label":b||i,role:N,...v};return c?e(C.section,{...d,...c,children:p}):e("section",{...d,children:p})};u.propTypes={children:a.node.isRequired,id:a.string,title:a.string,subtitle:a.string,icon:a.string,className:a.string,container:a.bool,fluid:a.bool,background:a.oneOf(["light","dark","primary","secondary","gray"]),animation:a.object,ariaLabel:a.string,role:a.string};u.__docgenInfo={description:`Section component for layout structuring and consistent section styling.

@component
@param {Object} props - The component props
@param {ReactNode} props.children - The section content
@param {string} [props.id] - The section ID for navigation
@param {string} [props.title] - The section title
@param {string} [props.subtitle] - The section subtitle
@param {string} [props.icon] - Iconify icon name for the section
@param {string} [props.className] - Additional CSS classes
@param {boolean} [props.container=true] - Whether to wrap content in a container
@param {boolean} [props.fluid=false] - Whether the container should be fluid (full-width)
@param {string} [props.background] - Background style (light, dark, primary, etc.)
@param {Object} [props.animation] - Animation properties for Framer Motion
@param {string} [props.ariaLabel] - Aria label for accessibility
@param {string} [props.role='region'] - ARIA role for the section
@returns {ReactElement} The Section component

@example
<Section 
  id="about"
  title="About Me"
  subtitle="Learn more about my experience"
  icon="mdi:account"
  background="light"
  animation={{ 
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true }
  }}
>
  <p>Content goes here</p>
</Section>`,methods:[],displayName:"Section",props:{className:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},container:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},fluid:{defaultValue:{value:"false",computed:!1},description:"",type:{name:"bool"},required:!1},role:{defaultValue:{value:"'region'",computed:!1},description:"",type:{name:"string"},required:!1},children:{description:"",type:{name:"node"},required:!0},id:{description:"",type:{name:"string"},required:!1},title:{description:"",type:{name:"string"},required:!1},subtitle:{description:"",type:{name:"string"},required:!1},icon:{description:"",type:{name:"string"},required:!1},background:{description:"",type:{name:"enum",value:[{value:"'light'",computed:!1},{value:"'dark'",computed:!1},{value:"'primary'",computed:!1},{value:"'secondary'",computed:!1},{value:"'gray'",computed:!1}]},required:!1},animation:{description:"",type:{name:"object"},required:!1},ariaLabel:{description:"",type:{name:"string"},required:!1}}};export{u as S};
