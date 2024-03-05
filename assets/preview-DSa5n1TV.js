function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./mg-action-more_34.entry-ByzE2gkw.js","./index-d2fc6ec0-C5cwWy5q.js","./mg-menu.conf-9609bcb2-CVytr2H4.js","./index-FwRSe4z1.js","./_commonjsHelpers-BosuxZz1.js","./preview-errors-Dg5lG0lC.js","./index-DrFu-skq.js","./index.es-BUUxBfzo.js","./iframe-x_v7VgSX.js","./mg-item-more.entry-jS3ffMnj.js","./mg-loader.entry-BckzABr_.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{d as R}from"./index-FwRSe4z1.js";import{I as ze,v as He}from"./preview-errors-Dg5lG0lC.js";import{L as Oe,m as _e}from"./index.es-BUUxBfzo.js";import{_ as E}from"./iframe-x_v7VgSX.js";const{addons:Re}=__STORYBOOK_MODULE_PREVIEW_API__,{global:X}=__STORYBOOK_MODULE_GLOBAL__;var Ve="actions",Be="storybook/actions",We=`${Be}/action-event`,V={depth:10,clearOnStoryChange:!0,limit:50},pe=(e,t)=>{let n=Object.getPrototypeOf(e);return!n||t(n)?n:pe(n,t)},je=e=>!!(typeof e=="object"&&e&&pe(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),Ue=e=>{if(je(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let n=Object.getOwnPropertyDescriptor(t,"view"),o=n==null?void 0:n.value;return typeof o=="object"&&(o==null?void 0:o.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...n,value:Object.create(o.constructor.prototype)}),t}return e},Fe=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?He():Date.now().toString(36)+Math.random().toString(36).substring(2);function Ne(e,t={}){let n={...V,...t},o=function(...a){var d,m;if(t.implicit){let g=(d="__STORYBOOK_PREVIEW__"in X?X.__STORYBOOK_PREVIEW__:void 0)==null?void 0:d.storyRenders.find(u=>u.phase==="playing"||u.phase==="rendering");if(g){let u=!((m=window==null?void 0:window.FEATURES)!=null&&m.disallowImplicitActionsInRenderV8),f=new ze({phase:g.phase,name:e,deprecated:u});if(u)console.warn(f);else throw f}}let i=Re.getChannel(),s=Fe(),r=5,l=a.map(Ue),p=a.length>1?l:l[0],c={id:s,count:0,data:{name:e,args:p},options:{...n,maxDepth:r+(n.depth||3),allowFunction:n.allowFunction||!1}};i.emit(We,c)};return o.isAction=!0,o}var Ge=(...e)=>{let t=V,n=e;n.length===1&&Array.isArray(n[0])&&([n]=n),n.length!==1&&typeof n[n.length-1]!="string"&&(t={...V,...n.pop()});let o=n[0];(n.length!==1||typeof o=="string")&&(o={},n.forEach(i=>{o[i]=i}));let a={};return Object.keys(o).forEach(i=>{a[i]=Ne(o[i],t)}),a};const{global:Ke}=__STORYBOOK_MODULE_GLOBAL__,{makeDecorator:Ye,useEffect:Je}=__STORYBOOK_MODULE_PREVIEW_API__;var{document:Z,Element:Q}=Ke,Xe=/^(\S+)\s*(.*)$/,Ze=Q!=null&&!Q.prototype.matches,Qe=Ze?"msMatchesSelector":"matches",me=(e,t)=>{if(e[Qe](t))return!0;let n=e.parentElement;return n?me(n,t):!1},et=(e,...t)=>{let n=e(...t);return Object.entries(n).map(([o,a])=>{let[i,s,r]=o.match(Xe)||[];return{eventName:s,handler:l=>{(!r||me(l.target,r))&&a(l)}}})},tt=(e,...t)=>{let n=Z&&Z.getElementById("storybook-root");Je(()=>{if(n!=null){let o=et(e,...t);return o.forEach(({eventName:a,handler:i})=>n.addEventListener(a,i)),()=>o.forEach(({eventName:a,handler:i})=>n.removeEventListener(a,i))}},[n,e,t])},nt=Ye({name:"withActions",parameterName:Ve,skipIfNoParametersOrOptions:!0,wrapper:(e,t,{parameters:n})=>(n!=null&&n.handles&&tt(Ge,...n.handles),e(t))});const ot="2024-03-05T09:51:23",at={name:"@stencil/core",version:"4.12.4",typescriptVersion:"5.3.3"},st=[{filePath:"src/components/molecules/mg-action-more/mg-action-more.tsx",encapsulation:"shadow",tag:"mg-action-more",readme:`## Anatomy

![](./doc/img/mg-action-more-anatomy.png)

## Specifications

![](./doc/img/mg-action-more-popover-spacing.png)

### Spacing

Popover padding should be 10px up/down, 0px left/right.

## Behavior

### Action

In addition of the standard popover's behavior, when an item of the menu is clicked the popover closes itself.

## Items

### Button's variant

![](./doc/img/mg-action-more-options-variant.png)

It is possible to set another variant (see [mg-button](http://core.pages.mgdis.fr/core-ui/core-ui/?path=/docs/atoms-mg-button--docs)).

### Icon

![](./doc/img/mg-action-more-options-icon.png)

It is possible to set another icon

### Label

![](./doc/img/mg-action-more-options-label.png)

It is possible to set another label.

### Chevron

![](./doc/img/mg-action-more-options-chevron.png)

It is possible to display a chevron on the label right side, it make a 180 degree rotation on click.
`,docs:"![](./doc/img/mg-action-more-anatomy.png)",docsTags:[],usage:{},props:[{name:"button",type:'{ isIcon: boolean; variant: "flat" | "info" | "success" | "link" | "primary" | "secondary" | "danger" | "danger-alt"; label?: string; disabled?: boolean; }',complexType:{original:"MgActionMoreButtonType",resolved:'{ isIcon: boolean; variant: "flat" | "info" | "success" | "link" | "primary" | "secondary" | "danger" | "danger-alt"; label?: string; disabled?: boolean; }',references:{MgActionMoreButtonType:{location:"import",path:"./mg-action-more.conf",id:"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreButtonType"}}},mutable:!1,reflectToAttr:!1,docs:"Define button properties",docsTags:[],default:"{ variant: 'flat', isIcon: true }",values:[{type:'{ isIcon: boolean; variant: "flat"'},{value:"info",type:"string"},{value:"success",type:"string"},{value:"link",type:"string"},{value:"primary",type:"string"},{value:"secondary",type:"string"},{value:"danger",type:"string"},{type:'"danger-alt"; label?: string; disabled?: boolean; }'}],optional:!1,required:!1},{name:"displayChevron",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"display-chevron",reflectToAttr:!1,docs:"Define if chevron is display",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"icon",type:"{ icon: string; }",complexType:{original:"MgActionMoreIconType",resolved:"{ icon: string; }",references:{MgActionMoreIconType:{location:"import",path:"./mg-action-more.conf",id:"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreIconType"}}},mutable:!0,reflectToAttr:!1,docs:"Define displayed icon",docsTags:[],values:[{type:"{ icon: string; }"}],optional:!1,required:!1},{name:"items",type:"MgActionMoreItemType[]",complexType:{original:"MgActionMoreItemType[]",resolved:"MgActionMoreItemType[]",references:{MgActionMoreItemType:{location:"import",path:"./mg-action-more.conf",id:"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreItemType"}}},mutable:!1,reflectToAttr:!1,docs:"Define the menu-items elements",docsTags:[],values:[{type:"MgActionMoreItemType[]"}],optional:!1,required:!0}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-icon","mg-popover","mg-button","mg-menu","mg-menu-item","mg-badge"],dependencyGraph:{"mg-action-more":["mg-icon","mg-popover","mg-button","mg-menu","mg-menu-item","mg-badge"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-menu-item":["mg-badge","mg-icon","mg-popover"]}},{filePath:"src/components/atoms/mg-badge/mg-badge.tsx",encapsulation:"shadow",tag:"mg-badge",readme:`## Design

The badge is always placed on top of, or next to the element it is for.

The badge displays a number (can be followed by the \`+\` character) or a punctuation character.

## Specs

![](./doc/img/mg-badge-specs.png)

## Theming

![](./doc/img/mg-badge-styles.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-badge-size\`: define badge height and min-width, default: \`1.6rem\`
- \`--mg-badge-font-size\`: define badge font size, default: \`1.1rem\`
- \`--mg-badge-text-color\`: define badge color for text-color variant, default: \`--color-light\`
`,docs:"The badge is always placed on top of, or next to the element it is for.\n\nThe badge displays a number (can be followed by the `+` character) or a punctuation character.",docsTags:[],usage:{},props:[{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:`Badge label. Include short description.
Required for accessibility`,docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"outline",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"outline",reflectToAttr:!1,docs:"Define if button is using outline style",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"number | string",complexType:{original:"string | number",resolved:"number | string",references:{}},mutable:!1,attr:"value",reflectToAttr:!1,docs:"Badge value",docsTags:[],values:[{type:"number"},{type:"string"}],optional:!1,required:!0},{name:"variant",type:'"danger" | "info" | "primary" | "secondary" | "success" | "text-color" | "warning"',complexType:{original:"BadgeVariantType",resolved:'"danger" | "info" | "primary" | "secondary" | "success" | "text-color" | "warning"',references:{BadgeVariantType:{location:"import",path:"./mg-badge.conf",id:"src/components/atoms/mg-badge/mg-badge.conf.ts::BadgeVariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define button variant",docsTags:[],default:"variants[0]",values:[{value:"danger",type:"string"},{value:"info",type:"string"},{value:"primary",type:"string"},{value:"secondary",type:"string"},{value:"success",type:"string"},{value:"text-color",type:"string"},{value:"warning",type:"string"}],optional:!0,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-action-more","mg-menu-item","mg-tabs"],dependencies:[],dependencyGraph:{"mg-action-more":["mg-badge"],"mg-menu-item":["mg-badge"],"mg-tabs":["mg-badge"]}},{filePath:"src/components/atoms/mg-button/mg-button.tsx",encapsulation:"shadow",tag:"mg-button",readme:'## Usage\n\nA primary action button is, in most cases, unique on the screen, the other buttons must be displayed as "secondary", to highlight the primary action.\nEx: Validation, Save\n\nA tooltip must be displayed on hover when the button only displays a non-explicit icon, and has no label. The tooltip must indicate the action of the button.\n\nA button that launches a potentially long process is disabled and displays a loader for the duration of the process needs to use the `disable-on-click` attribute to ensure that the button is disabled when clicked.\n\nA button with undefined type in a form will natively have a [submit type](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button#attributs) and trigger form submission. So on non-submission buttons you need to explicitely set the type attribute as "button".\n\n## Specs\n\n![](./doc/img/mg-button-specs.png)\n\n## Placement\n\n![](./doc/img/mg-button-placement.png)\n\n## Theming\n\n![](./doc/img/mg-button-styles.png)\n\nFocused `mg-button` style is the one from the browser (outline).\n\n## Attributes combination: `disable-on-click` and `disabled`\n\nWhen a click is triggered, the component sets the `disabled` prop to true.\n\nTo benefit from a reactive `disabled` prop, you need to handle the `disabled-change` event.\n\nTo reset the loader after the process has completed, you need to set the `disabled` prop asynchronously.\n\n## CSS Variables\n\nIf needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:\n\n### Global\n\n- `--mg-button-border-radius`: define button border radius, default: `0.3rem`\n- `--mg-button-icon-border-radius`: define button border radius in icon mode, default: `--default-size`\n- `--mg-button-disabled-opacity`: define button opacity when disabled, default: `--mg-disabled-opacity`\n- `--mg-button-gradient`: define if button use gradient, possible values 0 (no gradient) or 1 (with gradient), default: `1`\n- `--mg-button-border-variation`: define if button has a border based on background color, possible values 0 (no border) or 1 (with border), default: `1`\n\n### Variant\n\nVariants `danger`, `danger-alt`, `info` and `success` can be customized by changing the global [colors](./?path=/docs/style-colors--docs).\n\n#### Primary\n\n- `--mg-button-primary-color-h`: define hue color value for primary button, default: `--color-dark-h`\n- `--mg-button-primary-color-s`: define saturation color value for primary button, default: `--color-dark-s`\n- `--mg-button-primary-color-l`: define lightness color value for primary button, default: `--color-dark-l`\n- `--mg-button-primary-font-color`: define font color for primary button, default: `--color-neutral`\n\n#### Secondary\n\n- `--mg-button-secondary-color-h`: define hue color value for secondary button, default: `--color-neutral-h`\n- `--mg-button-secondary-color-s`: define saturation color value for secondary button, default: `--color-neutral-s`\n- `--mg-button-secondary-color-l`: define lightness color value for secondary button, default: `--color-neutral-l`\n- `--mg-button-secondary-font-color`: define font color for secondary button, default: `--color-dark`\n',docs:`A primary action button is, in most cases, unique on the screen, the other buttons must be displayed as "secondary", to highlight the primary action.
Ex: Validation, Save

A tooltip must be displayed on hover when the button only displays a non-explicit icon, and has no label. The tooltip must indicate the action of the button.

A button that launches a potentially long process is disabled and displays a loader for the duration of the process needs to use the \`disable-on-click\` attribute to ensure that the button is disabled when clicked.

A button with undefined type in a form will natively have a [submit type](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button#attributs) and trigger form submission. So on non-submission buttons you need to explicitely set the type attribute as "button".`,docsTags:[],usage:{},props:[{name:"disableOnClick",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disable-on-click",reflectToAttr:!1,docs:`Option to set input disable on click, in order to prevent multi-click.
Parent component have to remove the attribute 'disabled' when the process ends.`,docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"disabled",reflectToAttr:!1,docs:"Disable button",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"form",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"form",reflectToAttr:!1,docs:`Define form id to attach button with.
If this attribute is not set, the <button> is associated with its ancestor <form> element.`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"fullWidth",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"full-width",reflectToAttr:!1,docs:"Set button to full-width",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"isIcon",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"is-icon",reflectToAttr:!1,docs:`Define if button is round.
Used for icon button.`,docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:`aria-label
In case button text is not explicit enough`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"type",type:'"button" | "reset" | "submit"',complexType:{original:"ButtonType",resolved:'"button" | "reset" | "submit"',references:{ButtonType:{location:"import",path:"./mg-button.conf",id:"src/components/atoms/mg-button/mg-button.conf.ts::ButtonType"}}},mutable:!1,attr:"type",reflectToAttr:!1,docs:"Define button type",docsTags:[],values:[{value:"button",type:"string"},{value:"reset",type:"string"},{value:"submit",type:"string"}],optional:!1,required:!1},{name:"variant",type:'"danger" | "danger-alt" | "flat" | "info" | "link" | "primary" | "secondary" | "success"',complexType:{original:"VariantType",resolved:'"danger" | "danger-alt" | "flat" | "info" | "link" | "primary" | "secondary" | "success"',references:{VariantType:{location:"import",path:"./mg-button.conf",id:"src/components/atoms/mg-button/mg-button.conf.ts::VariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define button variant",docsTags:[],default:"variants[0]",values:[{value:"danger",type:"string"},{value:"danger-alt",type:"string"},{value:"flat",type:"string"},{value:"info",type:"string"},{value:"link",type:"string"},{value:"primary",type:"string"},{value:"secondary",type:"string"},{value:"success",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"disabled-change",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgButtonElement['disabled']",resolved:"boolean",references:{HTMLMgButtonElement:{location:"global",id:"global::HTMLMgButtonElement"}}},cancelable:!0,composed:!0,docs:"Emmited event when disabled change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-action-more","mg-input-checkbox","mg-input-checkbox-paginated","mg-message","mg-modal","mg-pagination","mg-panel","mg-popover-content"],dependencies:["mg-icon"],dependencyGraph:{"mg-button":["mg-icon"],"mg-action-more":["mg-button"],"mg-input-checkbox":["mg-button"],"mg-input-checkbox-paginated":["mg-button"],"mg-message":["mg-button"],"mg-modal":["mg-button"],"mg-pagination":["mg-button"],"mg-panel":["mg-button"],"mg-popover-content":["mg-button"]}},{filePath:"src/components/atoms/mg-card/mg-card.tsx",encapsulation:"shadow",tag:"mg-card",readme:`## Specifications

### Style

![](./doc/img/mg-card-style.png)

1. Border radius: 5px
2. Background: [@color-light](./?path=/docs/style-colors--docs)
3. Border: 1px, [@color-dark](./?path=/docs/style-colors--docs) with alpha at 5%
4. Shadow: [@shadow](./?path=/docs/style-colors--docs)

### Variant on bar / on background

You can set variant color on left bar or on background of the card

Values for variant colors are:

- info
- success
- warning
- danger
- app

![](./doc/img/mg-card-variant.png)

_exemple of "app color" for the last one_

Variant applied on the left bar uses **[full colors](./?path=/docs/style-colors--docs)**

Variant applied on the background uses **[soft colors](./?path=/docs/style-colors--docs)**

### Spacing

![](./doc/img/mg-card-spacing.png)

A padding of 16px is applied around the content

### Size

![](./doc/img/mg-card-size.png)

1. Ajusting with the content
2. Ajusting with its parent (100%)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-card-padding\`: define car padding, default: \`1.6rem\`
- \`--mg-card-border-radius\`: define card border radius, default: \`0.5rem\`
- \`--mg-card-background\`: define card background, default: \`hsl(var(--color-light))\`
- \`--mg-card-border\`: define card border, default: \`0.1rem solid hsla(var(--color-dark), 5%)\`
- \`--mg-card-box-shadow\`: define card shadow, default: \`var(--box-shadow)\`
- \`--mg-card-box-overflow\`: define card overflow, default: \`unset\`
- \`--mg-card-max-width\`: define card max-width, default: \`unset\`
- \`--mg-card-min-width\`: define card min-width, default: \`unset\`
`,docs:"",docsTags:[],usage:{},props:[{name:"variant",type:'"app" | "danger" | "info" | "success" | "warning"',complexType:{original:"undefined | VariantType",resolved:'"app" | "danger" | "info" | "success" | "warning"',references:{VariantType:{location:"import",path:"./mg-card.conf",id:"src/components/atoms/mg-card/mg-card.conf.ts::VariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define variant prop",docsTags:[],values:[{value:"app",type:"string"},{value:"danger",type:"string"},{value:"info",type:"string"},{value:"success",type:"string"},{value:"warning",type:"string"}],optional:!1,required:!1},{name:"variantStyle",type:'"bar-left" | "fill"',complexType:{original:"undefined | VariantStyleType",resolved:'"bar-left" | "fill"',references:{VariantStyleType:{location:"import",path:"./mg-card.conf",id:"src/components/atoms/mg-card/mg-card.conf.ts::VariantStyleType"}}},mutable:!0,attr:"variant-style",reflectToAttr:!1,docs:"Define variantStyle prop",docsTags:[],values:[{value:"bar-left",type:"string"},{value:"fill",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-message","mg-modal","mg-panel","mg-popover-content"],dependencies:[],dependencyGraph:{"mg-message":["mg-card"],"mg-modal":["mg-card"],"mg-panel":["mg-card"],"mg-popover-content":["mg-card"]}},{filePath:"src/components/atoms/mg-character-left/mg-character-left.tsx",encapsulation:"scoped",tag:"mg-character-left",readme:`## Design

This component display the number of characters left beside the max value length: \`{{number of characters left}}/{{max value length}}\`
`,docs:"This component display the number of characters left beside the max value length: `{{number of characters left}}/{{max value length}}`",docsTags:[],usage:{},props:[{name:"characters",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"characters",reflectToAttr:!1,docs:"Sets the characters to count",docsTags:[],default:"''",values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Sets an `id` attribute.\nNeeded by the input for accessibility `aria-decribedby`.",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"maxlength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"maxlength",reflectToAttr:!1,docs:"Add maximum length",docsTags:[],values:[{type:"number"}],optional:!1,required:!0}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-input-text","mg-input-textarea"],dependencies:[],dependencyGraph:{"mg-input-text":["mg-character-left"],"mg-input-textarea":["mg-character-left"]}},{filePath:"src/components/molecules/mg-details/mg-details.tsx",encapsulation:"shadow",tag:"mg-details",readme:`## Properties

![](./doc/img/mg-details-components.png)

- **summary** and **details** are slots which allow html content
- **toggle** is defined by mg-icon plus a custom text
  - mg-icon _chevron-down_ is used for the close state
  - mg-icon _chevron-up_ is used for the open state

## Behavior

### Action

The complete zone including the _summary_ and the _toggle_ is clickable and toggles the state of the component.

![](./doc/img/mg-details-behavior.png)

### Position

_Toggle_ follows the _summary_ and is always on the top right.

![](./doc/img/mg-details-position.png)

### Responsive

In mobile resolution, the text of the _toggle_ is hidden

![](./doc/img/mg-details-responsive.png)

## Specs

### Spacing

![](./doc/img/mg-details-spacing.png)

### Icons

Toggle's icon is chevron-down when closed.
Toggle's icon is chevron-up when opened.

The icon is displayed in "small" size.

### Style

Toggle's text is in 'Open Sans', 13px, Regular, [@color-dark](./?path=/docs/style-colors--docs).

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-details-spacing\`: define space between summary and details, default: \`1.5rem\`
`,docs:`![](./doc/img/mg-details-components.png)

- **summary** and **details** are slots which allow html content
- **toggle** is defined by mg-icon plus a custom text
  - mg-icon _chevron-down_ is used for the close state
  - mg-icon _chevron-up_ is used for the open state`,docsTags:[],usage:{},props:[{name:"expanded",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"expanded",reflectToAttr:!1,docs:"Define if details are diplayed",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"hideSummary",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"hide-summary",reflectToAttr:!1,docs:"Hide summary element",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"toggleClosed",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"toggle-closed",reflectToAttr:!1,docs:"Displayed title when details are closed",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"toggleOpened",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"toggle-opened",reflectToAttr:!1,docs:"Displayed title when details are opened",docsTags:[],values:[{type:"string"}],optional:!1,required:!0}],methods:[],events:[{event:"expanded-change",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgDetailsElement['expanded']",resolved:"boolean",references:{HTMLMgDetailsElement:{location:"global",id:"global::HTMLMgDetailsElement"}}},cancelable:!0,composed:!0,docs:"Emmited event when expanded change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-icon"],dependencyGraph:{"mg-details":["mg-icon"]}},{filePath:"src/components/atoms/mg-divider/mg-divider.tsx",encapsulation:"shadow",tag:"mg-divider",readme:`## Sizing

![](./doc/img/mg-divider-sizing.png)

Two sizes are possible:

- Regular: 120px
- Full: 100%

Rules:

- Regular is the default mode.
- In full mode it takes 100% of its parent.
- The thickness is 1px.

## Spacing

![](./doc/img/mg-divider-spacing.png)

Default margin applied on top and bottom of the divider is set to 40px.

## Color

![](./doc/img/mg-divider-color.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-divider-background-color\`: define the divider background color, default: \`hsla(var(--color-danger), 15%)\`
- \`--mg-divider-thickness\`: define the divider thickness, default: \`0.1rem\`
- \`--mg-divider-vertical-spacing\`: define the divider vertical spacing, default: \`4rem\`
`,docs:`![](./doc/img/mg-divider-sizing.png)

Two sizes are possible:

- Regular: 120px
- Full: 100%

Rules:

- Regular is the default mode.
- In full mode it takes 100% of its parent.
- The thickness is 1px.`,docsTags:[],usage:{},props:[{name:"size",type:'"full" | "regular"',complexType:{original:"'regular' | 'full'",resolved:'"full" | "regular"',references:{}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define component size",docsTags:[],default:"'regular'",values:[{value:"full",type:"string"},{value:"regular",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:[],dependencyGraph:{}},{filePath:"src/components/molecules/mg-form/mg-form.tsx",encapsulation:"shadow",tag:"mg-form",readme:`## Use

Use mg-form to build clean forms.  
The component manages:

- the spacing between inputs
- the required fileds message

## Anatomy

![](./doc/img/mg-form-anatomy.png)

1. Required field(s) message
2. Inputs zone
3. Actions zone

## Style

### Required field(s) message

![](./doc/img/mg-form-style-required-message.png)

Text is in 'Open Sans', Regular, 12px, [@color-dark](./?path=/docs/style-colors--docs)  
The "\\*" is in [@color-danger](./?path=/docs/style-colors--docs)

## Spacing

### Inputs

The \`mg-form\` component applies a 15px margin to the bottom of the slotted \`mg-input-*\` elements.
The space between the label and the input area is increased to 30px.

![](./doc/img/mg-form-spacing-inputs.png)

#### Label on top

When the \`label-on-top\` prop is used, the vertical spacing is increased to 25px.

![](./doc/img/mg-form-spacing-inputs-label-on-top.png)

## Behavior

### Required field(s) message

This message is automatically generated by the component.

- If there is only 1 input required (among other inputs)

  > Field with a \\* is required

- If there are many required inputs (among other inputs)

  > Fields with a \\* are required

- If there is only 1 input and it is required

  > The field is required

  In this case, the \\* is hidden on inputs labels.

- If all inputs are required

  > All fields are required

  In this case, the \\* is hidden on inputs labels.

## Combining \`mg-input-*\` with legacy libraries

If you are creating a form that combines \`mg-components\` inputs with inputs from one of our legacy libraries (e.g., form, ui-components, ui-components-vuejs), you can achieve consistent styling by applying the \`mg-u-form-legacy\` class to the \`mg-form\` element. This ensures that \`mg-input-*\` components behave in accordance with Bootstrap styling conventions.

\`\`\`html
<mg-form class="form-horizontal mg-u-form-legacy">
  <text-field
    label="Text field label"
    reference="reference"
    help="Text field tooltip"
  ></text-field>
  <mg-input-text
    label="Mg input text label"
    identifier="identifier"
    tooltip="Mg input text tooltip"
  ></mg-input-text>
</mg-form>
\`\`\`

## 👍 Good practices

### Enabling _submit_ button

You can disable _submit button_ until all required fields are empty.
For this, use "valid/invalid" options.

## 💥 Troubleshooting

### axe-core: \`aria-valid-attr\` error for \`aria-role\` props

#### Issue

When we run a unit test with axe-core on an \`<mg-form />\` element we can get the following error:  [\`aria-valid-attr\`](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md).

#### Workaround

To succeed the test with the \`<mg-form />\` property \`aria-role\`, you need to bind this \`prop\` as a framework JS property, ex:
- vue: \`<mg-form :aria-role.prop="presentation"></mg-form>\`
- angular: \`<mg-form ng-prop-aria-role="presentation"></mg-form>\`
- jsx: \`<mg-form ariaRole={"presentation"}></mg-form>\`

#### Explanation

When you use JS property binding instead of HTML attribute, the component prop isn't rendered in the DOM, which results in a valid HTML DOM semantic, and succeed the test.

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-form-inputs-title-width\`: Define slotted input label width, default: \`23rem\`

## Example

**Code example does not reflect all the code.**

Here we have a \`form-valid\` event listener on the \`mg-form\` to define if the "submit" button should be enable or not.  
The "Display errors" button use the \`mg-form\` \`displayError()\` method.
`,docs:`Use mg-form to build clean forms.  
The component manages:

- the spacing between inputs
- the required fileds message`,docsTags:[],usage:{},props:[{name:"ariaRole",type:'"form" | "none" | "presentation" | "search"',complexType:{original:"AriaRoleType",resolved:'"form" | "none" | "presentation" | "search"',references:{AriaRoleType:{location:"import",path:"./mg-form.conf",id:"src/components/molecules/mg-form/mg-form.conf.ts::AriaRoleType"}}},mutable:!1,attr:"aria-role",reflectToAttr:!1,docs:"Define `<form/>` element aria role\nsee more about aria roles use case: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles",docsTags:[],values:[{value:"form",type:"string"},{value:"none",type:"string"},{value:"presentation",type:"string"},{value:"search",type:"string"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if form is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-form')",values:[{type:"string"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define form invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if slotted mg-component's label are displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if form is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"requiredMessage",type:'"default" | "hide"',complexType:{original:"RequiredMessageStatusType",resolved:'"default" | "hide"',references:{RequiredMessageStatusType:{location:"import",path:"./mg-form.conf",id:"src/components/molecules/mg-form/mg-form.conf.ts::RequiredMessageStatusType"}}},mutable:!1,attr:"required-message",reflectToAttr:!1,docs:`Define when required message is display.
When it is unset, component use it internal logic to manage "required message" help text display.
When you set the prop to \`default\`, you override the component internal logique to torce it display "required message" help text.
When you set the prop to \`hide\`, it will prevent the rendering of the message in the component's DOM.
As **this element is an accessibility requirement in the view**,
you **MUST*** re-implement this message on your own and display it when your form contains required inputs.`,docsTags:[],values:[{value:"default",type:"string"},{value:"hide",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define form valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]}],events:[{event:"form-submit",detail:"boolean",bubbles:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},cancelable:!0,composed:!0,docs:"Emitted event on form submit",docsTags:[]},{event:"form-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgFormElement['valid']",resolved:"boolean",references:{HTMLMgFormElement:{location:"global",id:"global::HTMLMgFormElement"}}},cancelable:!0,composed:!0,docs:`Emitted event on form validity check
Tells if form is valid or not`,docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:[],dependencyGraph:{}},{filePath:"src/components/atoms/mg-icon/mg-icon.tsx",encapsulation:"shadow",tag:"mg-icon",readme:`## Specifications

### Sizing

![](./doc/img/mg-icon-sizing.png) 

Sizes (px):

- small: 12x12
- regular: 16x16
- medium: 20x20
- large: 24x24
- extra-large: 32x32

### With "variant" applied

![](./doc/img/mg-icon-sizing-variant.png)

When *variant* is set a circle is put back to the icon with a width and height equal to the size of the icon multiplied by 2.
The icon is centered in it.

## Styling

### Default

![](./doc/img/mg-icon-styling-default.png)

Default color for the icon is the color used for the text.
Color: text of the page (usually [@color-dark](./?path=/docs/style-colors--docs))

### Variant style


### Variant
![](./doc/img/mg-icon-styling-iconVariant.png) 


![](./doc/img/mg-icon-styling-variant.png) 

"variant" property applies [semantic color](http://core.pages.mgdis.fr/core-ui/core-ui/?path=/docs/style-colors--docs) or "app color" to the background of the icon with Lightness set to 90% 
You can select "variant style" to apply "variant" on the icon or the background or both.

# File naming

Separator: "-" (dash).
By default, the pictograms are the "filled" version, but this doesn't need to be specified in the naming
Variant: "-outline". If pictogram variant has a background that has a full circle > add "-circle" *ex: check-circle, check-circle-outline*

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-icon-small-size\`: Define small icon size, default: \`1.2rem\`
- \`--mg-icon-regular-size\`: Define regular icon size, default: \`1.6rem\`
- \`--mg-icon-medium-size\`: Define medium icon size, default: \`2rem\`
- \`--mg-icon-large-size\`: Define large icon size, default: \`2.4rem\`
- \`--mg-icon-extra-large-size\`: Define extra large icon size, default: \`3.6rem\`
- \`--mg-icon-border-radius\`: Define icon border radiys, default: \`50%\`
`,docs:"",docsTags:[],usage:{},props:[{name:"icon",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"icon",reflectToAttr:!1,docs:"Icon to display.",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"size",type:'"extra-large" | "large" | "medium" | "regular" | "small"',complexType:{original:"IconSizeType",resolved:'"extra-large" | "large" | "medium" | "regular" | "small"',references:{IconSizeType:{location:"import",path:"./mg-icon.conf",id:"src/components/atoms/mg-icon/mg-icon.conf.ts::IconSizeType"}}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define icon size",docsTags:[],default:"'regular'",values:[{value:"extra-large",type:"string"},{value:"large",type:"string"},{value:"medium",type:"string"},{value:"regular",type:"string"},{value:"small",type:"string"}],optional:!1,required:!1},{name:"spin",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"spin",reflectToAttr:!1,docs:"Make the icon spin",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"variant",type:'"app" | "danger" | "info" | "success" | "warning"',complexType:{original:"IconVariantType",resolved:'"app" | "danger" | "info" | "success" | "warning"',references:{IconVariantType:{location:"import",path:"./mg-icon.conf",id:"src/components/atoms/mg-icon/mg-icon.conf.ts::IconVariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define icon variant color",docsTags:[],values:[{value:"app",type:"string"},{value:"danger",type:"string"},{value:"info",type:"string"},{value:"success",type:"string"},{value:"warning",type:"string"}],optional:!1,required:!1},{name:"variantStyle",type:'"background" | "full" | "icon"',complexType:{original:"IconVariantStyleType",resolved:'"background" | "full" | "icon"',references:{IconVariantStyleType:{location:"import",path:"./mg-icon.conf",id:"src/components/atoms/mg-icon/mg-icon.conf.ts::IconVariantStyleType"}}},mutable:!0,attr:"variant-style",reflectToAttr:!1,docs:`Define icon color variant style
Add a color to the icon based on variant color with given style
'full': Used to set a circular background with variant soft color and icon variant color
'background': Used to set a circular background with variant soft color
'icon': Used to set a color only to the icon`,docsTags:[],values:[{value:"background",type:"string"},{value:"full",type:"string"},{value:"icon",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-action-more","mg-button","mg-details","mg-input-checkbox","mg-input-checkbox-paginated","mg-input-date","mg-input-numeric","mg-input-password","mg-input-radio","mg-input-select","mg-input-text","mg-input-textarea","mg-input-toggle","mg-item-more","mg-loader","mg-menu-item","mg-message","mg-modal","mg-pagination","mg-panel","mg-popover-content","mg-tabs"],dependencies:[],dependencyGraph:{"mg-action-more":["mg-icon"],"mg-button":["mg-icon"],"mg-details":["mg-icon"],"mg-input-checkbox":["mg-icon"],"mg-input-checkbox-paginated":["mg-icon"],"mg-input-date":["mg-icon"],"mg-input-numeric":["mg-icon"],"mg-input-password":["mg-icon"],"mg-input-radio":["mg-icon"],"mg-input-select":["mg-icon"],"mg-input-text":["mg-icon"],"mg-input-textarea":["mg-icon"],"mg-input-toggle":["mg-icon"],"mg-item-more":["mg-icon"],"mg-loader":["mg-icon"],"mg-menu-item":["mg-icon"],"mg-message":["mg-icon"],"mg-modal":["mg-icon"],"mg-pagination":["mg-icon"],"mg-panel":["mg-icon"],"mg-popover-content":["mg-icon"],"mg-tabs":["mg-icon"]}},{filePath:"src/components/molecules/mg-illustrated-message/mg-illustrated-message.tsx",encapsulation:"shadow",tag:"mg-illustrated-message",readme:`## Specs

### Vertical

#### Anatomy

![](./doc/img/mg-illustrated-message-vertical-anatomy.png)

Component is built with:

- an illustration
- a title

Optionnally:

- one or more _details_ slot which accept HTML content (text, button...)

#### Style

- _title_: Open Sans, 20px, Regular
- All contents are centered.

#### Spacing

![](./doc/img/mg-illustrated-message-vertical-spacing.png).

30px between the bottom of the _illustration_ and top of the _title_.

20px for the top of the _details_ zone.

15px between left/right border of the screen and the component

#### Sizing

The maximum width of the component is 475px.

The maximum height of the illustration is 184px. Illustration must keep its proportionnality.
Illustration can be displayed in "small" size so its maximum height is set to 60px.

![](./doc/img/mg-illustrated-message-vertical-sizing-small.png)

### Horizontal

#### Anatomy

![](./doc/img/mg-illustrated-message-horizontal-anatomy.png)

#### Spacing

![](./doc/img/mg-illustrated-message-horizontal-spacing.png)

By default the margin is set to 40px on top and bottom. It's possible to modify this props.

![](./doc/img/mg-illustrated-message-horizontal-spacing-2.png)

Between the image and the group title/action.

#### Alignment

![](./doc/img/mg-illustrated-message-horizontal-alignment.png)

The image/illustration and the group tittle/details/action are vertically centred between them in the background.

#### Responsive

When there is not enough space the component take is default appearance.

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-illustrated-message-padding-vertical\`: define component vertical padding, default: \`4rem\`
`,docs:"",docsTags:[],usage:{},props:[{name:"direction",type:'"horizontal" | "vertical"',complexType:{original:"'vertical' | 'horizontal'",resolved:'"horizontal" | "vertical"',references:{}},mutable:!1,attr:"direction",reflectToAttr:!1,docs:"Define component orientation",docsTags:[],default:"'vertical'",values:[{value:"horizontal",type:"string"},{value:"vertical",type:"string"}],optional:!1,required:!1},{name:"size",type:'"regular" | "small"',complexType:{original:"'regular' | 'small'",resolved:'"regular" | "small"',references:{}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define illustration size",docsTags:[],default:"'regular'",values:[{value:"regular",type:"string"},{value:"small",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:[],dependencyGraph:{}},{filePath:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.tsx",encapsulation:"shadow",tag:"mg-input-checkbox",readme:`## Usage

True/False value notion.
Only 2 possible values.

### Theming

The style of the active checkbox is the browser's style.

## Specs

![](./doc/img/mg-input-checkbox-specs.png)

## Type "multi"

### Anatomy

![](./doc/img/mg-input-checkbox-multi-anatomy.png)

1. Button
  - variant: secondary
  - icon: list
2. Button
  - variant: link
3. Popover
4. Checkbox
5. Details
6. Search
7. Pagination

### Type "multi" with sections

![](./doc/img/mg-input-checkbox-multi-section.png)

#### Spacings

![](./doc/img/mg-input-checkbox-multi-section-button-spacing.png)

"Select all" and "Unselect all" buttons are aligned on left. 

![](./doc/img/mg-input-checkbox-multi-section-internal-spacing.png)

![](./doc/img/mg-input-checkbox-multi-section-spacing.png)


### Displayed values

![](./doc/img/mg-input-checkbox-display-values.png)

#### Without values

If the space is too narrow the text button will do a line break.

#### With values

If the space is too narrow the button and values will do a line break.

The component is ajusting with the space available. If the width is not enought big the values will do a breakline.

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-input-check-size\`: Define checkbox size, default: \`1.3rem\`

## Warning

Please be aware that this component has a known issue ([#139](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/139)) **when used with the Vue2 framework**. It is essential that your project loads the [mg-model directive](http://core.pages.mgdis.fr/core-back/core/docs/mg-components-helpers/mg-model-vue) and that the component uses it.
`,docs:`True/False value notion.
Only 2 possible values.`,docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"displaySelectedValues",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"display-selected-values",reflectToAttr:!1,docs:`Display selected values list in "multi" type
This prop is only applied with prop type "multi" or when an "unset" mode render a "multi" type.`,docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"inputVerticalList",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"input-vertical-list",reflectToAttr:!1,docs:"Define if inputs are display verticaly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Define input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Define input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if mg-input-checkbox is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if mg-input-checkbox is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"type",type:'"checkbox" | "multi"',complexType:{original:"CheckboxType",resolved:'"checkbox" | "multi"',references:{CheckboxType:{location:"import",path:"./mg-input-checkbox.conf",id:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxType"}}},mutable:!0,attr:"type",reflectToAttr:!1,docs:`Define checkbox type
When it's undefined the type is dynamic:
- With 0-5 items type is 'checkbox'
- With 5-10 items type is 'multi'
When it set the type is locked to the defined value.
When type is dynamic OR with 'multi' type AND Over 10 items "search" feature is enabled`,docsTags:[],values:[{value:"checkbox",type:"string"},{value:"multi",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"CheckboxValue[]",complexType:{original:"CheckboxValue[]",resolved:"CheckboxValue[]",references:{CheckboxValue:{location:"import",path:"./mg-input-checkbox.conf",id:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxValue"}}},mutable:!0,reflectToAttr:!1,docs:"Component value\nIf item.value is `null`, checkbox will be indeterminate by default",docsTags:[],values:[{type:"CheckboxValue[]"}],optional:!1,required:!0}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputCheckbox['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputCheckbox:{location:"global",id:"global::MgInputCheckbox"}},return:"Promise<void>"},signature:"setError(valid: MgInputCheckbox['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxElement['valid']",resolved:"boolean",references:{HTMLMgInputCheckboxElement:{location:"global",id:"global::HTMLMgInputCheckboxElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"CheckboxValue[]",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxElement['value']",resolved:"CheckboxValue[]",references:{HTMLMgInputCheckboxElement:{location:"global",id:"global::HTMLMgInputCheckboxElement"}}},cancelable:!0,composed:!0,docs:"Emitted event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-input-checkbox-paginated","mg-popover","mg-button","mg-icon","mg-input-text","mg-tooltip","mg-input-title"],dependencyGraph:{"mg-input-checkbox":["mg-input-checkbox-paginated","mg-popover","mg-button","mg-icon","mg-input-text","mg-tooltip","mg-input-title"],"mg-input-checkbox-paginated":["mg-button","mg-icon","mg-tooltip","mg-pagination"],"mg-button":["mg-icon"],"mg-tooltip":["mg-tooltip-content"],"mg-pagination":["mg-button","mg-icon","mg-input-select"],"mg-input-select":["mg-tooltip","mg-icon","mg-input-title"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-input-text":["mg-icon","mg-character-left","mg-tooltip","mg-input-title"]}},{filePath:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox-paginated/mg-input-checkbox-paginated.tsx",encapsulation:"scoped",tag:"mg-input-checkbox-paginated",readme:`# mg-input-checkbox-paginated


`,docs:"Internal component use to manage sections instances",docsTags:[],usage:{},props:[{name:"checkboxes",type:"CheckboxItem[]",complexType:{original:"CheckboxItem[]",resolved:"CheckboxItem[]",references:{CheckboxItem:{location:"import",path:"../mg-input-checkbox.conf",id:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxItem"}}},mutable:!1,reflectToAttr:!1,docs:"Define checkboxes to paginate",docsTags:[],default:"[]",values:[{type:"CheckboxItem[]"}],optional:!1,required:!1},{name:"currentPage",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!0,attr:"current-page",reflectToAttr:!1,docs:"Current page",docsTags:[],default:"1",values:[{type:"number"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if mg-input-checkbox-list is disabled",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"invalid",reflectToAttr:!1,docs:"Define mg-input-checkbox input invalid",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"messages",type:"{ [x: string]: string; }",complexType:{original:"Record<string, string>",resolved:"{ [x: string]: string; }",references:{Record:{location:"global",id:"global::Record"}}},mutable:!1,reflectToAttr:!1,docs:"Define component message",docsTags:[],values:[{type:"{ [x: string]: string; }"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:"Define mg-input-checkbox input name",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if mg-input-checkbox-list is readonly",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"sectionKind",type:"SectionKind.NOT_SELECTED | SectionKind.SELECTED",complexType:{original:"SectionKind",resolved:"SectionKind.NOT_SELECTED | SectionKind.SELECTED",references:{SectionKind:{location:"import",path:"../mg-input-checkbox.conf",id:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::SectionKind"}}},mutable:!1,attr:"section-kind",reflectToAttr:!1,docs:"Define section kind",docsTags:[],values:[{type:"SectionKind.NOT_SELECTED"},{type:"SectionKind.SELECTED"}],optional:!1,required:!1}],methods:[],events:[{event:"mass-action",detail:"SectionKind.NOT_SELECTED | SectionKind.SELECTED",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxPaginatedElement['sectionKind']",resolved:"SectionKind.NOT_SELECTED | SectionKind.SELECTED",references:{HTMLMgInputCheckboxPaginatedElement:{location:"global",id:"global::HTMLMgInputCheckboxPaginatedElement"}}},cancelable:!0,composed:!0,docs:`Emit 'mass-action' event
used to informe that select-all/unselect-all button listner is triggered`,docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-input-checkbox"],dependencies:["mg-button","mg-icon","mg-tooltip","mg-pagination"],dependencyGraph:{"mg-input-checkbox-paginated":["mg-button","mg-icon","mg-tooltip","mg-pagination"],"mg-button":["mg-icon"],"mg-tooltip":["mg-tooltip-content"],"mg-pagination":["mg-button","mg-icon","mg-input-select"],"mg-input-select":["mg-tooltip","mg-icon","mg-input-title"],"mg-input-checkbox":["mg-input-checkbox-paginated"]}},{filePath:"src/components/molecules/inputs/mg-input-date/mg-input-date.tsx",encapsulation:"shadow",tag:"mg-input-date",readme:`## Behavior

The behavior is the native behavior of the browser.

### Theming

Calendar and trigger: The style is the browser's native style.
`,docs:"The behavior is the native behavior of the browser.",docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example\nAvailable string variables:\n - `{pattern}`: render innerHTML pattern based on system\n - `{date}`: render innerText date with a pattern base format.\n - `{defaultHelpText}`: render default `helpText` usefull to concat helpText local with your custom text.\nex: `Input use {pattern} pattern` as `helpText` prop value will be render as `Input use mm/dd/yyyy pattern`",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"max",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"max",reflectToAttr:!1,docs:`Define input maximum date
format: yyyy-mm-dd`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"min",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"min",reflectToAttr:!1,docs:`Define input minimum date
format: yyyy-mm-dd`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputDate['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputDate:{location:"global",id:"global::MgInputDate"}},return:"Promise<void>"},signature:"setError(valid: MgInputDate['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputDateElement['valid']",resolved:"boolean",references:{HTMLMgInputDateElement:{location:"global",id:"global::HTMLMgInputDateElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgInputDateElement['value']",resolved:"string",references:{HTMLMgInputDateElement:{location:"global",id:"global::HTMLMgInputDateElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-tooltip","mg-icon","mg-input-title"],dependencyGraph:{"mg-input-date":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.tsx",encapsulation:"shadow",tag:"mg-input-numeric",readme:`## Usage

An amount field is a numeric field.  
By default it is limited to 16 characters (including comma).

It is not possible to enter characters other than numbers, "," or ".".

Rounding is to two digits after the decimal point.  
It is not possible to enter more than two digits after the decimal point.

It is possible to specify a unit after the field for integers and decimals. For currencies, the symbol is positioned in the input field.

## Specs

### Positioning

By default, the value is right aligned.

![](./doc/img/mg-input-numeric-positioning-default.png)

You can change the CSS variable \`--mg-inputs-text-align\` to left align.

![](./doc/img/mg-input-numeric-positioning-custom.png)

## Slot

The spacing between the field and the slot content is not managed by the component, it must be defined in slot implementation.

### Unit positioning

![](./doc/img/mg-input-numeric-unit.png)

Unit term must be placed into the field slot using a "space" character before the unit term.
`,docs:`An amount field is a numeric field.  
By default it is limited to 16 characters (including comma).

It is not possible to enter characters other than numbers, "," or ".".

Rounding is to two digits after the decimal point.  
It is not possible to enter more than two digits after the decimal point.

It is possible to specify a unit after the field for integers and decimals. For currencies, the symbol is positioned in the input field.`,docsTags:[],usage:{},props:[{name:"currency",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"currency",reflectToAttr:!1,docs:"Define currency",docsTags:[],default:"'USD'",values:[{type:"string"}],optional:!1,required:!1},{name:"decimalLength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"decimal-length",reflectToAttr:!1,docs:`Override decimal length
decimal is the number after the decimal point`,docsTags:[],default:"2",values:[{type:"number"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"format",type:'"currency" | "none" | "number"',complexType:{original:"Format",resolved:'"currency" | "none" | "number"',references:{Format:{location:"import",path:"./mg-input-numeric.conf",id:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts::Format"}}},mutable:!0,attr:"format",reflectToAttr:!1,docs:"Set local formatting.\nNumbers are formatted based on the locale.\nWhen type is set to `currency`, formatting has no effect.",docsTags:[],default:"'number'",values:[{value:"currency",type:"string"},{value:"none",type:"string"},{value:"number",type:"string"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"integerLength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"integer-length",reflectToAttr:!1,docs:`Override integer length
integer is the number before the decimal point`,docsTags:[],default:"13",values:[{type:"number"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input pattern error message",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"max",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"max",reflectToAttr:!1,docs:"Maximum value",docsTags:[],values:[{type:"number"}],optional:!1,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!1,docs:"Define input width",docsTags:[],values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"min",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"min",reflectToAttr:!1,docs:"Minimum value",docsTags:[],values:[{type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"type",type:'"currency" | "decimal" | "integer"',complexType:{original:"NumericType",resolved:'"currency" | "decimal" | "integer"',references:{NumericType:{location:"import",path:"./mg-input-numeric.conf",id:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts::NumericType"}}},mutable:!1,attr:"type",reflectToAttr:!1,docs:"Define numeric type",docsTags:[],default:"'decimal'",values:[{value:"currency",type:"string"},{value:"decimal",type:"string"},{value:"integer",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input pattern to validate",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputNumeric['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputNumeric:{location:"global",id:"global::MgInputNumeric"}},return:"Promise<void>"},signature:"setError(valid: MgInputNumeric['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputNumericElement['valid']",resolved:"boolean",references:{HTMLMgInputNumericElement:{location:"global",id:"global::HTMLMgInputNumericElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"number",bubbles:!0,complexType:{original:"number",resolved:"number",references:{}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-tooltip","mg-icon","mg-input-title"],dependencyGraph:{"mg-input-numeric":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/inputs/mg-input-password/mg-input-password.tsx",encapsulation:"shadow",tag:"mg-input-password",readme:`## Design

The standard display of "bullets" instead of characters is the standard one (depending on the rendering of the used browser).
`,docs:'The standard display of "bullets" instead of characters is the standard one (depending on the rendering of the used browser).',docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!1,docs:"Define input width",docsTags:[],default:"'full'",values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputPassword['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputPassword:{location:"global",id:"global::MgInputPassword"}},return:"Promise<void>"},signature:"setError(valid: MgInputPassword['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputPasswordElement['valid']",resolved:"boolean",references:{HTMLMgInputPasswordElement:{location:"global",id:"global::HTMLMgInputPasswordElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgInputPasswordElement['value']",resolved:"string",references:{HTMLMgInputPasswordElement:{location:"global",id:"global::HTMLMgInputPasswordElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-tooltip","mg-icon","mg-input-title"],dependencyGraph:{"mg-input-password":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/inputs/mg-input-radio/mg-input-radio.tsx",encapsulation:"shadow",tag:"mg-input-radio",readme:`## Usage

- Always used in a group with minimum 2 options
- Only one selected option is possible from all the options in the group
- The label option is clickable and selects the option
- The group can be initialized without any default value

### Theming

The style of the active radio button is that of the browser.

## Specs

![](./doc/img/mg-input-radio-specs.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-input-check-size\`: Define radio input size, default: \`1.3rem\`
`,docs:`- Always used in a group with minimum 2 options
- Only one selected option is possible from all the options in the group
- The label option is clickable and selects the option
- The group can be initialized without any default value`,docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"inputVerticalList",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"input-vertical-list",reflectToAttr:!1,docs:"Define if inputs are display verticaly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"items",type:"RadioOption[] | string[]",complexType:{original:"string[] | RadioOption[]",resolved:"RadioOption[] | string[]",references:{RadioOption:{location:"import",path:"./mg-input-radio.conf",id:"src/components/molecules/inputs/mg-input-radio/mg-input-radio.conf.ts::RadioOption"}}},mutable:!1,reflectToAttr:!1,docs:"Items are the possible options to select",docsTags:[],values:[{type:"RadioOption[]"},{type:"string[]"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"any",complexType:{original:"any",resolved:"any",references:{}},mutable:!0,attr:"value",reflectToAttr:!1,docs:"Component value",docsTags:[],values:[{type:"any"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputRadio['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputRadio:{location:"global",id:"global::MgInputRadio"}},return:"Promise<void>"},signature:"setError(valid: MgInputRadio['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputRadioElement['valid']",resolved:"boolean",references:{HTMLMgInputRadioElement:{location:"global",id:"global::HTMLMgInputRadioElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"any",bubbles:!0,complexType:{original:"HTMLMgInputRadioElement['value']",resolved:"any",references:{HTMLMgInputRadioElement:{location:"global",id:"global::HTMLMgInputRadioElement"}}},cancelable:!0,composed:!0,docs:"Emitted event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-tooltip","mg-icon","mg-input-title"],dependencyGraph:{"mg-input-radio":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/inputs/mg-input-select/mg-input-select.tsx",encapsulation:"shadow",tag:"mg-input-select",readme:`## Design

The placeholder of the list is "Select a value".

The behavior, style and position of the chevron on the right of the field are those of the native browser.  
The spacing between the text and the chevron is at least 10px.

### Sizing

The width of the component is defined by the largest option of the options.
`,docs:`The placeholder of the list is "Select a value".

The behavior, style and position of the chevron on the right of the field are those of the native browser.  
The spacing between the text and the chevron is at least 10px.`,docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"items",type:"(string | SelectOption)[]",complexType:{original:"(string | SelectOption)[]",resolved:"(string | SelectOption)[]",references:{SelectOption:{location:"import",path:"./mg-input-select.conf",id:"src/components/molecules/inputs/mg-input-select/mg-input-select.conf.ts::SelectOption"}}},mutable:!1,reflectToAttr:!1,docs:"Items are the possible options to select",docsTags:[],values:[{type:"(string"},{type:"SelectOption)[]"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!0,docs:"Define input width",docsTags:[],values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"placeholderDisabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"placeholder-disabled",reflectToAttr:!1,docs:"Option to disable placeholder",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"placeholderHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"placeholder-hide",reflectToAttr:!1,docs:"Option to remove placeholder",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"any",complexType:{original:"any",resolved:"any",references:{}},mutable:!0,attr:"value",reflectToAttr:!1,docs:"Component value",docsTags:[],values:[{type:"any"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputSelect['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputSelect:{location:"global",id:"global::MgInputSelect"}},return:"Promise<void>"},signature:"setError(valid: MgInputSelect['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxElement['valid']",resolved:"boolean",references:{HTMLMgInputCheckboxElement:{location:"global",id:"global::HTMLMgInputCheckboxElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"CheckboxValue[]",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxElement['value']",resolved:"CheckboxValue[]",references:{HTMLMgInputCheckboxElement:{location:"global",id:"global::HTMLMgInputCheckboxElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-pagination"],dependencies:["mg-tooltip","mg-icon","mg-input-title"],dependencyGraph:{"mg-input-select":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-pagination":["mg-input-select"]}},{filePath:"src/components/molecules/inputs/mg-input-text/mg-input-text.tsx",encapsulation:"shadow",tag:"mg-input-text",readme:`## Design

### Indication of the number of characters left

- when the focus is on the input field, the \`mg-character-left\` component is displayed
- when the focus is no longer on the input field, the message disappears
- by default limited to 400 alpha numeric characters

#### Font

![](./doc/img/mg-input-text-fonts.png)

Open Sans, regular, 11px  
Color: [@color-dark](./?path=/docs/style-colors--docs), opacity: 0.6

#### Spacing

![](./doc/img/mg-input-text-spacing.png)

#### Position

![](./doc/img/mg-input-text-position.png)

Position: center

## Use as \`search\` input

Due to [accessibility recommendation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/search#search_form_labels_and_accessibility), an \`<input type="search" />\` must be used within a \`<form role="search" />\` we recommend using mg-input-text as in dedicated story.

The "search" role can only be used when the input field is the main website search field.

## Display a \`datalist\`

The \`datalist\` behavior is set with \`datalistoptions\` prop to initalize options list.

## Slot

The spacing between the field and the slot content is not managed by the component, it must be defined in slot implementation.
`,docs:"",docsTags:[],usage:{},props:[{name:"datalistoptions",type:"string[]",complexType:{original:"string[]",resolved:"string[]",references:{}},mutable:!1,reflectToAttr:!1,docs:"Define datalist options",docsTags:[],values:[{type:"string[]"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"displayCharacterLeft",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"display-character-left",reflectToAttr:!1,docs:"Define if component should display character left",docsTags:[],default:"true",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"icon",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"icon",reflectToAttr:!1,docs:"Input icon",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"maxlength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"maxlength",reflectToAttr:!1,docs:"Input max length",docsTags:[],default:"400",values:[{type:"number"}],optional:!1,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!1,docs:"Define input width",docsTags:[],default:"'full'",values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"pattern",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"pattern",reflectToAttr:!1,docs:`Define input pattern to validate
Please refer to the Pattern section in the input documentation for detailed information on using regular expressions in components.`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"patternErrorMessage",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"pattern-error-message",reflectToAttr:!1,docs:"Define input pattern error message",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"type",type:'"search" | "text"',complexType:{original:"TextType",resolved:'"search" | "text"',references:{TextType:{location:"import",path:"./mg-input-text.conf",id:"src/components/molecules/inputs/mg-input-text/mg-input-text.conf.ts::TextType"}}},mutable:!1,attr:"type",reflectToAttr:!1,docs:"Input type",docsTags:[],default:"'text'",values:[{value:"search",type:"string"},{value:"text",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputText['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputText:{location:"global",id:"global::MgInputText"}},return:"Promise<void>"},signature:"setError(valid: MgInputText['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]},{name:"setFocus",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"setFocus() => Promise<void>",parameters:[],docs:"Public method to play input focus",docsTags:[]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputTextElement['valid']",resolved:"boolean",references:{HTMLMgInputTextElement:{location:"global",id:"global::HTMLMgInputTextElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgInputTextElement['value']",resolved:"string",references:{HTMLMgInputTextElement:{location:"global",id:"global::HTMLMgInputTextElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-input-checkbox","mg-panel"],dependencies:["mg-icon","mg-character-left","mg-tooltip","mg-input-title"],dependencyGraph:{"mg-input-text":["mg-icon","mg-character-left","mg-tooltip","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-input-checkbox":["mg-input-text"],"mg-panel":["mg-input-text"]}},{filePath:"src/components/molecules/inputs/mg-input-textarea/mg-input-textarea.tsx",encapsulation:"shadow",tag:"mg-input-textarea",readme:`## Design

### Indication of the number of characters left

- when the focus is on the input field, the \`mg-character-left\` component is displayed
- when the focus is no longer on the input field, the message disappears
- by default limited to 4000 alpha numeric characters

#### Font

Open Sans, regular, 11px  
Color: [@color-dark](./?path=/docs/style-colors--docs), opacity: 0.6

#### Spacing

![](./doc/img/mg-input-textarea-spacing.png)

### Dimensions

- the height of the component is by default 3 lines of text (this value is configurable)
- by default, the input field cannot be resized
`,docs:"",docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"displayCharacterLeft",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"display-character-left",reflectToAttr:!1,docs:"Define if component should display character left",docsTags:[],default:"true",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"maxlength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"maxlength",reflectToAttr:!1,docs:"Input max length",docsTags:[],default:"4000",values:[{type:"number"}],optional:!1,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!1,docs:"Define input width",docsTags:[],default:"'full'",values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"pattern",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"pattern",reflectToAttr:!1,docs:`Define input pattern to validate
Please refer to the Pattern section in the input documentation for detailed information on using regular expressions in components.`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"patternErrorMessage",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"pattern-error-message",reflectToAttr:!1,docs:"Define input pattern error message",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"resizable",type:'"both" | "horizontal" | "none" | "vertical"',complexType:{original:"'none' | 'both' | 'horizontal' | 'vertical'",resolved:'"both" | "horizontal" | "none" | "vertical"',references:{}},mutable:!1,attr:"resizable",reflectToAttr:!1,docs:"Define if input is resizable",docsTags:[],default:"'none'",values:[{value:"both",type:"string"},{value:"horizontal",type:"string"},{value:"none",type:"string"},{value:"vertical",type:"string"}],optional:!1,required:!1},{name:"rows",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"rows",reflectToAttr:!1,docs:"Define the number of visible text lines for the control",docsTags:[],default:"3",values:[{type:"number"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputTextarea['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputTextarea:{location:"global",id:"global::MgInputTextarea"}},return:"Promise<void>"},signature:"setError(valid: MgInputTextarea['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputTextareaElement['valid']",resolved:"boolean",references:{HTMLMgInputTextareaElement:{location:"global",id:"global::HTMLMgInputTextareaElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgInputTextareaElement['value']",resolved:"string",references:{HTMLMgInputTextareaElement:{location:"global",id:"global::HTMLMgInputTextareaElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-character-left","mg-tooltip","mg-icon","mg-input-title"],dependencyGraph:{"mg-input-textarea":["mg-character-left","mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/atoms/mg-input-title/mg-input-title.tsx",encapsulation:"scoped",tag:"mg-input-title",readme:`## Design

### Label

The label can be on more than one line.

### Styles

![](./doc/img/mg-input-title.png)
`,docs:"",docsTags:[],usage:{},props:[{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Label input id",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"isLegend",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"is-legend",reflectToAttr:!1,docs:"Switch from label to fieldset sementic",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"If input is required an asterisk is added at the end of the label",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"If input is required an asterisk is added at the end of the label",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-input-checkbox","mg-input-date","mg-input-numeric","mg-input-password","mg-input-radio","mg-input-select","mg-input-text","mg-input-textarea","mg-input-toggle"],dependencies:[],dependencyGraph:{"mg-input-checkbox":["mg-input-title"],"mg-input-date":["mg-input-title"],"mg-input-numeric":["mg-input-title"],"mg-input-password":["mg-input-title"],"mg-input-radio":["mg-input-title"],"mg-input-select":["mg-input-title"],"mg-input-text":["mg-input-title"],"mg-input-textarea":["mg-input-title"],"mg-input-toggle":["mg-input-title"]}},{filePath:"src/components/molecules/inputs/mg-input-toggle/mg-input-toggle.tsx",encapsulation:"shadow",tag:"mg-input-toggle",readme:`## Usage

Clicking anywhere on the entire component area toggles the selected value.

The first value is always selected by default.

When the "on/off" property is used, the first value is always the disabled value and the style is adjusted.

The values must be transcribed by texts or icons.

### Types

![](./doc/img/mg-input-toggle-use.png)

### Specs

![](./doc/img/mg-input-toggle-specs.png)

### Readonly

![](./doc/img/mg-input-toggle-readonly.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-input-toggle-border-radius-ratio\`: Define input border radius ration, default: \`2\`
`,docs:`Clicking anywhere on the entire component area toggles the selected value.

The first value is always selected by default.

When the "on/off" property is used, the first value is always the disabled value and the style is adjusted.

The values must be transcribed by texts or icons.`,docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"isIcon",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"is-icon",reflectToAttr:!1,docs:"Define if toggle display icon",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"isOnOff",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"is-on-off",reflectToAttr:!1,docs:"Define if toggle have on/off style",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"items",type:"ToggleValue[] | string[]",complexType:{original:"string[] | ToggleValue[]",resolved:"ToggleValue[] | string[]",references:{ToggleValue:{location:"import",path:"./mg-input-toggle.conf",id:"src/components/molecules/inputs/mg-input-toggle/mg-input-toggle.conf.ts::ToggleValue"}}},mutable:!1,reflectToAttr:!1,docs:"Items are the possible options to select",docsTags:[],values:[{type:"ToggleValue[]"},{type:"string[]"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../MgInput.conf",id:"src/components/molecules/inputs/MgInput.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"value",type:"any",complexType:{original:"any",resolved:"any",references:{}},mutable:!0,attr:"value",reflectToAttr:!1,docs:"Component value",docsTags:[],values:[{type:"any"}],optional:!1,required:!1}],methods:[{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: boolean, errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"setError(valid: boolean, errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"any",bubbles:!0,complexType:{original:"HTMLMgInputToggleElement['value']",resolved:"any",references:{HTMLMgInputToggleElement:{location:"global",id:"global::HTMLMgInputToggleElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-tooltip","mg-icon","mg-input-title"],dependencyGraph:{"mg-input-toggle":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/mg-item-more/mg-item-more.tsx",encapsulation:"shadow",tag:"mg-item-more",readme:`# mg-item-more
`,docs:"",docsTags:[],usage:{},props:[{name:"icon",type:"{ icon: string; }",complexType:{original:"IconType",resolved:"{ icon: string; }",references:{IconType:{location:"import",path:"./mg-item-more.conf",id:"src/components/molecules/mg-item-more/mg-item-more.conf.ts::IconType"}}},mutable:!1,reflectToAttr:!1,docs:"Define icon",docsTags:[],default:"{ icon: 'ellipsis-vertical' }",values:[{type:"{ icon: string; }"}],optional:!1,required:!1},{name:"size",type:'"large" | "medium" | "regular"',complexType:{original:"SizeType",resolved:'"large" | "medium" | "regular"',references:{SizeType:{location:"import",path:"./mg-item-more.conf",id:"src/components/molecules/mg-item-more/mg-item-more.conf.ts::SizeType"}}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define component child menu size.",docsTags:[],values:[{value:"large",type:"string"},{value:"medium",type:"string"},{value:"regular",type:"string"}],optional:!1,required:!1},{name:"slotlabel",type:"{ label?: string; display?: boolean; }",complexType:{original:"SlotLabelType",resolved:"{ label?: string; display?: boolean; }",references:{SlotLabelType:{location:"import",path:"./mg-item-more.conf",id:"src/components/molecules/mg-item-more/mg-item-more.conf.ts::SlotLabelType"}}},mutable:!1,reflectToAttr:!1,docs:"Define slot label element",docsTags:[],default:"{ display: false }",values:[{type:"{ label?: string; display?: boolean; }"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-menu-item","mg-icon","mg-menu"],dependencyGraph:{"mg-item-more":["mg-menu-item","mg-icon","mg-menu"],"mg-menu-item":["mg-badge","mg-icon","mg-popover"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"]}},{filePath:"src/components/molecules/mg-loader/mg-loader.tsx",encapsulation:"shadow",tag:"mg-loader",readme:`## Behavior

![](./doc/img/mg-loader-anatomy.png)

The default loader message is "Loading in progress..." and can be overridden with the \`message\` prop.

The loader message can be hidden using the \`messageHide\` prop.
`,docs:'![](./doc/img/mg-loader-anatomy.png)\n\nThe default loader message is "Loading in progress..." and can be overridden with the `message` prop.\n\nThe loader message can be hidden using the `messageHide` prop.',docsTags:[],usage:{},props:[{name:"message",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"message",reflectToAttr:!1,docs:"Override loader message",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"messageHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"message-hide",reflectToAttr:!1,docs:"Hide message",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-icon"],dependencyGraph:{"mg-loader":["mg-icon"]}},{filePath:"src/components/molecules/menu/mg-menu/mg-menu.tsx",encapsulation:"shadow",tag:"mg-menu",readme:`## Horizontal

### Use

![](./doc/img/mg-menu-horizontal-exemple.png)

Horizontal menu is used with large ("desktop") resolutions, it is placed in the upper area of the screen.

### Anatomy

![](./doc/img/mg-menu-horizontal-anatomy.png)

![](./doc/img/mg-menu-horizontal-item-anatomy.png)

### Behavior

#### Sizing

![](./doc/img/mg-menu-horizontal-sizing.png)

A horizontal menu can display different item sizes: regular, medium, large.

![](./doc/img/mg-menu-horizontal-sizing-itemmaxwidth.png)

The content of the element determines its width, but to handle the case where the content is too large (long label), it is possible to specify a maximum width for the element._Label_ and _Meta_ are then truncated.

#### Sub-content

![](./doc/img/mg-menu-horizontal-subcontent-submenu.png)

![](./doc/img/mg-menu-horizontal-subcontent-slot.png)

A "submenu" or a "free content" can be set to the item.
An icon "chevron-down" at the right of the item informs the user.

##### Badge

![](./doc/img/mg-menu-horizontal-subcontent-badge.png)

If at least one sub-item has a badge, the item displays a badge with an exclamation symbol.

#### Overflow

![](./doc/img/mg-menu-horizontal-plus.png)

When not all items can be displayed due to the width of the menu container, the items are grouped into a "plus item".

## Vertical

### Use

![](./doc/img/mg-menu-vertical-use.png)

The horizontal menu is used with large resolutions ("desktop"), it is mainly placed in the left area of the screen.

### Anatomy

![](./doc/img/mg-menu-vertical-anatomy.png)

![](./doc/img/mg-menu-vertical-item-anatomy.png)

### Behavior

#### Sub content

An item can display a sub content which can be another vertical menu.
This item displays a chevron to its right.
The submenu is displayed by clicking on the item.

##### Badge

![](./doc/img/mg-menu-vertical-subcontent-badge.png)

If at least one sub-item has a badge, the item displays a badge with an exclamation symbol.

#### Overflow

![](./doc/img/mg-menu-vertical-scroll.png)

When not all items can be displayed due to the height of the menu container, a scroll bar helps to see hidden items.

**🔺child mg-menu-item slots image / information**

With a mg-badge/mg-tag/mg-icon, **you must set the component using HTML attributes** instead, because the behavior uses the [cloneNode](https://developer.mozilla.org/fr/docs/Web/API/Node/cloneNode) method which breaks properties.

## CSS Variables

### global

- \`--mg-menu-background-color-hsl\`: define mg-menu background color. Default: \`--color-light\`.
`,docs:"",docsTags:[],usage:{},props:[{name:"direction",type:"Direction.HORIZONTAL | Direction.VERTICAL",complexType:{original:"Direction",resolved:"Direction.HORIZONTAL | Direction.VERTICAL",references:{Direction:{location:"import",path:"./mg-menu.conf",id:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::Direction"}}},mutable:!1,attr:"direction",reflectToAttr:!0,docs:"Component display direction.",docsTags:[],default:"Direction.HORIZONTAL",values:[{type:"Direction.HORIZONTAL"},{type:"Direction.VERTICAL"}],optional:!1,required:!1},{name:"itemmore",type:'{ size: "regular" | "medium" | "large"; icon: IconType; slotlabel: SlotLabelType; }',complexType:{original:"ItemMoreType",resolved:'{ size: "regular" | "medium" | "large"; icon: IconType; slotlabel: SlotLabelType; }',references:{ItemMoreType:{location:"import",path:"./mg-menu.conf",id:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::ItemMoreType"}}},mutable:!1,reflectToAttr:!1,docs:`Customize "mg-item-more" element
Used with direction: 'vertical' to manage overflow`,docsTags:[],values:[{type:'{ size: "regular"'},{value:"medium",type:"string"},{type:'"large"; icon: IconType; slotlabel: SlotLabelType; }'}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:`Menu label. Include short menu description.
Required for accessibility`,docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"size",type:'"large" | "medium" | "regular"',complexType:{original:"MenuSizeType",resolved:'"large" | "medium" | "regular"',references:{MenuSizeType:{location:"import",path:"./mg-menu.conf",id:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::MenuSizeType"}}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define mg-menu size",docsTags:[],default:"'regular'",values:[{value:"large",type:"string"},{value:"medium",type:"string"},{value:"regular",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-action-more","mg-item-more"],dependencies:[],dependencyGraph:{"mg-action-more":["mg-menu"],"mg-item-more":["mg-menu"]}},{filePath:"src/components/molecules/menu/mg-menu-item/mg-menu-item.tsx",encapsulation:"shadow",tag:"mg-menu-item",readme:`## Use

Item menu is used with horizontal or vertical menus.

## Anatomy

![](./doc/img/mg-menu-item-anatomy.png)

An item must have a label.
An icon can be added before the text.
A badge can be added after the text.
When a submenu is available, a chevron is displayed (in horizontal and vertical menus) to indicate its presence.

## Specs

Item's display depends on the size of the menu (regular, medium, large) and its mode (horizontal, vertical).

### Spacing

![](./doc/img/mg-menu-item-spacing.png)

### Sizing

#### Horizontal menu

![](./doc/img/mg-menu-item-sizing-horizontal.png)

Width of the item depends on its content.

![](./doc/img/mg-menu-item-sizing-maxwidth.png)

If a max-width is set, the _label_ and the _meta_ use an ellipsis to truncate the content if necessary.

#### Vertical menu

![](./doc/img/mg-menu-item-sizing-vertical.png)

Width of the item is 100% width of the menu.

### Alignment

#### Horizontal and vertical menus

![](./doc/img/mg-menu-item-alignment.png)

All contents are aligned vertically.

#### Vertical menu

![](./doc/img/mg-menu-item-alignment-vertical.png)

All items are aligned to left.
The chevron is aligned to the right of the item.

### Styling

![](./doc/img/mg-menu-item-horizontal-menu-styling.png)

![](./doc/img/mg-menu-item-vertical-menu-styling.png)

Hover item: the background is colored
Active item: the font color changes, an active bar (3px) is displayed at the bottom of the item for horizontal, at the left of the item for vertical menus.

#### Colors

Standard color is @color-dark.
Active color is the color of the app.
Hover color is the color of the app with an opacity set to 10%.
Disabled item's opacity is set to 40%.

#### Fonts

Family: Open Sans
Regular size: 13px
Medium/Large size: 15px

#### Icons

Regular/Medium/Large menus: regular size

## Behavior

### Click

Click on an item of the menu can:

- redirect to a url
- display child content (see below)

If child content is available, an icon "chevron-down" is displayed at the right of the item.
When opening the child content, the chevron makes a 180° rotation.
When closing the child content, the chevron returns to position 0°.

## Child content

### Horizontal and vertical menus

Child content is displayed

- by clicking on the item
- by pressing the space or enter key

It is closed

- by clicking on the item
- by pressing the space or enter key
- by clicking outside of the child content if the menu is horizontal

The child content can be:

- another horizontal or vertical menu with sub items
- a slot for HTML content

#### In an horizontal menu

![](./doc/img/mg-menu-submenu-alignment.png)

Child content is displayed in a floating component over the content (like a popover).
It is aligned to the left bottom of the item, excepted for the last item of the menu which is aligned to the right bottom.

If the floating component is higher than the screen size, there is no overflow, user has to scroll the page.

![](./doc/img/mg-menu-item-child-styling.png)

The floating component has a _@color-light_ background and a _@shadow_.

![](./doc/img/mg-menu-item-child-menu-spacing.png)

If the floating component displays a submenu, there are top and bottom spacing of 10px.

![](./doc/img/mg-menu-item-child-slot-spacing.png)

If the floating component displays a slot, there is no spacing.

![](./doc/img/mg-menu-submenu-slot.png)

The minimal width of the submenu is the item's width.
Width of the submenu is determined by the width of the largest item or the content of the slot.

#### In a vertical menu

![](./doc/img/mg-menu-submenu-vertical-menu.png)

Menu is displayed under the item, with the same width. **(i) Vertical menu is recommended if you display a submenu.**
Idem for the slot.
There is no space to display child content.
Items below are pushed to bottom.

##### Spacing

Sub-items add to their left spacing the spacing between left border and content of their parent's item.

## Slots

### Image

Recommanded element is an icon or a SVG.

### Information

Recommanded element is a mg-badge. Use it when you need to notify new events in this section.

## CSS Variables

### global

- \`--mg-menu-item-focused-background-color-hsl\`: define mg-menu-item focused background color. default: \`--mg-color-app-hsl\`.
- \`--mg-menu-item-border-color-active-hsl\`: define mg-menu-item border color. default: \`--mg-color-app-hsl\`.
- \`--mg-menu-item-color-hsl\`: define mg-menu-item font color. default: \`--mg-color-dark\`.
- \`--mg-menu-item-color-active-hsl\`: define mg-menu-item font color active. default: \`--mg-color-app-hsl\`.
- \`--mg-menu-item-navigation-button-column-gap\`: define mg-menu-item button column gap. default: \`unset\`.

### navigation-button

- \`--mg-menu-item-navigation-button-max-width\`: define mg-menu-item button max-width. Useful to apply \`text-overflow: ellipsis;\` on \`mg-menu-item__navigation-button-text\` element. default: \`unset\`.
`,docs:"Item menu is used with horizontal or vertical menus.",docsTags:[],usage:{},props:[{name:"expanded",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"expanded",reflectToAttr:!1,docs:"Define menu-item content expanded.",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"href",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"href",reflectToAttr:!1,docs:`Define menu-item href
when defined menu-item contain an anchor instead of button`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used to control mg-popover",docsTags:[],default:"createID('mg-menu-item')",values:[{type:"string"}],optional:!1,required:!1},{name:"status",type:"Status.ACTIVE | Status.DISABLED | Status.HIDDEN | Status.VISIBLE",complexType:{original:"Status",resolved:"Status.ACTIVE | Status.DISABLED | Status.HIDDEN | Status.VISIBLE",references:{Status:{location:"import",path:"./mg-menu-item.conf",id:"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts::Status"}}},mutable:!0,attr:"status",reflectToAttr:!0,docs:"Define menu-item status.",docsTags:[],default:"Status.VISIBLE",values:[{type:"Status.ACTIVE"},{type:"Status.DISABLED"},{type:"Status.HIDDEN"},{type:"Status.VISIBLE"}],optional:!1,required:!1}],methods:[],events:[{event:"item-loaded",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emited event when item is loaded",docsTags:[]},{event:"status-change",detail:"Status.ACTIVE | Status.DISABLED | Status.HIDDEN | Status.VISIBLE",bubbles:!0,complexType:{original:"HTMLMgMenuItemElement['status']",resolved:"Status.ACTIVE | Status.DISABLED | Status.HIDDEN | Status.VISIBLE",references:{HTMLMgMenuItemElement:{location:"global",id:"global::HTMLMgMenuItemElement"}}},cancelable:!0,composed:!0,docs:"Emited event when status change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-action-more","mg-item-more"],dependencies:["mg-badge","mg-icon","mg-popover"],dependencyGraph:{"mg-menu-item":["mg-badge","mg-icon","mg-popover"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-action-more":["mg-menu-item"],"mg-item-more":["mg-menu-item"]}},{filePath:"src/components/molecules/mg-message/mg-message.tsx",encapsulation:"shadow",tag:"mg-message",readme:`## Usage

### Types

The element can be of four different types depending on the message to be indicated:

- validation (green)
- information (blue)
- warning (orange)
- error (red)

When a trigger (button...) is set up, it can trigger the display of a message. By default, the execution of the trigger erases the previous messages in the screen of the same type.

## Specs

![](./doc/img/mg-message-specs.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-message-border-radius\`: Define message border radius, default: \`0.3rem\`

Please note that the mg-message component uses the [mg-card](./?path=/docs/atoms-mg-card--mg-card) component. This means that you can benefit from the CSS variables of [mg-card](./?path=/docs/atoms-mg-card--mg-card) to customize mg-message. You can easily change padding, border-radius, etc. Use this feature to seamlessly adapt mg-message to your design.
`,docs:"",docsTags:[],usage:{},props:[{name:"closeButton",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"close-button",reflectToAttr:!1,docs:`Define if message has a cross button
RG 01: https://jira.mgdis.fr/browse/PDA9-140`,docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"delay",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"delay",reflectToAttr:!1,docs:`Add a delay to hide/close message when it passed
Value is defined in seconds and must greater than 2 seconds (PDA9-314 RG-06)`,docsTags:[],values:[{type:"number"}],optional:!1,required:!1},{name:"hide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"hide",reflectToAttr:!1,docs:"Define if message is hidden",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-message')",values:[{type:"string"}],optional:!1,required:!1},{name:"noAriaRole",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"no-aria-role",reflectToAttr:!1,docs:"Define if aria role is unset\nFor a11y reasons, `<mg-message />` was design for `alert` needs with attached semantic role: `status`, `alert`.\nBy toggle this props to `true`, you can unset the role to benefit from the template without any semantic role.\nBe careful to set the mode according to the context needs.",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"variant",type:'"danger" | "info" | "success" | "warning"',complexType:{original:"VariantType",resolved:'"danger" | "info" | "success" | "warning"',references:{VariantType:{location:"import",path:"./mg-message.conf",id:"src/components/molecules/mg-message/mg-message.conf.ts::VariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Message variant",docsTags:[],default:"variants[0]",values:[{value:"danger",type:"string"},{value:"info",type:"string"},{value:"success",type:"string"},{value:"warning",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"component-hide",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emited event when message is hidden",docsTags:[]},{event:"component-show",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emited event when message is diplayed",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-card","mg-icon","mg-button"],dependencyGraph:{"mg-message":["mg-card","mg-icon","mg-button"],"mg-button":["mg-icon"]}},{filePath:"src/components/molecules/mg-modal/mg-modal.tsx",encapsulation:"shadow",tag:"mg-modal",readme:`## Anatomy

A modal has:

- a closing cross at the top right corner
- a title
- a body composed of fields or a message
- a validation button
- a cancel button

## Behavior

When clicking on the cross, the cancel button or the \`<Escape>\` key is pressed the modal closes and no processing is done.

When the validation button is clicked, processing is performed and the modal closes.

As long as the user does not press one of these three buttons, the modal does not close.

The modal allows focusing the attention on what it is asking: a confirmation or a cancellation.  
In this sense the rest of the screen should not be accessible:

- it is hidden by a backdrop
- clicking on the backdrop does not close the modal

The title of the modal has a written name.
Ex: Add value

The wording of the validation button is the infinitive verb of the current action.  
Avoid the verb "Validate" if a more explicit one is possible.  
Ex: "Add" for adding a value, "Delete" to delete a value, "Modify" to modify a value.

### Icon or not icon on the action buttons ?

In the case of a targeted action, the icon can help to understand or even reassure > check icon that validates the action.

In the case of a confirmation/cancellation choice: not necessary or even superfluous > the term "Save/Cancel" is enough.

Ex: if I put a check in front of the term "Delete" which is the validation button of a deletion, the check refers to positive while the action of deletion is negative, and the Cancel button also, so not to add to the confusion, do not put an icon...

## Specs

### Shapes

![](./doc/img/mg-modal-shapes.png)

### Fonts

![](./doc/img/mg-modal-fonts.png)

### Spacing

#### Spacing between edges and content

![](./doc/img/mg-modal-spaces-borders.png)

#### Spacing between title, text and buttons

![](./doc/img/mg-modal-spaces-slot.png)
![](./doc/img/mg-modal-spaces-slot-title.png)

#### Spacing between the title and the cross button

![](./doc/img/mg-modal-spaces-title.png)
![](./doc/img/mg-modal-spaces-title-multiline.png)

### Alignments

![](./doc/img/mg-modal-alignments.png)

### Sizes

![](./doc/img/mg-modal-sizes.png)

### Colors

![](./doc/img/mg-modal-colors.png)

### Backdrop

Color: [@color-light](./?path=/docs/style-colors--docs) with an opacity set to 85%.

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-modal-border-radius\`: Define border radius modal, default: \`0.5rem\`
- \`--mg-modal-title-font-size\`: Define modal title font size, default: \`1.8rem\`
- \`--mg-modal-content-font-size\`: Define modall content font size, default: \`1.2rem\`

Please note that the mg-modal component uses the [mg-card](./?path=/docs/atoms-mg-card--mg-card) component. This means that you can benefit from the CSS variables of [mg-card](./?path=/docs/atoms-mg-card--mg-card) to customize mg-modal. You can easily change padding, border-radius, etc. Use this feature to seamlessly adapt mg-modal to your design.
`,docs:`A modal has:

- a closing cross at the top right corner
- a title
- a body composed of fields or a message
- a validation button
- a cancel button`,docsTags:[],usage:{},props:[{name:"closeButton",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"close-button",reflectToAttr:!1,docs:"Define if modal has a cross button",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"dialogRole",type:'"alertdialog" | "dialog"',complexType:{original:"DialogRoleType",resolved:'"alertdialog" | "dialog"',references:{DialogRoleType:{location:"import",path:"./mg-modal.conf",id:"src/components/molecules/mg-modal/mg-modal.conf.ts::DialogRoleType"}}},mutable:!1,attr:"dialog-role",reflectToAttr:!1,docs:"Modal dialog role.",docsTags:[],default:"dialogRoles[0]",values:[{value:"alertdialog",type:"string"},{value:"dialog",type:"string"}],optional:!1,required:!1},{name:"hide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"hide",reflectToAttr:!1,docs:"Define if modal is hidden",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-modal')",values:[{type:"string"}],optional:!1,required:!1},{name:"modalTitle",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"modal-title",reflectToAttr:!1,docs:"Displayed modal title",docsTags:[],values:[{type:"string"}],optional:!1,required:!0}],methods:[],events:[{event:"component-hide",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emmited event when modal is hidden",docsTags:[]},{event:"component-show",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emmited event when modal is diplayed",docsTags:[]}],listeners:[{event:"keydown",target:"window",capture:!1,passive:!1}],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-card","mg-button","mg-icon"],dependencyGraph:{"mg-modal":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"]}},{filePath:"src/components/molecules/mg-pagination/mg-pagination.tsx",encapsulation:"shadow",tag:"mg-pagination",readme:`## Anatomy

![](./doc/img/mg-pagination-nav-anatomy.png)

## Specs

![](./doc/img/mg-pagination-nav-specs.png)

It's possible to hide the labels "prev" and "next" to show only the "chevron" icons

![](./doc/img/mg-pagination-nav-label-hide.png)

It's possible to hide the page count to show only the "chevron" icons

![](./doc/img/mg-pagination-nav-select-hide.png)

## When to use it ?

A pagination component should be displayed only when it is useful, for example:

When the number of pages is greater than 1.
When there are elements to be displayed.
`,docs:"![](./doc/img/mg-pagination-nav-anatomy.png)",docsTags:[],usage:{},props:[{name:"currentPage",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!0,attr:"current-page",reflectToAttr:!0,docs:"Component current page",docsTags:[],default:"1",values:[{type:"number"}],optional:!1,required:!1},{name:"hideNavigationLabels",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"hide-navigation-labels",reflectToAttr:!1,docs:"Hide navigation label",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"hidePageCount",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"hide-page-count",reflectToAttr:!1,docs:"Hide select input",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-pagination')",values:[{type:"string"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"label",reflectToAttr:!1,docs:`Panignation label. Is a short description.
Customize default value can be usefull to improve accessibility`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"totalPages",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"total-pages",reflectToAttr:!1,docs:"Component total pages",docsTags:[],default:"1",values:[{type:"number"}],optional:!1,required:!1}],methods:[],events:[{event:"current-page-change",detail:"number",bubbles:!0,complexType:{original:"number",resolved:"number",references:{}},cancelable:!0,composed:!0,docs:"Emmited event when current page change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-input-checkbox-paginated"],dependencies:["mg-button","mg-icon","mg-input-select"],dependencyGraph:{"mg-pagination":["mg-button","mg-icon","mg-input-select"],"mg-button":["mg-icon"],"mg-input-select":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-input-checkbox-paginated":["mg-pagination"]}},{filePath:"src/components/molecules/mg-panel/mg-panel.tsx",encapsulation:"shadow",tag:"mg-panel",readme:`## Behavior

The left zone of the header displays the item label, this zone is clickable and allows the user to unfold/fold the panel.
If no content is available, the panel cannot be unfolded.
When the panel is unfolded, the icon is vertically inverted.

The right area of the header can accommodate any component.

## Anatomy

![](./doc/img/mg-panel-anatomy.png)

## Specs

### Sizing

![](./doc/img/mg-panel-sizing.png)

### Spacing

![](./doc/img/mg-panel-spacing.png)

Slot content padding can be customized using the --mg-panel-content-padding CSS variable, default is 15px.

### Alignments

![](./doc/img/mg-panel-align.png)

### Styles

![](./doc/img/mg-panel-style.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-panel-border-radius\`: Define panel border radius, default: \`0.5rem\`
- \`--mg-panel-background\`: Define panel background, default: \`var(--color-info-h) var(--color-info-s) calc(var(--color-info-l) + 68%)\`
- \`--mg-panel-box-shadow\`: Define panel box shadow, default: \`var(--box-shadow)\`
- \`--mg-panel-content-padding\`: Define panel content padding, default: \`1.5rem\`

Please note that the mg-panel component uses the [mg-card](./?path=/docs/atoms-mg-card--mg-card) component. This means that you can benefit from the CSS variables of [mg-card](./?path=/docs/atoms-mg-card--mg-card) to customize mg-panel. You can easily change padding, border-radius, etc. Use this feature to seamlessly adapt mg-panel to your design.
`,docs:`The left zone of the header displays the item label, this zone is clickable and allows the user to unfold/fold the panel.
If no content is available, the panel cannot be unfolded.
When the panel is unfolded, the icon is vertically inverted.

The right area of the header can accommodate any component.`,docsTags:[],usage:{},props:[{name:"expandToggleDisabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"expand-toggle-disabled",reflectToAttr:!1,docs:"Disable possibility to toggle expand",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"expandToggleDisplay",type:'"icon" | "text"',complexType:{original:"ExpandToggleDisplayType",resolved:'"icon" | "text"',references:{ExpandToggleDisplayType:{location:"import",path:"./mg-panel.conf",id:"src/components/molecules/mg-panel/mg-panel.conf.ts::ExpandToggleDisplayType"}}},mutable:!1,attr:"expand-toggle-display",reflectToAttr:!1,docs:"Define expand toggle button display",docsTags:[],default:"expandToggleDisplays[0]",values:[{value:"icon",type:"string"},{value:"text",type:"string"}],optional:!1,required:!1},{name:"expanded",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"expanded",reflectToAttr:!1,docs:"Panel is opened",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-panel')",values:[{type:"string"}],optional:!1,required:!1},{name:"panelTitle",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"panel-title",reflectToAttr:!1,docs:"Panel title",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"titleEditable",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"title-editable",reflectToAttr:!1,docs:"Define if panel title is editable",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"titlePattern",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"title-pattern",reflectToAttr:!1,docs:"Panel title pattern",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"titlePatternErrorMessage",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"title-pattern-error-message",reflectToAttr:!1,docs:"Panel title pattern error message",docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"titlePosition",type:'"left" | "right"',complexType:{original:"TitlePositionType",resolved:'"left" | "right"',references:{TitlePositionType:{location:"import",path:"./mg-panel.conf",id:"src/components/molecules/mg-panel/mg-panel.conf.ts::TitlePositionType"}}},mutable:!1,attr:"title-position",reflectToAttr:!1,docs:"Define title position",docsTags:[],default:"titlePositions[0]",values:[{value:"left",type:"string"},{value:"right",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"expanded-change",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgPanelElement['expanded']",resolved:"boolean",references:{HTMLMgPanelElement:{location:"global",id:"global::HTMLMgPanelElement"}}},cancelable:!0,composed:!0,docs:"Emmited event when expanded change",docsTags:[]},{event:"title-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgPanelElement['panelTitle']",resolved:"string",references:{HTMLMgPanelElement:{location:"global",id:"global::HTMLMgPanelElement"}}},cancelable:!0,composed:!0,docs:"Emmited event when title change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-button","mg-icon","mg-input-text","mg-card"],dependencyGraph:{"mg-panel":["mg-button","mg-icon","mg-input-text","mg-card"],"mg-button":["mg-icon"],"mg-input-text":["mg-icon","mg-character-left","mg-tooltip","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/mg-popover/mg-popover.tsx",encapsulation:"shadow",tag:"mg-popover",readme:`## Usage

A popover is more enhanced than a tooltip but less blocking than a modal.

## Behavior

The window is displayed when clicking on its trigger.

The window is displayed next to its trigger, usually below it. A triangle (in css) makes the link between the trigger and the window.

The window closes:

- when clicking on its trigger
- clicking outside the window
- when the ESC key is pressed
- when clicking on the close button at the top right corner

The size of the window is determined by the content (set a maximum size to avoid problems).

The title and the close button are optional.

## Specs

### Fonts

![](./doc/img/mg-popover-fonts.png)

### Spacing

![](./doc/img/mg-popover-spacing.png)

### Sizing

![](./doc/img/mg-popover-sizing.png)

Default max-width: 400px
The value of the max-width can be modified according to the case via the CSS variable.

### Alignments

![](./doc/img/mg-popover-align.png)

### Positioning

#### Item

![](./doc/img/mg-popover-position.png)

#### Screen

![](./doc/img/mg-popover-position-screen.png)

### Style

![](./doc/img/mg-popover-style.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-popover-background-color\`: Define popover background color, default: \`var(--color-light)\`
- \`--mg-popover-font-color\`: Define popover font color, default: \`var(--color-font-dark)\`
- \`--mg-popover-title-font-size\`: Define popover title font size, default: \`1.4rem\`
- \`--mg-popover-padding-vertical\`: Define popover vertical padding, default: \`1.5rem\`
- \`--mg-popover-padding-horizontal\`: Define popover horizontal padding, default: \`--mg-popover-padding-vertical\`
- \`--mg-popover-max-width\`: Define the popover max-width. Default: \`40rem\`;
- \`--mg-popover-min-width\`: Define the popover min-width. Default: \`unset\`;

Please note that the mg-popover component uses the [mg-card](./?path=/docs/atoms-mg-card--mg-card) component. This means that you can benefit from the CSS variables of [mg-card](./?path=/docs/atoms-mg-card--mg-card) to customize mg-popover. You can easily change padding, border-radius, etc. Use this feature to seamlessly adapt mg-popover to your design.
`,docs:"A popover is more enhanced than a tooltip but less blocking than a modal.",docsTags:[],usage:{},props:[{name:"arrowHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"arrow-hide",reflectToAttr:!1,docs:"Hide popover arrow",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"closeButton",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"close-button",reflectToAttr:!1,docs:"Define if popover has a cross button",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Disable popover",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"display",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"display",reflectToAttr:!1,docs:"Display popover",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Sets an `id` attribute.\nNeeded by the input for accessibility `aria-decribedby`.",docsTags:[],default:"createID('mg-popover')",values:[{type:"string"}],optional:!1,required:!1},{name:"placement",type:'"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"',complexType:{original:"Placement",resolved:'"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"',references:{Placement:{location:"import",path:"@popperjs/core",id:"../../node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/index.d.ts::Placement"}}},mutable:!1,attr:"placement",reflectToAttr:!1,docs:"Popover placement",docsTags:[],default:"'bottom'",values:[{value:"auto",type:"string"},{value:"auto-end",type:"string"},{value:"auto-start",type:"string"},{value:"bottom",type:"string"},{value:"bottom-end",type:"string"},{value:"bottom-start",type:"string"},{value:"left",type:"string"},{value:"left-end",type:"string"},{value:"left-start",type:"string"},{value:"right",type:"string"},{value:"right-end",type:"string"},{value:"right-start",type:"string"},{value:"top",type:"string"},{value:"top-end",type:"string"},{value:"top-start",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"display-change",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgPopoverElement['display']",resolved:"boolean",references:{HTMLMgPopoverElement:{location:"global",id:"global::HTMLMgPopoverElement"}}},cancelable:!0,composed:!0,docs:"Emited event when display value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-action-more","mg-input-checkbox","mg-menu-item"],dependencies:["mg-popover-content"],dependencyGraph:{"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-action-more":["mg-popover"],"mg-input-checkbox":["mg-popover"],"mg-menu-item":["mg-popover"]}},{filePath:"src/components/molecules/mg-popover/mg-popover-content/mg-popover-content.tsx",encapsulation:"shadow",tag:"mg-popover-content",readme:"# mg-popover-content\n\nIn order to adhere to the ARIA popover pattern, which is essential for accessibility, we need to retrieve the popover content from outside the `mg-popover` shadow root.\n\nThe `mg-popover-content` component is appended to the `mg-popover` component as a slot when the component is loaded. It receives the popover content as slots and manages the popover's style.\n",docs:"In order to adhere to the ARIA popover pattern, which is essential for accessibility, we need to retrieve the popover content from outside the `mg-popover` shadow root.\n\nThe `mg-popover-content` component is appended to the `mg-popover` component as a slot when the component is loaded. It receives the popover content as slots and manages the popover's style.",docsTags:[],usage:{},props:[{name:"closeButton",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"close-button",reflectToAttr:!1,docs:"Define if popover has a cross button",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1}],methods:[],events:[{event:"hide-content",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emited event when close button is clicked",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-popover"],dependencies:["mg-card","mg-button","mg-icon"],dependencyGraph:{"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-popover":["mg-popover-content"]}},{filePath:"src/components/molecules/mg-skip-links/mg-skip-links.tsx",encapsulation:"shadow",tag:"mg-skip-links",readme:`## Behavior

On the first tab, a banner with the link(s) is displayed by pushing the content down.

The number of links will be added according to the content of the page.

## Specs

### Sizing

The minimum height of the banner is 55px.

### Spacing

Items have an internal margin of 12px and are spaced 6px apart.

### Styling

- The links are in [@color-dark](./?path=/docs/style-colors--docs).
- The background of the banner is in [@color-light](./?path=/docs/style-colors--docs).

#### On hover

The background of the item takes the color [@color-dark](./?path=/docs/style-colors--docs) at 10% opacity.

#### Focus taking

Native browser behavior is retained.

## Code example

You need to press <kbd>Tab</kbd> in the code example to see the component.

## Integration

The \`mg-skip-links\` must be integrated at the very top of your page to be the first focusable element.

## Implementation with a "#" based router

\`mg-skip-links\` uses native anchor behavior, but if your site/app uses a "#" link-based router, like AngularJS does, you'll need to use the "go-to-anchor" component event. This event returns its detail property to the target anchor, then you can apply the scrollTo anchor behavior:

- if the anchor is in the same window, with native javascript:

\`\`\`js
const goToAnchor = (anchor) => {
    const top = document.querySelector(anchor).offsetTop;
    window.scrollTo(0, top);

    // set focus on next element to put keyboard navigation at the right place
    anchor.focus();
}

// optionaly you can use a timeout to wait document ready
setTimeout(()=> {
    // you must add listener on skip links element to prevent redirection
    Array.from(document.querySelector('mg-skip-links').shadowRoot.querySelectorAll('a')).forEach(anchor => {
        anchor.addEventListener('click', event => {
            event.preventDefault();
        })
    })​
})
\`\`\`

- in case the anchor is in another window, with the [iframeRisizer's moveToAnchor method](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/methods.md#movetoanchoranchor)
`,docs:`On the first tab, a banner with the link(s) is displayed by pushing the content down.

The number of links will be added according to the content of the page.`,docsTags:[],usage:{},props:[{name:"links",type:"SkipLink[]",complexType:{original:"SkipLink[]",resolved:"SkipLink[]",references:{SkipLink:{location:"import",path:"./mg-skip-links.conf",id:"src/components/molecules/mg-skip-links/mg-skip-links.conf.tsx::SkipLink"}}},mutable:!1,reflectToAttr:!1,docs:"Skip links",docsTags:[],values:[{type:"SkipLink[]"}],optional:!1,required:!1}],methods:[],events:[{event:"go-to-anchor",detail:"string",bubbles:!0,complexType:{original:"string",resolved:"string",references:{}},cancelable:!0,composed:!0,docs:"Emited event when link is clicked",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:[],dependencyGraph:{}},{filePath:"src/components/molecules/mg-tabs/mg-tabs.tsx",encapsulation:"shadow",tag:"mg-tabs",readme:`## Anatomy

![](./doc/img/mg-tabs-anatomy.png)

## Specs

### Spacing

- Regular
  - X = 20px;
  - Y = 10px;
- Large
  - X = 30px;
  - Y = 15px;

![](./doc/img/mg-tabs-spacing.png)

- if only text, no extra spacing,
- if no badge: no extra spacing on the right
- if only icon: no extra spacing on the right

### Sizing

![](./doc/img/mg-tabs-sizing.png)

The header bottom border is 100% wide, 1px sizing and its color is @color-dark-soft. You can override it with [CSS variable](./?path=/docs/molecules-mg-tabs--docs#css-variables).

![](./doc/img/mg-tabs-header-border.png)

### States

![](./doc/img/mg-tabs-states.png)

### Responsive

#### Line breaks (current management)

![](./doc/img/mg-tabs-responsive.png)

## CSS variables

If needed some [variables](./?path=/story/css-variables--page) are available to customize the component:

- \`--mg-tabs-border-bottom\`: define tabs header border-bottom. Default: \`solid 0.1rem hsl(var(--mg-color-dark-soft-hsl))\`.
`,docs:"![](./doc/img/mg-tabs-anatomy.png)",docsTags:[],usage:{},props:[{name:"activeTab",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!0,attr:"active-tab",reflectToAttr:!0,docs:"Active tab number",docsTags:[],values:[{type:"number"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-tabs')",values:[{type:"string"}],optional:!1,required:!1},{name:"items",type:"TabItem[] | string[]",complexType:{original:"string[] | TabItem[]",resolved:"TabItem[] | string[]",references:{TabItem:{location:"import",path:"./mg-tabs.conf",id:"src/components/molecules/mg-tabs/mg-tabs.conf.ts::TabItem"}}},mutable:!1,reflectToAttr:!1,docs:"Tabs items",docsTags:[],values:[{type:"TabItem[]"},{type:"string[]"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:`Tabs label. Include short tabs description.
Required for accessibility`,docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"size",type:'"large" | "regular"',complexType:{original:"SizeType",resolved:'"large" | "regular"',references:{SizeType:{location:"import",path:"./mg-tabs.conf",id:"src/components/molecules/mg-tabs/mg-tabs.conf.ts::SizeType"}}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define tabs size",docsTags:[],default:"'regular'",values:[{value:"large",type:"string"},{value:"regular",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"active-tab-change",detail:"number",bubbles:!0,complexType:{original:"HTMLMgTabsElement['activeTab']",resolved:"number",references:{HTMLMgTabsElement:{location:"global",id:"global::HTMLMgTabsElement"}}},cancelable:!0,composed:!0,docs:"Emited event when active tab change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-icon","mg-badge"],dependencyGraph:{"mg-tabs":["mg-icon","mg-badge"]}},{filePath:"src/components/atoms/mg-tag/mg-tag.tsx",encapsulation:"shadow",tag:"mg-tag",readme:`## Specs

![](./doc/img/mg-tag-specs.png)

### Fill / Outline tags

#### Colors

![](./doc/img/mg-tag-colors.png)

Icons take the color of the label.

### Soft tags

#### Font

![](./doc/img/mg-tag-font.png)

They are not on SemiBold but **Regular**.

#### Colors

![](./doc/img/mg-tag-icons-colors.png)

1. Icons takes the color of the tag variant.
2. Labels are [**@color-dark**](./?path=/docs/style-colors--docs) for all.
3. Color background is **[**soft color**](./?path=/docs/style-colors--docs)** of the tag variant.

#### Rules

![](./doc/img/mg-tag-use.png)

For accessibility, soft variant tags cannot use an icon on its own.

## Theming

![](./doc/img/mg-tag-variants.png)

### With Icons

![](./doc/img/mg-tag-icons.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

### Global

- \`--mg-tag-height\`: Define tag min height, default: \`2.3rem\`
- \`--mg-tag-border-radius\`: Define tag border radius, default: \`0.5rem\`
- \`--mg-tag-font-size\`: Define tag font size, default: \`1.2rem\`

### Variant

Variants \`primary\`, \`secondary\`, \`success\`, \`warning\`, \`danger\`, \`info\` can be customized by changing the global [colors](./?path=/docs/style-colors--docs).
`,docs:"![](./doc/img/mg-tag-specs.png)",docsTags:[],usage:{},props:[{name:"outline",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"outline",reflectToAttr:!1,docs:"Define if tag is using outline style",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"soft",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"soft",reflectToAttr:!1,docs:"Define if tag is using soft style",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"variant",type:'"danger" | "info" | "primary" | "secondary" | "success" | "warning"',complexType:{original:"TagVariantType",resolved:'"danger" | "info" | "primary" | "secondary" | "success" | "warning"',references:{TagVariantType:{location:"import",path:"./mg-tag.conf",id:"src/components/atoms/mg-tag/mg-tag.conf.ts::TagVariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define tag variant",docsTags:[],default:"variants[0]",values:[{value:"danger",type:"string"},{value:"info",type:"string"},{value:"primary",type:"string"},{value:"secondary",type:"string"},{value:"success",type:"string"},{value:"warning",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:[],dependencyGraph:{}},{filePath:"src/components/atoms/mg-tooltip/mg-tooltip.tsx",encapsulation:"shadow",tag:"mg-tooltip",readme:`## Usage

Tooltips are messages that provide additional information about an element.
They are presented as a message that appears when an element is hovered over or when the keyboard is focused.
Tooltips are called "custom" when they are not built on the basis of the standard HTML code provided for these elements by the specification: the title attribute.
Our "custom tooltip" component is called "tooltip" here.

## Behavior

The tooltip must be displayed when the element that allows its display:

- Is hovered over by the mouse.
- Takes the keyboard focus.

The tooltip must be hidden when the element that allows its display:

- Is no longer hovered over by the mouse.
- Loses the keyboard focus.
- Pressing the Escape key must hide the tooltip.

The tooltip must remain displayed when its content is hovered over by the mouse.

The tooltip can be placed above, to the right, below or to the left of the element it describes.

By default, the message is displayed at the bottom of the element.

If the element is located at the edge of the screen, the tooltip is shifted to be always visible.

## Specs

### Shapes

![](./doc/img/mg-tooltip-shape.png)

### Fonts

![](./doc/img/mg-tooltip-font.png)

### Spacing

![](./doc/img/mg-tooltip-spaces.png)

### Alignments

![](./doc/img/mg-tooltip-alignments-text.png)

### Positioning

Triangle is always centered on the call component

![](./doc/img/mg-tooltip-positioning.png)
![](./doc/img/mg-tooltip-positioning2.png)

### Colors

![](./doc/img/mg-tooltip-colors.png)

### Sizes

![](./doc/img/mg-tooltip-sizing.png)

Component's max-width is 400px.

![](./doc/img/mg-tooltip-max-width.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-tooltip-border-radius\`: Define tooltip border radius, default: \`0.5rem\`
- \`--mg-tooltip-background-color\`: Define tooltip background color, default: \`--color-dark\`
- \`--mg-tooltip-font-color\`: Define tooltip font color, default: \`--color-font-light\`
`,docs:`Tooltips are messages that provide additional information about an element.
They are presented as a message that appears when an element is hovered over or when the keyboard is focused.
Tooltips are called "custom" when they are not built on the basis of the standard HTML code provided for these elements by the specification: the title attribute.
Our "custom tooltip" component is called "tooltip" here.`,docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Disable tooltip",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"display",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"display",reflectToAttr:!1,docs:"Display tooltip",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Sets an `id` attribute.\nNeeded by the input for accessibility `aria-decribedby`.",docsTags:[],default:"createID('mg-tooltip')",values:[{type:"string"}],optional:!1,required:!1},{name:"message",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"message",reflectToAttr:!1,docs:"Displayed message in the tooltip",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"placement",type:'"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"',complexType:{original:"Placement",resolved:'"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"',references:{Placement:{location:"import",path:"@popperjs/core",id:"../../node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/index.d.ts::Placement"}}},mutable:!1,attr:"placement",reflectToAttr:!1,docs:"Tooltip placement",docsTags:[],default:"'bottom'",values:[{value:"auto",type:"string"},{value:"auto-end",type:"string"},{value:"auto-start",type:"string"},{value:"bottom",type:"string"},{value:"bottom-end",type:"string"},{value:"bottom-start",type:"string"},{value:"left",type:"string"},{value:"left-end",type:"string"},{value:"left-start",type:"string"},{value:"right",type:"string"},{value:"right-end",type:"string"},{value:"right-start",type:"string"},{value:"top",type:"string"},{value:"top-end",type:"string"},{value:"top-start",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-input-checkbox","mg-input-checkbox-paginated","mg-input-date","mg-input-numeric","mg-input-password","mg-input-radio","mg-input-select","mg-input-text","mg-input-textarea","mg-input-toggle"],dependencies:["mg-tooltip-content"],dependencyGraph:{"mg-tooltip":["mg-tooltip-content"],"mg-input-checkbox":["mg-tooltip"],"mg-input-checkbox-paginated":["mg-tooltip"],"mg-input-date":["mg-tooltip"],"mg-input-numeric":["mg-tooltip"],"mg-input-password":["mg-tooltip"],"mg-input-radio":["mg-tooltip"],"mg-input-select":["mg-tooltip"],"mg-input-text":["mg-tooltip"],"mg-input-textarea":["mg-tooltip"],"mg-input-toggle":["mg-tooltip"]}},{filePath:"src/components/atoms/mg-tooltip/mg-tooltip-content/mg-tooltip-content.tsx",encapsulation:"shadow",tag:"mg-tooltip-content",readme:"# mg-tooltip-content\n\nIn order to adhere to the ARIA tooltip pattern, which is essential for accessibility, we need to retrieve the tooltip content from outside the `mg-tooltip` shadow root.\n\nThe `mg-tooltip-content` component is appended to the `mg-tooltip` component as a slot when the component is loaded. It receives the tooltip content as props and manages the tooltip's style.\n",docs:"In order to adhere to the ARIA tooltip pattern, which is essential for accessibility, we need to retrieve the tooltip content from outside the `mg-tooltip` shadow root.\n\nThe `mg-tooltip-content` component is appended to the `mg-tooltip` component as a slot when the component is loaded. It receives the tooltip content as props and manages the tooltip's style.",docsTags:[],usage:{},props:[{name:"message",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"message",reflectToAttr:!1,docs:"Displayed message in the tooltip",docsTags:[],values:[{type:"string"}],optional:!1,required:!0}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-tooltip"],dependencies:[],dependencyGraph:{"mg-tooltip":["mg-tooltip-content"]}}],lt={"src/components/atoms/mg-badge/mg-badge.conf.ts::BadgeVariantType":{declaration:'"info" | "success" | "primary" | "secondary" | "warning" | "danger" | "text-color"',docstring:"",path:"src/components/atoms/mg-badge/mg-badge.conf.ts"},"src/components/atoms/mg-button/mg-button.conf.ts::VariantType":{declaration:'"flat" | "info" | "success" | "link" | "primary" | "secondary" | "danger" | "danger-alt"',docstring:"",path:"src/components/atoms/mg-button/mg-button.conf.ts"},"src/components/atoms/mg-button/mg-button.conf.ts::ButtonType":{declaration:'"button" | "submit" | "reset"',docstring:"",path:"src/components/atoms/mg-button/mg-button.conf.ts"},"src/components/atoms/mg-icon/mg-icon.conf.ts::IconSizeType":{declaration:'"small" | "regular" | "medium" | "large" | "extra-large"',docstring:"",path:"src/components/atoms/mg-icon/mg-icon.conf.ts"},"src/components/atoms/mg-icon/mg-icon.conf.ts::IconVariantType":{declaration:'"info" | "success" | "warning" | "danger" | "app"',docstring:"",path:"src/components/atoms/mg-icon/mg-icon.conf.ts"},"src/components/atoms/mg-icon/mg-icon.conf.ts::IconVariantStyleType":{declaration:'"icon" | "background" | "full"',docstring:"",path:"src/components/atoms/mg-icon/mg-icon.conf.ts"},"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::Direction":{declaration:`export enum Direction {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}`,docstring:"Menu direction type",path:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts"},"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::ItemMoreType":{declaration:`{
    [P in K]: T[P];
}`,docstring:"",path:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts"},"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::MenuSizeType":{declaration:'"regular" | "medium" | "large"',docstring:"",path:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts"},"src/components/molecules/mg-item-more/mg-item-more.conf.ts::IconType":{declaration:`{
  icon: MgIcon['icon'];
}`,docstring:"",path:"src/components/molecules/mg-item-more/mg-item-more.conf.ts"},"src/components/molecules/mg-item-more/mg-item-more.conf.ts::SlotLabelType":{declaration:`{
  label?: string;
  display?: boolean;
}`,docstring:"",path:"src/components/molecules/mg-item-more/mg-item-more.conf.ts"},"src/components/molecules/mg-item-more/mg-item-more.conf.ts::SizeType":{declaration:'"regular" | "medium" | "large"',docstring:"",path:"src/components/molecules/mg-item-more/mg-item-more.conf.ts"},"../../node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/index.d.ts::Placement":{declaration:"any",docstring:"",path:"../../node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/index.d.ts"},"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts::Status":{declaration:`export enum Status {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  DISABLED = 'disabled',
  ACTIVE = 'active',
}`,docstring:"Available menu item status",path:"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts"},"src/components/atoms/mg-card/mg-card.conf.ts::VariantType":{declaration:'"info" | "success" | "warning" | "danger" | "app"',docstring:"",path:"src/components/atoms/mg-card/mg-card.conf.ts"},"src/components/atoms/mg-card/mg-card.conf.ts::VariantStyleType":{declaration:'"fill" | "bar-left"',docstring:"",path:"src/components/atoms/mg-card/mg-card.conf.ts"},"src/components/atoms/mg-tag/mg-tag.conf.ts::TagVariantType":{declaration:'"info" | "success" | "primary" | "secondary" | "warning" | "danger"',docstring:"",path:"src/components/atoms/mg-tag/mg-tag.conf.ts"},"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxValue":{declaration:`export interface CheckboxValue {
  title: string;
  value: boolean | null;
  disabled?: boolean;
  required?: boolean;
}`,docstring:`interface CheckboxValue
use to match returned value`,path:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts"},"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxType":{declaration:'"checkbox" | "multi"',docstring:"",path:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts"},"src/components/molecules/inputs/MgInput.conf.ts::TooltipPosition":{declaration:'"input" | "label"',docstring:"",path:"src/components/molecules/inputs/MgInput.conf.ts"},"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxItem":{declaration:`export interface CheckboxItem extends CheckboxValue {
  _id: string;
  _handleInput: (event: InputEvent & { target: HTMLInputElement }) => void;
  _handleBlur: () => void;
  _handleKeydown: (event: KeyboardEvent & { target: HTMLElement }) => void;
}`,docstring:`interface CheckboxItem
use to match checkbox attributes`,path:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts"},"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::SectionKind":{declaration:`export enum SectionKind {
  SELECTED = 'selected',
  NOT_SELECTED = 'not-selected',
}`,docstring:"mg-input-checkbox-paginated section kind",path:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts"},"src/components/molecules/inputs/MgInput.conf.ts::Width":{declaration:'2 | 4 | 16 | "full"',docstring:"",path:"src/components/molecules/inputs/MgInput.conf.ts"},"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts::NumericType":{declaration:'"decimal" | "integer" | "currency"',docstring:"",path:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts"},"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts::Format":{declaration:'"number" | "none" | "currency"',docstring:"",path:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts"},"src/components/molecules/inputs/mg-input-radio/mg-input-radio.conf.ts::RadioOption":{declaration:`{
  title: string;
  value: unknown;
  disabled?: boolean;
}`,docstring:"",path:"src/components/molecules/inputs/mg-input-radio/mg-input-radio.conf.ts"},"src/components/molecules/inputs/mg-input-select/mg-input-select.conf.ts::SelectOption":{declaration:`{
  title: string;
  value: unknown;
  disabled?: boolean;
  group?: string;
}`,docstring:"",path:"src/components/molecules/inputs/mg-input-select/mg-input-select.conf.ts"},"src/components/molecules/inputs/mg-input-text/mg-input-text.conf.ts::TextType":{declaration:"export type TextType = 'text' | 'search';",docstring:"",path:"src/components/molecules/inputs/mg-input-text/mg-input-text.conf.ts"},"src/components/molecules/inputs/mg-input-toggle/mg-input-toggle.conf.ts::ToggleValue":{declaration:`{
  title: string;
  value: unknown;
}`,docstring:"",path:"src/components/molecules/inputs/mg-input-toggle/mg-input-toggle.conf.ts"},"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreIconType":{declaration:`{
  icon: MgIcon['icon'];
}`,docstring:"",path:"src/components/molecules/mg-action-more/mg-action-more.conf.ts"},"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreButtonType":{declaration:`{
  isIcon: MgButton['isIcon'];
  variant: MgButton['variant'];
  label?: MgButton['label'];
  disabled?: MgButton['disabled'];
}`,docstring:"",path:"src/components/molecules/mg-action-more/mg-action-more.conf.ts"},"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreItemType":{declaration:`{
  label: string;
  mouseEventHandler: IMouseEventHandler;
  status?: MgMenuItem['status'];
  icon?: MgIcon['icon'];
  href?: MgMenuItem['href'];
  badge?: Pick<MgBadge, 'value' | 'label'>;
}`,docstring:"",path:"src/components/molecules/mg-action-more/mg-action-more.conf.ts"},"src/components/molecules/mg-form/mg-form.conf.ts::RequiredMessageStatusType":{declaration:'"default" | "hide"',docstring:"",path:"src/components/molecules/mg-form/mg-form.conf.ts"},"src/components/molecules/mg-form/mg-form.conf.ts::AriaRoleType":{declaration:'"none" | "form" | "search" | "presentation"',docstring:"",path:"src/components/molecules/mg-form/mg-form.conf.ts"},"src/components/molecules/mg-message/mg-message.conf.ts::VariantType":{declaration:'"info" | "success" | "warning" | "danger"',docstring:"",path:"src/components/molecules/mg-message/mg-message.conf.ts"},"src/components/molecules/mg-modal/mg-modal.conf.ts::DialogRoleType":{declaration:'"dialog" | "alertdialog"',docstring:"",path:"src/components/molecules/mg-modal/mg-modal.conf.ts"},"src/components/molecules/mg-panel/mg-panel.conf.ts::TitlePositionType":{declaration:'"right" | "left"',docstring:"",path:"src/components/molecules/mg-panel/mg-panel.conf.ts"},"src/components/molecules/mg-panel/mg-panel.conf.ts::ExpandToggleDisplayType":{declaration:'"text" | "icon"',docstring:"",path:"src/components/molecules/mg-panel/mg-panel.conf.ts"},"src/components/molecules/mg-skip-links/mg-skip-links.conf.tsx::SkipLink":{declaration:`{
  href: string;
  label: string;
}`,docstring:"",path:"src/components/molecules/mg-skip-links/mg-skip-links.conf.tsx"},"src/components/molecules/mg-tabs/mg-tabs.conf.ts::SizeType":{declaration:'"regular" | "large"',docstring:"",path:"src/components/molecules/mg-tabs/mg-tabs.conf.ts"},"src/components/molecules/mg-tabs/mg-tabs.conf.ts::TabItem":{declaration:`{
  label: string;
  icon?: MgIcon['icon'];
  badge?: Pick<MgBadge, 'value' | 'variant' | 'label'> & { role: 'notification' | 'information' };
  status: Status;
}`,docstring:"",path:"src/components/molecules/mg-tabs/mg-tabs.conf.ts"}},it={timestamp:ot,compiler:at,components:st,typeLibrary:lt},rt="mg-components",ge={allRenderFn:!1,appendChildSlotFix:!1,asyncLoading:!0,asyncQueue:!1,attachStyles:!0,cloneNodeFix:!1,cmpDidLoad:!0,cmpDidRender:!0,cmpDidUnload:!1,cmpDidUpdate:!0,cmpShouldUpdate:!1,cmpWillLoad:!0,cmpWillRender:!1,cmpWillUpdate:!0,connectedCallback:!1,constructableCSS:!0,cssAnnotations:!0,devTools:!1,disconnectedCallback:!0,element:!1,event:!0,experimentalScopedSlotChanges:!1,experimentalSlotFixes:!1,formAssociated:!1,hasRenderFn:!0,hostListener:!0,hostListenerTarget:!0,hostListenerTargetBody:!1,hostListenerTargetDocument:!1,hostListenerTargetParent:!1,hostListenerTargetWindow:!0,hotModuleReplacement:!1,hydrateClientSide:!1,hydrateServerSide:!1,hydratedAttribute:!1,hydratedClass:!0,initializeNextTick:!1,invisiblePrehydration:!0,isDebug:!1,isDev:!1,isTesting:!1,lazyLoad:!0,lifecycle:!0,lifecycleDOMEvents:!1,member:!0,method:!0,mode:!1,observeAttribute:!0,profile:!1,prop:!0,propBoolean:!0,propMutable:!0,propNumber:!0,propString:!0,reflect:!0,scoped:!0,scopedSlotTextContentFix:!1,scriptDataOpts:!1,shadowDelegatesFocus:!1,shadowDom:!0,slot:!0,slotChildNodesFix:!1,slotRelocation:!0,state:!0,style:!0,svg:!1,taskQueue:!0,transformTagName:!1,updatable:!0,vdomAttribute:!0,vdomClass:!0,vdomFunctional:!0,vdomKey:!0,vdomListener:!0,vdomPropOrAttr:!0,vdomRef:!0,vdomRender:!0,vdomStyle:!0,vdomText:!0,vdomXlink:!0,watchCallback:!0};let A,B,O,U=!1,L=!1,F=!1,ue=!1,W=!1;const $=(e,t="")=>()=>{},ct=(e,t)=>()=>{},dt="{visibility:hidden}.hydrated{visibility:inherit}",fe="slot-fb{display:contents}slot-fb[hidden]{display:none}",ee="http://www.w3.org/1999/xlink",te={},pt=e=>e!=null,N=e=>(e=typeof e,e==="object"||e==="function");function he(e){var t,n,o;return(o=(n=(t=e.head)===null||t===void 0?void 0:t.querySelector('meta[name="csp-nonce"]'))===null||n===void 0?void 0:n.getAttribute("content"))!==null&&o!==void 0?o:void 0}const be=(e,t,...n)=>{let o=null,a=null,i=null,s=!1,r=!1;const l=[],p=d=>{for(let m=0;m<d.length;m++)o=d[m],Array.isArray(o)?p(o):o!=null&&typeof o!="boolean"&&((s=typeof e!="function"&&!N(o))&&(o=String(o)),s&&r?l[l.length-1].$text$+=o:l.push(s?C(null,o):o),r=s)};if(p(n),t){t.key&&(a=t.key),t.name&&(i=t.name);{const d=t.className||t.class;d&&(t.class=typeof d!="object"?d:Object.keys(d).filter(m=>d[m]).join(" "))}}if(typeof e=="function")return e(t===null?{}:t,l,ut);const c=C(e,null);return c.$attrs$=t,l.length>0&&(c.$children$=l),c.$key$=a,c.$name$=i,c},C=(e,t)=>{const n={$flags$:0,$tag$:e,$text$:t,$elm$:null,$children$:null};return n.$attrs$=null,n.$key$=null,n.$name$=null,n},mt={},gt=e=>e&&e.$tag$===mt,ut={forEach:(e,t)=>e.map(ne).forEach(t),map:(e,t)=>e.map(ne).map(t).map(ft)},ne=e=>({vattrs:e.$attrs$,vchildren:e.$children$,vkey:e.$key$,vname:e.$name$,vtag:e.$tag$,vtext:e.$text$}),ft=e=>{if(typeof e.vtag=="function"){const n=Object.assign({},e.vattrs);return e.vkey&&(n.key=e.vkey),e.vname&&(n.name=e.vname),be(e.vtag,n,...e.vchildren||[])}const t=C(e.vtag,e.vtext);return t.$attrs$=e.vattrs,t.$children$=e.vchildren,t.$key$=e.vkey,t.$name$=e.vname,t},ht=(e,t)=>e!=null&&!N(e)?t&4?e==="false"?!1:e===""||!!e:t&2?parseFloat(e):t&1?String(e):e:e,bt=e=>I(e).$hostElement$,an=(e,t,n)=>{const o=bt(e);return{emit:a=>ye(o,t,{bubbles:!!(n&4),composed:!!(n&2),cancelable:!!(n&1),detail:a})}},ye=(e,t,n)=>{const o=h.ce(t,n);return e.dispatchEvent(o),o},oe=new WeakMap,yt=(e,t,n)=>{let o=H.get(e);Nt&&n?(o=o||new CSSStyleSheet,typeof o=="string"?o=t:o.replaceSync(t)):o=t,H.set(e,o)},vt=(e,t,n)=>{var o;const a=ve(t),i=H.get(a);if(e=e.nodeType===11?e:v,i)if(typeof i=="string"){e=e.head||e;let s=oe.get(e),r;if(s||oe.set(e,s=new Set),!s.has(a)){{r=v.createElement("style"),r.innerHTML=i;const l=(o=h.$nonce$)!==null&&o!==void 0?o:he(v);l!=null&&r.setAttribute("nonce",l),e.insertBefore(r,e.querySelector("link"))}t.$flags$&4&&(r.innerHTML+=fe),s&&s.add(a)}}else e.adoptedStyleSheets.includes(i)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,i]);return a},Tt=e=>{const t=e.$cmpMeta$,n=e.$hostElement$,o=t.$flags$,a=$("attachStyles",t.$tagName$),i=vt(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);o&10&&(n["s-sc"]=i,n.classList.add(i+"-h"),o&2&&n.classList.add(i+"-s")),a()},ve=(e,t)=>"sc-"+e.$tagName$,ae=(e,t,n,o,a,i)=>{if(n!==o){let s=re(e,t),r=t.toLowerCase();if(t==="class"){const l=e.classList,p=se(n),c=se(o);l.remove(...p.filter(d=>d&&!c.includes(d))),l.add(...c.filter(d=>d&&!p.includes(d)))}else if(t==="style"){for(const l in n)(!o||o[l]==null)&&(l.includes("-")?e.style.removeProperty(l):e.style[l]="");for(const l in o)(!n||o[l]!==n[l])&&(l.includes("-")?e.style.setProperty(l,o[l]):e.style[l]=o[l])}else if(t!=="key")if(t==="ref")o&&o(e);else if(!s&&t[0]==="o"&&t[1]==="n"){if(t[2]==="-"?t=t.slice(3):re(M,r)?t=r.slice(2):t=r[2]+t.slice(3),n||o){const l=t.endsWith(Te);t=t.replace($t,""),n&&h.rel(e,t,n,l),o&&h.ael(e,t,o,l)}}else{const l=N(o);if((s||l&&o!==null)&&!a)try{if(e.tagName.includes("-"))e[t]=o;else{const c=o??"";t==="list"?s=!1:(n==null||e[t]!=c)&&(e[t]=c)}}catch{}let p=!1;r!==(r=r.replace(/^xlink\:?/,""))&&(t=r,p=!0),o==null||o===!1?(o!==!1||e.getAttribute(t)==="")&&(p?e.removeAttributeNS(ee,t):e.removeAttribute(t)):(!s||i&4||a)&&!l&&(o=o===!0?"":o,p?e.setAttributeNS(ee,t,o):e.setAttribute(t,o))}}},xt=/\s/,se=e=>e?e.split(xt):[],Te="Capture",$t=new RegExp(Te+"$"),xe=(e,t,n,o)=>{const a=t.$elm$.nodeType===11&&t.$elm$.host?t.$elm$.host:t.$elm$,i=e&&e.$attrs$||te,s=t.$attrs$||te;for(o in i)o in s||ae(a,o,i[o],void 0,n,t.$flags$);for(o in s)ae(a,o,i[o],s[o],n,t.$flags$)},z=(e,t,n,o)=>{const a=t.$children$[n];let i=0,s,r,l;if(U||(F=!0,a.$tag$==="slot"&&(A&&o.classList.add(A+"-s"),a.$flags$|=a.$children$?2:1)),a.$text$!==null)s=a.$elm$=v.createTextNode(a.$text$);else if(a.$flags$&1)s=a.$elm$=v.createTextNode("");else if(s=a.$elm$=v.createElement(a.$flags$&2?"slot-fb":a.$tag$),xe(null,a,ue),pt(A)&&s["s-si"]!==A&&s.classList.add(s["s-si"]=A),a.$children$)for(i=0;i<a.$children$.length;++i)r=z(e,a,i,s),r&&s.appendChild(r);return s["s-hn"]=O,a.$flags$&3&&(s["s-sr"]=!0,s["s-cr"]=B,s["s-sn"]=a.$name$||"",l=e&&e.$children$&&e.$children$[n],l&&l.$tag$===a.$tag$&&e.$elm$&&S(e.$elm$,!1)),s},S=(e,t)=>{h.$flags$|=1;const n=e.childNodes;for(let o=n.length-1;o>=0;o--){const a=n[o];a["s-hn"]!==O&&a["s-ol"]&&(we(a).insertBefore(a,G(a)),a["s-ol"].remove(),a["s-ol"]=void 0,a["s-sh"]=void 0,F=!0),t&&S(a,t)}h.$flags$&=-2},$e=(e,t,n,o,a,i)=>{let s=e["s-cr"]&&e["s-cr"].parentNode||e,r;for(s.shadowRoot&&s.tagName===O&&(s=s.shadowRoot);a<=i;++a)o[a]&&(r=z(null,n,a,e),r&&(o[a].$elm$=r,s.insertBefore(r,G(t))))},Ie=(e,t,n)=>{for(let o=t;o<=n;++o){const a=e[o];if(a){const i=a.$elm$;Se(a),i&&(L=!0,i["s-ol"]?i["s-ol"].remove():S(i,!0),i.remove())}}},It=(e,t,n,o,a=!1)=>{let i=0,s=0,r=0,l=0,p=t.length-1,c=t[0],d=t[p],m=o.length-1,g=o[0],u=o[m],f,y;for(;i<=p&&s<=m;)if(c==null)c=t[++i];else if(d==null)d=t[--p];else if(g==null)g=o[++s];else if(u==null)u=o[--m];else if(P(c,g,a))k(c,g,a),c=t[++i],g=o[++s];else if(P(d,u,a))k(d,u,a),d=t[--p],u=o[--m];else if(P(c,u,a))(c.$tag$==="slot"||u.$tag$==="slot")&&S(c.$elm$.parentNode,!1),k(c,u,a),e.insertBefore(c.$elm$,d.$elm$.nextSibling),c=t[++i],u=o[--m];else if(P(d,g,a))(c.$tag$==="slot"||u.$tag$==="slot")&&S(d.$elm$.parentNode,!1),k(d,g,a),e.insertBefore(d.$elm$,c.$elm$),d=t[--p],g=o[++s];else{for(r=-1,l=i;l<=p;++l)if(t[l]&&t[l].$key$!==null&&t[l].$key$===g.$key$){r=l;break}r>=0?(y=t[r],y.$tag$!==g.$tag$?f=z(t&&t[s],n,r,e):(k(y,g,a),t[r]=void 0,f=y.$elm$),g=o[++s]):(f=z(t&&t[s],n,s,e),g=o[++s]),f&&we(c.$elm$).insertBefore(f,G(c.$elm$))}i>p?$e(e,o[m+1]==null?null:o[m+1].$elm$,n,o,s,m):s>m&&Ie(t,i,p)},P=(e,t,n=!1)=>e.$tag$===t.$tag$?e.$tag$==="slot"?e.$name$===t.$name$:n?!0:e.$key$===t.$key$:!1,G=e=>e&&e["s-ol"]||e,we=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,k=(e,t,n=!1)=>{const o=t.$elm$=e.$elm$,a=e.$children$,i=t.$children$,s=t.$tag$,r=t.$text$;let l;r===null?(s==="slot"&&!U||xe(e,t,ue),a!==null&&i!==null?It(o,a,t,i,n):i!==null?(e.$text$!==null&&(o.textContent=""),$e(o,null,t,i,0,i.length-1)):a!==null&&Ie(a,0,a.length-1)):(l=o["s-cr"])?l.parentNode.textContent=r:e.$text$!==r&&(o.data=r)},Ae=e=>{const t=e.childNodes;for(const n of t)if(n.nodeType===1){if(n["s-sr"]){const o=n["s-sn"];n.hidden=!1;for(const a of t)if(a!==n){if(a["s-hn"]!==n["s-hn"]||o!==""){if(a.nodeType===1&&(o===a.getAttribute("slot")||o===a["s-sn"])){n.hidden=!0;break}}else if(a.nodeType===1||a.nodeType===3&&a.textContent.trim()!==""){n.hidden=!0;break}}}Ae(n)}},x=[],ke=e=>{let t,n,o;for(const a of e.childNodes){if(a["s-sr"]&&(t=a["s-cr"])&&t.parentNode){n=t.parentNode.childNodes;const i=a["s-sn"];for(o=n.length-1;o>=0;o--)if(t=n[o],!t["s-cn"]&&!t["s-nr"]&&t["s-hn"]!==a["s-hn"]&&!ge.experimentalSlotFixes)if(le(t,i)){let s=x.find(r=>r.$nodeToRelocate$===t);L=!0,t["s-sn"]=t["s-sn"]||i,s?(s.$nodeToRelocate$["s-sh"]=a["s-hn"],s.$slotRefNode$=a):(t["s-sh"]=a["s-hn"],x.push({$slotRefNode$:a,$nodeToRelocate$:t})),t["s-sr"]&&x.map(r=>{le(r.$nodeToRelocate$,t["s-sn"])&&(s=x.find(l=>l.$nodeToRelocate$===t),s&&!r.$slotRefNode$&&(r.$slotRefNode$=s.$slotRefNode$))})}else x.some(s=>s.$nodeToRelocate$===t)||x.push({$nodeToRelocate$:t})}a.nodeType===1&&ke(a)}},le=(e,t)=>e.nodeType===1?e.getAttribute("slot")===null&&t===""||e.getAttribute("slot")===t:e["s-sn"]===t?!0:t==="",Se=e=>{e.$attrs$&&e.$attrs$.ref&&e.$attrs$.ref(null),e.$children$&&e.$children$.map(Se)},wt=(e,t,n=!1)=>{var o,a,i,s;const r=e.$hostElement$,l=e.$cmpMeta$,p=e.$vnode$||C(null,null),c=gt(t)?t:be(null,null,t);if(O=r.tagName,l.$attrsToReflect$&&(c.$attrs$=c.$attrs$||{},l.$attrsToReflect$.map(([d,m])=>c.$attrs$[m]=r[d])),n&&c.$attrs$)for(const d of Object.keys(c.$attrs$))r.hasAttribute(d)&&!["key","ref","style","class"].includes(d)&&(c.$attrs$[d]=r[d]);c.$tag$=null,c.$flags$|=4,e.$vnode$=c,c.$elm$=p.$elm$=r.shadowRoot||r,A=r["s-sc"],U=(l.$flags$&1)!==0,B=r["s-cr"],L=!1,k(p,c,n);{if(h.$flags$|=1,F){ke(c.$elm$);for(const d of x){const m=d.$nodeToRelocate$;if(!m["s-ol"]){const g=v.createTextNode("");g["s-nr"]=m,m.parentNode.insertBefore(m["s-ol"]=g,m)}}for(const d of x){const m=d.$nodeToRelocate$,g=d.$slotRefNode$;if(g){const u=g.parentNode;let f=g.nextSibling;{let y=(o=m["s-ol"])===null||o===void 0?void 0:o.previousSibling;for(;y;){let b=(a=y["s-nr"])!==null&&a!==void 0?a:null;if(b&&b["s-sn"]===m["s-sn"]&&u===b.parentNode&&(b=b.nextSibling,!b||!b["s-nr"])){f=b;break}y=y.previousSibling}}(!f&&u!==m.parentNode||m.nextSibling!==f)&&m!==f&&(!m["s-hn"]&&m["s-ol"]&&(m["s-hn"]=m["s-ol"].parentNode.nodeName),u.insertBefore(m,f),m.nodeType===1&&(m.hidden=(i=m["s-ih"])!==null&&i!==void 0?i:!1))}else m.nodeType===1&&(n&&(m["s-ih"]=(s=m.hidden)!==null&&s!==void 0?s:!1),m.hidden=!0)}}L&&Ae(c.$elm$),h.$flags$&=-2,x.length=0}B=void 0},Me=(e,t)=>{t&&!e.$onRenderResolve$&&t["s-p"]&&t["s-p"].push(new Promise(n=>e.$onRenderResolve$=n))},K=(e,t)=>{if(e.$flags$|=16,e.$flags$&4){e.$flags$|=512;return}return Me(e,e.$ancestorComponent$),Kt(()=>At(e,t))},At=(e,t)=>{const n=$("scheduleUpdate",e.$cmpMeta$.$tagName$),o=e.$lazyInstance$;let a;return t?(e.$flags$|=256,e.$queuedListeners$&&(e.$queuedListeners$.map(([i,s])=>w(o,i,s)),e.$queuedListeners$=void 0),a=w(o,"componentWillLoad")):a=w(o,"componentWillUpdate"),n(),kt(a,()=>Mt(e,o,t))},kt=(e,t)=>St(e)?e.then(t):t(),St=e=>e instanceof Promise||e&&e.then&&typeof e.then=="function",Mt=async(e,t,n)=>{var o;const a=e.$hostElement$,i=$("update",e.$cmpMeta$.$tagName$),s=a["s-rc"];n&&Tt(e);const r=$("render",e.$cmpMeta$.$tagName$);qt(e,t,a,n),s&&(s.map(l=>l()),a["s-rc"]=void 0),r(),i();{const l=(o=a["s-p"])!==null&&o!==void 0?o:[],p=()=>Dt(e);l.length===0?p():(Promise.all(l).then(p),e.$flags$|=4,l.length=0)}},qt=(e,t,n,o)=>{try{t=t.render&&t.render(),e.$flags$&=-17,e.$flags$|=2,wt(e,t,o)}catch(a){T(a,e.$hostElement$)}return null},Dt=e=>{const t=e.$cmpMeta$.$tagName$,n=e.$hostElement$,o=$("postUpdate",t),a=e.$lazyInstance$,i=e.$ancestorComponent$;w(a,"componentDidRender"),e.$flags$&64?(w(a,"componentDidUpdate"),o()):(e.$flags$|=64,De(n),w(a,"componentDidLoad"),o(),e.$onReadyResolve$(n),i||qe()),e.$onInstanceResolve$(n),e.$onRenderResolve$&&(e.$onRenderResolve$(),e.$onRenderResolve$=void 0),e.$flags$&512&&J(()=>K(e,!1)),e.$flags$&=-517},qe=e=>{De(v.documentElement),J(()=>ye(M,"appload",{detail:{namespace:rt}}))},w=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(o){T(o)}},De=e=>e.classList.add("hydrated"),Et=(e,t)=>I(e).$instanceValues$.get(t),Pt=(e,t,n,o)=>{const a=I(e),i=a.$hostElement$,s=a.$instanceValues$.get(t),r=a.$flags$,l=a.$lazyInstance$;n=ht(n,o.$members$[t][0]);const p=Number.isNaN(s)&&Number.isNaN(n),c=n!==s&&!p;if((!(r&8)||s===void 0)&&c&&(a.$instanceValues$.set(t,n),l)){if(o.$watchers$&&r&128){const d=o.$watchers$[t];d&&d.map(m=>{try{l[m](n,s,t)}catch(g){T(g,i)}})}(r&18)===2&&K(a,!1)}},Ee=(e,t,n)=>{var o;const a=e.prototype;if(t.$members$){e.watchers&&(t.$watchers$=e.watchers);const i=Object.entries(t.$members$);if(i.map(([s,[r]])=>{r&31||n&2&&r&32?Object.defineProperty(a,s,{get(){return Et(this,s)},set(l){Pt(this,s,l,t)},configurable:!0,enumerable:!0}):n&1&&r&64&&Object.defineProperty(a,s,{value(...l){var p;const c=I(this);return(p=c==null?void 0:c.$onInstancePromise$)===null||p===void 0?void 0:p.then(()=>{var d;return(d=c.$lazyInstance$)===null||d===void 0?void 0:d[s](...l)})}})}),n&1){const s=new Map;a.attributeChangedCallback=function(r,l,p){h.jmp(()=>{var c;const d=s.get(r);if(this.hasOwnProperty(d))p=this[d],delete this[d];else{if(a.hasOwnProperty(d)&&typeof this[d]=="number"&&this[d]==p)return;if(d==null){const m=I(this),g=m==null?void 0:m.$flags$;if(g&&!(g&8)&&g&128&&p!==l){const u=m.$lazyInstance$,f=(c=t.$watchers$)===null||c===void 0?void 0:c[r];f==null||f.forEach(y=>{u[y]!=null&&u[y].call(u,p,l,r)})}return}}this[d]=p===null&&typeof this[d]=="boolean"?!1:p})},e.observedAttributes=Array.from(new Set([...Object.keys((o=t.$watchers$)!==null&&o!==void 0?o:{}),...i.filter(([r,l])=>l[0]&15).map(([r,l])=>{var p;const c=l[1]||r;return s.set(c,r),l[0]&512&&((p=t.$attrsToReflect$)===null||p===void 0||p.push([r,c])),c})]))}}return e},Lt=async(e,t,n,o)=>{let a;if(!(t.$flags$&32)){t.$flags$|=32;{if(a=jt(n),a.then){const l=ct();a=await a,l()}a.isProxied||(n.$watchers$=a.watchers,Ee(a,n,2),a.isProxied=!0);const r=$("createInstance",n.$tagName$);t.$flags$|=8;try{new a(t)}catch(l){T(l)}t.$flags$&=-9,t.$flags$|=128,r()}if(a.style){let r=a.style;const l=ve(n);if(!H.has(l)){const p=$("registerStyles",n.$tagName$);yt(l,r,!!(n.$flags$&1)),p()}}}const i=t.$ancestorComponent$,s=()=>K(t,!0);i&&i["s-rc"]?i["s-rc"].push(s):s()},Ct=e=>{},zt=e=>{if(!(h.$flags$&1)){const t=I(e),n=t.$cmpMeta$,o=$("connectedCallback",n.$tagName$);if(t.$flags$&1)Pe(e,t,n.$listeners$),t!=null&&t.$lazyInstance$||t!=null&&t.$onReadyPromise$&&t.$onReadyPromise$.then(()=>Ct());else{t.$flags$|=1,n.$flags$&12&&Ht(e);{let a=e;for(;a=a.parentNode||a.host;)if(a["s-p"]){Me(t,t.$ancestorComponent$=a);break}}n.$members$&&Object.entries(n.$members$).map(([a,[i]])=>{if(i&31&&e.hasOwnProperty(a)){const s=e[a];delete e[a],e[a]=s}}),Lt(e,t,n)}o()}},Ht=e=>{const t=e["s-cr"]=v.createComment("");t["s-cn"]=!0,e.insertBefore(t,e.firstChild)},ie=e=>{w(e,"disconnectedCallback")},Ot=async e=>{if(!(h.$flags$&1)){const t=I(e);t.$rmListeners$&&(t.$rmListeners$.map(n=>n()),t.$rmListeners$=void 0),t!=null&&t.$lazyInstance$?ie(t.$lazyInstance$):t!=null&&t.$onReadyPromise$&&t.$onReadyPromise$.then(()=>ie(t.$lazyInstance$))}},_t=(e,t={})=>{var n;const o=$(),a=[],i=t.exclude||[],s=M.customElements,r=v.head,l=r.querySelector("meta[charset]"),p=v.createElement("style"),c=[];let d,m=!0;Object.assign(h,t),h.$resourcesUrl$=new URL(t.resourcesUrl||"./",v.baseURI).href;let g=!1;if(e.map(u=>{u[1].map(f=>{var y;const b={$flags$:f[0],$tagName$:f[1],$members$:f[2],$listeners$:f[3]};b.$flags$&4&&(g=!0),b.$members$=f[2],b.$listeners$=f[3],b.$attrsToReflect$=[],b.$watchers$=(y=f[4])!==null&&y!==void 0?y:{};const q=b.$tagName$,Ce=class extends HTMLElement{constructor(D){super(D),D=this,Wt(D,b),b.$flags$&1&&D.attachShadow({mode:"open"})}connectedCallback(){d&&(clearTimeout(d),d=null),m?c.push(this):h.jmp(()=>zt(this))}disconnectedCallback(){h.jmp(()=>Ot(this))}componentOnReady(){return I(this).$onReadyPromise$}};b.$lazyBundleId$=u[0],!i.includes(q)&&!s.get(q)&&(a.push(q),s.define(q,Ee(Ce,b,1)))})}),a.length>0&&(g&&(p.textContent+=fe),p.textContent+=a+dt,p.innerHTML.length)){p.setAttribute("data-styles","");const u=(n=h.$nonce$)!==null&&n!==void 0?n:he(v);u!=null&&p.setAttribute("nonce",u),r.insertBefore(p,l?l.nextSibling:r.firstChild)}m=!1,c.length?c.map(u=>u.connectedCallback()):h.jmp(()=>d=setTimeout(qe,30)),o()},Pe=(e,t,n,o)=>{n&&n.map(([a,i,s])=>{const r=Vt(e,a),l=Rt(t,s),p=Bt(a);h.ael(r,i,l,p),(t.$rmListeners$=t.$rmListeners$||[]).push(()=>h.rel(r,i,l,p))})},Rt=(e,t)=>n=>{try{e.$flags$&256?e.$lazyInstance$[t](n):(e.$queuedListeners$=e.$queuedListeners$||[]).push([t,n])}catch(o){T(o)}},Vt=(e,t)=>t&8?M:e,Bt=e=>Ut?{passive:(e&1)!==0,capture:(e&2)!==0}:(e&2)!==0,Y=new WeakMap,I=e=>Y.get(e),sn=(e,t)=>Y.set(t.$lazyInstance$=e,t),Wt=(e,t)=>{const n={$flags$:0,$hostElement$:e,$cmpMeta$:t,$instanceValues$:new Map};return n.$onInstancePromise$=new Promise(o=>n.$onInstanceResolve$=o),n.$onReadyPromise$=new Promise(o=>n.$onReadyResolve$=o),e["s-p"]=[],e["s-rc"]=[],Pe(e,n,t.$listeners$),Y.set(e,n)},re=(e,t)=>t in e,T=(e,t)=>(0,console.error)(e,t),_=new Map,jt=(e,t,n)=>{const o=e.$tagName$.replace(/-/g,"_"),a=e.$lazyBundleId$,i=_.get(a);if(i)return i[o];if(!n||!ge.hotModuleReplacement){const s=r=>(_.set(a,r),r[o]);switch(a){case"mg-action-more_34":return E(()=>import("./mg-action-more_34.entry-ByzE2gkw.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url).then(s,T);case"mg-item-more":return E(()=>import("./mg-item-more.entry-jS3ffMnj.js"),__vite__mapDeps([9,1,2,3,4,5,6,7,8]),import.meta.url).then(s,T);case"mg-loader":return E(()=>import("./mg-loader.entry-BckzABr_.js"),__vite__mapDeps([10,1,3,4,5,6,7,8]),import.meta.url).then(s,T)}}return E(()=>import(`./${a}.entry.js`),__vite__mapDeps([]),import.meta.url).then(s=>(_.set(a,s),s[o]),T)},H=new Map,M=typeof window<"u"?window:{},v=M.document||{head:{}},h={$flags$:0,$resourcesUrl$:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,o)=>e.addEventListener(t,n,o),rel:(e,t,n,o)=>e.removeEventListener(t,n,o),ce:(e,t)=>new CustomEvent(e,t)},Ut=(()=>{let e=!1;try{v.addEventListener("e",null,Object.defineProperty({},"passive",{get(){e=!0}}))}catch{}return e})(),Ft=e=>Promise.resolve(e),Nt=(()=>{try{return new CSSStyleSheet,typeof new CSSStyleSheet().replaceSync=="function"}catch{}return!1})(),ce=[],Le=[],Gt=(e,t)=>n=>{e.push(n),W||(W=!0,t&&h.$flags$&4?J(j):h.raf(j))},de=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(n){T(n)}e.length=0},j=()=>{de(ce),de(Le),(W=ce.length>0)&&h.raf(j)},J=e=>Ft().then(e),Kt=Gt(Le,!0),Yt=()=>{},Jt=async(e,t)=>{if(!(typeof window>"u"))return await Yt(),_t(JSON.parse('[["mg-action-more_34",[[1,"mg-input-checkbox",{"value":[1040],"type":[1025],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"inputVerticalList":[4,"input-vertical-list"],"required":[4],"readonly":[4],"displaySelectedValues":[4,"display-selected-values"],"disabled":[4],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"checkboxItems":[32],"displaySearchInput":[32],"searchValue":[32],"searchResults":[32],"selectValuesButtonKey":[32],"displayError":[64],"setError":[64]},null,{"value":["validateValue"],"type":["validateType"],"required":["handleValidityChange"],"readonly":["handleValidityChange"],"disabled":["handleValidityChange","validateDisabled"],"checkboxItems":["validateCheckboxItems"],"searchValue":["validateSearchValue"]}],[1,"mg-action-more",{"icon":[1040],"button":[16],"items":[16],"displayChevron":[4,"display-chevron"],"expanded":[32]},null,{"icon":["validateIcon"],"button":["validateButton"],"items":["validateItems"],"displayChevron":["validateDisplayChevron"]}],[1,"mg-panel",{"identifier":[1],"panelTitle":[1025,"panel-title"],"titlePattern":[1,"title-pattern"],"titlePatternErrorMessage":[1,"title-pattern-error-message"],"titleEditable":[1028,"title-editable"],"titlePosition":[1,"title-position"],"expanded":[1028],"expandToggleDisplay":[1,"expand-toggle-display"],"expandToggleDisabled":[4,"expand-toggle-disabled"],"classCollection":[32],"isEditing":[32],"updatedPanelTitle":[32]},null,{"panelTitle":["validatePanelTitle"],"titlePattern":["validateTitlePattern"],"titlePatternErrorMessage":["validateTitlePattern"],"titlePosition":["validateTitlePosition"],"expanded":["handleExpanded"],"expandToggleDisplay":["validateExpandToggleDisplay"]}],[1,"mg-input-textarea",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1],"maxlength":[2],"required":[4],"readonly":[4],"disabled":[4],"mgWidth":[8,"mg-width"],"pattern":[1],"patternErrorMessage":[1,"pattern-error-message"],"rows":[2],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"displayCharacterLeft":[4,"display-character-left"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"resizable":[1],"classCollection":[32],"errorMessage":[32],"displayError":[64],"setError":[64]},null,{"value":["handleValue"],"required":["handleValidityChange"],"readonly":["handleValidityChange"],"disabled":["handleValidityChange"],"pattern":["validatePattern"],"patternErrorMessage":["validatePattern"],"displayCharacterLeft":["validateDisplayCharacterLeft"]}],[1,"mg-input-date",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"required":[4],"readonly":[4],"min":[1],"max":[1],"disabled":[4],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"displayError":[64],"setError":[64]},null,{"value":["validateValue"],"min":["validateMinMax","handleValidityChange"],"max":["validateMinMax","handleValidityChange"],"required":["handleValidityChange"],"readonly":["handleValidityChange"],"disabled":["handleValidityChange"]}],[1,"mg-input-numeric",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1],"required":[4],"readonly":[4],"max":[2],"min":[2],"disabled":[4],"mgWidth":[8,"mg-width"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"type":[1],"format":[1025],"currency":[1],"integerLength":[2,"integer-length"],"decimalLength":[2,"decimal-length"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"hasFocus":[32],"displayError":[64],"setError":[64]},null,{"value":["validateValue"],"required":["handleValidityChange"],"readonly":["handleValidityChange"],"disabled":["handleValidityChange"],"min":["handleValidityChange"],"max":["handleValidityChange"],"type":["validateType"],"format":["watchFormat"],"integerLength":["validateIntegerLength"],"decimalLength":["validateDecimalLength"]}],[1,"mg-input-password",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1],"required":[4],"readonly":[4],"disabled":[4],"mgWidth":[8,"mg-width"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"displayError":[64],"setError":[64]},null,{"value":["handleValue"],"required":["handleValidityChange"],"readonly":["handleValidityChange"],"disabled":["handleValidityChange"]}],[1,"mg-input-radio",{"value":[1032],"items":[16],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"inputVerticalList":[4,"input-vertical-list"],"required":[4],"readonly":[4],"disabled":[4],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"options":[32],"displayError":[64],"setError":[64]},null,{"value":["handleValue"],"items":["validateItems"],"required":["handleValidityChange"],"readonly":["handleValidityChange"],"disabled":["handleValidityChange"]}],[1,"mg-input-toggle",{"value":[1032],"items":[16],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"isOnOff":[4,"is-on-off"],"isIcon":[4,"is-icon"],"readonly":[4],"disabled":[4],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"classCollection":[32],"options":[32],"errorMessage":[32],"valid":[32],"checked":[32],"setError":[64]},null,{"value":["handleValue"],"items":["validateItems"],"isOnOff":["handleIsOnOff"],"isIcon":["handleIsIcon"],"disabled":["handleDisabled"],"checked":["handleChecked"]}],[1,"mg-message",{"identifier":[1],"delay":[2],"variant":[1],"closeButton":[1028,"close-button"],"hide":[1028],"noAriaRole":[4,"no-aria-role"],"classCollection":[32],"hasActions":[32]},null,{"delay":["validateDelay"],"variant":["validateVariant"],"closeButton":["validateCloseButton"],"hide":["validateHide"]}],[1,"mg-modal",{"identifier":[1],"dialogRole":[1,"dialog-role"],"modalTitle":[1,"modal-title"],"closeButton":[4,"close-button"],"hide":[1028],"hasActions":[32],"hasContent":[32],"classCollection":[32]},[[8,"keydown","handleKeyDown"]],{"dialogRole":["validateDialogRole"],"modalTitle":["validateModalTitle"],"hide":["validateHide"]}],[1,"mg-tabs",{"identifier":[1],"label":[1],"size":[1],"items":[16],"activeTab":[1538,"active-tab"],"tabs":[32],"classCollection":[32]},null,{"label":["validateLabel"],"size":["validateSize"],"items":["validateItems"],"activeTab":["validateActiveTab"]}],[1,"mg-details",{"toggleClosed":[1,"toggle-closed"],"toggleOpened":[1,"toggle-opened"],"hideSummary":[4,"hide-summary"],"expanded":[1028]},null,{"toggleClosed":["validateTitles"],"toggleOpened":["validateTitles"],"expanded":["handleExpanded"]}],[1,"mg-divider",{"size":[1]}],[1,"mg-form",{"identifier":[1],"name":[1],"readonly":[4],"requiredMessage":[1,"required-message"],"ariaRole":[1,"aria-role"],"labelOnTop":[4,"label-on-top"],"disabled":[4],"valid":[1028],"invalid":[1028],"classCollection":[32],"requiredMessageText":[32],"displayError":[64]},null,{"requiredMessage":["validateRequiredMessage","handleAttributeChange"],"ariaRole":["validateAriaRole"],"labelOnTop":["handlelabelOnTop"],"readonly":["handleAttributeChange"],"disabled":["handleAttributeChange"]}],[1,"mg-illustrated-message",{"size":[1],"direction":[1]}],[1,"mg-skip-links",{"links":[16]},null,{"links":["validateLinks"]}],[1,"mg-tag",{"variant":[1],"outline":[4],"soft":[4],"classCollection":[32]},null,{"variant":["validateVariant"],"outline":["validateOutline"],"soft":["validateSoft"]}],[2,"mg-input-checkbox-paginated",{"readonly":[4],"disabled":[4],"name":[1],"invalid":[4],"currentPage":[1026,"current-page"],"checkboxes":[16],"sectionKind":[1,"section-kind"],"messages":[16],"titleKind":[32],"expanded":[32]},null,{"checkboxes":["validateCheckboxes"],"sectionKind":["validateSectionKind"]}],[1,"mg-menu-item",{"identifier":[1],"href":[1],"status":[1537],"expanded":[1028],"size":[32],"navigationButtonClassList":[32],"direction":[32],"isInMainMenu":[32],"isItemMore":[32],"hasChildren":[32],"displayNotificationBadge":[32]},null,{"status":["validateStatus"],"expanded":["validateExpanded"],"size":["validateSize"],"direction":["validateDirection"],"hasChildren":["validateHasChildren"]}],[1,"mg-pagination",{"identifier":[1],"label":[1025],"hideNavigationLabels":[4,"hide-navigation-labels"],"hidePageCount":[4,"hide-page-count"],"totalPages":[2,"total-pages"],"currentPage":[1538,"current-page"]},null,{"totalPages":["validateTotalPages"],"currentPage":["validateCurrentPage"]}],[1,"mg-input-text",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"type":[1],"icon":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1],"datalistoptions":[16],"maxlength":[2],"required":[4],"readonly":[4],"disabled":[4],"mgWidth":[8,"mg-width"],"pattern":[1],"patternErrorMessage":[1,"pattern-error-message"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"displayCharacterLeft":[4,"display-character-left"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"setFocus":[64],"displayError":[64],"setError":[64]},null,{"value":["handleValue"],"icon":["validateIcon"],"datalistoptions":["validateDatalistoptions"],"required":["handleValidityChange"],"readonly":["handleValidityChange"],"disabled":["handleValidityChange"],"pattern":["validatePattern"],"patternErrorMessage":["validatePattern"]}],[1,"mg-menu",{"label":[1],"direction":[513],"itemmore":[16],"size":[1],"isChildMenu":[32]},null,{"label":["validateLabel"],"direction":["validateDirection"],"itemmore":["validateItemMore"],"size":["validateSize"]}],[1,"mg-input-select",{"value":[1032],"items":[16],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1025],"placeholderHide":[4,"placeholder-hide"],"placeholderDisabled":[4,"placeholder-disabled"],"required":[4],"readonly":[4],"disabled":[4],"mgWidth":[520,"mg-width"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"options":[32],"valueExist":[32],"readonlyValue":[32],"displayError":[64],"setError":[64]},null,{"value":["validateValue"],"items":["validateItems"],"required":["handleValidityChange"],"readonly":["handleValidityChange"],"disabled":["handleValidityChange"]}],[1,"mg-popover",{"identifier":[1],"placement":[1],"arrowHide":[4,"arrow-hide"],"closeButton":[4,"close-button"],"display":[1028],"disabled":[4]},null,{"identifier":["validateIdentifier"],"arrowHide":["validateArrowHide"],"closeButton":["validateCloseButton"],"display":["handleDisplay"]}],[1,"mg-badge",{"value":[8],"label":[1],"variant":[1],"outline":[4],"classCollection":[32]},null,{"value":["validateValue"],"label":["validateLabel"],"variant":["validateVariant"],"outline":["validateOutline"]}],[2,"mg-character-left",{"identifier":[1],"characters":[1],"maxlength":[2]},null,{"maxlength":["validateMaxlength"]}],[1,"mg-popover-content",{"closeButton":[4,"close-button"],"classCollection":[32]}],[1,"mg-card",{"variant":[1],"variantStyle":[1025,"variant-style"],"classCollection":[32]},null,{"variant":["validateVariant"],"variantStyle":["validateVariantStyle"]}],[1,"mg-button",{"variant":[1],"identifier":[1],"label":[1],"type":[1],"fullWidth":[4,"full-width"],"form":[1],"disabled":[1028],"isIcon":[4,"is-icon"],"disableOnClick":[4,"disable-on-click"],"loading":[32],"classCollection":[32]},null,{"variant":["validateVariant"],"fullWidth":["validateFullWidth"],"disabled":["disabledHandler"],"loading":["loadingHandler"]}],[1,"mg-tooltip",{"identifier":[1],"message":[1],"placement":[1],"display":[1028],"disabled":[4]},null,{"identifier":["validateIdentifier"],"message":["validateMessage"],"display":["handleDisplay"],"disabled":["validateDisabled"]}],[6,"mg-input-title",{"identifier":[1],"required":[4],"readonly":[4],"isLegend":[4,"is-legend"],"tagName":[32]},null,{"identifier":["validateIdentifier"],"isLegend":["validateIsLegend"]}],[1,"mg-tooltip-content",{"message":[1]}],[1,"mg-icon",{"icon":[1],"size":[1],"variant":[1],"variantStyle":[1025,"variant-style"],"spin":[4],"classCollection":[32]},null,{"icon":["validateIcon"],"size":["validateSize"],"variant":["validateVariant"],"variantStyle":["validateVariantStyle"],"spin":["handleSpin"]}]]],["mg-item-more",[[1,"mg-item-more",{"icon":[16],"slotlabel":[16],"size":[1],"parentMenu":[32]},null,{"icon":["validateIcon"],"slotlabel":["validateSlotLabel"],"size":["validateSize"]}]]],["mg-loader",[[1,"mg-loader",{"message":[1],"messageHide":[4,"message-hide"]},null,{"message":["watchMessage"]}]]]]'),t)};(function(){if(typeof window<"u"&&window.Reflect!==void 0&&window.customElements!==void 0){var e=HTMLElement;window.HTMLElement=function(){return Reflect.construct(e,[],this.constructor)},HTMLElement.prototype=e.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,e)}})();Jt();R.setStencilDocJson(it);const Xt={controls:{matchers:{color:/(background|color)$/i,date:/Date$/}},docs:{extractArgTypes:R.extractArgTypes,extractComponentDescription:R.extractComponentDescription,transformSource:(e,t)=>Oe(t.originalStoryFn(t.args))},options:{storySort:{order:["Intro","Atoms","Molecules","Style"]}}},Zt={locale:{name:"Locale",description:"Internationalization locale",toolbar:{icon:"globe",items:[{value:"en",title:"English"},{value:"fr",title:"Français"}],showName:!0}}},Qt=[_e,nt],ln=Object.freeze(Object.defineProperty({__proto__:null,decorators:Qt,globalTypes:Zt,parameters:Xt},Symbol.toStringTag,{value:"Module"}));export{mt as H,an as c,bt as g,be as h,ln as p,sn as r};
