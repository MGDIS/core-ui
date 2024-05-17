## Design

The standard display of "bullets" instead of characters is the standard one (depending on the rendering of the used browser).

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute          | Description                                                                                                                                    | Type                     | Default           |
| ------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ----------------- |
| `disabled`                | `disabled`         | Define if input is disabled                                                                                                                    | `boolean`                | `false`           |
| `helpText`                | `help-text`        | Add a help text under the input, usually expected data format and example                                                                      | `string`                 | `undefined`       |
| `identifier` _(required)_ | `identifier`       | Identifier is used for the element ID (id is a reserved prop in Stencil.js)                                                                    | `string`                 | `undefined`       |
| `invalid`                 | `invalid`          | Define input invalid state                                                                                                                     | `boolean`                | `undefined`       |
| `label` _(required)_      | `label`            | Input label                                                                                                                                    | `string`                 | `undefined`       |
| `labelHide`               | `label-hide`       | Define if label is visible                                                                                                                     | `boolean`                | `false`           |
| `labelOnTop`              | `label-on-top`     | Define if label is displayed on top                                                                                                            | `boolean`                | `undefined`       |
| `mgWidth`                 | `mg-width`         | Define input width                                                                                                                             | `"full" \| 16 \| 2 \| 4` | `'full'`          |
| `name`                    | `name`             | Input name If not set the value equals the identifier                                                                                          | `string`                 | `this.identifier` |
| `placeholder`             | `placeholder`      | Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text. | `string`                 | `undefined`       |
| `readonly`                | `readonly`         | Define if input is readonly                                                                                                                    | `boolean`                | `false`           |
| `required`                | `required`         | Define if input is required                                                                                                                    | `boolean`                | `false`           |
| `tooltip`                 | `tooltip`          | Add a tooltip message next to the input                                                                                                        | `string`                 | `undefined`       |
| `tooltipPosition`         | `tooltip-position` | Define tooltip position                                                                                                                        | `"input" \| "label"`     | `'input'`         |
| `valid`                   | `valid`            | Define input valid state                                                                                                                       | `boolean`                | `undefined`       |
| `value`                   | `value`            | Component value                                                                                                                                | `string`                 | `undefined`       |


## Events

| Event          | Description                         | Type                   |
| -------------- | ----------------------------------- | ---------------------- |
| `input-valid`  | Emited event when checking validity | `CustomEvent<boolean>` |
| `value-change` | Emited event when value change      | `CustomEvent<string>`  |


## Methods

### `displayError() => Promise<void>`

Display input error if it exists.

#### Returns

Type: `Promise<void>`



### `setError(valid: MgInputPassword['valid'], errorMessage: string) => Promise<void>`

Set an error and display a custom error message.
This method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.
It must be paired with an error message to display for the given context.
When used to set validity to `false`, you should use this method again to reset the validity to `true`.

#### Parameters

| Name           | Type      | Description                     |
| -------------- | --------- | ------------------------------- |
| `valid`        | `boolean` | - value indicating the validity |
| `errorMessage` | `string`  | - the error message to display  |

#### Returns

Type: `Promise<void>`




## CSS Custom Properties

| Name                                      | Description                                                                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `--mg-c-input-border-radius`              | Defines the border radius of the input. Default value is `--mg-b-size-radius`.                                                       |
| `--mg-c-input-border-width`               | Defines the width of the input border. Default value is `--mg-b-size-border`.                                                        |
| `--mg-c-input-check-size`                 | Defines the size of the input check. Default value is `--mg-b-size-2w`.                                                              |
| `--mg-c-input-color`                      | Defines the color of the input border and placeholder text. Default value is `rgb(181, 194, 201)`.                                   |
| `--mg-c-input-color-shadow-focus`         | Defines the shadow color of the input when focused. Default value is `rgba(0, 221, 255, 0.5)`.                                       |
| `--mg-c-input-error-bg-color`             | Defines the background color of the input error message. Default value is `color-mix(in srgb, var(--mg-b-color-danger), white 95%)`. |
| `--mg-c-input-toggle-border-radius-ratio` | Defines the border radius ratio of the input toggle. Default value is `2`.                                                           |


## Dependencies

### Depends on

- [mg-input](../mg-input)
- [mg-button](../../../atoms/mg-button)
- [mg-icon](../../../atoms/mg-icon)

### Graph
```mermaid
graph TD;
  mg-input-password --> mg-input
  mg-input-password --> mg-button
  mg-input-password --> mg-icon
  mg-input --> mg-tooltip
  mg-input --> mg-icon
  mg-input --> mg-input-title
  mg-tooltip --> mg-tooltip-content
  mg-button --> mg-icon
  style mg-input-password fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
