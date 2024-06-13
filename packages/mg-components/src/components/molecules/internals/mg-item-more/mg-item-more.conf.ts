import type { MgMenu } from '../../../molecules/menu/mg-menu/mg-menu';
import type { MgIcon } from '../../mg-icon/mg-icon';

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
