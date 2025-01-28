import { Placement } from "../../../types";
import { placements } from '../../../utils/floating-ui.utils'
export * from '../../../utils/floating-ui.utils'

export type GuardType = 'focus' | 'hoverTooltip' | 'hoverTooltiped' | 'disableOnClick';

export const Guard: Record<string, GuardType> = {
  FOCUS: 'focus',
  HOVER_TOOLTIP_ELEMENT: 'hoverTooltip',
  HOVER_TOOLTIPED_ELEMENT: 'hoverTooltiped',
  DISABLE_ON_CLICK: 'disableOnClick',
};

/**
 * Placement type from placements
 */
export type TooltipPlacementType = Placement & (typeof placements)[number];