## Behavior

The behavior is the native behavior of the browser.

### Theming

Calendar and trigger: The style is the browser's native style.

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute      | Description                                                                 | Type      | Default           |
| ------------------------- | -------------- | --------------------------------------------------------------------------- | --------- | ----------------- |
| `disabled`                | `disabled`     | Define if input is disabled                                                 | `boolean` | `false`           |
| `helpText`                | `help-text`    | Add a help text under the input, usually expected data format and example   | `string`  | `undefined`       |
| `identifier` _(required)_ | `identifier`   | Identifier is used for the element ID (id is a reserved prop in Stencil.js) | `string`  | `undefined`       |
| `invalid`                 | `invalid`      | Define input invalid state                                                  | `boolean` | `undefined`       |
| `label` _(required)_      | `label`        | Input label                                                                 | `string`  | `undefined`       |
| `labelHide`               | `label-hide`   | Define if label is visible                                                  | `boolean` | `false`           |
| `labelOnTop`              | `label-on-top` | Define if label is displayed on top                                         | `boolean` | `undefined`       |
| `max`                     | `max`          | Define input maximum date format: yyyy-mm-dd                                | `string`  | `undefined`       |
| `min`                     | `min`          | Define input minimum date format: yyyy-mm-dd                                | `string`  | `undefined`       |
| `name`                    | `name`         | Input name If not set the value equals the identifier                       | `string`  | `this.identifier` |
| `readonly`                | `readonly`     | Define if input is readonly                                                 | `boolean` | `false`           |
| `required`                | `required`     | Define if input is required                                                 | `boolean` | `false`           |
| `tooltip`                 | `tooltip`      | Add a tooltip message next to the input                                     | `string`  | `undefined`       |
| `valid`                   | `valid`        | Define input valid state                                                    | `boolean` | `undefined`       |
| `value`                   | `value`        | Component value                                                             | `string`  | `undefined`       |


## Events

| Event          | Description                         | Type                   |
| -------------- | ----------------------------------- | ---------------------- |
| `input-valid`  | Emited event when checking validity | `CustomEvent<boolean>` |
| `value-change` | Emited event when value change      | `CustomEvent<string>`  |


## Methods

### `displayError() => Promise<void>`

Public method to display errors

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [mg-tooltip](../../../atoms/mg-tooltip)
- [mg-icon](../../../atoms/mg-icon)
- [mg-input-title](../../../atoms/mg-input-title)

### Graph
```mermaid
graph TD;
  mg-input-date --> mg-tooltip
  mg-input-date --> mg-icon
  mg-input-date --> mg-input-title
  style mg-input-date fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
