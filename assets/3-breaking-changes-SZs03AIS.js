import{af as n,ag as o,aj as a}from"./index-CJUFfhfC.js";import{u as s}from"./index-Auour5Kq.js";import"./iframe-Dlt2Ky9-.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-Cef7vbu6.js";import"./index-DrFu-skq.js";const r=`# Breaking Changes

This document provides an overview of the breaking changes introduced in major version releases of mg-components.

## Versions

- [mg-components 2.x](#mg-components-v200)
- [mg-components 3.x](#mg-components-v300)
- [mg-components 4.x](#mg-components-v400)
- [mg-components 5.x](#mg-components-v500)
- [mg-components 6.x](#mg-components-v600)

## mg-components v2.0.0

### mg-icon

- Icon names have been updated following the naming convention described in [PDA9-744](https://jira.mgdis.fr/browse/PDA9-744).
- Icon sizes are now \`regular\` (default), \`large\`, and \`extra-large\`.

### Custom Event Names

Custom event names are now in kebab-case: \`valueChange\` changed to \`value-change\`.

## mg-components v3.0.0

### Component Properties

Component properties are no longer reflected to prevent errors with boolean values.  
For example, to change the \`disabled\` property of a component in Vue.js, use \`disabled.prop="maVarDisabled"\`.

## mg-components v4.0.0

**Drop IE Support 🍾**

### Default Language and Currency

Library default language is now \`en\`, with matching currency \`USD\`.

### mg-input

Rename \`width\` property to \`mg-width\` to prevent a11y audit feedback.

### mg-character-left

Removed \`template\` attribute, as the new design (e.g., 400/400) does not require it anymore.

Matching attributes \`character-left-template\` in \`<mg-input-text>\` and \`<mg-input-textarea>\` are also removed.

### mg-icon

Icon \`arrows-rotate\` renamed to \`arrows-rotate-backward\`.

## mg-components v5.0.0

### Shadow DOM

\`mg-button\`, \`mg-tooltip\`, and \`mg-popover\` components now use [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). This may introduce a11y issues but resolves AngularJS issues.

Following this change the [mg-text-content AngularJS directive](http://core.pages.mgdis.fr/core-documentation/docs/core-ui/packages/mg-components-helpers/) is no longer necessary.

### mg-button

Accessibility properties (expanded, controls, haspopup) have been removed. Set them directly on the component (aria-expanded, aria-controls, aria-haspopup) as you would on a regular button.

### Mandatory Props

Components with missing mandatory props won't render and will throw an error.

### variables.scss

No more \`variables.scss\` export, only \`variables.css\`.

## mg-components v6.0.0

- [Style Sheets](#style-sheets)
- [\`size\` prop updates](#size-prop-updates)
- [Changes in banners](#changes-in-banners)
- [Changes in \`mg-action-more\`](#changes-in-mg-action-more)
- [Changes in \`mg-button\`](#changes-in-mg-button)
- [Changes in \`mg-divider\`](#changes-in-mg-divider)
- [Changes in \`mg-icon\`](#changes-in-mg-icon)
- [Changes in \`mg-input\`](#changes-in-mg-input)
- [Changes in \`mg-input-numeric\`](#changes-in-mg-input-numeric)
- [Changes in \`mg-input-text\` and \`mg-input-textarea\`](#changes-in-mg-input-text-and-mg-input-textarea)
- [Changes in \`mg-menu\`](#changes-in-mg-menu)
- [Changes in \`mg-modal\`](#changes-in-mg-modal)
- [Internal components](#internal-components)

### Style Sheets

We now provide a single \`mg-components.css\` file containing all custom properties and the minimal styles required for mg-components to function. Additional stylesheets are available in the \`@mgdis/styles\` package.

Using CDN:

\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mgdis/mg-components@6/dist/mg-components/mg-components.css" />
<!-- If other style sheets are needed -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mgdis/styles@2/dist/styles.css" />
\`\`\`

Using a build tool:

\`\`\`TS
import '@mgdis/mg-components/dist/mg-components/mg-components.css';
import '@mgdis/styles/dist/styles.css'; // If other style sheets are needed
\`\`\`

#### Custom Properties

- All custom properties (CSS variables) are now prefixed with \`mg-\` to prevent collisions with other CSS frameworks or custom variables. Additionally, prefixes indicate their purpose more clearly: \`b-\` for base, \`c-\` for component-specific, and \`l-\` for layout-related custom properties.

  \`\`\`CSS
  /* in v5 */
  --font-size: 1.3rem;
  --color-primary: #000;
  --mg-button-border-radius: 0.3rem;
  --mg-grid-spacing: 1rem;

  /* in v6 */
  --mg-b-font-size: 1.3rem;
  --mg-b-color-primary: #000;
  --mg-c-button-border-radius: 0.3rem;
  --mg-l-grid-spacing: 1rem;
  \`\`\`

##### Recurring Changes

Here are some notable changes to custom properties:

| v5 custom properties      | v6 custom properties         |
| ------------------------- | ---------------------------- |
| --color-dark              | --mg-b-color-dark            |
| --box-shadow              | --mg-b-box-shadow            |
| --mg-card-border          | --mg-c-card-border           |
| --mg-card-padding         | --mg-c-card-spacing          |
| --mg-card-background      | --mg-c-card-color-background |
| --mg-input-title-display  | --mg-c-input-title-display   |
| --mg-inputs-title-width   | --mg-c-input-title-width     |
| --mg-inputs-margin-bottom | --mg-c-input-margin-bottom   |

#### CSS Classes

- CSS classes now follow the same prefixes as the custom properties. Component classes use the \`c-\` prefix, layout classes use the \`l-\` prefix, and utility classes use the \`u-\` prefix.

  \`\`\`html
  <!-- in v5 -->
  <div class="mg-card">Component class</div>
  <div class="mg-group-elements">Layout class</div>
  <div class="mg-visually-hidden">Utility class</div>

  <!-- in v6 -->
  <div class="mg-c-card">Component class</div>
  <div class="mg-l-group-elements">Layout class</div>
  <div class="mg-u-visually-hidden">Utility class</div>
  \`\`\`

##### Recurring Changes

Here are some notable changes to classes:

| v5 classes                     | v6 classes                       |
| ------------------------------ | -------------------------------- |
| mg-group-elements              | mg-l-group-elements              |
| mg-group-elements--align-right | mg-l-group-elements--align-right |

Read more in the [\`@mgdis/styles\` package documentation](../styles/README.md).

#### Colors

We have simplified the way we handle colors by no longer using HSL color variables, which were often confusing to implement. Previously, \`--mg-color-app-hsl\` was intended to be used in an HSL CSS property like \`hsl(var(--mg-color-app-hsl))\` or to add transparency with \`hsl(var(--mg-color-app-hsl) / 50%)\`. We also provided separate H, S, and L variables to easily adjust the lightness value, like \`hsl(var(--mg-color-app-h) var(--mg-color-app-s) 20)\`.

Now, we directly use color values, which can be in various formats such as hex, HSL, RGB, and more. For color mixing, we utilize the [\`color-mix\`](https://developer.mozilla.org/docs/Web/CSS/color_value/color-mix) function, e.g., \`color-mix(in srgb, var(--mg-b-color-dark), transparent 85%)\`.

### \`size\` prop updates

- Medium is the new regular. The \`size\` prop is used in \`mg-icon\`, \`mg-menu\`, \`mg-illustrated-message\`, and \`mg-tab\` components. To ensure consistency and follow standards, we renamed and organized size values as follows:

  | version |       | default |        |        |             |
  | ------- | ----- | ------- | ------ | ------ | ----------- |
  | v5      | small | regular | medium | large  | extra-large |
  | v6      | small | medium  | large  | xlarge | xxlarge     |

### Changes in banners

Our components for displaying card messages, \`mg-card\`, \`mg-message\`, and the new \`mg-alert\`, have been refactored to clarify their use cases:

- \`mg-card\` is now a simple container without any props and **should not be used to display messages**.
- \`mg-message\` is used to display information **without requiring a live aria role**.
- \`mg-alert\` is the component to use for notifications after an action, **with an aria role**.

#### Changes in \`mg-card\`

- Moved \`variant\` and \`variant-style\` to the \`mg-message\` component.

  \`\`\`html
  <!-- in v5 -->
  <mg-card variant="success" variant-style="fill"> >You did it !</mg-card>
  <!-- in v6 -->
  <mg-message variant="success" variant-style="backgroud"> >You did it !</mg-message>
  \`\`\`

#### Changes in \`mg-message\`

- Updated \`variant-style\` value from \`fill\` to \`background\`.

  \`\`\`html
  <!-- in v5 -->
  <mg-message variant-style="fill"> >You did it !</mg-message>
  <!-- in v6 -->
  <mg-message variant-style="background"> >You did it !</mg-message>
  \`\`\`

- Removed \`delay\` props, which are now in the new \`mg-alert\` component.

  \`\`\`html
  <!-- in v5 -->
  <mg-message delay="10">You did it !</mg-message>
  <!-- in v6 -->
  <mg-alert delay="10">You did it !</mg-alert>
  \`\`\`

- Removed \`close-button\`, \`no-aria-role\` and \`hide\` props.

#### New \`mg-alert\` component

\`mg-alert\` is similar to \`mg-message\` but is dedicated to alerts with an aria role. Here are the changes:

- No longer uses the \`hide\` prop for visibility. Use the native \`hidden\` attribute.

  \`\`\`html
  <!-- in v5 -->
  <mg-message hide>You did it !</mg-message>
  <!-- in v6 -->
  <mg-alert hidden>You did it !</mg-alert>
  \`\`\`

- \`close-button\` props no longer exists. \`mg-alert\` has a close button by default, which is automatically removed if content is set in the \`actions\` slot.

  \`\`\`html
  <!-- in v5 -->
  <mg-message close-button>You did it !</mg-message>
  <!-- in v6 -->
  <mg-alert>You did it !</mg-alert>
  \`\`\`

- Updated \`variant-style\` value from \`fill\` to \`background\`.

  \`\`\`html
  <!-- in v5 -->
  <mg-message variant-style="fill"> >You did it !</mg-message>
  <!-- in v6 -->
  <mg-alert variant-style="background"> >You did it !</mg-alert>
  \`\`\`

### Changes in \`mg-action-more\`

- Update items \`icon\` property. The item \`icon\` now takes a \`MgIcon\` object, allowing for additional properties such as \`variant\`.

  \`\`\`html
  <!-- in v5 -->
  <mg-action-more></mg-action-more>
  <script>
    const mgActionMore = document.querySelector('mg-action-more')
    mgActionMore.items = [{
      ...
      icon: 'user'
    }]
  <\/script>

  <!-- in v6 -->
  <mg-action-more></mg-action-more>
  <script>
    const mgActionMore = document.querySelector('mg-action-more')
    mgActionMore.items = [{
      ...
      icon: {
        icon: 'user',
        variant: 'danger'
      }
    }]
  <\/script>
  \`\`\`

### Changes in \`mg-button\`

- Removed \`identifier\` prop. Use \`id\` directly if needed.

  \`\`\`html
  <!-- in v5 -->
  <mg-button identifier="blu">Non</mg-button>
  <!-- in v6 -->
  <mg-button id="blu">Non</mg-button>
  \`\`\`

### Changes in \`mg-divider\`

- Renamed the \`size\` prop to \`full-width\`. No other sizes are planned, and this change ensures consistency with the \`mg-button\` prop.

  \`\`\`html
  <!-- in v5 -->
  <mg-divider size="full"></mg-divider>
  <!-- in v6 -->
  <mg-divider full-width></mg-divider>
  \`\`\`

### Changes in \`mg-icon\`

- Removed \`question-circle\` icon. Use the existing \`interrogation-circle\` icon instead.

  \`\`\`html
  <!-- in v5 -->
  <mg-icon icon="question-circle"></mg-icon>
  <!-- in v6 -->
  <mg-icon icon="interrogation-circle"></mg-icon>
  \`\`\`

- Update \`size\` prop possible values [as described](#size-prop-updates) :

  \`\`\`html
  <!-- in v5 -->
  <mg-icon icon="api" size="medium"></mg-icon>
  <mg-icon icon="ban" size="large"></mg-icon>
  <mg-icon icon="cog" size="extra-large"></mg-icon>
  <!-- in v6 -->
  <mg-icon icon="api" size="large"></mg-icon>
  <mg-icon icon="ban" size="xlarge"></mg-icon>
  <mg-icon icon="cog" size="xxlarge"></mg-icon>
  \`\`\`

- Remove CSS custom properties.

### Changes in \`mg-input\`

- The \`readonly\` and \`readonlyValue\` props have been removed. The component no longer handles the readonly style.

### Changes in \`mg-input-numeric\`

- The \`currency\` type has been moved to the \`format\` attribute.

  \`\`\`html
  <!-- in v5 -->
  <mg-input-numeric identifier="blu" label="non" type="currency"></mg-input-numeric>
  <!-- in v6 -->
  <mg-input-numeric identifier="blu" label="non" format="currency"></mg-input-numeric>
  \`\`\`

- The default value for the \`currency\` prop is now \`EUR\` instead of \`USD\`.

  \`\`\`html
  <!-- in v5 -->
  <mg-input-numeric identifier="blu" label="non" type="currency"></mg-input-numeric>
  <mg-input-numeric identifier="blu" label="non" type="currency" currency="EUR"></mg-input-numeric>
  <!-- in v6 -->
  <mg-input-numeric identifier="blu" label="non" format="currency" currency="USD"></mg-input-numeric>
  <mg-input-numeric identifier="blu" label="non" format="currency"></mg-input-numeric>
  \`\`\`

### Changes in \`mg-input-text\` and \`mg-input-textarea\`

- Renammed \`display-character-left\` prop to \`character-left-hide\`.  
  The \`display-character-left\` prop was inconsistent with standard boolean attributes as it requires setting a "false" value explicitly. It should align with standard boolean attributes, which are considered false when the attribute is missing.

  \`\`\`html
  <!-- in v5 -->
  <mg-input-text identifier="blu" label="non" display-character-left="false"></mg-input-text>
  <!-- in v6 -->
  <mg-input-text identifier="blu" label="non" character-left-hide></mg-input-text>
  \`\`\`

### Changes in \`mg-menu\`

- Update \`size\` prop possible values [as described](#size-prop-updates) :

  \`\`\`html
  <!-- in v5 -->
  <mg-menu size="medium">...</mg-menu>
  <mg-menu size="large">...</mg-menu>
  <!-- in v6 -->
  <mg-menu size="large">...</mg-menu>
  <mg-menu size="xlarge">...</mg-menu>
  \`\`\`

### Changes in \`mg-modal\`

- Component now uses the \`<dialog>\` native element to ensure better accessibility. Consequently, the component follows its logic to define visibility. The \`hide\` prop has been replaced by the \`open\` prop.

  \`\`\`html
  <!-- in v5 -->
  <mg-modal modal-title="Modal title" hide>
    <p slot="content">Closed modal</p>
  </mg-modal>
  <mg-modal modal-title="Modal title">
    <p slot="content">Open modal</p>
  </mg-modal>
  <!-- in v6 -->
  <mg-modal modal-title="Modal title">
    <p>Closed modal</p>
  </mg-modal>
  <mg-modal modal-title="Modal title" open>
    <p>Open modal</p>
  </mg-modal>
  \`\`\`

- Removed \`content\` slot name, the unnamed slot is now the default one.

  \`\`\`html
  <!-- in v5 -->
  <mg-modal modal-title="Modal title">
    <p slot="content">Content</p>
  </mg-modal>
  <!-- in v6 -->
  <mg-modal modal-title="Modal title">
    <p>Content</p>
  </mg-modal>
  \`\`\`

### Internal components

- \`mg-character-left\`, \`mg-input-title\` and \`mg-item-more\` components are now considered internal and should not be used outside of \`mg-components\`. Dedicated stories for these components have been removed.
`;function i(e){return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"Breaking changes"}),`
`,n.jsx(a,{children:r})]})}function v(e={}){const{wrapper:t}={...s(),...e.components};return t?n.jsx(t,{...e,children:n.jsx(i,{...e})}):i()}export{v as default};
