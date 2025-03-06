import{r as p}from"./index-B6-Y_Zgq.js";import{j as G,a as s}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import{P as e}from"./index-Co38GRlK.js";import{u as J}from"./useIntersectionObserver-D-75sPdH.js";/* empty css                 */import{w as K,e as Q}from"./index-DZ0MIZXx.js";import"./_commonjsHelpers-CqkleIqs.js";import"./jsx-runtime-BuIwgEqq.js";const f=({src:d,alt:i,className:m="",lowResSrc:y,imgProps:u={},aspectRatio:g,onLoad:w,onError:R})=>{const[h,_]=p.useState(!1),[a,$]=p.useState(!1),[B,F]=J({rootMargin:"200px",threshold:.01}),M=p.useRef(null),b={};if(g){const[t,W]=g.split(":").map(Number),H=`${W/t*100}%`;b.paddingBottom=H}const O=t=>{_(!0),w&&w(t)},V=t=>{$(!0),R&&R(t)};return G("div",{ref:B,className:`lazy-image-container ${m}`,style:g?b:{},role:"img","aria-label":a?`Failed to load image: ${i}`:"",children:[!h&&!a&&s("div",{className:"lazy-image-skeleton"}),!h&&!a&&y&&s("img",{src:y,alt:"",className:"lazy-image-low-res","aria-hidden":"true"}),a&&s("div",{className:"lazy-image-error",children:s("span",{role:"alert",children:"Failed to load image"})}),F&&!a&&s("img",{ref:M,src:d,alt:i,className:`lazy-image ${h?"lazy-image-loaded":""}`,onLoad:O,onError:V,width:u.width,height:u.height,loading:"lazy",decoding:"async",...u})]})};f.propTypes={src:e.string.isRequired,alt:e.string.isRequired,className:e.string,lowResSrc:e.string,imgProps:e.object,aspectRatio:e.string,onLoad:e.func,onError:e.func};const X=p.memo(f);f.__docgenInfo={description:`Lazy-loaded image component that only loads images when they enter the viewport.
Includes loading skeleton, blur-up effect, and proper accessibility attributes.

@component
@param {Object} props - Component props
@param {string} props.src - Source URL of the image
@param {string} props.alt - Alt text for the image (required for accessibility)
@param {string} [props.className] - Additional CSS classes to apply
@param {string} [props.lowResSrc] - Low resolution version of image to show while loading
@param {Object} [props.imgProps] - Additional props to pass to img element
@param {string} [props.aspectRatio] - Aspect ratio to maintain (e.g., '16:9', '4:3', '1:1')
@param {Function} [props.onLoad] - Callback when image loads
@param {Function} [props.onError] - Callback when image fails to load
@returns {React.ReactElement} LazyImage component`,methods:[],displayName:"LazyImage",props:{className:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},imgProps:{defaultValue:{value:"{}",computed:!1},description:"",type:{name:"object"},required:!1},src:{description:"",type:{name:"string"},required:!0},alt:{description:"",type:{name:"string"},required:!0},lowResSrc:{description:"",type:{name:"string"},required:!1},aspectRatio:{description:"",type:{name:"string"},required:!1},onLoad:{description:"",type:{name:"func"},required:!1},onError:{description:"",type:{name:"func"},required:!1}}};const ne={title:"Atoms/LazyImage",component:X,tags:["autodocs"],argTypes:{src:{control:"text",description:"Source URL of the image"},alt:{control:"text",description:"Alt text for the image (required for accessibility)"},className:{control:"text",description:"Additional CSS classes to apply"},lowResSrc:{control:"text",description:"Low resolution version of image to show while loading"},aspectRatio:{control:"select",options:["16:9","4:3","1:1","3:2","9:16"],description:"Aspect ratio to maintain"},onLoad:{action:"loaded",description:"Callback when image loads"},onError:{action:"error",description:"Callback when image fails to load"},imgProps:{control:"object",description:"Additional props to pass to img element"}},parameters:{docs:{description:{component:"Lazy-loaded image component that only loads images when they enter the viewport. Includes loading skeleton, blur-up effect, and proper accessibility attributes."}},a11y:{config:{rules:[{id:"image-alt",enabled:!0}]}}}},r={args:{src:"https://source.unsplash.com/featured/800x600/?nature",alt:"Nature landscape from Unsplash"}};r.play=async({canvasElement:d,step:i})=>{const m=K(d);await i("Initial render check",async()=>{await Q(m.getByRole("img")).toBeInTheDocument()})};const c={args:{src:"https://source.unsplash.com/featured/800x450/?landscape",alt:"Landscape with 16:9 aspect ratio",aspectRatio:"16:9"}},l={args:{src:"https://source.unsplash.com/featured/800x600/?mountains",alt:"Mountain landscape",lowResSrc:"https://source.unsplash.com/featured/80x60/?mountains"}},o={args:{src:"https://non-existent-image-url.jpg",alt:"This image will fail to load"}},n={args:{src:"https://source.unsplash.com/featured/600x400/?technology",alt:"Technology image",aspectRatio:"3:2"}};n.parameters={viewport:{defaultViewport:"mobile1"}};var x,L,S;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    src: 'https://source.unsplash.com/featured/800x600/?nature',
    alt: 'Nature landscape from Unsplash'
  }
}`,...(S=(L=r.parameters)==null?void 0:L.docs)==null?void 0:S.source}}};var I,A,z;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    src: 'https://source.unsplash.com/featured/800x450/?landscape',
    alt: 'Landscape with 16:9 aspect ratio',
    aspectRatio: '16:9'
  }
}`,...(z=(A=c.parameters)==null?void 0:A.docs)==null?void 0:z.source}}};var v,q,E;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    src: 'https://source.unsplash.com/featured/800x600/?mountains',
    alt: 'Mountain landscape',
    lowResSrc: 'https://source.unsplash.com/featured/80x60/?mountains'
  }
}`,...(E=(q=l.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};var N,j,C,T,k;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    src: 'https://non-existent-image-url.jpg',
    alt: 'This image will fail to load'
  }
}`,...(C=(j=o.parameters)==null?void 0:j.docs)==null?void 0:C.source},description:{story:`## Component Usage

\`\`\`jsx
import { LazyImage } from 'components/ui';

function MyComponent() {
  return (
    <LazyImage 
      src="/path/to/image.jpg" 
      alt="Image description"
      aspectRatio="16:9"
      lowResSrc="/path/to/low-res-image.jpg"
    />
  );
}
\`\`\`

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| src | string | required | Source URL of the image |
| alt | string | required | Alt text for the image (required for accessibility) |
| className | string | undefined | Additional CSS classes to apply |
| lowResSrc | string | undefined | Low resolution version of image to show while loading |
| imgProps | object | {} | Additional props to pass to img element |
| aspectRatio | string | undefined | Aspect ratio to maintain (e.g., '16:9', '4:3', '1:1') |
| onLoad | function | undefined | Callback when image loads |
| onError | function | undefined | Callback when image fails to load |

## Accessibility

This component follows these accessibility best practices:
- Uses appropriate \`alt\` text for screen readers
- Shows loading state with appropriate ARIA roles
- Error state with proper alert role
- Low-res placeholder images have empty alt and aria-hidden

## Edge Cases

The following stories demonstrate edge cases and special scenarios.`,...(k=(T=o.parameters)==null?void 0:T.docs)==null?void 0:k.description}}};var P,U,D;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    src: 'https://source.unsplash.com/featured/600x400/?technology',
    alt: 'Technology image',
    aspectRatio: '3:2'
  }
}`,...(D=(U=n.parameters)==null?void 0:U.docs)==null?void 0:D.source}}};const ie=["Default","WithAspectRatio","WithPlaceholder","ErrorState","Responsive"];export{r as Default,o as ErrorState,n as Responsive,c as WithAspectRatio,l as WithPlaceholder,ie as __namedExportsOrder,ne as default};
