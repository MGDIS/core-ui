import{h as n}from"./index-BDiA27Xx.js";import{s as M}from"./index.es-CvGFZpni.js";const q={component:"mg-modal",title:"Molecules/mg-modal",parameters:{actions:{handles:["component-show","component-hide"]}}},a=o=>n("div",null,n("mg-button",{"aria-controls":o.identifier,"aria-haspopup":"dialog",onClick:()=>{const r=document.querySelector("mg-modal");r.open=!r.open}},"Open modal"),n("mg-modal",{...M(o,{dialogRole:"dialog"},["","actions"]),innerHTML:`${o[""]}${o.actions}`})),e={render:a,args:{identifier:"identifier",dialogRole:void 0,modalTitle:"Modal title",closeButton:!1,open:!1,"":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",actions:""}},t={render:a,args:{...e.args,identifier:"identifier-close-button",closeButton:!0}},i={render:a,args:{...e.args,closeButton:!0,identifier:"identifier-with-action",actions:'<mg-button slot="actions">Primary</mg-button>'}};var s,l,d;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'identifier': 'identifier',
    'dialogRole': undefined,
    'modalTitle': 'Modal title',
    'closeButton': false,
    'open': false,
    // Slots
    '': \`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\`,
    'actions': \`\`
  }
}`,...(d=(l=e.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var u,c,m;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgModal.args,
    identifier: 'identifier-close-button',
    closeButton: true
  }
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var p,g,f;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgModal.args,
    closeButton: true,
    identifier: 'identifier-with-action',
    // Slots
    actions: \`<mg-button slot="actions">Primary</mg-button>\`
  }
}`,...(f=(g=i.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};const v=["MgModal","WithCloseButton","WithActions"];export{e as MgModal,i as WithActions,t as WithCloseButton,v as __namedExportsOrder,q as default};
