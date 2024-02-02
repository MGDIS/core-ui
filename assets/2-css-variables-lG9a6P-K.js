import{j as e}from"./jsx-runtime-G3Up6C-Q.js";import{M as t}from"./index-0IbnH6uf.js";import{u as r}from"./index-vQ1q8ePa.js";import"./iframe-tZtztFxu.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-ogXoivrg.js";import"./index-MVkJqIoJ.js";import"./index-PPLHz8o0.js";function n(o){const s=Object.assign({h1:"h1",p:"p",a:"a",h2:"h2",code:"code",h3:"h3",pre:"pre"},r(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"CSS Variables"}),`
`,e.jsx(s.h1,{id:"css-variables",children:"CSS Variables"}),`
`,e.jsxs(s.p,{children:["To customize our components we are using ",e.jsx(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",target:"_blank",rel:"nofollow noopener noreferrer",children:"CSS variables"}),"."]}),`
`,e.jsxs(s.p,{children:["Global CSS variables ",e.jsx(s.a,{href:"https://gitlab.mgdis.fr/core/core-ui/core-ui/-/blob/master/packages/mg-components/src/styles/variables.css",target:"_blank",rel:"nofollow noopener noreferrer",children:"can be find here"}),"."]}),`
`,e.jsx(s.h2,{id:"how-to-customize",children:"How to customize"}),`
`,e.jsxs(s.p,{children:["CSS variable customization must be done after ",e.jsx(s.code,{children:"variables.css"})," import."]}),`
`,e.jsx(s.h3,{id:"global",children:"Global"}),`
`,e.jsxs(s.p,{children:["For a global customization you will prefer to use the ",e.jsx(s.code,{children:":root"})," selector:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-CSS",children:`:root {
  /* font */
  --font-size: 1.4rem;
  --line-height: 1.5;
  --font-family: 'Ubuntu';
  --font-family-heading: 'Montserrat';
  /* mg-button */
  --mg-button-border-radius: calc(var(--default-size) / 2);
  /* mg-tooltip */
  --mg-tooltip-border-radius: 1rem;
  --mg-tooltip-background-color: 342, 100%, 97%;
  ...
}
`})}),`
`,e.jsx(s.h3,{id:"localized",children:"Localized"}),`
`,e.jsx(s.p,{children:"When your web component needs to be costomized only on a Localized area, you will prefer to use a CSS selector:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<!-- Style -->
<style>
  .message-without-radius {
    --mg-message-border-radius: 0;
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
`,e.jsx(s.h2,{id:"more-variables",children:"More variables"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"variable.css"})," file does not contain all the variables."]}),`
`,e.jsxs(s.p,{children:["Components like ",e.jsx(s.a,{href:"https://gitlab.mgdis.fr/core/core-ui/core-ui/-/blob/master/packages/mg-components/src/components/molecules/mg-form/mg-form.scss",target:"_blank",rel:"nofollow noopener noreferrer",children:e.jsx(s.code,{children:"mg-form"})})," will define variables to set how ",e.jsx(s.code,{children:"mg-inputs"})," will be displayed."]}),`
`,e.jsxs(s.p,{children:["Other components like ",e.jsx(s.a,{href:"https://gitlab.mgdis.fr/core/core-ui/core-ui/-/blob/master/packages/mg-components/src/components/atoms/mg-button/mg-button.scss#L19",target:"_blank",rel:"nofollow noopener noreferrer",children:e.jsx(s.code,{children:"mg-button"})})," or ",e.jsx(s.a,{href:"https://gitlab.mgdis.fr/core/core-ui/core-ui/-/blob/master/packages/mg-components/src/components/molecules/inputs/styles/mg-input-box.scss#L25",target:"_blank",rel:"nofollow noopener noreferrer",children:e.jsx(s.code,{children:"mg-inputs"})})," can be customized using CSS variables but are using the fallback value."]})]})}function p(o={}){const{wrapper:s}=Object.assign({},r(),o.components);return s?e.jsx(s,Object.assign({},o,{children:e.jsx(n,o)})):n(o)}export{p as default};
