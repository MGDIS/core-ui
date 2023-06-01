# img

Package to manage images used in MGDIS products.

Images **MUST** be a `SVG` file.

Images have to be placed in `src`, in its corresponding folder. We have `icons` and `illustations` for now.

On build `SVG` files are minified and a `PNG` will also be created.

It is possible to clean the src files running the command `svgo:src`.
