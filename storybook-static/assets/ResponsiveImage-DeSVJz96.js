import{a as f}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import{r as o}from"./index-B6-Y_Zgq.js";import{P as e}from"./index-Co38GRlK.js";import{u as F}from"./useIntersectionObserver-D-75sPdH.js";/* empty css                 */import{m as V}from"./proxy-Vqfb2hit.js";const g=({src:a,alt:v="",className:h="",placeholderSrc:p,lazy:r=!0,objectFit:y="cover",animation:l,threshold:b=.1,onLoad:s,onError:i,sizes:S,srcSet:n,...m})=>{const[q,j]=o.useState(!r),[I,w]=o.useState(!1),[c,d]=F({threshold:b}),[R,z]=o.useState(p||""),C=["responsive-image",q?"loaded":"loading",I?"error":"",h].filter(Boolean).join(" ");o.useEffect(()=>{if(!r||d){const t=new Image;t.src=a,n&&(t.srcset=n),t.onload=()=>{z(a),j(!0),s&&s()},t.onerror=()=>{w(!0),i&&i()}}},[r,d,a,n,s,i]);const E={objectFit:y,...m.style||{}},u={src:R||p||a,alt:v,className:C,style:E,sizes:S,...m};return l?f(V.img,{ref:r?c:void 0,...u,...l}):f("img",{ref:r?c:void 0,...u})};g.propTypes={src:e.string.isRequired,alt:e.string,className:e.string,placeholderSrc:e.string,lazy:e.bool,objectFit:e.oneOf(["contain","cover","fill","none","scale-down"]),animation:e.object,threshold:e.number,onLoad:e.func,onError:e.func,sizes:e.string,srcSet:e.string};g.__docgenInfo={description:`ResponsiveImage component for optimized image loading with lazy loading,
placeholder support, and animation capabilities.

@component
@param {Object} props - Component props
@param {string} props.src - Source URL of the image
@param {string} [props.alt=''] - Alt text for the image
@param {string} [props.className=''] - Additional CSS classes
@param {string} [props.placeholderSrc] - Low-quality placeholder image to show while loading
@param {boolean} [props.lazy=true] - Whether to lazy load the image
@param {string} [props.objectFit='cover'] - CSS object-fit property
@param {Object} [props.animation] - Framer Motion animation properties
@param {number} [props.threshold=0.1] - Intersection observer threshold (0-1)
@param {Function} [props.onLoad] - Callback when image is loaded
@param {Function} [props.onError] - Callback when image fails to load
@param {string} [props.sizes] - Sizes attribute for responsive images
@param {string} [props.srcSet] - SrcSet attribute for responsive images
@returns {ReactElement} ResponsiveImage component

@example
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
/>`,methods:[],displayName:"ResponsiveImage",props:{alt:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},className:{defaultValue:{value:"''",computed:!1},description:"",type:{name:"string"},required:!1},lazy:{defaultValue:{value:"true",computed:!1},description:"",type:{name:"bool"},required:!1},objectFit:{defaultValue:{value:"'cover'",computed:!1},description:"",type:{name:"enum",value:[{value:"'contain'",computed:!1},{value:"'cover'",computed:!1},{value:"'fill'",computed:!1},{value:"'none'",computed:!1},{value:"'scale-down'",computed:!1}]},required:!1},threshold:{defaultValue:{value:"0.1",computed:!1},description:"",type:{name:"number"},required:!1},src:{description:"",type:{name:"string"},required:!0},placeholderSrc:{description:"",type:{name:"string"},required:!1},animation:{description:"",type:{name:"object"},required:!1},onLoad:{description:"",type:{name:"func"},required:!1},onError:{description:"",type:{name:"func"},required:!1},sizes:{description:"",type:{name:"string"},required:!1},srcSet:{description:"",type:{name:"string"},required:!1}}};export{g as R};
