## Usage

True/False value notion.
Only 2 possible values.

### Theming

The style of the active checkbox is the browser's style.

## Specs

![](./doc/img/mg-input-checkbox-specs.png)

## Type "multi"

### Anatomy

![](./doc/img/mg-input-checkbox-multi-anatomy.png)

1. Button
  - variant : secondary
  - icon : list
2. Button
  - variant : link
3. Popover
4. Checkbox
5. Details
6. Search
7. Pagination

### Type "multi" with sections

![](./doc/img/mg-input-checkbox-multi-section.png)

#### Spacings

![](./doc/img/mg-input-checkbox-multi-section-button-spacing.png)

"Select all" and "Unselect all" buttons are aligned on left. 

![](./doc/img/mg-input-checkbox-multi-section-internal-spacing.png)

![](./doc/img/mg-input-checkbox-multi-section-spacing.png)


### Displayed values

#### Style

![](./doc/img/mg-input-checkbox-values-style.png)

- Radius : 3px
- Font : OpenSans, Regular, 13px
- Color : [@color-dark-5](./?path=/docs/style-colors--docs)

#### Alignment

![](./doc/img/mg-input-checkbox-alignment-displayed-values.png)

Text is centered vertically and horizontally in the container

#### Spacing

![](./doc/img/mg-input-checkbox-spacing-values.png)

#### Sizing

- Min-width : 35px
- Min-height : 35px

#### Behavior

##### Lack of space

1. Without values

![](./doc/img/mg-input-checkbox-behavior-lack-of-space-btn.png)

If the space is too narrow the text button will do a line break.

1. With values

![](./doc/img/mg-input-checkbox-behavior-lack-of-space-value.png)

If the space is too narrow the button and values will do a line break.

![](./doc/img/mg-input-checkbox-behavior-lack-of-space-value-breakline.png)

The component is ajusting with the space available. If the width is not enought big the values will do a breakline.

### Values not displayed

#### Spacing

![](./doc/img/mg-input-checkbox-values-not-displayed-spacing.png)

#### Style

![](./doc/img/mg-input-checkbox-values-not-displayed-style.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- `--mg-input-check-size`: Define checkbox size, default: `1.3rem`

## Warning

Please be aware that this component has a known issue ([#139](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/139)) **when used with the Vue2 framework**. It is essential that your project loads the [mg-model directive](http://core.pages.mgdis.fr/core-back/core/docs/mg-components-helpers/mg-model-vue) and that the component uses it.

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                 | Description                                                                        | Type                    | Default            |
| ------------------------- | ------------------------- | ---------------------------------------------------------------------------------- | ----------------------- | ------------------ |
| `disabled`                | `disabled`                | Define if input is disabled                                                        | `boolean`               | `false`            |
| `displaySelectedValues`   | `display-selected-values` | Display selected values list in "multi" type                                       | `boolean`               | `undefined`        |
| `helpText`                | `help-text`               | Add a help text under the input, usually expected data format and example          | `string`                | `undefined`        |
| `identifier` _(required)_ | `identifier`              | Identifier is used for the element ID (id is a reserved prop in Stencil.js)        | `string`                | `undefined`        |
| `inputVerticalList`       | `input-vertical-list`     | Define if inputs are display verticaly                                             | `boolean`               | `false`            |
| `invalid`                 | `invalid`                 | Define input invalid state                                                         | `boolean`               | `undefined`        |
| `label` _(required)_      | `label`                   | Define input label                                                                 | `string`                | `undefined`        |
| `labelHide`               | `label-hide`              | Define if label is visible                                                         | `boolean`               | `false`            |
| `labelOnTop`              | `label-on-top`            | Define if label is displayed on top                                                | `boolean`               | `undefined`        |
| `name`                    | `name`                    | Define input name If not set the value equals the identifier                       | `string`                | `this.identifier`  |
| `readonly`                | `readonly`                | Define if mg-input-checkbox is readonly                                            | `boolean`               | `false`            |
| `required`                | `required`                | Define if mg-input-checkbox is required                                            | `boolean`               | `false`            |
| `tooltip`                 | `tooltip`                 | Add a tooltip message next to the input                                            | `string`                | `undefined`        |
| `type`                    | `type`                    | Define checkbox type                                                               | `"checkbox" \| "multi"` | `checkboxTypes[0]` |
| `valid`                   | `valid`                   | Define input valid state                                                           | `boolean`               | `undefined`        |
| `value` _(required)_      | --                        | Component value If item.value is `null`, checkbox will be indeterminate by default | `CheckboxValue[]`       | `undefined`        |


## Events

| Event          | Description                         | Type                           |
| -------------- | ----------------------------------- | ------------------------------ |
| `input-valid`  | Emited event when checking validity | `CustomEvent<boolean>`         |
| `value-change` | Emitted event when value change     | `CustomEvent<CheckboxValue[]>` |


## Methods

### `displayError() => Promise<void>`

Public method to display errors

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [mg-input-checkbox-paginated](mg-input-checkbox-paginated)
- [mg-popover](../../mg-popover)
- [mg-button](../../../atoms/mg-button)
- [mg-icon](../../../atoms/mg-icon)
- [mg-input-text](../mg-input-text)
- [mg-tooltip](../../../atoms/mg-tooltip)
- [mg-input-title](../../../atoms/mg-input-title)

### Graph
```mermaid
graph TD;
  mg-input-checkbox --> mg-input-checkbox-paginated
  mg-input-checkbox --> mg-popover
  mg-input-checkbox --> mg-button
  mg-input-checkbox --> mg-icon
  mg-input-checkbox --> mg-input-text
  mg-input-checkbox --> mg-tooltip
  mg-input-checkbox --> mg-input-title
  mg-input-checkbox-paginated --> mg-button
  mg-input-checkbox-paginated --> mg-icon
  mg-input-checkbox-paginated --> mg-pagination
  mg-button --> mg-icon
  mg-pagination --> mg-button
  mg-pagination --> mg-icon
  mg-pagination --> mg-input-select
  mg-input-select --> mg-tooltip
  mg-input-select --> mg-icon
  mg-input-select --> mg-input-title
  mg-tooltip --> mg-tooltip-content
  mg-popover --> mg-card
  mg-popover --> mg-button
  mg-popover --> mg-icon
  mg-input-text --> mg-icon
  mg-input-text --> mg-character-left
  mg-input-text --> mg-tooltip
  mg-input-text --> mg-input-title
  style mg-input-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
