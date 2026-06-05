import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-BLvxl_L5.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l,u;e((()=>{i(),n(),a={component:`mg-modal`,title:`Molecules/mg-modal`,parameters:{actions:{handles:[`component-show`,`component-hide`]}}},o=e=>r(`div`,null,r(`mg-button`,{"aria-controls":e.identifier,"aria-haspopup":`dialog`,onClick:()=>{let e=document.querySelector(`mg-modal`);e.open=!e.open}},`Open modal`),r(`mg-modal`,{...t(e,{dialogRole:`dialog`},[``,`actions`]),innerHTML:`${e[``]}${e.actions}`})),s={render:o,args:{identifier:`identifier`,dialogRole:void 0,modalTitle:`Modal title`,closeButton:!1,open:!1,"":`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,actions:``}},c={render:o,args:{...s.args,identifier:`identifier-close-button`,closeButton:!0}},l={render:o,args:{...s.args,closeButton:!0,identifier:`identifier-with-action`,actions:`<mg-button slot="actions">Primary</mg-button>`}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgModal.args,
    identifier: 'identifier-close-button',
    closeButton: true
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgModal.args,
    closeButton: true,
    identifier: 'identifier-with-action',
    // Slots
    actions: \`<mg-button slot="actions">Primary</mg-button>\`
  }
}`,...l.parameters?.docs?.source}}},u=[`MgModal`,`WithCloseButton`,`WithActions`]}))();export{s as MgModal,l as WithActions,c as WithCloseButton,u as __namedExportsOrder,a as default};