import{i as e}from"./preload-helper-xPQekRTU.js";import{C as t,d as n,u as r}from"./blocks-CjYun8B8.js";import{s as i}from"./chunk-LITCR56V-Boh1HQQl.js";import{t as a}from"./mdx-react-shim-DHrebs-T.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Style/Custom Properties`}),`
`,(0,c.jsx)(n.h1,{id:`custom-properties`,children:`Custom Properties`}),`
`,(0,c.jsxs)(n.p,{children:[`To customize our components we are using `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties`,rel:`nofollow`,children:`Custom Properties`}),`.`]}),`
`,(0,c.jsx)(n.p,{children:`Custom properties are included in our stylesheets.`}),`
`,(0,c.jsx)(n.h2,{id:`how-to-customize`,children:`How to Customize`}),`
`,(0,c.jsx)(n.p,{children:`Custom properties customization must be done after the stylesheets import.`}),`
`,(0,c.jsx)(n.h3,{id:`global`,children:`Global`}),`
`,(0,c.jsxs)(n.p,{children:[`For a global customization, you will prefer to use the `,(0,c.jsx)(n.code,{children:`:root`}),` selector:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`:root {
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
`,(0,c.jsx)(n.h3,{id:`localized`,children:`Localized`}),`
`,(0,c.jsx)(n.p,{children:`When your web component needs to be customized only in a localized area, you will prefer to use a CSS selector:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<!-- Style -->
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
`,(0,c.jsx)(n.h2,{id:`more-custom-properties`,children:`More custom properties`}),`
`,(0,c.jsx)(n.p,{children:`Other custom properties are available.`}),`
`,(0,c.jsxs)(n.p,{children:[`Components like `,(0,c.jsx)(n.a,{href:`https://gitlab.mgdis.fr/core/core-ui/core-ui/-/blob/master/packages/styles/scss/components/mg-form.scss`,rel:`nofollow`,children:(0,c.jsx)(n.code,{children:`mg-form`})}),` will define variables to set how `,(0,c.jsx)(n.code,{children:`mg-input-*`}),` will be displayed.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Other components like `,(0,c.jsx)(n.a,{href:`https://gitlab.mgdis.fr/core/core-ui/core-ui/-/blob/master/packages/styles/scss/components/mg-button.scss`,rel:`nofollow`,children:(0,c.jsx)(n.code,{children:`mg-button`})}),` or `,(0,c.jsx)(n.a,{href:`https://gitlab.mgdis.fr/core/core-ui/core-ui/-/blob/master/packages/styles/scss/components/_mg-input-box.scss`,rel:`nofollow`,children:(0,c.jsx)(n.code,{children:`mg-input-*`})}),` can be customized using custom properties but are using the fallback value (ex: `,(0,c.jsx)(n.code,{children:`text-align: var(--mg-c-input-text-align, left);`}),`).`]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=i(),a(),n()}))();export{s as default};