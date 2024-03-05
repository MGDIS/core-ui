import{h as n}from"./index-CJEt4w-d.js";import{x as l}from"./index.es-BUUxBfzo.js";import{i as c}from"./index-K2AdWO80.js";const i=["small","regular","medium","large","extra-large"],p=["success","warning","danger","info","app"],m=["icon","background","full"],v={component:"mg-icon",title:"Atoms/mg-icon",argTypes:{icon:{options:c,control:{type:"select"}},size:{options:i,control:{type:"select"}},variant:{options:[void 0,...p],control:{type:"select"}},variantStyle:{options:[void 0,...m],control:{type:"select"}}}},d=e=>{const a=e.color;return delete e.color,n("div",{style:{color:a}},n("mg-icon",{...l(e,{size:i[1]})}))},o={render:d,args:{color:"",icon:c[0],size:void 0,spin:!1}};var t,s,r;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: Template,
  args: {
    color: '',
    icon: iconList[0],
    size: undefined,
    spin: false
  }
}`,...(r=(s=o.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};const y=["MgIcon"];export{o as MgIcon,y as __namedExportsOrder,v as default};
