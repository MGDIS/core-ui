# mg-input-checkbox-paginated



<!-- Auto Generated Below -->


## Overview

Internal component use to manage sections instances

## Properties

| Property      | Attribute      | Description                                  | Type                                               | Default     |
| ------------- | -------------- | -------------------------------------------- | -------------------------------------------------- | ----------- |
| `checkboxes`  | --             | Define checkboxes to paginate                | `CheckboxItem[]`                                   | `[]`        |
| `disabled`    | `disabled`     | Define if mg-input-checkbox-list is disabled | `boolean`                                          | `undefined` |
| `messages`    | --             | Define component message                     | `{ [x: string]: string; }`                         | `undefined` |
| `name`        | `name`         | Define mg-input-checkbox input name          | `string`                                           | `undefined` |
| `readonly`    | `readonly`     | Define if mg-input-checkbox-list is readonly | `boolean`                                          | `undefined` |
| `sectionKind` | `section-kind` | Define section kind                          | `SectionKind.NOT_SELECTED \| SectionKind.SELECTED` | `undefined` |


## Events

| Event         | Description                                                                                       | Type                                                            |
| ------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `mass-action` | Emit 'mass-action' event used to informe that select-all/unselect-all button listner is triggered | `CustomEvent<SectionKind.NOT_SELECTED \| SectionKind.SELECTED>` |


## Dependencies

### Used by

 - [mg-input-checkbox](..)

### Depends on

- [mg-button](../../../../atoms/mg-button)
- [mg-icon](../../../../atoms/mg-icon)
- [mg-pagination](../../../mg-pagination)

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
  mg-tooltip --> mg-tooltip-content
  mg-input-checkbox --> mg-input-checkbox-paginated
  style mg-input-checkbox-paginated fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
