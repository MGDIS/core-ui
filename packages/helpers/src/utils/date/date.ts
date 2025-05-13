/**
 * Date RegExp, usefull to test if string is a follow the date pattern
 * @example
 * ```ts
 * dateRegExp.test('mystring') // false
 * dateRegExp.test('2020-12-31') // true
 * ```
 */
export const dateRegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/**
 * Formats a date object to a string with the pattern 'YYYY-MM-DD'.
 * @param date - date to parse
 * @returns string date with pattern 'YYYY-MM-DD'
 * @example
 * ```ts
 * dateToString(new Date('2023-12-24')) // '2023-12-24'
 * ```
 */
export const dateToString = (date: Date): string | undefined => date.toISOString().split('T')[0];
