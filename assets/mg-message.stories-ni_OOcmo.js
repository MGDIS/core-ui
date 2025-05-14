import{h as c}from"./index-BDiA27Xx.js";import{f as l}from"./index-Ddciy6Nl.js";const g={component:"mg-message",title:"Molecules/mg-message",parameters:{actions:{handles:["component-show","component-hide"]}}},m=a=>c("mg-message",{...l(a,{variant:"info",variantStyle:"bar-left"},["","actions"]),innerHTML:`${a[""]}${a.actions}`}),e={render:m,args:{variant:void 0,variantStyle:void 0,"":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",actions:""}},t={render:m,args:{...e.args,variant:"warning",actions:'<mg-button slot="actions">Primary</mg-button>'}};var i,n,o;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'variant': undefined,
    'variantStyle': undefined,
    // Slots
    '': \`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\`,
    'actions': \`\`
  }
}`,...(o=(n=e.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};var r,s,u;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMessage.args,
    variant: 'warning',
    actions: \`<mg-button slot="actions">Primary</mg-button>\`
  }
}`,...(u=(s=t.parameters)==null?void 0:s.docs)==null?void 0:u.source}}};const v=["MgMessage","WithActions"];export{e as MgMessage,t as WithActions,v as __namedExportsOrder,g as default};
