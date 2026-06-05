import{i as e}from"./preload-helper-xPQekRTU.js";import{c as t,l as n}from"./iframe-BLvxl_L5.js";import{n as r,t as i}from"./stencil-core-C67Xr0gu.js";var a,o,s,c,l,u,d,f,p;e((()=>{i(),n(),a={component:`mg-input-text`,title:`Molecules/Inputs/mg-input-text`,parameters:{actions:{handles:[`value-change`,`input-valid`]}}},o=e=>r(`mg-input-text`,{...t(e,{type:`text`,maxlength:400,mgWidth:`full`,tooltipPosition:`input`},[`append-input`]),innerHTML:e[`append-input`]}),s={render:o,args:{value:``,identifier:`identifier`,name:`input-name`,label:`Label`,labelOnTop:!1,labelHide:!1,type:void 0,icon:void 0,placeholder:`placeholder`,datalistoptions:void 0,maxlength:void 0,required:!1,readonly:!1,disabled:!1,mgWidth:void 0,pattern:void 0,patternErrorMessage:void 0,tooltip:`This is a tooltip`,tooltipPosition:void 0,characterLeftHide:!1,helpText:`Help text with html <b>bold</b>, <em>italic</em>.`,"append-input":``}},c={render:o,args:{...s.args,type:`url`,tooltip:void 0,label:`Site web`,helpText:void 0}},l={render:o,args:{...c.args,type:`email`,label:`Adresse email`,pattern:"^[a-zA-Z0-9!#$%&'*+\\/=?^_`\\{\\|\\}~\\-]+(?:\\.[a-zA-Z0-9!#$%&'*+\\/=?^_`\\{\\|\\}~\\-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9\\-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\\-]*[a-zA-Z0-9])?$"}},u={render:o,args:{...s.args,type:`search`,icon:`magnifying-glass`,"append-input":`<mg-button slot="append-input" label="search">
        <mg-icon icon="magnifying-glass"></mg-icon>Search
      </mg-button>`}},d={render:o,args:{...s.args,icon:`magnifying-glass`,datalistoptions:[`agent`,`admin`,`user`]}},f={render:o,args:{...d.args,datalistoptions:[{title:`agent`,value:`/agent/123`},{title:`admin`,value:`/admin/123`},{title:`user`,value:`/user/123`}]}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputText.args,
    type: 'url',
    // remove extra
    tooltip: undefined,
    label: 'Site web',
    helpText: undefined
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Type.args,
    type: 'email',
    label: 'Adresse email',
    pattern: /^[a-zA-Z0-9!#$%&'*+\\/=?^_\`\\{\\|\\}~\\-]+(?:\\.[a-zA-Z0-9!#$%&'*+\\/=?^_\`\\{\\|\\}~\\-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9\\-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\\-]*[a-zA-Z0-9])?$/.source // From https://gitlab.mgdis.fr/core/core-back/core/-/blob/master/packages/validators/src/email/email.ts#L10
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputText.args,
    icon: 'magnifying-glass',
    datalistoptions: ['agent', 'admin', 'user']
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}},p=[`MgInputText`,`Type`,`Pattern`,`Search`,`Datalist`,`DatalistOption`]}))();export{d as Datalist,f as DatalistOption,s as MgInputText,l as Pattern,u as Search,c as Type,p as __namedExportsOrder,a as default};