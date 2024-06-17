/**
 * Possible input width
 */
export const widths = [2, 4, 16, 'full'] as const;

export type Width = (typeof widths)[number];

/**
 * Possible tootltip postions
 */
export const tooltipPositions = ['input', 'label'] as const;

export type TooltipPosition = (typeof tooltipPositions)[number];

/**
 * Possible Input types
 */
export type HTMLMgInputsElement =
  | (HTMLMgInputElement & { required: true; invalid: false; displayError: () => void; labelOnTop: boolean; readonly: boolean })
  | HTMLMgInputCheckboxElement
  | HTMLMgInputDateElement
  | HTMLMgInputNumericElement
  | HTMLMgInputPasswordElement
  | HTMLMgInputRadioElement
  | HTMLMgInputSelectElement
  | HTMLMgInputTextElement
  | HTMLMgInputTextareaElement
  | (HTMLMgInputToggleElement & { required: true; invalid: false; displayError: () => void });

/**
 * Available handlers
 */
export enum Handler {
  BLUR = 'blur',
  FOCUS = 'focus',
  MOUSEENTER = 'mouseenter',
}

export const classFieldset = 'mg-c-input--fieldset';
export const classDisabled = 'mg-c-input--disabled';
export const classReadonly = 'mg-c-input--readonly';
export const classVerticalList = 'mg-c-input--vertical-list';
