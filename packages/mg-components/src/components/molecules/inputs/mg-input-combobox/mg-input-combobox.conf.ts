import type { CursorType } from '@mgdis/stencil-helpers';
import type { Option } from '../../../../types';

/**
 * Item type
 */
export type ItemType = Option;

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
