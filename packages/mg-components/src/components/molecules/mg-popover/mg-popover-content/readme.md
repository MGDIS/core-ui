# mg-popover-content

In order to adhere to the ARIA popover pattern, which is essential for accessibility, we need to retrieve the popover content from outside the `mg-popover` shadow root.

The `mg-popover-content` component is appended to the `mg-popover` component as a slot when the component is loaded. It receives the popover content as slots and manages the popover's style.