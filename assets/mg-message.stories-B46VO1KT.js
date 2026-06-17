import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-D41dZqYB.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l;e((()=>{i(),n(),a={component:`mg-message`,title:`Molecules/mg-message`,parameters:{actions:{handles:[`component-show`,`component-hide`]}}},o=e=>r(`mg-message`,{...t(e,{variant:`info`,variantStyle:`bar-left`},[``,`actions`]),innerHTML:`${e[``]}${e.actions}`}),s={render:o,args:{variant:void 0,variantStyle:void 0,"":`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,actions:``}},c={render:o,args:{...s.args,variant:`warning`,actions:`<mg-button slot="actions">Primary</mg-button>`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'variant': undefined,
    'variantStyle': undefined,
    // Slots
    '': \`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\`,
    'actions': \`\`
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMessage.args,
    variant: 'warning',
    actions: \`<mg-button slot="actions">Primary</mg-button>\`
  }
}`,...c.parameters?.docs?.source}}},l=[`MgMessage`,`WithActions`]}))();export{s as MgMessage,c as WithActions,l as __namedExportsOrder,a as default};