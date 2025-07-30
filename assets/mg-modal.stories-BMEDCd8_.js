import{h as n}from"./index-BdigElPL.js";import{f as s}from"./iframe-a__NqWOS.js";const u={component:"mg-modal",title:"Molecules/mg-modal",parameters:{actions:{handles:["component-show","component-hide"]}}},a=t=>n("div",null,n("mg-button",{"aria-controls":t.identifier,"aria-haspopup":"dialog",onClick:()=>{const r=document.querySelector("mg-modal");r.open=!r.open}},"Open modal"),n("mg-modal",{...s(t,{dialogRole:"dialog"},["","actions"]),innerHTML:`${t[""]}${t.actions}`})),e={render:a,args:{identifier:"identifier",dialogRole:void 0,modalTitle:"Modal title",closeButton:!1,open:!1,"":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",actions:""}},o={render:a,args:{...e.args,identifier:"identifier-close-button",closeButton:!0}},i={render:a,args:{...e.args,closeButton:!0,identifier:"identifier-with-action",actions:'<mg-button slot="actions">Primary</mg-button>'}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgModal.args,
    identifier: 'identifier-close-button',
    closeButton: true
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgModal.args,
    closeButton: true,
    identifier: 'identifier-with-action',
    // Slots
    actions: \`<mg-button slot="actions">Primary</mg-button>\`
  }
}`,...i.parameters?.docs?.source}}};const c=["MgModal","WithCloseButton","WithActions"];export{e as MgModal,i as WithActions,o as WithCloseButton,c as __namedExportsOrder,u as default};
