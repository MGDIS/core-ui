/**
 * Create random ID
 * @param prefix - add prefix to created ID
 * @param length - ID length
 * @returns ID
 */
export const createID = (prefix = '', length = 10): string => {
  let ID = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charsLength = chars.length;
  for (let i = 0; i < length; i++) {
    ID += chars.charAt(Math.floor(Math.random() * charsLength));
  }
  return (prefix !== '' ? `${prefix}-` : '') + ID;
};

/**
 * Class to manage component classlist
 * Set() are not working when imported in project
 */
export class ClassList {
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
 * Check if all items are string
 * @param items - items to check
 * @returns all items are string
 */
export const allItemsAreString = (items: unknown): items is string[] => Array.isArray(items) && items.every(item => typeof item === 'string');

/**
 * Check if element is a heading
 * @param element - slotted element
 * @param tagNames - allowed tag names list
 * @returns element is a heading
 */
export const isTagName = (element: Element, tagNames: string[]): boolean => {
  return tagNames.includes(element?.tagName.toLowerCase());
};

/**
 * Focusable elements query selector
 */
export const focusableElements = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]), [identifier]';

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
      windows.push(parentWindow);
      return getParentWindows(parentWindow, windows);
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
    // Window.frames is an array-like object, needs a classic for loop
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/frames
    for (let i = 0; i < localWindow.frames.length; i++) {
      const childWindow: Window = localWindow.frames[i];
      windows.push(childWindow);
      getChildWindows(childWindow, windows);
    }
  }
  return windows;
};
