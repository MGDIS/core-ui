import{r as s,h as t,g as i}from"./preview-tysrc_Cz.js";import{N as a,i as r}from"./index-8d5d1bfd-CR98yLjD.js";import"./_commonjsHelpers-BosuxZz1.js";import"./v4-D8aEg3BZ.js";import"./index.es-DXisEhbe.js";import"./iframe-Bz_1tQqT.js";import"../sb-preview/runtime.js";const o=".mg-u-visually-hidden{position:absolute !important;overflow:hidden !important;width:.1rem !important;height:.1rem !important;padding:0 !important;border:0 !important;margin:-0.1rem !important;clip:rect(0.1rem, 0.1rem, 0.1rem, 0.1rem) !important;clip-path:inset(50%) !important;white-space:nowrap !important}*:focus:not(:focus-visible){outline:none}@media (prefers-reduced-motion){*{animation:none !important;transition:none !important}}:host{display:block}.mg-c-loader{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.4rem;text-align:center}",n=o,m=class{constructor(e){s(this,e),this.message=void 0,this.messageHide=void 0}watchMessage(e){if(e&&!a(e))throw new Error('<mg-loader> prop "message" must be a valid string.')}componentWillLoad(){this.messages=r(this.element).messages,this.watchMessage(this.message)}render(){return t("div",{key:"f3f67eefb0492891bde9ec6847cbf5f9f35f510d",class:"mg-c-loader","aria-live":"polite"},t("mg-icon",{key:"d1671e83515ceaefcae0007f911a60e41e908672",icon:"loader",spin:!0}),t("span",{key:"9bd688e41363cd55dc33b79e889a74ea12f9b572",class:{"mg-u-visually-hidden":this.messageHide}},this.message||this.messages.loader.inProgess))}get element(){return i(this)}static get watchers(){return{message:["watchMessage"]}}};m.style=n;export{m as mg_loader};