import{h as b}from"./index-BDiA27Xx.js";import{s as f}from"./index.es-CzPWUGdg.js";const v={component:"mg-input",title:"Molecules/Inputs/mg-input"},h=`
<style>
  .size-full {
    flex: 1;
  }
</style>
`,g='<input type="file" id="identifier" class="mg-c-input__box"></input>',n=a=>b("mg-input",{...f(a),innerHTML:a.slot}),e={render:n,args:{identifier:"identifier",label:"Label",labelOnTop:!1,labelHide:!1,required:!0,readonlyValue:"",ariaDescribedbyIDs:void 0,tooltip:"This is a tooltip",tooltipPosition:"label",helpText:"Help text with html <b>bold</b>, <em>italic</em>.",errorMessage:"Error to display",slot:g}},t={render:n,args:{...e.args,slot:`${h}<mg-panel panel-title="section" identidier="panel" class="size-full" expanded>${g}</mg-panel>`,helpText:void 0,errorMessage:void 0}},i={render:n,args:{...t.args,slot:'<mg-message identifier="identifier" variant="warning"><span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></span><span slot="actions"><div class="mg-l-group-elements mg-l-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div></span></mg-message>'}};var r,s,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Global
    identifier: 'identifier',
    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    // Input
    required: true,
    readonlyValue: '',
    ariaDescribedbyIDs: undefined,
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: 'label',
    // Help Text
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.',
    errorMessage: 'Error to display',
    slot: inputFile
  }
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var l,u,p;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInput.args,
    slot: \`\${classSizeFull}<mg-panel panel-title="section" identidier="panel" class="size-full" expanded>\${inputFile}</mg-panel>\`,
    helpText: undefined,
    errorMessage: undefined
  }
}`,...(p=(u=t.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var d,m,c;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputWithPanel.args,
    slot: \`<mg-message identifier="identifier" variant="warning"><span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></span><span slot="actions"><div class="mg-l-group-elements mg-l-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div></span></mg-message>\`
  }
}`,...(c=(m=i.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const y=["MgInput","MgInputWithPanel","MgInputWithMgMessage"];export{e as MgInput,i as MgInputWithMgMessage,t as MgInputWithPanel,y as __namedExportsOrder,v as default};
