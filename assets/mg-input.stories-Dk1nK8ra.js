import{h as f}from"./index-BDiA27Xx.js";import{Q as b}from"./index.es-xDe083ye.js";const T={component:"mg-input",title:"Molecules/Inputs/mg-input"},h="<style>.size-full{flex:1}</style>",g='<input type="file" id="identifier" class="mg-c-input__box"></input>',n=a=>f("mg-input",{...b(a,{tooltipPosition:"input"},[""]),innerHTML:a[""]}),e={render:n,args:{identifier:"identifier",label:"Label",labelOnTop:!1,labelHide:!1,tooltip:"This is a tooltip",tooltipPosition:void 0,required:!1,errorMessage:"Error to display",helpText:"Help text with html <b>bold</b>, <em>italic</em>.",ariaDescribedbyIDs:void 0,"":g}},i={render:n,args:{...e.args,helpText:void 0,errorMessage:void 0,"":`${h}<mg-panel panel-title="section" identifier="panel" class="size-full" expanded>${g}</mg-panel>`}},t={render:n,args:{...i.args,"":`<mg-message id="identifier" variant="warning">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <mg-button slot="actions">Primary</mg-button>
</mg-message>`}};var r,o,s;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
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
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};var l,u,p;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInput.args,
    'helpText': undefined,
    'errorMessage': undefined,
    // Slot
    '': \`\${classSizeFull}<mg-panel panel-title="section" identifier="panel" class="size-full" expanded>\${inputFile}</mg-panel>\`
  }
}`,...(p=(u=i.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var d,m,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputWithPanel.args,
    // Slot
    '': \`<mg-message id="identifier" variant="warning">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <mg-button slot="actions">Primary</mg-button>
</mg-message>\`
  }
}`,...(c=(m=t.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const q=["MgInput","MgInputWithPanel","MgInputWithMgMessage"];export{e as MgInput,t as MgInputWithMgMessage,i as MgInputWithPanel,q as __namedExportsOrder,T as default};
