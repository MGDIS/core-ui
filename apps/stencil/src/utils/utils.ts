/**
 * Format text
 * @param first - first content
 * @param middle - middle content
 * @param last - last content
 * @returns formated text
 */
export const format = (first: string, middle: string, last: string): string => (Boolean(first) || '') + (Boolean(middle) ? ` ${middle}` : '') + (Boolean(last) ? ` ${last}` : '');
