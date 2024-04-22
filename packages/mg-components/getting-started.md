# Getting started

## 1. Install

### 1.1. CDN

You can install the library using jsDelivr CDN by adding those script in the HTML header.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mgdis/mg-components@5/dist/mg-components/variables.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@mgdis/mg-components@5/dist/mg-components/mg-components.esm.js"></script>
```

### 1.2. Package manager

#### 1.2.1. Requirements

##### Global

- **NPM, PNPM or YARN**
- **NodeJS v14.x or higher.**
- **Webpack@4 or higher or viteJS or rollup bundler**

##### Angular.js project

- **Your project must use the last AngularJS version (1.8.3).**

#### 1.2.2. Add MG Components to your project

```bash
npm install @mgdis/mg-components
```

#### 1.2.3. Import mg-components in your sources

As mg-components bundle uses component lazy-loading, all you need to do is import it globally into your project like this:

```js
// src/main.js
import { defineCustomElements } from '@mgdis/mg-components/loader';
defineCustomElements();
```

You need now to import the components style by adding the mg-components variables or directly including the stylesheet that comes with it in the main app file:

```js
// src/main.js

// Only include variables
import '@mgdis/mg-components/dist/mg-components/variables.css';
// Include variables, layout, helpers style.
import '@mgdis/mg-components/dist/mg-components/mg-components.css'; // if needeed
```

[Read more about our CSS variables](./?path=/docs/css-variables--docs).

If you are already using a CSS framwork you may face some conflicts.

## 2. Use the Lib

### 2.1. Events

If you are using component events, the value is accessed through `$event.detail` and not `$event.target.value`.

### 2.2. Vue.js

#### 2.2.1. Bind

To bind a non string value in a web component we have to use the Vue.js [`.prop`](https://v2.vuejs.org/v2/api/#v-bind) modifier:

```html
<mg-input-text
  :readonly.prop="readOnly"
  :value="user.firstname" // Not mandatory when the value is a string
  :label="$t('firstname')"
  identifier="firstname"
></mg-input-text>
```

#### 2.2.2. `v-model` with Vue2

**Below instructions are for Vue2 projects only. With Vue3 you can use v-model as usual.**

`v-model` can not be used in web components so we must set the value and use the custom event `value-change` to update the value:

```html
<mg-input-text :value="user.firstname" :label="$t('firstname')" @value-change="user.firstname = $event.detail"></mg-input-text>
```

Given that this syntax is somewhat verbose, it is recommended to use the `v-mg-model` from the [mg-model directive](http://core.pages.mgdis.fr/core-back/core/docs/mg-components-helpers/mg-model-vue), the syntax will become:

```html
<mg-input-text v-mg-model="user.firstname" :label="$t('firstname')"></mg-input-text>
```

**This directive solves some issues with the components ([#139](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/139)), thus it is recommended to use it.**

#### 2.2.3. Tests

During test custom elements are not registered, to prevent Jest to log errors you'll need to add the ignoredElements Vue.js config in the jest setup file:

```js
//jest.setup.js
import Vue from 'vue';
Vue.config.ignoredElements = [/mg-\w*/];
```

### 2.3. AngularJS

#### 2.3.1. Bind

To bind a value in a web component we have to use the Angular.js [`ng-prop-`](https://docs.angularjs.org/api/ng/directive/ngProp) directive:

```html
<mg-input-text ng-prop-readonly="readOnly" ng-prop-value="user.firstname" label="Firstname" identifier="firstname"></mg-input-text>
```

In some cases, binding **a string or a number** won't work ([#191](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/191)), we didn't findout why but as a fix you can do:

```html
<mg-message variant="{{variant}}" delay="{{delay}}">My message</mg-message>
```

#### 2.3.2. `ng-model`

`ng-model` can not be used in web components so we must set the value and the use the custom event `value-change` with the [`ng-on-`](https://docs.angularjs.org/api/ng/directive/ngOn) directive:

```html
<mg-input-text ng-prop-value="user.firstname" label="Firstname" ng-on-value-change="user.firstname = $event.detail"></mg-input-text>
```

#### 2.3.3. `ng-on-`

With the [`ng-on-`](https://docs.angularjs.org/api/ng/directive/ngOn) directive you need to parse the native event instead the jQuery wrapped event like so:

```html
<mg-popover ng-on-display-change="$ctrl.myMethod($event.originalEvent.detail)"></mg-popover>
```

### 2.4. Jest

Add the following line in the client `jest.conf.js`:

```js
transformIgnorePatterns: ['/node_modules/@mgdis/(?!mg-components)'],
```

## 3. IDEs code completion

### 3.1. VS Code

mg-components provides a custom data file that can be used to describe its custom elements to Visual Studio Code. This enables code completion for mg-components components. To enable it, you need to specify the location of the data file in VS Code.

In your project using mg-components:

1. If it doesn't already exist, create a folder named `.vscode` at the root of your project.
2. If it doesn't already exist, create a file named `settings.json` inside that folder.
3. Add the following line to the `settings.json` file:

```js
{
  "html.customData": ["./node_modules/@mgdis/mg-components/ide/vscode/html-custom-data.json"]
}
```

If `settings.json` already exists, simply add the above line to the root of the object. Note that you may need to restart VS Code for the changes to take effect.

### 3.2. JetBrains IDEs

If you are using a JetBrains IDE, such as WebStorm, the editor will automatically detect the `web-types.json` file from the package, and you should immediately see component information in your editor.
