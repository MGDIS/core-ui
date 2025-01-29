import type { Size } from '../../../types';
/**
 * List of all possibles sizes
 */
export const sizes = ['small', 'medium', 'large', 'xlarge'] as const;
/**
 * Icon Size from sizes
 */
export type TableSizeType = Size & (typeof sizes)[number];
