import{j as n}from"./jsx-runtime-f0JEfp2n.js";import{M as o,e as m}from"./index-F6vvZEKt.js";import{u as i}from"./index-IDTZ4DW2.js";import"./iframe-YOp4NnM4.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-4gQjN7DL.js";import"./index-ogXoivrg.js";import"./index-MVkJqIoJ.js";import"./index-PPLHz8o0.js";const r=`# Getting started

## Install

### CDN

You can install the library using jsDelivr CDN by adding those script in the HTML header.

\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mgdis/mg-components@5/dist/mg-components/variables.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@mgdis/mg-components@5/dist/mg-components/mg-components.esm.js"><\/script>
\`\`\`

### Vue.js

Add MG Components to your project.

\`\`\`bash
npm install @mgdis/mg-components
\`\`\`

Add the following line in the client \`jest.conf.js\`:

\`\`\`js
transformIgnorePatterns: ['/node_modules/@mgdis/(?!mg-components)'],
\`\`\`

Import the needed components in your views/components like this:

\`\`\`js
import '@mgdis/mg-components/dist/components/mg-input-text';
import '@mgdis/mg-components/dist/components/mg-input-date';
import '@mgdis/mg-components/dist/components/mg-input-textarea';
import '@mgdis/mg-components/dist/components/mg-button';
import '@mgdis/mg-components/dist/components/mg-message';
\`\`\`

You need now to import the components style by adding the mg-components variables or directly the stylesheet who came with in the \`App.vue\` file :

\`\`\`html
<style>
  @use '~@mgdis/mg-components/dist/mg-components/variables.css';
</style>
\`\`\`

[Read more about our CSS variables](./?path=/docs/css-variables--docs).

You also can import the mg-components CSS file if you want to use our grid layout or some helpers.

\`\`\`html
<style>
  @use '~@mgdis/mg-components/dist/mg-components/mg-components.css';
</style>
\`\`\`

If you are already using a CSS framwork you may face some problem.

#### Tests

During test custom elements are not registered, to prevent Jest to log errors you'll need to add the ignoredElements Vue.js config in the jest setup file:

\`\`\`js
//jest.setup.js
import Vue from 'vue';
Vue.config.ignoredElements = [/mg-\\w*/];
\`\`\`

### Angular.js

**Your project must use the last AngularJS version (1.8.3).**

Add MG Components to your project.

\`\`\`bash
npm install @mgdis/mg-components
\`\`\`

Components can now be imported into your developments.

\`\`\`js
import '@mgdis/mg-components/dist/components/mg-input-text';
import '@mgdis/mg-components/dist/components/mg-input-date';
import '@mgdis/mg-components/dist/components/mg-input-textarea';
import '@mgdis/mg-components/dist/components/mg-button';
import '@mgdis/mg-components/dist/components/mg-message';
\`\`\`

You need now to import the components style by adding the mg-components variables or directly the stylesheet who came with in the \`app.js\` file :

\`\`\`js
import '@mgdis/mg-components/dist/mg-components/variables.css';
import '@mgdis/mg-components/dist/mg-components/mg-components.css'; // if needed
\`\`\`

## Use the Lib

### Vue.js

#### Bind

To bind a non string value in a web component we have to use the Vue.js [\`.prop\`](https://v2.vuejs.org/v2/api/#v-bind) modifier:

\`\`\`html
<mg-input-text
  :readonly.prop="readOnly"
  :value="user.firstname" // Not mandatory when the value is a string
  :label="$t('firstname')"
  identifier="firstname"
></mg-input-text>
\`\`\`

#### v-model with Vue2

**Below instructions are for Vue2 projects only. With Vue3 you can use v-model as usual.**

\`v-model\` can not be used in web components so we must set the value and use the custom event \`value-change\` to update the value:

\`\`\`html
<mg-input-text :value="user.firstname" :label="$t('firstname')" @value-change="user.firstname = $event.detail"></mg-input-text>
\`\`\`

Given that this syntax is somewhat verbose, it is recommended to use the \`v-mg-model\` from the [mg-model directive](http://core.pages.mgdis.fr/core-back/core/docs/mg-components-helpers/mg-model-vue), the syntax will become:

\`\`\`html
<mg-input-text v-mg-model="user.firstname" :label="$t('firstname')"></mg-input-text>
\`\`\`

**This directive solves some issues with the components ([#139](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/139)), thus it is recommended to use it.**

### AngularJS

#### Bind

To bind a value in a web component we have to use the Angular.js [\`ng-prop-\`](https://docs.angularjs.org/api/ng/directive/ngProp) directive:

\`\`\`html
<mg-input-text ng-prop-readonly="readOnly" ng-prop-value="user.firstname" label="Firstname" identifier="firstname"></mg-input-text>
\`\`\`

In some cases, binding **a string or a number** won't work ([#191](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/191)), we didn't findout why but as a fix you can do:

\`\`\`html
<mg-message variant="{{variant}}" delay="{{delay}}">My message</mg-message>
\`\`\`

#### ng-model

\`ng-model\` can not be used in web components so we must set the value and the use the custom event \`value-change\` with the [\`ng-on-\`](https://docs.angularjs.org/api/ng/directive/ngOn) directive :

\`\`\`html
<mg-input-text ng-prop-value="user.firstname" label="Firstname" ng-on-value-change="user.firstname = $event.detail"></mg-input-text>
\`\`\`

## Events

If you are using component events, the value is accessed through \`$event.detail\` and not \`$event.target.value\`.

### AngularJS

With the [\`ng-on-\`](https://docs.angularjs.org/api/ng/directive/ngOn) directive you need to parse the native event instead the jQuery wrapped event like so:

\`\`\`html
<mg-popover ng-on-display-change="$ctrl.myMethod($event.originalEvent.detail)"></mg-popover>
\`\`\`
`;function s(e){return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"Getting started"}),`
`,n.jsx(m,{children:r})]})}function y(e={}){const{wrapper:t}=Object.assign({},i(),e.components);return t?n.jsx(t,Object.assign({},e,{children:n.jsx(s,e)})):s()}export{y as default};