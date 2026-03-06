import type { IconType } from '../../atoms/mg-icon/mg-icon.conf';

/**
 * Breadcrumb item type
 */
export type BreadcrumbItemType = {
  /** Displayed label (link text or current page text). Always required. */
  label: string;
  /**
   * Link URL. If absent or empty, the item is rendered as current page (text only, no <a>).
   * Last item typically has no href.
   */
  href?: string;
  /**
   * Icon name (mg-icon). If present, the link displays the icon instead of the text.
   * The label is used as accessible text (aria-label or visually hidden content).
   */
  icon?: IconType;
};
