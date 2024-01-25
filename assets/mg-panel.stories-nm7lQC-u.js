import{h as e}from"./index-OLtdmg-3.js";import{x as r}from"./index.es-PXOAO2Jp.js";const o=["text","icon"],s=["left","right"],c={component:"mg-panel",title:"Molecules/mg-panel",parameters:{actions:{handles:["title-change","expanded-change"]}},argTypes:{titlePosition:{options:[...s],control:{type:"select"}},expandToggleDisplay:{options:[...o],control:{type:"select"}}}},p=i=>e("mg-panel",{...r(i)},e("div",null,"Content"),e("div",{slot:"header-right",style:{width:"100%"}},e("mg-badge",{label:"1",value:"1",style:{"margin-right":"auto"}}),e("mg-button",{variant:"secondary"},e("mg-icon",{icon:"file-upload"})," Upload"),e("mg-button",{"is-icon":!0,variant:"secondary",label:"delete"},e("mg-icon",{icon:"trash"})))),t={render:p,args:{panelTitle:"title",expanded:!1,titleEditable:!0,expandToggleDisplay:o[0],titlePosition:s[0],expandToggleDisabled:!1}};var a,n,l;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: Template,
  args: {
    panelTitle: 'title',
    expanded: false,
    titleEditable: true,
    expandToggleDisplay: expandToggleDisplays[0],
    titlePosition: titlePositions[0],
    expandToggleDisabled: false
  }
}`,...(l=(n=t.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};const m=["MgPanel"];export{t as MgPanel,m as __namedExportsOrder,c as default};
