import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-BLvxl_L5.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l,u,d,f;e((()=>{i(),n(),a={component:`mg-input`,title:`Molecules/Inputs/mg-input`},o=`<style>.size-full{flex:1}</style>`,s=`<input type="file" id="identifier" class="mg-c-input__box"></input>`,c=e=>r(`mg-input`,{...t(e,{tooltipPosition:`input`},[``]),innerHTML:e[``]}),l={render:c,args:{identifier:`identifier`,label:`Label`,labelOnTop:!1,labelHide:!1,tooltip:`This is a tooltip`,tooltipPosition:void 0,required:!1,errorMessage:`Error to display`,helpText:`Help text with html <b>bold</b>, <em>italic</em>.`,ariaDescribedbyIDs:void 0,"":s}},u={render:c,args:{...l.args,helpText:void 0,errorMessage:void 0,"":`${o}<mg-panel panel-title="section" identifier="panel" class="size-full" expanded>${s}</mg-panel>`}},d={render:c,args:{...u.args,"":`<mg-message id="identifier" variant="warning">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <mg-button slot="actions">Primary</mg-button>
</mg-message>`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'identifier': 'identifier',
    'label': 'Label',
    'labelOnTop': false,
    'labelHide': false,
    'tooltip': 'This is a tooltip',
    'tooltipPosition': undefined,
    'required': false,
    'errorMessage': 'Error to display',
    'helpText': 'Help text with html <b>bold</b>, <em>italic</em>.',
    'ariaDescribedbyIDs': undefined,
    // Slot
    '': inputFile
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInput.args,
    'helpText': undefined,
    'errorMessage': undefined,
    // Slot
    '': \`\${classSizeFull}<mg-panel panel-title="section" identifier="panel" class="size-full" expanded>\${inputFile}</mg-panel>\`
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputWithPanel.args,
    // Slot
    '': \`<mg-message id="identifier" variant="warning">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <mg-button slot="actions">Primary</mg-button>
</mg-message>\`
  }
}`,...d.parameters?.docs?.source}}},f=[`MgInput`,`MgInputWithPanel`,`MgInputWithMgMessage`]}))();export{l as MgInput,d as MgInputWithMgMessage,u as MgInputWithPanel,f as __namedExportsOrder,a as default};