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
export const nextTick = async (callback?: () => void): Promise<void> => {
  if (callback) return callback();
};

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

/**
 * Define getPage methode interface
 */
export interface IGetPage<T> {
  (offset?: number, filter?: Parameters<Array<T>['filter']>[0]): Page<T>;
}

/**
 * Cursor type
 */
export type CursorType = 'first' | 'next' | 'previous' | 'last';

/**
 * Cursor possible values
 */
export const Cursor: Record<string, CursorType> = {
  FIRST: 'first',
  NEXT: 'next',
  PREVIOUS: 'previous',
  LAST: 'last',
} as const;

const DEFAULT_TOP = 10;

/**
 * Define a valid Page object and navigate throw page items with cursor.
 * Page object entries follow the REST API page practices.
 */
export class Page<T> {
  /**
   * Define items
   */
  public items: T[] = [];
  /**
   * Define total
   */
  public total: number;
  /**
   * Define top
   */
  public top: number = DEFAULT_TOP;
  /**
   * Define next
   */
  public next?: IGetPage<T> | string | URL;
  /**
   * Define base index
   */
  public readonly baseIndex = 1;

  constructor(init: Partial<Pick<Page<T>, 'items' | 'top' | 'total' | 'next'>>) {
    if (!isObject(init)) {
      throw new Error('Page - init must match IPage type.');
    } else {
      if (Array.isArray(init.items)) this.items = init.items;
      if (typeof init.top === 'number') this.top = init.top;
      this.total = typeof init.total === 'number' ? init.total : this.items.length;
      this.next = init.next;
    }
  }

  /**
   * Get index of items from cursor
   * @param cursor - cursor to find
   * @param oldItem - previous item
   * @returns item index
   */
  public getIndexFromCursor = (cursor: CursorType = 'first', oldItem?: T): number | null => {
    const startIndex = 0;
    if (!Array.isArray(this.items) || !this.items.length) return null;
    const lastIndex = this.items.length - this.baseIndex;

    let newIndex = startIndex;
    let oldIndex = startIndex;
    if (['previous', 'next'].includes(cursor) && oldItem) {
      const findedIndex = this.items.findIndex(item => JSON.stringify(item) === JSON.stringify(oldItem));
      if (findedIndex === -1) return startIndex;
      oldIndex = findedIndex;
    }
    // Update index from cursor
    if (cursor === 'first') {
      newIndex = startIndex;
    } else if (cursor === 'last') {
      newIndex = lastIndex;
    } else if (cursor === 'previous') {
      newIndex = JSON.stringify(this.items[oldIndex]) === JSON.stringify(this.items[startIndex]) ? lastIndex : oldIndex - this.baseIndex;
    } else if (cursor === 'next') {
      newIndex = JSON.stringify(this.items[oldIndex]) === JSON.stringify(this.items[lastIndex]) ? startIndex : oldIndex + this.baseIndex;
    }

    return newIndex;
  };
}

/**
 * Paginate an items array to navigate into with pages.
 * It follow REST standard and allow to navigate in items array with a similar format.
 */
export class Paginate<T> {
  /**
   * Define paginated items
   */
  public items: Page<T>['items'] = [];

  /* Privates */
  #top: Page<T>['top'] = DEFAULT_TOP;
  #next?: Page<T>['next'];
  #total?: Page<T>['total'];

  constructor(items: Page<T>['items'], options?: { step?: number; top?: Page<T>['top']; total?: Page<T>['total']; next?: Page<T>['next'] }) {
    if (Array.isArray(items)) this.items = items;
    if (options && (['string', 'function'].includes(typeof options.next) || (isObject<URL>(options.next) && URL.canParse(options.next)))) this.#next = options.next;
    if (typeof options?.top === 'number') this.#top = options.top;
    if (typeof options?.total === 'number') this.#total = options.total;
  }

  /**
   * Get page
   * @param offset - pagiantion offset
   * @param filter - filter methode
   * @returns formated page
   */
  public getPage: IGetPage<T> = (offset = 0, filter) => {
    const items = typeof filter === 'function' ? this.items.filter(filter) : this.items;
    let next;
    if (this.#next) next = this.#next;
    else if (items.length > offset + this.#top) next = () => this.getPage(offset + this.#top, filter);

    return new Page({
      items: items.slice(offset, offset + this.#top),
      total: this.#total,
      top: this.#top,
      next,
    });
  };
}
