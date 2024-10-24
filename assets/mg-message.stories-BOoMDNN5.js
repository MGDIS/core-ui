import{h as a}from"./index-BDiA27Xx.js";import{t as p}from"./index.es-CXAHyUQd.js";const m=["info","warning","success","danger"],l=["bar-left","background"],b={component:"mg-message",title:"Molecules/mg-message",parameters:{actions:{handles:["component-show","component-hide"]}}},d=t=>a("mg-message",{...p(t,{variant:m[0],variantStyle:l[0]})},t.slotContent&&a("span",{innerHTML:t.slotContent}),t.slotActions&&a("span",{slot:"actions",innerHTML:t.slotActions})),e={render:d,args:{slotContent:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",slotActions:"",variant:m[0],variantStyle:l[0]}},n={render:d,args:{...e.args,variant:"warning",slotActions:'<div><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>'}};var o,i,r;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: Template,
  args: {
    slotContent: \`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\`,
    slotActions: \`\`,
    variant: variants[0],
    // info
    variantStyle: variantStyles[0] // bar-left
  }
}`,...(r=(i=e.parameters)==null?void 0:i.docs)==null?void 0:r.source}}};var s,u,c;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMessage.args,
    variant: 'warning',
    slotActions: \`<div><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>\`
  }
}`,...(c=(u=n.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};const f=["MgMessage","WithActions"];export{e as MgMessage,n as WithActions,f as __namedExportsOrder,b as default};
