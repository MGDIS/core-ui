const d={required:"This field is required.",date:{badInput:"The date format must be {pattern} and the date must be greater than {min}",min:"The date cannot be earlier than {min}",max:"The date cannot be later than {max}",minMax:"The date must be between {min} and {max}"},numeric:{min:"The value cannot be less than {min}",max:"The value cannot be greater than {max}",minMax:"The value must be between {min} et {max}"}},m="{counter} characters left.",p={select:{placeholder:"Select a value"},checkbox:{selectedValues:"{nb} selected values",selectedValue:"{nb} selected value",editButton:"Edit",selectButton:"Select values",showButton:"Show",label:"Enter a value",result:"result",results:"results",searchResults:"Search result(s) list.",noResult:"No result.",sections:{selected:{title:"Selected",titlePlurial:"Selected",action:"Unselect all",tooltip:"Unselect all current search results"},notSelected:{title:"Not selected",titlePlurial:"Not selected",action:"Select all",tooltip:"Select all current search results"}}},date:{helpText:"Expected format: {pattern} (ex: {date})",pattern:{dd:"dd",mm:"mm",yyyy:"yyyy"}}},g={required:'Fields with a <strong class="mg-u-is-asterisk">*</strong> are required',requiredSingle:'Field with a <strong class="mg-u-is-asterisk">*</strong> is required',allRequired:"All fields are required",allRequiredSingle:"The field is required"},h={closeButton:"Close message"},b={closeButton:"Close modal"},f={label:"Pagination",page:"page",pages:"pages",nextPage:"Next page",previousPage:"Previous page",selectPage:"Select the page to display."},v={editLabel:"Edit section title."},y={navLabel:"Quick access"},L={confirm:"Confirm",cancel:"Cancel",close:"Close",next:"next",previous:"previous"},x={moreLabel:"Additional menu",badgeLabel:"Include notification(s)"},S={label:"Actions"},P={errors:d,nbCharLeft:m,input:p,form:g,message:h,modal:b,pagination:f,panel:v,skipLinks:y,general:L,plusMenu:x,actionMore:S},T={required:"Ce champ est obligatoire.",date:{badInput:"Le format de la date doit être du type {pattern} et la date supérieure au {min}",min:"La date ne peut pas être antérieure au {min}",max:"La date ne peut pas être postérieure au {max}",minMax:"La date doit être comprise entre le {min} et le {max}"},numeric:{min:"La valeur ne peut pas être inférieure à {min}",max:"La valeur ne peut pas être supérieure à {max}",minMax:"La valeur doit être comprise entre {min} et {max}"}},q="{counter} caractères disponibles.",A={select:{placeholder:"Sélectionnez une valeur"},checkbox:{selectedValues:"{nb} valeurs selectionnées",selectedValue:"{nb} valeur selectionnée",editButton:"Modifier",selectButton:"Sélectionner des valeurs",showButton:"Voir",label:"Saisissez une valeur",result:"résultat",results:"résultats",searchResults:"List de résultat(s) de la recherche.",noResult:"Aucun résultat.",sections:{selected:{title:"Sélectionné",titlePlurial:"Sélectionnés",action:"Tout désélectionner",tooltip:"Désélectionne tous les résultats de la recherche en cours"},notSelected:{title:"Non sélectionné",titlePlurial:"Non sélectionnés",action:"Tout sélectionner",tooltip:"Sélectionne tous les résultats de la recherche en cours"}}},date:{helpText:"Format attendu&nbsp;: {pattern} (ex&nbsp;: {date})",pattern:{dd:"jj",mm:"mm",yyyy:"aaaa"}}},M={required:`Les champs marqués d'un <strong class="mg-u-is-asterisk">*</strong> sont obligatoires`,requiredSingle:`Le champ marqué d'un <strong class="mg-u-is-asterisk">*</strong> est obligatoire`,allRequired:"Tous les champs sont obligatoires",allRequiredSingle:"Le champ est obligatoire"},w={closeButton:"Fermer le message"},k={closeButton:"Fermer la modale"},C={label:"Pagination",page:"page",pages:"pages",nextPage:"Page suivante",previousPage:"Page précédente",selectPage:"Sélectionner la page à afficher."},N={editLabel:"Modifier le titre de la section."},$={navLabel:"Accès rapide"},F={confirm:"Valider",cancel:"Annuler",close:"Fermer",next:"suivant",previous:"précédent"},R={moreLabel:"Menu complémentaire",badgeLabel:"Notification(s) incluse(s)"},B={label:"Actions"},I={errors:T,nbCharLeft:q,input:A,form:M,message:w,modal:k,pagination:C,panel:N,skipLinks:$,general:F,plusMenu:R,actionMore:B};var j=Object.defineProperty,V=(e,t,a)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,r=(e,t,a)=>(V(e,typeof t!="symbol"?t+"":t,a),a);const _=e=>{const t={value:"2023",pattern:"yyyy"},a={value:"12",pattern:"mm"},s={value:"24",pattern:"dd"};return O([t.value,a.value,s.value].join("-"),e).replace(t.value,t.pattern).replace(a.value,a.pattern).replace(s.value,s.pattern)},Q=e=>e.toISOString().split("T")[0],D=(e,t,a)=>{const s=e.closest("[lang]"),n=Intl.NumberFormat.supportedLocalesOf(s==null?void 0:s.lang),l=n.length>0&&typeof n[0]=="string"?n[0]:navigator.language||a,u=l.split("-").shift();return{locale:l,messages:t[u]||t[a]}},Z=(e,t,a)=>new Intl.NumberFormat(t,{style:"currency",currency:a}).format(e),G=(e,t)=>new Intl.NumberFormat(t).format(e),E=/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,O=(e,t)=>typeof e!="string"||e===""||!E.test(e)?"":new Intl.DateTimeFormat(t).format(new Date(e)),z=(e,t)=>a=>D(a,e,t),J=(e="",t=10)=>{const a=new Uint8Array(t);crypto.getRandomValues(a);const s=Array.from(a).map(n=>n.toString(16).padStart(2,"0")).join("").slice(0,t);return e!==""?`${e}-${s}`:s};class K{constructor(t=[]){r(this,"classes"),r(this,"add",a=>{this.has(a)||this.classes.push(a)}),r(this,"delete",a=>{const s=this.classes.indexOf(a);s>-1&&this.classes.splice(s,1)}),r(this,"has",a=>this.classes.includes(a)),r(this,"join",()=>this.classes.join(" ")),this.classes=t}}const W=e=>Array.isArray(e)&&e.every(t=>typeof t=="string"),X=(e,t)=>t.includes(e==null?void 0:e.tagName.toLowerCase()),Y='a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]), [identifier], mg-button',ee=e=>{const t=i(e),a=c(e);return[e,...t,...a]},i=(e,t=[])=>{if(e.self!==e.top)try{const a=e.parent;return a?(t.push(a),i(a,t)):t}catch(a){return console.error("Different hosts between iframes:",a),t}return t},c=(e,t=[])=>{if(e.frames.length>0)for(const a of Array.from(e.frames))t.push(a),c(a,t);return t},te=e=>typeof e=="string"&&e.trim()!=="",ae=e=>typeof e=="string"?e.toLocaleLowerCase().normalize("NFD").replaceAll(/[\u0300-\u036f]/g,""):e,se=async e=>e(),H="en",U={en:P,fr:I},ne=z(U,H);var o;(function(e){e.VERTICAL="vertical",e.HORIZONTAL="horizontal"})(o||(o={}));const re=["regular","medium","large"];export{Q as A,Y as B,ae as C,o as D,_ as E,K as F,te as H,G as M,ee as N,se as P,Z as R,E as S,X as _,W as a,O as b,ne as i,J as j,re as s};