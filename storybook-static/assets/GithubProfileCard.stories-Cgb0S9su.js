import"./index-B6-Y_Zgq.js";import{G as D}from"./GithubProfileCard-6MlIJpjd.js";import{w as p,e as t,u as M}from"./index-DZ0MIZXx.js";import{a as l}from"./mockData-Bv86VHFx.js";import{w as S}from"./decorators-DZYmSUt9.js";import"./_commonjsHelpers-CqkleIqs.js";import"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./jsx-runtime-BuIwgEqq.js";import"./index-Co38GRlK.js";import"./index-LaBibFJR.js";import"./SocialLinks-DRjwrL1j.js";import"./PortfolioContext-CM91bWnU.js";import"./Button-DTt19CJR.js";import"./iconify-BRCYAcB5.js";import"./proxy-Vqfb2hit.js";const Q={title:"Molecules/GithubProfileCard",component:D,tags:["autodocs"],decorators:[S],argTypes:{prof:{control:"object",description:"GitHub profile data object"},error:{control:"text",description:"Error message to display when profile loading fails"},onRetry:{action:"retried",description:"Callback function when retry button is clicked"}},parameters:{docs:{description:{component:"A component that displays GitHub profile information with a card layout. Supports loading, error, and success states. Integrates with SocialLinks component for providing contact options."}},a11y:{config:{rules:[{id:"button-name",enabled:!0},{id:"image-alt",enabled:!0}]}}}},s={args:{prof:l}};s.play=async({canvasElement:a,step:r})=>{const e=p(a);await r("Initial render check",()=>{t(e.getByAltText(`${l.name||"Profile"} avatar`)).toBeInTheDocument(),t(e.getByText("Reach Out to Me!")).toBeInTheDocument(),t(e.getByText(l.bio)).toBeInTheDocument(),t(e.getByText(l.location)).toBeInTheDocument()})};const o={args:{prof:null}};o.play=async({canvasElement:a,step:r})=>{const e=p(a);await r("Loading state check",()=>{t(e.getByText("GitHub Profile Unavailable")).toBeInTheDocument(),t(e.getByText("Unable to load GitHub profile data. Please try again later.")).toBeInTheDocument()})};const n={args:{prof:null,error:"Failed to fetch GitHub profile. Rate limit exceeded.",onRetry:()=>console.log("Retry clicked")}};n.play=async({canvasElement:a,step:r})=>{const e=p(a);await r("Error state check",()=>{t(e.getByText("GitHub Profile Unavailable")).toBeInTheDocument(),t(e.getByText("Failed to fetch GitHub profile. Rate limit exceeded.")).toBeInTheDocument(),t(e.getByRole("button",{name:/retry/i})).toBeInTheDocument()}),await r("Retry button interaction",async()=>{await M.click(e.getByRole("button",{name:/retry/i}))})};const i={args:{prof:{avatar_url:"https://via.placeholder.com/150",name:"Minimal Profile"}}},c={args:{prof:l}};c.parameters={viewport:{defaultViewport:"mobile1"}};var d,m,u;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    prof: mockGithubProfile
  }
}`,...(u=(m=s.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var f,h,g,b,y;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    prof: null
  }
}`,...(g=(h=o.parameters)==null?void 0:h.docs)==null?void 0:g.source},description:{story:`The loading state is shown when no profile data is provided.
This occurs when the GitHub API request is still pending or
when no profile data is available.`,...(y=(b=o.parameters)==null?void 0:b.docs)==null?void 0:y.description}}};var w,P,T,G,v;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    prof: null,
    error: 'Failed to fetch GitHub profile. Rate limit exceeded.',
    onRetry: () => console.log('Retry clicked')
  }
}`,...(T=(P=n.parameters)==null?void 0:P.docs)==null?void 0:T.source},description:{story:`The error state displays when there's an issue fetching profile data.
It provides a retry button for the user to attempt to fetch the data again.`,...(v=(G=n.parameters)==null?void 0:G.docs)==null?void 0:v.description}}};var x,B,I,R,k;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    prof: {
      avatar_url: "https://via.placeholder.com/150",
      name: "Minimal Profile"
      // No bio or location
    }
  }
}`,...(I=(B=i.parameters)==null?void 0:B.docs)==null?void 0:I.source},description:{story:`## Component Usage

\`\`\`jsx
import GithubProfileCard from 'components/GithubProfileCard';

function MyComponent() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchProfile = async () => {
    try {
      const data = await fetch('https://api.github.com/users/username');
      setProfile(await data.json());
      setError(null);
    } catch (err) {
      setError('Failed to fetch profile');
    }
  };
  
  return <GithubProfileCard prof={profile} error={error} onRetry={fetchProfile} />;
}
\`\`\`

## Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| prof | object | null | GitHub profile data object with avatar_url, name, bio, location fields |
| error | string | null | Error message to display when profile loading fails |
| onRetry | function | undefined | Callback function when retry button is clicked |

## Accessibility

This component follows these accessibility best practices:
- Uses semantic HTML elements for structure
- Provides meaningful alt text for the profile image
- Ensures proper color contrast for text elements
- Includes proper ARIA roles for interactive elements
- Has accessible name for the retry button

## Edge Cases

The following stories demonstrate edge cases and special scenarios.`,...(k=(R=i.parameters)==null?void 0:R.docs)==null?void 0:k.description}}};var C,E,H;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    prof: mockGithubProfile
  }
}`,...(H=(E=c.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};const X=["WithProfile","Loading","Error","MinimalProfile","Mobile"];export{n as Error,o as Loading,i as MinimalProfile,c as Mobile,s as WithProfile,X as __namedExportsOrder,Q as default};
