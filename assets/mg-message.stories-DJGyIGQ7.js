import{h as n}from"./index-BdigElPL.js";import{f as o}from"./iframe-avHky8ts.js";import"./preload-helper-PPVm8Dsz.js";const m={component:"mg-message",title:"Molecules/mg-message",parameters:{actions:{handles:["component-show","component-hide"]}}},i=a=>n("mg-message",{...o(a,{variant:"info",variantStyle:"bar-left"},["","actions"]),innerHTML:`${a[""]}${a.actions}`}),e={render:i,args:{variant:void 0,variantStyle:void 0,"":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",actions:""}},t={render:i,args:{...e.args,variant:"warning",actions:'<mg-button slot="actions">Primary</mg-button>'}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'variant': undefined,
    'variantStyle': undefined,
    // Slots
    '': \`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\`,
    'actions': \`\`
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMessage.args,
    variant: 'warning',
    actions: \`<mg-button slot="actions">Primary</mg-button>\`
  }
}`,...t.parameters?.docs?.source}}};const c=["MgMessage","WithActions"];export{e as MgMessage,t as WithActions,c as __namedExportsOrder,m as default};
