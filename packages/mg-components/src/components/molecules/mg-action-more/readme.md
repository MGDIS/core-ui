## Anatomy

![](./doc/img/mg-action-more-anatomy.png)

## Specifications

![](./doc/img/mg-action-more-popover-spacing.png)

### Spacing

Popover padding should be 10px up/down, 0px left/right.

## Behavior

### Action

In addition of the standard popover's behavior, when an item of the menu is clicked the popover closes itself.

## Items

### Button's variant

![](./doc/img/mg-action-more-options-variant.png)

It is possible to set another variant (see [mg-button](http://core.pages.mgdis.fr/core-ui/core-ui/?path=/docs/atoms-mg-button--docs)).

### Icon

![](./doc/img/mg-action-more-options-icon.png)

It is possible to set another icon

### Label

![](./doc/img/mg-action-more-options-label.png)

It is possible to set another label.

### Chevron

![](./doc/img/mg-action-more-options-chevron.png)

It is possible to display a chevron on the label right side, it make a 180 degree rotation on click.

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute         | Description                    | Type                                                                                                                                                                 | Default                             |
| -------------------- | ----------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `button`             | --                | Define button properties       | `{ isIcon: boolean; variant: "flat" \| "info" \| "success" \| "link" \| "primary" \| "secondary" \| "danger" \| "danger-alt"; label?: string; disabled?: boolean; }` | `{ variant: 'flat', isIcon: true }` |
| `displayChevron`     | `display-chevron` | Define if chevron is display   | `boolean`                                                                                                                                                            | `undefined`                         |
| `icon`               | --                | Define displayed icon          | `{ icon: string; }`                                                                                                                                                  | `undefined`                         |
| `items` _(required)_ | --                | Define the menu-items elements | `MgActionMoreItemType[]`                                                                                                                                             | `undefined`                         |


## Dependencies

### Depends on

- [mg-icon](../../atoms/mg-icon)
- [mg-popover](../mg-popover)
- [mg-button](../../atoms/mg-button)
- [mg-menu](../menu/mg-menu)
- [mg-menu-item](../menu/mg-menu-item)
- [mg-badge](../../atoms/mg-badge)

### Graph
```mermaid
graph TD;
  mg-action-more --> mg-icon
  mg-action-more --> mg-popover
  mg-action-more --> mg-button
  mg-action-more --> mg-menu
  mg-action-more --> mg-menu-item
  mg-action-more --> mg-badge
  mg-popover --> mg-popover-content
  mg-popover-content --> mg-card
  mg-popover-content --> mg-button
  mg-popover-content --> mg-icon
  mg-button --> mg-icon
  mg-menu-item --> mg-badge
  mg-menu-item --> mg-icon
  mg-menu-item --> mg-popover
  style mg-action-more fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
