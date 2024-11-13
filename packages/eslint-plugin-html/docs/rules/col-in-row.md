# Columns must be immediate children of rows (col-in-row)

`col-*` classes must be immediate children of `row`.

## Rule Details

This rule aims to ensure correct use of `row` and `col-*` classes.

Examples of **incorrect** code for this rule:

```html
<div>
  <div class="col-md-2">Column content</div>
</div>

<div class="row">
  <div>Column content</div>
</div>
```

Examples of **correct** code for this rule:

```html
<div class="row">
  <div class="col-md-2">First column content</div>
  <div class="col-md-2">Second column content</div>
</div>
```

## Further Reading

<https://getbootstrap.com/docs/3.4/css/#grid>
