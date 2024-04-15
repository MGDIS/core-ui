import{h as z}from"./index-CJEt4w-d.js";import{G as C}from"./index.es-A6CDKOur.js";import{D as G}from"./mg-menu.conf-DGR1PezI.js";const H={component:"mg-menu-item",title:"Molecules/Menus/mg-menu-item",parameters:{actions:{handles:["item-loaded","item-updated"]}}},a=g=>z("mg-menu-item",{...C(g),innerHTML:g.slot}),e={render:a,args:{slot:'<span slot="label">My label</span>'}},n={render:a,args:{href:"./",...e.args}},s={render:a,args:{href:"./",target:"_blank",...e.args}},t={render:a,args:{...e.args,slot:'<span slot="label">My label</span><mg-icon icon="user" slot="image"></mg-icon>'}},r={render:a,args:{...e.args,slot:'<span slot="label">My label</span><mg-badge value="2" label="hello" slot="information"></mg-badge>'}},m={render:a,args:{...e.args,slot:'<span slot="label">My label</span><mg-badge value="2" label="hello" slot="information"></mg-badge><mg-icon icon="user" slot="image"></mg-icon>'}},o={render:a,args:{...e.args,"data-overflow-more":!0,"data-size":"medium",slot:'<span slot="label">My label</span>, <span slot="metadata">My metadata</span>'}},l={render:a,args:{...e.args,slot:`<span slot="label">My label</span>
    <mg-menu direction=${G.VERTICAL} label="submenu">
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
    </mg-menu>`}};var i,u,c;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: Template,
  args: {
    slot: \`<span slot="label">My label</span>\`
  }
}`,...(c=(u=e.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var p,d,M;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: Template,
  args: {
    href: './',
    ...MgMenuItem.args
  }
}`,...(M=(d=n.parameters)==null?void 0:d.docs)==null?void 0:M.source}}};var b,I,h;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: Template,
  args: {
    href: './',
    target: '_blank',
    ...MgMenuItem.args
  }
}`,...(h=(I=s.parameters)==null?void 0:I.docs)==null?void 0:h.source}}};var f,S,y;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    slot: \`<span slot="label">My label</span><mg-icon icon="user" slot="image"></mg-icon>\`
  }
}`,...(y=(S=t.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var T,v,W;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    slot: \`<span slot="label">My label</span><mg-badge value="2" label="hello" slot="information"></mg-badge>\`
  }
}`,...(W=(v=r.parameters)==null?void 0:v.docs)==null?void 0:W.source}}};var A,L,k;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    slot: \`<span slot="label">My label</span><mg-badge value="2" label="hello" slot="information"></mg-badge><mg-icon icon="user" slot="image"></mg-icon>\`
  }
}`,...(k=(L=m.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};var x,E,_;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: Template,
  args: {
    ...MgMenuItem.args,
    'data-overflow-more': true,
    'data-size': 'medium',
    'slot': \`<span slot="label">My label</span>, <span slot="metadata">My metadata</span>\`
  }
}`,...(_=(E=o.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var B,D,w;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(w=(D=l.parameters)==null?void 0:D.docs)==null?void 0:w.source}}};const O=["MgMenuItem","MgMenuItemAsLink","MgMenuItemAsExternalLink","MgMenuItemWhitIcon","MgMenuItemWhitBadge","MgMenuItemWhitBadgeAndIcon","MgMenuItemWhitMetadata","MgMenuItemWithSubmenu"];export{e as MgMenuItem,s as MgMenuItemAsExternalLink,n as MgMenuItemAsLink,r as MgMenuItemWhitBadge,m as MgMenuItemWhitBadgeAndIcon,t as MgMenuItemWhitIcon,o as MgMenuItemWhitMetadata,l as MgMenuItemWithSubmenu,O as __namedExportsOrder,H as default};
