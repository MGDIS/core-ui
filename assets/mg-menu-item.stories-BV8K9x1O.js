import{h as g}from"./index-BDiA27Xx.js";import{f as C}from"./index-Ddciy6Nl.js";import{d as R}from"./mg-menu.conf-D_q0UiHu.js";const P={component:"mg-menu-item",title:"Molecules/Menus/mg-menu-item",parameters:{actions:{handles:["item-loaded","item-updated"]}}},a=n=>g("mg-menu",{label:"demo"},g("mg-menu-item",{...C(n,{status:"visible"},["","image","information","label","metadata"]),innerHTML:`${n[""]}${n.image}${n.information}${n.label}${n.metadata}`})),e={render:a,args:{identifier:"identifier",href:void 0,target:void 0,status:void 0,expanded:!1,"":"",image:"",information:"",label:'<span slot="label">My label</span>',metadata:""}},t={render:a,args:{...e.args,href:"./"}},s={render:a,args:{...t.args,target:"_blank"}},r={render:a,args:{...e.args,label:'<span slot="label">My label</span>',image:'<mg-icon icon="user" slot="image"></mg-icon>'}},m={render:a,args:{...e.args,label:'<span slot="label">My label</span>',information:'<mg-badge value="2" label="hello" slot="information"></mg-badge>'}},o={render:a,args:{...e.args,label:'<span slot="label">My label</span>',information:'<mg-badge value="2" label="hello" slot="information"></mg-badge>',image:'<mg-icon icon="user" slot="image"></mg-icon>'}},l={render:a,args:{...e.args,"data-overflow-more":!0,"data-size":"large",label:'<span slot="label">My label</span>',metadata:'<span slot="metadata">My metadata</span>'}},i={render:a,args:{...e.args,expanded:!0,label:'<span slot="label">My label</span>',"":`<mg-menu direction="${R.VERTICAL}" label="submenu">
  <mg-menu-item status="active">
    <span slot="label">Subitem 1</span>
  </mg-menu-item>
  <mg-menu-item>
    <mg-icon icon="user" slot="image"></mg-icon>
    <span slot="label">Subitem 2</span>
  </mg-menu-item>
  <mg-menu-item>
    <span slot="label">Subitem 3</span>
    <mg-icon icon="user" slot="image"></mg-icon>
    <mg-badge value="2" label="hello" variant="text-color" slot="information"></mg-badge>
  </mg-menu-item>
</mg-menu>`}};var u,d,c;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: Template,
  args: {
    // Props
    'identifier': 'identifier',
    'href': undefined,
    'target': undefined,
    'status': undefined,
    'expanded': false,
    // Slots
    '': '',
    'image': '',
    'information': '',
    'label': \`<span slot="label">My label</span>\`,
    'metadata': ''
  }
}`,...(c=(d=e.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,b,M;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    href: './'
  }
}`,...(M=(b=t.parameters)==null?void 0:b.docs)==null?void 0:M.source}}};var f,I,h;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItemAsLink.args,
    target: '_blank'
  }
}`,...(h=(I=s.parameters)==null?void 0:I.docs)==null?void 0:h.source}}};var S,v,y;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: \`<span slot="label">My label</span>\`,
    image: \`<mg-icon icon="user" slot="image"></mg-icon>\`
  }
}`,...(y=(v=r.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var T,x,A;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: \`<span slot="label">My label</span>\`,
    information: \`<mg-badge value="2" label="hello" slot="information"></mg-badge>\`
  }
}`,...(A=(x=m.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var W,L,k;o.parameters={...o.parameters,docs:{...(W=o.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    // Slots
    label: \`<span slot="label">My label</span>\`,
    information: \`<mg-badge value="2" label="hello" slot="information"></mg-badge>\`,
    image: \`<mg-icon icon="user" slot="image"></mg-icon>\`
  }
}`,...(k=(L=o.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};var $,E,_;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    'data-overflow-more': true,
    'data-size': 'large',
    // Slot
    'label': \`<span slot="label">My label</span>\`,
    'metadata': \`<span slot="metadata">My metadata</span>\`
  }
}`,...(_=(E=l.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var B,w,z;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    'expanded': true,
    // Slot
    'label': \`<span slot="label">My label</span>\`,
    '': \`<mg-menu direction="\${directions.VERTICAL}" label="submenu">
  <mg-menu-item status="active">
    <span slot="label">Subitem 1</span>
  </mg-menu-item>
  <mg-menu-item>
    <mg-icon icon="user" slot="image"></mg-icon>
    <span slot="label">Subitem 2</span>
  </mg-menu-item>
  <mg-menu-item>
    <span slot="label">Subitem 3</span>
    <mg-icon icon="user" slot="image"></mg-icon>
    <mg-badge value="2" label="hello" variant="text-color" slot="information"></mg-badge>
  </mg-menu-item>
</mg-menu>\`
  }
}`,...(z=(w=i.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};const j=["MgMenuItem","MgMenuItemAsLink","MgMenuItemAsExternalLink","MgMenuItemWhitIcon","MgMenuItemWhitBadge","MgMenuItemWhitBadgeAndIcon","MgMenuItemWhitMetadata","MgMenuItemWithSubmenu"];export{e as MgMenuItem,s as MgMenuItemAsExternalLink,t as MgMenuItemAsLink,m as MgMenuItemWhitBadge,o as MgMenuItemWhitBadgeAndIcon,r as MgMenuItemWhitIcon,l as MgMenuItemWhitMetadata,i as MgMenuItemWithSubmenu,j as __namedExportsOrder,P as default};
