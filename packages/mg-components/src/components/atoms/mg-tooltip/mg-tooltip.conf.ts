export type GuardType = 'focus' | 'hoverTooltip' | 'hoverTooltiped' | 'disableOnClick';

export const Guard: Record<string, GuardType> = {
  FOCUS: 'focus',
  HOVER_TOOLTIP_ELEMENT: 'hoverTooltip',
  HOVER_TOOLTIPED_ELEMENT: 'hoverTooltiped',
  DISABLE_ON_CLICK: 'disableOnClick',
};
