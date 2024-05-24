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

| Name                                        | Description                                                                                                        |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `--mg-c-button-border-bottom-width`         | Defines the bottom border width of the button. Unset by default, fallback on `--mg-b-size-border`.                 |
| `--mg-c-button-border-left-width`           | Defines the left border width of the button. Unset by default, fallback on `--mg-b-size-border`.                   |
| `--mg-c-button-border-radius`               | Defines the border radius of the button. The default value is `--mg-b-size-radius`.                                |
| `--mg-c-button-border-radius-bottom-left`   | Defines the bottom left border radius of the button. Unset by default, fallback on `--mg-c-button-border-radius`.  |
| `--mg-c-button-border-radius-bottom-right`  | Defines the bottom right border radius of the button. Unset by default, fallback on `--mg-c-button-border-radius`. |
| `--mg-c-button-border-radius-top-left`      | Defines the top left border radius of the button. Unset by default, fallback on `--mg-c-button-border-radius`.     |
| `--mg-c-button-border-radius-top-right`     | Defines the top right border radius of the button. Unset by default, fallback on `--mg-c-button-border-radius`.    |
| `--mg-c-button-border-right-width`          | Defines the right border width of the button. Unset by default, fallback on `--mg-b-size-border`.                  |
| `--mg-c-button-border-top-width`            | Defines the top border width of the button. Unset by default, fallback on `--mg-b-size-border`.                    |
| `--mg-c-button-color-background-danger`     | Defines the background color for the danger variant button.                                                        |
| `--mg-c-button-color-background-danger-alt` | Defines the background color for the danger-alt variant button.                                                    |
| `--mg-c-button-color-background-info`       | Defines the background color for the info variant button.                                                          |
| `--mg-c-button-color-background-primary`    | Defines the background color for the primary variant button.                                                       |
| `--mg-c-button-color-background-secondary`  | Defines the background color for the secondary variant button.                                                     |
| `--mg-c-button-color-background-success`    | Defines the background color for the success variant button.                                                       |
| `--mg-c-button-color-background-warning`    | Defines the background color for the warning variant button.                                                       |
| `--mg-c-button-color-border-danger`         | Defines the border color for the danger variant button.                                                            |
| `--mg-c-button-color-border-danger-alt`     | Defines the border color for the danger-alt variant button.                                                        |
| `--mg-c-button-color-border-info`           | Defines the border color for the info variant button.                                                              |
| `--mg-c-button-color-border-primary`        | Defines the border color for the primary variant button.                                                           |
| `--mg-c-button-color-border-secondary`      | Defines the border color for the secondary variant button.                                                         |
| `--mg-c-button-color-border-success`        | Defines the border color for the success variant button.                                                           |
| `--mg-c-button-color-border-warning`        | Defines the border color for the warning variant button.                                                           |
| `--mg-c-button-color-gradient-danger`       | Defines the gradient color for the danger variant button.                                                          |
| `--mg-c-button-color-gradient-danger-alt`   | Defines the gradient color for the danger-alt variant button.                                                      |
| `--mg-c-button-color-gradient-info`         | Defines the gradient color for the info variant button.                                                            |
| `--mg-c-button-color-gradient-primary`      | Defines the gradient color for the primary variant button.                                                         |
| `--mg-c-button-color-gradient-secondary`    | Defines the gradient color for the secondary variant button.                                                       |
| `--mg-c-button-color-gradient-success`      | Defines the gradient color for the success variant button.                                                         |
| `--mg-c-button-color-gradient-warning`      | Defines the gradient color for the warning variant button.                                                         |
| `--mg-c-button-color-text-danger`           | Defines the font color for the danger variant button.                                                              |
| `--mg-c-button-color-text-danger-alt`       | Defines the font color for the danger-alt variant button.                                                          |
| `--mg-c-button-color-text-info`             | Defines the font color for the info variant button.                                                                |
| `--mg-c-button-color-text-primary`          | Defines the font color for the primary variant button.                                                             |
| `--mg-c-button-color-text-secondary`        | Defines the font color for the secondary variant button.                                                           |
| `--mg-c-button-color-text-success`          | Defines the font color for the success variant button.                                                             |
| `--mg-c-button-color-text-warning`          | Defines the font color for the warning variant button.                                                             |
| `--mg-c-button-font-weight`                 | Defines the font weight of the button. Unset by default, fallback on `normal`.                                     |
| `--mg-c-button-icon-border-radius`          | Defines the border radius of the button in icon mode. The default value is `--mg-b-size-min-height`.               |


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
