import type { Variant, VariantStyle } from '../../../types';

/**
 * List available variants
 */
export const variants = ['info', 'warning', 'success', 'danger'] as const;

/**
 * Variant type
 */
export type VariantType = Variant & (typeof variants)[number];

/**
 * List available variant styles
 */
export const variantStyles = ['bar-left', 'background'] as const;

/**
 * VariantStyle type
 */
export type VariantStyleType = VariantStyle & (typeof variantStyles)[number];
