import{h as u}from"./index-BDiA27Xx.js";import{s as T}from"./index.es-CvGFZpni.js";const S={component:"mg-tooltip",title:"Atoms/mg-tooltip",parameters:{layout:"centered"}},r=s=>u("mg-tooltip",{...T(s,{placement:"bottom"},[""]),innerHTML:s[""]}),e={render:r,args:{identifier:"identifier",message:"This is a tooltip message",placement:void 0,display:!1,disabled:!1,"":'<mg-icon icon="info-circle"></mg-icon>'}},o={render:r,args:{...e.args,"":"<mg-button>Action</mg-button>"}},t={render:r,args:{...e.args,"":"<span>any text</span>"}};var a,n,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'identifier': 'identifier',
    'message': 'This is a tooltip message',
    'placement': undefined,
    'display': false,
    'disabled': false,
    // Slot
    '': '<mg-icon icon="info-circle"></mg-icon>'
  }
}`,...(i=(n=e.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};var p,m,c;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgTooltip.args,
    // Slot
    '': \`<mg-button>Action</mg-button>\`
  }
}`,...(c=(m=o.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var l,g,d;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgTooltip.args,
    // Slot
    '': \`<span>any text</span>\`
  }
}`,...(d=(g=t.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};const b=["MgTooltip","MgTooltipOnButton","MgTooltipOnSpan"];export{e as MgTooltip,o as MgTooltipOnButton,t as MgTooltipOnSpan,b as __namedExportsOrder,S as default};
