/**
 * Convert a string to kebab-case.
 *
 * This function ensures:
 * - All characters are converted to lowercase.  Based on : https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
 * - Non-alphabetic characters (except numbers and hyphens) are replaced with hyphens.
 * - Consecutive hyphens are replaced with a single hyphen.
 * - Leading and trailing hyphens are removed.
 *
 * @param str - The input string to convert.
 * @returns The kebab-case formatted string.
 *
 * @example
 * ```typescript
 * toKebabCase('XMLHttpRequest'); // 'xml-http-request'
 * ```
 */
export const toKebabCase = (str: string): string =>
  str
    .replace(/[A-Z]+(?![a-z])|[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase())
    .replace(/[^a-z0-9-]+/g, '-') // Replace non a-z, 0-9, or hyphen characters with a hyphen
    .replace(/--+/g, '-') // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-|-$/g, ''); // Remove leading hyphens or number or trailing hyphens
