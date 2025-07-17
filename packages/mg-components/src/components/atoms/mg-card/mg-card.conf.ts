import type { Size } from '../../../types';

/**
 * List of all possibles radius size
 */
export const radiusSizes = ['xsmall', 'small', 'medium'] as const;

/**
 * RadiusSizeType type from card radius sizes
 */
export type RadiusSizeType = Size & (typeof radiusSizes)[number];
