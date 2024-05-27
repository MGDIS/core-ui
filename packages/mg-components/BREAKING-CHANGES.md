# Breaking Changes

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
- Icon sizes are now `regular` (default), `large`, and `extra-large`.

### Custom Event Names

Custom event names are now in kebab-case: `valueChange` changed to `value-change`.

## mg-components v3.0.0

### Component Properties

Component properties are no longer reflected to prevent errors with boolean values.  
For example, to change the `disabled` property of a component in Vue.js, use `disabled.prop="maVarDisabled"`.

## mg-components v4.0.0

**Drop IE Support 🍾**

### Default Language and Currency

Library default language is now `en`, with matching currency `USD`.

### mg-input

Rename `width` property to `mg-width` to prevent a11y audit feedback.

### mg-character-left

Removed `template` attribute, as the new design (e.g., 400/400) does not require it anymore.

Matching attributes `character-left-template` in `<mg-input-text>` and `<mg-input-textarea>` are also removed.

### mg-icon

Icon `arrows-rotate` renamed to `arrows-rotate-backward`.

## mg-components v5.0.0

### Shadow DOM

`mg-button`, `mg-tooltip`, and `mg-popover` components now use [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). This may introduce a11y issues but resolves AngularJS issues.

Following this change the [mg-text-content AngularJS directive](http://core.pages.mgdis.fr/core-documentation/docs/core-ui/packages/mg-components-helpers/) is no longer necessary.

### mg-button

Accessibility properties (expanded, controls, haspopup) have been removed. Set them directly on the component (aria-expanded, aria-controls, aria-haspopup) as you would on a regular button.

### Mandatory Props

Components with missing mandatory props won't render and will throw an error.

### variables.scss

No more `variables.scss` export, only `variables.css`.

## mg-components v6.0.0

- [`size` prop updates](#size-prop-updates)
- [Changes in `mg-button`](#changes-in-mg-button)
- [Changes in `mg-divider`](#changes-in-mg-divider)
- [Changes in `mg-icon`](#changes-in-mg-icon)
- [Changes in `mg-input-numeric`](#changes-in-mg-input-numeric)
- [Changes in `mg-input-text` and `mg-input-textarea`](#changes-in-mg-input-text-and-mg-input-textarea)
- [Changes in `mg-menu`](#changes-in-mg-menu)
- [Changes in `mg-card` and `mg-message`](#changes-in-mg-card-and-mg-message)
- [Hide components](#hide-components)
- [Internal components](#internal-components)
- [Stylesheet](#stylesheet)

### `size` prop updates

- Medium is the new regular. The `size` prop is used in `mg-icon`, `mg-menu`, `mg-illustrated-message`, and `mg-tab` components. To ensure consistency and follow standards, we renamed and organized size values as follows:

  | version |       |         |        |        |             |
  | ------- | ----- | ------- | ------ | ------ | ----------- |
  | v5      | small | regular | medium | large  | extra-large |
  | v6      | small | medium  | large  | xlarge | xxlarge     |

### Changes in `mg-button`

- Removed `identifier` prop. Use `id` directly if needed.

  ```html
  <!-- in v5 -->
  <mg-button identifier="blu">Non</mg-button>
  <!-- in v6 -->
  <mg-button id="blu">Non</mg-button>
  ```

### Changes in `mg-divider`

- Renamed the `size` prop to `full-width`. No other sizes are planned, and this change ensures consistency with the `mg-button` prop.

  ```html
  <!-- in v5 -->
  <mg-divider size="full"></mg-divider>
  <!-- in v6 -->
  <mg-divider full-width></mg-divider>
  ```

### Changes in `mg-icon`

- Removed `question-circle` icon. Use the existing `interrogation-circle` icon instead.

  ```html
  <!-- in v5 -->
  <mg-icon icon="question-circle"></mg-icon>
  <!-- in v6 -->
  <mg-icon icon="interrogation-circle"></mg-icon>
  ```

- Update `size` prop possible values [as described](#size-prop-updates) :

  ```html
  <!-- in v5 -->
  <mg-icon icon="api" size="medium"></mg-icon>
  <mg-icon icon="ban" size="large"></mg-icon>
  <mg-icon icon="cog" size="extra-large"></mg-icon>
  <!-- in v6 -->
  <mg-icon icon="api" size="large"></mg-icon>
  <mg-icon icon="ban" size="xlarge"></mg-icon>
  <mg-icon icon="cog" size="xxlarge"></mg-icon>
  ```

### Changes in `mg-input-numeric`

- The `currency` type has been moved to the `format` attribute.

  ```html
  <!-- in v5 -->
  <mg-input-numeric identifier="blu" label="non" type="currency"></mg-input-numeric>
  <!-- in v6 -->
  <mg-input-numeric identifier="blu" label="non" format="currency"></mg-input-numeric>
  ```

### Changes in `mg-input-text` and `mg-input-textarea`

- Renammed `display-character-left` prop to `character-left-hide`.  
  The `display-character-left` prop was inconsistent with standard boolean attributes as it requires setting a "false" value explicitly. It should align with standard boolean attributes, which are considered false when the attribute is missing.

  ```html
  <!-- in v5 -->
  <mg-input-text identifier="blu" label="non" display-character-left="false"></mg-input-text>
  <!-- in v6 -->
  <mg-input-text identifier="blu" label="non" character-left-hide></mg-input-text>
  ```

### Changes in `mg-menu`

- Update `size` prop possible values [as described](#size-prop-updates) :

  ```html
  <!-- in v5 -->
  <mg-menu size="medium">...</mg-menu>
  <mg-menu size="large">...</mg-menu>
  <!-- in v6 -->
  <mg-menu size="large">...</mg-menu>
  <mg-menu size="xlarge">...</mg-menu>
  ```

### Changes in `mg-card` and `mg-message`

- Move `variant` and `variantStyle` props to `mg-message`.

### Hide components

- `mg-message` and `mg-modal` no longer use the `hide` prop for visibility. Use the native `hidden` attribute.

  ```html
  <!-- in v5 -->
  <mg-message hide>Non</mg-message>
  <mg-modal modal-title="Modal title" hide><p slot="content">non</p></mg-modal>
  <!-- in v6 -->
  <mg-message hidden>Non</mg-message>
  <mg-modal modal-title="Modal title" hidden><p slot="content">non</p></mg-modal>
  ```

### Internal components

- `mg-input-title` and `mg-character-left` components are now considered internal and should not be used outside of `mg-components`. Dedicated stories for these components have been removed.

### Stylesheet

- We now only have a `mg-components.css` file that contains all the variables and the minimum styles needed to make mg-components work. Other stylesheets can be found in the `@mgdis/styles` package.

  Using CDN:

  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mgdis/mg-components@6/dist/mg-components/mg-components.css" />
  <!-- If other stylesheets are needed -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mgdis/styles@2/dist/styles.css" />
  ```

  Using a build tool:

  ```TS
  import '@mgdis/mg-components/dist/mg-components/mg-components.css';
  import '@mgdis/styles/dist/styles.css'; // If other stylesheets are needed
  ```

- All custom properties, a.k.a. CSS variables, have been prefixed with `mg-` to avoid collisions with other CSS frameworks or your own variables. Additionally, we have prefixed them to indicate their purpose more clearly: `b-` for base, `c-` for component-specific, `l-` for layout-related, and `u-` for utility custom properties.

  ```CSS
  /* in v5 */
  --font-size: 1.3rem;
  --mg-button-border-radius: 0.3rem;
  --mg-grid-spacing: 1rem;

  /* in v6 */
  --mg-b-font-size: 1.3rem;
  --mg-c-button-border-radius: 0.3rem;
  --mg-l-grid-spacing: 1rem;
  ```
