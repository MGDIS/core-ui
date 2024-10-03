## Usage 

The badge is always placed on top of or next to the element it is associated with.

The badge displays a number (which can be followed by the `+` character) or a punctuation character.

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute | Description                                                        | Type                                                                                       | Default       |
| -------------------- | --------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------- |
| `label` _(required)_ | `label`   | Badge label. Include short description. Required for accessibility | `string`                                                                                   | `undefined`   |
| `outline`            | `outline` | Define if button is using outline style                            | `boolean`                                                                                  | `undefined`   |
| `value` _(required)_ | `value`   | Badge value                                                        | `number \| string`                                                                         | `undefined`   |
| `variant`            | `variant` | Define badge variant                                               | `"danger" \| "info" \| "primary" \| "secondary" \| "success" \| "text-color" \| "warning"` | `variants[0]` |


## CSS Custom Properties

| Name                      | Description                                                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `--mg-c-badge-color-text` | Defines the font color of the badge when used with the `text-color` variant and without `outline`. The default value is `--mg-b-color-light`. |
| `--mg-c-badge-font-size`  | Defines the font size of the badge. The default value is `--mg-b-font-size-small`.                                                            |
| `--mg-c-badge-size`       | Defines the height and minimum width of the badge. The default value is `--mg-b-size-16`.                                                     |


## Dependencies

### Used by

 - [mg-action-more](../../molecules/mg-action-more)
 - [mg-menu-item](../../molecules/menu/mg-menu-item)
 - [mg-tabs](../../molecules/mg-tabs)

### Graph
```mermaid
graph TD;
  mg-action-more --> mg-badge
  mg-menu-item --> mg-badge
  mg-tabs --> mg-badge
  style mg-badge fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
