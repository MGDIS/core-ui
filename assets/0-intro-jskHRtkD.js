import{j as n}from"./jsx-runtime-G3Up6C-Q.js";import{M as s,e as i}from"./index-0IbnH6uf.js";import{u as r}from"./index-vQ1q8ePa.js";import"./iframe-tZtztFxu.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-ogXoivrg.js";import"./index-MVkJqIoJ.js";import"./index-PPLHz8o0.js";const a=`# MG Components

## Introduction

MG Components is a reusable component library that aims to help MGDIS developers build UIs faster. It provides a collection of UI components that are designed to be productive, framework-agnostic, and satisfying to use. The library follows the principles of the Atomic Design methodology, which divides UI components into small, reusable parts.

Components in MG Components are written using [StencilJS](https://stenciljs.com/), a compiler for building fast web apps using Web Components. The library utilizes [StorybookJS](https://storybook.js.org/) for component development and documentation.

### Atomic Design

Atomic Design is an interface design method that takes into account the constraints of development. It emphasizes the need to consider technical design constraints when creating web designs. You can learn more about Atomic Design in this [introduction to Atomic Design](https://openclassrooms.com/fr/courses/5249021-initiez-vous-a-la-methode-atomic-design/5630171-decouvrez-l-atomic-design) (in French).

### Stencil

MG Components is built using Stencil, a compiler for building fast web apps using Web Components. Stencil combines the best concepts from popular frontend frameworks and generates 100% standards-based Web Components that can run in any modern browser. Stencil components can be used with any major framework or even without a framework.

## Developer

### Scripts

To build for production, run:

\`\`\`bash
pnpm build
\`\`\`

To run tests for the components, run:

\`\`\`bash
pnpm test

# only unit tests
pnpm test:unit

# only e2e tests
pnpm test:e2e

# filter on filename
pnpm test -- mg-icon
pnpm test:unit -- mg-icon
\`\`\`

<!-- Not working for now: To regenerate snapshot you must add the \`-u\` parameter. -->

To regenerate snapshot you must add the \`--updateSnapshot\` parameter.

For e2e tests you **must** use [WSL](https://docs.microsoft.com/fr-fr/windows/wsl/install) or a Linux OS to get the same screenshots as the GitLab CI.

To add a component, run:

\`\`\`bash
pnpm generate component-path

# example for an atom
pnpm generate atoms/mg-icon

# example for a molecule
pnpm generate molecules/mg-message
\`\`\`

### Naming Components

All of the MGDIS generated web components must use the prefix \`mg\`.

### Using this library

You will find how to use the library instructions in the [Getting Started section](./getting-started.md).

### Storybook

The plugin [storybook-addon-docs-stencil
](https://github.com/pixtron/storybook-addon-docs-stencil) is used to generate the doc. **To be up to date on local it needs a fresh build**.

#### run

\`\`\`bash
pnpm storybook
\`\`\`

#### Notes

To display components in our \`stories\`, we use the \`filterArgs\` method to only show the necessary arguments in the code example. It takes in the first parameter an object containing the arguments to be used, and in the second parameter, an object containing the component default values.

\`\`\`JS
const Template = (args: any): HTMLElement => (
  <mg-tooltip {...filterArgs(args, { placement: 'bottom' })}>
    <mg-icon icon="info-circle"></mg-icon>
  </mg-tooltip>
);
\`\`\`
`;function o(e){return n.jsxs(n.Fragment,{children:[n.jsx(s,{title:"Intro"}),`
`,n.jsx(i,{children:a})]})}function f(e={}){const{wrapper:t}=Object.assign({},r(),e.components);return t?n.jsx(t,Object.assign({},e,{children:n.jsx(o,e)})):o()}export{f as default};
