/**
 * Validate number
 * @param value - value to check
 * @returns `true` if number is valid
 */
export const isValidNumber = (value: unknown): value is number => typeof value === 'number' && !Number.isNaN(value);
