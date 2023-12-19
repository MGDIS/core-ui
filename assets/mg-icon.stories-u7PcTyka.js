import{h as n,f as l}from"./utils-mC9zhaFX.js";import{i as c}from"./index-U34RMTQZ.js";const i=["small","regular","medium","large","extra-large"],p=["success","warning","danger","info","app"],m=["icon","background","full"],f={component:"mg-icon",title:"Atoms/mg-icon",argTypes:{icon:{options:c,control:{type:"select"}},size:{options:i,control:{type:"select"}},variant:{options:[void 0,...p],control:{type:"select"}},variantStyle:{options:[void 0,...m],control:{type:"select"}}}},d=e=>{const a=e.color;return delete e.color,n("div",{style:{color:a}},n("mg-icon",{...l(e,{size:i[1]})}))},o={render:d,args:{color:"",icon:c[0],size:void 0,spin:!1}};var s,t,r;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: Template,
  args: {
    color: '',
    icon: iconList[0],
    size: undefined,
    spin: false
  }
}`,...(r=(t=o.parameters)==null?void 0:t.docs)==null?void 0:r.source}}};const v=["MgIcon"];export{o as MgIcon,v as __namedExportsOrder,f as default};
