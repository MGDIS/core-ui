import{h as i}from"./index-BDiA27Xx.js";import{Y as f}from"./index.es-DYXCv77d.js";const o=["info","warning","success","danger"],M={component:"mg-message",title:"Molecules/mg-message",argTypes:{variant:{options:o,control:{type:"select"},table:{defaultValue:{summary:o[0]}}}},parameters:{actions:{handles:["component-show","component-hide"]}}},r=t=>i("mg-message",{...f(t,{variant:o[0]})},t.slotContent&&i("span",{innerHTML:t.slotContent}),t.slotActions&&i("span",{slot:"actions",innerHTML:t.slotActions})),e={render:r,args:{slotContent:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",slotActions:"",identifier:"identifier",variant:o[0],closeButton:!1,hide:!1,delay:void 0,noAriaRole:void 0}},n={render:r,args:{...e.args,variant:"danger",closeButton:!0}},a={render:r,args:{...e.args,variant:"warning",slotActions:'<div class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>'}};var s,u,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: Template,
  args: {
    slotContent: \`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\`,
    slotActions: \`\`,
    identifier: 'identifier',
    variant: variants[0],
    // info
    closeButton: false,
    hide: false,
    delay: undefined,
    noAriaRole: undefined
  }
}`,...(l=(u=e.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};var m,c,d;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMessage.args,
    variant: 'danger',
    closeButton: true
  }
}`,...(d=(c=n.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var p,g,v;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMessage.args,
    variant: 'warning',
    slotActions: \`<div class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>\`
  }
}`,...(v=(g=a.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};const y=["MgMessage","WithCloseButton","WithActions"];export{e as MgMessage,a as WithActions,n as WithCloseButton,y as __namedExportsOrder,M as default};
