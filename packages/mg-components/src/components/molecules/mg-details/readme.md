## Properties

![](./doc/img/mg-details-components.png)

- **summary** and **details** are slots which allow html content
- **toggle** is defined by mg-icon plus a custom text
  - mg-icon _chevron-down_ is used for the close state
  - mg-icon _chevron-up_ is used for the open state

## Behavior

### Action

The complete zone including the _summary_ and the _toggle_ is clickable and toggles the state of the component.

![](./doc/img/mg-details-behavior.png)

### Position

_Toggle_ follows the _summary_ and is always on the top right.

![](./doc/img/mg-details-position.png)

### Responsive

In mobile resolution, the text of the _toggle_ is hidden

![](./doc/img/mg-details-responsive.png)

## Specs

### Spacing

![](./doc/img/mg-details-spacing.png)

### Icons

Toggle's icon is chevron-down when closed.
Toggle's icon is chevron-up when opened.

The icon is displayed in "small" size.

### Style

Toggle's text is in 'Open Sans', 13px, Regular, [@color-dark](./?path=/docs/style-colors--docs).

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- `--mg-details-spacing`: define space between summary and details, default: `1.5rem`

<!-- Auto Generated Below -->


## Properties

| Property                    | Attribute       | Description                             | Type      | Default     |
| --------------------------- | --------------- | --------------------------------------- | --------- | ----------- |
| `expanded`                  | `expanded`      | Define if details are diplayed          | `boolean` | `false`     |
| `hideSummary`               | `hide-summary`  | Hide summary element                    | `boolean` | `false`     |
| `toggleClosed` _(required)_ | `toggle-closed` | Displayed title when details are closed | `string`  | `undefined` |
| `toggleOpened` _(required)_ | `toggle-opened` | Displayed title when details are opened | `string`  | `undefined` |


## Events

| Event             | Description                        | Type                   |
| ----------------- | ---------------------------------- | ---------------------- |
| `expanded-change` | Emmited event when expanded change | `CustomEvent<boolean>` |


## Dependencies

### Depends on

- [mg-icon](../../atoms/mg-icon)

### Graph
```mermaid
graph TD;
  mg-details --> mg-icon
  style mg-details fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
