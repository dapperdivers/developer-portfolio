import{a as i}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{H as A}from"./Head-PA0Co7_A.js";import{m as s}from"./mockData-Bv86VHFx.js";import{H}from"./index.esm-B_4_A6mH.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";const C={},T=U=>i(H,{context:C,children:i(U,{})}),B={title:"Atoms/Head",component:A,tags:["autodocs"],decorators:[T],argTypes:{title:{control:"text",description:"Page title"},description:{control:"text",description:"Meta description for SEO"},imageUrl:{control:"text",description:"URL for Open Graph and Twitter card images"},imageAlt:{control:"text",description:"Alt text for the Open Graph and Twitter card images"},canonicalUrl:{control:"text",description:"Canonical URL for SEO"},structuredData:{control:"object",description:"Schema.org structured data for rich results"}},parameters:{docs:{description:{component:"Head component for managing document metadata, SEO, and sharing information using react-helmet-async."}},a11y:{disable:!0}}},t={args:{}};t.parameters={docs:{description:{story:"The Head component with default values for title, description, etc."}}};const r={args:{title:"Derek Mackley | Portfolio Projects",description:"View my latest web development projects and case studies",canonicalUrl:"https://example.com/projects"}};r.parameters={docs:{description:{story:"Customized metadata for a specific page, with modified title, description and canonical URL."}}};const e={args:{title:"Derek Mackley | Project Case Study",description:"How I built a high-performance React application",imageUrl:"https://example.com/project-preview.jpg",imageAlt:"Screenshot of project dashboard",canonicalUrl:"https://example.com/case-study"}},a={args:{title:"Derek Mackley | About Me",description:"Learn about my background, skills and experience",structuredData:s.person}};a.parameters={docs:{description:{story:"Using structured data (schema.org) to enhance search engine results with rich data."}}};const o={args:{title:"How to Build a Developer Portfolio | Derek Mackley",description:"A comprehensive guide to creating an effective developer portfolio website",imageUrl:"https://example.com/article-featured-image.jpg",structuredData:s.article}},c={args:{title:"Portfolio Template | Derek Mackley",description:"A customizable portfolio template for developers",structuredData:s.product}};var n,p,d;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {}
}`,...(d=(p=t.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var l,m,u;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    title: "Derek Mackley | Portfolio Projects",
    description: "View my latest web development projects and case studies",
    canonicalUrl: "https://example.com/projects"
  }
}`,...(u=(m=r.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,f,h,k,D;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    title: "Derek Mackley | Project Case Study",
    description: "How I built a high-performance React application",
    imageUrl: "https://example.com/project-preview.jpg",
    imageAlt: "Screenshot of project dashboard",
    canonicalUrl: "https://example.com/case-study"
  }
}`,...(h=(f=e.parameters)==null?void 0:f.docs)==null?void 0:h.source},description:{story:`Social sharing metadata is critical for proper rendering when links 
are shared on platforms like Twitter, Facebook, LinkedIn, etc.`,...(D=(k=e.parameters)==null?void 0:k.docs)==null?void 0:D.description}}};var y,S,x;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    title: "Derek Mackley | About Me",
    description: "Learn about my background, skills and experience",
    structuredData: mockStructuredData.person
  }
}`,...(x=(S=a.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var w,b,P;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    title: "How to Build a Developer Portfolio | Derek Mackley",
    description: "A comprehensive guide to creating an effective developer portfolio website",
    imageUrl: "https://example.com/article-featured-image.jpg",
    structuredData: mockStructuredData.article
  }
}`,...(P=(b=o.parameters)==null?void 0:b.docs)==null?void 0:P.source}}};var j,v,M;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    title: "Portfolio Template | Derek Mackley",
    description: "A customizable portfolio template for developers",
    structuredData: mockStructuredData.product
  }
}`,...(M=(v=c.parameters)==null?void 0:v.docs)==null?void 0:M.source}}};const G=["Default","CustomMetadata","SocialSharing","StructuredData","ArticlePage","ProductPage"];export{o as ArticlePage,r as CustomMetadata,t as Default,c as ProductPage,e as SocialSharing,a as StructuredData,G as __namedExportsOrder,B as default};
