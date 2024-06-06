## Behavior

![](./docs/img/mg-loader-anatomy.png)

The default loader message is "Loading in progress..." and can be overridden with the `message` prop.

The loader message can be hidden using the `messageHide` prop.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description             | Type      | Default     |
| ------------- | -------------- | ----------------------- | --------- | ----------- |
| `message`     | `message`      | Override loader message | `string`  | `undefined` |
| `messageHide` | `message-hide` | Hide message            | `boolean` | `undefined` |


## Dependencies

### Depends on

- [mg-icon](../../atoms/mg-icon)

### Graph
```mermaid
graph TD;
  mg-loader --> mg-icon
  style mg-loader fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
