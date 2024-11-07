## Accessibility

### `aria-valuetext` attribute

Assistive technologies often present the value of aria-valuenow as a percentage. If this would not be accurate use this property to make the progress bar value understandable.
[See full recommendation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuetext)

### `aria-busy` attribute

With the role `progressbar`, if the progress bar is describing the loading progress of a particular region of a page set the aria-busy attribute to true on the region until it is finished loading.
[See full recommendation](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/progressbar_role#best_practices)

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute   | Description                                                                                                                                                                                                  | Type                       | Default         |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- | --------------- |
| `ariaRole`           | `aria-role` | Define progress role - `progressbar` to indicate a progress, such as loading or percent completion of a task - `meter` to indicate a graphical display of a numeric value that varies within a defined range | `"meter" \| "progressbar"` | `'progressbar'` |
| `label` _(required)_ | `label`     | Define label                                                                                                                                                                                                 | `string`                   | `undefined`     |
| `max`                | `max`       | Define the maximum value in the range                                                                                                                                                                        | `number`                   | `100`           |
| `min`                | `min`       | Define the minimum value in the range                                                                                                                                                                        | `number`                   | `0`             |
| `value`              | `value`     | Define current value By default, it will be displayed as a percentage value. If you don’t specify the min and max props, the value should be a number within the range of 0 to 100.                          | `number`                   | `0`             |


## CSS Custom Properties

| Name                                    | Description                                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------------------------- |
| `--mg-c-progress-bar-color-background`  | Defines the color of the progress bar. Default value is `--mg-b-color-neutral-30`.          |
| `--mg-c-progress-border-radius`         | Defines the border radius of the progress bar. Default value is `--mg-b-size-32`.           |
| `--mg-c-progress-fill-color-background` | Defines the color of the progress bar fill background. Default value is `--mg-b-color-app`. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
