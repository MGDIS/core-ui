import type { Size } from '../../../types';

/**
 * List of all possibles sizes
 */
export const sizes = ['small', 'medium', 'large'] as const;
/**
 * IllustratedMessage size type
 */
export type IllustratedMessageSizeType = Size & (typeof sizes)[number];

/**
 * List of all possibles directions
 */
export const directions = ['vertical', 'horizontal'] as const;
/**
 * IllustratedMessage direction type
 */
export type IllustratedMessageDirectionType = (typeof directions)[number];
