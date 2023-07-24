# IDs and classes must follow naming convention (naming-convention)

For our design system we decided to use kebeb-case for IDs and BEM convention for classes. For consistency it is preferable that the portals use the same naming conventions.

## Rule Details

This rule aims to ensure IDs and classes follows naming convention.

Examples of **incorrect** code for this rule:

```html
<a id="PascalCase">Anchor text</a>
<a class="PascalCase">Anchor text</a>

<button class="not_bem-convention not_bem_convention">
  <span class="not__bem__convention">Button text</span>
</button>
```

Examples of **correct** code for this rule:

```html
<a id="kebab-case">Anchor text</a>

<button class="bem-convention bem-convention--modifier">
  <span class="bem-convention__element">Button</span>
  <span class="bem-convention__other-element">text</span>
</button>
```

## Further Reading

<http://getbem.com/naming/>
