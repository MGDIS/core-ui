import { isObject } from '../../object';
import { isValidString } from '../../string';
import { toKebabCase } from '../to-kebab-case';

/**
 * Create random ID
 * @param prefix - add prefix to created ID
 * @param length - ID length
 * @returns ID
 */
export const createID = (prefix = '', length = 10): string => {
  const randomBytes = new Uint8Array(length);

  crypto.getRandomValues(randomBytes);

  const hexString = Array.from(randomBytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, length);

  return prefix !== '' ? `${prefix}-${hexString}` : hexString;
};

/**
 * Validate html `id` format
 * @param newValue - id value to validate
 * @returns true if `id` is valid
 */
export const isValideID = (newValue: unknown): boolean => isValidString(newValue) && /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.exec(newValue) !== null;

/**
 * Format id from value
 * @param value - id to transforme
 * @returns valid id
 */
export const formatID = (value: unknown): string | undefined => {
  let id;
  if (typeof value === 'string') {
    id = value;
  } else if (Boolean(value) && (isObject(value) || Array.isArray(value))) {
    id = JSON.stringify(value);
  } else if (value !== null && value !== undefined && typeof value !== 'boolean') {
    id = String(value);
  }
  return id ? toKebabCase(id) : id;
};
