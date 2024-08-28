import { Status as StatusType } from '../../../../types';

/**
 * Available menu item status type
 */
export type MgMenuStatusType = StatusType & ('visible' | 'hidden' | 'disabled' | 'active');

/**
 * Available menu item status values
 */
export const Status: Record<string, StatusType> = {
  VISIBLE: 'visible',
  HIDDEN: 'hidden',
  DISABLED: 'disabled',
  ACTIVE: 'active',
};

/**
 * List of all possibles target
 */
export const targets = ['_blank', '_self', '_parent', '_top'] as const;

/**
 * VariantType type from link target
 */
export type TargetType = (typeof targets)[number];
