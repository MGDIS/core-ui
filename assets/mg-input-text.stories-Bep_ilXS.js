import{h as t}from"./index-BDiA27Xx.js";import{s as O}from"./index.es-CzPWUGdg.js";const Z={component:"mg-input-text",title:"Molecules/Inputs/mg-input-text",parameters:{actions:{handles:["value-change","input-valid"]}}},a=i=>t("mg-input-text",{...O(i)}),e={render:a,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",maxlength:400,required:!0,disabled:!1,readonly:!1,pattern:void 0,patternErrorMessage:void 0,mgWidth:"full",type:"text",tooltip:"This is a tooltip",tooltipPosition:void 0,characterLeftHide:!1,helpText:"Help text with html <b>bold</b>, <em>italic</em>."}},n={render:a,args:{...e.args,tooltip:"",required:!1,label:"Adresse email",maxlength:100,pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}",patternErrorMessage:"L'information saisie est incorrecte (exemple : prenom.nom@exemple.fr)",helpText:"exemple : prenom.nom@exemple.fr"}},r={render:a,args:{...n.args,label:"Adresses email",maxlength:200,pattern:"([a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}(;)*)+",patternErrorMessage:"L'information saisie est incorrecte (exemple : prenom.nom@exemple.fr;prenom.nom.2@exemple.fr)",helpText:"exemple : prenom.nom@exemple.fr;prenom.nom.2@exemple.fr"}},s={render:a,args:{...r.args,label:"RNA",maxlength:10,pattern:"(W[0-9]{1}[a-zA-Z0-9]{1}[0-9]{7})",patternErrorMessage:"Le numéro RNA n'est pas valide (exemple: W123456789)",helpText:"exemple : W123456789"}},l={render:a,args:{...r.args,label:"URL",maxlength:200,pattern:"https?://(?:www.)?([-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b)*(/[/dw.-]*)*(?:[?])*(.+)*",patternErrorMessage:"Le format du champ n'est pas valide (exemple: https://www.exemple.fr)",helpText:"Exemple: https://www.exemple.fr"}},U=i=>t("form",{role:"search"},t("mg-input-text",{...O(i)},t("mg-button",{slot:"append-input",label:"search"},t("mg-icon",{icon:"magnifying-glass"})," Search"))),p={render:U,args:{...e.args,type:"search",icon:"magnifying-glass"}},o={render:a,args:{...e.args,type:"text",icon:"magnifying-glass",datalistoptions:["agent","admin","user"]}},m={render:a,args:{...e.args,type:"text",icon:"magnifying-glass",datalistoptions:[{title:"agent",value:"/agent/123"},{title:"admin",value:"/admin/123"},{title:"user",value:"/user/123"}]}};var d,c,g;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Global
    value: '',
    identifier: 'identifier',
    name: 'input-name',
    // Label
    label: 'Label',
    labelOnTop: false,
    labelHide: false,
    // Input
    placeholder: 'placeholder',
    maxlength: 400,
    required: true,
    disabled: false,
    readonly: false,
    pattern: undefined,
    patternErrorMessage: undefined,
    mgWidth: 'full',
    type: 'text',
    // Tooltip
    tooltip: 'This is a tooltip',
    tooltipPosition: undefined,
    // Nb Char Left
    characterLeftHide: false,
    // Help Text
    helpText: 'Help text with html <b>bold</b>, <em>italic</em>.'
  }
}`,...(g=(c=e.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var u,x,f;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputText.args,
    // remove feature to focus on pattern
    tooltip: '',
    required: false,
    label: 'Adresse email',
    // Add pattern Email rules
    maxlength: 100,
    pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}',
    patternErrorMessage: "L'information saisie est incorrecte (exemple : prenom.nom@exemple.fr)",
    // Help Text
    helpText: 'exemple : prenom.nom@exemple.fr'
  }
}`,...(f=(x=n.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var h,T,b;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Email.args,
    label: 'Adresses email',
    // Add pattern Emails rules
    maxlength: 200,
    pattern: '([a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}(;)*)+',
    patternErrorMessage: "L'information saisie est incorrecte (exemple : prenom.nom@exemple.fr;prenom.nom.2@exemple.fr)",
    // Help Text
    helpText: 'exemple : prenom.nom@exemple.fr;prenom.nom.2@exemple.fr'
  }
}`,...(b=(T=r.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var w,E,A;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Emails.args,
    label: 'RNA',
    // Add pattern RNA rules
    maxlength: 10,
    pattern: '(W[0-9]{1}[a-zA-Z0-9]{1}[0-9]{7})',
    patternErrorMessage: "Le numéro RNA n'est pas valide (exemple: W123456789)",
    // Help Text
    helpText: 'exemple : W123456789'
  }
}`,...(A=(E=s.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var L,v,z;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...Emails.args,
    label: 'URL',
    // Add pattern URL rules
    maxlength: 200,
    pattern: 'https?://(?:www.)?([-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\\b)*(/[/dw.-]*)*(?:[?])*(.+)*',
    patternErrorMessage: "Le format du champ n'est pas valide (exemple: https://www.exemple.fr)",
    // Help Text
    helpText: 'Exemple: https://www.exemple.fr'
  }
}`,...(z=(v=l.parameters)==null?void 0:v.docs)==null?void 0:z.source}}};var y,M,S;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: SearchTemplate,
  args: {
    ...MgInputText.args,
    type: 'search',
    icon: 'magnifying-glass'
  }
}`,...(S=(M=p.parameters)==null?void 0:M.docs)==null?void 0:S.source}}};var R,H,I;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputText.args,
    type: 'text',
    icon: 'magnifying-glass',
    datalistoptions: ['agent', 'admin', 'user']
  }
}`,...(I=(H=o.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var _,N,W;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputText.args,
    type: 'text',
    icon: 'magnifying-glass',
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
}`,...(W=(N=m.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};const P=["MgInputText","Email","Emails","RNA","URL","Search","Datalist","DatalistOption"];export{o as Datalist,m as DatalistOption,n as Email,r as Emails,e as MgInputText,s as RNA,p as Search,l as URL,P as __namedExportsOrder,Z as default};
