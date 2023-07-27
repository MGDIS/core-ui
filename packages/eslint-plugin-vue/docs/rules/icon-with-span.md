# Font icon must be used in span (icon-with-span)

One of the RGAA audit feedback items was the use of `<i>` tag instead of `<span>`, it's not semantically correct. We also sometimes forget to add the `aria-hidden="true"`

## Rule Details

This rule aims to ensure we are using `<span>` instead of `<i>` with the attribute `aria-hidden="true"`.

Examples of **incorrect** code for this rule:

```html
<i class="fa fa-thumbs-down" aria-hidden="true"></i>

<span class="fa fa-thumbs-down"></span>
```

Examples of **correct** code for this rule:

```html
<span class="fa fa-thumbs-up" aria-hidden="true"></span>
```
## Further Reading

[6.3. Managing alternative text on Icon Fonts - AcceDe Web](https://www.accede-web.com/en/guidelines/html-css/images-and-icons/managing-alternative-text-on-icon-fonts/)

[Awful practice. It is a triumph of performance over semantics.](https://stackoverflow.com/a/11135302/4614982)