import{a as l}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{G as M,a as u}from"./GithubProfile-RuwLMCHm.js";import{w as U,e as W,u as _}from"./index-DZ0MIZXx.js";import{P as q}from"./PortfolioContext-CM91bWnU.js";import{a as m,b as V}from"./mockData-Bv86VHFx.js";import{w as z}from"./decorators-DZYmSUt9.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Co38GRlK.js";import"./Loading-DnxwpyrZ.js";import"./GithubProfileCard-6MlIJpjd.js";import"./index-LaBibFJR.js";import"./SocialLinks-DRjwrL1j.js";import"./Button-DTt19CJR.js";import"./iconify-BRCYAcB5.js";import"./proxy-Vqfb2hit.js";import"./Section-D0daCtUT.js";/* empty css                 */import"./envConfig-DP59KUwZ.js";jest.mock("axios",()=>({create:jest.fn(()=>({get:jest.fn()})),isCancel:jest.fn(()=>!1)}));const J=(()=>{let e={};return{getItem:jest.fn(t=>e[t]||null),setItem:jest.fn((t,n)=>{e[t]=n}),clear:jest.fn(()=>{e={}})}})();Object.defineProperty(window,"localStorage",{value:J});const he={title:"Organisms/GithubProfile",component:M,tags:["autodocs"],decorators:[z],parameters:{docs:{description:{component:"GitHub profile section that fetches and displays user data from the GitHub API. Includes loading states, error handling, and caching."}},a11y:{config:{rules:[{id:"button-name",enabled:!0},{id:"image-alt",enabled:!0}]}}}},c=()=>l(M,{}),d=e=>{const t={...V,openSource:{githubUserName:e}};return n=>l(q.Provider,{value:t,children:l(n,{})})},N=(e,t=!1)=>{jest.clearAllMocks(),window.localStorage.clear(),t?u.create().get.mockRejectedValueOnce({response:{data:{message:e}}}):u.create().get.mockResolvedValueOnce({data:m})},o=c.bind({});o.decorators=[d("dmackley")];o.parameters={mockData:[{url:"https://api.github.com/users/dmackley",method:"GET",status:200,response:m}]};const s=c.bind({});s.decorators=[d("dmackley")];s.parameters={mockData:[{url:"https://api.github.com/users/dmackley",method:"GET",delay:1e4}]};const i=c.bind({});i.decorators=[d("dmackley")];i.parameters={mockData:[{url:"https://api.github.com/users/dmackley",method:"GET",status:403,response:{message:"API rate limit exceeded"}}]};const r=c.bind({});r.decorators=[d("dmackley")];r.parameters={mockData:[{url:"https://api.github.com/users/dmackley",method:"GET",status:403,response:{message:"API rate limit exceeded"}}]};r.play=async({canvasElement:e,step:t})=>{const n=U(e);await t("Wait for error state to appear",async()=>{const p=await n.findByRole("button",{name:/retry/i});await W(p).toBeInTheDocument(),N(m),await _.click(p)})};const a=c.bind({});a.decorators=[d("dmackley")];a.parameters={docs:{description:{story:"When the GitHub API request fails but cached data exists, the component displays the cached profile data with a notice about using cached data."}}};a.play=async({canvasElement:e})=>{window.localStorage.setItem("github-profile-dmackley",JSON.stringify({data:m,timestamp:Date.now()})),N("API rate limit exceeded",!0)};var h,f,b,g,y;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:"() => <GithubProfile />",...(b=(f=o.parameters)==null?void 0:f.docs)==null?void 0:b.source},description:{story:`Default story shows the GitHub profile with a successful API response.
Here we mock axios to return profile data.`,...(y=(g=o.parameters)==null?void 0:g.docs)==null?void 0:y.description}}};var w,k,P,G,x;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:"() => <GithubProfile />",...(P=(k=s.parameters)==null?void 0:k.docs)==null?void 0:P.source},description:{story:`Loading state shows what the component looks like while waiting for
the GitHub API response.`,...(x=(G=s.parameters)==null?void 0:G.docs)==null?void 0:x.description}}};var I,S,v,A,j;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:"() => <GithubProfile />",...(v=(S=i.parameters)==null?void 0:S.docs)==null?void 0:v.source},description:{story:`Error state shows how the component handles API errors.
Here we mock axios to return an error response.`,...(j=(A=i.parameters)==null?void 0:A.docs)==null?void 0:j.description}}};var T,E,H,C,D;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:"() => <GithubProfile />",...(H=(E=r.parameters)==null?void 0:E.docs)==null?void 0:H.source},description:{story:"This story demonstrates the retry functionality when an error occurs.",...(D=(C=r.parameters)==null?void 0:C.docs)==null?void 0:D.description}}};var O,R,L,B,F;a.parameters={...a.parameters,docs:{...(O=a.parameters)==null?void 0:O.docs,source:{originalSource:"() => <GithubProfile />",...(L=(R=a.parameters)==null?void 0:R.docs)==null?void 0:L.source},description:{story:`## Component Usage

\`\`\`jsx
import GithubProfile from '../containers/GithubProfile';

// The component expects a GitHub username to be defined in the 'portfolio.js' file:
// export const openSource = { githubUserName: "username" };

function App() {
  return <GithubProfile />;
}
\`\`\`

## Technical Details

This component:
- Fetches GitHub profile data using axios
- Implements caching via localStorage
- Handles loading states during data fetching
- Provides error handling and retry functionality
- Sanitizes the received data for security

## Accessibility

This component follows these accessibility best practices:
- Provides clear loading indicators
- Uses properly labeled retry button for error states
- Ensures proper alt text for GitHub avatar image
- Maintains focus management during state transitions

## Edge Cases

The component has robust handling for various edge cases:
- API rate limiting
- Network failures
- Invalid GitHub usernames
- Cache usage when API is unavailable
This story demonstrates the cached data fallback.
When the API request fails but cached data exists,
the component will display the cached data with a notice.`,...(F=(B=a.parameters)==null?void 0:B.docs)==null?void 0:F.description}}};const fe=["Success","Loading","Error","Retry","CachedFallback"];export{a as CachedFallback,i as Error,s as Loading,r as Retry,o as Success,fe as __namedExportsOrder,he as default};
