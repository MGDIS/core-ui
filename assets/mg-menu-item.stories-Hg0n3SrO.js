import{h as E}from"./index-OLtdmg-3.js";import{x as _}from"./index.es-PXOAO2Jp.js";import{D as k}from"./mg-menu.conf-mDXpIjCp.js";const R={component:"mg-menu-item",title:"Molecules/Menus/mg-menu-item",parameters:{actions:{handles:["item-loaded"]}}},a=l=>E("mg-menu-item",{..._(l),innerHTML:l.slot}),e={render:a,args:{slot:'<span slot="label">My label</span>'}},n={render:a,args:{href:"./",...e.args}},s={render:a,args:{...e.args,slot:'<span slot="label">My label</span><mg-icon icon="user" slot="image"></mg-icon>'}},t={render:a,args:{...e.args,slot:'<span slot="label">My label</span><mg-badge value="2" label="hello" slot="information"></mg-badge>'}},m={render:a,args:{...e.args,slot:'<span slot="label">My label</span><mg-badge value="2" label="hello" slot="information"></mg-badge><mg-icon icon="user" slot="image"></mg-icon>'}},r={render:a,args:{...e.args,"data-overflow-more":!0,"data-size":"medium",slot:'<span slot="label">My label</span>, <span slot="metadata">My metadata</span>'}},o={render:a,args:{...e.args,slot:`<span slot="label">My label</span>
    <mg-menu direction=${k.VERTICAL} label="submenu">
      <mg-menu-item>
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
    </mg-menu>`}};var g,i,u;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: Template,
  args: {
    slot: \`<span slot="label">My label</span>\`
  }
}`,...(u=(i=e.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var c,p,d;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: Template,
  args: {
    href: './',
    ...MgMenuItem.args
  }
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var b,M,I;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    slot: \`<span slot="label">My label</span><mg-icon icon="user" slot="image"></mg-icon>\`
  }
}`,...(I=(M=s.parameters)==null?void 0:M.docs)==null?void 0:I.source}}};var h,S,f;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    slot: \`<span slot="label">My label</span><mg-badge value="2" label="hello" slot="information"></mg-badge>\`
  }
}`,...(f=(S=t.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var y,T,v;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    slot: \`<span slot="label">My label</span><mg-badge value="2" label="hello" slot="information"></mg-badge><mg-icon icon="user" slot="image"></mg-icon>\`
  }
}`,...(v=(T=m.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var W,x,A;r.parameters={...r.parameters,docs:{...(W=r.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    'data-overflow-more': true,
    'data-size': 'medium',
    'slot': \`<span slot="label">My label</span>, <span slot="metadata">My metadata</span>\`
  }
}`,...(A=(x=r.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var L,B,D;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    slot: \`<span slot="label">My label</span>
    <mg-menu direction=\${Direction.VERTICAL} label="submenu">
      <mg-menu-item>
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
}`,...(D=(B=o.parameters)==null?void 0:B.docs)==null?void 0:D.source}}};const V=["MgMenuItem","MgMenuItemAsLink","MgMenuItemWhitIcon","MgMenuItemWhitBadge","MgMenuItemWhitBadgeAndIcon","MgMenuItemWhitMetadata","MgMenuItemWithSubmenu"];export{e as MgMenuItem,n as MgMenuItemAsLink,t as MgMenuItemWhitBadge,m as MgMenuItemWhitBadgeAndIcon,s as MgMenuItemWhitIcon,r as MgMenuItemWhitMetadata,o as MgMenuItemWithSubmenu,V as __namedExportsOrder,R as default};
