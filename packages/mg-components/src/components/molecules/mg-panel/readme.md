

<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                     | Description                                                                                                 | Type                | Default                   |
| -------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------- |
| `expandToggleDisabled`     | `expand-toggle-disabled`      | Disable possibility to toggle expand                                                                        | `boolean`           | `undefined`               |
| `expandToggleDisplay`      | `expand-toggle-display`       | Define expand toggle button display                                                                         | `"icon" \| "text"`  | `expandToggleDisplays[0]` |
| `expanded`                 | `expanded`                    | Panel is opened                                                                                             | `boolean`           | `false`                   |
| `identifier`               | `identifier`                  | Identifier is used for the element ID (id is a reserved prop in Stencil.js) If not set, it will be created. | `string`            | `createID('mg-panel')`    |
| `panelTitle` _(required)_  | `panel-title`                 | Panel title                                                                                                 | `string`            | `undefined`               |
| `titleEditable`            | `title-editable`              | Define if panel title is editable                                                                           | `boolean`           | `false`                   |
| `titlePattern`             | `title-pattern`               | Panel title pattern                                                                                         | `string`            | `undefined`               |
| `titlePatternErrorMessage` | `title-pattern-error-message` | Panel title pattern error message                                                                           | `string`            | `undefined`               |
| `titlePosition`            | `title-position`              | Define title position                                                                                       | `"left" \| "right"` | `titlePositions[0]`       |


## Events

| Event             | Description                        | Type                   |
| ----------------- | ---------------------------------- | ---------------------- |
| `expanded-change` | Emmited event when expanded change | `CustomEvent<boolean>` |
| `title-change`    | Emmited event when title change    | `CustomEvent<string>`  |


## Slots

| Slot             | Description                |
| ---------------- | -------------------------- |
|                  | Panel content              |
| `"header-right"` | Header right panel content |


## CSS Custom Properties

| Name                            | Description                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `--mg-c-panel-border-radius`    | Defines the border radius of the panel. Default value: `--mg-b-size-radius`.                                 |
| `--mg-c-panel-box-shadow`       | Defines the box shadow of the panel. Default value: `--mg-b-box-shadow`.                                     |
| `--mg-c-panel-color-background` | Defines the background of the panel. Default value: `color-mix(in srgb, var(--mg-b-color-info), white 97%)`. |
| `--mg-c-panel-content-spacing`  | Defines the padding of the panel content. Default value: `--mg-b-size-16`.                                   |


## Dependencies

### Depends on

- [mg-button](../../atoms/mg-button)
- [mg-icon](../../atoms/mg-icon)
- [mg-input-text](../inputs/mg-input-text)
- [mg-card](../../atoms/mg-card)

### Graph
```mermaid
graph TD;
  mg-panel --> mg-button
  mg-panel --> mg-icon
  mg-panel --> mg-input-text
  mg-panel --> mg-card
  mg-button --> mg-icon
  mg-input-text --> mg-input
  mg-input-text --> mg-icon
  mg-input-text --> mg-character-left
  mg-input --> mg-tooltip
  mg-input --> mg-icon
  mg-input --> mg-input-title
  mg-tooltip --> mg-tooltip-content
  style mg-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
