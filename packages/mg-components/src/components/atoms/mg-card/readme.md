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

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description              | Type                                                    | Default     |
| -------------- | --------------- | ------------------------ | ------------------------------------------------------- | ----------- |
| `variant`      | `variant`       | Define variant prop      | `"app" \| "danger" \| "info" \| "success" \| "warning"` | `undefined` |
| `variantStyle` | `variant-style` | Define variantStyle prop | `"bar-left" \| "fill"`                                  | `undefined` |


## Slots

| Slot | Description  |
| ---- | ------------ |
|      | Card content |


## CSS Custom Properties

| Name                                | Description                                                                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--mg-c-card-background`            | Defines the background property for the card. Unset by default, fallback on `--mg-c-card-background-default`.                                                 |
| `--mg-c-card-background-default`    | Defines the default background property for the card. Default value: `--mg-b-color-light`.                                                                    |
| `--mg-c-card-border`                | Defines the border property for the card. Unset by default, fallback on `--mg-c-card-border-default`.                                                         |
| `--mg-c-card-border-default`        | Defines the default border property for the card. Default value: `var(--mg-b-size-border) solid color-mix(in srgb, var(--mg-b-color-dark), transparent 95%)`. |
| `--mg-c-card-border-radius`         | Defines the border radius property for the card. Unset by default, fallback on `--mg-c-card-border-radius-default`.                                           |
| `--mg-c-card-border-radius-default` | Defines the default border radius property for the card. Default value: `--mg-b-size-radius`.                                                                 |
| `--mg-c-card-box-shadow`            | Defines the box shadow property for the card. Unset by default, fallback on `--mg-c-card-box-shadow-default`.                                                 |
| `--mg-c-card-box-shadow-default`    | Defines the default box shadow property for the card. Default value: `--mg-b-box-shadow`.                                                                     |
| `--mg-c-card-max-width`             | Defines the max-width property for the card. Unset by default.                                                                                                |
| `--mg-c-card-overflow`              | Defines the overflow property for the card. Unset by default, fallback on `--mg-c-card-overflow-default`.                                                     |
| `--mg-c-card-overflow-default`      | Defines the default overflow property for the card. Unset by default.                                                                                         |
| `--mg-c-card-padding`               | Defines the padding property for the card. Unset by default, fallback on `--mg-c-card-padding-default`.                                                       |
| `--mg-c-card-padding-default`       | Defines the default padding property for the card. Default value: `--mg-b-size-2w`.                                                                           |


## Dependencies

### Used by

 - [mg-message](../../molecules/mg-message)
 - [mg-modal](../../molecules/mg-modal)
 - [mg-panel](../../molecules/mg-panel)
 - mg-popover-content

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
