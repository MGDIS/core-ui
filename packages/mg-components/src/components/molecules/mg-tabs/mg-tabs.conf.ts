import type { Size, Status as StatusType } from '../../../types';
import type { MgBadge } from '../../atoms/mg-badge/mg-badge';
import type { MgIcon } from '../../atoms/mg-icon/mg-icon';

/**
 * Available tabs items status
 */
export const Status: Record<string, StatusType> = {
  VISIBLE: 'visible',
  HIDDEN: 'hidden',
  DISABLED: 'disabled',
  ACTIVE: 'active',
};

/**
 * type TabItem
 * use to match tabs items
 */
export type TabItem = {
  label: string;
  icon?: MgIcon['icon'];
  badge?: Pick<MgBadge, 'value' | 'variant' | 'label'> & { role: 'notification' | 'information' };
  status: StatusType;
};

/**
 * List of all possibles sizes
 */
export const sizes = ['medium', 'large'] as const;

/**
 * Variant type from variants
 */
export type SizeType = Size & (typeof sizes)[number];
