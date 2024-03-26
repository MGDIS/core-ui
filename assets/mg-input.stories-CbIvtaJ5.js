import{h as f}from"./index-CJEt4w-d.js";import{G as v}from"./index.es-WTk4rpsq.js";import{t as y}from"./mg-input.conf-D2VyV82L.js";const I={component:"mg-input",title:"Molecules/Inputs/mg-input",argTypes:{tooltipPosition:{options:[void 0,...y],control:{type:"select"}},readonlyValue:{control:{type:"text"}}}},x=`
<style>
  .size-full {
    flex: 1;
  }
</style>
`,b='<input type="file" id="identifier" class="mg-c-input__box"></input>',a={identifier:"identifier",label:"Label",labelOnTop:!1,labelHide:!1,required:!0,readonlyValue:"",ariaDescribedbyIDs:void 0,tooltip:"This is a tooltip",tooltipPosition:"label",helpText:"Help text with html <strong>bold</strong>, <em>italic</em>.",errorMessage:"Error to display",slot:b},n=s=>f("mg-input",{...v(s),innerHTML:s.slot}),e={render:n,args:a},t={render:n,args:{...a,slot:`${x}<mg-panel panel-title="section" identidier="panel" class="size-full" expanded>${b}</mg-panel>`}},i={render:n,args:{...a,slot:'<mg-message identifier="identifier" variant="warning"><span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></span><span slot="actions"><div class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div></span></mg-message>'}};var o,r,l;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: Template,
  args: baseArgs
}`,...(l=(r=e.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};var u,p,m;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...baseArgs,
    slot: \`\${classSizeFull}<mg-panel panel-title="section" identidier="panel" class="size-full" expanded>\${inputFile}</mg-panel>\`
  }
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var d,c,g;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...baseArgs,
    slot: \`<mg-message identifier="identifier" variant="warning"><span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></span><span slot="actions"><div class="mg-group-elements mg-group-elements--align-right"><mg-button>Primary</mg-button><mg-button variant="secondary">Secondary</mg-button></div></span></mg-message>\`
  }
}`,...(g=(c=i.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};const T=["MgInput","MgInputWithPanel","MgInputWithMgMessage"];export{e as MgInput,i as MgInputWithMgMessage,t as MgInputWithPanel,T as __namedExportsOrder,I as default};
