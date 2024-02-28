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
}

export const classInput = 'mg-c-input';

export const getInputClassModifier = modifier => `${classInput}--${modifier}`;

export const classFieldset = getInputClassModifier('fieldset');

export const classDisabled = getInputClassModifier('disabled');

export const classReadonly = getInputClassModifier('readonly');
