import{h as g}from"./index-BDiA27Xx.js";import{i as f}from"./index-CIp9HLOI.js";import{F as b}from"./index.es-Bgj_r6ds.js";const I=["medium","large"],k=["primary","secondary","danger","danger-alt","info","flat","success","link"],x={component:"mg-button",title:"Atoms/mg-button",parameters:{actions:{handles:["disabled-change"]}}},r=s=>g("mg-button",{...b(s,{variant:k[0],size:I[0]},[""]),innerHTML:s[""]}),e={render:r,args:{variant:void 0,label:"Explicit aria label",type:void 0,size:void 0,fullWidth:!1,form:"",disabled:!1,isIcon:!1,disableOnClick:!1,"":"Text button"}},n={render:r,args:{...e.args,isIcon:!0,"":`<mg-icon icon="${f[0]}"></mg-icon>`}},a={render:r,args:{...e.args,disableOnClick:!0}};var t,o,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'variant': undefined,
    'label': 'Explicit aria label',
    'type': undefined,
    'size': undefined,
    'fullWidth': false,
    'form': '',
    'disabled': false,
    'isIcon': false,
    'disableOnClick': false,
    // Slot
    '': 'Text button'
  }
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var c,l,d;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgButton.args,
    'isIcon': true,
    '': \`<mg-icon icon="\${iconList[0]}"></mg-icon>\`
  }
}`,...(d=(l=n.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var m,u,p;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgButton.args,
    disableOnClick: true
  }
}`,...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const C=["MgButton","IsIcon","DisableOnClick"];export{a as DisableOnClick,n as IsIcon,e as MgButton,C as __namedExportsOrder,x as default};
