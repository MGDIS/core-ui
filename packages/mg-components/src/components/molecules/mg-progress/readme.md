# mg-progress



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute    | Description                                                                                                                                                                                                     | Type                       | Default         |
| -------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | --------------- |
| `ariaRole`           | `aria-role`  | Define progress role - `progressbar` to indicate a progress, such as loading or percent completion of a task - `meter` to indicate a graphical display of a numeric value that varies within a defined range    | `"meter" \| "progressbar"` | `'progressbar'` |
| `label` _(required)_ | `label`      | Define label                                                                                                                                                                                                    | `string`                   | `undefined`     |
| `max`                | `max`        | Define the maximum value in the range..                                                                                                                                                                         | `number`                   | `100`           |
| `min`                | `min`        | Define the minimum value in the range..                                                                                                                                                                         | `number`                   | `0`             |
| `value`              | `value`      | Define current value By default, it will be displayed as a percentage value. If you don’t specify the min and max props, the value should be a number within the range of 0 to 100.                             | `number`                   | `0`             |
| `valueText`          | `value-text` | Define the value text override for assistive technologies. Assistive technologies read the value as a percentage by default. Use this prop to make the value more understandable and relevant. ex: "€20 of €50" | `string`                   | `undefined`     |


## CSS Custom Properties

| Name                               | Description                                                                                   |
| ---------------------------------- | --------------------------------------------------------------------------------------------- |
| `--mg-c-progress-border-radius`    | Defines the border radius of the progress bar. Default value is `--mg-b-size-32`.             |
| `--mg-c-progress-color`            | Defines the color of the progress bar. Default value is `--mg-b-color-app`.                   |
| `--mg-c-progress-color-background` | Defines the color of the progress bar background. Default value is `--mg-b-color-neutral-30`. |
| `--mg-c-progress-value`            | Defines the progress bar width. Default value is `0%`.                                        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
