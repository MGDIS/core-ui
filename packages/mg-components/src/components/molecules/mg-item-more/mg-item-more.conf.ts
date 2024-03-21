import type { MgIcon } from '../../atoms/mg-icon/mg-icon';
import type { MgMenu } from '../menu/mg-menu/mg-menu';

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

/**
 * size type
 */
export type SizeType = MgMenu['size'];
