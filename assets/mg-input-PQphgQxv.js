import{j as e}from"./jsx-runtime-f0JEfp2n.js";import{M as l}from"./index-F6vvZEKt.js";import{u as s}from"./index-IDTZ4DW2.js";import"./iframe-YOp4NnM4.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-ogXoivrg.js";import"./index-MVkJqIoJ.js";import"./index-PPLHz8o0.js";function r(i){const n=Object.assign({h1:"h1",h2:"h2",h3:"h3",ul:"ul",li:"li",p:"p",a:"a",ol:"ol",br:"br",img:"img",code:"code"},s(),i.components);return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Molecules/Inputs/mg-input"}),`
`,e.jsx(n.h1,{id:"inputs",children:"Inputs"}),`
`,e.jsx(n.h2,{id:"ux",children:"UX"}),`
`,e.jsx(n.h3,{id:"label",children:"Label"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The label is located on the left of the input field."}),`
`,e.jsx(n.li,{children:"The text is to be right aligned."}),`
`,e.jsx(n.li,{children:"The label can be on one or more lines."}),`
`,e.jsx(n.li,{children:"The label can be positioned above the input field."}),`
`]}),`
`,e.jsx(n.h3,{id:"input-help",children:"Input help"}),`
`,e.jsxs(n.p,{children:['The message displayed indicates the format expected by the input field "example: ',e.jsx(n.a,{href:"mailto:email@provider.com",children:"email@provider.com"}),'" or "expected format: DD/MM/YYYY (ex: 13/04/2019)"']}),`
`,e.jsx(n.h3,{id:"message-order",children:"Message order"}),`
`,e.jsx(n.p,{children:"When the messages are displayed under the field the order is as follows:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"input help"}),`
`,e.jsx(n.li,{children:"error"}),`
`]}),`
`,e.jsx(n.h3,{id:"placeholder",children:"Placeholder"}),`
`,e.jsxs(n.p,{children:["The placeholder should not be used as an input help.",e.jsx(n.br,{}),`
`,"♿ RGAA: The placeholder is not considered a valid label under the RGAA so is not subject to a contrast ratio."]}),`
`,e.jsx(n.h3,{id:"read-only",children:"Read only"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The value is no longer editable."}),`
`,e.jsx(n.li,{children:"The input field no longer has a border or background."}),`
`,e.jsx(n.li,{children:"The value is displayed in bold."}),`
`,e.jsx(n.li,{children:"If there is no value entered, nothing is displayed."}),`
`]}),`
`,e.jsx(n.h3,{id:"required-field",children:"Required field"}),`
`,e.jsx(n.p,{children:"The asterisk is displayed regardless of the status of the field: input, read-only, disabled."}),`
`,e.jsx(n.h2,{id:"specs",children:"Specs"}),`
`,e.jsx(n.p,{children:e.jsx(n.img,{src:"./doc/img/mg-input-base.png",alt:""})}),`
`,e.jsx(n.h3,{id:"placements",children:"Placements"}),`
`,e.jsx(n.p,{children:'The "i" is positioned next to the input field or next to the label when the label is on top.'}),`
`,e.jsx(n.h3,{id:"value-positioning",children:"Value positioning"}),`
`,e.jsxs(n.p,{children:["By default, the value is left aligned, you can change the CSS variable ",e.jsx(n.code,{children:"--mg-inputs-text-align"})," to right align."]}),`
`,e.jsx(n.h3,{id:"errors",children:"Errors"}),`
`,e.jsxs(n.p,{children:["Input field border and error message text are in ",e.jsx(n.a,{href:"./?path=/docs/style-colors--docs",children:"@color-danger"}),".",e.jsx(n.br,{}),`
`,"Error message background is a variant of ",e.jsx(n.a,{href:"./?path=/docs/style-colors--docs",children:"@color-danger"})," : #FEF6F6 or HSL (357,80%,98%)."]}),`
`,e.jsx(n.h2,{id:"behavior",children:"Behavior"}),`
`,e.jsx(n.h3,{id:"errors-1",children:"Errors"}),`
`,e.jsx(n.p,{children:"Error is triggered and displayed when we leave the input field."}),`
`,e.jsx(n.p,{children:"When we enter in an input field with an error its state is checked everytime the user update its content, when the error is fixed the message disapears."}),`
`,e.jsx(n.h2,{id:"css-variables",children:"CSS Variables"}),`
`,e.jsxs(n.p,{children:["If needed some ",e.jsx(n.a,{href:"./?path=/docs/css-variables--docs",children:"variables"})," are available to customize the component:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--mg-inputs-text-align"}),": Define input text alignement, numeric input default is ",e.jsx(n.code,{children:"right"}),", others inputs default is ",e.jsx(n.code,{children:"left"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--mg-inputs-border-width"}),": Define input border witdh, default: ",e.jsx(n.code,{children:"0.1rem"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--mg-inputs-border-radius"}),": Define input border radius, default: ",e.jsx(n.code,{children:"0.3rem"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--mg-inputs-color"}),": Define input border an placeholder color, default: ",e.jsx(n.code,{children:"#b5c2c9"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--mg-inputs-spacer"}),": Define input space between label, input, tooltip, etc., default: ",e.jsx(n.code,{children:"1rem"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--mg-inputs-error-bg-color"}),": Define input error message backround color, default: ",e.jsx(n.code,{children:"var(--color-danger-h), calc(var(--color-danger-s) + 5%), calc(var(--color-danger-l) + 49%)"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--mg-inputs-color-shadow-focus-hsl"}),": Define input shadow when focused, default: ",e.jsx(n.code,{children:"188, 100%, 50%"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--mg-inputs-title-width"}),": Define input label width, default: ",e.jsx(n.code,{children:"15rem"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--mg-inputs-margin-bottom"}),": Define input bottom margin, default: ",e.jsx(n.code,{children:"1.5rem"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"--mg-inputs-title-horizontal-space"}),": Define space between label and input when inside a ",e.jsx(n.code,{children:"mg-form"}),", default: ",e.jsx(n.code,{children:"3rem"})]}),`
`]})]})}function j(i={}){const{wrapper:n}=Object.assign({},s(),i.components);return n?e.jsx(n,Object.assign({},i,{children:e.jsx(r,i)})):r(i)}export{j as default};