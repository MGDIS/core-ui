## Design

The badge is always placed on top of, or next to the element it is for.

The badge displays a number (can be followed by the `+` character) or a punctuation character.

## Specs

![](./doc/img/mg-badge-specs.png)

## Theming

![](./doc/img/mg-badge-styles.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- `--mg-badge-size`: define badge height and min-width, default: `1.6rem`
- `--mg-badge-font-size`: define badge font size, default: `1.1rem`
- `--mg-badge-text-color`: define badge color for text-color variant, default: `--color-light`

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute | Description                                                        | Type                                                                                       | Default       |
| -------------------- | --------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------- |
| `label` _(required)_ | `label`   | Badge label. Include short description. Required for accessibility | `string`                                                                                   | `undefined`   |
| `outline`            | `outline` | Define if button is using outline style                            | `boolean`                                                                                  | `undefined`   |
| `value` _(required)_ | `value`   | Badge value                                                        | `number \| string`                                                                         | `undefined`   |
| `variant`            | `variant` | Define badge variant                                               | `"danger" \| "info" \| "primary" \| "secondary" \| "success" \| "text-color" \| "warning"` | `variants[0]` |


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
