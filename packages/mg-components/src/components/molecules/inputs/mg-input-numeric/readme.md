## Usage

An amount field is a numeric field.
By default it is limited to 16 characters (including comma).

It is not possible to enter characters other than numbers, "," or ".".

Rounding is to two digits after the decimal point.
It is not possible to enter more than two digits after the decimal point.

It is possible to specify a unit after the field for integers and decimals. For currencies, the symbol is positioned in the input field.

## Number Format

Numeric values are formatted according to the page's language settings. The component checks for the closest `lang` attribute and applies formatting based on that value. If it cannot find a `lang` attribute, it defaults to `en`.

**Reminder:** For accessibility purposes, the `lang` attribute should be set at least on the `<html>` tag.

The component supports different display formats for numeric values:

- `none`: Raw value without formatting
- `number`: Value formatted according to locale
- `currency`: Value formatted with currency symbol
- `percent`: Value formatted as a percentage
- `unit`: Value formatted with unit of measurement.

### Unit Format

When using the `unit` format, the component supports a list of units as defined by the ECMAScript Internationalization API. Some common units include:

- Length: `meter`, `kilometer`, `mile`
- Volume: `liter`, `gallon`
- Mass: `gram`, `kilogram`, `pound`
- Temperature: `celsius`, `fahrenheit`

For a complete list of supported units, refer to the [ECMAScript Internationalization API Specification](https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers).

## Slot

The spacing between the field and the slot content is not managed by the component, it must be defined in slot implementation.

### Unit positioning

Unit term must be placed into the field slot using a "space" character before the unit term.

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute          | Description                                                                                                                                    | Type                                                      | Default           |
| ------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------- |
| `currency`                | `currency`         | Define currency                                                                                                                                | `string`                                                  | `'EUR'`           |
| `decimalLength`           | `decimal-length`   | Override decimal length decimal is the number after the decimal point                                                                          | `number`                                                  | `2`               |
| `disabled`                | `disabled`         | Define if input is disabled                                                                                                                    | `boolean`                                                 | `false`           |
| `format`                  | `format`           | Set local formatting. Numbers are formatted based on the locale.                                                                               | `"currency" \| "none" \| "number" \| "percent" \| "unit"` | `'number'`        |
| `helpText`                | `help-text`        | Add a help text under the input, usually expected data format and example                                                                      | `string`                                                  | `undefined`       |
| `identifier` _(required)_ | `identifier`       | Identifier is used for the element ID (id is a reserved prop in Stencil.js)                                                                    | `string`                                                  | `undefined`       |
| `integerLength`           | `integer-length`   | Override integer length integer is the number before the decimal point                                                                         | `number`                                                  | `13`              |
| `invalid`                 | `invalid`          | Define input invalid state                                                                                                                     | `boolean`                                                 | `undefined`       |
| `label` _(required)_      | `label`            | Input label                                                                                                                                    | `string`                                                  | `undefined`       |
| `labelHide`               | `label-hide`       | Define if label is visible                                                                                                                     | `boolean`                                                 | `false`           |
| `labelOnTop`              | `label-on-top`     | Define if label is displayed on top                                                                                                            | `boolean`                                                 | `false`           |
| `max`                     | `max`              | Maximum value                                                                                                                                  | `number`                                                  | `undefined`       |
| `mgWidth`                 | `mg-width`         | Define input width                                                                                                                             | `"full" \| 16 \| 2 \| 4`                                  | `undefined`       |
| `min`                     | `min`              | Minimum value                                                                                                                                  | `number`                                                  | `undefined`       |
| `name`                    | `name`             | Input name If not set the value equals the identifier                                                                                          | `string`                                                  | `this.identifier` |
| `placeholder`             | `placeholder`      | Input placeholder. It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text. | `string`                                                  | `undefined`       |
| `readonly`                | `readonly`         | Define if input is readonly                                                                                                                    | `boolean`                                                 | `false`           |
| `required`                | `required`         | Define if input is required                                                                                                                    | `boolean`                                                 | `false`           |
| `tooltip`                 | `tooltip`          | Add a tooltip message next to the input                                                                                                        | `string`                                                  | `undefined`       |
| `tooltipPosition`         | `tooltip-position` | Define tooltip position                                                                                                                        | `"input" \| "label"`                                      | `'input'`         |
| `type`                    | `type`             | Define numeric type                                                                                                                            | `"decimal" \| "integer"`                                  | `'decimal'`       |
| `unit`                    | `unit`             | Define unit symbol (km, L, etc.)                                                                                                               | `string`                                                  | `undefined`       |
| `unitDisplay`             | `unit-display`     | Define unit display format ('short', 'long', 'narrow')                                                                                         | `"long" \| "narrow" \| "short"`                           | `'short'`         |
| `valid`                   | `valid`            | Define input valid state                                                                                                                       | `boolean`                                                 | `undefined`       |
| `value`                   | `value`            | Component value                                                                                                                                | `string`                                                  | `undefined`       |


## Events

| Event          | Description                         | Type                   |
| -------------- | ----------------------------------- | ---------------------- |
| `input-valid`  | Emited event when checking validity | `CustomEvent<boolean>` |
| `value-change` | Emited event when value change      | `CustomEvent<number>`  |


## Methods

### `displayError() => Promise<void>`

Display input error if it exists.

#### Returns

Type: `Promise<void>`



### `reset() => Promise<void>`

Reset value, validity and error state

#### Returns

Type: `Promise<void>`



### `setError(valid: MgInputNumeric["valid"], errorMessage: string) => Promise<void>`

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

Set focus on input.

#### Returns

Type: `Promise<void>`




## Slots

| Slot             | Description                          |
| ---------------- | ------------------------------------ |
| `"append-input"` | Content to display next to the input |


## Dependencies

### Depends on

- [mg-input](../mg-input)

### Graph
```mermaid
graph TD;
  mg-input-numeric --> mg-input
  mg-input --> mg-tooltip
  mg-input --> mg-icon
  mg-input --> mg-input-title
  mg-tooltip --> mg-tooltip-content
  style mg-input-numeric fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
