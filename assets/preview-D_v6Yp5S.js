const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./mg-action-more_36.entry-Bryyxsnr.js","./index-eed80cc2-BaO130QP.js","./v4-CQkTLCs1.js","./index.es-1o2oPW_B.js","./iframe-NABFqM7s.js","./mg-loader.entry-CztCrX8o.js"])))=>i.map(i=>d[i]);
import{v as Ve}from"./v4-CQkTLCs1.js";import{s as We,t as Be,e as je}from"./index.es-1o2oPW_B.js";import{_ as V}from"./iframe-NABFqM7s.js";const{addons:Fe}=__STORYBOOK_MODULE_PREVIEW_API__,{global:ee}=__STORYBOOK_MODULE_GLOBAL__,{ImplicitActionsDuringRendering:Ne}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;var Ue="actions",Ge="storybook/actions",Ke=`${Ge}/action-event`,B={depth:10,clearOnStoryChange:!0,limit:50},fe=(e,t)=>{let n=Object.getPrototypeOf(e);return!n||t(n)?n:fe(n,t)},Ye=e=>!!(typeof e=="object"&&e&&fe(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),Xe=e=>{if(Ye(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let n=Object.getOwnPropertyDescriptor(t,"view"),o=n==null?void 0:n.value;return typeof o=="object"&&(o==null?void 0:o.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...n,value:Object.create(o.constructor.prototype)}),t}return e},Je=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?Ve():Date.now().toString(36)+Math.random().toString(36).substring(2);function Ze(e,t={}){let n={...B,...t},o=function(...a){var d,p;if(t.implicit){let g=(d="__STORYBOOK_PREVIEW__"in ee?ee.__STORYBOOK_PREVIEW__:void 0)==null?void 0:d.storyRenders.find(m=>m.phase==="playing"||m.phase==="rendering");if(g){let m=!((p=window==null?void 0:window.FEATURES)!=null&&p.disallowImplicitActionsInRenderV8),h=new Ne({phase:g.phase,name:e,deprecated:m});if(m)console.warn(h);else throw h}}let l=Fe.getChannel(),r=Je(),i=5,s=a.map(Xe),u=a.length>1?s:s[0],c={id:r,count:0,data:{name:e,args:u},options:{...n,maxDepth:i+(n.depth||3),allowFunction:n.allowFunction||!1}};l.emit(Ke,c)};return o.isAction=!0,o.implicit=t.implicit,o}var Qe=(...e)=>{let t=B,n=e;n.length===1&&Array.isArray(n[0])&&([n]=n),n.length!==1&&typeof n[n.length-1]!="string"&&(t={...B,...n.pop()});let o=n[0];(n.length!==1||typeof o=="string")&&(o={},n.forEach(l=>{o[l]=l}));let a={};return Object.keys(o).forEach(l=>{a[l]=Ze(o[l],t)}),a};const{global:et}=__STORYBOOK_MODULE_GLOBAL__,{makeDecorator:tt,useEffect:nt}=__STORYBOOK_MODULE_PREVIEW_API__;var{document:te,Element:ne}=et,ot=/^(\S+)\s*(.*)$/,at=ne!=null&&!ne.prototype.matches,lt=at?"msMatchesSelector":"matches",he=(e,t)=>{if(e[lt](t))return!0;let n=e.parentElement;return n?he(n,t):!1},it=(e,...t)=>{let n=e(...t);return Object.entries(n).map(([o,a])=>{let[l,r,i]=o.match(ot)||[];return{eventName:r,handler:s=>{(!i||he(s.target,i))&&a(s)}}})},st=(e,...t)=>{let n=te&&te.getElementById("storybook-root");nt(()=>{if(n!=null){let o=it(e,...t);return o.forEach(({eventName:a,handler:l})=>n.addEventListener(a,l)),()=>o.forEach(({eventName:a,handler:l})=>n.removeEventListener(a,l))}},[n,e,t])},rt=tt({name:"withActions",parameterName:Ue,skipIfNoParametersOrOptions:!0,wrapper:(e,t,{parameters:n})=>(n!=null&&n.handles&&st(Qe,...n.handles),e(t))});const ct="2024-08-28T09:32:53",pt={name:"@stencil/core",version:"4.21.0",typescriptVersion:"5.5.3"},ut=[{filePath:"src/components/molecules/mg-action-more/mg-action-more.tsx",encapsulation:"shadow",tag:"mg-action-more",readme:`## Anatomy

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

It is possible to set another variant (see [mg-button](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-button--docs)).

### Icon

![](./doc/img/mg-action-more-options-icon.png)

It is possible to set another icon

### Label

![](./doc/img/mg-action-more-options-label.png)

It is possible to set another label.

### Chevron

![](./doc/img/mg-action-more-options-chevron.png)

It is possible to display a chevron on the label right side, it make a 180 degree rotation on click.
`,docs:"![](./doc/img/mg-action-more-anatomy.png)",docsTags:[],usage:{},props:[{name:"button",type:'{ label?: string; disabled?: boolean; variant: "flat" | "info" | "success" | "link" | "primary" | "secondary" | "danger" | "danger-alt"; isIcon: boolean; }',complexType:{original:"MgActionMoreButtonType",resolved:'{ label?: string; disabled?: boolean; variant: "flat" | "info" | "success" | "link" | "primary" | "secondary" | "danger" | "danger-alt"; isIcon: boolean; }',references:{MgActionMoreButtonType:{location:"import",path:"./mg-action-more.conf",id:"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreButtonType"}}},mutable:!1,reflectToAttr:!1,docs:"Define button properties",docsTags:[],default:"{ variant: 'flat', isIcon: true }",values:[{type:'{ label?: string; disabled?: boolean; variant: "flat"'},{value:"info",type:"string"},{value:"success",type:"string"},{value:"link",type:"string"},{value:"primary",type:"string"},{value:"secondary",type:"string"},{value:"danger",type:"string"},{type:'"danger-alt"; isIcon: boolean; }'}],optional:!0,required:!1},{name:"displayChevron",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"display-chevron",reflectToAttr:!1,docs:"Define if chevron is display",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"icon",type:'{ icon: "filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"; }',complexType:{original:"MgActionMoreIconType",resolved:'{ icon: "filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"; }',references:{MgActionMoreIconType:{location:"import",path:"./mg-action-more.conf",id:"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreIconType"}}},mutable:!0,reflectToAttr:!1,docs:"Define displayed icon",docsTags:[],values:[{type:'{ icon: "filter"'},{value:"copy",type:"string"},{value:"link",type:"string"},{value:"picture",type:"string"},{value:"table",type:"string"},{value:"circle",type:"string"},{value:"download",type:"string"},{value:"history",type:"string"},{value:"location",type:"string"},{value:"key",type:"string"},{value:"loader",type:"string"},{value:"address-card",type:"string"},{value:"align-center",type:"string"},{value:"align-justify",type:"string"},{value:"align-left",type:"string"},{value:"align-right",type:"string"},{value:"api",type:"string"},{value:"archive",type:"string"},{value:"archive-outline",type:"string"},{value:"arrow-clock",type:"string"},{value:"arrow-down",type:"string"},{value:"arrow-down-a-z",type:"string"},{value:"arrow-down-right",type:"string"},{value:"arrow-left",type:"string"},{value:"arrow-right",type:"string"},{value:"arrow-rotate",type:"string"},{value:"arrow-rotate-backward",type:"string"},{value:"arrow-up",type:"string"},{value:"arrow-up-right",type:"string"},{value:"arrow-up-right-square",type:"string"},{value:"arrow-up-z-a",type:"string"},{value:"arrows-compare",type:"string"},{value:"arrows-right-down",type:"string"},{value:"arrows-right-left",type:"string"},{value:"arrows-rotate",type:"string"},{value:"arrows-rotate-backward",type:"string"},{value:"ban",type:"string"},{value:"bell",type:"string"},{value:"bell-outline",type:"string"},{value:"book",type:"string"},{value:"book-outline",type:"string"},{value:"briefcase",type:"string"},{value:"briefcase-outline",type:"string"},{value:"building-outline",type:"string"},{value:"calculator",type:"string"},{value:"calendar",type:"string"},{value:"calendar-euro",type:"string"},{value:"calendar-euro-outline",type:"string"},{value:"calendar-outline",type:"string"},{value:"check",type:"string"},{value:"check-circle",type:"string"},{value:"check-circle-outline",type:"string"},{value:"chevron-down",type:"string"},{value:"chevron-down-circle",type:"string"},{value:"chevron-left",type:"string"},{value:"chevron-left-circle",type:"string"},{value:"chevron-right",type:"string"},{value:"chevron-right-circle",type:"string"},{value:"chevron-up",type:"string"},{value:"chevron-up-circle",type:"string"},{value:"clock",type:"string"},{value:"clock-outline",type:"string"},{value:"code-square-outline",type:"string"},{value:"cog",type:"string"},{value:"cog-outline",type:"string"},{value:"comment",type:"string"},{value:"comment-outline",type:"string"},{value:"comment-sms",type:"string"},{value:"conversation",type:"string"},{value:"conversation-outline",type:"string"},{value:"copy-file",type:"string"},{value:"copy-file-outline",type:"string"},{value:"copy-outline",type:"string"},{value:"credit-card",type:"string"},{value:"cross",type:"string"},{value:"cross-circle",type:"string"},{value:"cross-circle-outline",type:"string"},{value:"dashboard",type:"string"},{value:"dashboard-outline",type:"string"},{value:"earth",type:"string"},{value:"earth-outline",type:"string"},{value:"ellipsis",type:"string"},{value:"ellipsis-vertical",type:"string"},{value:"euro",type:"string"},{value:"euro-circle",type:"string"},{value:"exclamation-circle",type:"string"},{value:"exclamation-circle-outline",type:"string"},{value:"exclamation-stamp",type:"string"},{value:"exclamation-triangle",type:"string"},{value:"exclamation-triangle-outline",type:"string"},{value:"eye",type:"string"},{value:"eye-slash",type:"string"},{value:"fax",type:"string"},{value:"fax-outline",type:"string"},{value:"file",type:"string"},{value:"file-cog",type:"string"},{value:"file-download",type:"string"},{value:"file-excel",type:"string"},{value:"file-excel-outline",type:"string"},{value:"file-outline",type:"string"},{value:"file-pdf",type:"string"},{value:"file-pdf-outline",type:"string"},{value:"file-text",type:"string"},{value:"file-text-outline",type:"string"},{value:"file-upload",type:"string"},{value:"file-word",type:"string"},{value:"file-word-outline",type:"string"},{value:"filter-outline",type:"string"},{value:"floppy-disk",type:"string"},{value:"floppy-disk-outline",type:"string"},{value:"folder",type:"string"},{value:"folder-check",type:"string"},{value:"folder-check-outline",type:"string"},{value:"folder-lines",type:"string"},{value:"folder-lines-outline",type:"string"},{value:"folder-link",type:"string"},{value:"folder-link-outline",type:"string"},{value:"folder-outline",type:"string"},{value:"folder-star",type:"string"},{value:"folders",type:"string"},{value:"folders-outline",type:"string"},{value:"gavel",type:"string"},{value:"gavel-outline",type:"string"},{value:"graduation-cap",type:"string"},{value:"graduation-cap-outline",type:"string"},{value:"hand-up",type:"string"},{value:"home",type:"string"},{value:"home-outline",type:"string"},{value:"info-circle",type:"string"},{value:"info-circle-outline",type:"string"},{value:"interrogation-circle",type:"string"},{value:"interrogation-circle-outline",type:"string"},{value:"laptop",type:"string"},{value:"life-ring",type:"string"},{value:"lines-rectangle",type:"string"},{value:"lines-rectangle-outline",type:"string"},{value:"list",type:"string"},{value:"location-outline",type:"string"},{value:"lock",type:"string"},{value:"lock-outline",type:"string"},{value:"log-in",type:"string"},{value:"log-out",type:"string"},{value:"magnifying-glass",type:"string"},{value:"mail",type:"string"},{value:"mail-outline",type:"string"},{value:"messages-square",type:"string"},{value:"messages-square-outline",type:"string"},{value:"mobile",type:"string"},{value:"mobile-outline",type:"string"},{value:"notes",type:"string"},{value:"notes-outline",type:"string"},{value:"paper-plane",type:"string"},{value:"paper-plane-slash",type:"string"},{value:"paperclip",type:"string"},{value:"pen",type:"string"},{value:"pen-circle",type:"string"},{value:"pen-fancy",type:"string"},{value:"pen-fancy-files-outline",type:"string"},{value:"pen-fancy-outline",type:"string"},{value:"pen-outline",type:"string"},{value:"phone",type:"string"},{value:"phone-outline",type:"string"},{value:"picture-outline",type:"string"},{value:"play-circle",type:"string"},{value:"plus",type:"string"},{value:"plus-circle",type:"string"},{value:"question-circle",type:"string"},{value:"share",type:"string"},{value:"share-outline",type:"string"},{value:"shuffle",type:"string"},{value:"sitemap",type:"string"},{value:"sliders",type:"string"},{value:"sliders-outline",type:"string"},{value:"squares",type:"string"},{value:"star",type:"string"},{value:"star-outline",type:"string"},{value:"tag",type:"string"},{value:"tags",type:"string"},{value:"thumb-down",type:"string"},{value:"thumb-down-outline",type:"string"},{value:"thumb-up",type:"string"},{value:"thumb-up-outline",type:"string"},{value:"thumbtack",type:"string"},{value:"thumbtack-outline",type:"string"},{value:"trash",type:"string"},{value:"trash-outline",type:"string"},{value:"universal-access",type:"string"},{value:"unlink",type:"string"},{value:"unlock",type:"string"},{value:"unlock-outline",type:"string"},{value:"upload",type:"string"},{value:"user",type:"string"},{value:"user-circle",type:"string"},{value:"user-group",type:"string"},{value:"user-lock",type:"string"},{value:"user-outline",type:"string"},{value:"user-pen-fancy-outline",type:"string"},{value:"user-plus",type:"string"},{value:"user-question-outline",type:"string"},{value:"user-shield-outline",type:"string"},{value:"users",type:"string"},{value:"users-outline",type:"string"},{value:"wallet",type:"string"},{type:'"wallet-outline"; }'}],optional:!0,required:!1},{name:"items",type:"MgActionMoreItemType[]",complexType:{original:"MgActionMoreItemType[]",resolved:"MgActionMoreItemType[]",references:{MgActionMoreItemType:{location:"import",path:"./mg-action-more.conf",id:"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreItemType"}}},mutable:!1,reflectToAttr:!1,docs:"Define the menu-items elements",docsTags:[],values:[{type:"MgActionMoreItemType[]"}],optional:!1,required:!0}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-icon","mg-popover","mg-button","mg-menu","mg-menu-item","mg-badge"],dependencyGraph:{"mg-action-more":["mg-icon","mg-popover","mg-button","mg-menu","mg-menu-item","mg-badge"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-menu":["mg-item-more"],"mg-item-more":["mg-menu-item","mg-icon","mg-menu"],"mg-menu-item":["mg-badge","mg-icon","mg-popover"]}},{filePath:"src/components/atoms/mg-badge/mg-badge.tsx",encapsulation:"shadow",tag:"mg-badge",readme:`## Design

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
Required for accessibility`,docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"outline",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"outline",reflectToAttr:!1,docs:"Define if button is using outline style",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"value",type:"number | string",complexType:{original:"string | number",resolved:"number | string",references:{}},mutable:!1,attr:"value",reflectToAttr:!1,docs:"Badge value",docsTags:[],values:[{type:"number"},{type:"string"}],optional:!1,required:!0},{name:"variant",type:'"danger" | "info" | "primary" | "secondary" | "success" | "text-color" | "warning"',complexType:{original:"BadgeVariantType",resolved:'"danger" | "info" | "primary" | "secondary" | "success" | "text-color" | "warning"',references:{BadgeVariantType:{location:"import",path:"./mg-badge.conf",id:"src/components/atoms/mg-badge/mg-badge.conf.ts::BadgeVariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define badge variant",docsTags:[],default:"variants[0]",values:[{value:"danger",type:"string"},{value:"info",type:"string"},{value:"primary",type:"string"},{value:"secondary",type:"string"},{value:"success",type:"string"},{value:"text-color",type:"string"},{value:"warning",type:"string"}],optional:!0,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-action-more","mg-menu-item","mg-tabs"],dependencies:[],dependencyGraph:{"mg-action-more":["mg-badge"],"mg-menu-item":["mg-badge"],"mg-tabs":["mg-badge"]}},{filePath:"src/components/atoms/mg-button/mg-button.tsx",encapsulation:"shadow",tag:"mg-button",readme:'## Usage\n\nA primary action button is, in most cases, unique on the screen, the other buttons must be displayed as "secondary", to highlight the primary action.\nEx: Validation, Save\n\nA tooltip must be displayed on hover when the button only displays a non-explicit icon, and has no label. The tooltip must indicate the action of the button.\n\nA button that launches a potentially long process is disabled and displays a loader for the duration of the process needs to use the `disable-on-click` attribute to ensure that the button is disabled when clicked.\n\nA button with undefined type in a form will natively have a [submit type](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button#attributs) and trigger form submission. So on non-submission buttons you need to explicitely set the type attribute as "button".\n\n## Specs\n\n![](./doc/img/mg-button-specs.png)\n\n## Placement\n\n![](./doc/img/mg-button-placement.png)\n\n## Theming\n\n![](./doc/img/mg-button-styles.png)\n\nFocused `mg-button` style is the one from the browser (outline).\n\n## Attributes combination: `disable-on-click` and `disabled`\n\nWhen a click is triggered, the component sets the `disabled` prop to true.\n\nTo benefit from a reactive `disabled` prop, you need to handle the `disabled-change` event.\n\nTo reset the loader after the process has completed, you need to set the `disabled` prop asynchronously.\n\n## CSS Variables\n\nIf needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:\n\n### Global\n\n- `--mg-button-border-radius`: define button border radius, default: `0.3rem`\n- `--mg-button-icon-border-radius`: define button border radius in icon mode, default: `--default-size`\n- `--mg-button-disabled-opacity`: define button opacity when disabled, default: `--mg-disabled-opacity`\n- `--mg-button-gradient`: define if button use gradient, possible values 0 (no gradient) or 1 (with gradient), default: `1`\n- `--mg-button-border-variation`: define if button has a border based on background color, possible values 0 (no border) or 1 (with border), default: `1`\n\n### Variant\n\nVariants `danger`, `danger-alt`, `info` and `success` can be customized by changing the global [colors](./?path=/docs/style-colors--docs).\n\n#### Primary\n\n- `--mg-button-primary-color-h`: define hue color value for primary button, default: `--color-dark-h`\n- `--mg-button-primary-color-s`: define saturation color value for primary button, default: `--color-dark-s`\n- `--mg-button-primary-color-l`: define lightness color value for primary button, default: `--color-dark-l`\n- `--mg-button-primary-font-color`: define font color for primary button, default: `--color-neutral`\n\n#### Secondary\n\n- `--mg-button-secondary-color-h`: define hue color value for secondary button, default: `--color-neutral-h`\n- `--mg-button-secondary-color-s`: define saturation color value for secondary button, default: `--color-neutral-s`\n- `--mg-button-secondary-color-l`: define lightness color value for secondary button, default: `--color-neutral-l`\n- `--mg-button-secondary-font-color`: define font color for secondary button, default: `--color-dark`\n',docs:`A primary action button is, in most cases, unique on the screen, the other buttons must be displayed as "secondary", to highlight the primary action.
Ex: Validation, Save

A tooltip must be displayed on hover when the button only displays a non-explicit icon, and has no label. The tooltip must indicate the action of the button.

A button that launches a potentially long process is disabled and displays a loader for the duration of the process needs to use the \`disable-on-click\` attribute to ensure that the button is disabled when clicked.

A button with undefined type in a form will natively have a [submit type](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button#attributs) and trigger form submission. So on non-submission buttons you need to explicitely set the type attribute as "button".`,docsTags:[{name:"slot",text:"- Button content"}],usage:{},props:[{name:"disableOnClick",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disable-on-click",reflectToAttr:!1,docs:`Option to set input disable on click, in order to prevent multi-click.
Parent component have to remove the attribute 'disabled' when the process ends.`,docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"disabled",reflectToAttr:!1,docs:"Disable button",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"form",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"form",reflectToAttr:!1,docs:"Define form id to attach button with.\nIf this attribute is not set, the `<button>` is associated with its ancestor `<form>` element.",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"fullWidth",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"full-width",reflectToAttr:!1,docs:"Set button to full-width",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"isIcon",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"is-icon",reflectToAttr:!1,docs:`Define if button is round.
Used for icon button.`,docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:`aria-label
In case button text is not explicit enough`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"type",type:'"button" | "reset" | "submit"',complexType:{original:"ButtonType",resolved:'"button" | "reset" | "submit"',references:{ButtonType:{location:"import",path:"./mg-button.conf",id:"src/components/atoms/mg-button/mg-button.conf.ts::ButtonType"}}},mutable:!1,attr:"type",reflectToAttr:!1,docs:"Define button type",docsTags:[],values:[{value:"button",type:"string"},{value:"reset",type:"string"},{value:"submit",type:"string"}],optional:!0,required:!1},{name:"variant",type:'"danger" | "danger-alt" | "flat" | "info" | "link" | "primary" | "secondary" | "success"',complexType:{original:"VariantType",resolved:'"danger" | "danger-alt" | "flat" | "info" | "link" | "primary" | "secondary" | "success"',references:{VariantType:{location:"import",path:"./mg-button.conf",id:"src/components/atoms/mg-button/mg-button.conf.ts::VariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define button variant",docsTags:[],default:"variants[0]",values:[{value:"danger",type:"string"},{value:"danger-alt",type:"string"},{value:"flat",type:"string"},{value:"info",type:"string"},{value:"link",type:"string"},{value:"primary",type:"string"},{value:"secondary",type:"string"},{value:"success",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"disabled-change",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgButtonElement['disabled']",resolved:"boolean",references:{HTMLMgButtonElement:{location:"global",id:"global::HTMLMgButtonElement"}}},cancelable:!0,composed:!0,docs:"Emmited event when disabled change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"",docs:"Button content"}],parts:[],dependents:["mg-action-more","mg-input-checkbox","mg-input-checkbox-paginated","mg-input-password","mg-message","mg-modal","mg-pagination","mg-panel","mg-popover-content"],dependencies:["mg-icon"],dependencyGraph:{"mg-button":["mg-icon"],"mg-action-more":["mg-button"],"mg-input-checkbox":["mg-button"],"mg-input-checkbox-paginated":["mg-button"],"mg-input-password":["mg-button"],"mg-message":["mg-button"],"mg-modal":["mg-button"],"mg-pagination":["mg-button"],"mg-panel":["mg-button"],"mg-popover-content":["mg-button"]}},{filePath:"src/components/atoms/mg-card/mg-card.tsx",encapsulation:"shadow",tag:"mg-card",readme:`## Specifications

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
`,docs:"",docsTags:[{name:"slot",text:"- Card content"}],usage:{},props:[{name:"variant",type:'"app" | "danger" | "info" | "success" | "warning"',complexType:{original:"undefined | VariantType",resolved:'"app" | "danger" | "info" | "success" | "warning"',references:{VariantType:{location:"import",path:"./mg-card.conf",id:"src/components/atoms/mg-card/mg-card.conf.ts::VariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define variant prop",docsTags:[],values:[{value:"app",type:"string"},{value:"danger",type:"string"},{value:"info",type:"string"},{value:"success",type:"string"},{value:"warning",type:"string"}],optional:!1,required:!1},{name:"variantStyle",type:'"bar-left" | "fill"',complexType:{original:"undefined | VariantStyleType",resolved:'"bar-left" | "fill"',references:{VariantStyleType:{location:"import",path:"./mg-card.conf",id:"src/components/atoms/mg-card/mg-card.conf.ts::VariantStyleType"}}},mutable:!0,attr:"variant-style",reflectToAttr:!1,docs:"Define variantStyle prop",docsTags:[],values:[{value:"bar-left",type:"string"},{value:"fill",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[{name:"",docs:"Card content"}],parts:[],dependents:["mg-message","mg-modal","mg-panel","mg-popover-content"],dependencies:[],dependencyGraph:{"mg-message":["mg-card"],"mg-modal":["mg-card"],"mg-panel":["mg-card"],"mg-popover-content":["mg-card"]}},{filePath:"src/components/atoms/mg-character-left/mg-character-left.tsx",encapsulation:"scoped",tag:"mg-character-left",readme:`## Design

This component display the number of characters left beside the max value length: \`{{number of characters left}}/{{max value length}}\`
`,docs:"This component display the number of characters left beside the max value length: `{{number of characters left}}/{{max value length}}`",docsTags:[],usage:{},props:[{name:"characters",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"characters",reflectToAttr:!1,docs:"Sets the characters to count",docsTags:[],default:"''",values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Sets an `id` attribute.\nNeeded by the input for accessibility `aria-decribedby`.",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"maxlength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"maxlength",reflectToAttr:!1,docs:"Add maximum length",docsTags:[],values:[{type:"number"}],optional:!1,required:!0}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-input-text","mg-input-textarea"],dependencies:[],dependencyGraph:{"mg-input-text":["mg-character-left"],"mg-input-textarea":["mg-character-left"]}},{filePath:"src/components/molecules/mg-details/mg-details.tsx",encapsulation:"shadow",tag:"mg-details",readme:`## Properties

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

## 💥 Troubleshooting

### How to resize the \`<iframe>\` element when the \`<mg-details>\` component is toggled?

You can use the external library \`iframe-resizer\`. When the library is instantiated in the \`window\`, it adds a new property \`parentIFrame\` which includes a \`size()\` method.

Then you can use \`window.parentIFrame.size()\` to manually trigger a resize on the \`iframe\` when the \`<mg-details>\` element's \`expanded\` property is toggled.

\`\`\`jsx
class MyComponent {
  [...] 
  #expanded = true;

  handleExpandedChange = () => {
    if (window.parentIFrame) {
      // This setTimeout is mandatory
      // We have to ensure that component resizing is done before triggering iframe resizing
      setTimeout(() => {
        window.parentIFrame.size()
      }, 0);
    }
  };

  render() {
    return (
      <mg-details
        [...]
        expanded={this.#expanded}
        on-expanded-change={this.handleExpandedChange}
      >
        [...]
      </mg-details>
    );
  }
}
\`\`\`
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
- the required fileds message`,docsTags:[],usage:{},props:[{name:"ariaRole",type:'"form" | "none" | "presentation" | "search"',complexType:{original:"AriaRoleType",resolved:'"form" | "none" | "presentation" | "search"',references:{AriaRoleType:{location:"import",path:"./mg-form.conf",id:"src/components/molecules/mg-form/mg-form.conf.ts::AriaRoleType"}}},mutable:!1,attr:"aria-role",reflectToAttr:!1,docs:"Define `<form/>` element aria role\nsee more about aria roles use case: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles",docsTags:[],values:[{value:"form",type:"string"},{value:"none",type:"string"},{value:"presentation",type:"string"},{value:"search",type:"string"}],optional:!0,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if form is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-form')",values:[{type:"string"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define form invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if slotted mg-component's label are displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if form is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"requiredMessage",type:'"default" | "hide"',complexType:{original:"RequiredMessageStatusType",resolved:'"default" | "hide"',references:{RequiredMessageStatusType:{location:"import",path:"./mg-form.conf",id:"src/components/molecules/mg-form/mg-form.conf.ts::RequiredMessageStatusType"}}},mutable:!1,attr:"required-message",reflectToAttr:!1,docs:`Define when required message is display.
When it is unset, component use it internal logic to manage "required message" help text display.
When you set the prop to \`default\`, you override the component internal logique to torce it display "required message" help text.
When you set the prop to \`hide\`, it will prevent the rendering of the message in the component's DOM.
As **this element is an accessibility requirement in the view**,
you **MUST*** re-implement this message on your own and display it when your form contains required inputs.`,docsTags:[],values:[{value:"default",type:"string"},{value:"hide",type:"string"}],optional:!0,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define form valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]}],events:[{event:"form-submit",detail:"boolean",bubbles:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},cancelable:!0,composed:!0,docs:"Emitted event on form submit",docsTags:[]},{event:"form-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgFormElement['valid']",resolved:"boolean",references:{HTMLMgFormElement:{location:"global",id:"global::HTMLMgFormElement"}}},cancelable:!0,composed:!0,docs:`Emitted event on form validity check
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

"variant" property applies [semantic color](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/style-colors--docs) or "app color" to the background of the icon with Lightness set to 90% 
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
`,docs:"",docsTags:[],usage:{},props:[{name:"icon",type:'"filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"',complexType:{original:"IconType",resolved:'"filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"',references:{IconType:{location:"import",path:"./mg-icon.conf",id:"src/components/atoms/mg-icon/mg-icon.conf.ts::IconType"}}},mutable:!1,attr:"icon",reflectToAttr:!1,docs:"Icon to display.",docsTags:[],values:[{value:"filter",type:"string"},{value:"copy",type:"string"},{value:"link",type:"string"},{value:"picture",type:"string"},{value:"table",type:"string"},{value:"circle",type:"string"},{value:"download",type:"string"},{value:"history",type:"string"},{value:"location",type:"string"},{value:"key",type:"string"},{value:"loader",type:"string"},{value:"address-card",type:"string"},{value:"align-center",type:"string"},{value:"align-justify",type:"string"},{value:"align-left",type:"string"},{value:"align-right",type:"string"},{value:"api",type:"string"},{value:"archive",type:"string"},{value:"archive-outline",type:"string"},{value:"arrow-clock",type:"string"},{value:"arrow-down",type:"string"},{value:"arrow-down-a-z",type:"string"},{value:"arrow-down-right",type:"string"},{value:"arrow-left",type:"string"},{value:"arrow-right",type:"string"},{value:"arrow-rotate",type:"string"},{value:"arrow-rotate-backward",type:"string"},{value:"arrow-up",type:"string"},{value:"arrow-up-right",type:"string"},{value:"arrow-up-right-square",type:"string"},{value:"arrow-up-z-a",type:"string"},{value:"arrows-compare",type:"string"},{value:"arrows-right-down",type:"string"},{value:"arrows-right-left",type:"string"},{value:"arrows-rotate",type:"string"},{value:"arrows-rotate-backward",type:"string"},{value:"ban",type:"string"},{value:"bell",type:"string"},{value:"bell-outline",type:"string"},{value:"book",type:"string"},{value:"book-outline",type:"string"},{value:"briefcase",type:"string"},{value:"briefcase-outline",type:"string"},{value:"building-outline",type:"string"},{value:"calculator",type:"string"},{value:"calendar",type:"string"},{value:"calendar-euro",type:"string"},{value:"calendar-euro-outline",type:"string"},{value:"calendar-outline",type:"string"},{value:"check",type:"string"},{value:"check-circle",type:"string"},{value:"check-circle-outline",type:"string"},{value:"chevron-down",type:"string"},{value:"chevron-down-circle",type:"string"},{value:"chevron-left",type:"string"},{value:"chevron-left-circle",type:"string"},{value:"chevron-right",type:"string"},{value:"chevron-right-circle",type:"string"},{value:"chevron-up",type:"string"},{value:"chevron-up-circle",type:"string"},{value:"clock",type:"string"},{value:"clock-outline",type:"string"},{value:"code-square-outline",type:"string"},{value:"cog",type:"string"},{value:"cog-outline",type:"string"},{value:"comment",type:"string"},{value:"comment-outline",type:"string"},{value:"comment-sms",type:"string"},{value:"conversation",type:"string"},{value:"conversation-outline",type:"string"},{value:"copy-file",type:"string"},{value:"copy-file-outline",type:"string"},{value:"copy-outline",type:"string"},{value:"credit-card",type:"string"},{value:"cross",type:"string"},{value:"cross-circle",type:"string"},{value:"cross-circle-outline",type:"string"},{value:"dashboard",type:"string"},{value:"dashboard-outline",type:"string"},{value:"earth",type:"string"},{value:"earth-outline",type:"string"},{value:"ellipsis",type:"string"},{value:"ellipsis-vertical",type:"string"},{value:"euro",type:"string"},{value:"euro-circle",type:"string"},{value:"exclamation-circle",type:"string"},{value:"exclamation-circle-outline",type:"string"},{value:"exclamation-stamp",type:"string"},{value:"exclamation-triangle",type:"string"},{value:"exclamation-triangle-outline",type:"string"},{value:"eye",type:"string"},{value:"eye-slash",type:"string"},{value:"fax",type:"string"},{value:"fax-outline",type:"string"},{value:"file",type:"string"},{value:"file-cog",type:"string"},{value:"file-download",type:"string"},{value:"file-excel",type:"string"},{value:"file-excel-outline",type:"string"},{value:"file-outline",type:"string"},{value:"file-pdf",type:"string"},{value:"file-pdf-outline",type:"string"},{value:"file-text",type:"string"},{value:"file-text-outline",type:"string"},{value:"file-upload",type:"string"},{value:"file-word",type:"string"},{value:"file-word-outline",type:"string"},{value:"filter-outline",type:"string"},{value:"floppy-disk",type:"string"},{value:"floppy-disk-outline",type:"string"},{value:"folder",type:"string"},{value:"folder-check",type:"string"},{value:"folder-check-outline",type:"string"},{value:"folder-lines",type:"string"},{value:"folder-lines-outline",type:"string"},{value:"folder-link",type:"string"},{value:"folder-link-outline",type:"string"},{value:"folder-outline",type:"string"},{value:"folder-star",type:"string"},{value:"folders",type:"string"},{value:"folders-outline",type:"string"},{value:"gavel",type:"string"},{value:"gavel-outline",type:"string"},{value:"graduation-cap",type:"string"},{value:"graduation-cap-outline",type:"string"},{value:"hand-up",type:"string"},{value:"home",type:"string"},{value:"home-outline",type:"string"},{value:"info-circle",type:"string"},{value:"info-circle-outline",type:"string"},{value:"interrogation-circle",type:"string"},{value:"interrogation-circle-outline",type:"string"},{value:"laptop",type:"string"},{value:"life-ring",type:"string"},{value:"lines-rectangle",type:"string"},{value:"lines-rectangle-outline",type:"string"},{value:"list",type:"string"},{value:"location-outline",type:"string"},{value:"lock",type:"string"},{value:"lock-outline",type:"string"},{value:"log-in",type:"string"},{value:"log-out",type:"string"},{value:"magnifying-glass",type:"string"},{value:"mail",type:"string"},{value:"mail-outline",type:"string"},{value:"messages-square",type:"string"},{value:"messages-square-outline",type:"string"},{value:"mobile",type:"string"},{value:"mobile-outline",type:"string"},{value:"notes",type:"string"},{value:"notes-outline",type:"string"},{value:"paper-plane",type:"string"},{value:"paper-plane-slash",type:"string"},{value:"paperclip",type:"string"},{value:"pen",type:"string"},{value:"pen-circle",type:"string"},{value:"pen-fancy",type:"string"},{value:"pen-fancy-files-outline",type:"string"},{value:"pen-fancy-outline",type:"string"},{value:"pen-outline",type:"string"},{value:"phone",type:"string"},{value:"phone-outline",type:"string"},{value:"picture-outline",type:"string"},{value:"play-circle",type:"string"},{value:"plus",type:"string"},{value:"plus-circle",type:"string"},{value:"question-circle",type:"string"},{value:"share",type:"string"},{value:"share-outline",type:"string"},{value:"shuffle",type:"string"},{value:"sitemap",type:"string"},{value:"sliders",type:"string"},{value:"sliders-outline",type:"string"},{value:"squares",type:"string"},{value:"star",type:"string"},{value:"star-outline",type:"string"},{value:"tag",type:"string"},{value:"tags",type:"string"},{value:"thumb-down",type:"string"},{value:"thumb-down-outline",type:"string"},{value:"thumb-up",type:"string"},{value:"thumb-up-outline",type:"string"},{value:"thumbtack",type:"string"},{value:"thumbtack-outline",type:"string"},{value:"trash",type:"string"},{value:"trash-outline",type:"string"},{value:"universal-access",type:"string"},{value:"unlink",type:"string"},{value:"unlock",type:"string"},{value:"unlock-outline",type:"string"},{value:"upload",type:"string"},{value:"user",type:"string"},{value:"user-circle",type:"string"},{value:"user-group",type:"string"},{value:"user-lock",type:"string"},{value:"user-outline",type:"string"},{value:"user-pen-fancy-outline",type:"string"},{value:"user-plus",type:"string"},{value:"user-question-outline",type:"string"},{value:"user-shield-outline",type:"string"},{value:"users",type:"string"},{value:"users-outline",type:"string"},{value:"wallet",type:"string"},{value:"wallet-outline",type:"string"}],optional:!1,required:!0},{name:"size",type:'"extra-large" | "large" | "medium" | "regular" | "small"',complexType:{original:"IconSizeType",resolved:'"extra-large" | "large" | "medium" | "regular" | "small"',references:{IconSizeType:{location:"import",path:"./mg-icon.conf",id:"src/components/atoms/mg-icon/mg-icon.conf.ts::IconSizeType"}}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define icon size",docsTags:[],default:"'regular'",values:[{value:"extra-large",type:"string"},{value:"large",type:"string"},{value:"medium",type:"string"},{value:"regular",type:"string"},{value:"small",type:"string"}],optional:!1,required:!1},{name:"spin",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"spin",reflectToAttr:!1,docs:"Make the icon spin",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"variant",type:'"app" | "danger" | "info" | "success" | "warning"',complexType:{original:"IconVariantType",resolved:'"app" | "danger" | "info" | "success" | "warning"',references:{IconVariantType:{location:"import",path:"./mg-icon.conf",id:"src/components/atoms/mg-icon/mg-icon.conf.ts::IconVariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define icon variant color",docsTags:[],values:[{value:"app",type:"string"},{value:"danger",type:"string"},{value:"info",type:"string"},{value:"success",type:"string"},{value:"warning",type:"string"}],optional:!0,required:!1},{name:"variantStyle",type:'"background" | "full" | "icon"',complexType:{original:"IconVariantStyleType",resolved:'"background" | "full" | "icon"',references:{IconVariantStyleType:{location:"import",path:"./mg-icon.conf",id:"src/components/atoms/mg-icon/mg-icon.conf.ts::IconVariantStyleType"}}},mutable:!0,attr:"variant-style",reflectToAttr:!1,docs:`Define icon color variant style
Add a color to the icon based on variant color with given style
'full': Used to set a circular background with variant soft color and icon variant color
'background': Used to set a circular background with variant soft color
'icon': Used to set a color only to the icon`,docsTags:[],values:[{value:"background",type:"string"},{value:"full",type:"string"},{value:"icon",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-action-more","mg-button","mg-details","mg-input","mg-input-checkbox","mg-input-checkbox-paginated","mg-input-password","mg-input-text","mg-item-more","mg-loader","mg-menu-item","mg-message","mg-modal","mg-pagination","mg-panel","mg-popover-content","mg-tabs"],dependencies:[],dependencyGraph:{"mg-action-more":["mg-icon"],"mg-button":["mg-icon"],"mg-details":["mg-icon"],"mg-input":["mg-icon"],"mg-input-checkbox":["mg-icon"],"mg-input-checkbox-paginated":["mg-icon"],"mg-input-password":["mg-icon"],"mg-input-text":["mg-icon"],"mg-item-more":["mg-icon"],"mg-loader":["mg-icon"],"mg-menu-item":["mg-icon"],"mg-message":["mg-icon"],"mg-modal":["mg-icon"],"mg-pagination":["mg-icon"],"mg-panel":["mg-icon"],"mg-popover-content":["mg-icon"],"mg-tabs":["mg-icon"]}},{filePath:"src/components/molecules/mg-illustrated-message/mg-illustrated-message.tsx",encapsulation:"shadow",tag:"mg-illustrated-message",readme:`## Specs

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
`,docs:"",docsTags:[],usage:{},props:[{name:"direction",type:'"horizontal" | "vertical"',complexType:{original:"'vertical' | 'horizontal'",resolved:'"horizontal" | "vertical"',references:{}},mutable:!1,attr:"direction",reflectToAttr:!1,docs:"Define component orientation",docsTags:[],default:"'vertical'",values:[{value:"horizontal",type:"string"},{value:"vertical",type:"string"}],optional:!1,required:!1},{name:"size",type:'"regular" | "small"',complexType:{original:"'regular' | 'small'",resolved:'"regular" | "small"',references:{}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define illustration size",docsTags:[],default:"'regular'",values:[{value:"regular",type:"string"},{value:"small",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:[],dependencyGraph:{}},{filePath:"src/components/molecules/inputs/mg-input/mg-input.tsx",encapsulation:"shadow",tag:"mg-input",readme:`
## UX

### Label

- The label is located on the left of the input field.
- The text is to be right aligned.
- The label can be on one or more lines.
- The label can be positioned above the input field.

### Input help

The message displayed indicates the format expected by the input field "example: email@provider.com" or "expected format: DD/MM/YYYY (ex: 13/04/2019)"

### Message order

When the messages are displayed under the field the order is as follows:

1. input help
2. error

### Placeholder

The placeholder should not be used as an input help.  
♿ RGAA: The placeholder is not considered a valid label under the RGAA so is not subject to a contrast ratio.

### Read only

- The value is no longer editable.
- The input field no longer has a border or background.
- The value is displayed in bold.
- If there is no value entered, nothing is displayed.

### Required field

The asterisk is displayed regardless of the status of the field: input, read-only, disabled.

### Pattern

Please ensure to consider this when using regular expressions in your components.

Since mid-2023, there have been updates to the regular expressions used in native inputs. Browsers now uses the 'v' flag instead of the 'u' flag.  
Consequently, all literal characters must be escaped, and there's no longer a need to use the \`^\` and \`$\` characters to indicate the start and end of the string.

For exemple this RegExp working using the 'u' flag \`^[\\d ()+]*$\` should be converted to the corresponding 'v' flag \`[\\d\\s\\(\\)\\+]\` on our components. You can get more info on the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern#overview).

If needed, this library has been identified for converting regular expressions: [regexpu-core](https://www.npmjs.com/package/regexpu-core).

## Specs

### Positioning of "i" icon

![](./doc/img/mg-input-tooltip-position.png)

By default, the "i" icon is positioned next to the input field.

You can position it next to the label by using the \`tooltip-placement\` prop with the value \`label\`.

When \`label-on-top\` is enabled, the "i" icon moves next to the label, overriding the \`tooltip-placement\` setting.

When the \`label-hide\` prop is enabled, the "i" icon moves next to the input, overriding the \`tooltip-placement\` setting.

### Value positioning

By default, the value is left aligned, you can change the CSS variable \`--mg-inputs-text-align\` to right align.

### Responsive

![](./doc/img/mg-input-responsive.png)

When the viewport width is less than 768px, the label is stacked above the input field.

If you are creating a form that combines mg-components inputs with inputs from one of our legacy libraries (such as form, ui-components, ui-components-vuejs), please refer to [this section on mg-form](.?path=/docs/molecules-mg-form--docs#combining-mg-input--with-legacy-libraries).

### Errors

Input field border and error message text are in [@color-danger](./?path=/docs/style-colors--docs).  
Error message background is a variant of [@color-danger](./?path=/docs/style-colors--docs) : #FEF6F6 or HSL (357,80%,98%).

## Behavior

### Errors

Error is triggered and displayed when we leave the input field.

When we enter in an input field with an error its state is checked everytime the user update its content, when the error is fixed the message disapears.

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-inputs-text-align\`: Define input text alignement, numeric input default is \`right\`, others inputs default is \`left\`
- \`--mg-inputs-border-width\`: Define input border witdh, default: \`0.1rem\`
- \`--mg-inputs-border-radius\`: Define input border radius, default: \`0.3rem\`
- \`--mg-inputs-color\`: Define input border an placeholder color, default: \`#b5c2c9\`
- \`--mg-inputs-spacer\`: Define input space between label, input, tooltip, etc., default: \`1rem\`
- \`--mg-inputs-error-bg-color\`: Define input error message backround color, default: \`var(--color-danger-h), calc(var(--color-danger-s) + 5%), calc(var(--color-danger-l) + 49%)\`
- \`--mg-inputs-color-shadow-focus-hsl\`: Define input shadow when focused, default: \`188, 100%, 50%\`
- \`--mg-inputs-title-width\`: Define input label width, default: \`23rem\`
- \`--mg-inputs-margin-bottom\`: Define input bottom margin, default: \`1.5rem\`
- \`--mg-inputs-title-horizontal-space\`: Define space between label and input when inside a \`mg-form\`, default: \`3rem\`


If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-inputs-text-align\`: Define input text alignement, numeric input default is \`right\`, others inputs default is \`left\`
- \`--mg-inputs-border-width\`: Define input border witdh, default: \`0.1rem\`
- \`--mg-inputs-border-radius\`: Define input border radius, default: \`0.3rem\`
- \`--mg-inputs-color\`: Define input border an placeholder color, default: \`#b5c2c9\`
- \`--mg-inputs-spacer\`: Define input space between label, input, tooltip, etc., default: \`1rem\`
- \`--mg-inputs-error-bg-color\`: Define input error message backround color, default: \`var(--color-danger-h), calc(var(--color-danger-s) + 5%), calc(var(--color-danger-l) + 49%)\`
- \`--mg-inputs-color-shadow-focus-hsl\`: Define input shadow when focused, default: \`188, 100%, 50%\`
- \`--mg-inputs-title-width\`: Define input label width, default: \`23rem\`
- \`--mg-inputs-margin-bottom\`: Define input bottom margin, default: \`1.5rem\`
- \`--mg-inputs-title-horizontal-space\`: Define space between label and input when inside a \`mg-form\`, default: \`3rem\`
`,docs:"",docsTags:[{name:"slot",text:"- Input content"},{name:"slot",text:"label - Label content"},{name:"slot",text:"help-text - Help text content"},{name:"slot",text:"error - error content"}],usage:{},props:[{name:"ariaDescribedbyIDs",type:"string[]",complexType:{original:"string[]",resolved:"string[]",references:{}},mutable:!1,reflectToAttr:!1,docs:"Define aria-describedby ids to link with",docsTags:[],values:[{type:"string[]"}],optional:!1,required:!1},{name:"errorMessage",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"error-message",reflectToAttr:!1,docs:"Define error message to display",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Define help text to display",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Define input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"readonlyValue",type:"string | string[]",complexType:{original:"string | string[]",resolved:"string | string[]",references:{}},mutable:!1,attr:"readonly-value",reflectToAttr:!1,docs:"Defines value to display in readonly mode",docsTags:[],values:[{type:"string"},{type:"string[]"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"./mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[{name:"",docs:"Input content"},{name:"error",docs:"error content"},{name:"help-text",docs:"Help text content"},{name:"label",docs:"Label content"}],parts:[],dependents:["mg-input-checkbox","mg-input-date","mg-input-numeric","mg-input-password","mg-input-radio","mg-input-select","mg-input-text","mg-input-textarea","mg-input-toggle"],dependencies:["mg-tooltip","mg-icon","mg-input-title"],dependencyGraph:{"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-input-checkbox":["mg-input"],"mg-input-date":["mg-input"],"mg-input-numeric":["mg-input"],"mg-input-password":["mg-input"],"mg-input-radio":["mg-input"],"mg-input-select":["mg-input"],"mg-input-text":["mg-input"],"mg-input-textarea":["mg-input"],"mg-input-toggle":["mg-input"]}},{filePath:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.tsx",encapsulation:"shadow",tag:"mg-input-checkbox",readme:`## Usage

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
This prop is only applied with prop type "multi" or when an "unset" mode render a "multi" type.`,docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"inputVerticalList",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"input-vertical-list",reflectToAttr:!1,docs:"Define if inputs are display verticaly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Define input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Define input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if mg-input-checkbox is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if mg-input-checkbox is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"type",type:'"checkbox" | "multi"',complexType:{original:"CheckboxType",resolved:'"checkbox" | "multi"',references:{CheckboxType:{location:"import",path:"./mg-input-checkbox.conf",id:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxType"}}},mutable:!0,attr:"type",reflectToAttr:!1,docs:`Define checkbox type
When it's undefined the type is dynamic:
- With 0-5 items type is 'checkbox'
- With 5-10 items type is 'multi'
When it set the type is locked to the defined value.
When type is dynamic OR with 'multi' type AND Over 10 items "search" feature is enabled`,docsTags:[],values:[{value:"checkbox",type:"string"},{value:"multi",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"CheckboxValue[]",complexType:{original:"CheckboxValue[]",resolved:"CheckboxValue[]",references:{CheckboxValue:{location:"import",path:"./mg-input-checkbox.conf",id:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxValue"}}},mutable:!0,reflectToAttr:!1,docs:"Component value\nIf item.value is `null`, checkbox will be indeterminate by default",docsTags:[],values:[{type:"CheckboxValue[]"}],optional:!1,required:!0}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:'(valid: MgInputCheckbox["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputCheckbox:{location:"global",id:"global::MgInputCheckbox"}},return:"Promise<void>"},signature:'setError(valid: MgInputCheckbox["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxElement['valid']",resolved:"boolean",references:{HTMLMgInputCheckboxElement:{location:"global",id:"global::HTMLMgInputCheckboxElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"CheckboxValue[]",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxElement['value']",resolved:"CheckboxValue[]",references:{HTMLMgInputCheckboxElement:{location:"global",id:"global::HTMLMgInputCheckboxElement"}}},cancelable:!0,composed:!0,docs:"Emitted event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-input-checkbox-paginated","mg-popover","mg-button","mg-icon","mg-input-text","mg-input"],dependencyGraph:{"mg-input-checkbox":["mg-input-checkbox-paginated","mg-popover","mg-button","mg-icon","mg-input-text","mg-input"],"mg-input-checkbox-paginated":["mg-button","mg-icon","mg-tooltip","mg-pagination"],"mg-button":["mg-icon"],"mg-tooltip":["mg-tooltip-content"],"mg-pagination":["mg-button","mg-icon","mg-input-select"],"mg-input-select":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-input-text":["mg-input","mg-icon","mg-character-left"]}},{filePath:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox-paginated/mg-input-checkbox-paginated.tsx",encapsulation:"scoped",tag:"mg-input-checkbox-paginated",readme:`# mg-input-checkbox-paginated


`,docs:"Internal component use to manage sections instances",docsTags:[],usage:{},props:[{name:"checkboxes",type:"CheckboxItem[]",complexType:{original:"CheckboxItem[]",resolved:"CheckboxItem[]",references:{CheckboxItem:{location:"import",path:"../mg-input-checkbox.conf",id:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxItem"}}},mutable:!1,reflectToAttr:!1,docs:"Define checkboxes to paginate",docsTags:[],default:"[]",values:[{type:"CheckboxItem[]"}],optional:!1,required:!1},{name:"currentPage",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!0,attr:"current-page",reflectToAttr:!1,docs:"Current page",docsTags:[],default:"1",values:[{type:"number"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if mg-input-checkbox-list is disabled",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"invalid",reflectToAttr:!1,docs:"Define mg-input-checkbox input invalid",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"messages",type:"{ [x: string]: string; }",complexType:{original:"Record<string, string>",resolved:"{ [x: string]: string; }",references:{Record:{location:"global",id:"global::Record"}}},mutable:!1,reflectToAttr:!1,docs:"Define component message",docsTags:[],values:[{type:"{ [x: string]: string; }"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:"Define mg-input-checkbox input name",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if mg-input-checkbox-list is readonly",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"sectionKind",type:"SectionKind.NOT_SELECTED | SectionKind.SELECTED",complexType:{original:"SectionKind",resolved:"SectionKind.NOT_SELECTED | SectionKind.SELECTED",references:{SectionKind:{location:"import",path:"../mg-input-checkbox.conf",id:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::SectionKind"}}},mutable:!1,attr:"section-kind",reflectToAttr:!1,docs:"Define section kind",docsTags:[],values:[{type:"SectionKind.NOT_SELECTED"},{type:"SectionKind.SELECTED"}],optional:!0,required:!1}],methods:[],events:[{event:"mass-action",detail:"SectionKind.NOT_SELECTED | SectionKind.SELECTED",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxPaginatedElement['sectionKind']",resolved:"SectionKind.NOT_SELECTED | SectionKind.SELECTED",references:{HTMLMgInputCheckboxPaginatedElement:{location:"global",id:"global::HTMLMgInputCheckboxPaginatedElement"}}},cancelable:!0,composed:!0,docs:`Emit 'mass-action' event
used to informe that select-all/unselect-all button listner is triggered`,docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-input-checkbox"],dependencies:["mg-button","mg-icon","mg-tooltip","mg-pagination"],dependencyGraph:{"mg-input-checkbox-paginated":["mg-button","mg-icon","mg-tooltip","mg-pagination"],"mg-button":["mg-icon"],"mg-tooltip":["mg-tooltip-content"],"mg-pagination":["mg-button","mg-icon","mg-input-select"],"mg-input-select":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-input-checkbox":["mg-input-checkbox-paginated"]}},{filePath:"src/components/molecules/inputs/mg-input-date/mg-input-date.tsx",encapsulation:"shadow",tag:"mg-input-date",readme:`## Behavior

The behavior is the native behavior of the browser.

### Theming

Calendar and trigger: The style is the browser's native style.
`,docs:"The behavior is the native behavior of the browser.",docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example\nAvailable string variables:\n - `{pattern}`: render innerHTML pattern based on system\n - `{date}`: render innerText date with a pattern base format.\n - `{defaultHelpText}`: render default `helpText` usefull to concat helpText local with your custom text.\nex: `Input use {pattern} pattern` as `helpText` prop value will be render as `Input use mm/dd/yyyy pattern`",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"max",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"max",reflectToAttr:!1,docs:`Define input maximum date
format: yyyy-mm-dd`,docsTags:[],default:"'9999-12-31'",values:[{type:"string"}],optional:!0,required:!1},{name:"min",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"min",reflectToAttr:!1,docs:`Define input minimum date
format: yyyy-mm-dd`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:'(valid: MgInputDate["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputDate:{location:"global",id:"global::MgInputDate"}},return:"Promise<void>"},signature:'setError(valid: MgInputDate["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputDateElement['valid']",resolved:"boolean",references:{HTMLMgInputDateElement:{location:"global",id:"global::HTMLMgInputDateElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgInputDateElement['value']",resolved:"string",references:{HTMLMgInputDateElement:{location:"global",id:"global::HTMLMgInputDateElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-input"],dependencyGraph:{"mg-input-date":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.tsx",encapsulation:"shadow",tag:"mg-input-numeric",readme:`## Usage

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

It is possible to specify a unit after the field for integers and decimals. For currencies, the symbol is positioned in the input field.`,docsTags:[{name:"slot",text:"append-input - Content to display next to the input"}],usage:{},props:[{name:"currency",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"currency",reflectToAttr:!1,docs:"Define currency",docsTags:[],default:"'USD'",values:[{type:"string"}],optional:!1,required:!1},{name:"decimalLength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"decimal-length",reflectToAttr:!1,docs:`Override decimal length
decimal is the number after the decimal point`,docsTags:[],default:"2",values:[{type:"number"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"format",type:'"currency" | "none" | "number"',complexType:{original:"Format",resolved:'"currency" | "none" | "number"',references:{Format:{location:"import",path:"./mg-input-numeric.conf",id:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts::Format"}}},mutable:!0,attr:"format",reflectToAttr:!1,docs:"Set local formatting.\nNumbers are formatted based on the locale.\nWhen type is set to `currency`, formatting has no effect.",docsTags:[],default:"'number'",values:[{value:"currency",type:"string"},{value:"none",type:"string"},{value:"number",type:"string"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"integerLength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"integer-length",reflectToAttr:!1,docs:`Override integer length
integer is the number before the decimal point`,docsTags:[],default:"13",values:[{type:"number"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input pattern error message",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"max",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"max",reflectToAttr:!1,docs:"Maximum value",docsTags:[],values:[{type:"number"}],optional:!0,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!1,docs:"Define input width",docsTags:[],values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!0,required:!1},{name:"min",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"min",reflectToAttr:!1,docs:"Minimum value",docsTags:[],values:[{type:"number"}],optional:!0,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"type",type:'"currency" | "decimal" | "integer"',complexType:{original:"NumericType",resolved:'"currency" | "decimal" | "integer"',references:{NumericType:{location:"import",path:"./mg-input-numeric.conf",id:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts::NumericType"}}},mutable:!1,attr:"type",reflectToAttr:!1,docs:"Define numeric type",docsTags:[],default:"'decimal'",values:[{value:"currency",type:"string"},{value:"decimal",type:"string"},{value:"integer",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input pattern to validate",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:'(valid: MgInputNumeric["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputNumeric:{location:"global",id:"global::MgInputNumeric"}},return:"Promise<void>"},signature:'setError(valid: MgInputNumeric["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputNumericElement['valid']",resolved:"boolean",references:{HTMLMgInputNumericElement:{location:"global",id:"global::HTMLMgInputNumericElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"number",bubbles:!0,complexType:{original:"number",resolved:"number",references:{}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"append-input",docs:"Content to display next to the input"}],parts:[],dependents:[],dependencies:["mg-input"],dependencyGraph:{"mg-input-numeric":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/inputs/mg-input-password/mg-input-password.tsx",encapsulation:"shadow",tag:"mg-input-password",readme:`## Design

The standard display of "bullets" instead of characters is the standard one (depending on the rendering of the used browser).
`,docs:'The standard display of "bullets" instead of characters is the standard one (depending on the rendering of the used browser).',docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"maxlength",type:"any",complexType:{original:"any",resolved:"any",references:{}},mutable:!1,attr:"maxlength",reflectToAttr:!1,docs:"Input max length",docsTags:[],values:[{type:"any"}],optional:!1,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!1,docs:"Define input width",docsTags:[],default:"'full'",values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:'(valid: MgInputPassword["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputPassword:{location:"global",id:"global::MgInputPassword"}},return:"Promise<void>"},signature:'setError(valid: MgInputPassword["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputPasswordElement['valid']",resolved:"boolean",references:{HTMLMgInputPasswordElement:{location:"global",id:"global::HTMLMgInputPasswordElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgInputPasswordElement['value']",resolved:"string",references:{HTMLMgInputPasswordElement:{location:"global",id:"global::HTMLMgInputPasswordElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-input","mg-button","mg-icon"],dependencyGraph:{"mg-input-password":["mg-input","mg-button","mg-icon"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-button":["mg-icon"]}},{filePath:"src/components/molecules/inputs/mg-input-radio/mg-input-radio.tsx",encapsulation:"shadow",tag:"mg-input-radio",readme:`## Usage

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
- The group can be initialized without any default value`,docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"inputVerticalList",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"input-vertical-list",reflectToAttr:!1,docs:"Define if inputs are display verticaly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"items",type:"RadioOption[] | string[]",complexType:{original:"string[] | RadioOption[]",resolved:"RadioOption[] | string[]",references:{RadioOption:{location:"import",path:"./mg-input-radio.conf",id:"src/components/molecules/inputs/mg-input-radio/mg-input-radio.conf.ts::RadioOption"}}},mutable:!1,reflectToAttr:!1,docs:"Items are the possible options to select",docsTags:[],values:[{type:"RadioOption[]"},{type:"string[]"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"any",complexType:{original:"any",resolved:"any",references:{}},mutable:!0,attr:"value",reflectToAttr:!1,docs:"Component value",docsTags:[],values:[{type:"any"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:'(valid: MgInputRadio["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputRadio:{location:"global",id:"global::MgInputRadio"}},return:"Promise<void>"},signature:'setError(valid: MgInputRadio["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputRadioElement['valid']",resolved:"boolean",references:{HTMLMgInputRadioElement:{location:"global",id:"global::HTMLMgInputRadioElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"any",bubbles:!0,complexType:{original:"HTMLMgInputRadioElement['value']",resolved:"any",references:{HTMLMgInputRadioElement:{location:"global",id:"global::HTMLMgInputRadioElement"}}},cancelable:!0,composed:!0,docs:"Emitted event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-input"],dependencyGraph:{"mg-input-radio":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/inputs/mg-input-select/mg-input-select.tsx",encapsulation:"shadow",tag:"mg-input-select",readme:`## Design

The placeholder of the list is "Select a value".

The behavior, style and position of the chevron on the right of the field are those of the native browser.  
The spacing between the text and the chevron is at least 10px.

### Sizing

The width of the component is defined by the largest option of the options.
`,docs:`The placeholder of the list is "Select a value".

The behavior, style and position of the chevron on the right of the field are those of the native browser.  
The spacing between the text and the chevron is at least 10px.`,docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"items",type:"(string | SelectOption)[]",complexType:{original:"(string | SelectOption)[]",resolved:"(string | SelectOption)[]",references:{SelectOption:{location:"import",path:"./mg-input-select.conf",id:"src/components/molecules/inputs/mg-input-select/mg-input-select.conf.ts::SelectOption"}}},mutable:!1,reflectToAttr:!1,docs:"Items are the possible options to select",docsTags:[],values:[{type:"(string"},{type:"SelectOption)[]"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!0,docs:"Define input width",docsTags:[],values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"placeholderDisabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"placeholder-disabled",reflectToAttr:!1,docs:"Option to disable placeholder",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"placeholderHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"placeholder-hide",reflectToAttr:!1,docs:"Option to remove placeholder",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"any",complexType:{original:"any",resolved:"any",references:{}},mutable:!0,attr:"value",reflectToAttr:!1,docs:"Component value",docsTags:[],values:[{type:"any"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:'(valid: MgInputSelect["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputSelect:{location:"global",id:"global::MgInputSelect"}},return:"Promise<void>"},signature:'setError(valid: MgInputSelect["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxElement['valid']",resolved:"boolean",references:{HTMLMgInputCheckboxElement:{location:"global",id:"global::HTMLMgInputCheckboxElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"CheckboxValue[]",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxElement['value']",resolved:"CheckboxValue[]",references:{HTMLMgInputCheckboxElement:{location:"global",id:"global::HTMLMgInputCheckboxElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-pagination"],dependencies:["mg-input"],dependencyGraph:{"mg-input-select":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-pagination":["mg-input-select"]}},{filePath:"src/components/molecules/inputs/mg-input-text/mg-input-text.tsx",encapsulation:"shadow",tag:"mg-input-text",readme:`## Design

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
`,docs:"",docsTags:[{name:"slot",text:"append-input - Content to display next to the input"}],usage:{},props:[{name:"datalistoptions",type:"string[]",complexType:{original:"string[]",resolved:"string[]",references:{}},mutable:!1,reflectToAttr:!1,docs:"Define datalist options",docsTags:[],values:[{type:"string[]"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"displayCharacterLeft",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"display-character-left",reflectToAttr:!1,docs:"Define if component should display character left",docsTags:[],default:"true",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"icon",type:'"filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"',complexType:{original:"IconType",resolved:'"filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"',references:{IconType:{location:"import",path:"../../../../components",id:"src/components.d.ts::IconType"}}},mutable:!1,attr:"icon",reflectToAttr:!1,docs:"Input icon",docsTags:[],values:[{value:"filter",type:"string"},{value:"copy",type:"string"},{value:"link",type:"string"},{value:"picture",type:"string"},{value:"table",type:"string"},{value:"circle",type:"string"},{value:"download",type:"string"},{value:"history",type:"string"},{value:"location",type:"string"},{value:"key",type:"string"},{value:"loader",type:"string"},{value:"address-card",type:"string"},{value:"align-center",type:"string"},{value:"align-justify",type:"string"},{value:"align-left",type:"string"},{value:"align-right",type:"string"},{value:"api",type:"string"},{value:"archive",type:"string"},{value:"archive-outline",type:"string"},{value:"arrow-clock",type:"string"},{value:"arrow-down",type:"string"},{value:"arrow-down-a-z",type:"string"},{value:"arrow-down-right",type:"string"},{value:"arrow-left",type:"string"},{value:"arrow-right",type:"string"},{value:"arrow-rotate",type:"string"},{value:"arrow-rotate-backward",type:"string"},{value:"arrow-up",type:"string"},{value:"arrow-up-right",type:"string"},{value:"arrow-up-right-square",type:"string"},{value:"arrow-up-z-a",type:"string"},{value:"arrows-compare",type:"string"},{value:"arrows-right-down",type:"string"},{value:"arrows-right-left",type:"string"},{value:"arrows-rotate",type:"string"},{value:"arrows-rotate-backward",type:"string"},{value:"ban",type:"string"},{value:"bell",type:"string"},{value:"bell-outline",type:"string"},{value:"book",type:"string"},{value:"book-outline",type:"string"},{value:"briefcase",type:"string"},{value:"briefcase-outline",type:"string"},{value:"building-outline",type:"string"},{value:"calculator",type:"string"},{value:"calendar",type:"string"},{value:"calendar-euro",type:"string"},{value:"calendar-euro-outline",type:"string"},{value:"calendar-outline",type:"string"},{value:"check",type:"string"},{value:"check-circle",type:"string"},{value:"check-circle-outline",type:"string"},{value:"chevron-down",type:"string"},{value:"chevron-down-circle",type:"string"},{value:"chevron-left",type:"string"},{value:"chevron-left-circle",type:"string"},{value:"chevron-right",type:"string"},{value:"chevron-right-circle",type:"string"},{value:"chevron-up",type:"string"},{value:"chevron-up-circle",type:"string"},{value:"clock",type:"string"},{value:"clock-outline",type:"string"},{value:"code-square-outline",type:"string"},{value:"cog",type:"string"},{value:"cog-outline",type:"string"},{value:"comment",type:"string"},{value:"comment-outline",type:"string"},{value:"comment-sms",type:"string"},{value:"conversation",type:"string"},{value:"conversation-outline",type:"string"},{value:"copy-file",type:"string"},{value:"copy-file-outline",type:"string"},{value:"copy-outline",type:"string"},{value:"credit-card",type:"string"},{value:"cross",type:"string"},{value:"cross-circle",type:"string"},{value:"cross-circle-outline",type:"string"},{value:"dashboard",type:"string"},{value:"dashboard-outline",type:"string"},{value:"earth",type:"string"},{value:"earth-outline",type:"string"},{value:"ellipsis",type:"string"},{value:"ellipsis-vertical",type:"string"},{value:"euro",type:"string"},{value:"euro-circle",type:"string"},{value:"exclamation-circle",type:"string"},{value:"exclamation-circle-outline",type:"string"},{value:"exclamation-stamp",type:"string"},{value:"exclamation-triangle",type:"string"},{value:"exclamation-triangle-outline",type:"string"},{value:"eye",type:"string"},{value:"eye-slash",type:"string"},{value:"fax",type:"string"},{value:"fax-outline",type:"string"},{value:"file",type:"string"},{value:"file-cog",type:"string"},{value:"file-download",type:"string"},{value:"file-excel",type:"string"},{value:"file-excel-outline",type:"string"},{value:"file-outline",type:"string"},{value:"file-pdf",type:"string"},{value:"file-pdf-outline",type:"string"},{value:"file-text",type:"string"},{value:"file-text-outline",type:"string"},{value:"file-upload",type:"string"},{value:"file-word",type:"string"},{value:"file-word-outline",type:"string"},{value:"filter-outline",type:"string"},{value:"floppy-disk",type:"string"},{value:"floppy-disk-outline",type:"string"},{value:"folder",type:"string"},{value:"folder-check",type:"string"},{value:"folder-check-outline",type:"string"},{value:"folder-lines",type:"string"},{value:"folder-lines-outline",type:"string"},{value:"folder-link",type:"string"},{value:"folder-link-outline",type:"string"},{value:"folder-outline",type:"string"},{value:"folder-star",type:"string"},{value:"folders",type:"string"},{value:"folders-outline",type:"string"},{value:"gavel",type:"string"},{value:"gavel-outline",type:"string"},{value:"graduation-cap",type:"string"},{value:"graduation-cap-outline",type:"string"},{value:"hand-up",type:"string"},{value:"home",type:"string"},{value:"home-outline",type:"string"},{value:"info-circle",type:"string"},{value:"info-circle-outline",type:"string"},{value:"interrogation-circle",type:"string"},{value:"interrogation-circle-outline",type:"string"},{value:"laptop",type:"string"},{value:"life-ring",type:"string"},{value:"lines-rectangle",type:"string"},{value:"lines-rectangle-outline",type:"string"},{value:"list",type:"string"},{value:"location-outline",type:"string"},{value:"lock",type:"string"},{value:"lock-outline",type:"string"},{value:"log-in",type:"string"},{value:"log-out",type:"string"},{value:"magnifying-glass",type:"string"},{value:"mail",type:"string"},{value:"mail-outline",type:"string"},{value:"messages-square",type:"string"},{value:"messages-square-outline",type:"string"},{value:"mobile",type:"string"},{value:"mobile-outline",type:"string"},{value:"notes",type:"string"},{value:"notes-outline",type:"string"},{value:"paper-plane",type:"string"},{value:"paper-plane-slash",type:"string"},{value:"paperclip",type:"string"},{value:"pen",type:"string"},{value:"pen-circle",type:"string"},{value:"pen-fancy",type:"string"},{value:"pen-fancy-files-outline",type:"string"},{value:"pen-fancy-outline",type:"string"},{value:"pen-outline",type:"string"},{value:"phone",type:"string"},{value:"phone-outline",type:"string"},{value:"picture-outline",type:"string"},{value:"play-circle",type:"string"},{value:"plus",type:"string"},{value:"plus-circle",type:"string"},{value:"question-circle",type:"string"},{value:"share",type:"string"},{value:"share-outline",type:"string"},{value:"shuffle",type:"string"},{value:"sitemap",type:"string"},{value:"sliders",type:"string"},{value:"sliders-outline",type:"string"},{value:"squares",type:"string"},{value:"star",type:"string"},{value:"star-outline",type:"string"},{value:"tag",type:"string"},{value:"tags",type:"string"},{value:"thumb-down",type:"string"},{value:"thumb-down-outline",type:"string"},{value:"thumb-up",type:"string"},{value:"thumb-up-outline",type:"string"},{value:"thumbtack",type:"string"},{value:"thumbtack-outline",type:"string"},{value:"trash",type:"string"},{value:"trash-outline",type:"string"},{value:"universal-access",type:"string"},{value:"unlink",type:"string"},{value:"unlock",type:"string"},{value:"unlock-outline",type:"string"},{value:"upload",type:"string"},{value:"user",type:"string"},{value:"user-circle",type:"string"},{value:"user-group",type:"string"},{value:"user-lock",type:"string"},{value:"user-outline",type:"string"},{value:"user-pen-fancy-outline",type:"string"},{value:"user-plus",type:"string"},{value:"user-question-outline",type:"string"},{value:"user-shield-outline",type:"string"},{value:"users",type:"string"},{value:"users-outline",type:"string"},{value:"wallet",type:"string"},{value:"wallet-outline",type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"maxlength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"maxlength",reflectToAttr:!1,docs:"Input max length",docsTags:[],default:"400",values:[{type:"number"}],optional:!1,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!1,docs:"Define input width",docsTags:[],default:"'full'",values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"pattern",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"pattern",reflectToAttr:!1,docs:`Define input pattern to validate
Please refer to the Pattern section in the input documentation for detailed information on using regular expressions in components.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"patternErrorMessage",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"pattern-error-message",reflectToAttr:!1,docs:"Define input pattern error message",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"type",type:'"search" | "text"',complexType:{original:"TextType",resolved:'"search" | "text"',references:{TextType:{location:"import",path:"./mg-input-text.conf",id:"src/components/molecules/inputs/mg-input-text/mg-input-text.conf.ts::TextType"}}},mutable:!1,attr:"type",reflectToAttr:!1,docs:"Input type",docsTags:[],default:"'text'",values:[{value:"search",type:"string"},{value:"text",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:'(valid: MgInputText["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputText:{location:"global",id:"global::MgInputText"}},return:"Promise<void>"},signature:'setError(valid: MgInputText["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]},{name:"setFocus",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"setFocus() => Promise<void>",parameters:[],docs:"Public method to play input focus",docsTags:[]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputTextElement['valid']",resolved:"boolean",references:{HTMLMgInputTextElement:{location:"global",id:"global::HTMLMgInputTextElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgInputTextElement['value']",resolved:"string",references:{HTMLMgInputTextElement:{location:"global",id:"global::HTMLMgInputTextElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"append-input",docs:"Content to display next to the input"}],parts:[],dependents:["mg-input-checkbox","mg-panel"],dependencies:["mg-input","mg-icon","mg-character-left"],dependencyGraph:{"mg-input-text":["mg-input","mg-icon","mg-character-left"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-input-checkbox":["mg-input-text"],"mg-panel":["mg-input-text"]}},{filePath:"src/components/molecules/inputs/mg-input-textarea/mg-input-textarea.tsx",encapsulation:"shadow",tag:"mg-input-textarea",readme:`## Design

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
`,docs:"",docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"displayCharacterLeft",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"display-character-left",reflectToAttr:!1,docs:"Define if component should display character left",docsTags:[],default:"true",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"maxlength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"maxlength",reflectToAttr:!1,docs:"Input max length",docsTags:[],default:"4000",values:[{type:"number"}],optional:!1,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!1,docs:"Define input width",docsTags:[],default:"'full'",values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"pattern",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"pattern",reflectToAttr:!1,docs:`Define input pattern to validate
Please refer to the Pattern section in the input documentation for detailed information on using regular expressions in components.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"patternErrorMessage",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"pattern-error-message",reflectToAttr:!1,docs:"Define input pattern error message",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"resizable",type:'"both" | "horizontal" | "none" | "vertical"',complexType:{original:"'none' | 'both' | 'horizontal' | 'vertical'",resolved:'"both" | "horizontal" | "none" | "vertical"',references:{}},mutable:!1,attr:"resizable",reflectToAttr:!1,docs:"Define if input is resizable",docsTags:[],default:"'none'",values:[{value:"both",type:"string"},{value:"horizontal",type:"string"},{value:"none",type:"string"},{value:"vertical",type:"string"}],optional:!1,required:!1},{name:"rows",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"rows",reflectToAttr:!1,docs:"Define the number of visible text lines for the control",docsTags:[],default:"3",values:[{type:"number"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:'(valid: MgInputTextarea["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputTextarea:{location:"global",id:"global::MgInputTextarea"}},return:"Promise<void>"},signature:'setError(valid: MgInputTextarea["valid"], errorMessage: string) => Promise<void>',parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputTextareaElement['valid']",resolved:"boolean",references:{HTMLMgInputTextareaElement:{location:"global",id:"global::HTMLMgInputTextareaElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgInputTextareaElement['value']",resolved:"string",references:{HTMLMgInputTextareaElement:{location:"global",id:"global::HTMLMgInputTextareaElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-input","mg-character-left"],dependencyGraph:{"mg-input-textarea":["mg-input","mg-character-left"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/atoms/mg-input-title/mg-input-title.tsx",encapsulation:"scoped",tag:"mg-input-title",readme:`## Design

### Label

The label can be on more than one line.

### Styles

![](./doc/img/mg-input-title.png)
`,docs:"",docsTags:[{name:"slot",text:"- Title content"}],usage:{},props:[{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Label input id",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"isLegend",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"is-legend",reflectToAttr:!1,docs:"Switch from label to fieldset sementic",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"If input is required an asterisk is added at the end of the label",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"If input is required an asterisk is added at the end of the label",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[{name:"",docs:"Title content"}],parts:[],dependents:["mg-input"],dependencies:[],dependencyGraph:{"mg-input":["mg-input-title"]}},{filePath:"src/components/molecules/inputs/mg-input-toggle/mg-input-toggle.tsx",encapsulation:"shadow",tag:"mg-input-toggle",readme:`## Usage

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

The values must be transcribed by texts or icons.`,docsTags:[{name:"slot",text:"item-1 - Left option toggle content"},{name:"slot",text:"item-2 - Right option toggle content"}],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"isIcon",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"is-icon",reflectToAttr:!1,docs:"Define if toggle display icon",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"isOnOff",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"is-on-off",reflectToAttr:!1,docs:"Define if toggle have on/off style",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"items",type:"ToggleValue[] | string[]",complexType:{original:"string[] | ToggleValue[]",resolved:"ToggleValue[] | string[]",references:{ToggleValue:{location:"import",path:"./mg-input-toggle.conf",id:"src/components/molecules/inputs/mg-input-toggle/mg-input-toggle.conf.ts::ToggleValue"}}},mutable:!1,reflectToAttr:!1,docs:"Items are the possible options to select",docsTags:[],values:[{type:"ToggleValue[]"},{type:"string[]"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"value",type:"any",complexType:{original:"any",resolved:"any",references:{}},mutable:!0,attr:"value",reflectToAttr:!1,docs:"Component value",docsTags:[],values:[{type:"any"}],optional:!1,required:!1}],methods:[{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: boolean, errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"setError(valid: boolean, errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"any",bubbles:!0,complexType:{original:"HTMLMgInputToggleElement['value']",resolved:"any",references:{HTMLMgInputToggleElement:{location:"global",id:"global::HTMLMgInputToggleElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"item-1",docs:"Left option toggle content"},{name:"item-2",docs:"Right option toggle content"}],parts:[],dependents:[],dependencies:["mg-input"],dependencyGraph:{"mg-input-toggle":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/mg-item-more/mg-item-more.tsx",encapsulation:"shadow",tag:"mg-item-more",readme:`# mg-item-more
`,docs:"",docsTags:[],usage:{},props:[{name:"icon",type:'{ icon: "filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"; }',complexType:{original:"IconType",resolved:'{ icon: "filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"; }',references:{IconType:{location:"import",path:"./mg-item-more.conf",id:"src/components/molecules/mg-item-more/mg-item-more.conf.ts::IconType"}}},mutable:!1,reflectToAttr:!1,docs:"Define icon",docsTags:[],default:"{ icon: 'ellipsis-vertical' }",values:[{type:'{ icon: "filter"'},{value:"copy",type:"string"},{value:"link",type:"string"},{value:"picture",type:"string"},{value:"table",type:"string"},{value:"circle",type:"string"},{value:"download",type:"string"},{value:"history",type:"string"},{value:"location",type:"string"},{value:"key",type:"string"},{value:"loader",type:"string"},{value:"address-card",type:"string"},{value:"align-center",type:"string"},{value:"align-justify",type:"string"},{value:"align-left",type:"string"},{value:"align-right",type:"string"},{value:"api",type:"string"},{value:"archive",type:"string"},{value:"archive-outline",type:"string"},{value:"arrow-clock",type:"string"},{value:"arrow-down",type:"string"},{value:"arrow-down-a-z",type:"string"},{value:"arrow-down-right",type:"string"},{value:"arrow-left",type:"string"},{value:"arrow-right",type:"string"},{value:"arrow-rotate",type:"string"},{value:"arrow-rotate-backward",type:"string"},{value:"arrow-up",type:"string"},{value:"arrow-up-right",type:"string"},{value:"arrow-up-right-square",type:"string"},{value:"arrow-up-z-a",type:"string"},{value:"arrows-compare",type:"string"},{value:"arrows-right-down",type:"string"},{value:"arrows-right-left",type:"string"},{value:"arrows-rotate",type:"string"},{value:"arrows-rotate-backward",type:"string"},{value:"ban",type:"string"},{value:"bell",type:"string"},{value:"bell-outline",type:"string"},{value:"book",type:"string"},{value:"book-outline",type:"string"},{value:"briefcase",type:"string"},{value:"briefcase-outline",type:"string"},{value:"building-outline",type:"string"},{value:"calculator",type:"string"},{value:"calendar",type:"string"},{value:"calendar-euro",type:"string"},{value:"calendar-euro-outline",type:"string"},{value:"calendar-outline",type:"string"},{value:"check",type:"string"},{value:"check-circle",type:"string"},{value:"check-circle-outline",type:"string"},{value:"chevron-down",type:"string"},{value:"chevron-down-circle",type:"string"},{value:"chevron-left",type:"string"},{value:"chevron-left-circle",type:"string"},{value:"chevron-right",type:"string"},{value:"chevron-right-circle",type:"string"},{value:"chevron-up",type:"string"},{value:"chevron-up-circle",type:"string"},{value:"clock",type:"string"},{value:"clock-outline",type:"string"},{value:"code-square-outline",type:"string"},{value:"cog",type:"string"},{value:"cog-outline",type:"string"},{value:"comment",type:"string"},{value:"comment-outline",type:"string"},{value:"comment-sms",type:"string"},{value:"conversation",type:"string"},{value:"conversation-outline",type:"string"},{value:"copy-file",type:"string"},{value:"copy-file-outline",type:"string"},{value:"copy-outline",type:"string"},{value:"credit-card",type:"string"},{value:"cross",type:"string"},{value:"cross-circle",type:"string"},{value:"cross-circle-outline",type:"string"},{value:"dashboard",type:"string"},{value:"dashboard-outline",type:"string"},{value:"earth",type:"string"},{value:"earth-outline",type:"string"},{value:"ellipsis",type:"string"},{value:"ellipsis-vertical",type:"string"},{value:"euro",type:"string"},{value:"euro-circle",type:"string"},{value:"exclamation-circle",type:"string"},{value:"exclamation-circle-outline",type:"string"},{value:"exclamation-stamp",type:"string"},{value:"exclamation-triangle",type:"string"},{value:"exclamation-triangle-outline",type:"string"},{value:"eye",type:"string"},{value:"eye-slash",type:"string"},{value:"fax",type:"string"},{value:"fax-outline",type:"string"},{value:"file",type:"string"},{value:"file-cog",type:"string"},{value:"file-download",type:"string"},{value:"file-excel",type:"string"},{value:"file-excel-outline",type:"string"},{value:"file-outline",type:"string"},{value:"file-pdf",type:"string"},{value:"file-pdf-outline",type:"string"},{value:"file-text",type:"string"},{value:"file-text-outline",type:"string"},{value:"file-upload",type:"string"},{value:"file-word",type:"string"},{value:"file-word-outline",type:"string"},{value:"filter-outline",type:"string"},{value:"floppy-disk",type:"string"},{value:"floppy-disk-outline",type:"string"},{value:"folder",type:"string"},{value:"folder-check",type:"string"},{value:"folder-check-outline",type:"string"},{value:"folder-lines",type:"string"},{value:"folder-lines-outline",type:"string"},{value:"folder-link",type:"string"},{value:"folder-link-outline",type:"string"},{value:"folder-outline",type:"string"},{value:"folder-star",type:"string"},{value:"folders",type:"string"},{value:"folders-outline",type:"string"},{value:"gavel",type:"string"},{value:"gavel-outline",type:"string"},{value:"graduation-cap",type:"string"},{value:"graduation-cap-outline",type:"string"},{value:"hand-up",type:"string"},{value:"home",type:"string"},{value:"home-outline",type:"string"},{value:"info-circle",type:"string"},{value:"info-circle-outline",type:"string"},{value:"interrogation-circle",type:"string"},{value:"interrogation-circle-outline",type:"string"},{value:"laptop",type:"string"},{value:"life-ring",type:"string"},{value:"lines-rectangle",type:"string"},{value:"lines-rectangle-outline",type:"string"},{value:"list",type:"string"},{value:"location-outline",type:"string"},{value:"lock",type:"string"},{value:"lock-outline",type:"string"},{value:"log-in",type:"string"},{value:"log-out",type:"string"},{value:"magnifying-glass",type:"string"},{value:"mail",type:"string"},{value:"mail-outline",type:"string"},{value:"messages-square",type:"string"},{value:"messages-square-outline",type:"string"},{value:"mobile",type:"string"},{value:"mobile-outline",type:"string"},{value:"notes",type:"string"},{value:"notes-outline",type:"string"},{value:"paper-plane",type:"string"},{value:"paper-plane-slash",type:"string"},{value:"paperclip",type:"string"},{value:"pen",type:"string"},{value:"pen-circle",type:"string"},{value:"pen-fancy",type:"string"},{value:"pen-fancy-files-outline",type:"string"},{value:"pen-fancy-outline",type:"string"},{value:"pen-outline",type:"string"},{value:"phone",type:"string"},{value:"phone-outline",type:"string"},{value:"picture-outline",type:"string"},{value:"play-circle",type:"string"},{value:"plus",type:"string"},{value:"plus-circle",type:"string"},{value:"question-circle",type:"string"},{value:"share",type:"string"},{value:"share-outline",type:"string"},{value:"shuffle",type:"string"},{value:"sitemap",type:"string"},{value:"sliders",type:"string"},{value:"sliders-outline",type:"string"},{value:"squares",type:"string"},{value:"star",type:"string"},{value:"star-outline",type:"string"},{value:"tag",type:"string"},{value:"tags",type:"string"},{value:"thumb-down",type:"string"},{value:"thumb-down-outline",type:"string"},{value:"thumb-up",type:"string"},{value:"thumb-up-outline",type:"string"},{value:"thumbtack",type:"string"},{value:"thumbtack-outline",type:"string"},{value:"trash",type:"string"},{value:"trash-outline",type:"string"},{value:"universal-access",type:"string"},{value:"unlink",type:"string"},{value:"unlock",type:"string"},{value:"unlock-outline",type:"string"},{value:"upload",type:"string"},{value:"user",type:"string"},{value:"user-circle",type:"string"},{value:"user-group",type:"string"},{value:"user-lock",type:"string"},{value:"user-outline",type:"string"},{value:"user-pen-fancy-outline",type:"string"},{value:"user-plus",type:"string"},{value:"user-question-outline",type:"string"},{value:"user-shield-outline",type:"string"},{value:"users",type:"string"},{value:"users-outline",type:"string"},{value:"wallet",type:"string"},{type:'"wallet-outline"; }'}],optional:!0,required:!1},{name:"size",type:'"large" | "medium" | "regular"',complexType:{original:"SizeType",resolved:'"large" | "medium" | "regular"',references:{SizeType:{location:"import",path:"./mg-item-more.conf",id:"src/components/molecules/mg-item-more/mg-item-more.conf.ts::SizeType"}}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define component child menu size.",docsTags:[],values:[{value:"large",type:"string"},{value:"medium",type:"string"},{value:"regular",type:"string"}],optional:!0,required:!1},{name:"slotlabel",type:"{ label?: string; display?: boolean; }",complexType:{original:"SlotLabelType",resolved:"{ label?: string; display?: boolean; }",references:{SlotLabelType:{location:"import",path:"./mg-item-more.conf",id:"src/components/molecules/mg-item-more/mg-item-more.conf.ts::SlotLabelType"}}},mutable:!1,reflectToAttr:!1,docs:"Define slot label element",docsTags:[],default:"{ display: false }",values:[{type:"{ label?: string; display?: boolean; }"}],optional:!0,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-menu"],dependencies:["mg-menu-item","mg-icon","mg-menu"],dependencyGraph:{"mg-item-more":["mg-menu-item","mg-icon","mg-menu"],"mg-menu-item":["mg-badge","mg-icon","mg-popover"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-menu":["mg-item-more"]}},{filePath:"src/components/molecules/mg-loader/mg-loader.tsx",encapsulation:"shadow",tag:"mg-loader",readme:`## Behavior

![](./doc/img/mg-loader-anatomy.png)

The default loader message is "Loading in progress..." and can be overridden with the \`message\` prop.

The loader message can be hidden using the \`messageHide\` prop.
`,docs:'![](./doc/img/mg-loader-anatomy.png)\n\nThe default loader message is "Loading in progress..." and can be overridden with the `message` prop.\n\nThe loader message can be hidden using the `messageHide` prop.',docsTags:[],usage:{},props:[{name:"message",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"message",reflectToAttr:!1,docs:"Override loader message",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"messageHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"message-hide",reflectToAttr:!1,docs:"Hide message",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-icon"],dependencyGraph:{"mg-loader":["mg-icon"]}},{filePath:"src/components/molecules/menu/mg-menu/mg-menu.tsx",encapsulation:"shadow",tag:"mg-menu",readme:`## Horizontal

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
`,docs:"",docsTags:[{name:"slot",text:"- Menu content"}],usage:{},props:[{name:"direction",type:"Direction.HORIZONTAL | Direction.VERTICAL",complexType:{original:"Direction",resolved:"Direction.HORIZONTAL | Direction.VERTICAL",references:{Direction:{location:"import",path:"./mg-menu.conf",id:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::Direction"}}},mutable:!1,attr:"direction",reflectToAttr:!0,docs:"Component display direction.",docsTags:[],default:"Direction.HORIZONTAL",values:[{type:"Direction.HORIZONTAL"},{type:"Direction.VERTICAL"}],optional:!1,required:!1},{name:"itemmore",type:'{ size?: "regular" | "medium" | "large"; icon?: IconType; slotlabel?: SlotLabelType; }',complexType:{original:"ItemMoreType",resolved:'{ size?: "regular" | "medium" | "large"; icon?: IconType; slotlabel?: SlotLabelType; }',references:{ItemMoreType:{location:"import",path:"./mg-menu.conf",id:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::ItemMoreType"}}},mutable:!1,reflectToAttr:!1,docs:`Customize "mg-item-more" element
Used with direction: 'vertical' to manage overflow`,docsTags:[],values:[{type:'{ size?: "regular"'},{value:"medium",type:"string"},{type:'"large"; icon?: IconType; slotlabel?: SlotLabelType; }'}],optional:!0,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Menu label. Include short menu description.\nRequired to define accessibility required attribute `aria-label`",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"size",type:'"large" | "medium" | "regular"',complexType:{original:"MenuSizeType",resolved:'"large" | "medium" | "regular"',references:{MenuSizeType:{location:"import",path:"./mg-menu.conf",id:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::MenuSizeType"}}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define mg-menu size",docsTags:[],default:"'regular'",values:[{value:"large",type:"string"},{value:"medium",type:"string"},{value:"regular",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[{name:"",docs:"Menu content"}],parts:[],dependents:["mg-action-more","mg-item-more"],dependencies:["mg-item-more"],dependencyGraph:{"mg-menu":["mg-item-more"],"mg-item-more":["mg-menu"],"mg-menu-item":["mg-badge","mg-icon","mg-popover"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-action-more":["mg-menu"]}},{filePath:"src/components/molecules/menu/mg-menu-item/mg-menu-item.tsx",encapsulation:"shadow",tag:"mg-menu-item",readme:`## Use

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
- \`--mg-c-menu-item-chevron-display\`: override chevron display.

### navigation-button

- \`--mg-menu-item-navigation-button-max-width\`: define mg-menu-item button max-width. Useful to apply \`text-overflow: ellipsis;\` on \`mg-menu-item__navigation-button-text\` element. default: \`unset\`.
`,docs:"Item menu is used with horizontal or vertical menus.",docsTags:[{name:"slot",text:"- Menu item content"},{name:"slot",text:"image - Menu item image content"},{name:"slot",text:"label - Menu item label content"},{name:"slot",text:"information - Menu item information content"},{name:"slot",text:"metadata - Menu item metadata content"}],usage:{},props:[{name:"expanded",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"expanded",reflectToAttr:!1,docs:"Define menu-item content expanded.",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!0,required:!1},{name:"href",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"href",reflectToAttr:!1,docs:`Define menu-item href
when defined menu-item contain an anchor instead of button`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!0,docs:"Identifier is used to control mg-popover",docsTags:[],default:"createID('mg-menu-item')",values:[{type:"string"}],optional:!1,required:!1},{name:"status",type:"Status.ACTIVE | Status.DISABLED | Status.HIDDEN | Status.VISIBLE",complexType:{original:"Status",resolved:"Status.ACTIVE | Status.DISABLED | Status.HIDDEN | Status.VISIBLE",references:{Status:{location:"import",path:"./mg-menu-item.conf",id:"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts::Status"}}},mutable:!0,attr:"status",reflectToAttr:!0,docs:"Define menu-item status.",docsTags:[],default:"Status.VISIBLE",values:[{type:"Status.ACTIVE"},{type:"Status.DISABLED"},{type:"Status.HIDDEN"},{type:"Status.VISIBLE"}],optional:!0,required:!1},{name:"target",type:'"_blank" | "_parent" | "_self" | "_top"',complexType:{original:"TargetType",resolved:'"_blank" | "_parent" | "_self" | "_top"',references:{TargetType:{location:"import",path:"./mg-menu-item.conf",id:"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts::TargetType"}}},mutable:!1,attr:"target",reflectToAttr:!1,docs:"Define target type",docsTags:[],values:[{value:"_blank",type:"string"},{value:"_parent",type:"string"},{value:"_self",type:"string"},{value:"_top",type:"string"}],optional:!0,required:!1}],methods:[],events:[{event:"item-loaded",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emited event when item is loaded",docsTags:[]},{event:"item-updated",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emited event when item is updated",docsTags:[]},{event:"status-change",detail:"Status.ACTIVE | Status.DISABLED | Status.HIDDEN | Status.VISIBLE",bubbles:!0,complexType:{original:"HTMLMgMenuItemElement['status']",resolved:"Status.ACTIVE | Status.DISABLED | Status.HIDDEN | Status.VISIBLE",references:{HTMLMgMenuItemElement:{location:"global",id:"global::HTMLMgMenuItemElement"}}},cancelable:!0,composed:!0,docs:"Emited event when status change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"",docs:"Menu item content"},{name:"image",docs:"Menu item image content"},{name:"information",docs:"Menu item information content"},{name:"label",docs:"Menu item label content"},{name:"metadata",docs:"Menu item metadata content"}],parts:[],dependents:["mg-action-more","mg-item-more"],dependencies:["mg-badge","mg-icon","mg-popover"],dependencyGraph:{"mg-menu-item":["mg-badge","mg-icon","mg-popover"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-action-more":["mg-menu-item"],"mg-item-more":["mg-menu-item"]}},{filePath:"src/components/molecules/mg-message/mg-message.tsx",encapsulation:"shadow",tag:"mg-message",readme:`## Usage

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
Value is defined in seconds and must greater than 2 seconds (PDA9-314 RG-06)`,docsTags:[],values:[{type:"number"}],optional:!0,required:!1},{name:"hide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"hide",reflectToAttr:!1,docs:"Define if message is hidden",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-message')",values:[{type:"string"}],optional:!1,required:!1},{name:"noAriaRole",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"no-aria-role",reflectToAttr:!1,docs:"Define if aria role is unset\nFor a11y reasons, `<mg-message />` was design for `alert` needs with attached semantic role: `status`, `alert`.\nBy toggle this props to `true`, you can unset the role to benefit from the template without any semantic role.\nBe careful to set the mode according to the context needs.",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"variant",type:'"danger" | "info" | "success" | "warning"',complexType:{original:"VariantType",resolved:'"danger" | "info" | "success" | "warning"',references:{VariantType:{location:"import",path:"./mg-message.conf",id:"src/components/molecules/mg-message/mg-message.conf.ts::VariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Message variant",docsTags:[],default:"variants[0]",values:[{value:"danger",type:"string"},{value:"info",type:"string"},{value:"success",type:"string"},{value:"warning",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"component-hide",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emited event when message is hidden",docsTags:[]},{event:"component-show",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emited event when message is diplayed",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-card","mg-icon","mg-button"],dependencyGraph:{"mg-message":["mg-card","mg-icon","mg-button"],"mg-button":["mg-icon"]}},{filePath:"src/components/molecules/mg-modal/mg-modal.tsx",encapsulation:"shadow",tag:"mg-modal",readme:`## Anatomy

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
`,docs:"![](./doc/img/mg-pagination-nav-anatomy.png)",docsTags:[],usage:{},props:[{name:"currentPage",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!0,attr:"current-page",reflectToAttr:!0,docs:"Component current page",docsTags:[],default:"1",values:[{type:"number"}],optional:!1,required:!1},{name:"hideNavigationLabels",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"hide-navigation-labels",reflectToAttr:!1,docs:"Hide navigation label",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"hidePageCount",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"hide-page-count",reflectToAttr:!1,docs:"Hide select input",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-pagination')",values:[{type:"string"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"label",reflectToAttr:!1,docs:`Panignation label. Is a short description.
Customize default value can be usefull to improve accessibility`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"totalPages",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"total-pages",reflectToAttr:!1,docs:"Component total pages",docsTags:[],default:"1",values:[{type:"number"}],optional:!1,required:!1}],methods:[],events:[{event:"current-page-change",detail:"number",bubbles:!0,complexType:{original:"number",resolved:"number",references:{}},cancelable:!0,composed:!0,docs:"Emmited event when current page change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-input-checkbox-paginated"],dependencies:["mg-button","mg-icon","mg-input-select"],dependencyGraph:{"mg-pagination":["mg-button","mg-icon","mg-input-select"],"mg-button":["mg-icon"],"mg-input-select":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-input-checkbox-paginated":["mg-pagination"]}},{filePath:"src/components/molecules/mg-panel/mg-panel.tsx",encapsulation:"shadow",tag:"mg-panel",readme:`## Behavior

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

## 💥 Troubleshooting

### How to resize the \`<iframe>\` element when the \`<mg-panel>\` component is toggled?

You can use the external library \`iframe-resizer\`. When the library is instantiated in the \`window\`, it adds a new property \`parentIFrame\` which includes a \`size()\` method.

Then you can use \`window.parentIFrame.size()\` to manually trigger a resize on the \`iframe\` when the \`<mg-panel>\` element's \`expanded\` property is toggled.

\`\`\`jsx
class MyComponent {
  [...] 
  #expanded = true;

  handleExpandedChange = () => {
    if (window.parentIFrame) {
      // This setTimeout is mandatory
      // We have to ensure that component resizing is done before triggering iframe resizing
      setTimeout(() => {
        window.parentIFrame.size()
      }, 0);
    }
  };

  render() {
    return (
      <mg-panel
        [...]
        expanded={this.#expanded}
        on-expanded-change={this.handleExpandedChange}
      >
        [...]
      </mg-panel>
    );
  }
}
\`\`\`
`,docs:`The left zone of the header displays the item label, this zone is clickable and allows the user to unfold/fold the panel.
If no content is available, the panel cannot be unfolded.
When the panel is unfolded, the icon is vertically inverted.

The right area of the header can accommodate any component.`,docsTags:[],usage:{},props:[{name:"expandToggleDisabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"expand-toggle-disabled",reflectToAttr:!1,docs:"Disable possibility to toggle expand",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"expandToggleDisplay",type:'"icon" | "text"',complexType:{original:"ExpandToggleDisplayType",resolved:'"icon" | "text"',references:{ExpandToggleDisplayType:{location:"import",path:"./mg-panel.conf",id:"src/components/molecules/mg-panel/mg-panel.conf.ts::ExpandToggleDisplayType"}}},mutable:!1,attr:"expand-toggle-display",reflectToAttr:!1,docs:"Define expand toggle button display",docsTags:[],default:"expandToggleDisplays[0]",values:[{value:"icon",type:"string"},{value:"text",type:"string"}],optional:!1,required:!1},{name:"expanded",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"expanded",reflectToAttr:!1,docs:"Panel is opened",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-panel')",values:[{type:"string"}],optional:!1,required:!1},{name:"panelTitle",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"panel-title",reflectToAttr:!1,docs:"Panel title",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"titleEditable",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"title-editable",reflectToAttr:!1,docs:"Define if panel title is editable",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"titlePattern",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"title-pattern",reflectToAttr:!1,docs:"Panel title pattern",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"titlePatternErrorMessage",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"title-pattern-error-message",reflectToAttr:!1,docs:"Panel title pattern error message",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"titlePosition",type:'"left" | "right"',complexType:{original:"TitlePositionType",resolved:'"left" | "right"',references:{TitlePositionType:{location:"import",path:"./mg-panel.conf",id:"src/components/molecules/mg-panel/mg-panel.conf.ts::TitlePositionType"}}},mutable:!1,attr:"title-position",reflectToAttr:!1,docs:"Define title position",docsTags:[],default:"titlePositions[0]",values:[{value:"left",type:"string"},{value:"right",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"expanded-change",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgPanelElement['expanded']",resolved:"boolean",references:{HTMLMgPanelElement:{location:"global",id:"global::HTMLMgPanelElement"}}},cancelable:!0,composed:!0,docs:"Emmited event when expanded change",docsTags:[]},{event:"title-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgPanelElement['panelTitle']",resolved:"string",references:{HTMLMgPanelElement:{location:"global",id:"global::HTMLMgPanelElement"}}},cancelable:!0,composed:!0,docs:"Emmited event when title change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-button","mg-icon","mg-input-text","mg-card"],dependencyGraph:{"mg-panel":["mg-button","mg-icon","mg-input-text","mg-card"],"mg-button":["mg-icon"],"mg-input-text":["mg-input","mg-icon","mg-character-left"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/mg-popover/mg-popover.tsx",encapsulation:"shadow",tag:"mg-popover",readme:`## Usage

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
`,docs:"A popover is more enhanced than a tooltip but less blocking than a modal.",docsTags:[{name:"slot",text:"- Element that will display the popover"},{name:"slot",text:"content - popover content"}],usage:{},props:[{name:"arrowHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"arrow-hide",reflectToAttr:!1,docs:"Hide popover arrow",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"closeButton",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"close-button",reflectToAttr:!1,docs:"Define if popover has a cross button",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Disable popover",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"display",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"display",reflectToAttr:!1,docs:"Display popover",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Sets an `id` attribute.\nNeeded by the input for accessibility `aria-decribedby`.",docsTags:[],default:"createID('mg-popover')",values:[{type:"string"}],optional:!1,required:!1},{name:"placement",type:'"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"',complexType:{original:"Placement",resolved:'"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"',references:{Placement:{location:"import",path:"@popperjs/core",id:"../../node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/index.d.ts::Placement"}}},mutable:!1,attr:"placement",reflectToAttr:!1,docs:"Popover placement",docsTags:[],default:"'bottom'",values:[{value:"auto",type:"string"},{value:"auto-end",type:"string"},{value:"auto-start",type:"string"},{value:"bottom",type:"string"},{value:"bottom-end",type:"string"},{value:"bottom-start",type:"string"},{value:"left",type:"string"},{value:"left-end",type:"string"},{value:"left-start",type:"string"},{value:"right",type:"string"},{value:"right-end",type:"string"},{value:"right-start",type:"string"},{value:"top",type:"string"},{value:"top-end",type:"string"},{value:"top-start",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"display-change",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgPopoverElement['display']",resolved:"boolean",references:{HTMLMgPopoverElement:{location:"global",id:"global::HTMLMgPopoverElement"}}},cancelable:!0,composed:!0,docs:"Emited event when display value change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"",docs:"Element that will display the popover"},{name:"content",docs:"popover content"}],parts:[],dependents:["mg-action-more","mg-input-checkbox","mg-menu-item"],dependencies:["mg-popover-content"],dependencyGraph:{"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-action-more":["mg-popover"],"mg-input-checkbox":["mg-popover"],"mg-menu-item":["mg-popover"]}},{filePath:"src/components/molecules/mg-skip-links/mg-skip-links.tsx",encapsulation:"shadow",tag:"mg-skip-links",readme:`## Behavior

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
`,docs:"![](./doc/img/mg-tabs-anatomy.png)",docsTags:[{name:"slot",text:"tab_content-n - Tab content, where `n` represents the position of the tab content. It starts at 1."}],usage:{},props:[{name:"activeTab",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!0,attr:"active-tab",reflectToAttr:!0,docs:"Active tab number",docsTags:[],values:[{type:"number"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-tabs')",values:[{type:"string"}],optional:!1,required:!1},{name:"items",type:"TabItem[] | string[]",complexType:{original:"string[] | TabItem[]",resolved:"TabItem[] | string[]",references:{TabItem:{location:"import",path:"./mg-tabs.conf",id:"src/components/molecules/mg-tabs/mg-tabs.conf.ts::TabItem"}}},mutable:!1,reflectToAttr:!1,docs:"Tabs items",docsTags:[],values:[{type:"TabItem[]"},{type:"string[]"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:`Tabs label. Include short tabs description.
Required for accessibility`,docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"size",type:'"large" | "regular"',complexType:{original:"SizeType",resolved:'"large" | "regular"',references:{SizeType:{location:"import",path:"./mg-tabs.conf",id:"src/components/molecules/mg-tabs/mg-tabs.conf.ts::SizeType"}}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define tabs size",docsTags:[],default:"'regular'",values:[{value:"large",type:"string"},{value:"regular",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"active-tab-change",detail:"number",bubbles:!0,complexType:{original:"HTMLMgTabsElement['activeTab']",resolved:"number",references:{HTMLMgTabsElement:{location:"global",id:"global::HTMLMgTabsElement"}}},cancelable:!0,composed:!0,docs:"Emited event when active tab change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"tab_content-n",docs:"Tab content, where `n` represents the position of the tab content. It starts at 1."}],parts:[],dependents:[],dependencies:["mg-icon","mg-badge"],dependencyGraph:{"mg-tabs":["mg-icon","mg-badge"]}},{filePath:"src/components/atoms/mg-tag/mg-tag.tsx",encapsulation:"shadow",tag:"mg-tag",readme:`## Specs

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
`,docs:"![](./doc/img/mg-tag-specs.png)",docsTags:[{name:"slot",text:"- Tag content"}],usage:{},props:[{name:"outline",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"outline",reflectToAttr:!1,docs:"Define if tag is using outline style",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"soft",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"soft",reflectToAttr:!1,docs:"Define if tag is using soft style",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"variant",type:'"danger" | "info" | "primary" | "secondary" | "success" | "warning"',complexType:{original:"TagVariantType",resolved:'"danger" | "info" | "primary" | "secondary" | "success" | "warning"',references:{TagVariantType:{location:"import",path:"./mg-tag.conf",id:"src/components/atoms/mg-tag/mg-tag.conf.ts::TagVariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define tag variant",docsTags:[],default:"variants[0]",values:[{value:"danger",type:"string"},{value:"info",type:"string"},{value:"primary",type:"string"},{value:"secondary",type:"string"},{value:"success",type:"string"},{value:"warning",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[{name:"",docs:"Tag content"}],parts:[],dependents:[],dependencies:[],dependencyGraph:{}},{filePath:"src/components/atoms/mg-tooltip/mg-tooltip.tsx",encapsulation:"shadow",tag:"mg-tooltip",readme:`## Usage

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
Our "custom tooltip" component is called "tooltip" here.`,docsTags:[{name:"slot",text:"- Element that will display the tooltip"},{name:"slot",text:"content - Tooltip content"}],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Disable tooltip",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"display",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"display",reflectToAttr:!1,docs:"Display tooltip",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Sets an `id` attribute.\nNeeded by the input for accessibility `aria-decribedby`.",docsTags:[],default:"createID('mg-tooltip')",values:[{type:"string"}],optional:!1,required:!1},{name:"message",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"message",reflectToAttr:!1,docs:"Displayed message in the tooltip",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"placement",type:'"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"',complexType:{original:"Placement",resolved:'"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"',references:{Placement:{location:"import",path:"@popperjs/core",id:"../../node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/index.d.ts::Placement"}}},mutable:!1,attr:"placement",reflectToAttr:!1,docs:"Tooltip placement",docsTags:[],default:"'bottom'",values:[{value:"auto",type:"string"},{value:"auto-end",type:"string"},{value:"auto-start",type:"string"},{value:"bottom",type:"string"},{value:"bottom-end",type:"string"},{value:"bottom-start",type:"string"},{value:"left",type:"string"},{value:"left-end",type:"string"},{value:"left-start",type:"string"},{value:"right",type:"string"},{value:"right-end",type:"string"},{value:"right-start",type:"string"},{value:"top",type:"string"},{value:"top-end",type:"string"},{value:"top-start",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[{name:"",docs:"Element that will display the tooltip"},{name:"content",docs:"Tooltip content"}],parts:[],dependents:["mg-input","mg-input-checkbox-paginated"],dependencies:["mg-tooltip-content"],dependencyGraph:{"mg-tooltip":["mg-tooltip-content"],"mg-input":["mg-tooltip"],"mg-input-checkbox-paginated":["mg-tooltip"]}}],dt={"src/components/atoms/mg-badge/mg-badge.conf.ts::BadgeVariantType":{declaration:'"info" | "success" | "primary" | "secondary" | "warning" | "danger" | "text-color"',docstring:"",path:"src/components/atoms/mg-badge/mg-badge.conf.ts"},"src/components/atoms/mg-button/mg-button.conf.ts::VariantType":{declaration:'"flat" | "info" | "success" | "link" | "primary" | "secondary" | "danger" | "danger-alt"',docstring:"",path:"src/components/atoms/mg-button/mg-button.conf.ts"},"src/components/atoms/mg-button/mg-button.conf.ts::ButtonType":{declaration:'"button" | "submit" | "reset"',docstring:"",path:"src/components/atoms/mg-button/mg-button.conf.ts"},"src/components/atoms/mg-icon/mg-icon.conf.ts::IconType":{declaration:'"filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"',docstring:"",path:"src/components/atoms/mg-icon/mg-icon.conf.ts"},"src/components/atoms/mg-icon/mg-icon.conf.ts::IconSizeType":{declaration:'"small" | "regular" | "medium" | "large" | "extra-large"',docstring:"",path:"src/components/atoms/mg-icon/mg-icon.conf.ts"},"src/components/atoms/mg-icon/mg-icon.conf.ts::IconVariantType":{declaration:'"info" | "success" | "warning" | "danger" | "app"',docstring:"",path:"src/components/atoms/mg-icon/mg-icon.conf.ts"},"src/components/atoms/mg-icon/mg-icon.conf.ts::IconVariantStyleType":{declaration:'"icon" | "background" | "full"',docstring:"",path:"src/components/atoms/mg-icon/mg-icon.conf.ts"},"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::Direction":{declaration:`export enum Direction {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}`,docstring:"Menu direction type",path:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts"},"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::ItemMoreType":{declaration:`{
    [P in K]: T[P];
}`,docstring:"",path:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts"},"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::MenuSizeType":{declaration:'"regular" | "medium" | "large"',docstring:"",path:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts"},"src/components/molecules/mg-item-more/mg-item-more.conf.ts::IconType":{declaration:`{
    [P in K]: T[P];
}`,docstring:"",path:"src/components/molecules/mg-item-more/mg-item-more.conf.ts"},"src/components/molecules/mg-item-more/mg-item-more.conf.ts::SlotLabelType":{declaration:`{
  label?: string;
  display?: boolean;
}`,docstring:"",path:"src/components/molecules/mg-item-more/mg-item-more.conf.ts"},"src/components/molecules/mg-item-more/mg-item-more.conf.ts::SizeType":{declaration:'"regular" | "medium" | "large"',docstring:"",path:"src/components/molecules/mg-item-more/mg-item-more.conf.ts"},"../../node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/index.d.ts::Placement":{declaration:"any",docstring:"",path:"../../node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/index.d.ts"},"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts::TargetType":{declaration:'"_blank" | "_self" | "_parent" | "_top"',docstring:"",path:"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts"},"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts::Status":{declaration:`export enum Status {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  DISABLED = 'disabled',
  ACTIVE = 'active',
}`,docstring:"Available menu item status",path:"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts"},"src/components/atoms/mg-card/mg-card.conf.ts::VariantType":{declaration:'"info" | "success" | "warning" | "danger" | "app"',docstring:"",path:"src/components/atoms/mg-card/mg-card.conf.ts"},"src/components/atoms/mg-card/mg-card.conf.ts::VariantStyleType":{declaration:'"fill" | "bar-left"',docstring:"",path:"src/components/atoms/mg-card/mg-card.conf.ts"},"src/components/atoms/mg-tag/mg-tag.conf.ts::TagVariantType":{declaration:'"info" | "success" | "primary" | "secondary" | "warning" | "danger"',docstring:"",path:"src/components/atoms/mg-tag/mg-tag.conf.ts"},"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition":{declaration:'"input" | "label"',docstring:"",path:"src/components/molecules/inputs/mg-input/mg-input.conf.ts"},"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxValue":{declaration:`export interface CheckboxValue {
  title: string;
  value: boolean | null;
  disabled?: boolean;
  required?: boolean;
}`,docstring:`interface CheckboxValue
use to match returned value`,path:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts"},"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxType":{declaration:'"checkbox" | "multi"',docstring:"",path:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts"},"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxItem":{declaration:`export interface CheckboxItem extends CheckboxValue {
  _id: string;
  _handleInput: (event: InputEvent & { target: HTMLInputElement }) => void;
  _handleBlur: () => void;
  _handleKeydown: (event: KeyboardEvent & { target: HTMLElement }) => void;
  _handleMouseEnter: () => void;
  _handleMouseLeave: () => void;
}`,docstring:`interface CheckboxItem
use to match checkbox attributes`,path:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts"},"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::SectionKind":{declaration:`export enum SectionKind {
  SELECTED = 'selected',
  NOT_SELECTED = 'not-selected',
}`,docstring:"mg-input-checkbox-paginated section kind",path:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts"},"src/components/molecules/inputs/mg-input/mg-input.conf.ts::Width":{declaration:'2 | 4 | 16 | "full"',docstring:"",path:"src/components/molecules/inputs/mg-input/mg-input.conf.ts"},"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts::NumericType":{declaration:'"decimal" | "integer" | "currency"',docstring:"",path:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts"},"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts::Format":{declaration:'"number" | "none" | "currency"',docstring:"",path:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts"},"src/components/molecules/inputs/mg-input-radio/mg-input-radio.conf.ts::RadioOption":{declaration:`{
  title: string;
  value: unknown;
  disabled?: boolean;
}`,docstring:"",path:"src/components/molecules/inputs/mg-input-radio/mg-input-radio.conf.ts"},"src/components/molecules/inputs/mg-input-select/mg-input-select.conf.ts::SelectOption":{declaration:`{
  title: string;
  value: unknown;
  disabled?: boolean;
  group?: string;
}`,docstring:"",path:"src/components/molecules/inputs/mg-input-select/mg-input-select.conf.ts"},"src/components/molecules/inputs/mg-input-text/mg-input-text.conf.ts::TextType":{declaration:"export type TextType = 'text' | 'search';",docstring:"",path:"src/components/molecules/inputs/mg-input-text/mg-input-text.conf.ts"},"src/components.d.ts::IconType":{declaration:"any",docstring:"",path:"src/components.d.ts"},"src/components/molecules/inputs/mg-input-toggle/mg-input-toggle.conf.ts::ToggleValue":{declaration:`{
  title: string;
  value: unknown;
}`,docstring:"",path:"src/components/molecules/inputs/mg-input-toggle/mg-input-toggle.conf.ts"},"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreItemType":{declaration:`export type MgActionMoreItemType = Pick<MgMenuItem, 'status' | 'href' | 'target'> & {
  label: string;
  mouseEventHandler: IMouseEventHandler;
  icon?: MgIcon['icon'];
  badge?: Pick<MgBadge, 'value' | 'label'>;
};`,docstring:"",path:"src/components/molecules/mg-action-more/mg-action-more.conf.ts"},"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreIconType":{declaration:`{
    [P in K]: T[P];
}`,docstring:"",path:"src/components/molecules/mg-action-more/mg-action-more.conf.ts"},"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreButtonType":{declaration:`{
    [P in K]: T[P];
}`,docstring:"",path:"src/components/molecules/mg-action-more/mg-action-more.conf.ts"},"src/components/molecules/mg-form/mg-form.conf.ts::RequiredMessageStatusType":{declaration:'"default" | "hide"',docstring:"",path:"src/components/molecules/mg-form/mg-form.conf.ts"},"src/components/molecules/mg-form/mg-form.conf.ts::AriaRoleType":{declaration:'"none" | "form" | "search" | "presentation"',docstring:"",path:"src/components/molecules/mg-form/mg-form.conf.ts"},"src/components/molecules/mg-message/mg-message.conf.ts::VariantType":{declaration:'"info" | "success" | "warning" | "danger"',docstring:"",path:"src/components/molecules/mg-message/mg-message.conf.ts"},"src/components/molecules/mg-modal/mg-modal.conf.ts::DialogRoleType":{declaration:'"dialog" | "alertdialog"',docstring:"",path:"src/components/molecules/mg-modal/mg-modal.conf.ts"},"src/components/molecules/mg-panel/mg-panel.conf.ts::TitlePositionType":{declaration:'"right" | "left"',docstring:"",path:"src/components/molecules/mg-panel/mg-panel.conf.ts"},"src/components/molecules/mg-panel/mg-panel.conf.ts::ExpandToggleDisplayType":{declaration:'"text" | "icon"',docstring:"",path:"src/components/molecules/mg-panel/mg-panel.conf.ts"},"src/components/molecules/mg-skip-links/mg-skip-links.conf.tsx::SkipLink":{declaration:`{
  href: string;
  label: string;
}`,docstring:"",path:"src/components/molecules/mg-skip-links/mg-skip-links.conf.tsx"},"src/components/molecules/mg-tabs/mg-tabs.conf.ts::SizeType":{declaration:'"regular" | "large"',docstring:"",path:"src/components/molecules/mg-tabs/mg-tabs.conf.ts"},"src/components/molecules/mg-tabs/mg-tabs.conf.ts::TabItem":{declaration:`{
  label: string;
  icon?: MgIcon['icon'];
  badge?: Pick<MgBadge, 'value' | 'variant' | 'label'> & { role: 'notification' | 'information' };
  status: Status;
}`,docstring:"",path:"src/components/molecules/mg-tabs/mg-tabs.conf.ts"}},gt={timestamp:ct,compiler:pt,components:ut,typeLibrary:dt},mt="mg-components",D={allRenderFn:!1,appendChildSlotFix:!1,asyncLoading:!0,asyncQueue:!1,attachStyles:!0,cloneNodeFix:!1,cmpDidLoad:!0,cmpDidRender:!0,cmpDidUnload:!1,cmpDidUpdate:!0,cmpShouldUpdate:!0,cmpWillLoad:!0,cmpWillRender:!1,cmpWillUpdate:!0,connectedCallback:!1,constructableCSS:!0,cssAnnotations:!0,devTools:!1,disconnectedCallback:!0,element:!1,event:!0,experimentalScopedSlotChanges:!1,experimentalSlotFixes:!1,formAssociated:!1,hasRenderFn:!0,hostListener:!0,hostListenerTarget:!0,hostListenerTargetBody:!1,hostListenerTargetDocument:!1,hostListenerTargetParent:!1,hostListenerTargetWindow:!0,hotModuleReplacement:!1,hydrateClientSide:!1,hydrateServerSide:!1,hydratedAttribute:!1,hydratedClass:!0,hydratedSelectorName:"hydrated",initializeNextTick:!1,invisiblePrehydration:!0,isDebug:!1,isDev:!1,isTesting:!1,lazyLoad:!0,lifecycle:!0,lifecycleDOMEvents:!1,member:!0,method:!0,mode:!1,observeAttribute:!0,profile:!1,prop:!0,propBoolean:!0,propMutable:!0,propNumber:!0,propString:!0,reflect:!0,scoped:!0,scopedSlotTextContentFix:!1,scriptDataOpts:!1,shadowDelegatesFocus:!1,shadowDom:!0,slot:!0,slotChildNodesFix:!1,slotRelocation:!0,state:!0,style:!0,svg:!1,taskQueue:!0,transformTagName:!1,updatable:!0,vdomAttribute:!0,vdomClass:!0,vdomFunctional:!0,vdomKey:!0,vdomListener:!0,vdomPropOrAttr:!0,vdomRef:!0,vdomRender:!0,vdomStyle:!0,vdomText:!0,vdomXlink:!0,watchCallback:!0};var ft=Object.defineProperty,ht=(e,t)=>{for(var n in t)ft(e,n,{get:t[n],enumerable:!0})},G=new WeakMap,k=e=>G.get(e),vn=(e,t)=>G.set(t.$lazyInstance$=e,t),yt=(e,t)=>{const n={$flags$:0,$hostElement$:e,$cmpMeta$:t,$instanceValues$:new Map};return n.$onInstancePromise$=new Promise(o=>n.$onInstanceResolve$=o),n.$onReadyPromise$=new Promise(o=>n.$onReadyResolve$=o),e["s-p"]=[],e["s-rc"]=[],G.set(e,n)},oe=(e,t)=>t in e,w=(e,t)=>(0,console.error)(e,t),W=new Map,vt=(e,t,n)=>{const o=e.$tagName$.replace(/-/g,"_"),a=e.$lazyBundleId$;if(!a)return;const l=W.get(a);if(l)return l[o];{const r=i=>(W.set(a,i),i[o]);switch(a){case"mg-action-more_36":return V(()=>import("./mg-action-more_36.entry-Bryyxsnr.js"),__vite__mapDeps([0,1,2,3,4]),import.meta.url).then(r,w);case"mg-loader":return V(()=>import("./mg-loader.entry-CztCrX8o.js"),__vite__mapDeps([5,1,2,3,4]),import.meta.url).then(r,w)}}return V(()=>import(`./${a}.entry.js`),[],import.meta.url).then(r=>(W.set(a,r),r[o]),w)},C=new Map,bt="{visibility:hidden}.hydrated{visibility:inherit}",ye="slot-fb{display:contents}slot-fb[hidden]{display:none}",ae="http://www.w3.org/1999/xlink",P=typeof window<"u"?window:{},b=P.document||{head:{}},y={$flags$:0,$resourcesUrl$:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,o)=>e.addEventListener(t,n,o),rel:(e,t,n,o)=>e.removeEventListener(t,n,o),ce:(e,t)=>new CustomEvent(e,t)},Tt=(()=>{let e=!1;try{b.addEventListener("e",null,Object.defineProperty({},"passive",{get(){e=!0}}))}catch{}return e})(),xt=e=>Promise.resolve(e),wt=(()=>{try{return new CSSStyleSheet,typeof new CSSStyleSheet().replaceSync=="function"}catch{}return!1})(),j=!1,le=[],ve=[],kt=(e,t)=>n=>{e.push(n),j||(j=!0,y.$flags$&4?K(F):y.raf(F))},ie=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(n){w(n)}e.length=0},F=()=>{ie(le),ie(ve),(j=le.length>0)&&y.raf(F)},K=e=>xt().then(e),$t=kt(ve),se={},It=e=>e!=null,Y=e=>(e=typeof e,e==="object"||e==="function");function be(e){var t,n,o;return(o=(n=(t=e.head)==null?void 0:t.querySelector('meta[name="csp-nonce"]'))==null?void 0:n.getAttribute("content"))!=null?o:void 0}var At={};ht(At,{err:()=>Te,map:()=>qt,ok:()=>N,unwrap:()=>St,unwrapErr:()=>Dt});var N=e=>({isOk:!0,isErr:!1,value:e}),Te=e=>({isOk:!1,isErr:!0,value:e});function qt(e,t){if(e.isOk){const n=t(e.value);return n instanceof Promise?n.then(o=>N(o)):N(n)}if(e.isErr){const n=e.value;return Te(n)}throw"should never get here"}var St=e=>{if(e.isOk)return e.value;throw e.value},Dt=e=>{if(e.isErr)return e.value;throw e.value},$=(e,t="")=>()=>{},Et=(e,t)=>()=>{},xe=(e,t,...n)=>{let o=null,a=null,l=null,r=!1,i=!1;const s=[],u=d=>{for(let p=0;p<d.length;p++)o=d[p],Array.isArray(o)?u(o):o!=null&&typeof o!="boolean"&&((r=typeof e!="function"&&!Y(o))&&(o=String(o)),r&&i?s[s.length-1].$text$+=o:s.push(r?_(null,o):o),i=r)};if(u(n),t){t.key&&(a=t.key),t.name&&(l=t.name);{const d=t.className||t.class;d&&(t.class=typeof d!="object"?d:Object.keys(d).filter(p=>d[p]).join(" "))}}if(typeof e=="function")return e(t===null?{}:t,s,zt);const c=_(e,null);return c.$attrs$=t,s.length>0&&(c.$children$=s),c.$key$=a,c.$name$=l,c},_=(e,t)=>{const n={$flags$:0,$tag$:e,$text$:t,$elm$:null,$children$:null};return n.$attrs$=null,n.$key$=null,n.$name$=null,n},Mt={},Pt=e=>e&&e.$tag$===Mt,zt={forEach:(e,t)=>e.map(re).forEach(t),map:(e,t)=>e.map(re).map(t).map(Lt)},re=e=>({vattrs:e.$attrs$,vchildren:e.$children$,vkey:e.$key$,vname:e.$name$,vtag:e.$tag$,vtext:e.$text$}),Lt=e=>{if(typeof e.vtag=="function"){const n={...e.vattrs};return e.vkey&&(n.key=e.vkey),e.vname&&(n.name=e.vname),xe(e.vtag,n,...e.vchildren||[])}const t=_(e.vtag,e.vtext);return t.$attrs$=e.vattrs,t.$children$=e.vchildren,t.$key$=e.vkey,t.$name$=e.vname,t},Ct=(e,t)=>e!=null&&!Y(e)?t&4?e==="false"?!1:e===""||!!e:t&2?parseFloat(e):t&1?String(e):e:e,_t=e=>k(e).$hostElement$,bn=(e,t,n)=>{const o=_t(e);return{emit:a=>we(o,t,{bubbles:!!(n&4),composed:!!(n&2),cancelable:!!(n&1),detail:a})}},we=(e,t,n)=>{const o=y.ce(t,n);return e.dispatchEvent(o),o},ce=new WeakMap,Ot=(e,t,n)=>{let o=C.get(e);wt&&n?(o=o||new CSSStyleSheet,typeof o=="string"?o=t:o.replaceSync(t)):o=t,C.set(e,o)},Ht=(e,t,n)=>{var o;const a=ke(t),l=C.get(a);if(e=e.nodeType===11?e:b,l)if(typeof l=="string"){e=e.head||e;let r=ce.get(e),i;if(r||ce.set(e,r=new Set),!r.has(a)){{i=b.createElement("style"),i.innerHTML=l;const s=(o=y.$nonce$)!=null?o:be(b);if(s!=null&&i.setAttribute("nonce",s),!(t.$flags$&1))if(e.nodeName==="HEAD"){const u=e.querySelectorAll("link[rel=preconnect]"),c=u.length>0?u[u.length-1].nextSibling:document.querySelector("style");e.insertBefore(i,c)}else"host"in e?e.prepend(i):e.append(i);t.$flags$&1&&e.nodeName!=="HEAD"&&e.insertBefore(i,null)}t.$flags$&4&&(i.innerHTML+=ye),r&&r.add(a)}}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return a},Rt=e=>{const t=e.$cmpMeta$,n=e.$hostElement$,o=t.$flags$,a=$("attachStyles",t.$tagName$),l=Ht(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);o&10&&o&2&&(n["s-sc"]=l,n.classList.add(l+"-h"),o&2&&n.classList.add(l+"-s")),a()},ke=(e,t)=>"sc-"+e.$tagName$,pe=(e,t,n,o,a,l)=>{if(n!==o){let r=oe(e,t),i=t.toLowerCase();if(t==="class"){const s=e.classList,u=ue(n),c=ue(o);s.remove(...u.filter(d=>d&&!c.includes(d))),s.add(...c.filter(d=>d&&!u.includes(d)))}else if(t==="style"){for(const s in n)(!o||o[s]==null)&&(s.includes("-")?e.style.removeProperty(s):e.style[s]="");for(const s in o)(!n||o[s]!==n[s])&&(s.includes("-")?e.style.setProperty(s,o[s]):e.style[s]=o[s])}else if(t!=="key")if(t==="ref")o&&o(e);else if(!r&&t[0]==="o"&&t[1]==="n"){if(t[2]==="-"?t=t.slice(3):oe(P,i)?t=i.slice(2):t=i[2]+t.slice(3),n||o){const s=t.endsWith($e);t=t.replace(Wt,""),n&&y.rel(e,t,n,s),o&&y.ael(e,t,o,s)}}else{const s=Y(o);if((r||s&&o!==null)&&!a)try{if(e.tagName.includes("-"))e[t]=o;else{const c=o??"";t==="list"?r=!1:(n==null||e[t]!=c)&&(typeof e.__lookupSetter__(t)=="function"?e[t]=c:e.setAttribute(t,c))}}catch{}let u=!1;i!==(i=i.replace(/^xlink\:?/,""))&&(t=i,u=!0),o==null||o===!1?(o!==!1||e.getAttribute(t)==="")&&(u?e.removeAttributeNS(ae,t):e.removeAttribute(t)):(!r||l&4||a)&&!s&&(o=o===!0?"":o,u?e.setAttributeNS(ae,t,o):e.setAttribute(t,o))}}},Vt=/\s/,ue=e=>e?e.split(Vt):[],$e="Capture",Wt=new RegExp($e+"$"),Ie=(e,t,n)=>{const o=t.$elm$.nodeType===11&&t.$elm$.host?t.$elm$.host:t.$elm$,a=e&&e.$attrs$||se,l=t.$attrs$||se;for(const r of de(Object.keys(a)))r in l||pe(o,r,a[r],void 0,n,t.$flags$);for(const r of de(Object.keys(l)))pe(o,r,a[r],l[r],n,t.$flags$)};function de(e){return e.includes("ref")?[...e.filter(t=>t!=="ref"),"ref"]:e}var q,U,E,O=!1,H=!1,X=!1,Ae=!1,R=(e,t,n,o)=>{var a;const l=t.$children$[n];let r=0,i,s,u;if(O||(X=!0,l.$tag$==="slot"&&(q&&o.classList.add(q+"-s"),l.$flags$|=l.$children$?2:1)),l.$text$!==null)i=l.$elm$=b.createTextNode(l.$text$);else if(l.$flags$&1)i=l.$elm$=b.createTextNode("");else if(i=l.$elm$=b.createElement(!O&&D.slotRelocation&&l.$flags$&2?"slot-fb":l.$tag$),Ie(null,l,Ae),!!i.getRootNode().querySelector("body")&&D.scoped&&It(q)&&i["s-si"]!==q&&i.classList.add(i["s-si"]=q),Z(i,o),l.$children$)for(r=0;r<l.$children$.length;++r)s=R(e,l,r,i),s&&i.appendChild(s);return i["s-hn"]=E,l.$flags$&3&&(i["s-sr"]=!0,i["s-cr"]=U,i["s-sn"]=l.$name$||"",i["s-rf"]=(a=l.$attrs$)==null?void 0:a.ref,u=e&&e.$children$&&e.$children$[n],u&&u.$tag$===l.$tag$&&e.$elm$&&M(e.$elm$,!1)),i},M=(e,t)=>{y.$flags$|=1;const n=Array.from(e.childNodes);if(e["s-sr"]&&D.experimentalSlotFixes){let o=e;for(;o=o.nextSibling;)o&&o["s-sn"]===e["s-sn"]&&o["s-sh"]===E&&n.push(o)}for(let o=n.length-1;o>=0;o--){const a=n[o];a["s-hn"]!==E&&a["s-ol"]&&(I(De(a),a,J(a)),a["s-ol"].remove(),a["s-ol"]=void 0,a["s-sh"]=void 0,X=!0),t&&M(a,t)}y.$flags$&=-2},qe=(e,t,n,o,a,l)=>{let r=e["s-cr"]&&e["s-cr"].parentNode||e,i;for(r.shadowRoot&&r.tagName===E&&(r=r.shadowRoot);a<=l;++a)o[a]&&(i=R(null,n,a,e),i&&(o[a].$elm$=i,I(r,i,J(t))))},Se=(e,t,n)=>{for(let o=t;o<=n;++o){const a=e[o];if(a){const l=a.$elm$;Pe(a),l&&(H=!0,l["s-ol"]?l["s-ol"].remove():M(l,!0),l.remove())}}},Bt=(e,t,n,o,a=!1)=>{let l=0,r=0,i=0,s=0,u=t.length-1,c=t[0],d=t[u],p=o.length-1,g=o[0],m=o[p],h,v;for(;l<=u&&r<=p;)if(c==null)c=t[++l];else if(d==null)d=t[--u];else if(g==null)g=o[++r];else if(m==null)m=o[--p];else if(L(c,g,a))S(c,g,a),c=t[++l],g=o[++r];else if(L(d,m,a))S(d,m,a),d=t[--u],m=o[--p];else if(L(c,m,a))(c.$tag$==="slot"||m.$tag$==="slot")&&M(c.$elm$.parentNode,!1),S(c,m,a),I(e,c.$elm$,d.$elm$.nextSibling),c=t[++l],m=o[--p];else if(L(d,g,a))(c.$tag$==="slot"||m.$tag$==="slot")&&M(d.$elm$.parentNode,!1),S(d,g,a),I(e,d.$elm$,c.$elm$),d=t[--u],g=o[++r];else{for(i=-1,s=l;s<=u;++s)if(t[s]&&t[s].$key$!==null&&t[s].$key$===g.$key$){i=s;break}i>=0?(v=t[i],v.$tag$!==g.$tag$?h=R(t&&t[r],n,i,e):(S(v,g,a),t[i]=void 0,h=v.$elm$),g=o[++r]):(h=R(t&&t[r],n,r,e),g=o[++r]),h&&I(De(c.$elm$),h,J(c.$elm$))}l>u?qe(e,o[p+1]==null?null:o[p+1].$elm$,n,o,r,p):r>p&&Se(t,l,u)},L=(e,t,n=!1)=>e.$tag$===t.$tag$?e.$tag$==="slot"?"$nodeId$"in e&&n&&e.$elm$.nodeType!==8?!1:e.$name$===t.$name$:n?!0:e.$key$===t.$key$:!1,J=e=>e&&e["s-ol"]||e,De=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,S=(e,t,n=!1)=>{const o=t.$elm$=e.$elm$,a=e.$children$,l=t.$children$,r=t.$tag$,i=t.$text$;let s;i===null?(r==="slot"&&!O||Ie(e,t,Ae),a!==null&&l!==null?Bt(o,a,t,l,n):l!==null?(e.$text$!==null&&(o.textContent=""),qe(o,null,t,l,0,l.length-1)):!n&&D.updatable&&a!==null&&Se(a,0,a.length-1)):(s=o["s-cr"])?s.parentNode.textContent=i:e.$text$!==i&&(o.data=i)},Ee=e=>{const t=e.childNodes;for(const n of t)if(n.nodeType===1){if(n["s-sr"]){const o=n["s-sn"];n.hidden=!1;for(const a of t)if(a!==n){if(a["s-hn"]!==n["s-hn"]||o!==""){if(a.nodeType===1&&(o===a.getAttribute("slot")||o===a["s-sn"])||a.nodeType===3&&o===a["s-sn"]){n.hidden=!0;break}}else if(a.nodeType===1||a.nodeType===3&&a.textContent.trim()!==""){n.hidden=!0;break}}}Ee(n)}},x=[],Me=e=>{let t,n,o;for(const a of e.childNodes){if(a["s-sr"]&&(t=a["s-cr"])&&t.parentNode){n=t.parentNode.childNodes;const l=a["s-sn"];for(o=n.length-1;o>=0;o--)if(t=n[o],!t["s-cn"]&&!t["s-nr"]&&t["s-hn"]!==a["s-hn"]&&!D.experimentalSlotFixes)if(ge(t,l)){let r=x.find(i=>i.$nodeToRelocate$===t);H=!0,t["s-sn"]=t["s-sn"]||l,r?(r.$nodeToRelocate$["s-sh"]=a["s-hn"],r.$slotRefNode$=a):(t["s-sh"]=a["s-hn"],x.push({$slotRefNode$:a,$nodeToRelocate$:t})),t["s-sr"]&&x.map(i=>{ge(i.$nodeToRelocate$,t["s-sn"])&&(r=x.find(s=>s.$nodeToRelocate$===t),r&&!i.$slotRefNode$&&(i.$slotRefNode$=r.$slotRefNode$))})}else x.some(r=>r.$nodeToRelocate$===t)||x.push({$nodeToRelocate$:t})}a.nodeType===1&&Me(a)}},ge=(e,t)=>e.nodeType===1?e.getAttribute("slot")===null&&t===""||e.getAttribute("slot")===t:e["s-sn"]===t?!0:t==="",Pe=e=>{e.$attrs$&&e.$attrs$.ref&&e.$attrs$.ref(null),e.$children$&&e.$children$.map(Pe)},I=(e,t,n)=>{const o=e==null?void 0:e.insertBefore(t,n);return Z(t,e),o},ze=e=>{const t=[];return e&&t.push(...e["s-scs"]||[],e["s-si"],e["s-sc"],...ze(e.parentElement)),t},Z=(e,t,n=!1)=>{var o;if(e&&t&&e.nodeType===1){const a=new Set(ze(t).filter(Boolean));if(a.size&&((o=e.classList)==null||o.add(...e["s-scs"]=[...a]),e["s-ol"]||n))for(const l of Array.from(e.childNodes))Z(l,e,!0)}},jt=(e,t,n=!1)=>{var o,a,l,r;const i=e.$hostElement$,s=e.$cmpMeta$,u=e.$vnode$||_(null,null),c=Pt(t)?t:xe(null,null,t);if(E=i.tagName,s.$attrsToReflect$&&(c.$attrs$=c.$attrs$||{},s.$attrsToReflect$.map(([d,p])=>c.$attrs$[p]=i[d])),n&&c.$attrs$)for(const d of Object.keys(c.$attrs$))i.hasAttribute(d)&&!["key","ref","style","class"].includes(d)&&(c.$attrs$[d]=i[d]);c.$tag$=null,c.$flags$|=4,e.$vnode$=c,c.$elm$=u.$elm$=i.shadowRoot||i,q=i["s-sc"],O=(s.$flags$&1)!==0,U=i["s-cr"],H=!1,S(u,c,n);{if(y.$flags$|=1,X){Me(c.$elm$);for(const d of x){const p=d.$nodeToRelocate$;if(!p["s-ol"]){const g=b.createTextNode("");g["s-nr"]=p,I(p.parentNode,p["s-ol"]=g,p)}}for(const d of x){const p=d.$nodeToRelocate$,g=d.$slotRefNode$;if(g){const m=g.parentNode;let h=g.nextSibling;{let v=(o=p["s-ol"])==null?void 0:o.previousSibling;for(;v;){let f=(a=v["s-nr"])!=null?a:null;if(f&&f["s-sn"]===p["s-sn"]&&m===f.parentNode){for(f=f.nextSibling;f===p||f!=null&&f["s-sr"];)f=f==null?void 0:f.nextSibling;if(!f||!f["s-nr"]){h=f;break}}v=v.previousSibling}}(!h&&m!==p.parentNode||p.nextSibling!==h)&&p!==h&&(!p["s-hn"]&&p["s-ol"]&&(p["s-hn"]=p["s-ol"].parentNode.nodeName),I(m,p,h),p.nodeType===1&&(p.hidden=(l=p["s-ih"])!=null?l:!1)),p&&typeof g["s-rf"]=="function"&&g["s-rf"](p)}else p.nodeType===1&&(n&&(p["s-ih"]=(r=p.hidden)!=null?r:!1),p.hidden=!0)}}H&&Ee(c.$elm$),y.$flags$&=-2,x.length=0}U=void 0},Le=(e,t)=>{t&&!e.$onRenderResolve$&&t["s-p"]&&t["s-p"].push(new Promise(n=>e.$onRenderResolve$=n))},Q=(e,t)=>{if(e.$flags$|=16,e.$flags$&4){e.$flags$|=512;return}return Le(e,e.$ancestorComponent$),$t(()=>Ft(e,t))},Ft=(e,t)=>{const n=e.$hostElement$,o=$("scheduleUpdate",e.$cmpMeta$.$tagName$),a=e.$lazyInstance$;if(!a)throw new Error(`Can't render component <${n.tagName.toLowerCase()} /> with invalid Stencil runtime! Make sure this imported component is compiled with a \`externalRuntime: true\` flag. For more information, please refer to https://stenciljs.com/docs/custom-elements#externalruntime`);let l;return t?(e.$flags$|=256,e.$queuedListeners$&&(e.$queuedListeners$.map(([r,i])=>A(a,r,i)),e.$queuedListeners$=void 0),l=A(a,"componentWillLoad")):l=A(a,"componentWillUpdate"),o(),Nt(l,()=>Gt(e,a,t))},Nt=(e,t)=>Ut(e)?e.then(t).catch(n=>{console.error(n),t()}):t(),Ut=e=>e instanceof Promise||e&&e.then&&typeof e.then=="function",Gt=async(e,t,n)=>{var o;const a=e.$hostElement$,l=$("update",e.$cmpMeta$.$tagName$),r=a["s-rc"];n&&Rt(e);const i=$("render",e.$cmpMeta$.$tagName$);Kt(e,t,a,n),r&&(r.map(s=>s()),a["s-rc"]=void 0),i(),l();{const s=(o=a["s-p"])!=null?o:[],u=()=>Yt(e);s.length===0?u():(Promise.all(s).then(u),e.$flags$|=4,s.length=0)}},Kt=(e,t,n,o)=>{try{t=t.render&&t.render(),e.$flags$&=-17,e.$flags$|=2,jt(e,t,o)}catch(a){w(a,e.$hostElement$)}return null},Yt=e=>{const t=e.$cmpMeta$.$tagName$,n=e.$hostElement$,o=$("postUpdate",t),a=e.$lazyInstance$,l=e.$ancestorComponent$;A(a,"componentDidRender"),e.$flags$&64?(A(a,"componentDidUpdate"),o()):(e.$flags$|=64,_e(n),A(a,"componentDidLoad"),o(),e.$onReadyResolve$(n),l||Ce()),e.$onInstanceResolve$(n),e.$onRenderResolve$&&(e.$onRenderResolve$(),e.$onRenderResolve$=void 0),e.$flags$&512&&K(()=>Q(e,!1)),e.$flags$&=-517},Ce=e=>{_e(b.documentElement),K(()=>we(P,"appload",{detail:{namespace:mt}}))},A=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(o){w(o)}},_e=e=>{var t;return e.classList.add((t=D.hydratedSelectorName)!=null?t:"hydrated")},Xt=(e,t)=>k(e).$instanceValues$.get(t),Jt=(e,t,n,o)=>{const a=k(e);if(!a)throw new Error(`Couldn't find host element for "${o.$tagName$}" as it is unknown to this Stencil runtime. This usually happens when integrating a 3rd party Stencil component with another Stencil component or application. Please reach out to the maintainers of the 3rd party Stencil component or report this on the Stencil Discord server (https://chat.stenciljs.com) or comment on this similar [GitHub issue](https://github.com/ionic-team/stencil/issues/5457).`);const l=a.$hostElement$,r=a.$instanceValues$.get(t),i=a.$flags$,s=a.$lazyInstance$;n=Ct(n,o.$members$[t][0]);const u=Number.isNaN(r)&&Number.isNaN(n),c=n!==r&&!u;if((!(i&8)||r===void 0)&&c&&(a.$instanceValues$.set(t,n),s)){if(o.$watchers$&&i&128){const d=o.$watchers$[t];d&&d.map(p=>{try{s[p](n,r,t)}catch(g){w(g,l)}})}if((i&18)===2){if(s.componentShouldUpdate&&s.componentShouldUpdate(n,r,t)===!1)return;Q(a,!1)}}},Oe=(e,t,n)=>{var o,a;const l=e.prototype;if(t.$members$||t.$watchers$||e.watchers){e.watchers&&!t.$watchers$&&(t.$watchers$=e.watchers);const r=Object.entries((o=t.$members$)!=null?o:{});if(r.map(([i,[s]])=>{s&31||n&2&&s&32?Object.defineProperty(l,i,{get(){return Xt(this,i)},set(u){Jt(this,i,u,t)},configurable:!0,enumerable:!0}):n&1&&s&64&&Object.defineProperty(l,i,{value(...u){var c;const d=k(this);return(c=d==null?void 0:d.$onInstancePromise$)==null?void 0:c.then(()=>{var p;return(p=d.$lazyInstance$)==null?void 0:p[i](...u)})}})}),n&1){const i=new Map;l.attributeChangedCallback=function(s,u,c){y.jmp(()=>{var d;const p=i.get(s);if(this.hasOwnProperty(p))c=this[p],delete this[p];else{if(l.hasOwnProperty(p)&&typeof this[p]=="number"&&this[p]==c)return;if(p==null){const g=k(this),m=g==null?void 0:g.$flags$;if(m&&!(m&8)&&m&128&&c!==u){const h=g.$lazyInstance$,v=(d=t.$watchers$)==null?void 0:d[s];v==null||v.forEach(f=>{h[f]!=null&&h[f].call(h,c,u,s)})}return}}this[p]=c===null&&typeof this[p]=="boolean"?!1:c})},e.observedAttributes=Array.from(new Set([...Object.keys((a=t.$watchers$)!=null?a:{}),...r.filter(([s,u])=>u[0]&15).map(([s,u])=>{var c;const d=u[1]||s;return i.set(d,s),u[0]&512&&((c=t.$attrsToReflect$)==null||c.push([s,d])),d})]))}}return e},Zt=async(e,t,n,o)=>{let a;if(!(t.$flags$&32)){if(t.$flags$|=32,n.$lazyBundleId$){const s=vt(n);if(s&&"then"in s){const c=Et();a=await s,c()}else a=s;if(!a)throw new Error(`Constructor for "${n.$tagName$}#${t.$modeName$}" was not found`);a.isProxied||(n.$watchers$=a.watchers,Oe(a,n,2),a.isProxied=!0);const u=$("createInstance",n.$tagName$);t.$flags$|=8;try{new a(t)}catch(c){w(c)}t.$flags$&=-9,t.$flags$|=128,u()}else{a=e.constructor;const s=e.localName;customElements.whenDefined(s).then(()=>t.$flags$|=128)}if(a&&a.style){let s;typeof a.style=="string"&&(s=a.style);const u=ke(n);if(!C.has(u)){const c=$("registerStyles",n.$tagName$);Ot(u,s,!!(n.$flags$&1)),c()}}}const l=t.$ancestorComponent$,r=()=>Q(t,!0);l&&l["s-rc"]?l["s-rc"].push(r):r()},Qt=e=>{},en=e=>{if(!(y.$flags$&1)){const t=k(e),n=t.$cmpMeta$,o=$("connectedCallback",n.$tagName$);if(t.$flags$&1)He(e,t,n.$listeners$),t!=null&&t.$lazyInstance$||t!=null&&t.$onReadyPromise$&&t.$onReadyPromise$.then(()=>Qt());else{t.$flags$|=1,n.$flags$&12&&tn(e);{let a=e;for(;a=a.parentNode||a.host;)if(a["s-p"]){Le(t,t.$ancestorComponent$=a);break}}n.$members$&&Object.entries(n.$members$).map(([a,[l]])=>{if(l&31&&e.hasOwnProperty(a)){const r=e[a];delete e[a],e[a]=r}}),Zt(e,t,n)}o()}},tn=e=>{const t=e["s-cr"]=b.createComment("");t["s-cn"]=!0,I(e,t,e.firstChild)},me=e=>{A(e,"disconnectedCallback")},nn=async e=>{if(!(y.$flags$&1)){const t=k(e);t.$rmListeners$&&(t.$rmListeners$.map(n=>n()),t.$rmListeners$=void 0),t!=null&&t.$lazyInstance$?me(t.$lazyInstance$):t!=null&&t.$onReadyPromise$&&t.$onReadyPromise$.then(()=>me(t.$lazyInstance$))}},on=(e,t={})=>{var n;const o=$(),a=[],l=t.exclude||[],r=P.customElements,i=b.head,s=i.querySelector("meta[charset]"),u=b.createElement("style"),c=[];let d,p=!0;Object.assign(y,t),y.$resourcesUrl$=new URL(t.resourcesUrl||"./",b.baseURI).href;let g=!1;if(e.map(m=>{m[1].map(h=>{var v;const f={$flags$:h[0],$tagName$:h[1],$members$:h[2],$listeners$:h[3]};f.$flags$&4&&(g=!0),f.$members$=h[2],f.$listeners$=h[3],f.$attrsToReflect$=[],f.$watchers$=(v=h[4])!=null?v:{};const z=f.$tagName$,Re=class extends HTMLElement{constructor(T){if(super(T),this.hasRegisteredEventListeners=!1,T=this,yt(T,f),f.$flags$&1){if(!T.shadowRoot)T.attachShadow({mode:"open"});else if(T.shadowRoot.mode!=="open")throw new Error(`Unable to re-use existing shadow root for ${f.$tagName$}! Mode is set to ${T.shadowRoot.mode} but Stencil only supports open shadow roots.`)}}connectedCallback(){const T=k(this);this.hasRegisteredEventListeners||(this.hasRegisteredEventListeners=!0,He(this,T,f.$listeners$)),d&&(clearTimeout(d),d=null),p?c.push(this):y.jmp(()=>en(this))}disconnectedCallback(){y.jmp(()=>nn(this))}componentOnReady(){return k(this).$onReadyPromise$}};f.$lazyBundleId$=m[0],!l.includes(z)&&!r.get(z)&&(a.push(z),r.define(z,Oe(Re,f,1)))})}),a.length>0&&(g&&(u.textContent+=ye),u.textContent+=a.sort()+bt,u.innerHTML.length)){u.setAttribute("data-styles","");const m=(n=y.$nonce$)!=null?n:be(b);m!=null&&u.setAttribute("nonce",m),i.insertBefore(u,s?s.nextSibling:i.firstChild)}p=!1,c.length?c.map(m=>m.connectedCallback()):y.jmp(()=>d=setTimeout(Ce,30)),o()},He=(e,t,n,o)=>{n&&n.map(([a,l,r])=>{const i=ln(e,a),s=an(t,r),u=sn(a);y.ael(i,l,s,u),(t.$rmListeners$=t.$rmListeners$||[]).push(()=>y.rel(i,l,s,u))})},an=(e,t)=>n=>{var o;try{e.$flags$&256?(o=e.$lazyInstance$)==null||o[t](n):(e.$queuedListeners$=e.$queuedListeners$||[]).push([t,n])}catch(a){w(a)}},ln=(e,t)=>t&8?P:e,sn=e=>Tt?{passive:(e&1)!==0,capture:(e&2)!==0}:(e&2)!==0;const rn=()=>{},cn=async(e,t)=>{if(!(typeof window>"u"))return await rn(),on(JSON.parse('[["mg-action-more_36",[[1,"mg-input-checkbox",{"value":[1040],"type":[1025],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"inputVerticalList":[4,"input-vertical-list"],"required":[4],"readonly":[4],"displaySelectedValues":[4,"display-selected-values"],"disabled":[4],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"checkboxItems":[32],"displaySearchInput":[32],"searchValue":[32],"searchResults":[32],"selectValuesButtonKey":[32],"displayError":[64],"setError":[64]},null,{"value":["validateValue"],"type":["validateType"],"inputVerticalList":["watchInputVerticalList"],"readonly":["watchReadonly","handleValidityChange"],"displaySelectedValues":["watchDisplaySelectedValues"],"required":["handleValidityChange"],"disabled":["handleValidityChange","validateDisabled"],"checkboxItems":["validateCheckboxItems"],"displaySearchInput":["watchDisplaySearchInput"],"searchValue":["validateSearchValue"]}],[1,"mg-action-more",{"items":[16],"icon":[1040],"button":[16],"displayChevron":[4,"display-chevron"],"expanded":[32]},null,{"items":["validateItems"],"icon":["validateIcon"],"button":["validateButton"],"displayChevron":["validateDisplayChevron"]}],[1,"mg-panel",{"identifier":[1],"panelTitle":[1025,"panel-title"],"titlePattern":[1,"title-pattern"],"titlePatternErrorMessage":[1,"title-pattern-error-message"],"titleEditable":[1028,"title-editable"],"titlePosition":[1,"title-position"],"expanded":[1028],"expandToggleDisplay":[1,"expand-toggle-display"],"expandToggleDisabled":[4,"expand-toggle-disabled"],"classCollection":[32],"isEditing":[32],"updatedPanelTitle":[32]},null,{"panelTitle":["validatePanelTitle"],"titlePattern":["validateTitlePattern"],"titlePatternErrorMessage":["validateTitlePattern"],"titlePosition":["validateTitlePosition"],"expanded":["handleExpanded"],"expandToggleDisplay":["validateExpandToggleDisplay"]}],[1,"mg-input-password",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1],"maxlength":[8],"required":[4],"readonly":[4],"disabled":[4],"mgWidth":[8,"mg-width"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"displayPassword":[32],"displayError":[64],"setError":[64]},null,{"value":["handleValue"],"readonly":["watchReadonly","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","watchDisabled"],"mgWidth":["watchMgWidth"]}],[1,"mg-input-textarea",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1],"maxlength":[2],"required":[4],"readonly":[4],"disabled":[4],"mgWidth":[8,"mg-width"],"pattern":[1],"patternErrorMessage":[1,"pattern-error-message"],"rows":[2],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"displayCharacterLeft":[4,"display-character-left"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"resizable":[1],"classCollection":[32],"errorMessage":[32],"displayError":[64],"setError":[64]},null,{"value":["handleValue"],"readonly":["watchReadonly","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","validateDisabled"],"mgWidth":["watchMgWidth"],"pattern":["validatePattern"],"patternErrorMessage":["validatePattern"],"displayCharacterLeft":["validateDisplayCharacterLeft"]}],[1,"mg-input-date",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"required":[4],"readonly":[4],"min":[1],"max":[1],"disabled":[4],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"displayError":[64],"setError":[64]},null,{"value":["validateValue"],"readonly":["watchReadonly","handleValidityChange"],"min":["validateMinMax","handleValidityChange"],"max":["validateMinMax","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","watchDisabled"]}],[1,"mg-input-numeric",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1],"required":[4],"readonly":[4],"max":[2],"min":[2],"disabled":[4],"mgWidth":[8,"mg-width"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"type":[1],"format":[1025],"currency":[1],"integerLength":[2,"integer-length"],"decimalLength":[2,"decimal-length"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"hasFocus":[32],"displayError":[64],"setError":[64]},null,{"value":["validateValue"],"readonly":["watchReadonly","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","watchDisabled"],"min":["handleValidityChange"],"max":["handleValidityChange"],"mgWidth":["watchMgWidth"],"type":["validateType"],"format":["watchFormat"],"integerLength":["validateIntegerLength"],"decimalLength":["validateDecimalLength"]}],[1,"mg-input-radio",{"value":[1032],"items":[16],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"inputVerticalList":[4,"input-vertical-list"],"required":[4],"readonly":[4],"disabled":[4],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"options":[32],"readonlyValue":[32],"displayError":[64],"setError":[64]},null,{"value":["watchValue"],"items":["validateItems"],"inputVerticalList":["watchInputVerticalList"],"readonly":["watchReadonly","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","watchDisabled"]}],[1,"mg-input-toggle",{"value":[1032],"items":[16],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"isOnOff":[4,"is-on-off"],"isIcon":[4,"is-icon"],"readonly":[4],"disabled":[4],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"classCollection":[32],"options":[32],"errorMessage":[32],"valid":[32],"checked":[32],"setError":[64]},null,{"value":["handleValue"],"items":["validateItems"],"isOnOff":["watchIsOnOff"],"isIcon":["watchIsIcon"],"readonly":["watchReadonly"],"disabled":["watchDisabled"],"checked":["handleChecked"]}],[1,"mg-message",{"identifier":[1],"delay":[2],"variant":[1],"closeButton":[1028,"close-button"],"hide":[1028],"noAriaRole":[4,"no-aria-role"],"classCollection":[32],"hasActions":[32]},null,{"delay":["validateDelay"],"variant":["validateVariant"],"closeButton":["validateCloseButton"],"hide":["validateHide"]}],[1,"mg-modal",{"identifier":[1],"dialogRole":[1,"dialog-role"],"modalTitle":[1,"modal-title"],"closeButton":[4,"close-button"],"hide":[1028],"hasActions":[32],"hasContent":[32],"classCollection":[32]},[[8,"keydown","handleKeyDown"]],{"dialogRole":["validateDialogRole"],"modalTitle":["validateModalTitle"],"hide":["validateHide"]}],[1,"mg-tabs",{"identifier":[1],"label":[1],"size":[1],"items":[16],"activeTab":[1538,"active-tab"],"tabs":[32],"classCollection":[32]},null,{"label":["validateLabel"],"size":["validateSize"],"items":["validateItems"],"activeTab":["validateActiveTab"]}],[1,"mg-details",{"toggleClosed":[1,"toggle-closed"],"toggleOpened":[1,"toggle-opened"],"hideSummary":[4,"hide-summary"],"expanded":[1028]},null,{"toggleClosed":["validateTitles"],"toggleOpened":["validateTitles"],"expanded":["handleExpanded"]}],[1,"mg-divider",{"size":[1]}],[1,"mg-form",{"identifier":[1],"name":[1],"readonly":[4],"requiredMessage":[1,"required-message"],"ariaRole":[1,"aria-role"],"labelOnTop":[4,"label-on-top"],"disabled":[4],"valid":[1028],"invalid":[1028],"classCollection":[32],"requiredMessageText":[32],"displayError":[64]},null,{"requiredMessage":["validateRequiredMessage","handleAttributeChange"],"ariaRole":["validateAriaRole"],"labelOnTop":["handlelabelOnTop"],"readonly":["handleAttributeChange"],"disabled":["handleAttributeChange"]}],[1,"mg-illustrated-message",{"size":[1],"direction":[1]}],[1,"mg-skip-links",{"links":[16]},null,{"links":["validateLinks"]}],[1,"mg-tag",{"variant":[1],"outline":[4],"soft":[4],"classCollection":[32]},null,{"variant":["validateVariant"],"outline":["validateOutline"],"soft":["validateSoft"]}],[2,"mg-input-checkbox-paginated",{"readonly":[4],"disabled":[4],"name":[1],"invalid":[4],"currentPage":[1026,"current-page"],"checkboxes":[16],"sectionKind":[1,"section-kind"],"messages":[16],"titleKind":[32],"expanded":[32]},null,{"checkboxes":["validateCheckboxes"],"sectionKind":["validateSectionKind"]}],[1,"mg-pagination",{"identifier":[1],"label":[1025],"hideNavigationLabels":[4,"hide-navigation-labels"],"hidePageCount":[4,"hide-page-count"],"totalPages":[2,"total-pages"],"currentPage":[1538,"current-page"]},null,{"totalPages":["validateTotalPages"],"currentPage":["validateCurrentPage"]}],[1,"mg-input-text",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"type":[1],"icon":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1],"datalistoptions":[16],"maxlength":[2],"required":[4],"readonly":[4],"disabled":[4],"mgWidth":[8,"mg-width"],"pattern":[1],"patternErrorMessage":[1,"pattern-error-message"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"displayCharacterLeft":[4,"display-character-left"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"setFocus":[64],"displayError":[64],"setError":[64]},null,{"value":["handleValue"],"icon":["validateIcon"],"datalistoptions":["validateDatalistoptions"],"readonly":["watchReadonly","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","watchDisabled"],"mgWidth":["watchMgWidth"],"pattern":["validatePattern"],"patternErrorMessage":["validatePattern"]}],[1,"mg-item-more",{"icon":[16],"slotlabel":[16],"size":[1],"parentMenu":[32]},null,{"icon":["validateIcon"],"slotlabel":["validateSlotLabel"],"size":["validateSize"]}],[1,"mg-menu",{"label":[1],"direction":[513],"itemmore":[16],"size":[1],"isChildMenu":[32]},null,{"label":["validateLabel"],"direction":["validateDirection"],"itemmore":["validateItemMore"],"size":["validateSize"]}],[1,"mg-menu-item",{"identifier":[513],"href":[1],"target":[1],"status":[1537],"expanded":[1028],"size":[32],"navigationButtonClassList":[32],"direction":[32],"isInMainMenu":[32],"isItemMore":[32],"hasChildren":[32],"displayNotificationBadge":[32]},null,{"target":["watchTarget"],"status":["validateStatus"],"expanded":["validateExpanded"],"size":["validateSize"],"direction":["validateDirection"],"hasChildren":["validateHasChildren"]}],[1,"mg-input-select",{"value":[1032],"items":[16],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1025],"placeholderHide":[4,"placeholder-hide"],"placeholderDisabled":[4,"placeholder-disabled"],"required":[4],"readonly":[4],"disabled":[4],"mgWidth":[520,"mg-width"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"options":[32],"valueExist":[32],"readonlyValue":[32],"displayError":[64],"setError":[64]},null,{"value":["validateValue"],"items":["validateItems"],"readonly":["watchReadonly","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","watchDisabled"],"mgWidth":["watchMgWidth"]}],[2,"mg-character-left",{"identifier":[1],"characters":[1],"maxlength":[2]},null,{"maxlength":["validateMaxlength"]}],[1,"mg-popover",{"identifier":[1],"placement":[1],"arrowHide":[4,"arrow-hide"],"closeButton":[4,"close-button"],"display":[1028],"disabled":[4]},null,{"identifier":["validateIdentifier"],"arrowHide":["validateArrowHide"],"closeButton":["validateCloseButton"],"display":["handleDisplay"]}],[1,"mg-badge",{"value":[8],"label":[1],"variant":[1],"outline":[4],"classCollection":[32]},null,{"value":["validateValue"],"label":["validateLabel"],"variant":["validateVariant"],"outline":["validateOutline"]}],[1,"mg-popover-content",{"closeButton":[4,"close-button"],"classCollection":[32]}],[1,"mg-card",{"variant":[1],"variantStyle":[1025,"variant-style"],"classCollection":[32]},null,{"variant":["validateVariant"],"variantStyle":["validateVariantStyle"]}],[1,"mg-input",{"identifier":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"required":[4],"readonlyValue":[1,"readonly-value"],"errorMessage":[1,"error-message"],"helpText":[1,"help-text"],"ariaDescribedbyIDs":[16],"isFieldset":[32],"isReadonly":[32],"isDisabled":[32],"isVerticalList":[32]},null,{"identifier":["watchIdentifier","watchAriaDescribedbyIDs"],"labelOnTop":["watchLabelOnTop","watchLabelConfig"],"labelHide":["watchLabelConfig"],"tooltipPosition":["watchTooltipPosition"],"errorMessage":["watchErrorMessage","watchAriaDescribedbyIDs"],"helpText":["watchHelpText","watchAriaDescribedbyIDs"],"ariaDescribedbyIDs":["watchAriaDescribedbyIDs"],"class":["watchClass","watchLabel"],"label":["watchLabel"]}],[1,"mg-button",{"variant":[1],"identifier":[1],"label":[1],"type":[1],"fullWidth":[4,"full-width"],"form":[1],"disabled":[1028],"isIcon":[4,"is-icon"],"disableOnClick":[4,"disable-on-click"],"loading":[32],"classCollection":[32]},null,{"variant":["validateVariant"],"fullWidth":["validateFullWidth"],"disabled":["disabledHandler"],"loading":["loadingHandler"]}],[1,"mg-tooltip",{"identifier":[1],"message":[1],"placement":[1],"display":[1028],"disabled":[4]},null,{"identifier":["watchIdentifier"],"message":["watchMessage"],"display":["watchDisplay"],"disabled":["watchDisabled"]}],[6,"mg-input-title",{"identifier":[1],"required":[4],"readonly":[4],"isLegend":[4,"is-legend"],"tagName":[32]},null,{"identifier":["validateIdentifier"],"isLegend":["validateIsLegend"]}],[1,"mg-tooltip-content",{"message":[1]}],[1,"mg-icon",{"icon":[1],"size":[1],"variant":[1],"variantStyle":[1025,"variant-style"],"spin":[4],"classCollection":[32]},null,{"icon":["validateIcon"],"size":["validateSize"],"variant":["validateVariant"],"variantStyle":["validateVariantStyle"],"spin":["handleSpin"]}]]],["mg-loader",[[1,"mg-loader",{"message":[1],"messageHide":[4,"message-hide"]},null,{"message":["watchMessage"]}]]]]'),t)};(function(){if(typeof window<"u"&&window.Reflect!==void 0&&window.customElements!==void 0){var e=HTMLElement;window.HTMLElement=function(){return Reflect.construct(e,[],this.constructor)},HTMLElement.prototype=e.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,e)}})();cn();const{extractArgTypes:pn,extractComponentDescription:un}=new We(gt),dn={controls:{matchers:{color:/(background|color)$/i,date:/Date$/}},docs:{extractArgTypes:pn,extractComponentDescription:un,transformSource:(e,t)=>Be(t.originalStoryFn(t.args))},options:{storySort:{order:["Intro","Atoms","Molecules","Style"]}}},gn={locale:{name:"Locale",description:"Internationalization locale",toolbar:{icon:"globe",items:[{value:"en",title:"English"},{value:"fr",title:"Français"}],showName:!0}}},mn=[je,rt],Tn=Object.freeze(Object.defineProperty({__proto__:null,decorators:mn,globalTypes:gn,parameters:dn},Symbol.toStringTag,{value:"Module"}));export{Mt as H,bn as c,_t as g,xe as h,Tn as p,vn as r};
