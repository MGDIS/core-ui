import{h as p}from"./index-BDiA27Xx.js";import{i as f}from"./index-CIp9HLOI.js";import{f as b}from"./index-Ddciy6Nl.js";const I=["medium","large"],k=["primary","secondary","danger","danger-alt","info","flat","success","link"],x={component:"mg-button",title:"Atoms/mg-button",parameters:{actions:{handles:["disabled-change"]}}},s=a=>p("mg-button",{...b(a,{variant:k[0],size:I[0]},[""]),innerHTML:a[""]}),e={render:s,args:{variant:void 0,label:"Explicit aria label",type:void 0,size:void 0,fullWidth:!1,form:"",disabled:!1,isIcon:!1,disableOnClick:!1,"":"Text button"}},n={render:s,args:{...e.args,isIcon:!0,"":`<mg-icon icon="${f[0]}"></mg-icon>`}},r={render:s,args:{...e.args,disableOnClick:!0}};var t,o,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(d=(l=n.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var m,u,g;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgButton.args,
    disableOnClick: true
  }
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const C=["MgButton","IsIcon","DisableOnClick"];export{r as DisableOnClick,n as IsIcon,e as MgButton,C as __namedExportsOrder,x as default};
