

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                   | Type                             | Default   |
| ------------ | ------------- | ----------------------------- | -------------------------------- | --------- |
| `hideShadow` | `hide-shadow` | Hide the box-shadow style     | `boolean`                        | `false`   |
| `radius`     | `radius`      | Define the border radius size | `"large" \| "medium" \| "small"` | `'large'` |


## Slots

| Slot | Description  |
| ---- | ------------ |
|      | Card content |


## CSS Custom Properties

| Name                                   | Description                                                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `--mg-c-card-border`                   | Defines the border property for the card. Unset by default, fallback on `--mg-c-card-border-default`.                          |
| `--mg-c-card-border-default`           | Defines the default border property for the card. Default value: `var(--mg-b-size-border) solid var(--mg-b-color-neutral-30)`. |
| `--mg-c-card-border-radius`            | Defines the border radius property for the card. Unset by default, fallback on `--mg-c-card-border-radius-default`.            |
| `--mg-c-card-border-radius-default`    | Defines the default border radius property for the card. Default value: `--mg-b-size-12`.                                      |
| `--mg-c-card-box-shadow`               | Defines the box shadow property for the card. Unset by default, fallback on `--mg-c-card-box-shadow-default`.                  |
| `--mg-c-card-box-shadow-default`       | Defines the default box shadow property for the card. Default value: `--mg-b-box-shadow`.                                      |
| `--mg-c-card-color-background`         | Defines the background property for the card. Unset by default, fallback on `--mg-c-card-color-background-default`.            |
| `--mg-c-card-color-background-default` | Defines the default background property for the card. Default value: `--mg-b-color-light`.                                     |
| `--mg-c-card-max-width`                | Defines the max-width property for the card. Unset by default.                                                                 |
| `--mg-c-card-min-width`                | Defines the min-width property for the card. Unset by default.                                                                 |
| `--mg-c-card-overflow`                 | Defines the overflow property for the card. Unset by default, fallback on `--mg-c-card-overflow-default`.                      |
| `--mg-c-card-overflow-default`         | Defines the default overflow property for the card. Unset by default.                                                          |
| `--mg-c-card-spacing`                  | Defines the padding property for the card. Unset by default, fallback on `--mg-c-card-spacing-default`.                        |
| `--mg-c-card-spacing-default`          | Defines the default padding property for the card. Default value: `--mg-b-size-16`.                                            |


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
