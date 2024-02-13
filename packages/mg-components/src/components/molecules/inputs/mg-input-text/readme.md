## Design

### Indication of the number of characters left

- when the focus is on the input field, the `mg-character-left` component is displayed
- when the focus is no longer on the input field, the message disappears
- by default limited to 400 alpha numeric characters

#### Font

![](./doc/img/mg-input-text-fonts.png)

Open Sans, regular, 11px  
Color: [@color-dark](./?path=/docs/style-colors--docs), opacity: 0.6

#### Spacing

![](./doc/img/mg-input-text-spacing.png)

#### Position

![](./doc/img/mg-input-text-position.png)

Position: center

## Use as `search` input

Due to [accessibility recommendation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/search#search_form_labels_and_accessibility), an `<input type="search" />` must be used within a `<form role="search" />` we recommend using mg-input-text as in dedicated story.

The "search" role can only be used when the input field is the main website search field.

## Display a `datalist`

The `datalist` behavior is set with `datalistoptions` prop to initalize options list.

## Slot

The spacing between the field and the slot content is not managed by the component, it must be defined in slot implementation.

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute               | Description                                                                                                                                                          | Type                     | Default           |
| ------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ----------------- |
| `characterLeftHide`       | `character-left-hide`   | Define if component should display character left                                                                                                                    | `boolean`                | `false`           |
| `datalistoptions`         | --                      | Define datalist options                                                                                                                                              | `string[]`               | `undefined`       |
| `disabled`                | `disabled`              | Define if input is disabled                                                                                                                                          | `boolean`                | `false`           |
| `helpText`                | `help-text`             | Add a help text under the input, usually expected data format and example                                                                                            | `string`                 | `undefined`       |
| `icon`                    | `icon`                  | Input icon                                                                                                                                                           | `string`                 | `undefined`       |
| `identifier` _(required)_ | `identifier`            | Identifier is used for the element ID (id is a reserved prop in Stencil.js)                                                                                          | `string`                 | `undefined`       |
| `invalid`                 | `invalid`               | Define input invalid state                                                                                                                                           | `boolean`                | `undefined`       |
| `label` _(required)_      | `label`                 | Input label                                                                                                                                                          | `string`                 | `undefined`       |
| `labelHide`               | `label-hide`            | Define if label is visible                                                                                                                                           | `boolean`                | `false`           |
| `labelOnTop`              | `label-on-top`          | Define if label is displayed on top                                                                                                                                  | `boolean`                | `undefined`       |
| `maxlength`               | `maxlength`             | Input max length                                                                                                                                                     | `number`                 | `400`             |
| `mgWidth`                 | `mg-width`              | Define input width                                                                                                                                                   | `"full" \| 16 \| 2 \| 4` | `'full'`          |
| `name`                    | `name`                  | Input name If not set the value equals the identifier                                                                                                                | `string`                 | `this.identifier` |
| `pattern`                 | `pattern`               | Define input pattern to validate Please refer to the Pattern section in the input documentation for detailed information on using regular expressions in components. | `string`                 | `undefined`       |
| `patternErrorMessage`     | `pattern-error-message` | Define input pattern error message                                                                                                                                   | `string`                 | `undefined`       |
| `placeholder`             | `placeholder`           | Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.                       | `string`                 | `undefined`       |
| `readonly`                | `readonly`              | Define if input is readonly                                                                                                                                          | `boolean`                | `false`           |
| `required`                | `required`              | Define if input is required                                                                                                                                          | `boolean`                | `false`           |
| `tooltip`                 | `tooltip`               | Add a tooltip message next to the input                                                                                                                              | `string`                 | `undefined`       |
| `tooltipPosition`         | `tooltip-position`      | Define tooltip position                                                                                                                                              | `"input" \| "label"`     | `'input'`         |
| `type`                    | `type`                  | Input type                                                                                                                                                           | `"search" \| "text"`     | `'text'`          |
| `valid`                   | `valid`                 | Define input valid state                                                                                                                                             | `boolean`                | `undefined`       |
| `value`                   | `value`                 | Component value                                                                                                                                                      | `string`                 | `undefined`       |


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



### `setError(valid: MgInputText['valid'], errorMessage: string) => Promise<void>`

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



### `setFocus() => Promise<void>`

Public method to play input focus

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [mg-input-checkbox](../mg-input-checkbox)
 - [mg-panel](../../mg-panel)

### Depends on

- [mg-icon](../../../atoms/mg-icon)
- [mg-character-left](../../../atoms/internals/mg-character-left)
- [mg-tooltip](../../../atoms/mg-tooltip)
- [mg-input-title](../../../atoms/internals/mg-input-title)

### Graph
```mermaid
graph TD;
  mg-input-text --> mg-icon
  mg-input-text --> mg-character-left
  mg-input-text --> mg-tooltip
  mg-input-text --> mg-input-title
  mg-tooltip --> mg-tooltip-content
  mg-input-checkbox --> mg-input-text
  mg-panel --> mg-input-text
  style mg-input-text fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
