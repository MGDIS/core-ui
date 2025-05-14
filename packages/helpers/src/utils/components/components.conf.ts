import type { Page } from './components';

/**
 * Define getPage type
 */
export type IGetPage<T> = (offset?: number, filter?: Parameters<Array<T>['filter']>[0]) => Page<T>;

/**
 * Cursor type
 */
export type CursorType = 'first' | 'next' | 'previous' | 'last';
