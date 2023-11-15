/**
 * Possible input width
 */
export const widths = [2, 4, 16, 'full'] as const;

export type Width = (typeof widths)[number];

/**
 * Possible Input types
 */

export type HTMLMgInputsElement =
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
}
