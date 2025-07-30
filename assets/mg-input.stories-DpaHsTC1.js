import{h as s}from"./index-BdigElPL.js";import{f as o}from"./iframe-a__NqWOS.js";const d={component:"mg-input",title:"Molecules/Inputs/mg-input"},l="<style>.size-full{flex:1}</style>",r='<input type="file" id="identifier" class="mg-c-input__box"></input>',n=a=>s("mg-input",{...o(a,{tooltipPosition:"input"},[""]),innerHTML:a[""]}),e={render:n,args:{identifier:"identifier",label:"Label",labelOnTop:!1,labelHide:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,required:!1,errorMessage:"Error to display",helpText:"Help text with html <b>bold</b>, <em>italic</em>.",ariaDescribedbyIDs:void 0,"":r}},i={render:n,args:{...e.args,helpText:void 0,errorMessage:void 0,"":`${l}<mg-panel panel-title="section" identifier="panel" class="size-full" expanded>${r}</mg-panel>`}},t={render:n,args:{...i.args,"":`<mg-message id="identifier" variant="warning">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <mg-button slot="actions">Primary</mg-button>
</mg-message>`}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInput.args,
    'helpText': undefined,
    'errorMessage': undefined,
    // Slot
    '': \`\${classSizeFull}<mg-panel panel-title="section" identifier="panel" class="size-full" expanded>\${inputFile}</mg-panel>\`
  }
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputWithPanel.args,
    // Slot
    '': \`<mg-message id="identifier" variant="warning">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <mg-button slot="actions">Primary</mg-button>
</mg-message>\`
  }
}`,...t.parameters?.docs?.source}}};const m=["MgInput","MgInputWithPanel","MgInputWithMgMessage"];export{e as MgInput,t as MgInputWithMgMessage,i as MgInputWithPanel,m as __namedExportsOrder,d as default};
