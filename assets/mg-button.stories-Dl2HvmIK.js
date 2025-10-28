import{h as t}from"./index-BdigElPL.js";import{i as o}from"./index-15CAg8Br.js";import{f as i}from"./iframe-6DGX90e-.js";import"./preload-helper-PPVm8Dsz.js";const c=["medium","large"],l=["primary","secondary","danger","danger-alt","info","flat","success","link"],g={component:"mg-button",title:"Atoms/mg-button",parameters:{actions:{handles:["disabled-change"]}}},s=a=>t("mg-button",{...i(a,{variant:l[0],size:c[0]},[""]),innerHTML:a[""]}),e={render:s,args:{variant:void 0,label:"Explicit aria label",type:void 0,size:void 0,fullWidth:!1,form:"",disabled:!1,isIcon:!1,disableOnClick:!1,"":"Text button"}},n={render:s,args:{...e.args,isIcon:!0,"":`<mg-icon icon="${o[0]}"></mg-icon>`}},r={render:s,args:{...e.args,disableOnClick:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgButton.args,
    'isIcon': true,
    '': \`<mg-icon icon="\${iconList[0]}"></mg-icon>\`
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgButton.args,
    disableOnClick: true
  }
}`,...r.parameters?.docs?.source}}};const f=["MgButton","IsIcon","DisableOnClick"];export{r as DisableOnClick,n as IsIcon,e as MgButton,f as __namedExportsOrder,g as default};
