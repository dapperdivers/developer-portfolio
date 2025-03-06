import"./index-B6-Y_Zgq.js";import{R as D}from"./ResponsiveImage-DeSVJz96.js";import{w as M,e as c}from"./index-DZ0MIZXx.js";import"./_commonjsHelpers-CqkleIqs.js";import"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./jsx-runtime-BuIwgEqq.js";import"./index-Co38GRlK.js";import"./useIntersectionObserver-D-75sPdH.js";/* empty css                 */import"./proxy-Vqfb2hit.js";const J={title:"Atoms/ResponsiveImage",component:D,tags:["autodocs"],argTypes:{src:{control:"text",description:"Source URL of the image"},alt:{control:"text",description:"Alt text for the image"},className:{control:"text",description:"Additional CSS classes"},placeholderSrc:{control:"text",description:"Low-quality placeholder image to show while loading"},lazy:{control:"boolean",description:"Whether to lazy load the image",defaultValue:!0},objectFit:{control:"select",options:["contain","cover","fill","none","scale-down"],description:"CSS object-fit property",defaultValue:"cover"},animation:{control:"object",description:"Framer Motion animation properties"},threshold:{control:"number",description:"Intersection observer threshold (0-1)",defaultValue:.1},onLoad:{action:"loaded",description:"Callback when image is loaded"},onError:{action:"error occurred",description:"Callback when image fails to load"},sizes:{control:"text",description:"Sizes attribute for responsive images"},srcSet:{control:"text",description:"SrcSet attribute for responsive images"}},parameters:{docs:{description:{component:"ResponsiveImage component for optimized image loading with lazy loading, placeholder support, and animation capabilities."}},a11y:{config:{rules:[{id:"image-alt",enabled:!0}]}}}},t={args:{src:"https://source.unsplash.com/featured/600x400/?nature",alt:"Nature landscape",objectFit:"cover"}};t.play=async({canvasElement:E,step:W})=>{const k=M(E);await W("Initial render check",async()=>{const i=k.getByRole("img");await c(i).toBeInTheDocument(),await c(i).toHaveAttribute("alt","Nature landscape")})};const s={args:{src:"https://source.unsplash.com/featured/600x400/?mountains",alt:"Mountain landscape",placeholderSrc:"https://source.unsplash.com/featured/60x40/?mountains",objectFit:"cover"}},o={args:{src:"https://source.unsplash.com/featured/600x400/?ocean",alt:"Ocean view",animation:{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{duration:.5}}}},n={args:{src:"https://source.unsplash.com/featured/600x400/?city",alt:"City skyline",lazy:!1,objectFit:"cover"}},e={args:{src:"https://non-existent-image-url.jpg",alt:"This image will fail to load"}},r={args:{src:"https://source.unsplash.com/featured/800x600/?landscape",alt:"Responsive landscape image",srcSet:`
    https://source.unsplash.com/featured/400x300/?landscape 400w,
    https://source.unsplash.com/featured/800x600/?landscape 800w,
    https://source.unsplash.com/featured/1200x900/?landscape 1200w
  `,sizes:"(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"}},a={args:{src:"https://source.unsplash.com/featured/600x400/?technology",alt:"Technology image",objectFit:"contain"}};a.parameters={viewport:{defaultViewport:"mobile1"}};var l,p,d;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    src: 'https://source.unsplash.com/featured/600x400/?nature',
    alt: 'Nature landscape',
    objectFit: 'cover'
  }
}`,...(d=(p=t.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var m,u,h;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    src: 'https://source.unsplash.com/featured/600x400/?mountains',
    alt: 'Mountain landscape',
    placeholderSrc: 'https://source.unsplash.com/featured/60x40/?mountains',
    // Low-res version
    objectFit: 'cover'
  }
}`,...(h=(u=s.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var g,f,x;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    src: 'https://source.unsplash.com/featured/600x400/?ocean',
    alt: 'Ocean view',
    animation: {
      initial: {
        opacity: 0,
        scale: 0.8
      },
      animate: {
        opacity: 1,
        scale: 1
      },
      transition: {
        duration: 0.5
      }
    }
  }
}`,...(x=(f=o.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var y,w,S;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    src: 'https://source.unsplash.com/featured/600x400/?city',
    alt: 'City skyline',
    lazy: false,
    objectFit: 'cover'
  }
}`,...(S=(w=n.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var b,v,j,z,R;e.parameters={...e.parameters,docs:{...(b=e.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    src: 'https://non-existent-image-url.jpg',
    alt: 'This image will fail to load'
  }
}`,...(j=(v=e.parameters)==null?void 0:v.docs)==null?void 0:j.source},description:{story:`## Component Usage

\`\`\`jsx
import ResponsiveImage from '@atoms/ResponsiveImage';

function MyComponent() {
  return (
    <ResponsiveImage
      src="/path/to/image.jpg"
      alt="Description"
      lazy={true}
      animation={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 }
      }}
      placeholderSrc="/path/to/placeholder.jpg"
    />
  );
}
\`\`\`

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| src | string | required | Source URL of the image |
| alt | string | '' | Alt text for the image |
| className | string | '' | Additional CSS classes |
| placeholderSrc | string | undefined | Low-quality placeholder image to show while loading |
| lazy | boolean | true | Whether to lazy load the image |
| objectFit | string | 'cover' | CSS object-fit property ('contain', 'cover', 'fill', 'none', 'scale-down') |
| animation | object | undefined | Framer Motion animation properties |
| threshold | number | 0.1 | Intersection observer threshold (0-1) |
| onLoad | function | undefined | Callback when image is loaded |
| onError | function | undefined | Callback when image fails to load |
| sizes | string | undefined | Sizes attribute for responsive images |
| srcSet | string | undefined | SrcSet attribute for responsive images |

## Accessibility

This component follows these accessibility best practices:
- Provides appropriate alt text for screen readers
- Uses semantic HTML img tags
- Error states are clearly indicated

## Edge Cases

The following stories demonstrate edge cases and special scenarios.`,...(R=(z=e.parameters)==null?void 0:z.docs)==null?void 0:R.description}}};var C,F,I;r.parameters={...r.parameters,docs:{...(C=r.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    src: 'https://source.unsplash.com/featured/800x600/?landscape',
    alt: 'Responsive landscape image',
    srcSet: \`
    https://source.unsplash.com/featured/400x300/?landscape 400w,
    https://source.unsplash.com/featured/800x600/?landscape 800w,
    https://source.unsplash.com/featured/1200x900/?landscape 1200w
  \`,
    sizes: '(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px'
  }
}`,...(I=(F=r.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};var L,T,A;a.parameters={...a.parameters,docs:{...(L=a.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    src: 'https://source.unsplash.com/featured/600x400/?technology',
    alt: 'Technology image',
    objectFit: 'contain'
  }
}`,...(A=(T=a.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};const K=["Default","WithPlaceholder","WithAnimation","EagerLoading","ErrorState","WithSrcSet","ResponsiveViewport"];export{t as Default,n as EagerLoading,e as ErrorState,a as ResponsiveViewport,o as WithAnimation,s as WithPlaceholder,r as WithSrcSet,K as __namedExportsOrder,J as default};
