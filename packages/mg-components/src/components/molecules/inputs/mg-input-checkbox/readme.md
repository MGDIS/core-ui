## Usage

True/False value notion.
Only 2 possible values.

### Theming

The style of the active checkbox is the browser's style.

## Specs

![](./mg-input-checkbox/doc/img/mg-input-checkbox-specs.png)

## Type "multi"

### Anatomy

![](./mg-input-checkbox/doc/img/mg-input-checkbox-anatomy-default-less-10.png)

- Button :
  - variant : secondary
  - icon : list
- Checkbox
- Popover

### type "multi" with than 10 values

when we have selected and not selected items we have two sections

![](./mg-input-checkbox/doc/img/mg-input-checkbox-more-10-values-2-sections.png)

when we only have selected OR unselected items we have one section displayed

![](./mg-input-checkbox/doc/img/mg-input-checkbox-more-10-values-selected-section.png)

Selected items section is collapsible

![](./mg-input-checkbox/doc/img/mg-input-checkbox-more-10-values-selected-section-collapsed.png)

### Displayed values

#### Style

![](./mg-input-checkbox/doc/img/mg-input-checkbox-values-style.png)

- Radius : 3px
- Font : OpenSans, Regular, 13px
- Color : [@color-dark-5](./?path=/docs/style-colors--page)

#### Alignment

![](./mg-input-checkbox/doc/img/mg-input-checkbox-alignment-displayed-values.png)

Text is centered vertically and horizontally in the container

#### Spacing

![](./mg-input-checkbox/doc/img/mg-input-checkbox-spacing-values.png)

#### Sizing

- Min-width : 35px
- Min-height : 35px

#### Behavior

##### Lack of space

1. Without values

![](./mg-input-checkbox/doc/img/mg-input-checkbox-behavior-lack-of-space-btn.png)

If the space is too narrow the text button will do a line break.

1. With values

![](./mg-input-checkbox/doc/img/mg-input-checkbox-behavior-lack-of-space-value.png)

If the space is too narrow the button and values will do a line break.

![](./mg-input-checkbox/doc/img/mg-input-checkbox-behavior-lack-of-space-value-breakline.png)

The component is ajusting with the space available. If the width is not enought big the values will do a breakline.

### Values not displayed

#### Spacing

![](./mg-input-checkbox/doc/img/mg-input-checkbox-values-not-displayed-style.png)

#### Style

![](./mg-input-checkbox/doc/img/mg-input-checkbox-values-not-displayed-spacing.png)

## CSS Variables

If needed some [variables](./?path=/story/css-variables--page) are available to customize the component:

- `--mg-input-check-size`: Define checkbox size, default: `1.3rem`

## Warning

Please be aware that this component has a known issue ([#139](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/139)) **when used with the Vue2 framework**. It is essential that your project loads the [mg-model directive](http://core.pages.mgdis.fr/core-back/core/docs/mg-components-helpers/mg-model-vue) and that the component uses it.

<!-- Auto Generated Below -->


## Overview

Internal component use to manage sections instances

## Properties

| Property      | Attribute      | Description                                  | Type                                               | Default     |
| ------------- | -------------- | -------------------------------------------- | -------------------------------------------------- | ----------- |
| `checkboxes`  | --             | Define checkboxes to paginate                | `CheckboxItem[]`                                   | `[]`        |
| `disabled`    | `disabled`     | Define if mg-input-checkbox-list is disabled | `boolean`                                          | `undefined` |
| `identifier`  | `identifier`   | Define mg-input-checkbox-list identifier     | `string`                                           | `undefined` |
| `messages`    | --             | Define component message                     | `{ [x: string]: string; }`                         | `undefined` |
| `readonly`    | `readonly`     | Define if mg-input-checkbox-list is readonly | `boolean`                                          | `undefined` |
| `sectionKind` | `section-kind` | Define section kind                          | `SectionKind.NOT_SELECTED \| SectionKind.SELECTED` | `undefined` |


## Events

| Event         | Description                | Type                                                            |
| ------------- | -------------------------- | --------------------------------------------------------------- |
| `mass-action` | Define 'mass-action' event | `CustomEvent<SectionKind.NOT_SELECTED \| SectionKind.SELECTED>` |


## Dependencies

### Used by

 - [mg-input-checkbox](.)

### Depends on

- [mg-button](../../../atoms/mg-button)
- [mg-icon](../../../atoms/mg-icon)
- [mg-pagination](../../mg-pagination)

### Graph
```mermaid
graph TD;
  mg-input-checkbox-paginated --> mg-button
  mg-input-checkbox-paginated --> mg-icon
  mg-input-checkbox-paginated --> mg-pagination
  mg-button --> mg-icon
  mg-pagination --> mg-button
  mg-pagination --> mg-icon
  mg-pagination --> mg-input-select
  mg-input-select --> mg-tooltip
  mg-input-select --> mg-icon
  mg-input-select --> mg-input-title
  mg-input-checkbox --> mg-input-checkbox-paginated
  style mg-input-checkbox-paginated fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
