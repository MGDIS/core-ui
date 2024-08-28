/**
 * Format text
 * @param first - first content
 * @param middle - middle content
 * @param last - last content
 * @returns formatted text
 */
export const format = (first: string, middle: string, last: string): string =>
  (Boolean(first) ? `${first}` : '') + (Boolean(middle) ? ` ${middle}` : '') + (Boolean(last) ? ` ${last}` : '');
