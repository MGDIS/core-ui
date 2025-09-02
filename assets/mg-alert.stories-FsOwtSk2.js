import{h as n}from"./index-BdigElPL.js";import{f as r}from"./iframe-B6BMAegC.js";import"./preload-helper-D9Z9MdNV.js";const l={component:"mg-alert",title:"Molecules/mg-alert"},a=i=>n("mg-alert",{...r(i,{variant:"info",variantStyle:"bar-left"},["","actions"]),innerHTML:`${i[""]}${i.actions}`}),e={render:a,args:{delay:void 0,variant:void 0,variantStyle:void 0,hidden:!1,"":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",actions:""}},t={render:a,args:{...e.args,variant:"warning",actions:'<mg-button slot="actions">Primary</mg-button>'}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'delay': undefined,
    'variant': undefined,
    'variantStyle': undefined,
    // Native attributes
    'hidden': false,
    // Slots
    '': '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
    'actions': ''
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgAlert.args,
    variant: 'warning',
    actions: \`<mg-button slot="actions">Primary</mg-button>\`
  }
}`,...t.parameters?.docs?.source}}};const d=["MgAlert","WithActions"];export{e as MgAlert,t as WithActions,d as __namedExportsOrder,l as default};
