# mg-tooltip-content

In order to adhere to the ARIA tooltip pattern, which is essential for accessibility, we need to retrieve the tooltip content from outside the `mg-tooltip` shadow root.

The `mg-tooltip-content` component is appended to the `mg-tooltip` component as a slot when the component is loaded. It receives the tooltip content as props and manages the tooltip's style.
