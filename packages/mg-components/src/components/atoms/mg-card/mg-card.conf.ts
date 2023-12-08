/**
 * List available variants
 */
export const variants = ['info', 'warning', 'success', 'danger', 'app'] as const;

/**
 * Variant type
 */
export type VariantType = (typeof variants)[number];

/**
 * List available variant styles
 */
export const variantStyles = ['bar-left', 'fill'] as const;

/**
 * VariantStyle type
 */
export type VariantStyleType = (typeof variantStyles)[number];
