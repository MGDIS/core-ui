import{h as b}from"./index-BDiA27Xx.js";import{i as f}from"./index-CP0ecVO1.js";import{s as I}from"./index.es-CzPWUGdg.js";const g=["primary","secondary","danger","danger-alt","info","flat","success","link"],T={component:"mg-button",title:"Atoms/mg-button",parameters:{actions:{handles:["disabled-change"]}}},s=r=>b("mg-button",{...I(r,{variant:g[0]}),innerHTML:r.slot}),e={render:s,args:{slot:"Text button",variant:g[0],label:"Explicit aria label",disabled:!1,disableOnClick:!1,isIcon:!1,type:void 0,fullWidth:void 0}},n={render:s,args:{...e.args,isIcon:!0,slot:`<mg-icon icon="${f[0]}"></mg-icon>`}},a={render:s,args:{...e.args,disableOnClick:!0}};var t,o,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: Template,
  args: {
    slot: 'Text button',
    variant: variants[0],
    label: 'Explicit aria label',
    disabled: false,
    disableOnClick: false,
    isIcon: false,
    type: undefined,
    fullWidth: undefined
  }
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var c,l,d;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgButton.args,
    isIcon: true,
    slot: \`<mg-icon icon="\${iconList[0]}"></mg-icon>\`
  }
}`,...(d=(l=n.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var m,u,p;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgButton.args,
    disableOnClick: true
  }
}`,...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const x=["MgButton","IsIcon","DisableOnClick"];export{a as DisableOnClick,n as IsIcon,e as MgButton,x as __namedExportsOrder,T as default};
