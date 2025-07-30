import{h as l}from"./index-BdigElPL.js";import{f as p}from"./iframe-a__NqWOS.js";const c={component:"mg-input-text",title:"Molecules/Inputs/mg-input-text",parameters:{actions:{handles:["value-change","input-valid"]}}},a=o=>l("mg-input-text",{...p(o,{type:"text",maxlength:400,mgWidth:"full",tooltipPosition:"input"},["append-input"]),innerHTML:o["append-input"]}),e={render:a,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,type:void 0,icon:void 0,placeholder:"placeholder",datalistoptions:void 0,maxlength:void 0,required:!1,readonly:!1,disabled:!1,mgWidth:void 0,pattern:void 0,patternErrorMessage:void 0,tooltip:"This is a tooltip",tooltipPosition:void 0,characterLeftHide:!1,helpText:"Help text with html <b>bold</b>, <em>italic</em>.","append-input":""}},t={render:a,args:{...e.args,type:"url",tooltip:void 0,label:"Site web",helpText:void 0}},r={render:a,args:{...t.args,type:"email",label:"Adresse email",pattern:/^[a-zA-Z0-9!#$%&'*+\/=?^_`\{\|\}~\-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`\{\|\}~\-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/.source}},s={render:a,args:{...e.args,type:"search",icon:"magnifying-glass","append-input":`<mg-button slot="append-input" label="search">
        <mg-icon icon="magnifying-glass"></mg-icon>Search
      </mg-button>`}},n={render:a,args:{...e.args,icon:"magnifying-glass",datalistoptions:["agent","admin","user"]}},i={render:a,args:{...n.args,datalistoptions:[{title:"agent",value:"/agent/123"},{title:"admin",value:"/admin/123"},{title:"user",value:"/user/123"}]}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'value': '',
    'identifier': 'identifier',
    'name': 'input-name',
    'label': 'Label',
    'labelOnTop': false,
    'labelHide': false,
    'type': undefined,
    'icon': undefined,
    'placeholder': 'placeholder',
    'datalistoptions': undefined,
    'maxlength': undefined,
    'required': false,
    'readonly': false,
    'disabled': false,
    'mgWidth': undefined,
    'pattern': undefined,
    'patternErrorMessage': undefined,
    'tooltip': 'This is a tooltip',
    'tooltipPosition': undefined,
    'characterLeftHide': false,
    'helpText': 'Help text with html <b>bold</b>, <em>italic</em>.',
    // Slot
    'append-input': ''
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputText.args,
    type: 'url',
    // remove extra
    tooltip: undefined,
    label: 'Site web',
    helpText: undefined
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Type.args,
    type: 'email',
    label: 'Adresse email',
    pattern: /^[a-zA-Z0-9!#$%&'*+\\/=?^_\`\\{\\|\\}~\\-]+(?:\\.[a-zA-Z0-9!#$%&'*+\\/=?^_\`\\{\\|\\}~\\-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9\\-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\\-]*[a-zA-Z0-9])?$/.source // From https://gitlab.mgdis.fr/core/core-back/core/-/blob/master/packages/validators/src/email/email.ts#L10
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputText.args,
    'type': 'search',
    'icon': 'magnifying-glass',
    // Slot
    'append-input': \`<mg-button slot="append-input" label="search">
        <mg-icon icon="magnifying-glass"></mg-icon>Search
      </mg-button>\`
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputText.args,
    icon: 'magnifying-glass',
    datalistoptions: ['agent', 'admin', 'user']
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Datalist.args,
    datalistoptions: [{
      title: 'agent',
      value: '/agent/123'
    }, {
      title: 'admin',
      value: '/admin/123'
    }, {
      title: 'user',
      value: '/user/123'
    }]
  }
}`,...i.parameters?.docs?.source}}};const g=["MgInputText","Type","Pattern","Search","Datalist","DatalistOption"];export{n as Datalist,i as DatalistOption,e as MgInputText,r as Pattern,s as Search,t as Type,g as __namedExportsOrder,c as default};
