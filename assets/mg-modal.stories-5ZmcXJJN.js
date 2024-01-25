import{h as o}from"./index-OLtdmg-3.js";import{x as b}from"./index.es-PXOAO2Jp.js";const h=["dialog","alertdialog"],q={component:"mg-modal",title:"Molecules/mg-modal",argTypes:{dialogRole:{options:[void 0,...h],control:{type:"select"}}},parameters:{actions:{handles:["component-show","component-hide"]}}},r=e=>o("div",null,o("mg-button",{"aria-controls":e.identifier,"aria-haspopup":"dialog",onClick:()=>{const a=document.querySelector("mg-modal");a.hide=!a.hide}},"Open modal"),o("mg-modal",{...b(e)},e.slotContent&&o("div",{slot:"content",innerHTML:e.slotContent}),e.slotActions&&o("div",{slot:"actions",innerHTML:e.slotActions}))),t={render:r,args:{slotContent:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",slotActions:"",modalTitle:"Modal title",identifier:"identifier",closeButton:!1,hide:!0,dialogRole:h[0]}},i={render:r,args:{...t.args,identifier:"identifier-close-button",closeButton:!0}},n={render:r,args:{...t.args,closeButton:!0,identifier:"identifier-with-action",slotActions:'<div class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>'}};var s,l,d;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: Template,
  args: {
    slotContent: \`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\`,
    slotActions: \`\`,
    modalTitle: 'Modal title',
    identifier: 'identifier',
    closeButton: false,
    hide: true,
    dialogRole: dialogRoles[0]
  }
}`,...(d=(l=t.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var u,c,m;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgModal.args,
    identifier: 'identifier-close-button',
    closeButton: true
  }
}`,...(m=(c=i.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var p,g,f;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgModal.args,
    closeButton: true,
    identifier: 'identifier-with-action',
    slotActions: \`<div class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>\`
  }
}`,...(f=(g=n.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};const x=["MgModal","WithCloseButton","WithActions"];export{t as MgModal,n as WithActions,i as WithCloseButton,x as __namedExportsOrder,q as default};
