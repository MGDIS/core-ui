import{h as n}from"./index-CJEt4w-d.js";import{G as W}from"./index.es-A6CDKOur.js";import{t as _}from"./mg-input.conf-D2VyV82L.js";const P={component:"mg-input-text",title:"Molecules/Inputs/mg-input-text",parameters:{actions:{handles:["value-change","input-valid"]}},argTypes:{mgWidth:{options:[2,4,16,"full"],control:{type:"select"}},tooltipPosition:{options:[void 0,..._],control:{type:"select"}}}},t=e=>{const i=e.displayCharacterLeft;return delete e.displayCharacterLeft,n("mg-input-text",{...W(e),"display-character-left":i?void 0:"false"})},r={render:t,args:{value:"",identifier:"identifier",name:"input-name",label:"Label",labelOnTop:!1,labelHide:!1,placeholder:"placeholder",maxlength:400,required:!0,disabled:!1,readonly:!1,pattern:void 0,patternErrorMessage:void 0,mgWidth:"full",type:"text",tooltip:"This is a tooltip",tooltipPosition:void 0,displayCharacterLeft:!0,helpText:"Help text with html <strong>bold</strong>, <em>italic</em>."}},s={render:t,args:{...r.args,tooltip:"",required:!1,label:"Adresse email",maxlength:100,pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}",patternErrorMessage:"L'information saisie est incorrecte (exemple : prenom.nom@exemple.fr)",helpText:"exemple : prenom.nom@exemple.fr"}},a={render:t,args:{...s.args,label:"Adresses email",maxlength:200,pattern:"([a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}(;)*)+",patternErrorMessage:"L'information saisie est incorrecte (exemple : prenom.nom@exemple.fr;prenom.nom.2@exemple.fr)",helpText:"exemple : prenom.nom@exemple.fr;prenom.nom.2@exemple.fr"}},l={render:t,args:{...a.args,label:"RNA",maxlength:10,pattern:"(W[0-9]{1}[a-zA-Z0-9]{1}[0-9]{7})",patternErrorMessage:"Le numéro RNA n'est pas valide (exemple: W123456789)",helpText:"exemple : W123456789"}},o={render:t,args:{...a.args,label:"URL",maxlength:200,pattern:"https?://(?:www.)?([-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b)*(/[/dw.-]*)*(?:[?])*(.+)*",patternErrorMessage:"Le format du champ n'est pas valide (exemple: https://www.exemple.fr)",helpText:"Exemple: https://www.exemple.fr"}},I=e=>{const i=e.displayCharacterLeft;return delete e.displayCharacterLeft,n("form",{role:"search"},n("mg-input-text",{...W(e),"display-character-left":i?void 0:"false"},n("mg-button",{slot:"append-input",label:"search"},n("mg-icon",{icon:"magnifying-glass"})," Search")))},p={render:I,args:{...r.args,type:"search",icon:"magnifying-glass"}},m={render:t,args:{...r.args,type:"text",icon:"magnifying-glass",datalistoptions:["agent","admin","user"]}};var d,c,g;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
    displayCharacterLeft: true,
    // Help Text
    helpText: 'Help text with html <strong>bold</strong>, <em>italic</em>.'
  }
}`,...(g=(c=r.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var x,u,f;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(f=(u=s.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var h,T,b;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(b=(T=a.parameters)==null?void 0:T.docs)==null?void 0:b.source}}};var y,L,E;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(E=(L=l.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};var w,A,z;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(z=(A=o.parameters)==null?void 0:A.docs)==null?void 0:z.source}}};var M,v,R;p.parameters={...p.parameters,docs:{...(M=p.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: SearchTemplate,
  args: {
    ...MgInputText.args,
    type: 'search',
    icon: 'magnifying-glass'
  }
}`,...(R=(v=p.parameters)==null?void 0:v.docs)==null?void 0:R.source}}};var S,C,H;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgInputText.args,
    type: 'text',
    icon: 'magnifying-glass',
    datalistoptions: ['agent', 'admin', 'user']
  }
}`,...(H=(C=m.parameters)==null?void 0:C.docs)==null?void 0:H.source}}};const Z=["MgInputText","Email","Emails","RNA","URL","Search","Datalist"];export{m as Datalist,s as Email,a as Emails,r as MgInputText,l as RNA,p as Search,o as URL,Z as __namedExportsOrder,P as default};
