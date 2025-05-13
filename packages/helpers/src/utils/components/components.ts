import { isObject } from '../object';
import { CursorType, IGetPage } from './components.conf';

/**
 * Use to process code next tick in the event loop
 * @param callback - code to excute on next tick
 * @returns differed code excution
 */
export const nextTick = async (callback?: () => void): Promise<void> => {
  if (callback) return callback();
};

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

    let newIndex;
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
    } else {
      newIndex = startIndex;
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
  public getPage: IGetPage<T> = (offset = 0, filter?) => {
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
