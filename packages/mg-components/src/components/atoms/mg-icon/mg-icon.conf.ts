import { icons } from '../../../assets/icons';
import type { Size, Variant, VariantStyle } from '../../../types';
/**
 * List of all possibles icons
 */
export type IconType = keyof typeof icons;
/**
 * List of all possibles sizes
 */
export const sizes = ['small', 'medium', 'large', 'xlarge', 'xxlarge'] as const;
/**
 * Icon Size from sizes
 */
export type IconSizeType = Size & (typeof sizes)[number];
/**
 * List of all possibles variants
 */
export const variants = ['success', 'warning', 'danger', 'info', 'app', 'dark'] as const;

/**
 * Variant type from variants
 */
export type IconVariantType = Variant & (typeof variants)[number];

/**
 * List of all possibles variants styles
 */
export const variantStyles = ['icon', 'background', 'full'] as const;

/**
 * Variant style type from variant style
 */
export type IconVariantStyleType = VariantStyle & (typeof variantStyles)[number];
