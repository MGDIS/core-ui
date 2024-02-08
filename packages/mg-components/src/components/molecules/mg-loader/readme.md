## Specifications

![](./doc/img/mg-loader-anatomy.png)

### Anatomy

Component is built with :

- loader icon
- loader message

### Style

message : Open Sans, 13px, Regular
All contents are centered.

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
