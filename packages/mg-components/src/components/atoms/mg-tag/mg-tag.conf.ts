import type { Variant } from '../../../types';

/**
 * List of all possibles variants
 */
export const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const;

/**
 * TagVariantType type from tag variants
 */
export type TagVariantType = Variant & (typeof variants)[number];
