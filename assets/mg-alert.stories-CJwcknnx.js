import{h as i}from"./index-BDiA27Xx.js";import{t as y}from"./index.es-CXAHyUQd.js";const r=["info","warning","success","danger"],o=["bar-left","background"],S={component:"mg-alert",title:"Molecules/mg-alert",argTypes:{variant:{options:[void 0,...r],control:{type:"select"},table:{defaultValue:{summary:r[0]}}},variantStyle:{name:"variant-style",options:[void 0,...o],control:{type:"select"},table:{defaultValue:{summary:o[0]}}}}},s=e=>i("mg-alert",{...y(e,{variant:r[0],variantStyle:o[0]})},e.slotContent&&i("span",{innerHTML:e.slotContent}),e.slotActions&&i("span",{slot:"actions",innerHTML:e.slotActions})),t={render:s,args:{slotContent:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",slotActions:"",variant:r[0],variantStyle:o[0],closeButton:!1,hidden:!1,delay:void 0}},n={render:s,args:{...t.args,variant:"danger",closeButton:!0}},a={render:s,args:{...t.args,variant:"warning",slotActions:'<div><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>'}};var l,u,c;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: Template,
  args: {
    slotContent: \`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\`,
    slotActions: \`\`,
    variant: variants[0],
    // info
    variantStyle: variantStyles[0],
    // bar-left
    closeButton: false,
    hidden: false,
    delay: undefined
  }
}`,...(c=(u=t.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var d,m,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgAlert.args,
    variant: 'danger',
    closeButton: true
  }
}`,...(p=(m=n.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,v,f;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgAlert.args,
    variant: 'warning',
    slotActions: \`<div><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>\`
  }
}`,...(f=(v=a.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};const q=["MgAlert","WithCloseButton","WithActions"];export{t as MgAlert,a as WithActions,n as WithCloseButton,q as __namedExportsOrder,S as default};
