/**
 * Typeguard function to check if all array items are strings.
 * @param items - items to check
 * @returns `true` if all items are strings
 */
export const allItemsAreString = (items: unknown): items is string[] => Array.isArray(items) && items.every(item => typeof item === 'string');

/**
 * Validate string
 * @param value - value to check
 * @returns `true` if string is valid
 */
export const isValidString = (value: unknown): value is string => typeof value === 'string' && value.trim() !== '';

/**
 * Stringify value
 * @param value - value to stringify
 * @returns stringified value
 */
export const toString = (value: unknown): string => (typeof value === 'object' ? JSON.stringify(value) : String(value));

/**
 * Cleans string characters by removing special characters and converting to lowercase.
 * @param text - text to clean
 * @returns cleaned string
 * @example
 * ```ts
 * cleanString('âäàçéèêñù') // 'aaaceeenu'
 * cleanString('BATMAN') // 'batman'
 * ```
 */
export const cleanString = (text: string): string =>
  typeof text === 'string'
    ? text
        .toLocaleLowerCase()
        .normalize('NFD')
        .replaceAll(/[\u0300-\u036f]/g, '')
    : text;
