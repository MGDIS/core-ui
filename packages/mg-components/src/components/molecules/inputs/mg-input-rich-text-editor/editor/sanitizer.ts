import { Sanitizer, type SanitizerOptions } from '@mgdis/sanitize-html';

// Export Sanitizer type for external use
export type { Sanitizer };

// Type aliases for tags and attributes
export type TagList = string[];
export type TagAttributes = Record<string, string[]>;

/**
 * Parse tags from comma-separated string
 * @param tagString - Comma-separated string of tag names (e.g., "img,script,style")
 * @returns Array of tag names
 */
export const parseTags = (tagString: string): TagList => {
  return tagString
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);
};

/**
 * Parse tag attributes from string format: "tag:attr1,attr2;tag2:attr3"
 * @param attributesString - String in format "tag:attr1,attr2;tag2:attr3" (e.g., "*:style;a:target")
 * @returns Mapping of tag names to arrays of attribute names
 */
export const parseTagAttributes = (attributesString: string): TagAttributes => {
  const result: TagAttributes = {};

  // Split by semicolon to get tag:attributes pairs
  attributesString.split(';').forEach(part => {
    const trimmedPart = part.trim();
    if (trimmedPart === '') return;

    // Split by colon to separate tag and attributes
    const colonIndex = trimmedPart.indexOf(':');
    if (colonIndex === -1) return;

    const tag = trimmedPart.substring(0, colonIndex).trim();
    const attrsString = trimmedPart.substring(colonIndex + 1).trim();

    if (tag === '' || attrsString === '') return;

    // Split attributes by comma
    const attrs = parseTags(attrsString);

    if (attrs.length > 0) {
      result[tag] = attrs;
    }
  });

  return result;
};

/**
 * Create a Sanitizer instance with the given options
 * @param disallowTags - Array of tag names to disallow
 * @param disallowAttributes - Mapping of tag names to arrays of attribute names
 * @returns Sanitizer instance
 */
export const createSanitizer = (disallowTags?: TagList, disallowAttributes?: TagAttributes): Sanitizer => {
  const options: SanitizerOptions | undefined =
    disallowTags === undefined && disallowAttributes === undefined
      ? undefined
      : {
          ...(disallowTags && { disallowTags }),
          ...(disallowAttributes && { disallowAttributes }),
        };

  return new Sanitizer(options);
};
