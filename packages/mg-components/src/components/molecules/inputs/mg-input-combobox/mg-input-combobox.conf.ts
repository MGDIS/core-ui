import { Option } from '../../../../types';

/**
 * Option type
 */
export type ItemType = Option;

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

/**
 * Define action type
 */
export type ActionType = { name: 'scroll' | 'load-data' | 'load-more'; cursor?: CursorType };

/**
 * Define request mapping type
 */
export type RequestMappingType = { filter: string };

/**
 * Define response mapping type
 */
export type ResponsMappingType = { total: string; items: string; next: string; itemTitle: string; itemValue: string };

/**
 * Define getPage methode interface
 */
export interface IGetPage<T> {
  (offset?: number, filter?: (option) => boolean): PageType<T>;
}

/**
 * Define Page Type
 */
export type PageType<T> = {
  items: T[];
  total: number;
  top: number;
  next: string | IGetPage<T>;
};
