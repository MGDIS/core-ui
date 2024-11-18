import type { Variant, Size } from '../../../types';

/**
 * List of all possibles sizes
 */
export const sizes = ['medium', 'large'] as const;

/**
 * SizeType type from button sizes
 */
export type SizeType = Size & (typeof sizes)[number];

/**
 * List of all possibles variants
 */
export const variants = ['primary', 'secondary', 'danger', 'danger-alt', 'info', 'flat', 'success', 'link'] as const;

/**
 * VariantType type from button variants
 */
export type VariantType = Variant & (typeof variants)[number];

/**
 * List of all possibles button types
 */
export const buttonTypes = ['button', 'submit', 'reset'] as const;

/**
 * ButtonType type from buttonTypes
 */
export type ButtonType = (typeof buttonTypes)[number];
