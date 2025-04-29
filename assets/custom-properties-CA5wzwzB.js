import{j as e,M as r}from"./index-D_rLXJtH.js";import{useMDXComponents as t}from"./index-Bigvclkz.js";import"./iframe-CxGhc3DS.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";function n(o){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...t(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Style/Custom Properties"}),`
`,e.jsx(s.h1,{id:"custom-properties",children:"Custom Properties"}),`
`,e.jsxs(s.p,{children:["To customize our components we are using ",e.jsx(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",rel:"nofollow",children:"Custom Properties"}),"."]}),`
`,e.jsx(s.p,{children:"Custom properties are included in our stylesheets."}),`
`,e.jsx(s.h2,{id:"how-to-customize",children:"How to Customize"}),`
`,e.jsx(s.p,{children:"Custom properties customization must be done after the stylesheets import."}),`
`,e.jsx(s.h3,{id:"global",children:"Global"}),`
`,e.jsxs(s.p,{children:["For a global customization, you will prefer to use the ",e.jsx(s.code,{children:":root"})," selector:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-css",children:`:root {
  /* font */
  --font-size: 1.4rem;
  --line-height: 1.5;
  --font-family: 'Ubuntu';
  --font-family-heading: 'Montserrat';
  /* mg-button */
  --mg-button-border-radius: var(--mg-b-size-radius);
  /* mg-tooltip */
  --mg-c-tooltip-border-radius: var(--mg-b-size-radius);
  --mg-c-tooltip-color-background: var(--mg-b-color-dark);
  ...
}
`})}),`
`,e.jsx(s.h3,{id:"localized",children:"Localized"}),`
`,e.jsx(s.p,{children:"When your web component needs to be customized only in a localized area, you will prefer to use a CSS selector:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<!-- Style -->
<style>
  .message-without-radius {
    --mg-c-message-border-radius: 0;
  }
</style>

<!-- On component -->
<mg-message class="message-without-radius">This message should not have radius</mg-message>

<!-- or on a defined area -->
<div class="message-without-radius">
  <mg-message>This message should not have radius</mg-message>
  <mg-message>This message also</mg-message>
</div>
`})}),`
`,e.jsx(s.h2,{id:"more-custom-properties",children:"More custom properties"}),`
`,e.jsx(s.p,{children:"Other custom properties are available."}),`
`,e.jsxs(s.p,{children:["Components like ",e.jsx(s.a,{href:"https://gitlab.mgdis.fr/core/core-ui/core-ui/-/blob/master/packages/styles/scss/components/mg-form.scss",rel:"nofollow",children:e.jsx(s.code,{children:"mg-form"})})," will define variables to set how ",e.jsx(s.code,{children:"mg-input-*"})," will be displayed."]}),`
`,e.jsxs(s.p,{children:["Other components like ",e.jsx(s.a,{href:"https://gitlab.mgdis.fr/core/core-ui/core-ui/-/blob/master/packages/styles/scss/components/mg-button.scss",rel:"nofollow",children:e.jsx(s.code,{children:"mg-button"})})," or ",e.jsx(s.a,{href:"https://gitlab.mgdis.fr/core/core-ui/core-ui/-/blob/master/packages/styles/scss/components/_mg-input-box.scss",rel:"nofollow",children:e.jsx(s.code,{children:"mg-input-*"})})," can be customized using custom properties but are using the fallback value (ex: ",e.jsx(s.code,{children:"text-align: var(--mg-c-input-text-align, left);"}),")."]})]})}function u(o={}){const{wrapper:s}={...t(),...o.components};return s?e.jsx(s,{...o,children:e.jsx(n,{...o})}):n(o)}export{u as default};
