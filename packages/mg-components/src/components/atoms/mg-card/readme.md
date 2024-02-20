## Specifications

### Style

![](./doc/img/mg-card-style.png)

1. Border radius: 5px
2. Background: [@color-light](./?path=/docs/style-colors--docs)
3. Border: 1px, [@color-dark](./?path=/docs/style-colors--docs) with alpha at 5%
4. Shadow: [@shadow](./?path=/docs/style-colors--docs)

### Variant on bar / on background

You can set variant color on left bar or on background of the card

Values for variant colors are:

- info
- success
- warning
- danger
- app

![](./doc/img/mg-card-variant.png)

_exemple of "app color" for the last one_

Variant applied on the left bar uses **[full colors](./?path=/docs/style-colors--docs)**

Variant applied on the background uses **[soft colors](./?path=/docs/style-colors--docs)**

### Spacing

![](./doc/img/mg-card-spacing.png)

A padding of 16px is applied around the content

### Size

![](./doc/img/mg-card-size.png)

1. Ajusting with the content
2. Ajusting with its parent (100%)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- `--mg-c-card-padding`: define car padding, default: `1.6rem`
- `--mg-c-card-border-radius`: define card border radius, default: `0.5rem`
- `--mg-c-card-background`: define card background, default: `hsl(var(--mg-b-color-light))`
- `--mg-c-card-border`: define card border, default: `0.1rem solid hsla(var(--mg-b-color-dark), 5%)`
- `--mg-c-card-box-shadow`: define card shadow, default: `var(--mg-b-box-shadow)`
- `--mg-c-card-box-overflow`: define card overflow, default: `unset`
- `--mg-c-card-max-width`: define card max-width, default: `unset`
- `--mg-c-card-min-width`: define card min-width, default: `unset`

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description              | Type                                                    | Default     |
| -------------- | --------------- | ------------------------ | ------------------------------------------------------- | ----------- |
| `variant`      | `variant`       | Define variant prop      | `"app" \| "danger" \| "info" \| "success" \| "warning"` | `undefined` |
| `variantStyle` | `variant-style` | Define variantStyle prop | `"bar-left" \| "fill"`                                  | `undefined` |


## Dependencies

### Used by

 - [mg-message](../../molecules/mg-message)
 - [mg-modal](../../molecules/mg-modal)
 - [mg-panel](../../molecules/mg-panel)
 - [mg-popover-content](../../molecules/mg-popover/mg-popover-content)

### Graph
```mermaid
graph TD;
  mg-message --> mg-card
  mg-modal --> mg-card
  mg-panel --> mg-card
  mg-popover-content --> mg-card
  style mg-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
