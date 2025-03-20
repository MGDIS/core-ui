import type { Size, Direction } from '../../../../types';
import type { MgItemMore } from '../../internals/mg-item-more/mg-item-more';

/**
 * Menu direction values
 */
export const directions: Record<string, Direction> = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

/**
 * ItemMore prop type
 */
export type ItemMoreType = Pick<MgItemMore, 'icon' | 'slotlabel' | 'size'>;

/**
 * List of all possibles sizes
 */
export const sizes = ['medium', 'large', 'xlarge'] as const;

/**
 * item Size from sizes
 */
export type MenuSizeType = Size & (typeof sizes)[number];
