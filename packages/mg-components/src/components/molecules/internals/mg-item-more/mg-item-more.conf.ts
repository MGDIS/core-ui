import type { MgIcon } from '../../../atoms/mg-icon/mg-icon';

/**
 * SlotLabel prop type
 */
export type SlotLabelType = {
  label?: string;
  display?: boolean;
};

/**
 * icon prop type
 */
export type IconType = Pick<MgIcon, 'icon'>;
