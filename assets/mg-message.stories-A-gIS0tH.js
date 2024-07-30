import{h as a}from"./index-BDiA27Xx.js";import{V as f}from"./index.es-BgKvlgMl.js";const v=["info","warning","success","danger"],M={component:"mg-message",title:"Molecules/mg-message",parameters:{actions:{handles:["component-show","component-hide"]}}},i=t=>a("mg-message",{...f(t,{variant:v[0]})},t.slotContent&&a("span",{innerHTML:t.slotContent}),t.slotActions&&a("span",{slot:"actions",innerHTML:t.slotActions})),e={render:i,args:{slotContent:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",slotActions:"",identifier:"identifier",variant:v[0],closeButton:!1,hide:!1,delay:void 0,noAriaRole:void 0}},n={render:i,args:{...e.args,variant:"danger",closeButton:!0}},o={render:i,args:{...e.args,variant:"warning",slotActions:'<div class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>'}};var r,s,u;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(u=(s=e.parameters)==null?void 0:s.docs)==null?void 0:u.source}}};var l,m,c;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMessage.args,
    variant: 'danger',
    closeButton: true
  }
}`,...(c=(m=n.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var d,g,p;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMessage.args,
    variant: 'warning',
    slotActions: \`<div class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>\`
  }
}`,...(p=(g=o.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};const q=["MgMessage","WithCloseButton","WithActions"];export{e as MgMessage,o as WithActions,n as WithCloseButton,q as __namedExportsOrder,M as default};
