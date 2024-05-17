## Usage

A primary action button is, in most cases, unique on the screen, the other buttons must be displayed as "secondary", to highlight the primary action.
Ex: Validation, Save

A tooltip must be displayed on hover when the button only displays a non-explicit icon, and has no label. The tooltip must indicate the action of the button.

A button that launches a potentially long process is disabled and displays a loader for the duration of the process needs to use the `disable-on-click` attribute to ensure that the button is disabled when clicked.

A button with undefined type in a form will natively have a [submit type](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button#attributs) and trigger form submission. So on non-submission buttons you need to explicitely set the type attribute as "button".

## Specs

![](./doc/img/mg-button-specs.png)

## Placement

![](./doc/img/mg-button-placement.png)

## Theming

![](./doc/img/mg-button-styles.png)

Focused `mg-button` style is the one from the browser (outline).

## Attributes combination: `disable-on-click` and `disabled`

When a click is triggered, the component sets the `disabled` prop to true.

To benefit from a reactive `disabled` prop, you need to handle the `disabled-change` event.

To reset the loader after the process has completed, you need to set the `disabled` prop asynchronously.

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

### Global

- `--mg-c-button-border-radius`: define button border radius, default: `0.3rem`
- `--mg-c-button-icon-border-radius`: define button border radius in icon mode, default: `--mg-b-size-min-height`
- `--mg-c-button-disabled-opacity`: define button opacity when disabled, default: `--mg-b-disabled-opacity`
- `--mg-c-button-gradient`: define if button use gradient, possible values 0 (no gradient) or 1 (with gradient), default: `1`
- `--mg-c-button-border-variation`: define if button has a border based on background color, possible values 0 (no border) or 1 (with border), default: `1`

### Variant

Variants `danger`, `danger-alt`, `info` and `success` can be customized by changing the global [colors](./?path=/docs/style-colors--docs).

#### Primary

- `--mg-c-button-primary-color-h`: define hue color value for primary button, default: `--mg-b-color-dark-h`
- `--mg-c-button-primary-color-s`: define saturation color value for primary button, default: `--mg-b-color-dark-s`
- `--mg-c-button-primary-color-l`: define lightness color value for primary button, default: `--mg-b-color-dark-l`
- `--mg-c-button-primary-font-color`: define font color for primary button, default: `--mg-b-color-neutral`

#### Secondary

- `--mg-c-button-secondary-color-h`: define hue color value for secondary button, default: `--mg-b-color-neutral-h`
- `--mg-c-button-secondary-color-s`: define saturation color value for secondary button, default: `--mg-b-color-neutral-s`
- `--mg-c-button-secondary-color-l`: define lightness color value for secondary button, default: `--mg-b-color-neutral-l`
- `--mg-c-button-secondary-font-color`: define font color for secondary button, default: `--mg-b-color-dark`

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                                                                                                            | Type                                                                                              | Default       |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ------------- |
| `disableOnClick` | `disable-on-click` | Option to set input disable on click, in order to prevent multi-click. Parent component have to remove the attribute 'disabled' when the process ends. | `boolean`                                                                                         | `false`       |
| `disabled`       | `disabled`         | Disable button                                                                                                                                         | `boolean`                                                                                         | `undefined`   |
| `form`           | `form`             | Define form id to attach button with. If this attribute is not set, the <button> is associated with its ancestor <form> element.                       | `string`                                                                                          | `undefined`   |
| `fullWidth`      | `full-width`       | Set button to full-width                                                                                                                               | `boolean`                                                                                         | `false`       |
| `isIcon`         | `is-icon`          | Define if button is round. Used for icon button.                                                                                                       | `boolean`                                                                                         | `false`       |
| `label`          | `label`            | aria-label In case button text is not explicit enough                                                                                                  | `string`                                                                                          | `undefined`   |
| `type`           | `type`             | Define button type                                                                                                                                     | `"button" \| "reset" \| "submit"`                                                                 | `undefined`   |
| `variant`        | `variant`          | Define button variant                                                                                                                                  | `"danger" \| "danger-alt" \| "flat" \| "info" \| "link" \| "primary" \| "secondary" \| "success"` | `variants[0]` |


## Events

| Event             | Description                        | Type                   |
| ----------------- | ---------------------------------- | ---------------------- |
| `disabled-change` | Emmited event when disabled change | `CustomEvent<boolean>` |


## Slots

| Slot | Description    |
| ---- | -------------- |
|      | Button content |


## CSS Custom Properties

| Name                                        | Description                                                                            |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| `--mg-c-button-border-radius`               | Define the button border radius. Default value: `--mg-b-size-radius`.                  |
| `--mg-c-button-danger-alt-background-color` | Define the danger-alt variant button background color.                                 |
| `--mg-c-button-danger-alt-border-color`     | Define the danger-alt variant button border color.                                     |
| `--mg-c-button-danger-alt-font-color`       | Define the danger-alt variant button font color.                                       |
| `--mg-c-button-danger-alt-gradient-color`   | Define the danger-alt variant button gradient color.                                   |
| `--mg-c-button-danger-background-color`     | Define the danger variant button background color.                                     |
| `--mg-c-button-danger-border-color`         | Define the danger variant button border color.                                         |
| `--mg-c-button-danger-font-color`           | Define the danger variant button font color.                                           |
| `--mg-c-button-danger-gradient-color`       | Define the danger variant button gradient color.                                       |
| `--mg-c-button-disabled-opacity`            | Define the button opacity when disabled. Default value: `--mg-b-disabled-opacity`.     |
| `--mg-c-button-icon-border-radius`          | Define the button border radius in icon mode. Default value: `--mg-b-size-min-height`. |
| `--mg-c-button-info-background-color`       | Define the info variant button background color.                                       |
| `--mg-c-button-info-border-color`           | Define the info variant button border color.                                           |
| `--mg-c-button-info-font-color`             | Define the info variant button font color.                                             |
| `--mg-c-button-info-gradient-color`         | Define the info variant button gradient color.                                         |
| `--mg-c-button-primary-background-color`    | Define the primary variant button background color.                                    |
| `--mg-c-button-primary-border-color`        | Define the primary variant button border color.                                        |
| `--mg-c-button-primary-font-color`          | Define the primary variant button font color.                                          |
| `--mg-c-button-primary-gradient-color`      | Define the primary variant button gradient color.                                      |
| `--mg-c-button-secondary-background-color`  | Define the secondary variant button background color.                                  |
| `--mg-c-button-secondary-border-color`      | Define the secondary variant button border color.                                      |
| `--mg-c-button-secondary-font-color`        | Define the secondary variant button font color.                                        |
| `--mg-c-button-secondary-gradient-color`    | Define the secondary variant button gradient color.                                    |
| `--mg-c-button-success-background-color`    | Define the success variant button background color.                                    |
| `--mg-c-button-success-border-color`        | Define the success variant button border color.                                        |
| `--mg-c-button-success-font-color`          | Define the success variant button font color.                                          |
| `--mg-c-button-success-gradient-color`      | Define the success variant button gradient color.                                      |
| `--mg-c-button-warning-background-color`    | Define the warning variant button background color.                                    |
| `--mg-c-button-warning-border-color`        | Define the warning variant button border color.                                        |
| `--mg-c-button-warning-font-color`          | Define the warning variant button font color.                                          |
| `--mg-c-button-warning-gradient-color`      | Define the warning variant button gradient color.                                      |


## Dependencies

### Used by

 - [mg-action-more](../../molecules/mg-action-more)
 - [mg-input-checkbox](../../molecules/inputs/mg-input-checkbox)
 - [mg-input-checkbox-paginated](../../molecules/inputs/mg-input-checkbox/mg-input-checkbox-paginated)
 - [mg-input-password](../../molecules/inputs/mg-input-password)
 - [mg-message](../../molecules/mg-message)
 - [mg-modal](../../molecules/mg-modal)
 - [mg-pagination](../../molecules/mg-pagination)
 - [mg-panel](../../molecules/mg-panel)
 - mg-popover-content

### Depends on

- [mg-icon](../mg-icon)

### Graph
```mermaid
graph TD;
  mg-button --> mg-icon
  mg-action-more --> mg-button
  mg-input-checkbox --> mg-button
  mg-input-checkbox-paginated --> mg-button
  mg-input-password --> mg-button
  mg-message --> mg-button
  mg-modal --> mg-button
  mg-pagination --> mg-button
  mg-panel --> mg-button
  mg-popover-content --> mg-button
  style mg-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
