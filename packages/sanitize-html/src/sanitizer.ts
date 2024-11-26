import sanitizeHtml from 'sanitize-html';
import { SanitizerOptions } from './types';

const DEFAULT_ALLOWED_TAGS = [...sanitizeHtml.defaults.allowedTags, 'img', 'mg-icon'];
const DEFAULT_ALLOWED_ATTRIBUTES = {
  // These is the default config of the lib
  // (copied to enforce the string type, because the lib also accepts objects for attributes)
  'a': ['href', 'target'],
  'img': ['src', 'srcset', 'alt', 'width', 'height', 'loading'],
  // Below are custom attributes
  '*': ['style', 'class', 'aria-*'],
  'mg-icon': ['icon', 'size', 'variant', 'variant-style', 'color'],
};

export class Sanitizer {
  #allowedTags: string[] = DEFAULT_ALLOWED_TAGS;
  #allowedAttributes: Record<string, string[]> = { ...DEFAULT_ALLOWED_ATTRIBUTES };

  constructor(options?: SanitizerOptions) {
    if (options?.disallowTags) {
      this.#allowedTags = this.#allowedTags.filter(tag => options.disallowTags?.indexOf(tag) === -1);
    }

    if (options?.disallowAttributes) {
      for (const elementName in options.disallowAttributes) {
        const defaultAllowedAttributes = this.#allowedAttributes[elementName];

        if (Array.isArray(defaultAllowedAttributes)) {
          this.#allowedAttributes[elementName] = defaultAllowedAttributes.filter(allowedAttribute => options.disallowAttributes?.[elementName]?.indexOf(allowedAttribute) === -1);
        }
      }
    }
  }

  /**
   * Sanitize an unsafe HTML
   * @param html - unsafe HTML
   * @returns sanitized HTML
   */
  sanitize(html: string) {
    return sanitizeHtml(html, {
      allowedTags: this.#allowedTags,
      allowedAttributes: this.#allowedAttributes,
    });
  }
}
