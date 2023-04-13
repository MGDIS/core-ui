/**
 * List of all possibles message variants
 */
export const variants = ['info', 'warning', 'success', 'danger'] as const;

/**
 * Variant type
 */
export type VariantType = (typeof variants)[number];
