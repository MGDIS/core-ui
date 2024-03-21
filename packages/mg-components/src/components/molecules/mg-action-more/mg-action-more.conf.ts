import type { MgBadge } from '../../atoms/mg-badge/mg-badge';
import type { MgButton } from '../../atoms/mg-button/mg-button';
import type { MgIcon } from '../../atoms/mg-icon/mg-icon';
import type { MgMenuItem } from '../menu/mg-menu-item/mg-menu-item';
import type { TargetType } from '../menu/mg-menu-item/mg-menu-item.conf';

/**
 * prop icon type
 */
export type MgActionMoreIconType = {
  icon: MgIcon['icon'];
};

/**
 * prop button type
 */
export type MgActionMoreButtonType = {
  isIcon: MgButton['isIcon'];
  variant: MgButton['variant'];
  label?: MgButton['label'];
  disabled?: MgButton['disabled'];
};

/**
 * locals message type
 */
export type MgActionMoreMessageType = { label: string };

/**
 * prop item type
 */
export type MgActionMoreItemType = {
  label: string;
  mouseEventHandler: IMouseEventHandler;
  status?: MgMenuItem['status'];
  icon?: MgIcon['icon'];
  href?: MgMenuItem['href'];
  badge?: Pick<MgBadge, 'value' | 'label'>;
  target?: TargetType;
};

/**
 * MouseEvent callback interface
 */
type IMouseEventHandler = (event: MouseEvent) => void;
