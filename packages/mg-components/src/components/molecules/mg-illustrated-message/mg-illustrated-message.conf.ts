import type { Size } from '../../../types';

/**
 * List of all possibles sizes
 */
const sizes = ['medium', 'small'] as const;
/**
 * IllustratedMessage size type
 */
export type IllustratedMessageSizeType = Size & (typeof sizes)[number];
