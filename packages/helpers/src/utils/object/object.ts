/**
 * Check if a value is of object type.
 * @param object - The value to validate.
 * @returns `true` if the value is a valid object (non-null and not an array), otherwise `false`.
 */
export const isObject = <T>(object: unknown): object is T => typeof object === 'object' && !Array.isArray(object) && object !== null;

/**
 * Get object value from key
 * @param object - object to query
 * @param path - path of the property to get. Nested keys are allowed with `.` separators (eg: 'key0.key1.key2' = object[key0][key1][key2])
 * @param defaultValue - The value returned for `undefined` resolved values
 * @returns object value
 */
export const getObjectValueFromKey = <T, R>(object: T, path: string, defaultValue?: R): R | undefined => {
  const separator = '.';
  if (!isObject<Record<string, R>>(object) || typeof path !== 'string') {
    return defaultValue;
  }
  const [current, ...next] = path.split(separator);
  if (next.length) {
    return getObjectValueFromKey(object[current as keyof T], next.join(separator));
  } else {
    return object[current as keyof T];
  }
};
