# img

This package is designed to manage images used in MGDIS products.

Images **MUST** be in the SVG file format.

Images should be placed in the `src` directory, within their respective folders. Currently, we have `icons` and `illustrations` folders.

## Figma Import

Icons are imported from our Figma design system. The script downloads SVG icons, optimizes them, and saves them to files.

### Prerequisites

Before running the script, make sure you have the following:

- Figma API access token
- Figma file key
- Figma page key

Set these values in the `.env` file:

```bash
FIGMA_ACCESS_TOKEN=<your-access-token>
FIGMA_FILE_KEY=<your-file-key>
FIGMA_PAGE_ID=<your-page-id>
```

### Run

To run the import, execute the following command:

```bash
pnpm import:figma
```

## Build

During the build process, SVG files in each folder are minified, PNG alternatives are generated, and an `index.json` file containing the file names is created.

There is also a command available to clean the `src` files. By running the `svgo:src` command, SVGs will be prettified (not minified).

## Illustations

To allow for customization, classes must be added to every SVG element (path, circle, etc.).

The required format for these classes is: `svg-{filename}-color-{number}`.

For example, if the file name is `no-data.svg`, the classes should be `svg-no-data-color-1`, `svg-no-data-color-2`, `svg-no-data-color-3`, and so on.
