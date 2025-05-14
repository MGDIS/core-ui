/**
 * Check if element belongs to the given tagNames list
 * @param element - element to check
 * @param tagNames - allowed tag names list
 * @returns `true` if element tagName is in the tagNames list
 */
export const isTagName = (element: Element, tagNames: string[]): boolean => tagNames.includes(element?.tagName.toLowerCase());

/**
 * CSS selector to select focusable elements.
 * @example
 * ```ts
 * const allFocusableElements: HTMLElement[] = Array.from(this.element.querySelectorAll(focusableElements));
 * ```
 */
export const focusableElements = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]), [identifier], mg-button';
