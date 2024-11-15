import{h as o}from"./index-BDiA27Xx.js";import{s as b}from"./index.es-CzPWUGdg.js";const h=["dialog","alertdialog"],q={component:"mg-modal",title:"Molecules/mg-modal",parameters:{actions:{handles:["component-show","component-hide"]}}},a=e=>o("div",null,o("mg-button",{"aria-controls":e.identifier,"aria-haspopup":"dialog",onClick:()=>{const r=document.querySelector("mg-modal");r.open=!r.open}},"Open modal"),o("mg-modal",{...b(e)},e.slotContent&&o("div",{innerHTML:e.slotContent}),e.slotActions&&o("div",{slot:"actions",innerHTML:e.slotActions}))),t={render:a,args:{slotContent:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",slotActions:"",modalTitle:"Modal title",identifier:"identifier",closeButton:!1,open:!1,dialogRole:h[0]}},i={render:a,args:{...t.args,identifier:"identifier-close-button",closeButton:!0}},n={render:a,args:{...t.args,closeButton:!0,identifier:"identifier-with-action",slotActions:'<div class="mg-l-group-elements mg-l-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>'}};var s,l,d;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: Template,
  args: {
    slotContent: \`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\`,
    slotActions: \`\`,
    modalTitle: 'Modal title',
    identifier: 'identifier',
    closeButton: false,
    open: false,
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
    slotActions: \`<div class="mg-l-group-elements mg-l-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div>\`
  }
}`,...(f=(g=n.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};const x=["MgModal","WithCloseButton","WithActions"];export{t as MgModal,n as WithActions,i as WithCloseButton,x as __namedExportsOrder,q as default};
