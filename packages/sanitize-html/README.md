# @mgdis/sanitize-html

This sanitizer gives a common way to sanitize unsafe HTML.

## Why?

Before inserting HTML inside DOM elements, it is necessary to sanitize it to avoid XSS security issues.

This package exposes a sanitizer with a default configuration suitable for use in MGDIS products. It allows for tweaks on this default configuration.

## How?

To use the sanitizer, we need to import it and create an instance.

The constructor has options to tweak the default configuration. This way the function to sanitize the HTML does not have to recreate the configuration each time. (Because it might be called a lot of time when used within a frontend framework.)

### Use with default configuration

```typescript
import { Sanitizer } from '@mgdis/sanitize-html';

const sanitizer = new Sanitizer();

const sanitizedHtml = sanitizer.sanitize('<h1>Test</h1><script>console.log("unsafe")</script>');
```

### Tweaking the default configuration

It is possible to restrict what is allowed by forbidding the use of some tags or some attributes (either for all tags or some).

```typescript
import { Sanitizer } from '@mgdis/sanitize-html';

const sanitizer = new Sanitizer({
  disallowTags: ['img'], // Images will be stripped out of the sanitized HTML
  disallowAttributes: {
    '*': ['style'], // "style" attributes will be removed from all attributes
    'img': ['alt'], // "alt" attributes will be removed from images (this is an example, this would be a bad idea to do it)
  },
});

const sanitizedHtml = sanitizer.sanitize('<h1>Test</h1><script>console.log("unsafe")</script>');
```

The options only allow to restrict what is allowed. If some tags or attributes are needed and not allowed in the default configuration, this lib would have to be updated. (This is wanted to enforce a secure configuration.)

### Use with UMD

Please note that some repositories may not support ES modules, which are a modern standard for organizing and sharing JavaScript code.
In such cases, it may be necessary to use a UMD (Universal Module Definition) build of the library instead. UMD is a format that is compatible with both modern ES modules and older module systems like CommonJS and AMD.

To use a UMD build, simply include the appropriate script tag or import statement in your project.

The exposed global variable name is `SanitizeHtmlModule`.
