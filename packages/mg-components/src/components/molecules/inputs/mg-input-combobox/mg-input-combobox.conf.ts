import type { CursorType } from '@mgdis/stencil-helpers';

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
export type ResponseMappingType = { total: string; items: string; next: string; itemTitle: string; itemValue?: string };
