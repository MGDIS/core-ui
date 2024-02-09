## Design

### Indication of the number of characters left

- when the focus is on the input field, the `mg-character-left` component is displayed
- when the focus is no longer on the input field, the message disappears
- by default limited to 4000 alpha numeric characters

#### Font

Open Sans, regular, 11px  
Color: [@color-dark](./?path=/docs/style-colors--docs), opacity : 0.6

#### Spacing

![](./doc/img/mg-input-textarea-spacing.png)

### Dimensions

- the height of the component is by default 3 lines of text (this value is configurable)
- by default, the input field cannot be resized

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                | Description                                                                                                                                    | Type                                             | Default           |
| ------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------- |
| `disabled`                | `disabled`               | Define if input is disabled                                                                                                                    | `boolean`                                        | `false`           |
| `displayCharacterLeft`    | `display-character-left` | Define if component should display character left                                                                                              | `boolean`                                        | `true`            |
| `helpText`                | `help-text`              | Add a help text under the input, usually expected data format and example                                                                      | `string`                                         | `undefined`       |
| `identifier` _(required)_ | `identifier`             | Identifier is used for the element ID (id is a reserved prop in Stencil.js)                                                                    | `string`                                         | `undefined`       |
| `invalid`                 | `invalid`                | Define input invalid state                                                                                                                     | `boolean`                                        | `undefined`       |
| `label` _(required)_      | `label`                  | Input label                                                                                                                                    | `string`                                         | `undefined`       |
| `labelHide`               | `label-hide`             | Define if label is visible                                                                                                                     | `boolean`                                        | `false`           |
| `labelOnTop`              | `label-on-top`           | Define if label is displayed on top                                                                                                            | `boolean`                                        | `undefined`       |
| `maxlength`               | `maxlength`              | Input max length                                                                                                                               | `number`                                         | `4000`            |
| `mgWidth`                 | `mg-width`               | Define input width                                                                                                                             | `"full" \| 16 \| 2 \| 4`                         | `'full'`          |
| `name`                    | `name`                   | Input name If not set the value equals the identifier                                                                                          | `string`                                         | `this.identifier` |
| `pattern`                 | `pattern`                | Define input pattern to validate                                                                                                               | `string`                                         | `undefined`       |
| `patternErrorMessage`     | `pattern-error-message`  | Define input pattern error message                                                                                                             | `string`                                         | `undefined`       |
| `placeholder`             | `placeholder`            | Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text. | `string`                                         | `undefined`       |
| `readonly`                | `readonly`               | Define if input is readonly                                                                                                                    | `boolean`                                        | `false`           |
| `required`                | `required`               | Define if input is required                                                                                                                    | `boolean`                                        | `false`           |
| `resizable`               | `resizable`              | Define if input is resizable                                                                                                                   | `"both" \| "horizontal" \| "none" \| "vertical"` | `'none'`          |
| `rows`                    | `rows`                   | Define the number of visible text lines for the control                                                                                        | `number`                                         | `3`               |
| `tooltip`                 | `tooltip`                | Add a tooltip message next to the input                                                                                                        | `string`                                         | `undefined`       |
| `tooltipPosition`         | `tooltip-position`       | Define tooltip position                                                                                                                        | `"input" \| "label"`                             | `'input'`         |
| `valid`                   | `valid`                  | Define input valid state                                                                                                                       | `boolean`                                        | `undefined`       |
| `value`                   | `value`                  | Component value                                                                                                                                | `string`                                         | `undefined`       |


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



### `setError(valid: MgInputTextarea['valid'], errorMessage: string) => Promise<void>`

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




## Dependencies

### Depends on

- [mg-character-left](../../../atoms/mg-character-left)
- [mg-tooltip](../../../atoms/mg-tooltip)
- [mg-icon](../../../atoms/mg-icon)
- [mg-input-title](../../../atoms/mg-input-title)

### Graph
```mermaid
graph TD;
  mg-input-textarea --> mg-character-left
  mg-input-textarea --> mg-tooltip
  mg-input-textarea --> mg-icon
  mg-input-textarea --> mg-input-title
  mg-tooltip --> mg-tooltip-content
  style mg-input-textarea fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
