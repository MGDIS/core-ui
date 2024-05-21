## Usage

Tooltips are messages that provide additional information about an element.
They are presented as a message that appears when an element is hovered over or when the keyboard is focused.
Tooltips are called "custom" when they are not built on the basis of the standard HTML code provided for these elements by the specification: the title attribute.
Our "custom tooltip" component is called "tooltip" here.

## Behavior

The tooltip must be displayed when the element that allows its display:

- Is hovered over by the mouse.
- Takes the keyboard focus.

The tooltip must be hidden when the element that allows its display:

- Is no longer hovered over by the mouse.
- Loses the keyboard focus.
- Pressing the Escape key must hide the tooltip.

The tooltip must remain displayed when its content is hovered over by the mouse.

The tooltip can be placed above, to the right, below or to the left of the element it describes.

By default, the message is displayed at the bottom of the element.

If the element is located at the edge of the screen, the tooltip is shifted to be always visible.

## Specs

### Shapes

![](./doc/img/mg-tooltip-shape.png)

### Fonts

![](./doc/img/mg-tooltip-font.png)

### Spacing

![](./doc/img/mg-tooltip-spaces.png)

### Alignments

![](./doc/img/mg-tooltip-alignments-text.png)

### Positioning

Triangle is always centered on the call component

![](./doc/img/mg-tooltip-positioning.png)
![](./doc/img/mg-tooltip-positioning2.png)

### Colors

![](./doc/img/mg-tooltip-colors.png)

### Sizes

![](./doc/img/mg-tooltip-sizing.png)

Component's max-width is 400px.

![](./doc/img/mg-tooltip-max-width.png)

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute    | Description                                                                      | Type                                                                                                                                                                                                         | Default                  |
| ---------------------- | ------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `disabled`             | `disabled`   | Disable tooltip                                                                  | `boolean`                                                                                                                                                                                                    | `false`                  |
| `display`              | `display`    | Display tooltip                                                                  | `boolean`                                                                                                                                                                                                    | `false`                  |
| `identifier`           | `identifier` | Sets an `id` attribute. Needed by the input for accessibility `aria-decribedby`. | `string`                                                                                                                                                                                                     | `createID('mg-tooltip')` |
| `message` _(required)_ | `message`    | Displayed message in the tooltip                                                 | `string`                                                                                                                                                                                                     | `undefined`              |
| `placement`            | `placement`  | Tooltip placement                                                                | `"auto" \| "auto-end" \| "auto-start" \| "bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom'`               |


## Slots

| Slot        | Description                           |
| ----------- | ------------------------------------- |
|             | Element that will display the tooltip |
| `"content"` | Tooltip content                       |


## CSS Custom Properties

| Name                              | Description                                                                      |
| --------------------------------- | -------------------------------------------------------------------------------- |
| `--mg-c-tooltip-background-color` | Defines the background color of the tooltip. Default value: `--mg-b-color-dark`. |
| `--mg-c-tooltip-border-radius`    | Defines the border radius of the tooltip. Default value: `--mg-b-size-radius`.   |
| `--mg-c-tooltip-font-color`       | Defines the font color of the tooltip. Default value: `--mg-b-color-light`.      |


## Dependencies

### Used by

 - [mg-input](../../molecules/inputs/mg-input)
 - [mg-input-checkbox-paginated](../../molecules/inputs/mg-input-checkbox/mg-input-checkbox-paginated)

### Depends on

- mg-tooltip-content

### Graph
```mermaid
graph TD;
  mg-tooltip --> mg-tooltip-content
  mg-input --> mg-tooltip
  mg-input-checkbox-paginated --> mg-tooltip
  style mg-tooltip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
