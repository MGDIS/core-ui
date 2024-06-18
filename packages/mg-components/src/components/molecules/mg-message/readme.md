

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description          | Type                                           | Default      |
| -------------- | --------------- | -------------------- | ---------------------------------------------- | ------------ |
| `variant`      | `variant`       | Define variant       | `"danger" \| "info" \| "success" \| "warning"` | `'info'`     |
| `variantStyle` | `variant-style` | Define variant style | `"background" \| "bar-left"`                   | `'bar-left'` |


## Slots

| Slot        | Description     |
| ----------- | --------------- |
|             | Message content |
| `"actions"` | Actions content |


## CSS Custom Properties

| Name                           | Description                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------ |
| `--mg-c-message-border-radius` | Defines the border radius of the message. Default value: `--mg-b-size-radius`. |


## Dependencies

### Used by

 - [mg-alert](../mg-alert)

### Depends on

- [mg-card](../../atoms/mg-card)
- [mg-icon](../../atoms/mg-icon)

### Graph
```mermaid
graph TD;
  mg-message --> mg-card
  mg-message --> mg-icon
  mg-alert --> mg-message
  style mg-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
