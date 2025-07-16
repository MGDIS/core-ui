## Behavior

On the first tab, a banner with the link(s) is displayed by pushing the content down.

## Code example

You need to press <kbd>Tab</kbd> in the code example to see the component.

## Integration

The `mg-skip-links` must be integrated at the very top of your page to be the first focusable element.

## Implementation with a "#" based router

`mg-skip-links` uses native anchor behavior, but if your site/app uses a "#" link-based router, like AngularJS does, you'll need to use the "go-to-anchor" component event. This event returns its detail property to the target anchor, then you can apply the scrollTo anchor behavior:

- if the anchor is in the same window, with native javascript:

```js
const goToAnchor = (anchor) => {
    const top = document.querySelector(anchor).offsetTop;
    window.scrollTo(0, top);

    // set focus on next element to put keyboard navigation at the right place
    anchor.focus();
}

// optionaly you can use a timeout to wait document ready
setTimeout(()=> {
    // you must add listener on skip links element to prevent redirection
    Array.from(document.querySelector('mg-skip-links').shadowRoot.querySelectorAll('a')).forEach(anchor => {
        anchor.addEventListener('click', event => {
            event.preventDefault();
        })
    })​
})
```

- in case the anchor is in another window, with the [iframeRisizer's moveToAnchor method](https://iframe-resizer.com/api/parent/#movetoanchoranchor)

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type         | Default     |
| -------- | --------- | ----------- | ------------ | ----------- |
| `links`  | `links`   | Skip links  | `SkipLink[]` | `undefined` |


## Events

| Event          | Description                       | Type                  |
| -------------- | --------------------------------- | --------------------- |
| `go-to-anchor` | Emited event when link is clicked | `CustomEvent<string>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
