# Buttons must have an ID (button-has-id)

For E2E tests TNR request to add an ID on every button and anchor.

## Rule Details

This rule aims to ensure buttons and anchors have an ID attribute.

Examples of **incorrect** code for this rule:

```html
<button>button text</button> <a>anchor text</a>
```

Examples of **correct** code for this rule:

```html
<button id="tnr-id">button text</button> <a id="tnr-id">anchor text</a>
```

## Further Reading

<http://outils.oceanie.local/wiki/qa-guidelines-test/#/tnr/tnr-check?id=_8-les-id-sur-les-templates-html-pour-les-input-button-etc>
