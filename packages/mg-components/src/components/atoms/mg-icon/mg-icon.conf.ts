import { icons } from '../../../assets/icons';
/**
 * List of all possibles icons
 */
export type IconType = keyof typeof icons;

/**
 * List of all possibles sizes
 */
export const sizes = ['small', 'regular', 'medium', 'large', 'extra-large'] as const;

/**
 * Icon Size from sizes
 */
export type IconSizeType = (typeof sizes)[number];

/**
 * List of all possibles variants
 */
export const variants = ['success', 'warning', 'danger', 'info', 'app'] as const;

/**
 * Variant type from variants
 */
export type IconVariantType = (typeof variants)[number];

/**
 * List of all possibles variants styles
 */
export const variantStyles = ['icon', 'background', 'full'] as const;

/**
 * Variant style type from variant style
 */
export type IconVariantStyleType = (typeof variantStyles)[number];
