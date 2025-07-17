# CSS Markdown Docs

This script parses a CSS file to extract comments with specific tags and generates markdown documentation files grouped by page.

## Process

- Empties the `docs` folder
- Parses CSS using `postcss`
- Parses comments using a custom parser
- Looks for tags like `@page`, `@example`, etc.
- Extracts `.mg-*` selectors from the CSS rules following the comments
- Outputs markdown documentation grouped by page

## Usage

```ts
cssDocs('<path-to-css-file>', '<output-docs-folder>');
```

Example:

```ts
cssDocs('../dist/styles.css', '../docs');
```

---

## Comment Format

CSS comments are expected to contain metadata with tags in the following format:

````css
/*
  This is a description of the component.
  @page Typography
  @example
  ```html
  <div class="..."></div>
  ```
*/
.mg-u-h1 {
  font-size: var(--mg-b-font-size-h1);
}
````

## Output Structure

For each `@page`, a separate markdown file is created inside the `docs` folder.

Each file contains:

- The page title
- One section per `.mg-*` selector block
- The block’s description
- Subsections for each tag (except `@page`)
