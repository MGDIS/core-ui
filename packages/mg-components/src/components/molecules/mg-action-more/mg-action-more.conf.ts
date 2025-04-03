import type { MgBadge } from '../../atoms/mg-badge/mg-badge';
import type { MgButton } from '../../atoms/mg-button/mg-button';
import type { MgIcon } from '../../atoms/mg-icon/mg-icon';
import type { MgMenuItem } from '../menus/mg-menu-item/mg-menu-item';

/**
 * prop icon type
 */
export type MgActionMoreIconType = Pick<MgIcon, 'icon'>;

/**
 * prop button type
 */
export type MgActionMoreButtonType = Pick<MgButton, 'isIcon' | 'variant' | 'label' | 'disabled'>;

/**
 * locals message type
 */
export type MgActionMoreMessageType = { label: string };

/**
 * prop item type
 */
export type MgActionMoreItemType = Pick<MgMenuItem, 'status' | 'href' | 'target'> & {
  label: string;
  mouseEventHandler: IMouseEventHandler;
  icon?: Pick<MgIcon, 'icon'> & Partial<Pick<MgIcon, 'variant' | 'variantStyle'>>;
  badge?: Pick<MgBadge, 'value' | 'label'>;
};

/**
 * prop item divider type
 */
export type MgActionMoreDividerType = { isDivider: boolean };

/**
 * MouseEvent callback interface
 */
type IMouseEventHandler = (event: MouseEvent) => void;
