## Horizontal

### Use

![](./docs/img/mg-menu-horizontal-exemple.png)

Horizontal menu is used with large ("desktop") resolutions, it is placed in the upper area of the screen.

### Anatomy

![](./docs/img/mg-menu-horizontal-anatomy.png)

![](./docs/img/mg-menu-horizontal-item-anatomy.png)

### Behavior

#### Sizing

![](./docs/img/mg-menu-horizontal-sizing.png)

A horizontal menu can display different item sizes: regular, medium, large.

![](./docs/img/mg-menu-horizontal-sizing-itemmaxwidth.png)

The content of the element determines its width, but to handle the case where the content is too large (long label), it is possible to specify a maximum width for the element._Label_ and _Meta_ are then truncated.

#### Sub-content

![](./docs/img/mg-menu-horizontal-subcontent-submenu.png)

![](./docs/img/mg-menu-horizontal-subcontent-slot.png)

A "submenu" or a "free content" can be set to the item.
An icon "chevron-down" at the right of the item informs the user.

##### Badge

![](./docs/img/mg-menu-horizontal-subcontent-badge.png)

If at least one sub-item has a badge, the item displays a badge with an exclamation symbol.

#### Overflow

![](./docs/img/mg-menu-horizontal-plus.png)

When not all items can be displayed due to the width of the menu container, the items are grouped into a "plus item".

## Vertical

### Use

![](./docs/img/mg-menu-vertical-use.png)

The horizontal menu is used with large resolutions ("desktop"), it is mainly placed in the left area of the screen.

### Anatomy

![](./docs/img/mg-menu-vertical-anatomy.png)

![](./docs/img/mg-menu-vertical-item-anatomy.png)

### Behavior

#### Sub content

An item can display a sub content which can be another vertical menu.
This item displays a chevron to its right.
The submenu is displayed by clicking on the item.

##### Badge

![](./docs/img/mg-menu-vertical-subcontent-badge.png)

If at least one sub-item has a badge, the item displays a badge with an exclamation symbol.

#### Overflow

![](./docs/img/mg-menu-vertical-scroll.png)

When not all items can be displayed due to the height of the menu container, a scroll bar helps to see hidden items.

**🔺child mg-menu-item slots image / information**

With a mg-badge/mg-tag/mg-icon, **you must set the component using HTML attributes** instead, because the behavior uses the [cloneNode](https://developer.mozilla.org/fr/docs/Web/API/Node/cloneNode) method which breaks properties.

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute   | Description                                                                         | Type                                                                                      | Default                |
| -------------------- | ----------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------- |
| `direction`          | `direction` | Component display direction.                                                        | `Direction.HORIZONTAL \| Direction.VERTICAL`                                              | `Direction.HORIZONTAL` |
| `itemmore`           | --          | Customize "mg-item-more" element Used with direction: 'vertical' to manage overflow | `{ size?: "medium" \| "large" \| "xlarge"; icon?: IconType; slotlabel?: SlotLabelType; }` | `undefined`            |
| `label` _(required)_ | `label`     | Menu label. Include short menu description. Required for accessibility              | `string`                                                                                  | `undefined`            |
| `size`               | `size`      | Define mg-menu size                                                                 | `"large" \| "medium" \| "xlarge"`                                                         | `'medium'`             |


## Slots

| Slot | Description  |
| ---- | ------------ |
|      | Menu content |


## CSS Custom Properties

| Name                           | Description                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| `--mg-c-menu-background-color` | Defines the background color of the menu. Unset by default, fallback on `--mg-b-color-light`. |


## Dependencies

### Used by

 - [mg-action-more](../../mg-action-more)
 - mg-item-more

### Depends on

- mg-item-more

### Graph
```mermaid
graph TD;
  mg-menu --> mg-item-more
  mg-item-more --> mg-menu
  mg-menu-item --> mg-badge
  mg-menu-item --> mg-icon
  mg-menu-item --> mg-popover
  mg-popover --> mg-popover-content
  mg-popover-content --> mg-card
  mg-popover-content --> mg-button
  mg-popover-content --> mg-icon
  mg-button --> mg-icon
  mg-action-more --> mg-menu
  style mg-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
