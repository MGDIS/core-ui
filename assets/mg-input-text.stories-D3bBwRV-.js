import{h as M}from"./index-BDiA27Xx.js";import{t as H}from"./index.es-CWizXw2g.js";const L={component:"mg-input-text",title:"Molecules/Inputs/mg-input-text",parameters:{actions:{handles:["value-change","input-valid"]}}},a=o=>M("mg-input-text",{...H(o,{type:"text",maxlength:400,mgWidth:"full",tooltipPosition:"input"},["append-input"]),innerHTML:o["append-input"]}),e={render:a,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,type:void 0,icon:void 0,placeholder:"placeholder",datalistoptions:void 0,maxlength:void 0,required:!1,readonly:!1,disabled:!1,mgWidth:void 0,pattern:void 0,patternErrorMessage:void 0,tooltip:"This is a tooltip",tooltipPosition:void 0,characterLeftHide:!1,helpText:"Help text with html <b>bold</b>, <em>italic</em>.","append-input":""}},t={render:a,args:{...e.args,type:"url",tooltip:void 0,label:"Site web",helpText:void 0}},r={render:a,args:{...t.args,type:"email",label:"Adresse email",pattern:/^[a-zA-Z0-9!#$%&'*+\/=?^_`\{\|\}~\-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`\{\|\}~\-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/.source}},s={render:a,args:{...e.args,type:"search",icon:"magnifying-glass","append-input":`<mg-button slot="append-input" label="search">
        <mg-icon icon="magnifying-glass"></mg-icon>Search
      </mg-button>`}},n={render:a,args:{...e.args,icon:"magnifying-glass",datalistoptions:["agent","admin","user"]}},i={render:a,args:{...n.args,datalistoptions:[{title:"agent",value:"/agent/123"},{title:"admin",value:"/admin/123"},{title:"user",value:"/user/123"}]}};var l,p,d;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(d=(p=e.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var m,c,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputText.args,
    type: 'url',
    // remove extra
    tooltip: undefined,
    label: 'Site web',
    helpText: undefined
  }
}`,...(g=(c=t.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var u,f,h;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Type.args,
    type: 'email',
    label: 'Adresse email',
    pattern: /^[a-zA-Z0-9!#$%&'*+\\/=?^_\`\\{\\|\\}~\\-]+(?:\\.[a-zA-Z0-9!#$%&'*+\\/=?^_\`\\{\\|\\}~\\-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9\\-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\\-]*[a-zA-Z0-9])?$/.source // From https://gitlab.mgdis.fr/core/core-back/core/-/blob/master/packages/validators/src/email/email.ts#L10
  }
}`,...(h=(f=r.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var b,T,v;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(v=(T=s.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var x,y,A;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputText.args,
    icon: 'magnifying-glass',
    datalistoptions: ['agent', 'admin', 'user']
  }
}`,...(A=(y=n.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var z,Z,S;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(S=(Z=i.parameters)==null?void 0:Z.docs)==null?void 0:S.source}}};const P=["MgInputText","Type","Pattern","Search","Datalist","DatalistOption"];export{n as Datalist,i as DatalistOption,e as MgInputText,r as Pattern,s as Search,t as Type,P as __namedExportsOrder,L as default};
