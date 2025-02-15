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
 * Class to manage component classlist
 */
export class ClassList {
  /**
   * Available classes
   */
  classes: string[];

  constructor(classlist: string[] = []) {
    this.classes = classlist;
  }

  /**
   * Add class
   * @param className - class name to add
   */
  add = (className: string): void => {
    if (!this.has(className)) {
      this.classes.push(className);
    }
  };

  /**
   * Delete class
   * @param className - class name to delete
   */
  delete = (className: string): void => {
    const index = this.classes.indexOf(className);
    if (index > -1) {
      this.classes.splice(index, 1);
    }
  };

  /**
   * Check if class exist in list
   * @param className - class name to check
   * @returns class name is in the list
   */
  has = (className: string): boolean => {
    return this.classes.includes(className);
  };

  /**
   * Join classes seperated by spaces
   * @returns joined values
   */
  join = (): string => {
    return this.classes.join(' ');
  };
}

/**
 * Typeguard function to check if all array items are strings.
 * @param items - items to check
 * @returns `true` if all items are strings
 */
export const allItemsAreString = (items: unknown): items is string[] => Array.isArray(items) && items.every(item => typeof item === 'string');

/**
 * Check if element belongs to the given tagNames list
 * @param element - element to check
 * @param tagNames - allowed tag names list
 * @returns `true` if element tagName is in the tagNames list
 */
export const isTagName = (element: Element, tagNames: string[]): boolean => {
  return tagNames.includes(element?.tagName.toLowerCase());
};

/**
 * CSS selector to select focusable elements.
 * @example
 * ```ts
 * const allFocusableElements: HTMLElement[] = Array.from(this.element.querySelectorAll(focusableElements));
 * ```
 */
export const focusableElements = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]), [identifier], mg-button';

/**
 * Get windows
 * @param localWindow - the window we are lookink for other windows
 * @returns The list of windows found
 */
export const getWindows = (localWindow: Window): Window[] => {
  const parentWindows = getParentWindows(localWindow);
  const childWindows = getChildWindows(localWindow);
  return [localWindow, ...parentWindows, ...childWindows];
};

/**
 * Get parent windows
 * @param localWindow - the window we are lookink for parents
 * @param windows - The list of allready found windows
 * @returns The list of windows found
 */
export const getParentWindows = (localWindow: Window, windows: Window[] = []): Window[] => {
  // Check if is in iframe
  if (localWindow.self !== localWindow.top) {
    // Check if we have permission to access parent
    try {
      const parentWindow: Window = localWindow.parent;
      if (parentWindow) {
        windows.push(parentWindow);
        return getParentWindows(parentWindow, windows);
      } else return windows;
    } catch (err) {
      console.error('Different hosts between iframes:', err);
      return windows;
    }
  }
  return windows;
};

/**
 * Get child windows
 * @param localWindow - the window we are lookink for children
 * @param windows - The list of allready found windows
 * @returns The list of windows found
 */
const getChildWindows = (localWindow: Window, windows: Window[] = []): Window[] => {
  if (localWindow.frames.length > 0) {
    for (const childWindow of Array.from(localWindow.frames)) {
      windows.push(childWindow);
      getChildWindows(childWindow, windows);
    }
  }
  return windows;
};

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
export const toString = (value: unknown): string => {
  if (typeof value === 'object') return JSON.stringify(value);
  else return `${value}`;
};

/**
 * Validate number
 * @param value - value to check
 * @returns `true` if number is valid
 */
export const isValidNumber = (value: unknown): value is number => typeof value === 'number' && !Number.isNaN(value);

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

/**
 * Use to process code next tick in the event loop
 * @param callback - code to excute on next tick
 * @returns differed code excution
 */
export const nextTick = async (callback: () => void): Promise<void> => callback();
